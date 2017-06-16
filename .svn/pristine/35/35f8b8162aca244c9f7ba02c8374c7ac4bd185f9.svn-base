$(document).ready(function() {
	$("form").attr("autocomplete","off");
	 CloudUtils.getMenuNames("nav");
	 $("#repaymentDate").val(CloudUtils.getcurrentdate());
});

function start(){
//	发起流程
 var data = CloudUtils.convertStringJson('addForm');
 var options = {
		 	url : '../../revenue/startProcess',
			data : data,
			callBackFun : function(data) {
				if (data.result == 0) {
					bootbox.alert(data.resultNote);
				} else {
					return false;
				}
			},
			errorCallback : function(data) {
				return false;
			}
		};
 CloudUtils.ajax(options);
}

function serchAgency(){
	$("#agencyInfoModal").modal();
	initAgencyListTable();
}


function initAgencyListTable() { 
	$('#agencyListTable').bootstrapTable('destroy');  
	$("#agencyListTable").bootstrapTable({  
         method: "post", 
         url: "../../corp/agencyRevenue", 
         striped: false,  // 表格显示条纹
         pagination: true, // 启动分页
         pageSize: 5,  // 每页显示的记录数
         pageNumber:1, // 当前第几页
         pageList: [5, 10, 15, 20, 25],  // 记录数可选列表
         search: false,  // 是否启用查询
         showColumns: false,  // 显示下拉框勾选要显示的列
         showRefresh: false,  // 显示刷新按钮
         clickToSelect: true,  //是否启用点击选中行
         sidePagination: "server", // 表示服务端请求
         queryParamsType : "undefined",
         singleSelect:true,
         onCheck: function (row) {
        	$('#corpId').val(row.corpId);
 			$('#agency').val(row.corpName);
 			$('#agencyNum').val(row.orgnNum);
 			$('#financeId').val(row.financeId);
 			$('#financeStartDate').val(row.financeStartDate);
 			$('#financeEndDate').val(row.financeEndDate);
 			$('#financeAmount').val(row.financeAmount);
 			$('#payAmt').val(row.payAmt);
 			$('#interestSum').val(row.interestSum);
 			$('#thisInterest').val(row.thisInterest);
 			$('#repaymentId').val(row.repaymentId);
 			
         },
         queryParams: function queryParams(params) {   // 设置查询参数
           var param = {    
               pageNumber: params.pageNumber,
               pageSize: params.pageSize,
               agencyName:$("#agency_name").val()
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
        	 checkbox: true,
        	 singleSelect: true
         },{
 	        field: 'corpName',
 	        title: '经销商名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'orgnNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'corpId',
 	        title: '企业ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }
 	    ]
	});  
}


