package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * 授信申请-项目评审
 * @author zhangyx
 *
 */
public class CreditAddReqBean extends BaseReqBean {
	
	/**
	 * 工作项id
	 */
	private Long workItemId;
	
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
	 * 立项人员名称
	 */
	private String proMembName;
	
	/**
	 * 立项发起日期
	 */
	private String proMakeDate;
	
	/**
	 * 关联买方名称
	 */
	private String relBuyName;
	
	/**
	 * 关联卖方名称
	 */
	private String relSaleName;
	
	/**
	 * 关联企业名称
	 */
	private String relSaleCorpName;
	
	/**
	 * 备注
	 */
	private String note;
	
	/**
	 * 营业执照注册地址
	 * Registered address of business license
	 */
	private String licenseRegAddr;
	
	/**
	 * 实际生产经营地址
	 * Actual production and business address
	 */
	private String relPrdBusiAddr;
	
	/**
	 * 访厂地址
	 */
	private String visiAddr;
	
	/**
	 * 三个地址是否一致
	 */
	private String isAddrSame;
	
	/**
	 * 地址不一样的原因
	 */
	private String unSameReason;
	
	/**
	 * 主要访谈对象1
	 */
	private String mainVisiPerson1;
	
	/**
	 * 职务
	 */
	private String position1;
	
	/**
	 * 电话
	 */
	private String phone1;
	
	/**
	 * 主要访谈对象2
	 */
	private String mainVisiPerson2;
	
	/**
	 * 职务
	 */
	private String position2;
	
	/**
	 * 电话
	 */
	private String phone2;
	
	/**
	 * 主要访谈对象3
	 */
	private String mainVisiPerson3;
	
	/**
	 * 职务
	 */
	private String position3;
	/**
	 * 电话
	 */
	private String phone3 ;
	
	/**
	 * 厂区（经营场所）处于：
	 */
	private String facAddrArea;
	/**
	 * 厂房/经营场所：
	 */
	private String facAddrType;
	/**
	 * 经营场所为：
	 */
	private String busiPlaceType;
	/**
	 * 经营场所是否为本次授信担保品：
	 */
	private String isFacGuarantee;
	/**
	 * 主要经营场所建造时间：
	 */
	private String mainFacBuildTime;
	/**
	 * 主要车间建造时间(适用制造业及自有)：
	 */
	private String mainWorkShopBuildTime;
	
	/**
	 * 车间/仓库安全生产配置：
	 */
	private String workShopSafeConfig;

	/**
	 * 存货存放：
	 */
	private String inventoryStorage;
	/**
	 * 仓库是否有存放较久的原材料或产品：
	 */
	private String hasLongTimeStoredGoods;
	/**
	 * 仓库进出库管理是否有出入库管理系统：
	 */
	private String hasOutStorageManagementSystem;
	/**
	 * 公司货物运输方式及比率：
	 */
	private String deliverMethod;
	/**
	 * 公司主要生产设备
	 */
	private String mainEquipment;
	/**
	 * 数量
	 */
	private String equNum;
	/**
	 * 公司产能利用：
	 * Production capacity Utilization
	 */
	private String prdCapUtil;
	/**
	 * 是否有任何机器闲置：
	 */
	private String hasAnyMachineIdle;
	/**
	 * 企业是否有配套设施（如排污设施、净化设施等）：
	 */
	private String hasSupportingFacilities;
	/**
	 * 企业主要能耗
	 */
	private String mainEnergyConsumption;
	/**
	 * 现场员工上岗人数
	 */
	private String postsStaffOnSite;
	
	/**
	 * 工人忙碌程度：
	 */
	private String isBusy;

	/**
	 * 每天开工班次：
	 */
	private String orderOfClasses;

	/**
	 * 生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%：
	 */
	private String productionStatus;

	/**
	 * 企业是否有专门的质检人员（适用制造业）：
	 */
	private String hasQC;

	/**
	 * 公司是否有自有研发人员：
	 * R & D personnel
	 */
	private String hasOwnRD;

	/**
	 * 是否有严格的质量保证体系：
	 */
	private String hasQAS;

	/**
	 * 机器的平均使用年限：
	 * Average useful life
	 */
	private String machineAvgUseLife;

	/**
	 * 公司主要产品或服务内容：
	 */
	private String mainPrdServCont;

	/**
	 * 业务来源
	 */
	private String busiSource;

	/**
	 * 比率
	 */
	private String ratio;

	/**
	 * 股东在过去或未来6个月是否有变动：
	 */
	private String hasShareHolderChangeInSixMonth;

	/**
	 * 公司资金回笼的主要方式(如有多选，请备注比率)：
	 */
	private String capitalReturnMethod;

	/**
	 * 公司最近12个月是否涉及诉讼或被执行：
	 */
	private String hasLawsuitRecentYear;

	/**
	 * 公司业务近期是否遇到了麻烦（包括但不限于重要人员/合约的流失、关键人员患重大疾病、应收帐款回收困难、债务纠纷等）：
	 */
	private String hasTrouble;

	/**
	 * 公司最近12个月内是否有拖欠员工工资或福利：
	 */
	private String hasArrearsOfWages;

	/**
	 * 公司最大采购商名称
	 */
	private String biggestBuyer;
	/**
	 * 比率
	 */
	private String ratioOfBiggestBuyer;
	/**
	 * 公司最大供应商名称
	 */
	private String biggestSupplier;
	/**
	 * 比率
	 */
	private String ratioOfBiggestSupplier;
	/**
	 * 公司是否涉及外销：
	 */
	private String hasExport;
	/**
	 * 比率
	 */
	private String ratioOfExport;
	/**
	 * 企业财报与税报差异：
	 */
	private String diffEarningsTax;
	/**
	 * 公司应收帐款平均帐期：
	 */
	private String arAvgPeriod;
	/**
	 * 公司应付帐款平均帐期：
	 */
	private String apAvgPeriod;
	/**
	 * 公司材料采购频率：
	 */
	private String materialStockFrequency;
	/**
	 * 产品生产周期（适用制造业）：
	 */
	private String productionCycle;
	/**
	 * 公司近3年平均毛利率趋势：
	 * nearly 3-year average gross margin trend
	 */
	private String nearly3yAvgGrossMarginTrend;
	/**
	 * 公司目前毛利率：
	 */
	private String nowGrossMargin;
	/**
	 * 企业生产工艺流程（生产企业）/交易流程（贸易企业）描述：
	 */
	private String processDisc;
	/**
	 * 客户融资真实需求（包括未来商业计划和资金安排）：
	 */
	private String relLoanDemand;
	/**
	 * 其他需说明的问题及总体评价：
	 */
	private String otherNoteEvaluation;
	/**
	 * 纳税开票系统查核
	 */
	private String taxInvSysChk;
	/**
	 * 银行流水系统查核
	 */
	private String bankWaterSysChk;
	/**
	 * 财务系统查核
	 */
	private String financeSysChk;
	/**
	 * 其他资料查核
	 */
	private String otherInfoChk;
	/**
	 * 备注_厂房/经营场所
	 */
	private String facAddrTypeOther;
	/**
	 * 备注_主要车间建造时间(适用制造业及自有)
	 */
	private String mainWorkShopBuildTimeOther;
	/**
	 * 备注_车间/仓库安全生产配置
	 */
	private String workShopSafeConfigOther;
	/**
	 * 备注_存货存放
	 */
	private String inventoryStorageOther;
	/**
	 * 备注_仓库是否有存放较久的原材料或产品
	 */
	private String hasLongTimeStoredGoodsOther;
	/**
	 * 备注_仓库进出库管理是出入库管理系统
	 */
	private String hasOutStorageManagementSystemOther;
	/**
	 * 备注_公司货物运输方式及比率
	 */
	private String deliverMethodOther;
	/**
	 * 备注_是否有任何机器闲置
	 */
	private String hasAnyMachineIdleOther;
	/**
	 * 备注_企业是否有配套设施（如排污设施、净化设施等）
	 */
	private String hasSupportingFacilitiesOther;
	/**
	 * 备注_企业主要能耗
	 */
	private String mainEnergyConsumptionOther;
	/**
	 * 备注_工人忙碌程度
	 */
	private String isBusyOther;
	/**
	 * 备注_每天开工班次
	 */
	private String orderOfClassesOther;
	/**
	 * 备注_生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%
	 */
	private String productionStatusOther;
	/**
	 * 备注_公司是否有自有研发人员
	 */
	private String hasOwnRDOther;
	/**
	 * 备注_是否有严格的质量保证体系
	 */
	private String hasQASOther;
	/**
	 * 备注_业务来源
	 */
	private String busiSourceOther;
	/**
	 * 备注_股东在过去或未来6个月是否有变动
	 */
	private String hasShareHolderChangeInSixMonthOther;
	/**
	 * 备注_公司最近12个月是否涉及诉讼或被执行
	 */
	private String hasLawsuitRecentYearOther;
	/**
	 * 备注_公司业务近期是否遇到了麻烦
	 */
	private String hasTroubleOther;
	/**
	 * 备注_公司最近12个月内是否有拖欠员工工资或福利
	 */
	private String hasArrearsOfWagesOther;
	
	public Long getWorkItemId() {
		return workItemId;
	}
	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}
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
	public String getProMembName() {
		return proMembName;
	}
	public void setProMembName(String proMembName) {
		this.proMembName = proMembName;
	}
	public String getProMakeDate() {
		return proMakeDate;
	}
	public void setProMakeDate(String proMakeDate) {
		this.proMakeDate = proMakeDate;
	}
	public String getRelBuyName() {
		return relBuyName;
	}
	public void setRelBuyName(String relBuyName) {
		this.relBuyName = relBuyName;
	}
	public String getRelSaleName() {
		return relSaleName;
	}
	public void setRelSaleName(String relSaleName) {
		this.relSaleName = relSaleName;
	}
	public String getRelSaleCorpName() {
		return relSaleCorpName;
	}
	public void setRelSaleCorpName(String relSaleCorpName) {
		this.relSaleCorpName = relSaleCorpName;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getLicenseRegAddr() {
		return licenseRegAddr;
	}
	public void setLicenseRegAddr(String licenseRegAddr) {
		this.licenseRegAddr = licenseRegAddr;
	}
	public String getRelPrdBusiAddr() {
		return relPrdBusiAddr;
	}
	public void setRelPrdBusiAddr(String relPrdBusiAddr) {
		this.relPrdBusiAddr = relPrdBusiAddr;
	}
	public String getVisiAddr() {
		return visiAddr;
	}
	public void setVisiAddr(String visiAddr) {
		this.visiAddr = visiAddr;
	}
	public String getIsAddrSame() {
		return isAddrSame;
	}
	public void setIsAddrSame(String isAddrSame) {
		this.isAddrSame = isAddrSame;
	}
	public String getUnSameReason() {
		return unSameReason;
	}
	public void setUnSameReason(String unSameReason) {
		this.unSameReason = unSameReason;
	}
	public String getMainVisiPerson1() {
		return mainVisiPerson1;
	}
	public void setMainVisiPerson1(String mainVisiPerson1) {
		this.mainVisiPerson1 = mainVisiPerson1;
	}
	public String getPosition1() {
		return position1;
	}
	public void setPosition1(String position1) {
		this.position1 = position1;
	}
	public String getPhone1() {
		return phone1;
	}
	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}
	public String getMainVisiPerson2() {
		return mainVisiPerson2;
	}
	public void setMainVisiPerson2(String mainVisiPerson2) {
		this.mainVisiPerson2 = mainVisiPerson2;
	}
	public String getPosition2() {
		return position2;
	}
	public void setPosition2(String position2) {
		this.position2 = position2;
	}
	public String getPhone2() {
		return phone2;
	}
	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}
	public String getMainVisiPerson3() {
		return mainVisiPerson3;
	}
	public void setMainVisiPerson3(String mainVisiPerson3) {
		this.mainVisiPerson3 = mainVisiPerson3;
	}
	public String getPosition3() {
		return position3;
	}
	public void setPosition3(String position3) {
		this.position3 = position3;
	}
	public String getPhone3() {
		return phone3;
	}
	public void setPhone3(String phone3) {
		this.phone3 = phone3;
	}
	public String getFacAddrArea() {
		return facAddrArea;
	}
	public void setFacAddrArea(String facAddrArea) {
		this.facAddrArea = facAddrArea;
	}
	public String getFacAddrType() {
		return facAddrType;
	}
	public void setFacAddrType(String facAddrType) {
		this.facAddrType = facAddrType;
	}
	public String getBusiPlaceType() {
		return busiPlaceType;
	}
	public void setBusiPlaceType(String busiPlaceType) {
		this.busiPlaceType = busiPlaceType;
	}
	public String getIsFacGuarantee() {
		return isFacGuarantee;
	}
	public void setIsFacGuarantee(String isFacGuarantee) {
		this.isFacGuarantee = isFacGuarantee;
	}
	public String getMainFacBuildTime() {
		return mainFacBuildTime;
	}
	public void setMainFacBuildTime(String mainFacBuildTime) {
		this.mainFacBuildTime = mainFacBuildTime;
	}
	public String getMainWorkShopBuildTime() {
		return mainWorkShopBuildTime;
	}
	public void setMainWorkShopBuildTime(String mainWorkShopBuildTime) {
		this.mainWorkShopBuildTime = mainWorkShopBuildTime;
	}
	public String getWorkShopSafeConfig() {
		return workShopSafeConfig;
	}
	public void setWorkShopSafeConfig(String workShopSafeConfig) {
		this.workShopSafeConfig = workShopSafeConfig;
	}
	public String getInventoryStorage() {
		return inventoryStorage;
	}
	public void setInventoryStorage(String inventoryStorage) {
		this.inventoryStorage = inventoryStorage;
	}
	public String getHasLongTimeStoredGoods() {
		return hasLongTimeStoredGoods;
	}
	public void setHasLongTimeStoredGoods(String hasLongTimeStoredGoods) {
		this.hasLongTimeStoredGoods = hasLongTimeStoredGoods;
	}
	public String getHasOutStorageManagementSystem() {
		return hasOutStorageManagementSystem;
	}
	public void setHasOutStorageManagementSystem(
			String hasOutStorageManagementSystem) {
		this.hasOutStorageManagementSystem = hasOutStorageManagementSystem;
	}
	public String getDeliverMethod() {
		return deliverMethod;
	}
	public void setDeliverMethod(String deliverMethod) {
		this.deliverMethod = deliverMethod;
	}
	public String getMainEquipment() {
		return mainEquipment;
	}
	public void setMainEquipment(String mainEquipment) {
		this.mainEquipment = mainEquipment;
	}
	public String getEquNum() {
		return equNum;
	}
	public void setEquNum(String equNum) {
		this.equNum = equNum;
	}
	public String getPrdCapUtil() {
		return prdCapUtil;
	}
	public void setPrdCapUtil(String prdCapUtil) {
		this.prdCapUtil = prdCapUtil;
	}
	public String getHasAnyMachineIdle() {
		return hasAnyMachineIdle;
	}
	public void setHasAnyMachineIdle(String hasAnyMachineIdle) {
		this.hasAnyMachineIdle = hasAnyMachineIdle;
	}
	public String getHasSupportingFacilities() {
		return hasSupportingFacilities;
	}
	public void setHasSupportingFacilities(String hasSupportingFacilities) {
		this.hasSupportingFacilities = hasSupportingFacilities;
	}
	public String getMainEnergyConsumption() {
		return mainEnergyConsumption;
	}
	public void setMainEnergyConsumption(String mainEnergyConsumption) {
		this.mainEnergyConsumption = mainEnergyConsumption;
	}
	public String getPostsStaffOnSite() {
		return postsStaffOnSite;
	}
	public void setPostsStaffOnSite(String postsStaffOnSite) {
		this.postsStaffOnSite = postsStaffOnSite;
	}
	public String getIsBusy() {
		return isBusy;
	}
	public void setIsBusy(String isBusy) {
		this.isBusy = isBusy;
	}
	public String getOrderOfClasses() {
		return orderOfClasses;
	}
	public void setOrderOfClasses(String orderOfClasses) {
		this.orderOfClasses = orderOfClasses;
	}
	public String getProductionStatus() {
		return productionStatus;
	}
	public void setProductionStatus(String productionStatus) {
		this.productionStatus = productionStatus;
	}
	public String getHasQC() {
		return hasQC;
	}
	public void setHasQC(String hasQC) {
		this.hasQC = hasQC;
	}
	public String getHasOwnRD() {
		return hasOwnRD;
	}
	public void setHasOwnRD(String hasOwnRD) {
		this.hasOwnRD = hasOwnRD;
	}
	public String getHasQAS() {
		return hasQAS;
	}
	public void setHasQAS(String hasQAS) {
		this.hasQAS = hasQAS;
	}
	public String getMachineAvgUseLife() {
		return machineAvgUseLife;
	}
	public void setMachineAvgUseLife(String machineAvgUseLife) {
		this.machineAvgUseLife = machineAvgUseLife;
	}
	public String getMainPrdServCont() {
		return mainPrdServCont;
	}
	public void setMainPrdServCont(String mainPrdServCont) {
		this.mainPrdServCont = mainPrdServCont;
	}
	public String getBusiSource() {
		return busiSource;
	}
	public void setBusiSource(String busiSource) {
		this.busiSource = busiSource;
	}
	public String getRatio() {
		return ratio;
	}
	public void setRatio(String ratio) {
		this.ratio = ratio;
	}
	public String getHasShareHolderChangeInSixMonth() {
		return hasShareHolderChangeInSixMonth;
	}
	public void setHasShareHolderChangeInSixMonth(
			String hasShareHolderChangeInSixMonth) {
		this.hasShareHolderChangeInSixMonth = hasShareHolderChangeInSixMonth;
	}
	public String getCapitalReturnMethod() {
		return capitalReturnMethod;
	}
	public void setCapitalReturnMethod(String capitalReturnMethod) {
		this.capitalReturnMethod = capitalReturnMethod;
	}
	public String getHasLawsuitRecentYear() {
		return hasLawsuitRecentYear;
	}
	public void setHasLawsuitRecentYear(String hasLawsuitRecentYear) {
		this.hasLawsuitRecentYear = hasLawsuitRecentYear;
	}
	public String getHasTrouble() {
		return hasTrouble;
	}
	public void setHasTrouble(String hasTrouble) {
		this.hasTrouble = hasTrouble;
	}
	public String getHasArrearsOfWages() {
		return hasArrearsOfWages;
	}
	public void setHasArrearsOfWages(String hasArrearsOfWages) {
		this.hasArrearsOfWages = hasArrearsOfWages;
	}
	public String getBiggestBuyer() {
		return biggestBuyer;
	}
	public void setBiggestBuyer(String biggestBuyer) {
		this.biggestBuyer = biggestBuyer;
	}
	public String getRatioOfBiggestBuyer() {
		return ratioOfBiggestBuyer;
	}
	public void setRatioOfBiggestBuyer(String ratioOfBiggestBuyer) {
		this.ratioOfBiggestBuyer = ratioOfBiggestBuyer;
	}
	public String getBiggestSupplier() {
		return biggestSupplier;
	}
	public void setBiggestSupplier(String biggestSupplier) {
		this.biggestSupplier = biggestSupplier;
	}
	public String getRatioOfBiggestSupplier() {
		return ratioOfBiggestSupplier;
	}
	public void setRatioOfBiggestSupplier(String ratioOfBiggestSupplier) {
		this.ratioOfBiggestSupplier = ratioOfBiggestSupplier;
	}
	public String getHasExport() {
		return hasExport;
	}
	public void setHasExport(String hasExport) {
		this.hasExport = hasExport;
	}
	public String getRatioOfExport() {
		return ratioOfExport;
	}
	public void setRatioOfExport(String ratioOfExport) {
		this.ratioOfExport = ratioOfExport;
	}
	public String getDiffEarningsTax() {
		return diffEarningsTax;
	}
	public void setDiffEarningsTax(String diffEarningsTax) {
		this.diffEarningsTax = diffEarningsTax;
	}
	public String getArAvgPeriod() {
		return arAvgPeriod;
	}
	public void setArAvgPeriod(String arAvgPeriod) {
		this.arAvgPeriod = arAvgPeriod;
	}
	public String getApAvgPeriod() {
		return apAvgPeriod;
	}
	public void setApAvgPeriod(String apAvgPeriod) {
		this.apAvgPeriod = apAvgPeriod;
	}
	public String getMaterialStockFrequency() {
		return materialStockFrequency;
	}
	public void setMaterialStockFrequency(String materialStockFrequency) {
		this.materialStockFrequency = materialStockFrequency;
	}
	public String getProductionCycle() {
		return productionCycle;
	}
	public void setProductionCycle(String productionCycle) {
		this.productionCycle = productionCycle;
	}
	public String getNearly3yAvgGrossMarginTrend() {
		return nearly3yAvgGrossMarginTrend;
	}
	public void setNearly3yAvgGrossMarginTrend(String nearly3yAvgGrossMarginTrend) {
		this.nearly3yAvgGrossMarginTrend = nearly3yAvgGrossMarginTrend;
	}
	public String getNowGrossMargin() {
		return nowGrossMargin;
	}
	public void setNowGrossMargin(String nowGrossMargin) {
		this.nowGrossMargin = nowGrossMargin;
	}
	public String getProcessDisc() {
		return processDisc;
	}
	public void setProcessDisc(String processDisc) {
		this.processDisc = processDisc;
	}
	public String getRelLoanDemand() {
		return relLoanDemand;
	}
	public void setRelLoanDemand(String relLoanDemand) {
		this.relLoanDemand = relLoanDemand;
	}
	public String getOtherNoteEvaluation() {
		return otherNoteEvaluation;
	}
	public void setOtherNoteEvaluation(String otherNoteEvaluation) {
		this.otherNoteEvaluation = otherNoteEvaluation;
	}
	public String getTaxInvSysChk() {
		return taxInvSysChk;
	}
	public void setTaxInvSysChk(String taxInvSysChk) {
		this.taxInvSysChk = taxInvSysChk;
	}
	public String getBankWaterSysChk() {
		return bankWaterSysChk;
	}
	public void setBankWaterSysChk(String bankWaterSysChk) {
		this.bankWaterSysChk = bankWaterSysChk;
	}
	public String getFinanceSysChk() {
		return financeSysChk;
	}
	public void setFinanceSysChk(String financeSysChk) {
		this.financeSysChk = financeSysChk;
	}
	public String getOtherInfoChk() {
		return otherInfoChk;
	}
	public void setOtherInfoChk(String otherInfoChk) {
		this.otherInfoChk = otherInfoChk;
	}
	public String getFacAddrTypeOther() {
		return facAddrTypeOther;
	}
	public void setFacAddrTypeOther(String facAddrTypeOther) {
		this.facAddrTypeOther = facAddrTypeOther;
	}
	public String getMainWorkShopBuildTimeOther() {
		return mainWorkShopBuildTimeOther;
	}
	public void setMainWorkShopBuildTimeOther(String mainWorkShopBuildTimeOther) {
		this.mainWorkShopBuildTimeOther = mainWorkShopBuildTimeOther;
	}
	public String getWorkShopSafeConfigOther() {
		return workShopSafeConfigOther;
	}
	public void setWorkShopSafeConfigOther(String workShopSafeConfigOther) {
		this.workShopSafeConfigOther = workShopSafeConfigOther;
	}
	public String getInventoryStorageOther() {
		return inventoryStorageOther;
	}
	public void setInventoryStorageOther(String inventoryStorageOther) {
		this.inventoryStorageOther = inventoryStorageOther;
	}
	public String getHasLongTimeStoredGoodsOther() {
		return hasLongTimeStoredGoodsOther;
	}
	public void setHasLongTimeStoredGoodsOther(String hasLongTimeStoredGoodsOther) {
		this.hasLongTimeStoredGoodsOther = hasLongTimeStoredGoodsOther;
	}
	public String getHasOutStorageManagementSystemOther() {
		return hasOutStorageManagementSystemOther;
	}
	public void setHasOutStorageManagementSystemOther(
			String hasOutStorageManagementSystemOther) {
		this.hasOutStorageManagementSystemOther = hasOutStorageManagementSystemOther;
	}
	public String getDeliverMethodOther() {
		return deliverMethodOther;
	}
	public void setDeliverMethodOther(String deliverMethodOther) {
		this.deliverMethodOther = deliverMethodOther;
	}
	public String getHasAnyMachineIdleOther() {
		return hasAnyMachineIdleOther;
	}
	public void setHasAnyMachineIdleOther(String hasAnyMachineIdleOther) {
		this.hasAnyMachineIdleOther = hasAnyMachineIdleOther;
	}
	public String getHasSupportingFacilitiesOther() {
		return hasSupportingFacilitiesOther;
	}
	public void setHasSupportingFacilitiesOther(String hasSupportingFacilitiesOther) {
		this.hasSupportingFacilitiesOther = hasSupportingFacilitiesOther;
	}
	public String getMainEnergyConsumptionOther() {
		return mainEnergyConsumptionOther;
	}
	public void setMainEnergyConsumptionOther(String mainEnergyConsumptionOther) {
		this.mainEnergyConsumptionOther = mainEnergyConsumptionOther;
	}
	public String getIsBusyOther() {
		return isBusyOther;
	}
	public void setIsBusyOther(String isBusyOther) {
		this.isBusyOther = isBusyOther;
	}
	public String getOrderOfClassesOther() {
		return orderOfClassesOther;
	}
	public void setOrderOfClassesOther(String orderOfClassesOther) {
		this.orderOfClassesOther = orderOfClassesOther;
	}
	public String getProductionStatusOther() {
		return productionStatusOther;
	}
	public void setProductionStatusOther(String productionStatusOther) {
		this.productionStatusOther = productionStatusOther;
	}
	public String getHasOwnRDOther() {
		return hasOwnRDOther;
	}
	public void setHasOwnRDOther(String hasOwnRDOther) {
		this.hasOwnRDOther = hasOwnRDOther;
	}
	public String getHasQASOther() {
		return hasQASOther;
	}
	public void setHasQASOther(String hasQASOther) {
		this.hasQASOther = hasQASOther;
	}
	public String getBusiSourceOther() {
		return busiSourceOther;
	}
	public void setBusiSourceOther(String busiSourceOther) {
		this.busiSourceOther = busiSourceOther;
	}
	public String getHasShareHolderChangeInSixMonthOther() {
		return hasShareHolderChangeInSixMonthOther;
	}
	public void setHasShareHolderChangeInSixMonthOther(
			String hasShareHolderChangeInSixMonthOther) {
		this.hasShareHolderChangeInSixMonthOther = hasShareHolderChangeInSixMonthOther;
	}
	public String getHasLawsuitRecentYearOther() {
		return hasLawsuitRecentYearOther;
	}
	public void setHasLawsuitRecentYearOther(String hasLawsuitRecentYearOther) {
		this.hasLawsuitRecentYearOther = hasLawsuitRecentYearOther;
	}
	public String getHasTroubleOther() {
		return hasTroubleOther;
	}
	public void setHasTroubleOther(String hasTroubleOther) {
		this.hasTroubleOther = hasTroubleOther;
	}
	public String getHasArrearsOfWagesOther() {
		return hasArrearsOfWagesOther;
	}
	public void setHasArrearsOfWagesOther(String hasArrearsOfWagesOther) {
		this.hasArrearsOfWagesOther = hasArrearsOfWagesOther;
	}
	
}
