$(document).ready(function() {
	$("form").attr("autocomplete","off");
	if (preDefKey == 'usertask3') {
		$("#divAdvice").show();
	}
	dateload();
	setForm();
	formValidator();
	numFormat();
});

function dateload(){
	 $('#guaranteePayDate').datetimepicker({
      language: 'zh-CN',
      autoclose: 1,
      todayBtn: true,// 显示今天时间
      pickerPosition: "bottom-left",
      minuteStep: 5,
      format: 'yyyy-mm-dd',
      minView: 'month',// 日期时间选择器所能够提供的最精确的时间选择视图。
      initialDate : new Date(),
      endDate : new Date()
     }).on('hide',function(e) {  
         $('#addForm').data('bootstrapValidator')  
         .updateStatus('guaranteePayDate', 'NOT_VALIDATED',null)  
         .validateField('guaranteePayDate');  
     });;
}

function reapply() {
	
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
	    //没有通过校验 
	 return false;
	} else {
		// 保证金缴纳历史
		var guaranteePayDate = $("#guaranteePayDate").val();
		var payActGuarantee = $("#payActGuarantee").val();
		$("#guaranteePayHis").val(guaranteePayDate + '，实缴保证金' + $.number(payActGuarantee, 2) + '元');
		
		var data = CloudUtils.convertStringJson('addForm');
		data = eval("(" + data + ")");
		data.taskId = taskId;
		
		var options = {
				url : '../../finance/applyGuarantee',
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
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}
}


//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      group:".guarantee_group",
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  payActGuarantee: {
	              validators: {
	                  notEmpty: {
	                      message: '实缴保证金金额不能为空'
	                  },
			      callback: {  
						message: '实缴保证金金额在0~1000000000.00之间',  
							callback: function(value, validator) { 
							return parseFloat(value)> 0 && parseFloat(value)<1000000000;
							}  
					  } 
	              }
	          },
	          note:{
	        	  validators: {
	        		  notEmpty: {message: '备注不能为空'},
	        		  stringLength: {
			              max: 128,
			              message: '备注长度不能超过128'
			          },
	        	  } 
	          },
	          guaranteePayDate:{
	        	  validators: {
	        		  notEmpty: {message: '保证金缴纳日期不能为空'},
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
	$("#financeAmount").number(true, 2);	//融资金额
	$("#guaranteeRate").number(true, 2);	//保证金收取比例
	$("#payAbleGuarantee").number(true, 2);	//应缴保证金金额
	$("#payActGuarantee").number(true, 2);	//实缴保证金金额
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
				CloudUtils.setForm(obj, "addForm");
				
				// 应缴保证金金额
				var financeAmount = $("#financeAmount").val();
				var guaranteeRate = $("#guaranteeRate").val();
				var a = CloudUtils.Math(financeAmount, guaranteeRate, "mul");
				var b = CloudUtils.Math(a, 100, "div");
				$("#payAbleGuarantee").val(CloudUtils.ccyFormatNoPre(b, 2));
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