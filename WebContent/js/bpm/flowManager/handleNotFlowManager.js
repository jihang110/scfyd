$(document).ready(function() {
	// 各详情页面载入
	$("#div_detail").load("FlowMngCommon.html");
	
	$("#procInsName").selectOrDie({
		placeholder: '流程定义'
	});
	
	window.parent.scrollTo(0,0);
	
	//modal绑定事件
	// 审批
	$('#chkModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#chkForm")[0].reset();
	});
	
	// 权限转移
	$('#transferForm').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#transferForm")[0].reset();
	});
	
	// 特殊事项审批
	$('#spMatterModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#spMatterForm")[0].reset();
		$("#spMatterForm").data('bootstrapValidator').resetForm();
	});
	$('#spMatterModal').on('hide.bs.modal', function () {
		$("#spMatterForm").data('bootstrapValidator').resetForm();
	});
	
	// 标准流程_立项管理
	$('#normalModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#normalForm")[0].reset();
		$("#normalForm").data('bootstrapValidator').resetForm();
	});
	$('#normalModal').on('hide.bs.modal', function () {
		$("#normalForm").data('bootstrapValidator').resetForm();
	});
	
	// 标准流程_授信申请
	$('#creditModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#creditForm")[0].reset();
		$("#creditForm").data('bootstrapValidator').resetForm();
	});
	$('#creditModal').on('hide.bs.modal', function () {
		$("#creditForm").data('bootstrapValidator').resetForm();
	});
	
	// 标准流程_风控报告
	$('#riskCtrlModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#riskCtrlForm")[0].reset();
		$("#riskCtrlForm").data('bootstrapValidator').resetForm();
	});
	$('#riskCtrlModal').on('hide.bs.modal', function () {
		$("#riskCtrlForm").data('bootstrapValidator').resetForm();
	});
	
	// 标准流程_合同申请
	$('#contractModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#contractForm")[0].reset();
		$("#contractForm").data('bootstrapValidator').resetForm();
	});
	$('#contractModal').on('hide.bs.modal', function () {
		$("#contractForm").data('bootstrapValidator').resetForm();
	});
	
	// 在线申请，签约-卖方确认
	$('#confirmModal1').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#confirmForm1")[0].reset();
		$("#confirmForm1").data('bootstrapValidator').resetForm();
	});
	$('#confirmModal1').on('hide.bs.modal', function () {
		$("#confirmForm1").data('bootstrapValidator').resetForm();
	});
	$('#confirmModal2').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#confirmForm2")[0].reset();
		$("#confirmForm2").data('bootstrapValidator').resetForm();
	});
	$('#confirmModal2').on('hide.bs.modal', function () {
		$("#confirmForm2").data('bootstrapValidator').resetForm();
	});
	
	
	// 标准流程_放款申请
	$('#loanModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		if (loanNoNum > 1) {
			for (var i = 2; i <= loanNoNum; i++) {
				$("#loanForm")
				.data("bootstrapValidator")
				.removeField($("#lendBathNo" + loanNoNum))
				.removeField($("#lendAmt" + loanNoNum))
				.removeField($("#lendPerson" + loanNoNum))
				.removeField($("#lendCorp" + loanNoNum))
				.removeField($("#lendState" + loanNoNum));
			}
		}
		$("#loanForm")[0].reset();
		$("#loanForm").data('bootstrapValidator').resetForm();
		$("#loanForm #lendCorp").empty();
		$("#loanForm #loanDiv").empty();
		loanNoNum = 1;
	});
	$('#loanModal').on('hide.bs.modal', function () {
		$("#loanForm").data('bootstrapValidator').resetForm();
	});
	
	// 融资直通车
	$('#financeModal').on('hidden.bs.modal', function(){
		if ($("#financeForm").find("input[name='invoice']").length > 0) {
			$("#financeForm")
			.data("bootstrapValidator")
			.removeField("invoice")
			.removeField("invNo")
			.removeField("invAmt");
		}
		if (loanNoNumTab > 1) {
			for (var i = 2; i <= loanNoNumTab; i++) {
				$("#financeForm")
				.data("bootstrapValidator")
				.removeField($("#lendBathNo" + loanNoNumTab))
				.removeField($("#lendAmt" + loanNoNumTab))
				.removeField($("#lendPerson" + loanNoNumTab))
				.removeField($("#lendCorp" + loanNoNumTab))
				.removeField($("#lendState" + loanNoNumTab));
			}
		}
		$("#financeForm")[0].reset();
		$("#financeForm").data('bootstrapValidator').resetForm();
		$("#tab1Div #otherInv").empty();
		$("#tab5Div #lendCorp").empty();
		$("#tab5Div #loanDiv").empty();
		invNoNumTab = 0;
		loanNoNumTab = 1;
		$("#myTab a:first").tab("show");
	});
	$('#financeModal').on('hide.bs.modal', function () {
		$("#financeForm").data('bootstrapValidator').resetForm();
	});
	
	// 立项管理_是否添加发票click事件
	$("#normalForm #otherInv").collapse('show');
	$("#normalForm .rad").click(function(){
		hasInvClick("normalForm", $(this));
	});
	
	// 表单验证
	FlowMngCommon.spFormValidator(); // 特殊事项审批
	FlowMngCommon.nmFormValidator("normalForm"); // 标准流程_立项管理
	FlowMngCommon.creditFormValidator("creditForm"); // 标准流程_授信申请
	FlowMngCommon.riskCtrlFormValidator("riskCtrlForm"); // 标准流程_风控报告
	FlowMngCommon.contractFormValidator("contractForm"); // 标准流程_合同申请
	FlowMngCommon.loanFormValidator("loanForm"); // 标准流程_放款申请
	FlowMngCommon.confirmFormValidator("confirmForm1"); //在线申请签约——卖方确认
	FlowMngCommon.confirmFormValidator("confirmForm2"); //在线申请签约——卖方确认
	FlowMngCommon.contractFormValidator("onlineForm"); //在线申请签约流程 _再申请
	FlowMngCommon.financeFormValidator("financeForm"); // 融资直通车
	
	// 未结一览初始化
	FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
	
	// 日期控件初始化
	dateload();
	
	// 授信申请_事件绑定
	FlowMngCommon.bindCreditEvent("creditForm");
	
	/** 融资直通车 event start */
	// 是否添加发票click事件
	$("#tab1Div #otherInv").collapse('show');
	$("#tab1Div .rad").click(function(){
		hasInvClick("tab1Div", $(this));
	});
	
	// 授信申请_事件绑定
	FlowMngCommon.bindCreditEvent("financeForm");
	/** 融资直通车 event end */
	
	// 金额项目千分位符表示 
	numFormat();
	
	//经办-在线签约
	FlowMngCommon.ajaxSelCorps();
});
var invNoNum = 0;
var invNoNumTab = 0;
var loanNoNum = 1;
var loanNoNumTab = 1;

window.operateEvents = {
	// 项目名称点击事件
	'click .procDetail': function (e, value, row, index) {
		if(row.procInsName=="在线签约"){
			$("#onLineModal").modal({backdrop: 'static', keyboard: false});
			FlowMngCommon.initDetailTable("onLine",row.procInsId, 'NOT');
			if(store.get("roleType")!=5){
				$("#onLineModal #transBtn").css("visibility","hidden");;
			}else{
				$("#onLineModal #transBtn").css("visibility","visible");
			}
		}else{
			$("#detailModal").modal({backdrop: 'static', keyboard: false});
			FlowMngCommon.initDetailTable("detail",row.procInsId, 'NOT');
		}
	},
	
	// 详情点击事件
	'click .workDetail': function (e, value, row, index) {
		FlowMngCommon.clickDetail(row);
	},
	
	// 流程中断
	'click .remove': function (e, value, row, index) {
    	bootbox.confirm("确定终止该流程?", function(result) {
            if (result) {  
            	var options = {
    					url : '../../workflow/terminate',
    					data : '{"procInsId":"'+row.procInsId+'","projectName":"'+row.proName+'"}',
    					callBackFun : function(data) {
    						if(data.result==0){
    							FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
    							bootbox.alert(data.resultNote);
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
    	 });
    },
};

/**
 * 经办
 */
function handle() {
	var formId;
	var modalId;
	var procInsId = $("#detailModal #procInsId").val();
	var workItemId = $("#detailModal #workItemId").val();
	var stepId = $("#detailModal #stepId").val();
	
	// 项目立项
	if (stepId == "N1") {
		modalId = "normalModal";
		formId = "normalForm";
		// 项目评审
	} else if (stepId == "N4") {
		modalId = "creditModal";
		formId = "creditForm";
		// 风控报告
	} else if (stepId == "N5") {
		modalId = "riskCtrlModal";
		formId = "riskCtrlForm";
		// 合同起草及审批
	} else if (stepId == "N7") {
		modalId = "contractModal";
		formId = "contractForm";
		// 出账流程
	} else if (stepId == "N12") {
		modalId = "loanModal";
		formId = "loanForm";
		// 特殊事项审批,特殊事项快速审批
	} else if (stepId == "S1" || stepId == "A1") {
		modalId = "spMatterModal";
		formId = "spMatterForm";
		// 融资直通车
	} else if (stepId == "B1") {
		modalId = "financeModal";
		formId = "financeForm";
		// 审批
	} else {
		modalId = "chkModal";
	}
	
	$("#" + modalId).modal({backdrop: 'static', keyboard: false});
	
	if (modalId != "chkModal") {
		$("#" + formId).find("#workItemId").val(workItemId);
		
		if (formId == "normalForm") {
			$("#normalForm #otherInv").empty();
			$("#normalForm #otherInv").append($("#normalForm #otherInvHtml").html());
		} else if (formId == "loanForm") {
			$("#" + formId).find("#procInsId").val(procInsId);
		} else if (formId == "financeForm") {
			$("#financeForm #otherInv").empty();
			$("#financeForm #otherInv").append($("#financeForm #otherInvHtml").html());
		}
		
		var options = {
				url : '../../workflow/info',
				data : JSON.stringify({
					workItemId : workItemId,
					procInsId : procInsId,
					stepId : stepId
				}),
				callBackFun : function(data) {
					if(data.result==0){
						if (formId != "loanForm") {
							$("#" + formId).find("[name=chaseFlg]").attr("disabled", false)
							$("#" + formId).find("#factorType").attr("disabled", false)
						}
						
						CloudUtils.setFormNoClick(data, formId);
						
						if (formId != "loanForm") {
							$("#" + formId).find("[name=chaseFlg]").attr("disabled", true)
							$("#" + formId).find("#factorType").attr("disabled", true)
						}
						// 特殊事项审批
						if (formId == "spMatterForm") {
							FlowMngCommon.changeApplyItem($("#spMatterForm #applyItem").val());
							// 授信申请
						} else if (formId == "creditForm") {
							FlowMngCommon.initCreditEvent(formId);
							// 立项管理
						} else if(formId == "normalForm") {
							hasInvClick("normalForm", $("#normalForm .rad:checked"));
							
							var invNos = data.invNo;
							var invAmts = data.invAmt;
							var invoices = data.invoice;
							var invNoArr = new Array();
							var invAmtArr = new Array();
							var invoiceArr = new Array();
							
							if (!CloudUtils.isEmpty(invNos)) {
								invNoArr = invNos.split(",");
							}
							if (!CloudUtils.isEmpty(invAmts)) {
								invAmtArr = invAmts.split(",");
							}
							if (!CloudUtils.isEmpty(invoices)) {
								invoiceArr = invoices.split(",");
							}
							
							if (invNoArr.length > 0) {
								var invNum = invNoArr.length;
								invNoNum = 0;
								for (var i = 1; i < invNum + 1; i++){
									addInv('normalForm', 'init');
									$("#normalForm #invNo"+i).val(invNoArr[i-1]);
									$("#normalForm #invAmt"+i).val(invAmtArr[i-1]);
									$("#normalForm #invoice"+i).val(invoiceArr[i-1]);
								}
							}
							// 合同申请
						} else if (formId == "contractForm") {
							$("#contractForm #cntInvcDiv").empty();
							var invNoArr = new Array();
							var invAmtArr = new Array();
							var invNos = data.invNo;
							var invAmts = data.invAmt;
							
							if (!CloudUtils.isEmpty(invNos)) {
								invNoArr = invNos.split(",");
							}
							if (!CloudUtils.isEmpty(invAmts)) {
								invAmtArr = invAmts.split(",");
							}
							
							if (invNoArr.length > 0) {
								for (var i = 1; i < invNoArr.length + 1; i++) {
									var invHtml='<div class="form-group">';
									invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>发票编号'+i+'</label>';
									invHtml +=	'	<div class="col-sm-6">';
									invHtml +=	'		<input type="text" id="invNoLbl'+i+'" class="form-control" readonly value="'+invNoArr[i-1]+'">';
									invHtml +=	'	</div>';
									invHtml +=	'</div>';
									invHtml +=	'<div class="form-group">';
									invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>发票金额'+i+'</label>';
									invHtml +=	'	<div class="col-sm-6">';
									invHtml +=	'		<input type="text" id="invAmtLbl'+i+'" class="form-control" readonly value="'+$.number(invAmtArr[i-1], 2)+'">';
									invHtml +=	'	</div>';
									invHtml +=	'</div>';
									$("#contractForm #cntInvcDiv").append(invHtml);
								}
							}
							// 放款申请
						} else if (formId == "loanForm") {
							var lendBathNoArr = new Array();
							var lendAmtArr = new Array();
							var lendDateArr = new Array();
							var lendPersonArr = new Array();
							var lendCorpArr = new Array();
							var lendStateArr = new Array();
							
							$("#loanForm #loanDiv").empty();
							FlowMngCommon.getLendCorpNameList("loanForm", "lendCorp");
							
							if (!CloudUtils.isEmpty(data.lendBathNo)) {
								lendBathNoArr = data.lendBathNo.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendAmt)) {
								lendAmtArr = data.lendAmt.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendDate)) {
								lendDateArr = data.lendDate.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendPerson)) {
								lendPersonArr = data.lendPerson.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendCorp)) {
								lendCorpArr = data.lendCorp.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendState)) {
								lendStateArr = data.lendState.split(",");
							}
							if (lendBathNoArr.length > 0) {
								$("#loanForm #lendBathNo").val(lendBathNoArr[0]);
								$("#loanForm #lendAmt").val(lendAmtArr[0]);
								$("#loanForm #lendDate").val(lendDateArr[0]);
								$("#loanForm #lendPerson").val(lendPersonArr[0]);
								$("#loanForm #lendCorp").val(lendCorpArr[0]);
								$("#loanForm #lendState").val(lendStateArr[0]);
								
								var lendNum = lendBathNoArr.length;
								loanNoNum = 1;
								for (var i = 1; i < lendNum; i++){
									addLoan("loanForm");
									$("#loanForm #lendBathNo" + (i + 1)).val(lendBathNoArr[i]);
									$("#loanForm #lendAmt" + (i + 1)).val(lendAmtArr[i]);
									$("#loanForm #lendDate" + (i + 1)).val(lendDateArr[i]);
									$("#loanForm #lendPerson" + (i + 1)).val(lendPersonArr[i]);
									$("#loanForm #lendCorp" + (i + 1)).val(lendCorpArr[i]);
									$("#loanForm #lendState" + (i + 1)).val(lendStateArr[i]);
								}
							}
							// 融资直通车
						} else if (formId == "financeForm") {
							hasInvClick("tab1Div", $("#tab1Div .rad:checked"));
							// 发票信息
							var invNos = data.invNo;
							var invAmts = data.invAmt;
							var invoices = data.invoice;
							var invNoArr = new Array();
							var invAmtArr = new Array();
							var invoiceArr = new Array();
							
							if (!CloudUtils.isEmpty(invNos)) {
								invNoArr = invNos.split(",");
							}
							if (!CloudUtils.isEmpty(invAmts)) {
								invAmtArr = invAmts.split(",");
							}
							if (!CloudUtils.isEmpty(invoices)) {
								invoiceArr = invoices.split(",");
							}
							
							if (invNoArr.length > 0) {
								var invNum = invNoArr.length;
								invNoNumTab = 0;
								for (var i = 1; i < invNum + 1; i++){
									addInv('financeForm', 'init');
									$("#financeForm #invNo"+i).val(invNoArr[i-1]);
									$("#financeForm #invAmt"+i).val(invAmtArr[i-1]);
									$("#financeForm #invoice"+i).val(invoiceArr[i-1]);
								}
							}
							
							// 授信申请
							FlowMngCommon.initCreditEvent("financeForm");
							
							// 出账信息
							var lendBathNoArr = new Array();
							var lendAmtArr = new Array();
							var lendDateArr = new Array();
							var lendPersonArr = new Array();
							var lendCorpArr = new Array();
							var lendStateArr = new Array();
							
							$("#tab5Div #loanDiv").empty();
							FlowMngCommon.getLendCorpNameList("tab5Div", "lendCorp");
							
							if (!CloudUtils.isEmpty(data.lendBathNo)) {
								lendBathNoArr = data.lendBathNo.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendAmt)) {
								lendAmtArr = data.lendAmt.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendDate)) {
								lendDateArr = data.lendDate.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendPerson)) {
								lendPersonArr = data.lendPerson.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendCorp)) {
								lendCorpArr = data.lendCorp.split(",");
							}
							if (!CloudUtils.isEmpty(data.lendState)) {
								lendStateArr = data.lendState.split(",");
							}
							if (lendBathNoArr.length > 0) {
								$("#tab5Div #lendBathNo").val(lendBathNoArr[0]);
								$("#tab5Div #lendAmt").val(lendAmtArr[0]);
								$("#tab5Div #lendDate").val(lendDateArr[0]);
								$("#tab5Div #lendPerson").val(lendPersonArr[0]);
								$("#tab5Div #lendCorp").val(lendCorpArr[0]);
								$("#tab5Div #lendState").val(lendStateArr[0]);
								
								var lendNum = lendBathNoArr.length;
								loanNoNumTab = 1;
								for (var i = 1; i < lendNum; i++){
									addLoan("tab5Div");
									$("#tab5Div #lendBathNo" + (i + 1)).val(lendBathNoArr[i]);
									$("#tab5Div #lendAmt" + (i + 1)).val(lendAmtArr[i]);
									$("#tab5Div #lendDate" + (i + 1)).val(lendDateArr[i]);
									$("#tab5Div #lendPerson" + (i + 1)).val(lendPersonArr[i]);
									$("#tab5Div #lendCorp" + (i + 1)).val(lendCorpArr[i]);
									$("#tab5Div #lendState" + (i + 1)).val(lendStateArr[i]);
								}
							}
						}
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
}

/**
 * 再申请
 * @param formId
 */
function reApply(formId, modalId) {
	// 表单验证
	var bootstrapValidator = $('#' + formId).data('bootstrapValidator');
	bootstrapValidator.validate();
	if (!bootstrapValidator.isValid()) { 
		return;
	}
	if (formId == "contractForm") {
		FlowMngCommon.countFees("contractForm");
	} else if (formId == "financeForm") {
		FlowMngCommon.countFees("tab4Div");
	}
	
	if (formId != "loanForm") {
		$("#" + formId).find("[name=chaseFlg]").attr("disabled", false)
		$("#" + formId).find("#factorType").attr("disabled", false)
	}
	
	if(formId == "onlineForm"){
		countFees("onlineForm");
	}
	var data = CloudUtils.convertStringJson(formId);
	
	if(formId == "onlineForm"){
        var jsonData = eval("(" + data + ")");
        var selCorpId = $("#onlineForm #selCorpId").val();
        if(selCorpId==""){
        	return;
        }else{
        	jsonData.selCorpId = selCorpId;
        	data = JSON.stringify(jsonData); 
        }
	}
	
	if (formId != "loanForm") {
		$("#" + formId).find("[name=chaseFlg]").attr("disabled", true)
		$("#" + formId).find("#factorType").attr("disabled", true)
	}
	var options = {
			url : '../../workflow/apply_' + formId,
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					if(formId=="onlineForm"){
						FlowMngCommon.initDetailTable("onLine", $("#onLineModal #procInsId").val(), 'NOT');
					}else{
						FlowMngCommon.initDetailTable('detail', $("#detailModal #procInsId").val(), 'NOT');
					}
					bootbox.alert(data.resultNote);
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
	$("#" + modalId).modal("hide");
	window.parent.scrollTo(0,0);
}

/**
 * 审批
 * @param flg 0--同意,1--不同意
 */
function doAgree(flg) {
	var options = {
			url : '../../workflow/check',
			data : JSON.stringify({
				procInsId : $("#detailModal #procInsId").val(),
				workItemId : $("#detailModal #workItemId").val(),
				stepId : $("#detailModal #stepId").val(),
				agreeFlg : flg,
				proAdvice : $("#proAdvice").val()
			}),
			callBackFun : function(data) {
				if(data.result==0){
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					FlowMngCommon.initDetailTable('detail', $("#detailModal #procInsId").val(), 'NOT');
					bootbox.alert(data.resultNote);
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

/**
 * 日期控件初始化
 */
function dateload() {
	// 检索条件日期
	FlowMngCommon.dateload_createTime('createTime');
	
	// 标准流程_合同申请
	$("#contractForm").find("#repaymentDate, #cntEffectDate, #cntEndDate").datetimepicker({
		startDate: new Date(),
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	
	// 标准流程_放款申请
	$("#loanForm #lendDate").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	
	// 特殊事项审批
	$("#spMatterForm").find("#repayDate").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	
	// 融资直通车
	$("#tab4Div").find("#repaymentDate, #cntEffectDate, #cntEndDate").datetimepicker({
		startDate: new Date(),
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	
	$("#tab5Div #lendDate").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
}

/**
 * 检索
 */
function searchFun() {
	// 未结一览再检索
	FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
}

/**
 * 添加一条发票栏位
 * @param formId
 * @param type
 */
function addInv(formId, type){
	var no;
	if (formId == "financeForm") {
		no = invNoNumTab++ + 1;
	} else {
		no = invNoNum++ + 1;
	}
	
	var invHtml='<div class="form-group" id="invNoDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"  for="invNo'+no+'"><span class="required">*</span>发票编号'+no+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="invNo" class="form-control" id="invNo'+no+'" placeholder="发票编号'+no+'" maxlength="20">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="invAmtDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"  for="invAmt'+no+'"><span class="required">*</span>发票金额'+no+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="invAmt" class="form-control" id="invAmt'+no+'" placeholder="发票金额'+no+'">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	
	var invFHtml='<div class="form-group" id="invFDiv'+no+'">';
	invFHtml +=	'	<label class="col-sm-4 control-label"  for="invoice'+no+'"><span class="required">*</span>发票'+no+'</label>';
	invFHtml +=	'	<div class="col-sm-6">';
	invFHtml +=	'		<div class="input-group" id="divFileUpload">';
	invFHtml +=	'			<input type="text" class="form-control" id="invoice'+no+'" name="invoice" placeholder="上传附件" readonly>';
	invFHtml +=	'			<span class="input-group-addon">';
	invFHtml +=	'			<i class="fa fa-ellipsis-h" aria-hidden="true"  onclick="FlowMngCommon.fileSelect(this);"></i>';
	invFHtml +=	'			<input type="file" name="file" id="invoiceFile'+no+'" onchange="FlowMngCommon.ajaxFileUpload(this);" style="display:none;">';
	invFHtml +=	'			</span>';
	invFHtml +=	'		</div>';
	invFHtml +=	'	</div>';
	invFHtml +=	'</div>';
	
	invFHtml += invHtml;
	$("#" + formId + " #otherInv").append(invFHtml);
	
	if (type != 'init') {
		// 重置发票验证
		$("#" + formId)
			.data("bootstrapValidator")
			.updateStatus("hasInv", "NOT_VALIDATED", null)
			.validateField("hasInv");
	}
	
	// 动态添加发票验证
	$("#" + formId)
	.data("bootstrapValidator")
	.addField("invoice", {
		trigger: 'focus',
		validators: {
			notEmpty: {
                message: '发票附件不能为空'
            }
		}
	})
	.addField("invNo", {
		validators: {
			notEmpty: {
                message: '发票编号不能为空'
            },
            regexp: {
            	regexp: /[a-zA-Z0-9]+/,
                message: '只能输入数字和字母'
            }
		}
	})
	.addField("invAmt", {
		validators: {
			notEmpty: {
                message: '发票金额不能为空'
            },
            regexp: {
            	regexp: /^\d+(\.\d{1,2})?$/,
                message: '只能输入最多两位小数的非负数'
            },
            callback: {
            	callback: function(value, validator) {
            		return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000
            	},
            	message: '发票金额要在0-1,000,000,000之间'
            }
		}
	});
	
	$("#" + formId).find("#invAmt" + no).number(true, 2);
}

/**
 * 删除一条发票栏位
 * @param formId
 */
function delInv(formId){
	var no;
	if (formId == 'normalForm') {
		if(invNoNum>0){
			no = invNoNum--;
		}
	} else {
		if (invNoNumTab > 0) {
			no = invNoNumTab--;
		}
	}
	
	if (no > 0) {
		$("#" + formId + " #invFDiv"+no).remove();
		$("#" + formId + " #invNoDiv"+no).remove();
		$("#" + formId + " #invAmtDiv"+no).remove();
		
		if (formId == "financeForm") {
			$("#financeForm")
			.data("bootstrapValidator")
			.removeField($("#invoice" + no))
			.removeField($("#invNo" + no))
			.removeField($("#invAmt" + no));
		}
		
		// 重置发票验证
		$("#" + formId)
			.data("bootstrapValidator")
			.updateStatus("hasInv", "NOT_VALIDATED", null)
			.validateField("hasInv");
	}
}

/**
 * 还款类型改变自动带出还款企业
 * @param obj
 * @param formId
 */
function setRepaymentCorp(obj, formId) {
	var repayCorp;
	// 买方
	if ($(obj).val() == "1") {
		repayCorp = $("#" + formId).find("#relBuyName").val();
		// 卖方
	} else {
		repayCorp = $("#" + formId).find("#relSaleName").val();
	}
	
	// 特殊事项
	if (formId == "spMatterForm") {
		$("#spMatterForm #repayCorp").val(repayCorp);
		// 合同申请
	} else {
		$("#contractForm #repaymentCorp").val(repayCorp);
	}
}

/**
 * 添加放款信息
 * @param formId
 */
function addLoan(formId){
	var no;
	var form_valid = "financeForm";
	if (formId == "loanForm") {
		no = ++loanNoNum;
		form_valid = "loanForm";
	} else {
		no = ++loanNoNumTab;
	}
	
	var invHtml='<div class="form-group" id="lendBathNoDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款批次号'+no+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendBathNo" class="form-control" id="lendBathNo'+no+'" placeholder="放款批次号" maxlength="11">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendAmtDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款金额'+no+'</label>';
	invHtml +=	'	 <div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendAmt" class="form-control" id="lendAmt'+no+'" placeholder="放款金额">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendDateDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款时间'+no+'</label>';
	invHtml +=	'	 <div class="col-sm-6 has-feedback">';
	invHtml +=	'		<input name="lendDate" class="form-control" style="cursor: pointer;" id="lendDate'+no+'" readonly="readonly" type="text">';
	invHtml +=	'		<span class="glyphicon glyphicon-calendar form-control-feedback"></span>';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendPersonDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>放款人'+no+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendPerson" class="form-control" id="lendPerson'+no+'" placeholder="放款人" maxlength="16">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendCorpDiv'+no+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>放款企业'+no+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	//invHtml +=	'		<input type="text" name="lendCorp" class="form-control" id="lendCorp'+no+'" placeholder="放款企业" maxlength="32">';
	invHtml +=	'		<select name="lendCorp" class="form-control" id="lendCorp'+no+'"></select>';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendStateDiv'+no+'">';
	invHtml +=	'	 <label class="col-sm-4 control-label"><span class="required">*</span>放款状态'+no+'</label>';
	invHtml +=	'	 <div class="col-sm-6">';
	invHtml +=	'	 	<select id="lendState'+no+'" name="lendState" class="form-control">';
	invHtml +=	'	   		<option value="1">已放款</option>';
	invHtml +=	'	    	<option value="2">未放款</option>';
	invHtml +=	'	    </select>';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
  
	$("#" + formId).find("#loanDiv").append(invHtml);
	// 标准流程_放款申请
	$("#" + formId).find("#lendDate"+no).datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	// 放款企业模糊匹配
	FlowMngCommon.getLendCorpNameList(formId, "lendCorp" + no);
	
	$("#" + formId).find("#lendAmt"+no).number(true, 2);
	
	// 动态添加验证
	$("#" + form_valid)
	.data("bootstrapValidator")
	.addField("lendBathNo", {
		validators: {
			numeric: {
	            message: '请输入数字'
	        }
		}
	})
	.addField("lendAmt", {
		validators: {
			numeric: {
                message: '放款金额请输入数字'
            },
            callback: {
            	message: '放款金额要在0-1,000,000,000之间',
            	callback: function(value, validator) {
            		return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
            	}
            }
		}
	})
	.addField("lendPerson", {
		validators: {
			notEmpty: {
                message: '放款人不能为空'
            }
		}
	})
	.addField("lendCorp", {
		validators: {
			notEmpty: {
                message: '放款企业不能为空'
            }
		}
	})
	.addField("lendState", {
		validators: {
			notEmpty: {
                message: '放款状态不能为空'
            }
		}
	});
}

/**
* 删除一条放款栏位
* @param formId
*/
function delLoan(formId){
	var no;
	var form_valid = "financeForm";
	if (formId == "loanForm") {
		if (loanNoNum > 1) {
			no = loanNoNum--;
		}
		form_valid = "loanForm";
	} else {
		if (loanNoNumTab > 1) {
			no = loanNoNumTab--;
		}
	}
	if (no > 1) {
		$("#" + form_valid)
		.data("bootstrapValidator")
		.removeField($("#lendBathNo" + no))
		.removeField($("#lendAmt" + no))
		.removeField($("#lendPerson" + no))
		.removeField($("#lendCorp" + no))
		.removeField($("#lendState" + no));
		
		$("#" + formId).find("#lendBathNoDiv"+no).remove();
		$("#" + formId).find("#lendAmtDiv"+no).remove();
		$("#" + formId).find("#lendDateDiv"+no).remove();
		$("#" + formId).find("#lendPersonDiv"+no).remove();
		$("#" + formId).find("#lendCorpDiv"+no).remove();
		$("#" + formId).find("#lendStateDiv"+no).remove();
	}
}

/**
 * 是否添加发票click事件
 * @param formId
 * @param obj
 */
function hasInvClick(formId, obj) {
	if (obj.val() == "1") {
		$("#" + formId + " #otherInv").collapse('show');
	} else {
		// 标准流程
		if (formId == "normalForm") {
			invNoNum = 0;
			// 融资直通车
		} else {
			invNoNumTab = 0;
			if ($("#" + formId).find("input[name='invoice']").length > 0) {
				$("#financeForm")
				.data("bootstrapValidator")
				.removeField("invoice")
				.removeField("invNo")
				.removeField("invAmt");
			}
		}
		
		$("#" + formId + " #otherInv").empty();
		$("#" + formId + " #otherInv").append($("#" + formId + " #otherInvHtml").html());
		$("#" + formId + " #otherInv").collapse('hide');
	}
}

/**
 * 权限转移_弹框
 */
function transfer() {
	$("#transferModal").modal({backdrop: 'static', keyboard: false});
	$("#transferUser").empty();
	
	// 转移用户列表取得
	var param = {
			corpId : store.get('corpId'),
			menuId : "MENU050200",
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../user/hasMenuList',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if (data.result == 0) {
					var curRoleId = store.get("roleId");
					$.each(data.dataList, function (index, record) {
						if (record.roleId != curRoleId) {
							$("#transferUser").append("<option value=" + record.username + ">" + record.username + "</option>");
						}
					});
					$("#transferModal #transeBtn").attr("onclick","confirmTransfer('detailModal')");
				} else {
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
 * 权限转移_确认
 */
function confirmTransfer(modalId) {
	// 权限转移用户
	var param = {
			workItemId : $("#"+modalId+" #workItemId").val(),
			transferUser : $("#transferUser").val(),
			stepId : $("#detailModal #stepId").val()
	};
	var options = {
			url : '../../workflow/transfer',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if (data.result == 0) {
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					FlowMngCommon.initDetailTable('detail', $("#"+modalId+" #procInsId").val(), 'NOT');
					bootbox.alert(data.resultNote);
					$("#onLineModal").modal("hide");
				} else {
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
 * 在线申请-短信确认
 */
function handleOnLine() {
	var formId;
	var modalId;
	var procInsId = $("#onLineModal #procInsId").val();
	var workItemId = $("#onLineModal #workItemId").val();
	var stepId = $("#onLineModal #stepId").val();
	var flowType = stepId.slice(0, 1);
	
	if (stepId == "O2") {
		modalId = "firstModal";
		formId = "firstForm";
	} else if (stepId == "O1") {
		modalId = "onlineModal";
		formId = "onlineForm";
	} else {
		modalId = "finalModal";
		formId = "finalForm";
	}
	
	$("#" + modalId).modal({backdrop: 'static', keyboard: false});
	if (modalId == "onlineModal") {
		$("#" + formId).find("#workItemId").val(workItemId);
		$("#" + formId).find("#proName").attr("readonly","readonly");

		var options = {
				url : '../../workflow/info',
				data : JSON.stringify({
					workItemId : workItemId,
					procInsId : procInsId,
					stepId : stepId
				}),
				callBackFun : function(data) {
					if(data.result==0){
						CloudUtils.setFormNoClick(data, formId);
						$("#selCorpId").attr("disabled", true);
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
}


/**
 * 计算手续费/管理费/利息 
 * 
 * 利息interest  F=P（1+r*n)   p是本金（融资金额） r是利率 n是年数/月数/天数
 * 管理费manageFee  F=P1（1+r1*n1)   p1是发票金额(应收账款) r1是管理费率 n1是年数/月数/天数
 * 
 */
function countFees(formId){
	var days = 0;
	var repaymentPlan = $("#" + formId).find("#repaymentPlan").val();
	var times = $("#" + formId).find("#repaymentTimes").val();
	if(repaymentPlan=="1"){//年
		var paramStr = times + ",360" ;
		days =  CloudUtils.MathArray(paramStr,"mul");
	}else if(repaymentPlan=="2"){//季
		var paramStr = times + ",90";
		days =  CloudUtils.MathArray(paramStr,"mul");
	}else if(repaymentPlan=="3"){//月
		var paramStr = times + ",30";
		days =  CloudUtils.MathArray(paramStr,"mul");
	}else if(repaymentPlan=="4"){//天
		days = times;
	}
	
	//计算管理费
	var manageFeeRateTmp = $("#" + formId).find("#managementFeeRate").val() ==""?0:$("#" + formId).find("#managementFeeRate").val();
	var manageFeeRateStr = manageFeeRateTmp +",100";
	var manageFeeRate = CloudUtils.MathArray(manageFeeRateStr,"div");//管理费率
	
	var manageFeeStrStep1 = manageFeeRate + "," + days;
	var manageFeeResultStep1 = CloudUtils.MathArray(manageFeeStrStep1,"mul");
	var manageFeeStrStep2 = manageFeeResultStep1 + ",1";
	var manageFeeResultStep2 = CloudUtils.MathArray(manageFeeStrStep2,"add");
	var arAmt = $("#" + formId).find("#arAmt").val();//应收账款
	var manageFeeResultStep3 = manageFeeResultStep2 + "," +arAmt;
	
	var manageFee = CloudUtils.MathArray(manageFeeResultStep3,"mul");
	$("#" + formId).find("#managementFee").val(manageFee);
}

/**
 * 还款计划change事件
 */
function changeRepaymentPlan() {
	$("#onlineForm")
		.data("bootstrapValidator")
		.updateStatus("repaymentTimes", "NOT_VALIDATED", null)
		.validateField("repaymentTimes");
}

/**
 * 在线申请-卖方确认-第一步选择界面
 */
function firstConfirm(flag){
	var procInsId = $("#onLineModal #procInsId").val();
	var workItemId = $("#onLineModal #workItemId").val();
	var stepId = $("#onLineModal #stepId").val();
	var flowType = stepId.slice(0, 1);
	var modalId;
	if(flag==0){//确认
		modalId = "confirmModal1";
	}else{//退回
		modalId = "confirmModal2";
	}
	$("#" + modalId).modal({backdrop: 'static', keyboard: false});
	$("#" + modalId + " #phone").val(store.get('mobilephone'));
}

/**
 * 在线申请权限转移_弹框
 */
function transferOnLine() {
	$("#transferModal").modal({backdrop: 'static', keyboard: false});
	$("#transferUser").empty();
	
	// 转移用户列表取得
	var param = {
			corpId : store.get('corpId'),
			roleType : 5,
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../user/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if (data.result == 0) {
					var curRoleId = store.get("roleId");
					$.each(data.dataList, function (index, record) {
						if (record.roleId != curRoleId) {
							$("#transferUser").append("<option value=" + record.username + ">" + record.username + "</option>");
						}
					});
					$("#transferModal #transeBtn").attr("onclick","confirmTransfer('onLineModal')");
				} else {
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
 * 在线签约确认-跳转保理商经办人
 * @param flg 0--同意,1--不同意
 */
function toNext(flg,formId){
	var options = {
			url : '../../workflow/check',
			data : JSON.stringify({
				procInsId : $("#onLineModal #procInsId").val(),
				workItemId : $("#onLineModal #workItemId").val(),
				stepId : $("#onLineModal #stepId").val(),
				agreeFlg : flg,
				proAdvice : $("#" + formId).find("#proAdvice").val()
			}),
			callBackFun : function(data) {
				if(data.result==0){
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					FlowMngCommon.initDetailTable("onLine",$("#onLineModal #procInsId").val(), 'NOT');
					bootbox.alert(data.resultNote);
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

/**
 * 在线签约确认-验证短信
 * @param flg 0--同意,1--不同意
 */
function confirmSign(flg,formId){
	var data = CloudUtils.convertStringJson(formId);
	var options = {
			url : '../../login/signPhoneCheck',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					toNext(flg,formId);
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
 * 获取验证码
 */
function getCode(formId) {
	var phone = $("#" + formId).find("#phone").val();
	var param = {    
			  phone:phone
          };    
	var options = {
			url : '../../login/signPhoneCode',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					Countdown(formId);
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/*验证码倒计时*/
var timer =60;
function Countdown(formId) {
    if (timer >= 1) {
        timer -= 1;
        var str = timer+"秒后可重发";
        $("#" + formId).find("#code").attr('placeholder',str);
        $("#" + formId).find("#getCode").attr("disabled", true); 
        setTimeout(function() {
            Countdown(formId);
        }, 1000);
    }else{
    	$("#" + formId).find("#getCode").attr("disabled", false); 
    	$("#" + formId).find("#code").attr('placeholder',"请输入短信验证码");
    	timer = 60;
    }
}

/**
 * 金额项目千分位符表示
 */
function numFormat(){
	$("input[name='billAmount']").number(true, 2);
	$("input[name='arBal']").number(true, 2);
	$("input[name='aplFacAmt']").number(true, 2);
	$("input[name='reditLine']").number(true, 2);
	$('input[name="arAmt"]').number(true, 2);
	$('input[name="arTransfAmt"]').number(true, 2);
	$('input[name="earnestMoney"]').number(true, 2);
	$('input[name="serviceAmt"]').number(true, 2);
	$('input[name="guaranteeValue"]').number(true, 2);
	$('input[name="inComeMakeUp"]').number(true, 2);
	$('input[name="loanAmt"]').number(true, 2);
	$('input[name="commission"]').number(true, 2);
	$('input[name="otherCost"]').number(true, 2);
	$('input[name="managementFee"]').number(true, 2);
	$('input[name="penalty"]').number(true, 2);
	$('input[name="repaymentAmt"]').number(true, 2);
	$('#loanForm #lendAmt').number(true, 2);
	$('#tab5Div #lendAmt').number(true, 2);
	
	$("#spMatterModal #repayAmount").number(true, 2);
	$("#spMatterModal #reduceAmount").number(true, 2);
}