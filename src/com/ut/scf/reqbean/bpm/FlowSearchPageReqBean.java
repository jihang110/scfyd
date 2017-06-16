package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.PageReqBean;

public class FlowSearchPageReqBean extends PageReqBean {

	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 企业ID
	 */
	private String corpId;

	/**
	 * 项目名称
	 */
	private String projectName;
	
	/**
	 * 流程定义名称
	 */
	private String procInsName;
	
	/**
	 * 流程状态
	 */
	private String priState;

	/**
	 * 开始时间
	 */
	private String startTime;

	/**
	 * 结束时间
	 */
	private String endTime;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getProcInsName() {
		return procInsName;
	}

	public void setProcInsName(String procInsName) {
		this.procInsName = procInsName;
	}

	public String getPriState() {
		return priState;
	}

	public void setPriState(String priState) {
		this.priState = priState;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

}
