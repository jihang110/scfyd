$(document).ready(function() {
	window.parent.scrollTo(0,0);
	
	//modal绑定事件
	// 标准流程
	$('#normalModal').on('hidden.bs.modal', function(){
		$("#normalForm")[0].reset();
		$("#normalForm").data('bootstrapValidator').resetForm();
		$("#otherInv").empty();
		invNoNum = 0;
	});
	$('#normalModal').on('hide.bs.modal', function () {
		$("#normalForm").data('bootstrapValidator').resetForm();
	});
	
	// 特殊事项审批
	$('#spMatterModal').on('hidden.bs.modal', function(){
		$("#spMatterForm")[0].reset();
		$("#spMatterForm").data('bootstrapValidator').resetForm();
	});
	$('#spMatterModal').on('hide.bs.modal', function () {
		$("#spMatterForm").data('bootstrapValidator').resetForm();
	});
	
	// 在线签约
	$('#onlineModal').on('hidden.bs.modal', function(){
		$("#onlineForm")[0].reset();
		$("#onlineForm").data('bootstrapValidator').resetForm();
	});
	$('#onlineModal').on('hide.bs.modal', function () {
		$("#onlineForm").data('bootstrapValidator').resetForm();
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
	
	// 是否添加发票click事件
	$("#normalForm #otherInv").collapse('show');
	$("#normalForm .rad").click(function(){
		hasInvClick("normalForm", $(this));
	});
	
	// 日期控件加载
	dateload();
	
	// 前端校验
	FlowMngCommon.spFormValidator();
	FlowMngCommon.nmFormValidator("normalForm");
	FlowMngCommon.financeFormValidator("financeForm");
	FlowMngCommon.contractFormValidator("onlineForm"); //在线申请签约——卖方确认
	
	/** 标准流程 */
	// 联想选择_关联买方名称
	getRelBuyAndSaleNameList('normalForm', '4', 'relBuyName', 'relBuyId');
	// 联想选择_关联卖方名称
	getRelBuyAndSaleNameList('normalForm', '5', 'relSaleName', 'relSaleId');
	/** 特殊事项审批 */
	// 联想选择_项目名称
	getProNameList();
	//联想选择_在线申请
	getOnlineCorpNm("onlineForm",'', 'repaymentCorp');
	//在线申请_公司名称
	FlowMngCommon.ajaxSelCorps();
	
	/** 融资直通车 event start */
	// 是否添加发票click事件
	$("#tab1Div #otherInv").collapse('show');
	$("#tab1Div .rad").click(function(){
		hasInvClick("tab1Div", $(this));
	});
	
	// 联想选择_关联买方名称
	getRelBuyAndSaleNameList('tab1Div', '4', 'relBuyName', 'relBuyId');
	// 联想选择_关联卖方名称
	getRelBuyAndSaleNameList('tab1Div', '5', 'relSaleName', 'relSaleId');
	
	// 授信申请_事件绑定
	FlowMngCommon.bindCreditEvent("financeForm");
	FlowMngCommon.initCreditEvent("financeForm");
	/** 融资直通车 event end */
	
	// 金额项目千分位符表示 
	numFormat();
});
var invNoNum = 0;
var invNoNumTab = 0;
var loanNoNumTab = 1;
/**
 * 发起流程
 * @param modalId
 * @param workflowNm
 */
function start(modalId, workflowNm) {
	// 流程名设置
	$("#" + modalId).find("#workflowNm").val(workflowNm);
	$("#" + modalId).find(".modal-title").text(workflowNm);

	// 标准流程
	if (modalId == "normalModal") {
		$("#normalForm #otherInv").append($("#normalForm #otherInvHtml").html());
		
		// 融资直通车
	} else if (modalId == "financeModal") {
		$("#tab1Div #otherInv").append($("#tab1Div #otherInvHtml").html());
		$("#tab1Div #proMembName").val(store.get("username"));
		// 合同申请_还款类型空白设置
		$("#tab4Div #repaymentType").val("");
		// 放款申请_放款企业模糊匹配
		FlowMngCommon.getLendCorpNameList("tab5Div", "lendCorp");
		
		// 特殊事项审批,特殊事项快速审批
	} else if (modalId == "spMatterModal") {
		$("#applyItem").val("1");
		FlowMngCommon.changeApplyItem($("#applyItem").val());
		$("#spMatterForm #repayType").val("");
	}
	
	$('#' + modalId).modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
}

/**
 * 图形
 * @param type
 */
function launchPic(type) {
	var title;
	var src;
	
	// 标准流程
	if (type === 'normal') {
		title = '标准流程';
		src = '../../images/normal.jpg';
		
		// 特殊事项审批
	} else if (type === 'spMatter') {
		title = '特殊事项审批';
		src = '../../images/spmatter.jpg';
		
		// 在线签约
	} else if (type === 'online') {
		title = '在线签约';
		src = '../../images/online.jpg';

		// 融资直通车
	} else if (type === 'finance') {
		title = '融资直通车';
		src = '../../images/finance.jpg';
		
		// 特殊事项快速审批
	} else if (type === 'spMatterFast') {
		title = '特殊事项快速审批';
		src = '../../images/spmatterfast.jpg';
	}
	
	$("#picModalLabel").text(title);
	$("#pic").attr("src", src);
	$("#picModal").modal({backdrop: 'static', keyboard: false});
}

/**
 * 创建流程
 * @param formId
 */
function create(formId, modalId) {
	// 前端校验
	var bootstrapValidator = $("#" + formId).data('bootstrapValidator');
	bootstrapValidator.validate();
	if (!bootstrapValidator.isValid()) {
		return;
	}
	
	var data;
	var url;
	
	if (formId == "spMatterForm") {
		$("#" + formId).find("[name=chaseFlg]").attr("disabled", false)
		$("#" + formId).find("#factorType").attr("disabled", false)
	} else if (formId == "financeForm") {
		FlowMngCommon.countFees("tab4Div");
	} else if (formId === "onlineForm"){
		if(checkSelHandleUser()){
			countFees();
			url = '../../workflow/startOnlineProcess';
		}else{
			return;
		}
	}
	
	data = CloudUtils.convertStringJson(formId);
	
	if (formId == "spMatterForm") {
		$("#" + formId).find("[name=chaseFlg]").attr("disabled", true)
		$("#" + formId).find("#factorType").attr("disabled", true)
	}
	
	if (formId === "normalForm") {
		url = '../../workflow/startNmProcess';
	} else if (formId === "spMatterForm") {
		url = '../../workflow/startSpProcess';
	} else if (formId === "financeForm") {
		url = '../../workflow/startFinanceProcess';
	} 
	
	var options = {
			url : url,
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote);
					$("#" + modalId).modal("hide");
					window.parent.scrollTo(0,0);
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
 * 计算手续费/管理费/利息 
 * 
 * 利息interest  F=P（1+r*n)   p是本金（融资金额） r是利率 n是年数/月数/天数
 * 管理费manageFee  F=P1（1+r1*n1)   p1是发票金额(应收账款) r1是管理费率 n1是年数/月数/天数
 * 
 */
function countFees(){
	var days = 0;
	var repaymentPlan = $("#repaymentPlan").val();
	var times = $("#repaymentTimes").val();
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
	var manageFeeRateTmp = $("#managementFeeRate").val() ==""?0:$("#managementFeeRate").val();
	var manageFeeRateStr = manageFeeRateTmp +",100";
	var manageFeeRate = CloudUtils.MathArray(manageFeeRateStr,"div");//管理费率
	
	var manageFeeStrStep1 = manageFeeRate + "," + days;
	var manageFeeResultStep1 = CloudUtils.MathArray(manageFeeStrStep1,"mul");
	var manageFeeStrStep2 = manageFeeResultStep1 + ",1";
	var manageFeeResultStep2 = CloudUtils.MathArray(manageFeeStrStep2,"add");
	var arAmt = $("#arAmt").val();//应收账款
	var manageFeeResultStep3 = manageFeeResultStep2 + "," +arAmt;
	
	var manageFee = CloudUtils.MathArray(manageFeeResultStep3,"mul");
	$("#managementFee").val(manageFee);
}

/**
 * 日期控件初始化
 */
function dateload() {
	// 标准流程_立项管理
	$("#normalForm #proMakeDate").datetimepicker({
		startDate: new Date(),
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
	$("#tab1Div #proMakeDate").datetimepicker({
		startDate: new Date(),
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	
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
	
	//在线申请 签约
	$("#onlineForm #repaymentDate").datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	//开始时间
	$('#onlineForm #cntEffectDate').datetimepicker({  
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	}).on('changeDate',function(e){  
	    var startTime = e.date;  
	    $('#onlineForm #cntEndDate').datetimepicker('setStartDate',startTime);  
	});  
	
	//结束时间：  
	$('#onlineForm #cntEndDate').datetimepicker({  
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	}).on('changeDate',function(e){  
	    var endTime = e.date;  
	    $('#onlineForm #cntEffectDate').datetimepicker('setEndDate',endTime);  
	});
}

/**
 * 添加一条发票栏位
 * @param formId
 */
function addInv(formId){
	var no;
	if (formId == 'normalForm') {
		no = invNoNum++ + 1;
	} else {
		no = invNoNumTab++ + 1;
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
	// 重置发票验证
	$("#" + formId)
		.data("bootstrapValidator")
		.updateStatus("hasInv", "NOT_VALIDATED", null)
		.validateField("hasInv");
}
/**
 * 删除一条发票栏位
 * @param formId
 */
function delInv(formId){
	var no;
	if (formId == 'normalForm') {
		if(invNoNum>0){
			no = invNoNum;
			invNoNum--;
		}
	} else {
		if (invNoNumTab > 0) {
			no = invNoNumTab;
			invNoNumTab--;
		}
	}
	
	if (no > 0) {
		$("#" + formId + " #invFDiv"+no).remove();
		$("#" + formId + " #invNoDiv"+no).remove();
		$("#" + formId + " #invAmtDiv"+no).remove();
		
		$("#financeForm")
		.data("bootstrapValidator")
		.removeField($("#invoice" + no))
		.removeField($("#invNo" + no))
		.removeField($("#invAmt" + no));
		
		// 重置发票验证
		$("#" + formId)
			.data("bootstrapValidator")
			.updateStatus("hasInv", "NOT_VALIDATED", null)
			.validateField("hasInv");
	}
}

/**
 * 联想选择_关联买方/卖方名称
 * @param formId
 * @param sysType
 * @param targetName
 * @param targetId
 */
function getRelBuyAndSaleNameList(formId, sysType, targetName, targetId) {
	// 参数
	var param = {
			sysType : sysType,  //类型有2保理商/3资方/4买方/5卖方
			relaCorpId : store.get('corpId'),
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../corp/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					var jsonStringData = JSON.stringify(data.dataList);
					jsonStringData = jsonStringData.replace(/corpName/g, 'label');
					var jsonData = eval('('+ jsonStringData +')');
					var obj = {
							highlightMatches: true,
					        source: jsonData,
					        // show hint
					        hint: false,
					        empty: false,
					        // max results
					        limit: 5
					};
					// 关联企业名称联想选择
					obj.callback = function (value, index, selected) {
						chgRelBuyAndSaleName(value, sysType, formId, targetId);
					}
					$('#' + formId + ' #' + targetName).autocompleter(obj);
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
 * 关联买方/卖方名称keyup事件
 * @param value
 * @param sysType
 * @param formId
 * @param targetId
 */
function chgRelBuyAndSaleName(value, sysType, formId, targetId) {
	if (CloudUtils.isEmpty(value)) {
		// 企业ID清空
		$('#' + formId + ' #' + targetId).val("");
		// 关联卖方的场合
		if (sysType == '5') {
			// 关联卖方企业名称模糊匹配列表清空
			$('#' + formId + ' #relSaleCorpName').autocompleter('destroy');
		}
	} else {
		var param = {
				corpName : value,
				sysType : sysType,  //类型有2保理商/3资方/4买方/5卖方
				relaCorpId : store.get('corpId'),
				isPage : 0,  //是否分页，0：否，1：是，默认为0.
				corpNameIsAll : "1" //名称匹配采用相等而非模糊查询
		};
		var options = {
				url : '../../corp/list',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					if (data.result == 0) {
						if (data.dataList.length > 0) {
							// 企业ID设定
							$('#' + formId + ' #' + targetId).val(data.dataList[0].corpId);
							// 关联卖方的场合
							if (sysType == '5') {
								getRelSaleCorpNameList(formId, data.dataList[0].corpId);
							}
						} else {
							// 企业ID清空
							$('#' + formId + ' #' + targetId).val("");
							// 关联卖方的场合
							if (sysType == '5') {
								// 关联卖方企业名称模糊匹配列表清空
								$('#' + formId + ' #relSaleCorpName').autocompleter('destroy');
							}
						}
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
}

/**
 * 关联卖方企业名称联想选择
 * @param formId
 * @param relSaleCorpId
 */
function getRelSaleCorpNameList(formId, relSaleCorpId) {
	$('#' + formId + ' #relSaleCorpName').autocompleter('destroy');
	// 参数
	var param = {
			corpId : relSaleCorpId,  //关联卖方企业ID
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../affiliatedEnterprise/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					var jsonStringData = JSON.stringify(data.dataList);
					jsonStringData = jsonStringData.replace(/enterpriseName/g, 'label');
					var jsonData = eval('('+ jsonStringData +')');
					$('#' + formId + ' #relSaleCorpName').autocompleter({
				        highlightMatches: true,
				        source: jsonData,
				        // show hint
				        hint: false,
				        empty: false,
				        // max results
				        limit: 5
				    });
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
 * 联想选择_项目名称
 */
function getProNameList() {
	var options = {
			url : '../../expense/list',
			data : "{}",
			callBackFun : function(data) {
				var jsonStringData = JSON.stringify(data.dataList);
				jsonStringData = jsonStringData.replace(/projectName/g, 'label');
				var jsonData = eval('('+ jsonStringData +')');
				$('#spMatterForm #proName').autocompleter({
			        highlightMatches: true,
			        source: jsonData,
			        // show hint
			        hint: false,
			        empty: false,
			        // max results
			        limit: 5,
			        callback: function (value, index, selected) {
			        	 var param = {    
			   	              projectName:value
			   	         };    
			        	 var options = {
			   				url : '../../expense/list',
			   				data : JSON.stringify(param),
			   				callBackFun : function(data) {
			   					if (data.result == 0) {
			   						$("#spMatterForm [name='chaseFlg']").each(function() {
			   							if (this.value == data.dataList[0].chaseFlg) {
			   								this.checked = true;
			   							}
			   						});
		   		  					$("#spMatterForm #factorType").val(data.dataList[0].factorType);
		   		  					$("#spMatterForm #proMembName").val(data.dataList[0].username);
		   		  					$("#spMatterForm #proMakeDate").val(data.dataList[0].proMakeDate);
			   		  				getRelBuyAndSaleName('4', data.dataList[0].relBuyId, 'relBuyName');
			   		  				getRelBuyAndSaleName('5', data.dataList[0].relSaleId, 'relSaleName');
		   		  					$("#spMatterForm #relSaleCorpName").val(data.dataList[0].relSaleCorpName);
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
			    });
			},
			errorCallback:function(data){
				bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

/*
 * 在线申请-联想输入
 */
function getOnlineCorpNm(formId, sysType, targetName){
	// 参数
	var param = {
			sysType : sysType,  //类型有2保理商/3资方/4买方/5卖方
			relaCorpId : store.get('corpId'),
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../corp/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					var jsonStringData = JSON.stringify(data.dataList);
					jsonStringData = jsonStringData.replace(/corpName/g, 'label');
					var jsonData = eval('('+ jsonStringData +')');
					var obj = {
							highlightMatches: true,
					        source: jsonData,
					        hint: false,
					        empty: false,
					        limit: 5
					};
					$('#' + formId + ' #' + targetName).autocompleter(obj);
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
 * 在线签约-公司名称onchang
 */
function changeCorp(obj){
	var opt = obj.options[obj.selectedIndex];
	$("#onlineForm #corpNm").val(opt.text);
}
/**
 * 在线签约-检查卖方经办人是否存在
 */
function checkSelHandleUser(){
	var result = false;
	var param = {
			roleType : 5,  //类型有2保理商/3资方/4买方/5卖方
			roleId : 'ROLE000012', //卖方经办人角色id
			corpId : $("#onlineForm #selCorpId").val(),// 卖方公司id
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../user/selList',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					var list = data.dataList;
					if(list.length>0){
						result = true;
					}else{
						bootbox.alert("该公司下无卖方经办人帐号，请联系管理员添加！");
						result =  false;
					}
				}else{
					bootbox.alert(data.resultNote);
					result =  false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
	
	return result;
}

/**
 * 项目名称change事件
 */
function changeProName() {
	var projectName = $("#spMatterForm #proName").val();
	if (projectName == "") {
		$("#spMatterForm [name='chaseFlg']").get(0).checked = true;
		$("#spMatterForm #factorType").val("");
		$("#spMatterForm #proMembName").val("");
		$("#spMatterForm #proMakeDate").val("");
		$("#spMatterForm #relBuyName").val("");
		$("#spMatterForm #relSaleName").val("");
		$("#spMatterForm #relSaleCorpName").val("");
	} else {
		var param = {
				projectName:projectName,
		};
		var options = {
				url : '../../expense/list',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					if (data.result == 0) {
						if (data.dataList.length == 0) {
							$("#spMatterForm [name='chaseFlg']").get(0).checked = true;
							$("#spMatterForm #factorType").val("");
							$("#spMatterForm #proMembName").val("");
							$("#spMatterForm #proMakeDate").val("");
							$("#spMatterForm #relBuyName").val("");
							$("#spMatterForm #relSaleName").val("");
							$("#spMatterForm #relSaleCorpName").val("");
						} else {
							$("#spMatterForm [name='chaseFlg']").each(function() {
	   							if (this.value == data.dataList[0].chaseFlg) {
	   								this.checked = true;
	   							}
	   						});
							$("#spMatterForm #factorType").val(data.dataList[0].factorType);
		  					$("#spMatterForm #proMembName").val(data.dataList[0].username);
		  					$("#spMatterForm #proMakeDate").val(data.dataList[0].proMakeDate);
		  					getRelBuyAndSaleName('4', data.dataList[0].relBuyId, 'relBuyName');
	   		  				getRelBuyAndSaleName('5', data.dataList[0].relSaleId, 'relSaleName');
		  					$("#spMatterForm #relSaleCorpName").val(data.dataList[0].relSaleCorpName);
						}
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
}

/**
 * 关联买方/卖方名称取得
 * @param sysType
 * @param corpId
 * @param targetId
 */
function getRelBuyAndSaleName(sysType, corpId, targetId) {
	// 参数
	var param = {
			corpId : corpId,
			sysType : sysType,  //类型有2保理商/3资方/4买方/5卖方
			relaCorpId : store.get('corpId'),
			isPage : 0  //是否分页，0：否，1：是，默认为0.
	};
	var options = {
			url : '../../corp/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					if (data.dataList.length > 0) {
						$("#spMatterForm #" + targetId).val(data.dataList[0].corpName);
					}
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
 * 添加放款信息
 * @param formId
 */
function addLoan(formId){
	loanNoNumTab++;
	var invHtml='<div class="form-group" id="lendBathNoDiv'+loanNoNumTab+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款批次号'+loanNoNumTab+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendBathNo" class="form-control" id="lendBathNo'+loanNoNumTab+'" placeholder="放款批次号" maxlength="11">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendAmtDiv'+loanNoNumTab+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款金额'+loanNoNumTab+'</label>';
	invHtml +=	'	 <div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendAmt" class="form-control" id="lendAmt'+loanNoNumTab+'" placeholder="放款金额">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendDateDiv'+loanNoNumTab+'">';
	invHtml +=	'	<label class="col-sm-4 control-label">放款时间'+loanNoNumTab+'</label>';
	invHtml +=	'	 <div class="col-sm-6 has-feedback">';
	invHtml +=	'		<input name="lendDate" class="form-control" style="cursor: pointer;" id="lendDate'+loanNoNumTab+'" readonly="readonly" type="text">';
	invHtml +=	'		<span class="glyphicon glyphicon-calendar form-control-feedback"></span>';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendPersonDiv'+loanNoNumTab+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>放款人'+loanNoNumTab+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="lendPerson" class="form-control" id="lendPerson'+loanNoNumTab+'" placeholder="放款人" maxlength="16">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendCorpDiv'+loanNoNumTab+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"><span class="required">*</span>放款企业'+loanNoNumTab+'</label>';
	invHtml +=	'	 <div class="col-sm-6">';
	//invHtml +=	'		<input type="text" name="lendCorp" class="form-control" id="lendCorp'+loanNoNumTab+'" placeholder="放款企业" maxlength="32">';
	invHtml +=	'		<select name="lendCorp" class="form-control" id="lendCorp'+loanNoNumTab+'"></select>';
	invHtml +=	'	 </div>';
	invHtml +=	'</div>';
	invHtml +=	'<div class="form-group" id="lendStateDiv'+loanNoNumTab+'">';
	invHtml +=	'	 <label class="col-sm-4 control-label"><span class="required">*</span>放款状态'+loanNoNumTab+'</label>';
	invHtml +=	'	 <div class="col-sm-6">';
	invHtml +=	'	 	<select id="lendState'+loanNoNumTab+'" name="lendState" class="form-control">';
	invHtml +=	'	   		<option value="1">已放款</option>';
	invHtml +=	'	    	<option value="2">未放款</option>';
	invHtml +=	'	    </select>';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
  
	$("#" + formId).find("#loanDiv").append(invHtml);
	// 标准流程_放款申请
	$("#" + formId).find("#lendDate"+loanNoNumTab).datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	// 放款企业模糊匹配
	FlowMngCommon.getLendCorpNameList(formId, "lendCorp" + loanNoNumTab);
	$('#lendAmt' + loanNoNumTab).number(true, 2);
	// 动态添加验证
	$("#financeForm")
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
	if (loanNoNumTab > 1) {
		$("#financeForm")
		.data("bootstrapValidator")
		.removeField($("#lendBathNo" + loanNoNumTab))
		.removeField($("#lendAmt" + loanNoNumTab))
		.removeField($("#lendPerson" + loanNoNumTab))
		.removeField($("#lendCorp" + loanNoNumTab))
		.removeField($("#lendState" + loanNoNumTab));
		
		$("#" + formId).find("#lendBathNoDiv"+loanNoNumTab).remove();
		$("#" + formId).find("#lendAmtDiv"+loanNoNumTab).remove();
		$("#" + formId).find("#lendDateDiv"+loanNoNumTab).remove();
		$("#" + formId).find("#lendPersonDiv"+loanNoNumTab).remove();
		$("#" + formId).find("#lendCorpDiv"+loanNoNumTab).remove();
		$("#" + formId).find("#lendStateDiv"+loanNoNumTab).remove();
		
		loanNoNumTab--;
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
 * 金额项目千分位符表示
 */
function numFormat(){
	$("input[name='billAmount']").number(true, 2);
	$("input[name='arBal']").number(true, 2);
	$("input[name='aplFacAmt']").number(true, 2);
	$("#reditLine").number(true, 2);
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
	$('#lendAmt').number(true, 2);
	
	$("#spMatterModal #repayAmount").number(true, 2);
	$("#spMatterModal #reduceAmount").number(true, 2);
}