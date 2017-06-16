$(document).ready(function() {
	$("form").attr("autocomplete","off");
	"use strict";
	CloudUtils.getMenuNames("nav");
	CloudUtils.ajax(CloudUtils.options);
	
	//option下拉选
	ajaxOption("roleType");
	ajaxOption("r_roleType");
	
	//初始化table
	initTable();
	
	formValidator();
	
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
		window.parent.scrollTo(0,0);
	});
	
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	
//	
//	$('#addModal').on('show.bs.modal', function () {
//		$("#addForm").data('bootstrapValidator').resetForm();
//	});
//	
//	$('#addModal').on('shown.bs.modal', function () {
//		$("#addForm")[0].reset();
//		$("#addForm").data('bootstrapValidator').resetForm();
//	});
	
} );

//修改和删除操作
window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			modFun(row,0);
		 },
		'click .mod': function (e, value, row, index) {
			modFun(row,2);
		 },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	    			var options = {
	    					url : '../../role/delete',
	    					data : '{"roleId":"'+row.roleId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							selectRole();
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

//表格创建
function initTable() {
	$('#roleListTable').bootstrapTable('destroy');
	$('#roleListTable').bootstrapTable({
		method: "post",
		url: "../../role/list",
		striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,
		 sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber:1,                       //初始化加载第一页，默认第一页
         pageSize: 5,                       //每页的记录行数（*）
         pageList: [5,10,15,20,25],        //可供选择的每页的行数（*）
         search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         strictSearch: false,
         showColumns: false,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
//         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: false,                //是否启用点击选中行
         showColumns: false,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('roleForm');
           var corpId = store.get("corpId");
           var jsonData = eval("(" + data + ")");
           var ispage = {isPage:1};
           var paramTemp = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               roleName: jsonData.r_roleName,
               roleType: jsonData.r_roleType,
               corpId:corpId
           };    
           var param = $.extend({},ispage,paramTemp);
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
	        field: 'roleId',
	        title: '角色Id',
	        align: 'center',
	        valign: 'middle',
	        visible:false
	    } , {
	        field: 'roleName',
	        title: '角色名称',
	        align: 'center',
	        valign: 'middle'
	    },{
	        field: 'roleTypeName',
	        title: '角色类型',
	        align: 'center',
	        valign: 'middle'
	    },{
	        field: 'roleType',
	        title: '角色类型',
	        align: 'center',
		    valign: 'middle',
		    visible:false
	    }, {
	        field: 'operation',
	        title: '操作',
	        align: 'center',
		    valign: 'middle',
	        formatter:function(value,row,index){
	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情"  href="javascript:void(0)"></a>';
	        	 var s = '<a class = "fa fa-edit mod" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	         var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	            return d+' '+s+' '+r;
	        },
	        events: 'operateEvents'
	    }]
	});
}

//ajax
//下拉框
function ajaxOption(Id1){
	 var options = {
				url : "../../role/selectAllRoleList",
				data : JSON.stringify({}),
				callBackFun : function(data) {
					var control1 = $('#' + Id1);
					
					if(Id1 == "r_roleType") {
						control1.html('');
						control1.append("<option value=''>全部</option>"); 
					}
					
					if(data.result==0){
						 $.each(data.dataList, function(i, n) {
				           	 control1.append('<option value="' + n.roleType + '">' + n.roleTypeName + '</option>');
				           	 
				           });
					}else{
						bootbox.alert(data.resultNote);
						return false;
					}
//			            $('#r_roleType').selectOrDie({
//					      //  placeholder: '角色类型'
//					    });
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
			};
			CloudUtils.ajax(options);
}

//点击查询按钮生成表格
function selectRole(){
	initTable();
}

function addRole(){
	$("#addForm input").attr('disabled',false);
	//生成动态菜单树
	$("#addForm [name='roleType']").attr("disabled", false);
	//var data = '{"roleId":"","isRelation":"1"}';
	ajaxMenu(false);
	$("#addModalLabel").text("添加");
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#isEdit').val(1); //新增1；修改2
	$("#btn_save").show();
}

function saveRole(){
	var jsonlistadd = [];
	var tt =  $('#treeview12').treeview('getChecked', 0);
	for(var i=0;i<tt.length;i++){
		jsonlistadd.push(tt[i].menuId);
	}
	var data = CloudUtils.convertStringJson('addForm');
	//getMenuName();
	ajaxMenu(false);
	data = eval("(" + data + ")");
	data.corpId = store.get("corpId");
	data.menuIdList = jsonlistadd;
	
	if($.isEmptyObject(data.roleName)){
		return false;
	}

	if(jsonlistadd.length == 0){
		bootbox.alert("菜单不能为空！");
		return false;
	}
	
	$("#addForm").data("bootstrapValidator").isValid();
	var isEdit =  $('#isEdit').val();
	var modal = $('#addModal');
    //modal.modal("hide");
	if(isEdit == 1){//新增1；修改2
	 var options = {
				url : "../../role/add",
				data : JSON.stringify(data),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						selectRole();
						jsonlistadd = [];
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
				url : "../../role/mod",
				data : JSON.stringify(data),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						selectRole();
						jsonlistadd = [];
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
	modal.modal("hide");
	window.parent.scrollTo(0,0);
}

function modFun(row,isEdit){
	var data = '{"roleId":"'+row.roleId+'","isRelation":"1"}';
	var menuList = null;
	var options = {
			url : "../../menu/tree",
			data : '{"roleId":"","isRelation":"0"}',
			callBackFun : function(data) {
				if(data.result==0){
					menuList = JSON.stringify(data.dataList);
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
	ajaxMenu(true);
	var options = {
			url : "../../menu/tree",
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					CloudUtils.checkByJson("treeview12",menuList,data);
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
	if(isEdit==2){
		$("#addForm input").attr('disabled',false);
		$('#isEdit').val(isEdit); //新增1；修改2
		$("#addModalLabel").text("修改");
		$("#btn_save").show();
	}else{
		$("#addModalLabel").text("详情");
		$("#btn_save").hide();
		$("#addForm input").attr('disabled',true);
	}
	$("#roleType").attr("disabled", true);
	
	CloudUtils.setForm(row,'addForm');
	$('#addModal').modal();
}

//生成动态菜单树
var jsonlistadd=new Array();
function ajaxMenu(uncheckableFlag){
	var options = {
			url : "../../menu/tree",
			data : '{"roleId":"","isRelation":"0"}',
			callBackFun : function(data) {
			var jsonStringData = JSON.stringify(data.dataList);
			jsonStringData=jsonStringData.replace(/menuName/g,'text');
			jsonStringData=jsonStringData.replace(new RegExp("subMenuList","gm"),"nodes");
			var jsonData=eval('('+ jsonStringData +')');
//			for(var i = 0; i < jsonData.length; i++) {
//				jsonData[i].state = {
//						disabled: true
//				};
//				
//			}
//			jsonData[2].state = {
//					disabled: true
//			};
			$('#treeview12').treeview({
         		 	data:jsonData,
         		 	showCheckbox:true,
         		 	highlightSelected: false,
         		 	multiSelect:true,
         		 	levels:0,
         		 	uncheckable : uncheckableFlag,
         		 	onNodeSelected  : function(event, data) {
         		 		$('#treeview12').treeview('checkNode', [ data.nodeId, { silent: true } ]);
         		 		if(data.menuLevel ==1){
         		 			$.each(data.nodes, function(i, o) {
                		 		$('#treeview12').treeview('checkNode', [ o.nodeId, { silent: true } ]);
                		 		$.each(o.nodes, function(h, u) {
                    		 		$('#treeview12').treeview('checkNode', [ u.nodeId, { silent: true } ]);
                 		 		 });
             		 		 });
         		 		}else if(data.menuLevel ==2){
         		 			var obj= $('#treeview12').treeview('getParent', data.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ obj.nodeId, { silent: true } ]);
     		 				$.each(data.nodes, function(i, o) {
                		 		$('#treeview12').treeview('checkNode', [ o.nodeId, { silent: true } ]);
             		 		 });
         		 		}else{
         		 			var obj= $('#treeview12').treeview('getParent', data.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ obj.nodeId, { silent: true } ]);
     		 				var objparent = $('#treeview12').treeview('getParent', obj.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ objparent.nodeId, { silent: true } ]);
         		 		}
         		 		if($("#addForm").data('bootstrapValidator').isValid()) {
         		 			document.getElementById("btn_save").disabled=false;
         		 		}

         		 	 },
         		 	onNodeChecked : function(event ,data){
         		 		if(data.menuLevel ==1){
         		 			$.each(data.nodes, function(i, o) {
                		 		$('#treeview12').treeview('checkNode', [ o.nodeId, { silent: true } ]);
                		 		$.each(o.nodes, function(h, u) {
                    		 		$('#treeview12').treeview('checkNode', [ u.nodeId, { silent: true } ]);
                 		 		 });
             		 		 });
         		 		}else if(data.menuLevel ==2){
         		 			var obj= $('#treeview12').treeview('getParent', data.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ obj.nodeId, { silent: true } ]);
     		 				$.each(data.nodes, function(i, o) {
                		 		$('#treeview12').treeview('checkNode', [ o.nodeId, { silent: true } ]);
             		 		 });
         		 		}else{
         		 			var obj= $('#treeview12').treeview('getParent', data.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ obj.nodeId, { silent: true } ]);
     		 				var objparent = $('#treeview12').treeview('getParent', obj.nodeId);
     		 				$('#treeview12').treeview('checkNode', [ objparent.nodeId, { silent: true } ]);
         		 		}
//         		 		$('#treeview12').treeview('checkNode', [ data.nodeId, { silent: true } ]);
         		 		if($("#addForm").data('bootstrapValidator').isValid()) {
         		 			document.getElementById("btn_save").disabled=false;
         		 		}
         		 	},
         		 	onNodeUnselected  : function(event, data) {
         		 		$('#treeview12').treeview('uncheckNode', [ data.nodeId, { silent: true } ]);
         		 		if(data.menuLevel == 1){
         		 			$.each(data.nodes, function(i, o) {
            		 			$('#treeview12').treeview('uncheckNode', [ o.nodeId, { silent: true } ]);
            		 		$.each(o.nodes, function(h, u) {
                    		 	$('#treeview12').treeview('uncheckNode', [ u.nodeId, { silent: true } ]);
                 		 		 });
         		 		 });
         		 		}else if(data.menuLevel == 2){
         		 			$.each(data.nodes, function(i, o) {
            		 			$('#treeview12').treeview('uncheckNode', [ o.nodeId, { silent: true } ]);
         		 		 });
         		 			var parent = $('#treeview12').treeview('getParent', data.nodeId);
         		 			var obj= $('#treeview12').treeview('getSiblings', data.nodeId);
         		 			allChildUncheck(obj,parent.nodeId);
         		 		}else if(data.menuLevel == 3){
         		 			var parent = $('#treeview12').treeview('getParent', data.nodeId);//父
         		 			var obj= $('#treeview12').treeview('getSiblings', data.nodeId);//兄弟
         		 			allChildUncheck(obj,parent.nodeId);
         		 			//先判断点击的父级有没有被取消，在判断父父级
         		 			if(parent.state.checked == false){
         		 				var Pobj= $('#treeview12').treeview('getSiblings', parent.nodeId);//父的兄弟
             		 			var Pparent = $('#treeview12').treeview('getParent', parent.nodeId);//父父
             		 			allChildUncheck(Pobj,Pparent.nodeId);
         		 			}
         		 		}
         		 	
         		 	 },
         		 	onNodeUnchecked  : function(event ,data){
         		 		
         		 		if(data.menuLevel == 1){
         		 			$.each(data.nodes, function(i, o) {
            		 			$('#treeview12').treeview('uncheckNode', [ o.nodeId, { silent: true } ]);
            		 		$.each(o.nodes, function(h, u) {
                    		 	$('#treeview12').treeview('uncheckNode', [ u.nodeId, { silent: true } ]);
                 		 		 });
         		 		 });
         		 		}else if(data.menuLevel == 2){
         		 			$.each(data.nodes, function(i, o) {
            		 			$('#treeview12').treeview('uncheckNode', [ o.nodeId, { silent: true } ]);
         		 		 });
         		 			var parent = $('#treeview12').treeview('getParent', data.nodeId);
         		 			var obj= $('#treeview12').treeview('getSiblings', data.nodeId);
         		 			allChildUncheck(obj,parent.nodeId);
         		 		}else if(data.menuLevel == 3){
         		 			var parent = $('#treeview12').treeview('getParent', data.nodeId);//父
         		 			var obj= $('#treeview12').treeview('getSiblings', data.nodeId);//兄弟
         		 			allChildUncheck(obj,parent.nodeId);
         		 			//先判断点击的父级有没有被取消，在判断父父级
         		 			if(parent.state.checked == false){
         		 				var Pobj= $('#treeview12').treeview('getSiblings', parent.nodeId);//父的兄弟
             		 			var Pparent = $('#treeview12').treeview('getParent', parent.nodeId);//父父
             		 			allChildUncheck(Pobj,Pparent.nodeId);
         		 			}
         		 		}
         		 		
         		 	}
         		});
         	 
			},
			errorCallback : function(data) {
				bootbox.alert("error");
			}
		};
		CloudUtils.ajax(options);     	 

}

function allChildUncheck(obj,parentId){
	if(obj.length==0){
			$('#treeview12').treeview('uncheckNode', [ parentId, { silent: true } ]);
		}else{
			var filtered = obj.filter(isChecked);
			if(filtered.length == 0){
				$('#treeview12').treeview('uncheckNode', [ parentId, { silent: true } ]);
			}
		}
}

/**
 * 过滤器
 * jihang
 */
function isChecked(element,index,array){
	if(element.state.checked == true){
		return element;
	}
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
	          roleName: {
	              validators: {
	                  notEmpty: {
	                      message: '角色名不能为空'
	                  },
	                  stringLength: {
	                      min: 3,
	                      max: 30,
	                      message: '角色名长度为3-30'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveRole();
			$(e.target).bootstrapValidator('resetForm', true);
			
		});	
}
