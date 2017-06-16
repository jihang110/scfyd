package com.ut.scf.reqbean.sys;

import com.ut.scf.reqbean.BaseReqBean;

public class UserCorpJurAddReqBean  extends BaseReqBean {
	private String recUid;
	private String userId;
	private String corpId;
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	
}
