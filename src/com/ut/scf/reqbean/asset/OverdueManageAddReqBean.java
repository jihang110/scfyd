package com.ut.scf.reqbean.asset;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;


/**
 * @author jihang
 *
 */
public class OverdueManageAddReqBean extends BaseReqBean {
	/**
	 * 所属企业id
	 */
	private String corpId;
	/**
	 * 项目名字
	 */
	private String projectName;
	/**
	 * 关联合同编号
	 */
	private String contractNo;
	/**
	 * 关联企业名称
	 */
	private String relSaleCorpName;
	/**
	 * 是否有追
	 */
	private Byte isRecourse;
	/**
	 * 保理类型（明保/暗保）
	 */
	private Byte factorType;
	/**
	 * 创建人员名称
	 */
	private String createUserName;
	/**
	 * 发起日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String startDate;
	/**
	 *关联买方名称 
	 */
	private String buyerId;
	/**
	 * 关联卖方名称
	 */
	private String sellerId;
	/**
	 * 逾期单据
	 */
	private String overdueDocuments;
	/**
	 *是否坏账 
	 */
	private Byte isBadDebt;
	/**
	 * 任务人
	 */
	private String taskPerson;
	/**
	 * 单据操作人Id
	 */
	private String documentOperatorId;
	/**
	 * 催收日志
	 */
	private String urgedCollectionLog;
	/**
	 * 催收日报
	 */
	private String urgedCollectionDaily;
	/**
	 * 罚息减免
	 */
	private Double penaltyRelief;
	/**
	 * 贴息
	 */
	private Double discount;
	/**
	 * 状态
	 */
	private Byte status;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public Byte getIsRecourse() {
		return isRecourse;
	}
	public void setIsRecourse(Byte isRecourse) {
		this.isRecourse = isRecourse;
	}
	public Byte getFactorType() {
		return factorType;
	}
	public void setFactorType(Byte factorType) {
		this.factorType = factorType;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}
	public String getSellerId() {
		return sellerId;
	}
	public void setSellerId(String sellerId) {
		this.sellerId = sellerId;
	}
	public String getOverdueDocuments() {
		return overdueDocuments;
	}
	public void setOverdueDocuments(String overdueDocuments) {
		this.overdueDocuments = overdueDocuments;
	}
	public Byte getIsBadDebt() {
		return isBadDebt;
	}
	public void setIsBadDebt(Byte isBadDebt) {
		this.isBadDebt = isBadDebt;
	}
	public String getTaskPerson() {
		return taskPerson;
	}
	public void setTaskPerson(String taskPerson) {
		this.taskPerson = taskPerson;
	}
	public String getDocumentOperatorId() {
		return documentOperatorId;
	}
	public void setDocumentOperatorId(String documentOperatorId) {
		this.documentOperatorId = documentOperatorId;
	}
	public String getUrgedCollectionLog() {
		return urgedCollectionLog;
	}
	public void setUrgedCollectionLog(String urgedCollectionLog) {
		this.urgedCollectionLog = urgedCollectionLog;
	}
	public String getUrgedCollectionDaily() {
		return urgedCollectionDaily;
	}
	public void setUrgedCollectionDaily(String urgedCollectionDaily) {
		this.urgedCollectionDaily = urgedCollectionDaily;
	}
	public Double getPenaltyRelief() {
		return penaltyRelief;
	}
	public void setPenaltyRelief(Double penaltyRelief) {
		this.penaltyRelief = penaltyRelief;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getRelSaleCorpName() {
		return relSaleCorpName;
	}
	public void setRelSaleCorpName(String relSaleCorpName) {
		this.relSaleCorpName = relSaleCorpName;
	}
	
	
}
