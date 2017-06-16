package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.PageReqBean;

public class AgencyListReqBean extends PageReqBean{

	private String agencyName;
	private String agencyNum;
	private String maxCreditAmout;
	private String useAbleCrediAmt;
	private byte sysType;
	public byte getSysType() {
		return sysType;
	}
	public void setSysType(byte sysType) {
		this.sysType = sysType;
	}
	public String getAgencyName() {
		return agencyName;
	}
	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	public String getMaxCreditAmout() {
		return maxCreditAmout;
	}
	public void setMaxCreditAmout(String maxCreditAmout) {
		this.maxCreditAmout = maxCreditAmout;
	}
	public String getUseAbleCrediAmt() {
		return useAbleCrediAmt;
	}
	public void setUseAbleCrediAmt(String useAbleCrediAmt) {
		this.useAbleCrediAmt = useAbleCrediAmt;
	}
}
