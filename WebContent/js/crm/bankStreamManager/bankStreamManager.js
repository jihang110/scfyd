$(document).ready(function() {
	ajaxRelaCorps("txt_corpId","corpId");
	loadDate();
	initTable();
	initStatisticTable();
	formValidator();
	numFormat();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
//	hidden();
	
} );

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../customerBankStream/delete',
	    					data : '{"recUid":"'+row.recUid+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							searchFun();
	    	    				}else{
	    	    					bootbox.alert(data.resultNote);
	    	    					return false;
	    	    				}
	    					},
	    					errorCallback:function(data){
	    						bootbox.alert("error");
	    					}
	    			};
	    			CloudUtils.ajax(options);
	            } 
	    	 });
	    }
	};

function initTable() { 
	$('#bankStreamList').bootstrapTable('destroy');  
	$("#bankStreamList").bootstrapTable({  
         method: "post", 
         url: "../../customerBankStream/list", 
         striped: false,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           if(jsonData.txt_corpId ==""){
        	   jsonData.txt_corpId = null;
           }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId,
               operTime: jsonData.txt_operTime
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
	        	 return {
	        		 "rows": res.dataList,
	        		 "total": res.records
	        	 };

        	 } else {
        		 bootbox.alert(res.resultNote);
        		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
        	 }
         },
         columns: [{
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'bankName',
 	        title: '银行名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'bankAccount',
 	        title: '银行账号',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'operTime',
 	        title: '年月',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value,row,index){
            	var year = value.substring(0,4);
            	var day = value.substring(4,6);
            	row.operTime = year+"-"+day;
 	        	return year+"-"+day;
	        }
            
 	    }, {
 	        field: 'amount',
 	        title: '账户金额(万元)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	         var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return m+' '+d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}



function initStatisticTable(){
//	show();
	var data = CloudUtils.convertStringJson('searchForm');
    var jsonData = eval("(" + data + ")");
    var param = {    
        corpId: jsonData.txt_corpId,
        operTime: jsonData.txt_operTime
    };    
	var options = {
			url : '../../customerBankStream/statistic',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					if(data.dataList.length == 0){
						var div1 = document.getElementById('bankStreamstatisticList');
						div1.innerHTML = '<TABLE><TR><TH>客户主要银行结算户的流水统计（万元）</TH></TR><TR><TD>没有匹配的记录</TD></TR></TABLE>';
						return false;
					}
					var map = {},
			           dest = [];
			       for(var i = 0; i < data.dataList.length; i++){
			           var ai = data.dataList[i];
			           if(!map[ai.bankAccount]){
			               dest.push({
			            	   bankAccount: ai.bankAccount,
			            	   bankName: ai.bankName,
			                   data: [{
			                          	operTime:ai.oper_time,
			                          	totalAmount:ai.totalAmount
			                   }]
			               });
			               map[ai.bankAccount] = ai;
			           }else{
			               for(var j = 0; j < dest.length; j++){
			                   var dj = dest[j];
			                   if(dj.bankAccount == ai.bankAccount){
			                       dj.data.push(
			                    		   		{
			                    			   		operTime:ai.oper_time,
			                    			   		totalAmount:ai.totalAmount
			                    		   		}
			                    		   	);
			                       break;
			                   }
			               }
			           }
			       }
					var div1 = document.getElementById('bankStreamstatisticList');
					var size = dest.length+2;
					var code = '<TABLE>';
					code += '<TR><TH colspan="'+size+'">客户主要银行结算户的流水统计（万元）</TH></TR>';
			/*			 $.each(dest, function(i, value) {
							 code += '<TD>'+value.bankName+'</TD>';
						});*/
					if(dest.length!=0){
						code += '<TR><TD rowspan="2">期间（按月）</TD>';
					}
					
					 $.each(dest, function(i, value) {
						 code += '<TD>'+value.bankName+'</TD>';
					});
					 if(dest.length!=0){
					 code +='<TD rowspan="2">合计</TD></TR><TR>';
					 }
					 $.each(dest, function(i, value) {
						 code += '<TD>'+value.bankAccount+'</TD>';
					});
					 //申明一个二维数组
					 var monthArray=new Array(); //先声明一维
					 for(var i=0;i<12;i++){ //一维长度为12
					 monthArray[i]=new Array(); 
					 //在声明二维
					 for(var j=0;j<dest.length;j++){ //二维长度为数组长度
					 monthArray[i][j]=0;
					 	}
					 }
					 //塞进二维数组,用来存数
					 $.each(dest, function(i, ivalue) {
						 $.each(ivalue.data, function(j, jvalue) {
								var time = jvalue.operTime;
								var month = parseInt(time.substr(time.length-2));
								monthArray[month-1][i] = CloudUtils.Math(monthArray[month-1][i],jvalue.totalAmount,'add').toFixed(2);
							});
						 
					});
					//全是0的数组
					 var zeroArray = [];
					 for(var i=0;i<dest.length;i++){
						 zeroArray.push(0);
					 }
					//把二维数组表格展示
					 for(var i=0;i<12;i++){
						 var rowamount = 0;
						 if(monthArray[i].toString()!= zeroArray.toString()){
							code += '</TR><TR><TD>'+(i+1)+"月"+'</TD>';
							for(var j=0;j<dest.length;j++){
								code +="<TD>"+$.number(monthArray[i][j],2)+"</TD>";
								rowamount = CloudUtils.Math(rowamount,monthArray[i][j],'add').toFixed(2);
							}
							code +="<TD>"+$.number(rowamount,2)+"</TD>";
							code += "</TR>";
							}
						}
					 if(dest.length!=0){
						 code += '<TD>'+"合计"+'</TD>';
					 }
						 var totalamount = 0;
						 $.each(dest, function(i, ivalue) {
							 var cellamount = 0;
							 $.each(ivalue.data, function(j, jvalue) {
								 cellamount = CloudUtils.Math(cellamount,jvalue.totalAmount,'add').toFixed(2);
								});
							 code += '<TD>'+ $.number(cellamount,2)+'</TD>';
							 totalamount = CloudUtils.Math(totalamount,cellamount,'add').toFixed(2);
			
						});
						 if(dest.length!=0){
						 code += '<TD>'+$.number(totalamount,2)+'</TD>';
						 }else{
						 code += '<TD colspan="2">没有匹配的记录</TD>';
						 }
					div1.innerHTML = code + '<TR/></TABLE>';
					 
				}else{
					//bootbox.alert(data.resultNote);
					var div1 = document.getElementById('bankStreamstatisticList');
					div1.innerHTML = '<TABLE><TR><TH>客户主要银行结算户的流水统计（万元）</TH></TR><TR><TD>没有匹配的记录</TD></TR></TABLE>';
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
}

function searchFun() {
	initTable();
	initStatisticTable();
}

function addFun() {
	$("#corpId").attr("disabled",false);
	 var initDate = new Date();
	 $('#operTime').val(dateFormat(initDate, 'yyyy-MM'));
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

function modFun(row) {
	$("#corpId").attr("disabled",true);
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
//	var modal = $('#addModal');
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
	var data = CloudUtils.convertStringJson('addForm');
	var jsonData = eval("(" + data + ")");
	var time = jsonData.operTime.split("-");
	jsonData.operTime = time[0]+time[1];
	var isEdit =  $('#isEdit').val(); 
	var modal = $('#addModal');
    modal.modal("hide");
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../customerBankStream/add',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						searchFun();
    				}else{
    					return false;
    				}
				},
				errorCallback:function(data){
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}else{
		var options = {
				url : '../../customerBankStream/mod',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						searchFun();
    				}else{
    					return false;
    				}
				},
				errorCallback:function(data){
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}
    }
}

var dateFormat = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

function loadDate(){
	 var initDate = new Date();
	 $('#operTime').val(dateFormat(initDate, 'yyyy-MM'));
	  $('#txt_operTime').val(initDate.getFullYear());
	$('#txt_operTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#operTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm',
		startView: 4,
        minView: "year",
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left"
	});
	$('#operTime').datetimepicker('setEndDate', new Date());
}

function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				if(data.result==0){
		            $.each(data.dataList, function (index, units) {  
		            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
		            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
		            });
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
	            $('#txt_corpId').selectOrDie({
			        placeholder: '企业名称'
			    });
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  operTime: {
	              validators: {
	            	  notEmpty: {
	                      message: '年月不能为空'
	                  }
	              }
	          },
	          amount : {
	              validators: {
	            	  notEmpty: {
	                      message: '账户金额不能为空'
	                  },
	            	 numeric: {message: '只能输入数字'},
	            	 callback: {  
                         message: '账户金额在0-999999999.99之间',  
                         callback: function(value, validator) { 
                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
                         }  
                     } 
	              }
	          }, 
	          bankAccount : {
	                validators: {
	                	 regexp: {
	                		 regexp: /^[a-zA-Z0-9]+$/,
		                     message: '只能使用字母和数字'
	                     },
	                     notEmpty: {
		                      message: '银行账号不能为空'
		                  },
		                  stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '银行账号长度为1-32'
		                  },
	                }
	         },
	         bankName : {
	                validators: {
	                     notEmpty: {
		                      message: '银行名称不能为空'
		                  },
		                  stringLength: {
		                      min: 2,
		                      max: 20,
		                      message: '银行名称长度为2-20'
		                  },
	                }
	         }
	          
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			
		});	
}

function numFormat(){
	$("#amount").number(true, 2);
}