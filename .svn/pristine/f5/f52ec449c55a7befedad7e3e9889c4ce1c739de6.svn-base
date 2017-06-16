$(document).ready(function() {
	initTable(); 
	formValidator();
	dateload();
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
		'click .remove': function (e, value, row, index) {
			bootbox.confirm("确定删除此条记录?", function(result) {  
				if (result) {  
					var options = {
							url : '../../receiveAccount/delete',
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
	$('#receiveAccountManagerList').bootstrapTable('destroy');  
	$("#receiveAccountManagerList").bootstrapTable({  
		method: "post", 
		url: "../../receiveAccount/list", 
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
					invoiceNo:jsonData.txt_invoiceNo,
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
			title: '买方名称',
			align: 'center',
			valign: 'middle',
		},{
			field: 'contractNo',
			title: '合同编号',
			align: 'center',
			valign: 'middle',
			visible: false
		},{
			field: 'invoiceNo',
			title: '发票编号',
			align: 'center',
			valign: 'middle'
		}, {
			field: 'invoiceType',
			title: '收款类型',
			align: 'center',
			valign: 'middle',
			visible: false,
			formatter:function(value,row,index){
				if(value==1){
					return "发票";
				}
			} 
		}, {
			field: 'invoiceAmount',
			title: '发票金额(元)',
			align: 'center',
			valign: 'middle',
			visible: false
		}, {
			field: 'invoiceDate',
			title: '开票日期',
			align: 'center',
			valign: 'middle',
			visible: false
		}, {
			field: 'estimatedPayDate',
			title: '预计付款日期',
			align: 'center',
			valign: 'middle'
		}, {
			field: 'estimatedPayAmount',
			title: '预计付款金额(元)',
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
 	 	    	return $.number(value,2);
		        }
		}, {
			field: 'actualPayDate',
			title: '实际付款日期',
			align: 'center',
			valign: 'middle'
		}, {
			field: 'actualPayAmount',
			title: '实际付款金额(元)',
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
		}, {
			field: 'ifOverdue',
			title: '是否逾期',
			align: 'center',
			valign: 'middle',
			formatter:function(value,row,index){
				if(value==0){
					return "否";
				}else{
					return "是";
				}
			} 
		},{
			field: 'overdueDays',
			title: '逾期天数',
			align: 'center',
			valign: 'middle'
		}, {
			field: 'operation',
			title: '操作',
			align: 'center',
			formatter:function(value,row,index){
				var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
				var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
				return m+' '+r;
			},
			events: 'operateEvents'
		}]
	});  
}

function searchFun() {
	initTable();
}

function addFun() {
	$("#corpId").attr("disabled",false);
	$("#addModalLabel").text("添加");
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#isEdit').val(1); //新增1；修改2
}


function modFun(row) {
	$("#corpId").attr("disabled",true);
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$("#addModalLabel").text("修改");
	$('#addModal').modal();
	$('#isEdit').val(isEdit); //新增1；修改2
	CloudUtils.setForm(row,'addForm');
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    var modal = $('#addModal');
     modal.modal("hide");
	var data = CloudUtils.convertStringJson('addForm');
	 var jsonData = eval("(" + data + ")");
	 var date = new Date();
     var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
     if(CompareDate(jsonData.invoiceDate,today))
     {
    	 bootbox.alert("开票日期不能大于当前时间！");
         return false;
     }
     if(CompareDate(jsonData.actualPayDate,today))
     {
    	 bootbox.alert("实际付款日期不能大于当前时间！");
         return false;
     }
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../receiveAccount/add',
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
				url : '../../receiveAccount/mod',
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
				control1.append("<option value=''>全部</option>");
				$.each(data.dataList, function (index, units) {  
					control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
					control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
				});
				 $('#txt_corpId').selectOrDie({
						placeholder: '买方名称'
							
					});
			},
			errorCallback:function(data){
				alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function dateload(){
	$('#invoiceDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	$('#estimatedPayDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	$('#actualPayDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	 $('#invoiceDate').datetimepicker('setEndDate', new Date());
     $('#actualPayDate').datetimepicker('setEndDate', new Date());
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
			contractNo : {
				validators: {
					stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '合同编号长度为1-32'
	                  },
					notEmpty: {message: '合同编号不能为空'}
				}
			},
			invoiceNo : {
				validators: {
					stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '发票编号长度为1-32'
	                  },
					notEmpty: {message: '发票编号不能为空'}
				}
			},
			invoiceAmount : {
				validators: {
					notEmpty: {message: '发票金额不能为空'},
                	numeric: {message: '只能输入数字'},
                	callback: {  
                         message: '发票金额在0-999999999.99之间',  
                         callback: function(value, validator) { 
                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999999.99;
                         }  
                     } 
//					regexp: {
//	                      regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
//	                      message: '只能输入正数'
//	                  }
				}
			},
			invoiceDate : {
				validators: {
					notEmpty: {message: '开票日期不能为空'}
				}
			},
			estimatedPayDate : {
				validators: {
					notEmpty: {message: '预计付款日期不能为空'}
				}
			},
			actualPayDate : {
				validators: {
					notEmpty: {message: '实际付款日期不能为空'}
				}
			},
			estimatedPayAmount : {
				validators: {
					notEmpty: {message: '预计付款金额不能为空'},
                	numeric: {message: '只能输入数字'},
                	callback: {  
                         message: '预计付款金额在-1000000000.00~1000000000.00之间',  
   						callback: function(value, validator) { 
      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
                         }  
                     } 
//					regexp: {
//	                      regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
//	                      message: '只能输入正数'
//	                  }
				}
			},
			actualPayAmount : {
				validators: {
					notEmpty: {message: '实际付款金额不能为空'},
					numeric: {message: '只能输入数字'},
                	callback: {  
                         message: '实际付款金额在-1000000000.00~1000000000.00之间',  
   						callback: function(value, validator) { 
      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
                         }  
                     } 
//					regexp: {
//	                      regexp: /^(0|([1-9]\d*))(\.\d+)?$/,
//	                      message: '只能输入正数'
//	                  }
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
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=32767;
	                         }  
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
	$("#estimatedPayAmount").number(true, 2);
	$("#actualPayAmount").number(true, 2);
}