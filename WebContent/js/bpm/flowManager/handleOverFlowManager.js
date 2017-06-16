$(document).ready(function() {
	// 各详情页面载入
	$("#div_detail").load("FlowMngCommon.html");
	
	// 检索条件日期控件初始化
	FlowMngCommon.dateload_createTime('createTime');
	
	// 已结流程一览初始化
	FlowMngCommon.initTable('hndlOverFlowListTable', 'over', 'OVER');
	
	$("#procInsName").selectOrDie({
		placeholder: '流程定义'
	});
	$("#priState").selectOrDie({
		placeholder: '项目状态'
	});
});

window.operateEvents = {
	// 项目名称点击事件
	'click .procDetail': function (e, value, row, index) {
		$("#detailModal").modal({backdrop: 'static', keyboard: false});
		FlowMngCommon.initDetailTable('detail', row.procInsId, 'OVER');
	},
	
	// 详情点击事件
	'click .workDetail': function (e, value, row, index) {
		FlowMngCommon.clickDetail(row);
	},
};

/**
 * 检索
 */
function searchFun() {
	// 已结流程一览再检索
	FlowMngCommon.initTable('hndlOverFlowListTable', 'over', 'OVER');
}