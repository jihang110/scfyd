package com.ut.scf.reqbean.sys;


import java.math.BigDecimal;

import com.ut.scf.reqbean.PageReqBean;

public class CorpListReqBean extends PageReqBean {

	/**
	 * 公司Id
	 */
	private String corpId;

	/**
	 * 公司名称
	 */
	private String corpName;
	private String legalPerson;
	private String controlPerson;
	private String relaCorpId;
	private BigDecimal realPayCap;
	private String sysType;
	private String userId;
	private String isLogo = "N";
	private String corpNameIsAll;
	private String orgnNum;
	
	public String getOrgnNum() {
		return orgnNum;
	}

	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}

	public String getIsLogo() {
		return isLogo;
	}

	public void setIsLogo(String isLogo) {
		this.isLogo = isLogo;
	}

	/**
	 * 是否分页，0：否，1：是，默认为0.
	 */
	private Integer isPage = 0;
	
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

	public String getSysType() {
		return sysType;
	}

	public void setSysType(String sysType) {
		this.sysType = sysType;
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

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

	public String getRelaCorpId() {
		return relaCorpId;
	}

	public void setRelaCorpId(String relaCorpId) {
		this.relaCorpId = relaCorpId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCorpNameIsAll() {
		return corpNameIsAll;
	}

	public void setCorpNameIsAll(String corpNameIsAll) {
		this.corpNameIsAll = corpNameIsAll;
	}

	public BigDecimal getRealPayCap() {
		return realPayCap;
	}

	public void setRealPayCap(BigDecimal realPayCap) {
		this.realPayCap = realPayCap;
	}
	
}
