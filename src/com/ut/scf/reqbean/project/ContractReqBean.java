package com.ut.scf.reqbean.project;

import java.util.Date;

import com.ut.scf.reqbean.PageReqBean;

public class ContractReqBean extends PageReqBean {
	private String contractNo;
	private Date signDate;// 签约日期
	private String orderBatchId; // 订单编号
	private byte contractType; // 合同类型
	private byte productType; // 产品类型
	private Date contractValDate;// 合同生效日期
	private Date contractDueDate;// 合同到期日期
	private String fileInfo;// 附件信息
	private String corpName;// 核心企业名称
	private String corpOrgnNum;// 核心企业组织代码机构证
	private String supplierName;// 经销商名称
	private String supplierOrgnNum;// 经销商组织代码机构
	private String pmFileInfo;// 项目经理附件
	private String coreCorpId;
	private String agencyCorpId;
	private String remark;

	/**
	 * aciviti
	 * **/
	private String agree;
	private String advice;
	private String taskId;
	private String userId; // 用户
	private String activitiKey;

	public byte getContractType() {
		return contractType;
	}

	public void setContractType(byte contractType) {
		this.contractType = contractType;
	}

	public byte getProductType() {
		return productType;
	}

	public void setProductType(byte productType) {
		this.productType = productType;
	}

	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	public String getOrderBatchId() {
		return orderBatchId;
	}

	public void setOrderBatchId(String orderBatchId) {
		this.orderBatchId = orderBatchId;
	}

	public Date getSignDate() {
		return signDate;
	}

	public void setSignDate(Date signDate) {
		this.signDate = signDate;
	}

	public Date getContractValDate() {
		return contractValDate;
	}

	public void setContractValDate(Date contractValDate) {
		this.contractValDate = contractValDate;
	}

	public Date getContractDueDate() {
		return contractDueDate;
	}

	public void setContractDueDate(Date contractDueDate) {
		this.contractDueDate = contractDueDate;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	public String getCorpOrgnNum() {
		return corpOrgnNum;
	}

	public void setCorpOrgnNum(String corpOrgnNum) {
		this.corpOrgnNum = corpOrgnNum;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getSupplierOrgnNum() {
		return supplierOrgnNum;
	}

	public void setSupplierOrgnNum(String supplierOrgnNum) {
		this.supplierOrgnNum = supplierOrgnNum;
	}

	public String getFileInfo() {
		return fileInfo;
	}

	public void setFileInfo(String fileInfo) {
		this.fileInfo = fileInfo;
	}

	public String getPmFileInfo() {
		return pmFileInfo;
	}

	public void setPmFileInfo(String pmFileInfo) {
		this.pmFileInfo = pmFileInfo;
	}

	public String getAgree() {
		return agree;
	}

	public void setAgree(String agree) {
		this.agree = agree;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getActivitiKey() {
		return activitiKey;
	}

	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}

	public String getCoreCorpId() {
		return coreCorpId;
	}

	public void setCoreCorpId(String coreCorpId) {
		this.coreCorpId = coreCorpId;
	}

	public String getAgencyCorpId() {
		return agencyCorpId;
	}

	public void setAgencyCorpId(String agencyCorpId) {
		this.agencyCorpId = agencyCorpId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
