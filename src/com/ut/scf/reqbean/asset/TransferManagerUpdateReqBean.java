package com.ut.scf.reqbean.asset;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;

/**
 * 
 * @author changxin
 *
 */
public class TransferManagerUpdateReqBean {
	private String recUid;
	
	/**
	 * 所属企业id
	 */
	private String corpId;
	/**
	 * 项目名字
	 */
	private String projectName;
	/**
	 * 关联企业名称
	 */
	private String relSaleCorpName;
	/**
	 * 关联合同编号
	 */
	
	private String contractNo; 
	/**
	 * 是否有追
	 */
	private Byte isRecourse;
	/**
	 * 保理类型（明保/暗保）
	 */
	private Byte factorType;
	/**
	 * 发起日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String startDate;
	/**
	 * 立项创建人
	 */
	private String projectUserId;
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
	 *是否转让 
	 */
	private Byte transfer;
	/**
	 * 任务人
	 */
	private String taskPerson;
	/**
	 * 单据操作人Id
	 */
	private String documentOperatorId;
	/**
	 * 转让单位
	 */
	private String transferUnit;
	/**
	 * 转让金额
	 */
	private String transferAmount;
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
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
	
	public String getRelSaleCorpName() {
		return relSaleCorpName;
	}
	public void setRelSaleCorpName(String relSaleCorpName) {
		this.relSaleCorpName = relSaleCorpName;
	}
	public String getDocumentOperatorId() {
		return documentOperatorId;
	}
	public void setDocumentOperatorId(String documentOperatorId) {
		this.documentOperatorId = documentOperatorId;
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
	public String getProjectUserId() {
		return projectUserId;
	}
	public void setProjectUserId(String projectUserId) {
		this.projectUserId = projectUserId;
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
	public Byte getTransfer() {
		return transfer;
	}
	public void setTransfer(Byte transfer) {
		this.transfer = transfer;
	}
	public String getTaskPerson() {
		return taskPerson;
	}
	public void setTaskPerson(String taskPerson) {
		this.taskPerson = taskPerson;
	}
	public String getTransferUnit() {
		return transferUnit;
	}
	public void setTransferUnit(String transferUnit) {
		this.transferUnit = transferUnit;
	}
	public String getTransferAmount() {
		return transferAmount;
	}
	public void setTransferAmount(String transferAmount) {
		this.transferAmount = transferAmount;
	}
	
	
}
