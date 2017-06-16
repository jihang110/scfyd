$(function () {
	$("form").attr("autocomplete","off");
	initCarInfoListTable();
	setForm();
    numFormat();
});

function initCarInfoListTable() { 
	$('#carInfoListTable').bootstrapTable('destroy'); 
	$("#carInfoListTable").bootstrapTable({  
		method: "post", 
        url: "", 
        striped: true,  //表格显示条纹  
        pagination: false, //启动分页  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
          return null;
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
	 	        field: 'carFrameNum',
	 	        title: '车架号',
	 	        align: 'center',
	            valign: 'middle'
		 	}, {
	 	        field: 'carActualPrice',
	 	        title: '实际提车价（元）',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'financeId',
	 	        title: '融资编号',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeStartDate',
	 	        title: '融资起始日',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeEndDate',
	 	        title: '融资到期日',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeAmount',
	 	        title: '融资金额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'payAmt',
	 	        title: '付款金额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'financeBalance',
	 	        title: '付款余额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'notPayInterest',
	 	        title: '应还利息金额',
	 	        align: 'center',
	             valign: 'middle',
	             visible: true,
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }]
       });  
}

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "addForm");
				
				var carListInfo = jsonData.carListInfo;
				if (carListInfo != null && carListInfo != '') {
					$.each(JSON.parse(carListInfo), function(i, row) {
						$("#carInfoListTable").bootstrapTable('append', row);
					});
				}
				
				if (jsonData.interestDate == false) {
					$("#divRepayInterestAmt").hide();
					$("#carInfoListTable").bootstrapTable('hideColumn', 'notPayInterest');
				}
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
	$("#repaySumAmt").number(true, 2);
	$("#repayCapitalAmt").number(true, 2);
	$("#repayInterestAmt").number(true, 2);
}

function saveFun() {
	var data = CloudUtils.convertAllJson('addForm');
	var carListData = $("#carInfoListTable").bootstrapTable('getData');
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.carListInfo = JSON.stringify(carListData);
	data.agree = $("#agree").val();
	data.advice = $("#advice").val();
	
	var options = {
		url : "../../repayInfo/doAgree",
		data : JSON.stringify(data),
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
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}