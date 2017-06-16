var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;
var processInstanceId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).processInstanceId;
var processDefinitionId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).processDefinitionId;
var isEnd = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEnd;
$(function(){
	initTaskTable(processInstanceId);
	showGraph();
});
function goback(){
	history.go(-1);
}

function showGraph(){
	if(isEnd==1){
		taskId = "";
		processInstanceId="";
	}
	$("#pic").attr("src", "../../activiti/graph?processDefinitionId="+processDefinitionId+
			"&processInstanceId="+processInstanceId+"&taskId="+taskId);
	$("#picModal").modal({backdrop: 'static', keyboard: false});
}

function initTaskTable(procInstId){
	$('#taskListTable').bootstrapTable('destroy');  
	$("#taskListTable").bootstrapTable({  
	     method: "post", 
	     url: "../../activiti/getHistoryTaskList", 
	     striped: false,  //表格显示条纹  
	     search: false,  //是否启用查询  
	     showColumns: false,  //显示下拉框勾选要显示的列  
	     showRefresh: false,  //显示刷新按钮  
	     sidePagination: "server", //表示服务端请求  
	     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	     //设置为limit可以获取limit, offset, search, sort, order  
	     queryParamsType : "undefined",   
	     queryParams: function queryParams(params) {   //设置查询参数  
	       var param = {    
	    	   procInstId: procInstId
	       };    
	       return JSON.stringify(param);                   
	     },  
	     responseHandler:function responseHandler(res) {
	    	 debugger
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
		        field: 'procInstId',
		        title: '进程Id',
		        align: 'center',
	            valign: 'middle',
	            visible:false
		    }, {
		        field: 'taskId',
		        title: 'taskId',
		        align: 'center',
	            valign: 'middle',
	            visible:false
	            
		    }, {
		        field: 'assignee',
		        title: '办理人',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'name',
		        title: '角色',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'createTime',
		        title: '创建时间',
		        align: 'center',
	            valign: 'middle'
		    },{
		        field: 'endTime',
		        title: '结束时间',
		        align: 'center',
	            valign: 'middle'
		    },{
	 	        field: 'operation',
	 	        title: '编辑',
	 	        align: 'center',
	 	       formatter:function(value,row,index){
	 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
		 	        return d;
	 	        },
	 	        events: 'handleOperateEvents'
	 	    }]
	   });  
}


window.handleOperateEvents = {
	    'click .detail': function (e, value, row, index) {
	    	/*getVariableByTaskId(row.taskId)*/
	    	store.set('agencyRow',row);//把数据存储在缓存中
	    	choosePage(row);
	    } 
};

function choosePage(row){
	if (row.proDefKey == "custManage") {
		CloudUtils.getTab("../../pubManager/custManager/custHisDetail/custHisDetail.html", "taskInfo");
		if(row.taskDefKey=="usertask1"){
			$(".adviceHidden").hide();
		}else{
			$(".adviceHidden").show();
		}
       jQuery.getScript("../../js/project/agencyCommon/custHisDetail/custHisDetail.js");
    }else if(row.proDefKey == "refundDeposit"){
    	if(row.taskDefKey == "usertask1"){
    		CloudUtils.getTab('../../project/dykManager/refundDepositDetail/refundDepositRepDetail.html', "taskInfo");
    		jQuery.getScript("../../js/project/agencyCommon/refundDepositHisDetail/refundDepositHisDetail.js");
    	}else {
    		CloudUtils.getTab('../../project/dykManager/refundDepositDetail/refundDepositAgeDetail.html', "taskInfo");
	        jQuery.getScript("../../js/project/agencyCommon/refundDepositHisDetail/refundDepositHisDetail.js");
    	}
    }else if(row.proDefKey == "OffsetDeposit"){
    	if(row.taskDefKey == "usertask1"){
    		CloudUtils.getTab('../../project/dykManager/offsetDepositDetail/offsetDepositRepDetail.html', "taskInfo");
    		jQuery.getScript("../../js/project/agencyCommon/offsetDepositHisDetail/offsetDepositHisDetail.js");
    	}else {
    		CloudUtils.getTab('../../project/dykManager/offsetDepositDetail/offsetDepositAgeDetail.html', "taskInfo");
	        jQuery.getScript("../../js/project/agencyCommon/offsetDepositHisDetail/offsetDepositHisDetail.js");
    	}
    }
}