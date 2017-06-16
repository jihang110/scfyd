$(document).ready(function() {
	initTable(); 
	formValidator();
	assoInput();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	ajaxRelaCorps("txt_corpId","corpId");
	numFormat();
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    },
	    /*'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../recManage/delete',
	    					data : '{"recUid":"'+row.recUid+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							searchFun();
	    							bootbox.alert(data.resultNote);
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
	    }*/
	};

function initTable() { 
	$('#recManagerList').bootstrapTable('destroy');  
	$("#recManagerList").bootstrapTable({  
         method: "post", 
         url: "../../recManage/list", 
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
           var corpId = store.get("corpId");
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: corpId,
               projectName:jsonData.txt_projectName,
               contractNo:jsonData.txt_contractNo
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
 	    },{
			field: 'corpName',
			title: '企业名称',
			align: 'center',
			valign: 'middle',
			 visible: false
		},{
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'balanceAccount',
 	        title: '结算账户',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'expenseType',
 	        title: '费用类型',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'actualAmount',
 	        title: '实还金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    }, {
 	        field: 'shouldRepayAmount',
 	        title: '应还金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	       /*  var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';*/
	 	        return m/*+' '+r*/;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function searchFun() {
	initTable();
}

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}


function modFun(row) {

	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    $('#expenseType').attr("readonly",true);
    $('#shouldRepayAmount').attr("readonly",true);
    CloudUtils.setForm(row,'addForm');
    
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
 	$("#addModal").modal("hide");
	var data = CloudUtils.convertStringJson('addForm');
	 data = eval("(" + data + ")");
	 var corpId = store.get('corpId');
	 data.corpId = corpId;
     data = JSON.stringify(data);        
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../recManage/add',
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
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}else{
		var options = {
				url : '../../recManage/mod',
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
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}
    }
}

//动态下拉框
function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            });  
			},
			errorCallback:function(data){
				 alert("error");  
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
	    	 /* projectName : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '项目名称长度为1-32'
		                  },
	                	notEmpty: {message: '项目名称不能为空'}
	                	//numeric: {message: '只能输入数字'}
	                }
	         },
	         contractNo : {
	                validators: {
	                	notEmpty: {message: '合同编号不能为空'}
	                }
	         },
	         balanceAccount : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '结算账户长度为1-32'
		                  },
	                	notEmpty: {message: '结算账户不能为空'}
	                }
	         },
	         expenseType : {
	                validators: {
	                	stringLength: {
		                      min: 0,
		                      max: 32,
		                      message: '结算账户长度为0-32'
		                  }
	                }
	         },*/
	         actualAmount : {
	                validators: {
//	                	regexp: {
//		                      regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
//		                      message: '只能输入正数'
//		                  }
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '实还金额在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999999.99;
	                         }  
	                     } 
	                }
	         }/*,
	         shouldRepayAmount : {
	                validators: {
//	                	regexp: {
//		                      regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
//		                      message: '只能输入正数'
//		                  }
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '应还金额在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999999.99;
	                         }  
	                     } 
	                }
	         }*/
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}

/*
 * 联想输入
 */
function assoInput(){
	var options = {
			url : '../../expense/list',
			data : "{}",
			callBackFun : function(data) {
				var div1 = document.getElementById('browsers');
				var code = '';
				$.each(data.dataList, function(i, value) {
					code +='<option value="'+value.projectName+'">'
				});
				 div1.innerHTML = code + '';
			},
			errorCallback:function(data){
				bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function numFormat(){
	$("#actualAmount").number(true, 2);
	$("#shouldRepayAmount").number(true, 2);
	
}
