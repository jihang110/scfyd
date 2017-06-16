$(document).ready(function() {
	dateload();
	initTable();
	initProportionTable();
	formValidator();
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
	ajaxRelaCorps("txt_corpId","corpId");
/*	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})*/
	numFormat();
} );

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../accountAnaly/delete',
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
	$('#accountAnaly').bootstrapTable('destroy');  
	$("#accountAnaly").bootstrapTable({  
         method: "post", 
         url: "../../accountAnaly/list", 
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
 	        field: 'buyerName',
 	        title: '买方名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'contractId',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'invoiceId',
 	        title: '发票编号',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'invoiceAmount',
 	        title: '发票金额(元)',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    }, {
 	        field: 'invoiceTime',
 	        title: '开票日期',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'expectedPaymentTime',
 	        title: '预计付款日',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'actualPaymentTime',
 	        title: '实际付款日',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'actualPaymentAmount',
 	        title: '实际付款金额(元)',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    }, {
 	        field: 'overdueDays',
 	        title: '逾期天数',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
   	 	    	return $.number(value,0);
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

function searchFun() {
	initTable();
	initProportionTable();
}

function addFun() {
	$("#corpId").attr("disabled",false);
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

function modFun(row) {
	$("#corpId").attr("disabled",true);
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    var ifOverdueObj = document.getElementsByName(ifOverdue);
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
	 var date = new Date();
    var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    if(CompareDate(jsonData.invoiceTime,jsonData.actualPaymentTime))
    {
   	 bootbox.alert("实际付款日期不能在开票日期之前！");
        return false;
    }
	var isEdit =  $('#isEdit').val(); 
	var modal = $('#addModal');
    modal.modal("hide");
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../accountAnaly/add',
				data : data,
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
				url : '../../accountAnaly/mod',
				data : data,
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

function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				control1.append("<option value=''>全部</option>");
				if(data.result==0){
					 $.each(data.dataList, function (index, units) {  
			            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
			            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
			            });
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
	            control1.selectOrDie({
			        placeholder: '企业名称'
			    });
			},
			errorCallback:function(data){
				 bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function dateload(){
	 $('#invoiceTime').datetimepicker({
         language: 'zh-CN',
         autoclose: 1,
         todayBtn: true,// 显示今天时间
         pickerPosition: "bottom-left",
         minuteStep: 5,
         format: 'yyyy-mm-dd',
         minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
        });
        $('#expectedPaymentTime').datetimepicker({
            language: 'zh-CN',
            autoclose: 1,
            todayBtn: true,// 显示今天时间
            pickerPosition: "bottom-left",
            minuteStep: 5,
            format: 'yyyy-mm-dd',
            minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
           });
        $('#actualPaymentTime').datetimepicker({
            language: 'zh-CN',
            autoclose: 1,
            todayBtn: true,// 显示今天时间
            pickerPosition: "bottom-left",
            minuteStep: 5,
            initialDate:new Date(),
            format: 'yyyy-mm-dd',
            minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
           });
        $('#invoiceTime').datetimepicker('setEndDate', new Date());
        $('#actualPaymentTime').datetimepicker('setEndDate', new Date());
}

function initProportionTable(){
//	show();
	var data = CloudUtils.convertStringJson('searchForm');
    var jsonData = eval("(" + data + ")");
    if(jsonData.txt_corpId ==""){
 	   jsonData.txt_corpId = null;
    }
    var param = {    
        corpId: jsonData.txt_corpId
    };
    var ProportionDate = JSON.stringify(param);
	var options = {
			url : '../../accountAnaly/proportion',
			data : ProportionDate,
			callBackFun : function(data) {
				if(data.result==0){
					var div1 = document.getElementById('accountAnalyProportion');
					 var code = '<TABLE>';
					 code += '<TR><TD><b>天数</b></TD>';
					 $.each(data.dataList, function(i, value) {
						 code += '<TD>'+value.analyDays+'</TD>';
					});	
					code += '</TR><TR class=""><TD><b>金额(元)</b></TD>';
					 $.each(data.dataList, function(i, value) {
						 code += '<TD>'+$.number(value.amount,2)+'</TD>';
					});
					code += '</TR><TR class=""><TD><b>占比(%)</b></TD>';
					 $.each(data.dataList, function(i, value) {
						 code += '<TD>'+value.percent+'</TD>';
					});
					 div1.innerHTML = code + '</TABLE>';
				}else{
					bootbox.alert(data.resultNote);
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

//比较字符串日期大小
//by-jihang
function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
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
	    	  buyerName : {
	              validators: {
                  stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '买方名称长度为1-32'
	                  },
	                  notEmpty: {message: '买方名称不能为空'}
	              }
	          },
	    	  operTime: {
	              validators: {
	                  numeric: {message: '只能输入数字'}
	              }
	          },
	          invoiceAmount : {
	              validators: {
	            	  notEmpty: {
	                      message: '发票金额不能为空'
	                  },
	            	 numeric: {message: '只能输入数字'},
	            	 callback: {  
                         message: '发票金额在0-999999999.99之间',  
                         callback: function(value, validator) { 
                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
                         }  
                     } 
	              }
	          },
	          actualPaymentAmount : {
	              validators: {
	            	  notEmpty: {
	                      message: '实际付款金额不能为空'
	                  },
	            	 numeric: {message: '只能输入数字'},
	            	 callback: {  
                         message: '实际付款金额在-1000000000.00~1000000000.00之间',  
   						 callback: function(value, validator) { 
      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
                         }  
                     } 
	              }
	          },
	          invoiceTime : {
	              validators: {
	            	  notEmpty: {
	                      message: '开票日期不能为空'
	                  }
	              }
	          },
	          expectedPaymentTime : {
	              validators: {
	            	  notEmpty: {
	                      message: '预计付款日不能为空'
	                  }
	              }
	          },
	          actualPaymentTime : {
	              validators: {
	            	  notEmpty: {
	                      message: '实际付款日不能为空'
	                  }
	              }
	          },
	          overdueDays : {
	              validators: {
	            	  notEmpty: {message: '逾期天数不能为空'},
						regexp: {
		                      regexp: /^[0-9]+[0-9]*]*$/,
		                      message: '只能输入正整数'
		                  },
		                callback: {  
		                         message: '逾期天数在0-32767之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=32767);
		                         }  
		                     } 
	              }
	          }, 
	          contractId : {
	                validators: {
	                	 notEmpty: {
		                      message: '合同编号不能为空'
		                  },
	                	 regexp: {
	                		 regexp: /^[a-zA-Z0-9]+$/,
		                     message: '只能使用字母和数字'
	                     }
	                }
	         }, 
	         invoiceId : {
	                validators: {
	                	 notEmpty: {
		                      message: '发票编号不能为空'
		                  },
	                	 regexp: {
	                		 regexp: /^[a-zA-Z0-9]+$/,
		                     message: '只能使用字母和数字'
	                     }
	                }
	         }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			
		});	
}

function numFormat(){
	$("#invoiceAmount").number(true, 2);
	$("#actualPaymentAmount").number(true, 2);
	$("#overdueDays").number(true, 0);
	
}