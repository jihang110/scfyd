$(function() {
	$("form").attr("autocomplete","off");
	// modal绑定事件
	$('#myModal').on('hidden.bs.modal', function() {
		$("#addForm")[0].reset();
		$("#modDeptForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		$("#modDeptForm").data('bootstrapValidator').resetForm();
	});

	$('#myModal').on('shown.bs.modal', function() {
		$("#addForm")[0].reset();
		$("#modDeptForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		$("#modDeptForm").data('bootstrapValidator').resetForm();
	});

	ajaxtree();
	clickOrDblclick();
	// addfun();
	numFormat();
	$("#modDetp").niceScroll({
		styler : "fb",
		cursorcolor : "#e2e2e2",
		cursorwidth : '8',
		cursorborderradius : '0px',
		background : '#ffffff',
		spacebarenabled : false,
		cursorborder : '0',
		zindex : '1000'
	});
	$("#staffNum,#d_staffNum").on(
			'keyup paste',
			function() {
				$('#addForm').data('bootstrapValidator').updateStatus('staffNum', 'NOT_VALIDATED').validateField('staffNum');
				$('#modDeptForm').data('bootstrapValidator').updateStatus('d_staffNum', 'NOT_VALIDATED').validateField('d_staffNum');
			});

	formValidator();
	formValidator2();
});

/* 根据点击的时间间隔来判断单击还是双击 */
function clickOrDblclick() {
	clickImg();
	dblclickImg();
}
var times = null;
function clickImg() {
	$("#d_orgStructurePath").click(function() {
		clearTimeout(times);
		times = setTimeout(function() {
			if ($("#d_orgStructurePath").attr("src")) {
				var url = $("#d_orgStructurePath")[0].src;
				// location.href=url;
				window.open(url);
			}

		}, 300);
	});
}
function dblclickImg() {
	$("#d_orgStructurePath").dblclick(function() {
		clearTimeout(times);
		fileSelect();
	});
}

var parentId = null;
function ajaxtree() {
	var corpId = store.get("corpId");
	// 查出所有的树，不重session取deptId
	var deptId = null;
	var options = {
		url : "../../dept/tree",
		data : JSON.stringify({
			"corpId" : corpId,
			"deptId" : deptId
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonStringData = JSON.stringify(data.dataList);
				jsonStringData = jsonStringData.replace(/deptName/g, 'text');
				jsonStringData = jsonStringData.replace(new RegExp("subDeptList", "gm"), "nodes");
				var jsonData = eval('(' + jsonStringData + ')');
				$('#dept_tree').treeview(
						{
							// emptyIcon: "glyphicon glyphicon-asterisk",
							data : jsonData,
							showCheckbox : false,
							levels : 0,
							onNodeSelected : function(event, data) {
								$("#modDeptForm")[0].reset();
								$("#modDeptForm").data('bootstrapValidator').resetForm();
								$('#d_deptType').val(data.deptType);
								$('#d_staffNum').val(data.staffNum);
								$('#d_note').val(data.note);
								$('#d_deptName').val(data.text);
								$('#d_functions').val(data.functions);
								$('#d_deptId').val(data.deptId);
								$('#d_corpId').val(data.corpId);
								$("#d_orgStructurePath").attr("src", data.orgStructurePath);
								// CloudUtils.setForm(data,'modDeptForm');
							}
						});
				$('#parentId').treeview(
						{
							data : jsonData,
							showCheckbox : false,
							levels : 0,
							onNodeSelected : function(event, data) {
								var SelectedData = $('#parentId').treeview('getSelected', data.nodeId);
								parentId = SelectedData[0].deptId;
							},
							onNodeUnselected : function(event, data) {
								parentId = null;
							}
						});
				$("#dept_tree ").niceScroll({
					styler : "fb",
					cursorcolor : "#e2e2e2",
					cursorwidth : '8',
					cursorborderradius : '0px',
					background : '#ffffff',
					spacebarenabled : false,
					cursorborder : '0',
					zindex : '1000'
				});
			} else {
				bootbox.alert(data.resultNote);
				return false;
			}

		},
		errorCallback : function(data) {
			bootbox.alert("error");
		}
	};
	CloudUtils.ajax(options);
}

function addfun() {
}

function saveDept() {
	// formValidator();
	$('#myModal').modal({
		backdrop : 'static',
		keyboard : false
	});// 防止点击空白/ESC 关闭

	var da = $('#addForm').data('bootstrapValidator');
	if (!da.isValid()) {
		return false;
	}

	var data = CloudUtils.convertStringJson('addForm');
	data = eval("(" + data + ")");
	data.corpId = store.get("corpId");
	data.parentId = parentId;
	var options = {
		url : "../../dept/add",
		data : JSON.stringify(data),
		callBackFun : function(data) {
			bootbox.alert(data.resultNote);
			if (data.result == 0) {

			} else {
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert("error");
		}
	};
	CloudUtils.ajax(options);
	ajaxtree();
	$('#myModal').modal("hide");
	window.parent.scrollTo(0, 0);
}

function modDept() {
//	$("#modDeptForm")[0].reset();
//	$("#modDeptForm").data('bootstrapValidator').resetForm();
	var data = CloudUtils.convertStringJson('modDeptForm');
	data = eval("(" + data + ")");
	var param = {

		corpId : data.d_corpId,
		deptId : data.d_deptId,
		deptName : data.d_deptName,
		staffNum : data.d_staffNum,
		functions : data.d_functions,
		deptType : data.d_deptType,
		note : data.d_note
	// orgStructurePath : orgStructurePath
	};
	var options = {
		url : "../../dept/mod",
		data : JSON.stringify(param),
		callBackFun : function(data) {
			bootbox.alert(data.resultNote);
			if (data.result == 0) {

			} else {
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert("error");
		}
	};
	CloudUtils.ajax(options);
	ajaxtree();
}

function deleteDept() {
	$("#modDeptForm").data('bootstrapValidator').destroy();
	$('#modDeptForm').data('bootstrapValidator', null);
	formValidator2();
	var deptId = $('#d_deptId').val();
	bootbox.confirm("确定删除此部门？", function(result) {
		if (result) {
			var options = {
				url : "../../dept/delete",
				data : '{"deptId":"' + deptId + '"}',
				callBackFun : function(data) {
					if (data.result == 0) {
						$('#d_deptType').val("");
						$('#d_staffNum').val("");
						$('#d_note').val("");
						$('#d_deptName').val("");
						$('#d_functions').val("");
						$('#d_deptId').val("");
						$('#d_corpId').val("");
						$("#d_orgStructurePath").val("");
						// CloudUtils.setForm(data,'modDeptForm');
					} else {
						bootbox.alert(data.resultNote);
						return false;
					}
				},
				errorCallback : function(data) {
					bootbox.alert("error");
				}
			};
			CloudUtils.ajax(options);
			ajaxtree();
		}
	});

}

function fileSelect() {
	document.getElementById("file").click();
}

function ajaxFileUpload() {
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({
			url : '../../file/binUpload?pathId=2',
			secureuri : false,
			fileElementId : 'file',
			dataType : 'json',
			success : function(data, status) {
				if (data.result == 0) {
					var path = data.fileUrl;
					var filename;
					if (path.indexOf("/") > 0)// 如果包含有"/"号
					// 从最后一个"/"号+1的位置开始截取字符串
					{
						filename = path.substring(path.lastIndexOf("/") + 1, path.length);
					} else {
						filename = path;
					}
					$("#orgStructurePath").val(data.fileUrl);
					$("#d_orgStructurePath").attr("src", data.fileUrl);
					// bootbox.alert("上传成功！");
				} else {
					bootbox.alert("上传失败！");
				}
			},
			error : function(data, status, e) {
				bootbox.alert(e);
			}
		});
	} else {
		bootbox.alert("请选择图片");
	}

}

// form验证规则
function formValidator() {
	$('#addForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			deptName : {
				validators : {
					notEmpty : {
						message : '部门名称不能为空'
					},
					stringLength : {
						min : 1,
						max : 10,
						message : '用户名长度为1-10'
					}
				}
			},
			deptType : {
				validators : {
					stringLength : {
						max : 64,
						message : '部门性质长度不能超过64'
					}
				}
			},
			staffNum : {
				validators : {
					// stringLength: {
					// max: 11,
					// message: '长度为1-11'
					// },
					regexp : {
						regexp : /^[1-9]\d*$/,
						message : '只能输入正整数'
					},
					callback : {
						message : '人数在1-1000000之间',
						callback : function(value, validator) {
							if(CloudUtils.isEmpty(value)) {
								return true;
							}
							return parseFloat(value) <= 1000000;
						}
					}
				}
			},
			functions : {
				validators : {
					stringLength : {
						max : 64,
						message : '主要职能长度不能超过64'
					}
				}
			},
			note : {
				validators : {
					stringLength : {
						max : 128,
						message : '部门描述长度不能超过128'
					}
				}
			}

		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();

	});
}

function formValidator2() {
	$('#modDeptForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			d_deptName : {
				validators : {
					notEmpty : {
						message : '部门名称不能为空'
					},
					stringLength : {
						min : 1,
						max : 10,
						message : '用户名长度为1-10'
					}
				}
			},
			d_deptType : {
				validators : {
					stringLength : {
						max : 64,
						message : '部门性质长度不能超过64'
					}
				}
			},
			d_staffNum : {
				validators : {
					// stringLength: {
					// max: 11,
					// message: '长度为1-11'
					// },
					regexp : {
						regexp : /^[1-9]\d*$/,
						message : '只能输入正整数'
					},
					callback : {
						message : '人数在1-1000000之间',
						callback : function(value, validator) {
							if(CloudUtils.isEmpty(value)) {
								return true;
							}
							return parseFloat(value) <= 1000000;
						}
					}
				}
			},
			d_functions : {
				validators : {
					stringLength : {
						max : 64,
						message : '主要职能长度不能超过64'
					}
				}
			},
			d_note : {
				validators : {
					stringLength : {
						max : 128,
						message : '部门描述长度不能超过128'
					}
				}
			}

		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
	});
}

function numFormat() {
	$("#staffNum").number(true, 0);
	$("#d_staffNum").number(true, 0);
}