package com.ut.scf.reqbean.office;


import com.ut.scf.reqbean.PageReqBean;

public class InternalAnnouncementListReqBean extends PageReqBean {

	/**
	 * 所属企业id
	 */
	private String corpId;
	/**
	 * 标题
	 */
	private String title;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
}
