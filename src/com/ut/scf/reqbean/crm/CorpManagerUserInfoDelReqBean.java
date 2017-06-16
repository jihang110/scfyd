package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.BaseReqBean;

public class CorpManagerUserInfoDelReqBean extends BaseReqBean{
	private String corpManagerId;
	public String getCorpManagerId() {
		return corpManagerId;
	}
	public void setCorpManagerId(String corpManagerId) {
		this.corpManagerId = corpManagerId;
	}
}