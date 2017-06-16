$(function() {
	$("form").attr("autocomplete","off");
	//CloudUtils.ajax(CloudUtils.options);
	CloudUtils.getMenuNames("nav");
	CloudUtils.inputCacheClear();
	formValidator1();
	formValidator2();
	ajxa();
	setLevelVal();
	// modal绑定事件
	$('#myModal').on('hidden.bs.modal', function() {
		$("#addMenuForm").bootstrapValidator('resetForm', true);
		$("#modMenuForm").bootstrapValidator('resetForm', true);
		// $("#addForm").data('bootstrapValidator').resetForm();
	});
});

function setLevelVal(){
$('#parentId').on('nodeSelected', function(event, data) {
		var i = parseInt(data.menuLevel)+1;
		$("#menuLevel").val(i);
	})
$('#parentId').on('nodeUnselected', function(event, data) {
		$("#menuLevel").val(1);
})
}

var parentId = null;
function ajxa(text) {
	var options = {
		url : "../../menu/tree",
		data : '{"roleId":"","isRelation":"0"}',
		callBackFun : function(data) {
			// 逆转：json对象 = eval('('+ js字符串 +')')
			var jsonStringData = JSON.stringify(data.dataList);
			jsonStringData = jsonStringData.replace(/menuName/g, 'text');//
			// jsonStringData=jsonStringData.replace(/menuId/g,'nodeId');
			jsonStringData = jsonStringData.replace(new RegExp("subMenuList","gm"), "nodes");
			// alert(jsonStringData);
			// var data = '{"roleId":"","isRelation":"1"}';
			var jsonData = eval('(' + jsonStringData + ')');
			$('#menu_tree').treeview({
				data : jsonData,
				highlightSearchResults: false,
				showCheckbox : false
			});
			if (text) {
				var node = $('#menu_tree').treeview('search', text, {exactMatch: false, revealResults:false});
				$('#menu_tree').treeview('selectNode', node[0], {silent: false});
			} else{
				$('#menu_tree').on('nodeSelected', function(event, data) {
					$("#modMenuForm").bootstrapValidator('resetForm', true);
					$('#m_menuId').val(data.menuId);
					$('#m_menuName').val(data.text);
					$('#m_menuLevel').val(data.menuLevel);
					$('#m_menuOrder').val(data.menuOrder);
					$('#m_menuPath').val(data.menuPath);
					$('#m_parentId').val(data.parentId);
					$('#m_note').val(data.note);
				});
			}
			//父菜单下拉列表
			$('#parentId').treeview({
				data : jsonData,
				levels:0,
				onNodeSelected : function(event,data){
         			var SelectedData = $('#parentId').treeview('getSelected', data.nodeId);
         			parentId = SelectedData[0].menuId;
				}
			});
			$("#menu_tree ").niceScroll({styler:"fb",cursorcolor:"#e2e2e2", cursorwidth: '8', cursorborderradius: '0px', background: '#ffffff', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});
			$('#menu_tree').treeview('collapseAll', { silent: true });
		},
		errorCallback : function(data) {
			alert("error");
		}
	};
	CloudUtils.ajax(options);
}

// 删除菜单
function deleteMenu() {
	bootbox.confirm("确定删除此条记录?", function(result) { 
		if(result){
			var data = CloudUtils.convertStringJson('modMenuForm');
			data = eval("(" + data + ")");
			
			var options = {
				url : "../../menu/delete",
				data : '{"menuId":"' + data.m_menuId + '"}',
				callBackFun : function(data) {
					if(data.result==0){
						ajxa();
						bootbox.alert(data.resultNote);
						$('#m_menuId').val('');
					}else{
						bootbox.alert(data.resultNote);
						return false;
					}
				},
				errorCallback : function(data) {
					bootbox.alert("error");
				}
			};
			CloudUtils.ajax(options);
			$("#modMenuForm")[0].reset();
		}
	});
}

// 添加菜单
function addMenu() {
	 
	$('#myModal').modal('hide');
	var data = CloudUtils.convertStringJson('addMenuForm');
	data = eval("(" + data + ")");
	data.parentId = parentId;
	var menu = $('#parentId').treeview('getSelected', 0);
	if (menu.length == 0) {
		menu = $('#parentId').treeview('getSiblings', 0);
		data.menuLevel = 1;
		data.menuOrder = menu[menu.length-1].menuOrder + 1;
	} else if(menu[0].menuLevel != 3){
		data.menuLevel = menu[0].menuLevel + 1;
		data.menuOrder = menu[0].nodes == null ? 1 : menu[0].nodes[menu[0].nodes.length-1].menuOrder + 1;
	}else {
		bootbox.alert("不能添加4级菜单");
		return;
	}
	var options = {
			url : "../../menu/add",
			data : JSON.stringify(data),
			callBackFun : function(data) {
				if(data.result==0){
					ajxa();
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
function mod(){
	var da = $('#modMenuForm').data('bootstrapValidator');
	da.validate();
	if(!da.isValid()){  
		return false;
    }else{
    	modMenu();
    }
}

// 修改菜单
function modMenu() {
	var data = CloudUtils.convertStringJson('modMenuForm');
	data = eval("(" + data + ")")
	var paramTemp = {
		menuLevel : data.m_menuLevel,
		menuName : data.m_menuName,
		menuOrder : data.m_menuOrder,
		menuPath : data.m_menuPath,
		note : data.m_note,
		parentId : data.m_parentId,
		menuId : data.m_menuId
	};
	var menu = $('#menu_tree').treeview('getSelected', 0);
	var options = {
		url : "../../menu/mod",
		data : JSON.stringify(paramTemp),
		callBackFun : function(data) {
			if(data.result==0){
				ajxa();
				bootbox.alert(data.resultNote);
			}else{
				bootbox.alert("请先勾选菜单！");
				return false;
			}
		},
		errorCallback:function(data){
			bootbox.alert("error");
		}
	};
	CloudUtils.ajax(options);
}
//上移
function upMenu() {
	var menu = $('#menu_tree').treeview('getSelected', 0);
	if (menu.length == 0) {
		bootbox.alert('没有选择菜单');
	} else {
		var temp = $('#menu_tree').treeview('getSiblings', menu[0].nodeId);
		var i = temp.findIndex((a) => a.nodeId > menu[0].nodeId);
		if (i == 0) {// 第一个，不用移动
			bootbox.alert('已经是第一个菜单');
			return ;
		} else {
			temp.splice((i == -1 ? temp.length-1 : i-1), 0,  menu[0]);
		}
		var arr = temp.map((a, index) => {
			return {menuId: a.menuId, order: index+1};
		});
		var options = {
			url : "../../menu/move",
			data : JSON.stringify(arr),
			callBackFun : function(data) {
				if(data.result==0){
//					ajxa(menu[0].text);
					ajxa();
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
}

// 下移
function downMenu(arr, $index) {
	var menu = $('#menu_tree').treeview('getSelected', 0);
	if (menu.length == 0) {
		bootbox.alert('没有选择菜单');
	} else {
		var temp = $('#menu_tree').treeview('getSiblings', menu[0].nodeId);
		var i = temp.findIndex((a) => a.nodeId > menu[0].nodeId);
		if (i == -1) {// 最后一个，不用移动
			bootbox.alert('已经是最后一个菜单');
			return ;
		} else {
			temp.splice(i+1, 0,  menu[0]);
		}
		var arr = temp.map((a, index) => {
			return {menuId: a.menuId, order: index+1};
		});
		var options = {
			url : "../../menu/move",
			data : JSON.stringify(arr),
			callBackFun : function(data) {
				if(data.result==0){
//					ajxa(menu[0].text);
					ajxa();
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
}
// form表单验证
function formValidator1() {
	$('#addMenuForm').bootstrapValidator({
		message : 'This value is not valid',
		excluded: ':disabled',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			menuName : {
				validators : {
					notEmpty : {
						message : '菜单名称不能为空'
					},
					stringLength : {
						min : 2,
						max : 10,
						message : '菜单名称长度为2-10'
					}
				}
			},
			menuOrder : {
	    		  validators: {
						
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '菜单序列在0-99之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<100;
	                        }  
	                    } 
					}
	         },
	         note : {
					validators : {
						
						stringLength : {
							min : 0,
							max : 100,
							message : '备注字数为0-100'
						}
					}
				},
				
			menuPath : {
					validators : {
						
						stringLength : {
							min : 0,
							max : 100,
							message : '路径最大字数为100'
						}
					}
				}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		addMenu();
		$(e.target).bootstrapValidator('resetForm', true);
	});
}


function formValidator2() {
	$('#modMenuForm').bootstrapValidator({
		message : 'This value is not valid',
		excluded: ':disabled',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			m_menuName : {
				validators : {
					notEmpty : {
						message : '菜单名称不能为空'
					},
					/*regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入中文或英文'
	                },*/
					stringLength : {
						min : 2,
						max : 10,
						message : '菜单名称长度为2-10'
					}
				}
			},
			/*m_menuOrder : {
	    		  validators: {
						
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '菜单序列在0-99之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=99;
	                        }  
	                    } 
					}
	         },*/
	         m_note : {
					validators : {
						
						stringLength : {
							min : 0,
							max : 100,
							message : '备注字数为0-100'
						}
					}
				},
				
				m_menuPath : {
					validators : {
						
						stringLength : {
							min : 0,
							max : 100,
							message : '路径最大字数为100'
						}
					}
				}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		modMenu();
		var $form = $(e.target);
		$form.bootstrapValidator('resetForm', true); 
	});
}