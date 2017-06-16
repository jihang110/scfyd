var isJump = CloudUtils.getIframeParams(window.location.href).isJump;
$(document).ready(function() {
	CloudUtils.inputCacheClear();
	initDefnTable();
	initInstTable();
	initTaskTable();
	
	$('#completeForm').on('hidden.bs.modal', function(){
		$('#completeForm').bootstrapValidator('resetForm', true);
		$('#completeForm')[0].reset();
	});
	clearModalAfterHidden();
});

/**
 * 流程定义列表
 */
let initDefnTable = function() {
	$('#flowDefnListTable').bootstrapTable('destroy');
	$("#flowDefnListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/definitionlist",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : false, //显示下拉框勾选要显示的列  
		showRefresh : false, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
			};
			return JSON.stringify(param);
		},
		responseHandler : function responseHandler(res) {
			if (res.result == 0) {
				return {
					"rows" : res.dataList,
					"total" : res.records
				};

			} else {
				bootbox.alert(res.resultNote);
				return {
					"rows" : [],
					"total" : 0
				};
			}
		},
		columns : [
			{
				field : 'definitionId',
				title : '实例ID',
				align : 'center',
				valign : 'middle',
				visible: false
			},
			{
				field : 'deploymentId',
				title : '流程发布ID',
				align : 'center',
				valign : 'middle',
				visible: false
			},
			{
				field : 'definitionKey',
				title : '流程key',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'definitionName',
				title : '流程名称',
				align : 'center',
				valign : 'middle'
			}, 
			{
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	            var m = '<a class = "glyphicon glyphicon-play start" style="color:#278bdd;padding:0px 5px;" title="发起" href="javascript:void(0)"></a>';
	 	            var g = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#278bdd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-remove delete" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	            return m+' '+g+' '+d;
	 	        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}

/**
 * 流程实例列表
 */
let initInstTable = function() {
	$('#flowInstListTable').bootstrapTable('destroy');
	$("#flowInstListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/instancelist",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : false, //显示下拉框勾选要显示的列  
		showRefresh : false, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
			};
			return JSON.stringify(param);
		},
		responseHandler : function responseHandler(res) {
			if (res.result == 0) {
				return {
					"rows" : res.dataList,
					"total" : res.records
				};

			} else {
				bootbox.alert(res.resultNote);
				return {
					"rows" : [],
					"total" : 0
				};
			}
		},
		columns : [
			{
				field : 'processInstanceId',
				title : '实例ID',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'processDefinitionId',
				title : '流程定义',
				align : 'center',
				valign : 'middle'
			},  {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	            var m = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#278bdd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-stop stop" style="color:#278bdd;padding:0px 5px;" title="终止" href="javascript:void(0)"></a>';
	 	            return m+' '+d;
	 	        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}

/**
 * 流程任务列表
 */
let initTaskTable = function() {
	$('#flowTaskListTable').bootstrapTable('destroy');
	$("#flowTaskListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/tasklist",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : false, //显示下拉框勾选要显示的列  
		showRefresh : false, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
			};
			return JSON.stringify(param);
		},
		responseHandler : function responseHandler(res) {
			if (res.result == 0) {
				return {
					"rows" : res.dataList,
					"total" : res.records
				};

			} else {
				bootbox.alert(res.resultNote);
				return {
					"rows" : [],
					"total" : 0
				};
			}
		},
		columns : [
			{
				field : 'taskId',
				title : '流程ID',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'taskName',
				title : '名称',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'assignee',
				title : '指定人',
				align : 'center',
				valign : 'middle'
			},  {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
		        formatter:function(value,row,index){
		        	var m = '<a class = "glyphicon glyphicon-step-forward complete" style="color:#278bdd;padding:0px 5px;" title="处理" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#278bdd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
		  	        return m+' '+d;
		        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}


window.operateEvents = {
		// 流程发起
		'click .start': function (e, value, row, index) {
			var options = {
					url : '../../actflow/start',
					data : '{"processDefinitionId":"'+row.definitionId+'"}',
					callBackFun : function(data) {
						bootbox.alert(data.resultNote);
						if(data.result==0){
							initInstTable();
							initTaskTable();
						}else{
							return false;
						}
					},
					errorCallback:function(data){
						bootbox.alert("error");
					}
			};
			CloudUtils.ajax(options);
		},
		
		// 流程图形
		'click .graph': function (e, value, row, index) {
			var processDefinitionId = typeof(row.definitionId)=="undefined"?"":row.definitionId.replace(/\:/g, '%3A');
			var processInstanceId = typeof(row.processInstanceId)=="undefined"?"":row.processInstanceId.replace(/\:/g, '%3A');
			var taskId = typeof(row.taskId)=="undefined"?"":row.taskId;
			
			$("#pic").attr("src", "../../actflow/graph?processDefinitionId="+processDefinitionId+
					"&processInstanceId="+processInstanceId+"&taskId="+taskId);
			$("#picModal").modal({backdrop: 'static', keyboard: false});
		},
		
		//删除 流程定义
		'click .delete': function (e, value, row, index) {
			bootbox.confirm("确定删除该流程定义?", function(result) {
	            if (result) {
	            	var options = {
	    					url : '../../actflow/deleteDeploy',
	    					data : '{"deploymentId":"'+row.deploymentId+'","processDefinitionKey":"'+row.definitionKey+'"}',
	    					callBackFun : function(data) {
	    						bootbox.alert(data.resultNote);
	    						if(data.result==0){
	    							initDefnTable();
	    							initInstTable();
	    							initTaskTable();
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
	    	 });
		},
		// 流程中断
		'click .stop': function (e, value, row, index) {
	    	bootbox.confirm("确定终止该流程?", function(result) {
	            if (result) {
	            	var options = {
	    					url : '../../actflow/terminate',
	    					data : '{"processInstanceId":"'+row.processInstanceId+'"}',
	    					callBackFun : function(data) {
	    						bootbox.alert(data.resultNote);
	    						if(data.result==0){
	    							initInstTable();
	    							initTaskTable();
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
	    	 });
	    },
	    
	    // 流程完成
		'click .complete': function (e, value, row, index) {
			CloudUtils.setForm(row,'completeForm');
			$('#completeModal').modal({backdrop: 'static', keyboard: false});
		}
};

/**
 * 审批
 * @param flg 0--同意,1--不同意
 */
function doAgree(flg) {
	var taskId = $("#completeModal #taskId").val();
	var taskName = $("#completeModal #taskName").val();
	var	agreeStr = flg;
	var options = {
			url : '../../actflow/taskComplete',
			data : '{"taskId":"'+taskId+'","taskName":"'+taskName+'","agreeStr":"'+agreeStr+'"}',
			callBackFun : function(data) {
				if(data.result==0){
					initInstTable();
					initTaskTable();
					$("#completeModal").modal("hide");
					bootbox.alert(data.resultNote);
				}else{
					$("#completeModal").modal("hide");
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

//发起流程图
function startDeploy(){
	var deployContentStr = $("#deployContent").val();
	var data = {
		xmlContent : deployContentStr	
	};
	var options = {
			url : '../../actflow/startDeploy',
			data: JSON.stringify(data),
			callBackFun : function(data) {
				$("#myDeploy").modal("hide");
				if(data.result==0){
					bootbox.alert(data.resultNote);
					//加载表格
					initDefnTable();
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
/**
 * 部署流程关闭或完成后清空数据
 */
function clearModalAfterHidden(){
	$('#myDeploy').on('hidden.bs.modal', function (e) {
		$('#deployContentForm')[0].reset();
	})
}