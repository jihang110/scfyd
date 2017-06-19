$(document).ready(function() {
	$("form").attr("autocomplete","off");
	 CloudUtils.getMenuNames("nav");
	 ajaxProGuarantee();
	 $("#financeStartDay").val(CloudUtils.getcurrentdate());
	 $("#loanDate").val(CloudUtils.getcurrentdate());
	 //保证金比例
	 
});

function start(){
//	发起流程
 var data = CloudUtils.convertStringJson('addForm');
 var options = {
		 	url : '../../../loanInfo/startProcess',
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


function searchContract(){
	$("#contractInfoModal").modal();
	initContractListTable();
}

function initContractListTable() { 
	$('#contractListTable').bootstrapTable('destroy');  
	$("#contractListTable").bootstrapTable({  
         method: "post", 
         url: "../../../loanInfo/contractInfo", 
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
        	$('#contractNo').val(row.contractNo);
 			$('#orderBatchId').val(row.orderBatchId);
 			$('#orderAcceptMoney').val(row.recOrderAmt);
 			$('#orderAllMoney').val(row.crReqTotalAmt);
 			$('#loanAmt').val(row.crReqTotalAmt);
 			$('#financeDueDay').val(row.currentRepayDate);	
         },
         queryParams: function queryParams(params) {   // 设置查询参数
           var param = {    
               pageNumber: params.pageNumber,
               pageSize: params.pageSize,
               contractNo:$("#contract_no").val()
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
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'orderBatchId',
 	        title: '订单批次号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'recOrderAmt',
 	        title: '接收订单金额',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'crReqTotalAmt',
 	        title: '超人所需费用总额',
 	        align: 'center',
            valign: 'middle'
            //visible: false
 	    },{
 	        field: 'currentRepayDate',
 	        title: '最后还款日',
 	        align: 'center',
            valign: 'middle'
            
 	    }
 	    ]
	});  
}


function ajaxProGuarantee() {
	var options = {
		url : '../../../finance/getProGuarantee',
		data : '{"productId":"product02"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				// 保证金比例
				$("#guaranteeMoneyRate").val(data.guaranteeRate);
				if (data.dataList != null) {
					$.each(data.dataList, function(i, row) {
						$("#interestInfoList").bootstrapTable('append', row);
					});
				}
			} else {
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

function calInterestList() {
	// 保证金计算
	var guaranteeMoneyRate = $("#guaranteeMoneyRate").val();
 	var loanAmt = $("#loanAmt").val();
 	var guaranteeMoney = CloudUtils.Math(loanAmt, CloudUtils.Math(guaranteeMoneyRate,100,"div"), "mul");
 	$("#guaranteeMoney").val(guaranteeMoney);
}