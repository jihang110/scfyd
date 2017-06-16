$(document).ready(function() {
	initTable(); 
	formValidator();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	ajaxRelaCorps("txtCorpId","corpId");
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
			if(row.corpId == null){
				bootbox.alert("内置常用链接不能修改");
			}else{
				modFun(row);
				}
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	    		if(row.corpId!=null){
	            if (result) {  
	            	var options = {
	    					url : '../../commonWeb/delete',
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
	    		}else{
	    			bootbox.alert("内置常用链接不能删除");
	    		}
	    	 });
	    }
	};

function initTable() { 
	$('#commonWebListTable').bootstrapTable('destroy');  
	$("#commonWebListTable").bootstrapTable({  
         method: "post", 
         url: "../../commonWeb/list", 
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               websiteName:jsonData.txt_websiteName
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
 	        field: 'websiteName',
 	        title: '网站名称',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	            var s = '<a href="'+row.websiteAddress+'" target=_blank>'+value+'</a>';
	            return s;
	        },
 	    },{
 	        field: 'websiteAddress',
 	        title: '网站地址',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	            var s = '<a href="'+value+'" target=_blank>'+value+'</a>';
	            return s;
	        },
 	    }, {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
             valign: 'middle',
 	    },{
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },  {
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
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

function modFun(row) {
	$("#addModalLabel").text("修改");
	$('#addModal').modal();
	$('#isEdit').val(isEdit); //新增1；修改2
	CloudUtils.setForm(row,'addForm');
}

function saveUser() {
 	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../commonWeb/add',
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
				url : '../../commonWeb/mod',
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

//动态下拉框
function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            });  
			},
			errorCallback:function(data){
				 alert("error");  
			}
	};
	CloudUtils.ajax(options);
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
	    	  websiteName: {
	    		  validators: {
	    			  notEmpty: {
	                      message: '名称不能为空'
	                  },
	                  stringLength: {
	                	  min: 1,
	                	  max: 10,
	                	  message: '最大为15个字'
							}
						}
	          },
	          websiteAddress: {
	    		  validators: {
	    			  notEmpty: {
	                      message: '地址不能为空'
	                  },
	                  stringLength: {
	                	  min: 1,
	                	  max: 512,
	                	  message: '长度为1-512'
							}
						}
	          },
	          note: {
	    		  validators: {
	    			  
	                  stringLength: {
	                	  min: 1,
	                	  max: 128,
	                	  message: '长度为1-128'
							}
						}
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}
