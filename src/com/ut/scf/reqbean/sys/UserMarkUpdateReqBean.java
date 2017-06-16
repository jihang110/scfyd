package com.ut.scf.reqbean.sys;



import com.ut.scf.reqbean.BaseReqBean;
/**
 * 
 * @author changxin
 *
 */
public class UserMarkUpdateReqBean extends BaseReqBean{
	private String recUid;
	private String markName;
	private String markDesc;
	private String note;
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	public String getMarkName() {
		return markName;
	}
	public void setMarkName(String markName) {
		this.markName = markName;
	}
	public String getMarkDesc() {
		return markDesc;
	}
	public void setMarkDesc(String markDesc) {
		this.markDesc = markDesc;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

	
}
