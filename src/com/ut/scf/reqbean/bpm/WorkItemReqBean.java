package com.ut.scf.reqbean.bpm;


import com.ut.scf.reqbean.PageReqBean;

public class WorkItemReqBean extends PageReqBean {

	private Long workItemId;
	private Long procInsId;
	private String transferUser;
	private String projectName;
	
	public Long getWorkItemId() {
		return workItemId;
	}

	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}

	public Long getProcInsId() {
		return procInsId;
	}

	public void setProcInsId(Long procInsId) {
		this.procInsId = procInsId;
	}

	public String getTransferUser() {
		return transferUser;
	}

	public void setTransferUser(String transferUser) {
		this.transferUser = transferUser;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

}
