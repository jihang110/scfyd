package com.ut.scf.reqbean.sys;

import com.ut.scf.reqbean.BaseReqBean;

public class ClassNewsUpdateReqBean extends BaseReqBean {

	private String classNewsId;
	private Byte type;
	private String title;
	private Byte status;
	private String content;
	public String getClassNewsId() {
		return classNewsId;
	}
	public void setClassNewsId(String classNewsId) {
		this.classNewsId = classNewsId;
	}
	public Byte getType() {
		return type;
	}
	public void setType(Byte type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Byte getStatus() {
		return status;
	}
	public void setStatus(Byte status) {
		this.status = status;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	
}
