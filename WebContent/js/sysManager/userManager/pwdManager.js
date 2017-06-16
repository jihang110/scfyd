$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	CloudUtils.inputCacheClear();
	$("#userId").val(store.get('userId'));
	formValidator();
} );
 
convertStringJson = function(form) { 
	var v = null;	 
		v={};
		var o = $("#"+form).serializeArray();
		for ( var i in o) {
			if(!o[i].name){
				//忽略length属性
				continue;
			}
			if (typeof (v[o[i].name]) == 'undefined')
				//v[o[i].name] = o[i].value;
					//对password加密
				if ("oldPassword" == o[i].name || "newPassword" == o[i].name ) {
					v[o[i].name] = hex_md5(o[i].value);
				}
				else {
					v[o[i].name] = o[i].value;				
				}				
			else
				v[o[i].name] += "," + o[i].value;
		}
	return JSON.stringify(v);
};

function pwdSubmit() {
	var data = convertStringJson('pwdModify');
	
	$.ajax({
		url:'../../user/updatePassword',
		contentType: "application/json",
		type: 'post',
		cache:false,
		async: false,
		dataType:'json',
		timeout: 5000,
		data: data,
		error: function(ret){bootbox.alert("error");},
		success: function(data){
			if(data.result==0){
				bootbox.alert("密码修改成功！");
				$('input').val("");
			}else{
				bootbox.alert("原密码错误！");
				$('input').val("");
				return false;
			}
		}
		
	}); 
}

//form验证规则
function formValidator(){
	$('#pwdModify').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  oldPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '请输入原密码'
	                  }
	              }
	          },
	          newPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '新密码不能为空'
	                  },
	                  stringLength: {
	                      min: 6,
	                      max: 20,
	                      message: '密码长度为6-20'
	                  },
	                  regexp: {
	                      regexp: "^([A-Z]|[a-z]|[0-9]){6,}$",
	                      message: '密码由字母或数字字符组成'
	                  },
	                  different: {
	                      field: 'oldPassword',
	                      message: '新密码不能和原密码相同'
	                  },
	                  identical: {
	                      field: 'confirmPassword',
	                      message: '两次输入密码不一致'
	                  },
	              }
	          },
	          confirmPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '密码确认不能为空'
	                  },
	                  regexp: {
	                      regexp: "^([A-Z]|[a-z]|[0-9]){6,}$",
	                      message: '密码由字母或数字字符组成'
	                  },
	                  identical: {
	                      field: 'newPassword',
	                      message: '两次输入密码不一致'
	                  },
	                  different: {
	                      field: 'oldPassword',
	                      message: '密码不能和原密码相同'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			pwdSubmit();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}


