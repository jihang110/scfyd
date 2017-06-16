package com.ut.scf.respbean.sys;

import com.ut.scf.respbean.BaseRespBean;

public class ClassNewsDetailRespBean extends BaseRespBean {
	private String classNewsId;
	private String title;
	private String content;
	private Integer type;
	public String getClassNewsId() {
		return classNewsId;
	}
	public void setClassNewsId(String classNewsId) {
		this.classNewsId = classNewsId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	
}
