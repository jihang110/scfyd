$(document).ready(function() {
	$("form").attr("autocomplete","off");
	initInterestTable();
	setForm();
	if (taskDefKey == "usertask3") {
		$("#backTarget").append("<option value='0'>融资申请</option>")
						.append("<option value='1'>登记保证金</option>");
	} else {
		$("#guaranteeAccountAmt").attr("disabled", true);
	}
	// 历史意见取得
	formValidator();
	numFormat();
});

function saveFun() {
	var data = CloudUtils.convertAllJson('addForm');
	var interestListInfo = $("#interestInfoList").bootstrapTable('getData');
	
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.interestListInfo = JSON.stringify(interestListInfo);
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	data.backTarget = $("#backTarget").val();
	
	var options = {
		url : '../../finance/doAgree',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if(data.result==0){
				bootbox.alert(data.resultNote, function() {
					window.location.href = '../../project/agencyTask/agencyTask.html';
				});
			}else{
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  agencyName: {
	              validators: {
	                  notEmpty: {
	                      message: '经销商名称不能为空'
	                  }
	              }
	          },
	          agencyNum: {
	        	  validators: {
	        		  notEmpty: {
	                      message: '经销商名称不能为空'
	                  },
	        		  numeric: {message: '只能输入数字'},
	                  stringLength: {
	                      max: 100,
	                      message: '长度为0-100'
	                  }
		          }
	          },
	          cashRate:{
	        	  validators: {
	        		  notEmpty: {message: '费率不能为空'},
	        		  numeric: {message: '只能输入数字'},
	        		  callback: {  
	                        message: '保证金收取比例在0.00~100.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)>= 0&&parseFloat(value)<=100;
	                        }  
	                    } 
	                  
		          }
	          },
	          financeRate:{
	        	  validators: {
	        		  notEmpty: {message: '融资比例不能为空'},
	        		  numeric: {message: '只能输入数字'},
	        		  callback: {  
	                        message: '保证金收取比例在0.00~100.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)>= 0&&parseFloat(value)<=100;
	                        }  
	                    } 
	                  
		          }
	          },
	          availableCredit:{
	        	  validators: {
	        		  notEmpty: {message: '可用授信额度不能为空'},
	        		  numeric: {message: '只能输入数字'}
	        	  }
	          },
	          maxCredit:{
	        	  validators: {
	        		  notEmpty: {message: '最高授信额度不能为空'},
	        		  numeric: {message: '只能输入数字'}
	        	  } 
	          },
	          expense:{
	        	  validators: {
	        		  notEmpty: {message: '费用不能为空'},
	        		  numeric: {message: '只能输入数字'}
	        	  } 
	          },
	          financeAmount:{
	        	  validators: {
	        		  notEmpty: {message: '费用不能为空'},
	        		  numeric: {message: '只能输入数字'}
	        	  } 
	          }
	      }
		})
		.on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator')
		});
}

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#financeRate").number(true, 2);
	$("#cashRate").number(true, 4);
	$("#financeAmount").number(true, 2);
	$("#expense").number(true, 2);
	$("#payAbleGuarantee").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#guaranteeAccountAmt").number(true, 2);
}

function initInterestTable() {
	$('#interestInfoList').bootstrapTable('destroy'); 
	$("#interestInfoList").bootstrapTable({  
		 method: "post", 
         url: "", 
         striped: true,  //表格显示条纹  
         pagination: false, //启动分页  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           return '{"productId" : "product01"}';
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
 	        field: 'rateStandard',
 	        title: '利率标准',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'dykRate',
 	        title: '利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    }, {
 	        field: 'interest',
 	        title: '利息',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
 	        	return $.number(value, 2);
	    	}
 	    }]
       });
}

function setForm() {
	var options = {
		url : '../../finance/getFinanceInfo',
		data : JSON.stringify({
			taskId: taskId,
			varName : "payApplyJson"
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var obj = JSON.parse(data.str);
				var interestListInfo = obj.interestListInfo;
				CloudUtils.setForm(obj, "addForm");
				if (interestListInfo != null && interestListInfo != '') {
					$.each(JSON.parse(interestListInfo), function(i, row) {
						$("#interestInfoList").bootstrapTable('append', row);
					});
				}
			} else {
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}