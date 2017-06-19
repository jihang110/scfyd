$(document).ready(function() {
	$("form").attr("autocomplete","off");
	setForm();
	formValidator();
	numFormat();
});

function setForm() {
	var options = {
		url : '../../commitment/getDataByTaskId',
		data : JSON.stringify({
			taskId : taskId,
			varName : "payApplyJson"
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var json = JSON.parse(data.str);
				CloudUtils.setForm(json, "addForm");
			} else {
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

function numFormat(){
	$("#payM").number(true, 2);
	$("#guaranteeAmt").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#guaranteeDiff").number(true, 2);
	$("#financeAmount").number(true, 2);
}

function reapply() {
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
	    //没有通过校验 
	 return false;
	} else {
	
		var data = CloudUtils.convertStringJson('addForm');
		var jsonData = eval("(" + data + ")");
		jsonData.taskId = taskId;
		
		var options = {
				url : "../../commitment/fillGuarantee",
				data : JSON.stringify(jsonData),
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
	      group:".fill_group",
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  remark:{
	        	  validators: {
	        		  notEmpty: {message: '备注不能为空'},
	        		  stringLength: {
			              max: 128,
			              message: '备注长度不能超过128'
			          },
	        	  } 
	          }
	      }
		}).on('success.form.bv', function (e) {
	        // Prevent form submission
	        e.preventDefault();
	        // Get the form instance
	        var $form = $(e.target);
	        // Get the BootstrapValidator instance
	        var bv = $form.data('bootstrapValidator')
		});
}