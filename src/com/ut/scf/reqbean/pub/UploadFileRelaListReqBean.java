package com.ut.scf.reqbean.pub;

import com.ut.scf.reqbean.PageReqBean;

public class UploadFileRelaListReqBean extends PageReqBean{
	private String corpId;
	private Byte sysType;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public Byte getSysType() {
		return sysType;
	}
	public void setSysType(Byte sysType) {
		this.sysType = sysType;
	}
	
}
