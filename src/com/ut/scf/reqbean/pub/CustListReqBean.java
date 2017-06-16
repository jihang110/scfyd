package com.ut.scf.reqbean.pub;

import com.ut.scf.reqbean.PageReqBean;

/**
 * @author jihang
 *
 */
public class CustListReqBean  extends PageReqBean{
	private String corpId;
	/**
	 * 企业名称
	 */
	private String corpName;
	/**
	 * 法定人代表
	 */
	private String legalPerson;
	/**
	 * 客户类型
	 */
	private Byte sysType;
	/**
	 * 企业类型
	 */
	private String corpType;
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public Byte getSysType() {
		return sysType;
	}
	public void setSysType(Byte sysType) {
		this.sysType = sysType;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	} 
	
}
