package com.ut.scf.reqbean.sys;

import java.util.Date;

import com.ut.scf.reqbean.PageReqBean;

public class ClassNewsListReqBean extends PageReqBean {

	private String classNewsId;
	private Byte type;
	private String createUserId;
	private Date createTime;
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
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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
