package com.ut.scf.respbean.bpm;

import com.ut.scf.respbean.BaseRespBean;
/**
 * 风控审查报告
 * @author zhangyx
 *
 */
public class RiskCtrlReptAddRespBean extends BaseRespBean {
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 是否有追
	 */
	private String chaseFlg;
	
	/**
	 * 保理类型
	 */
	private String factorType;
	
	/**
	 * 立项发起日期
	 */
	private String proMakeDate;
	
	/**
	 * 拟申请保理金额
	 */
	private String aplFacAmt;
	
	/**
	 * 是否存量客户
	 */
	private String isStockCustomer;
	
	/**
	 * 区域
	 */
	private String area;
	
	/**
	 * 客户经理
	 */
	private String custManager;
	
	/**
	 * 判断行业是起步，成熟
	 */
	private String isIndustryRipe;
	
	/**
	 * 行业风险点
	 */
	private String riskPoints;
	
	/**
	 * 客户在行业里面的优势和不足及地位
	 */
	private String shortageAndPositionInIndustry;
	
	/**
	 * 网查信息（百度，工商网，法院网等）
	 */
	private String webSearchInfo;
	
	/**
	 * 中登网筛查
	 */
	private String zhongdengSearch;
	
	/**
	 * 对外投资情况
	 */
	private String foreignInvestment;
	
	/**
	 * 企业的业务风险
	 */
	private String busiRisk;
	
	/**
	 * 内部运营分析
	 */
	private String insideOperationAnalysis;
	
	/**
	 * 年度同比变化大于20%的科目分析
	 * Analysis of subjects with a change of more than 20% year on year
	 */
	private String changeMore20perAnalysis;
	
	/**
	 * 财务比率分析
	 * Financial ratio analysis
	 */
	private String finacialRtAnalysis;
	
	/**
	 * 收入的核实手段
	 * Income verification means
	 */
	private String incomeVerifMethod;
	/**
	 * 收入的真实性评价
	 * Authenticity evaluation of income
	 */
	private String incomeAuthenticityEvaluate;
	
	/**
	 * 利润水平
	 */
	private String profitLevel;
	/**
	 * 利润质量
	 */
	private String profitQuality;
	/**
	 * 刚性负债分析
	 */
	private String rigidLiabilityAnalysis;
	/**
	 * 隐形负债
	 */
	private String hiddenLiabilities;
	/**
	 * 或有负债
	 */
	private String contingentLiabilities;
	/**
	 * 历史征信记录分析
	 */
	private String historicalRecordsAnalysis;
	
	/**
	 * 应收/应付/存货周转率
	 */
	private String turnoverRate;
	
	/**
	 * 应收/应付帐款集中度
	 */
	private String receivableConcentration;
	
	/**
	 * 存活规模
	 */
	private String survivalScale;
	
	/**
	 * 预付资金压力
	 */
	private String advanceFundingPressure;
	
	/**
	 * 存活的价格变动
	 */
	private String survivalPriceChanges;
	
	/**
	 * 流动性测试
	 */
	private String mobilityTest;
	
	/**
	 * 合同是否可以转让
	 */
	private String whetherContractTransferred;
	
	/**
	 * 商业纠纷的约定
	 */
	private String businessDisputeAgreement;
	
	/**
	 * 合同的有效期
	 */
	private String contractValidity;
	
	/**
	 * 合同的计价方式
	 */
	private String cntValuationMethod;
	
	/**
	 * 结算方式
	 */
	private String settlementMethod;
	
	/**
	 * 开票
	 */
	private String billing;
	
	/**
	 * 订单
	 */
	private String order;
	
	/**
	 * 发货单
	 */
	private String delivery;
	
	/**
	 * 收货单
	 */
	private String receipt;
	
	/**
	 * 入库单
	 */
	private String godownEntry;
	
	/**
	 * 榜单
	 */
	private String list;
	
	/**
	 * 仓储单
	 */
	private String storage;
	
	/**
	 * 发票与合同对应
	 */
	private String invoiceCorrespondsContract;
	
	/**
	 * 发票与单据对应
	 */
	private String invoiceBillContract;
	
	/**
	 * 发票与结算方式的对应
	 */
	private String invoiceCorrespondsSettlementMethod;
	
	/**
	 * 确认应收帐款的受让比例
	 */
	private String confirmArProportionReceivable;
	
	/**
	 * 明保
	 */
	private String informFactoring;
	
	/**
	 * 有追
	 */
	private String recourse;
	
	/**
	 * 暗保理
	 */
	private String unInformFactoring;
	
	/**
	 * 行业的风险接受分析
	 */
	private String industryRiskAcceptanceAnalysis;
	
	/**
	 * 引入其他的增信手段
	 */
	private String introductionOtherIncreaseCreditMethod;
	
	/**
	 * 关联风险匹配措施，可要求关联方担保等措施规避
	 */
	private String associatedRiskMatchingMeasures;
	
	/**
	 * 资产负债率比率高，强化后期的资产管理
	 */
	private String assetLiabilityRatioHigh;
	
	/**
	 * 抵质押担保分析
	 */
	private String mortgageGuaranteeAnalysis;
	
	/**
	 * 授信额度
	 */
	private String reditLine;
	
	/**
	 * 授信额度类型
	 */
	private String reditLineType;
	
	/**
	 * 期限
	 */
	private String deadline;
	
	/**
	 * 应收帐款的受让比例
	 */
	private String arFarmInRatio;
	
	/**
	 * 业务期限
	 */
	private String busiDeadline ;
	
	/**
	 * 服务费的收取
	 */
	private String serviceFeeCollection;
	
	/**
	 * 复核结论
	 */
	private String reviewConclusion;

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getChaseFlg() {
		return chaseFlg;
	}

	public void setChaseFlg(String chaseFlg) {
		this.chaseFlg = chaseFlg;
	}

	public String getFactorType() {
		return factorType;
	}

	public void setFactorType(String factorType) {
		this.factorType = factorType;
	}

	public String getProMakeDate() {
		return proMakeDate;
	}

	public void setProMakeDate(String proMakeDate) {
		this.proMakeDate = proMakeDate;
	}

	public String getAplFacAmt() {
		return aplFacAmt;
	}

	public void setAplFacAmt(String aplFacAmt) {
		this.aplFacAmt = aplFacAmt;
	}

	public String getIsStockCustomer() {
		return isStockCustomer;
	}

	public void setIsStockCustomer(String isStockCustomer) {
		this.isStockCustomer = isStockCustomer;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCustManager() {
		return custManager;
	}

	public void setCustManager(String custManager) {
		this.custManager = custManager;
	}

	public String getIsIndustryRipe() {
		return isIndustryRipe;
	}

	public void setIsIndustryRipe(String isIndustryRipe) {
		this.isIndustryRipe = isIndustryRipe;
	}

	public String getRiskPoints() {
		return riskPoints;
	}

	public void setRiskPoints(String riskPoints) {
		this.riskPoints = riskPoints;
	}

	public String getShortageAndPositionInIndustry() {
		return shortageAndPositionInIndustry;
	}

	public void setShortageAndPositionInIndustry(
			String shortageAndPositionInIndustry) {
		this.shortageAndPositionInIndustry = shortageAndPositionInIndustry;
	}

	public String getWebSearchInfo() {
		return webSearchInfo;
	}

	public void setWebSearchInfo(String webSearchInfo) {
		this.webSearchInfo = webSearchInfo;
	}

	public String getZhongdengSearch() {
		return zhongdengSearch;
	}

	public void setZhongdengSearch(String zhongdengSearch) {
		this.zhongdengSearch = zhongdengSearch;
	}

	public String getForeignInvestment() {
		return foreignInvestment;
	}

	public void setForeignInvestment(String foreignInvestment) {
		this.foreignInvestment = foreignInvestment;
	}

	public String getBusiRisk() {
		return busiRisk;
	}

	public void setBusiRisk(String busiRisk) {
		this.busiRisk = busiRisk;
	}

	public String getInsideOperationAnalysis() {
		return insideOperationAnalysis;
	}

	public void setInsideOperationAnalysis(String insideOperationAnalysis) {
		this.insideOperationAnalysis = insideOperationAnalysis;
	}

	public String getChangeMore20perAnalysis() {
		return changeMore20perAnalysis;
	}

	public void setChangeMore20perAnalysis(String changeMore20perAnalysis) {
		this.changeMore20perAnalysis = changeMore20perAnalysis;
	}

	public String getFinacialRtAnalysis() {
		return finacialRtAnalysis;
	}

	public void setFinacialRtAnalysis(String finacialRtAnalysis) {
		this.finacialRtAnalysis = finacialRtAnalysis;
	}

	public String getIncomeVerifMethod() {
		return incomeVerifMethod;
	}

	public void setIncomeVerifMethod(String incomeVerifMethod) {
		this.incomeVerifMethod = incomeVerifMethod;
	}

	public String getIncomeAuthenticityEvaluate() {
		return incomeAuthenticityEvaluate;
	}

	public void setIncomeAuthenticityEvaluate(String incomeAuthenticityEvaluate) {
		this.incomeAuthenticityEvaluate = incomeAuthenticityEvaluate;
	}

	public String getProfitLevel() {
		return profitLevel;
	}

	public void setProfitLevel(String profitLevel) {
		this.profitLevel = profitLevel;
	}

	public String getProfitQuality() {
		return profitQuality;
	}

	public void setProfitQuality(String profitQuality) {
		this.profitQuality = profitQuality;
	}

	public String getRigidLiabilityAnalysis() {
		return rigidLiabilityAnalysis;
	}

	public void setRigidLiabilityAnalysis(String rigidLiabilityAnalysis) {
		this.rigidLiabilityAnalysis = rigidLiabilityAnalysis;
	}

	public String getHiddenLiabilities() {
		return hiddenLiabilities;
	}

	public void setHiddenLiabilities(String hiddenLiabilities) {
		this.hiddenLiabilities = hiddenLiabilities;
	}

	public String getContingentLiabilities() {
		return contingentLiabilities;
	}

	public void setContingentLiabilities(String contingentLiabilities) {
		this.contingentLiabilities = contingentLiabilities;
	}

	public String getHistoricalRecordsAnalysis() {
		return historicalRecordsAnalysis;
	}

	public void setHistoricalRecordsAnalysis(String historicalRecordsAnalysis) {
		this.historicalRecordsAnalysis = historicalRecordsAnalysis;
	}

	public String getTurnoverRate() {
		return turnoverRate;
	}

	public void setTurnoverRate(String turnoverRate) {
		this.turnoverRate = turnoverRate;
	}

	public String getReceivableConcentration() {
		return receivableConcentration;
	}

	public void setReceivableConcentration(String receivableConcentration) {
		this.receivableConcentration = receivableConcentration;
	}

	public String getSurvivalScale() {
		return survivalScale;
	}

	public void setSurvivalScale(String survivalScale) {
		this.survivalScale = survivalScale;
	}

	public String getAdvanceFundingPressure() {
		return advanceFundingPressure;
	}

	public void setAdvanceFundingPressure(String advanceFundingPressure) {
		this.advanceFundingPressure = advanceFundingPressure;
	}

	public String getSurvivalPriceChanges() {
		return survivalPriceChanges;
	}

	public void setSurvivalPriceChanges(String survivalPriceChanges) {
		this.survivalPriceChanges = survivalPriceChanges;
	}

	public String getMobilityTest() {
		return mobilityTest;
	}

	public void setMobilityTest(String mobilityTest) {
		this.mobilityTest = mobilityTest;
	}

	public String getWhetherContractTransferred() {
		return whetherContractTransferred;
	}

	public void setWhetherContractTransferred(String whetherContractTransferred) {
		this.whetherContractTransferred = whetherContractTransferred;
	}

	public String getBusinessDisputeAgreement() {
		return businessDisputeAgreement;
	}

	public void setBusinessDisputeAgreement(String businessDisputeAgreement) {
		this.businessDisputeAgreement = businessDisputeAgreement;
	}

	public String getContractValidity() {
		return contractValidity;
	}

	public void setContractValidity(String contractValidity) {
		this.contractValidity = contractValidity;
	}

	public String getCntValuationMethod() {
		return cntValuationMethod;
	}

	public void setCntValuationMethod(String cntValuationMethod) {
		this.cntValuationMethod = cntValuationMethod;
	}

	public String getSettlementMethod() {
		return settlementMethod;
	}

	public void setSettlementMethod(String settlementMethod) {
		this.settlementMethod = settlementMethod;
	}

	public String getBilling() {
		return billing;
	}

	public void setBilling(String billing) {
		this.billing = billing;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getDelivery() {
		return delivery;
	}

	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}

	public String getReceipt() {
		return receipt;
	}

	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}

	public String getGodownEntry() {
		return godownEntry;
	}

	public void setGodownEntry(String godownEntry) {
		this.godownEntry = godownEntry;
	}

	public String getList() {
		return list;
	}

	public void setList(String list) {
		this.list = list;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getInvoiceCorrespondsContract() {
		return invoiceCorrespondsContract;
	}

	public void setInvoiceCorrespondsContract(String invoiceCorrespondsContract) {
		this.invoiceCorrespondsContract = invoiceCorrespondsContract;
	}

	public String getInvoiceBillContract() {
		return invoiceBillContract;
	}

	public void setInvoiceBillContract(String invoiceBillContract) {
		this.invoiceBillContract = invoiceBillContract;
	}

	public String getInvoiceCorrespondsSettlementMethod() {
		return invoiceCorrespondsSettlementMethod;
	}

	public void setInvoiceCorrespondsSettlementMethod(
			String invoiceCorrespondsSettlementMethod) {
		this.invoiceCorrespondsSettlementMethod = invoiceCorrespondsSettlementMethod;
	}

	public String getConfirmArProportionReceivable() {
		return confirmArProportionReceivable;
	}

	public void setConfirmArProportionReceivable(
			String confirmArProportionReceivable) {
		this.confirmArProportionReceivable = confirmArProportionReceivable;
	}

	public String getInformFactoring() {
		return informFactoring;
	}

	public void setInformFactoring(String informFactoring) {
		this.informFactoring = informFactoring;
	}

	public String getRecourse() {
		return recourse;
	}

	public void setRecourse(String recourse) {
		this.recourse = recourse;
	}

	public String getUnInformFactoring() {
		return unInformFactoring;
	}

	public void setUnInformFactoring(String unInformFactoring) {
		this.unInformFactoring = unInformFactoring;
	}

	public String getIndustryRiskAcceptanceAnalysis() {
		return industryRiskAcceptanceAnalysis;
	}

	public void setIndustryRiskAcceptanceAnalysis(
			String industryRiskAcceptanceAnalysis) {
		this.industryRiskAcceptanceAnalysis = industryRiskAcceptanceAnalysis;
	}

	public String getIntroductionOtherIncreaseCreditMethod() {
		return introductionOtherIncreaseCreditMethod;
	}

	public void setIntroductionOtherIncreaseCreditMethod(
			String introductionOtherIncreaseCreditMethod) {
		this.introductionOtherIncreaseCreditMethod = introductionOtherIncreaseCreditMethod;
	}

	public String getAssociatedRiskMatchingMeasures() {
		return associatedRiskMatchingMeasures;
	}

	public void setAssociatedRiskMatchingMeasures(
			String associatedRiskMatchingMeasures) {
		this.associatedRiskMatchingMeasures = associatedRiskMatchingMeasures;
	}

	public String getAssetLiabilityRatioHigh() {
		return assetLiabilityRatioHigh;
	}

	public void setAssetLiabilityRatioHigh(String assetLiabilityRatioHigh) {
		this.assetLiabilityRatioHigh = assetLiabilityRatioHigh;
	}

	public String getMortgageGuaranteeAnalysis() {
		return mortgageGuaranteeAnalysis;
	}

	public void setMortgageGuaranteeAnalysis(String mortgageGuaranteeAnalysis) {
		this.mortgageGuaranteeAnalysis = mortgageGuaranteeAnalysis;
	}

	public String getReditLine() {
		return reditLine;
	}

	public void setReditLine(String reditLine) {
		this.reditLine = reditLine;
	}

	public String getReditLineType() {
		return reditLineType;
	}

	public void setReditLineType(String reditLineType) {
		this.reditLineType = reditLineType;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getArFarmInRatio() {
		return arFarmInRatio;
	}

	public void setArFarmInRatio(String arFarmInRatio) {
		this.arFarmInRatio = arFarmInRatio;
	}

	public String getBusiDeadline() {
		return busiDeadline;
	}

	public void setBusiDeadline(String busiDeadline) {
		this.busiDeadline = busiDeadline;
	}

	public String getServiceFeeCollection() {
		return serviceFeeCollection;
	}

	public void setServiceFeeCollection(String serviceFeeCollection) {
		this.serviceFeeCollection = serviceFeeCollection;
	}

	public String getReviewConclusion() {
		return reviewConclusion;
	}

	public void setReviewConclusion(String reviewConclusion) {
		this.reviewConclusion = reviewConclusion;
	}
	
}
