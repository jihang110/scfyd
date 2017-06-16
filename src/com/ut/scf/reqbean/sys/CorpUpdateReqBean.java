package com.ut.scf.reqbean.sys;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class CorpUpdateReqBean extends BaseReqBean {

	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;
	private String corpName;
    private String corpType;
    private int sysType;
    private Byte isCountry;
    private String legalPerson;
    private String controlPerson;
    private Date regDate;
    private String logoUrl;
    private BigDecimal realPayCap;
    private BigDecimal regCap;
    private String industry;
    private String regAddress;
    private String officeAddress;
    private String specNatural;
    private String busiScope;
    private String historyEvc;
    private String relaCorpId;
    private BigDecimal staffNum;
    private String fixedPhone;
    private String note;
    private String ccy;
    private String loanCardNo;
    private String nTaxReg;
    private String lTaxReg;
    
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
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
	public int getSysType() {
		return sysType;
	}
	public void setSysType(int sysType) {
		this.sysType = sysType;
	}
	public Byte getIsCountry() {
		return isCountry;
	}
	public void setIsCountry(Byte isCountry) {
		this.isCountry = isCountry;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public String getControlPerson() {
		return controlPerson;
	}
	public void setControlPerson(String controlPerson) {
		this.controlPerson = controlPerson;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getLogoUrl() {
		return logoUrl;
	}
	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	public BigDecimal getRealPayCap() {
		return realPayCap;
	}
	public void setRealPayCap(BigDecimal realPayCap) {
		this.realPayCap = realPayCap;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getRegAddress() {
		return regAddress;
	}
	public void setRegAddress(String regAddress) {
		this.regAddress = regAddress;
	}
	public String getOfficeAddress() {
		return officeAddress;
	}
	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}
	public String getSpecNatural() {
		return specNatural;
	}
	public void setSpecNatural(String specNatural) {
		this.specNatural = specNatural;
	}
	public String getBusiScope() {
		return busiScope;
	}
	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}
	public String getHistoryEvc() {
		return historyEvc;
	}
	public void setHistoryEvc(String historyEvc) {
		this.historyEvc = historyEvc;
	}
	public String getRelaCorpId() {
		return relaCorpId;
	}
	public void setRelaCorpId(String relaCorpId) {
		this.relaCorpId = relaCorpId;
	}
	public BigDecimal getStaffNum() {
		return staffNum;
	}
	public void setStaffNum(BigDecimal staffNum) {
		this.staffNum = staffNum;
	}
	public String getFixedPhone() {
		return fixedPhone;
	}
	public void setFixedPhone(String fixedPhone) {
		this.fixedPhone = fixedPhone;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getCcy() {
		return ccy;
	}
	public void setCcy(String ccy) {
		this.ccy = ccy;
	}
	public String getLoanCardNo() {
		return loanCardNo;
	}
	public void setLoanCardNo(String loanCardNo) {
		this.loanCardNo = loanCardNo;
	}
	public BigDecimal getRegCap() {
		return regCap;
	}
	public void setRegCap(BigDecimal regCap) {
		this.regCap = regCap;
	}
	public String getNTaxReg() {
		return nTaxReg;
	}
	public void setNTaxReg(String nTaxReg) {
		this.nTaxReg = nTaxReg;
	}
	public String getLTaxReg() {
		return lTaxReg;
	}
	public void setLTaxReg(String lTaxReg) {
		this.lTaxReg = lTaxReg;
	}

}
