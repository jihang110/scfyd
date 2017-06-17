$(document).ready(function() {
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	initTable(); 
	//initdykRateTable();
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
	ajaxRelaCorps("txt_productId","productId");
	//financingType();,"productId_js"
	numFormat();
} );

window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			detailFun(row,0);
			},
		'click .mod': function (e, value, row, index) {
				modFun(row,2);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../../loanInfo/delete',
	    					data : '{"loanId":"'+row.loanId+'"}',
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
	$('#loanInfoList').bootstrapTable('destroy');  
	$("#loanInfoList").bootstrapTable({  
         method: "post", 
         url: "../../../loanInfo/list", 
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
         //设置为lloanInfoit可以获取lloanInfoit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               contractNo: jsonData.txt_contractNo
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
 	        field: 'loanId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'orderBatchId',
 	        title: '订单批次号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'loanDate',
 	        title: '放款日期',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'orderAcceptMoney',
 	        title: '接受订单金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    }, {
 	        field: 'orderAllMoney',
 	        title: '超人所需金额总额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    }, {
 	        field: 'loanAmt',
 	        title: '放款金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    }, {
 	        field: 'financeStartDay',
 	        title: '融资起始日',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'financeDueDay',
 	        title: '融资到期日',
 	        align: 'center',
            valign: 'middle'
 	    },  {
 	        field: 'guaranteeMoneyRate',
 	        title: '保证金收取比例',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    }, {
 	        field: 'guaranteeMoney',
 	        title: '保证金',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    },{
 	        field: 'guaranteeMoneyActual',
 	        title: '实缴保证金',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,4);
   		        }
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	        	var m = '<a class = "fa fa-edit mod" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	         var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	        return d+' '+m+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function searchFun() {
	initTable();
}

function addFun() {
	$('#mainFrame',top.document).attr('src','project/ssmManager/LoanInfoManager/loanInfoAdd.html');
/*	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	//$("#productId").attr("disabled",false);
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
*/}

function detailFun(row,isEdit) {
	modFun(row,isEdit);
    document.getElementById("field").disabled=true;
    document.getElementById("btn_save").style.display="none";
    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}

function modFun(row,isEdit) {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$("#productId").attr("disabled",true);
    $('#addModal').modal();
    $('#isEdit').val(isEdit); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveFun() {
 	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var jsonData = eval("(" + data + ")");

    data = JSON.stringify(jsonData);
	var isEdit =  $('#isEdit').val(); 
	
	var options = {
				url : '../../../loanInfo/startProcess',
				data : data,
				callBackFun : function(data) {
					if (data.result == 0) {
						bootbox.alert(data.resultNote);
					} else {
						return false;
					}
				},
				errorCallback : function(data) {
					return false;
				}
			};
	 CloudUtils.ajax(options);
	
/*	if(isEdit == 1){//新增1；修改2
		var options = 	{
				url : '../../../loanInfo/add',
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
				url : '../../../loanInfo/mod',
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
	}*/
	modal.modal("hide");
}




//动态下拉框
function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('productId');
	var options = {
			url : '../../../product/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				control1.append("<option value=''>全部</option>");
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.productId+">" + units.productName + "</option>");
	            	control2.append("<option value="+units.productId+">" + units.productName + "</option>");
	            });  
	            $('#txt_productId').selectOrDie({
					placeholder : '产品名称'
				});
			},
			errorCallback:function(data){
				 alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function financingType(){
	 $('#txt_financingType').selectOrDie({
			placeholder : '融资类型'
		});
}

function dateload(){
	 $('#loanDate').datetimepicker({
       language: 'zh-CN',
       autoclose: 1,
       todayBtn: true,// 显示今天时间
       pickerPosition: "bottom-left",
       minuteStep: 5,
       format: 'yyyy-mm-dd',
       minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
       initialDate : new Date()
      });
	
	 $('#financeStartDay').datetimepicker({
	       language: 'zh-CN',
	       autoclose: 1,
	       todayBtn: true,// 显示今天时间
	       pickerPosition: "bottom-left",
	       minuteStep: 5,
	       format: 'yyyy-mm-dd',
	       minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	       initialDate : new Date()
	      });
	 $('#financeDueDay').datetimepicker({
	       language: 'zh-CN',
	       autoclose: 1,
	       todayBtn: true,// 显示今天时间
	       pickerPosition: "bottom-left",
	       minuteStep: 5,
	       format: 'yyyy-mm-dd',
	       minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	       initialDate : new Date()
	      });
}
/*
function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
*/

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
	    	  financingNote : {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 2000,
			                      message: '长度为1-2000'
			                  }
						}	        	 
		      },
		      financingInstitutions : {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 32,
			                      message: '长度为1-32'
			                  }
						}	        	 
		      },
		      interestRateStandard : {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 200,
			                      message: '字数限制长度为1-200'
			                  }
						}	        	 
		      },
	         interestRate : {
	                validators: {
	      				numeric: {message: '只能输入数字'},
	      				callback: {  
	      					message: '分期超人利率在0~100.0000之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> 0&&parseFloat(value)<100.0000;
	      						}  
	      				} 
	                }
	         },
	         costRate : {
	        	 validators: {
	      				numeric: {message: '只能输入数字'},
	      				callback: {  
	      					message: '分期超人费率在0~100.0000之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> 0&&parseFloat(value)<100.0000;
	      						}  
	      				} 
	                }
	         },dykInterestRate : {
	        	 validators: {
	      				numeric: {message: '只能输入数字'},
	      				callback: {  
	      					message: 'dyk利率在0~100.0000之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> 0&&parseFloat(value)<100.0000;
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
	$("#interestRate").number(true, 4);
	$("#costRate").number(true, 4);
	$("#dykInterestRate").number(true, 4);
}