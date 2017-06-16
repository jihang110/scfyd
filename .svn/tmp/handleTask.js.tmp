$(function () {
	"use strict";
    InitTable();
    dateload();
 });

function InitTable(){
	$('#handleTable').bootstrapTable('destroy');  
	$("#handleTable").bootstrapTable({  
	     method: "post", 
	     url: "../../activiti/getHandleTaskList", 
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
	           taskName:jsonData.txt_taskName,
	           procdefName:jsonData.txt_procdefName,
	           createTime:jsonData.txt_createTime,
	           endTime:jsonData.txt_endTime
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
	    		 alert(res.resultNote);
	    		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
	    	 }
	     },
	     columns: [{
		        field: 'taskName',
		        title: '角色类型',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'procdefName',
		        title: '流程名称',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'procInstId',
		        title: '进程Id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    },{
		        field: 'assignee',
		        title: '发起角色',
		        align: 'center',
	            valign: 'middle'
		    }, {
		        field: 'taskId',
		        title: 'taskId',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'procdefId',
		        title: 'procdefId',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'procdefKey',
		        title: 'procdefKey',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    },{
		        field: 'taskDefKey',
		        title: '节点id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    },{
		        field: 'createTime',
		        title: '开始时间',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'endTime',
		        title: '结束时间',
		        align: 'center',
	            valign: 'middle'
		    },{
		        title: '事项状态',
		        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
	 				if(row.endTime ==undefined){
	 					return "已办未结";
	 				}else{
	 					return "已办已结";
	 				}
	 			}
		    },{
	 	        field: 'operation',
	 	        title: '编辑',
	 	        align: 'center',
	 	        formatter:function(value,row,index){
	 	        	var s = '<a class = "glyphicon glyphicon-eye-open show" style="color:#278bdd;padding:0px 5px;" title="导图" href="javascript:void(0)"></a>';
		 	        return s;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	   });  
		window.operateEvents = {
		// 流程图形
		'click .show': function (e, value, row, index) {
			debugger
			var processDefinitionId = typeof(row.procdefId)=="undefined"?"":row.procdefId;
			var processInstanceId = typeof(row.procInstId)=="undefined"?"":row.procInstId;
			var taskId = typeof(row.taskId)=="undefined"?"":row.taskId;
			var isEnd = 0;
			if(row.endTime !=undefined){
				isEnd = 1;
			}
			$('#mainFrame',top.document).attr('src','project/handleCommon/handleCommon.html?taskId='+taskId+'&processInstanceId='+processInstanceId+'&processDefinitionId='+processDefinitionId+'&isEnd='+isEnd);
		}
		};
}

function searchFun(){
	InitTable();
}

function dateload(){
	$("#txt_createTime,#txt_endTime").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
}

function clearDate(){
	$("#txt_endTime").val("");
	$("#txt_createTime").val("");
}