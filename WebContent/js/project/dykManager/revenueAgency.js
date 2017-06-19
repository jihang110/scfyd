$(function () {
	"use strict";
    setForm();
    numFormat();
   initFinanceListTable();
 });
function setForm(){
	var data = {};
	data.taskId = taskId;
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			debugger
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"infoForm");
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

function getInfo(type){
	var data = CloudUtils.convertStringJson('infoForm');
	data = eval("(" + data + ")");
	data.agree = type;
	data.advice = $("#advice").val();
	data.taskId = taskId;
	var jsonString = null;
	var options = {
				url : '../../revenue/doAgree',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					jsonString = data.str;
					bootbox.alert(data.resultNote,function(){
						if(type==1){
							bootbox.alert(data.resultNote,function(){
								window.location.href='../agencyTask/agencyTask.html';
							});
						}
					});
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
}


function saveFun(){
	 var advice = $.trim($("#advice").val());
	 var type = $("#agree").val();
	 if(type==1){
		if(advice){
			getInfo(type);
		}
	}else{
		getInfo(type);
		 if(taskDefKey == "usertask2"){
			if(type ==0){
				var guaranteeData = eval("(" + jsonString + ")");
				var payActGuarantee = CloudUtils.Math(guaranteeData.payActGuarantee,guaranteeData.returnGuaranteeAmt,"sub");
				var guaranteeBalance = CloudUtils.Math(guaranteeData.guaranteeBalance,guaranteeData.returnGuaranteeAmt,"sub");
				var options = {
						url : '../../revenue/add',
						data : '{"financeId":"'+guaranteeData.financeId+'","payActGuarantee":"'+payActGuarantee+'","guaranteeBalance":"'+guaranteeBalance+'"}',
						callBackFun : function(data) {
							bootbox.alert(data.resultNote,function(){
								window.location.href='../agencyTask/agencyTask.html';
							});
						},
						errorCallback : function(data) {
							bootbox.alert(data.resultNote);
							return false;
						}
					};
				CloudUtils.ajax(options);
			} 
		 }
	}
}

function initFinanceListTable() {
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
			var corpId = $("#corpId").val();
			var param = {
				corpId : corpId
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