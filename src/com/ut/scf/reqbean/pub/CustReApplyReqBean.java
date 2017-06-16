package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author jihang
 *	流程再申请
 */
public class CustReApplyReqBean {
	private String corpName;
	private String corpType;
	private String agencyNum;
	private String orgnNum;
	private Short sysType;
	private BigDecimal maxCreditAmount;
	private String legalPerson;
	private Integer regCap;
	private String officeAddress;
	private String fixedPhone;
	private String contactInfo;
	private String userId;
	private String taskId;
	private String corpId;
	private String isEdit;
	private List<?> shareInfoList;
	private List<?> attachInfoList;
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	public String getOrgnNum() {
		return orgnNum;
	}
	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}
	public Short getSysType() {
		return sysType;
	}
	public void setSysType(Short sysType) {
		this.sysType = sysType;
	}
	public BigDecimal getMaxCreditAmount() {
		return maxCreditAmount;
	}
	public void setMaxCreditAmount(BigDecimal maxCreditAmount) {
		this.maxCreditAmount = maxCreditAmount;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public Integer getRegCap() {
		return regCap;
	}
	public void setRegCap(Integer regCap) {
		this.regCap = regCap;
	}
	public String getOfficeAddress() {
		return officeAddress;
	}
	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}
	public String getFixedPhone() {
		return fixedPhone;
	}
	public void setFixedPhone(String fixedPhone) {
		this.fixedPhone = fixedPhone;
	}
	public String getContactInfo() {
		return contactInfo;
	}
	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public List<?> getShareInfoList() {
		return shareInfoList;
	}
	public void setShareInfoList(List<?> shareInfoList) {
		this.shareInfoList = shareInfoList;
	}
	public List<?> getAttachInfoList() {
		return attachInfoList;
	}
	public void setAttachInfoList(List<?> attachInfoList) {
		this.attachInfoList = attachInfoList;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getIsEdit() {
		return isEdit;
	}
	public void setIsEdit(String isEdit) {
		this.isEdit = isEdit;
	}
	
}
