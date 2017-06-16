package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.BaseReqBean;

public class AgencyFlowReqBean extends BaseReqBean {

	private String userId;
	
	private String activitiKey;
	
	private String note;
	
	private String agencyListInfo;
	
	private String agree;

	private String advice;
	
	private String histroyAdvice;
	
	private String taskId;
	
	private String procInstId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getActivitiKey() {
		return activitiKey;
	}

	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getAgencyListInfo() {
		return agencyListInfo;
	}

	public void setAgencyListInfo(String agencyListInfo) {
		this.agencyListInfo = agencyListInfo;
	}

	public String getAgree() {
		return agree;
	}

	public void setAgree(String agree) {
		this.agree = agree;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public String getHistroyAdvice() {
		return histroyAdvice;
	}

	public void setHistroyAdvice(String histroyAdvice) {
		this.histroyAdvice = histroyAdvice;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getProcInstId() {
		return procInstId;
	}

	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}
	
}
