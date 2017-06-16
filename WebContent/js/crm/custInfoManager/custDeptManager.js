 $(function() {
	 ajaxRelaCorps();
	 initTable(); 
	 formValidator();
	//modal绑定事件
	 $('#addModal').on('hidden.bs.modal', function(){
			$("#addForm")[0].reset();
			$("#addForm").data('bootstrapValidator').destroy();
			$("#addForm").data('bootstrapValidator', null);
			formValidator();
			document.getElementById("field").disabled=false;
			document.getElementById("btn_save").style.display="";
		});
	$('#addModal').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	numFormat();
 });
 
//var parentId = null; 
function ajaxtree(corpId){
	 //查出所有的树，不重session取deptId
	 var deptId = null;
	 var options = {
				url : "../../dept/tree",
				data : JSON.stringify({ 
		        	 "corpId": corpId,
		        	 "deptId": deptId
		         }),
				callBackFun : function(data) {
					if(data.result==0){
						var jsonStringData= JSON.stringify(data.dataList);
						jsonStringData=jsonStringData.replace(/deptName/g,'text');
						jsonStringData=jsonStringData.replace(new RegExp("subDeptList","gm"),"nodes");
						var jsonData=eval('('+ jsonStringData +')');
						$('#corpTree').treeview({
							data:jsonData,
							showCheckbox:false,
							levels:0,
//							onNodeSelected  : function(event, data) {
//								var SelectedData = $('#corpTree').treeview('getSelected', data.nodeId);
//								parentId = SelectedData[0].deptId;
//								$('#parentId').val(parentId);
//							}
						});
					}else{
						bootbox.alert(data.resultNote);
					}
		         	 
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
			};
		CloudUtils.ajax(options);
 			}
 
 function  ajaxRelaCorps(){
		var corpId = store.get('corpId');
		var options = {
				url : '../../corp/list',
				data : '{"relaCorpId":"'+corpId+'","isPage": 0}',
				callBackFun : function(data) {
					if(data.result==0){
						$("#s_corpId").append("<option value=''>" +"全部"+ "</option>");
						$.each(data.dataList, function (index, units) {  
							$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
							$("#s_corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
						}); 
						$('#s_corpId').selectOrDie({
							placeholder: '所属企业'
								
						});
					}else{
						bootbox.alert(data.resultNote);
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");  
				}
		};
		CloudUtils.ajax(options);
	}

 function addFun() {
	 $("#corpId").attr("disabled",false);
	 $("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
 	 $("#addModalLabel").text("添加");
     $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
     $('#isEdit').val(1); //添加1；修改2
     ajaxtree($("#corpId").val());
 }

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
 		$("#corpId").attr("disabled",true);
 		$("#addModalLabel").text("修改");
 	}
 	$('#isEdit').val(isEdit); //添加1;修改2;详情0
     $('#addModal').modal();
     CloudUtils.setForm(row,'addForm');
 }

 function saveUser() {
 	var da = $('#addForm').data('bootstrapValidator');
 	da.validate();
 	
 	if(!da.isValid()){  
 		 	return false;
     }else{
    	var parentId = $('#corpTree').treeview('getSelected', 0);
     	var modal = $('#addModal');
     	var data = CloudUtils.convertStringJson('addForm');
     	data = eval("(" + data + ")");
     	if(parentId.length==0){
     		data.parentId = null;
     	}else{
		data.parentId = parentId[0].deptId;
     	}
     	var isEdit =  $('#isEdit').val(); 
     	if(isEdit == 1){//添加1；修改2
     		var options = {
 					url : '../../dept/add',
 					data : JSON.stringify(data),
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
     	}else if(isEdit == 2){
     		var options = {
 					url : '../../dept/mod',
 					data : JSON.stringify(data),
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
     	modal.modal("hide");
    	window.parent.scrollTo(0,0);
     }
 }

 function changeCorp(obj){
		var opt = obj.options[obj.selectedIndex];
		ajaxtree(opt.value);
	}
 
 function initTable() { 
		$('#userListTable').bootstrapTable('destroy');  
		$("#userListTable").bootstrapTable({  
	         method: "post", 
	         url: "../../dept/list", 
	         striped: true,  //表格显示条纹  
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
	           if(jsonData.s_corpId ==""){
	        	   jsonData.s_corpId = null;
	           }
	           var param = {    
	               pageNumber: params.pageNumber,    
	               pageSize: params.pageSize,
	               isPage : 1,
	               parentName: jsonData.s_parentDeptNm,
	               deptName:jsonData.s_deptName,
	               corpId: jsonData.s_corpId
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
	 	        field: 'deptId',
	 	        title: 'Item ID',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'deptName',
	 	        title: '部门名称',
	 	        align: 'center',
	            valign: 'middle'
	 	    },{
	 	        field: 'parentName',
	 	        title: '上级部门',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'relaCorpName',
	 	        title: '所属企业',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'deptType',
	 	        title: '部门性质',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'staffNum',
	 	        title: '人数',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,0);
	 		        }
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	       align: 'center',
	           valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
	 	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	            return d+' '+s+' '+r;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	       });  
	}
 window.operateEvents = {
			'click .detail': function (e, value, row, index) {
					detailFun(row,0);
		    },
			'click .modify': function (e, value, row, index) {
					modFun(row,2);
			},
		    'click .remove': function (e, value, row, index) {
		    	bootbox.confirm("确定删除此条记录?", function(result) {  
		            if (result) {
		            	var options = {
		    					url : '../../dept/delete',
		    					data : '{"deptId":"'+row.deptId+'"}',
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
 
 function searchFun() {
		initTable();  
	}
 
 function fileSelect() {
	    document.getElementById("file").click(); 
	}
 function ajaxFileUpload(){
		if ($("#file").val().length > 0) {
			$.ajaxFileUpload({  
		        url : '../../file/binUpload?pathId=2',  
		        secureuri : false,  
		        fileElementId : 'file',  
		        dataType : 'json',  
		        success : function(data, status) {  
		            if (data.result == 0) { 
		            	var path=data.fileUrl;
		            	var filename;
		            	if(path.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
		            	{
		            	    filename=path.substring(path.lastIndexOf("/")+1,path.length);
		            	}
		            	else
		            	{
		            	    filename=path;
		            	}
		                $("#orgStructurePath").val( data.fileUrl); 
		                bootbox.alert("上传成功！");  
		            }else{
		            	bootbox.alert("上传失败！"); 
		            } 
		        },  
		        error : function(data, status, e) {  
		        	bootbox.alert(e);  
		        }  
		    });  
	    }
	    else {
	    	bootbox.alert("请选择图片");
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
 	    	 deptName: {
 	              validators: {
 	                  notEmpty: {
 	                      message: '部门名称不能为空'
 	                  },
 	                  stringLength: {
 	                      min: 1,
 	                      max: 10,
 	                      message: '用户名长度为1-10'
 	                  }
 	              }
 	          },
 	         deptType : {
 	              validators: {
 	                  notEmpty: {
 	                      message: '部门性质不能为空'
 	                  },
 	                  stringLength: {
	                      max: 64,
	                      message: '部门性质长度不能超过64'
	                  }
 	              }
 	          },
 	         staffNum: {
	        	  message: '格式不正确',
	              validators: {
	            	  regexp: {
	                        regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	            	  callback: {  
	                         message: '人数在0-1000000之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)<=1000000;
	                         }  
	                     } 
	              }
	          },
	          functions: {
 	              validators: {
 	                  stringLength: {
 	                      max: 128,
 	                      message: '主要职能长度不能超过128'
 	                  }
 	              }
 	          },
 	          note : {
 	              validators: {
 	            	 stringLength: {
	                      max: 128,
	                      message: '部门描述长度不能超过128'
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
 	//$("#staffNum").number(true, 0);
 	
 }