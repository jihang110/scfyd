$(document).ready(function() {
	$("form").attr("autocomplete", "off");
	CloudUtils.getMenuNames("nav");
	$("#repaymentDate").val(CloudUtils.getcurrentdate());
});

function start() {
	// 发起流程
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

function serchAgency() {
	$("#agencyInfoModal").modal();
	initAgencyListTable();
}

function initAgencyListTable() {
	$('#agencyListTable').bootstrapTable('destroy');
	$("#agencyListTable").bootstrapTable({
		method : "post",
		url : "../../corp/agencyRevenue",
		striped : false, // 表格显示条纹
		pagination : true, // 启动分页
		pageSize : 5, // 每页显示的记录数
		pageNumber : 1, // 当前第几页
		pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
		search : false, // 是否启用查询
		showColumns : false, // 显示下拉框勾选要显示的列
		showRefresh : false, // 显示刷新按钮
		clickToSelect : true, // 是否启用点击选中行
		sidePagination : "server", // 表示服务端请求
		queryParamsType : "undefined",
		singleSelect : true,
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				agencyName : $("#agency_name").val()
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
		columns : [ {
			checkbox : true,
		}, {
			field : 'corpName',
			title : '经销商名称',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'orgnNum',
			title : '经销商代码',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'corpId',
			title : '企业ID',
			align : 'center',
			valign : 'middle',
			visible : false
		} ]
	});
}

function initFinanceListTable(data) {
	$('#financeListTable').bootstrapTable('destroy');
	$("#financeListTable").bootstrapTable({
		method : "post",
		url : "../../finance/financelist",
		striped : true, // 表格显示条纹
		pagination : true, // 启动分页
		pageSize : 15, // 每页显示的记录数
		pageNumber : 1, // 当前第几页
		pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
		search : false, // 是否启用查询
		showColumns : false, // 显示下拉框勾选要显示的列
		showRefresh : false, // 显示刷新按钮
		clickToSelect : true, // 是否启用点击选中行
		sidePagination : "server", // 表示服务端请求
		onCheck: function (row) {
       	 getTableListValue();
	  	},
	  	onCheckAll: function (row) {
       	 getTableListValue();
	  	},
	  	onUncheck: function (row) {
       	 getTableListValue();
	  	},
	  	onUncheckAll: function (row) {
       	 getTableListValue();
	  	},
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				corpId : data.corpId
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
		columns : [ {
             checkbox: true 
      	},{
 	        field: 'financeId',
 	        title: '融资编号',
 	        align: 'center',
            valign: 'middle'
	 	},{
			field : 'financeStartDate',
			title : '融资起始日',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'financeEndDate',
			title : '融资到期日',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'financeAmount',
			title : '融资金额',
			align : 'center',
			valign : 'middle',
			formatter : function(value) {
				return $.number(value, 2);
			}
		}, {
			field : 'payAmt',
			title : '付款金额',
			align : 'center',
			valign : 'middle',
			formatter : function(value) {
				return $.number(value, 2);
			}
		}, {
			field : 'financeBalance',
			title : '付款余额',
			align : 'center',
			valign : 'middle',
			formatter : function(value) {
				return $.number(value, 2);
				}
		} , {
            field: 'interestSum',
            title: '应收利息金额',
            align: 'center',
            valign: 'middle',
            formatter : function(value) {
				return $.number(value, 2);
				}
        }, {
            field: 'hasPayInterest',
            title: '已收利息金额',
            align: 'center',
            valign: 'middle',
            formatter : function(value) {
				return $.number(value, 2);
			}
        }
		]
	});
}
function checkFinaceInfo() {
	var finData = $("#agencyListTable").bootstrapTable('getSelections')[0];
	$("#agency").val(finData.corpName);
	$("#agencyNum").val(finData.orgnNum);
	$("#corpId").val(finData.corpId);
	// CloudUtils.setForm(finData, 'addForm');
	$("#agencyInfoModal").modal('hide');
	initFinanceListTable(finData);
}

function getTableListValue(){
	var interestSumTotal = 0;
	var hasPayInterestTotal = 0;
	var finData = $("#financeListTable").bootstrapTable('getSelections');
	$.each(finData, function(index, value) {
		interestSumTotal += value.interestSum;
		hasPayInterestTotal += value.hasPayInterest;
	});
	$("#repaySumAmt").val(interestSumTotal);
	$("#actRepayAmt").val(hasPayInterestTotal);
}