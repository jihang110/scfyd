package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;

public class ProDetailReqBean extends BaseReqBean {

	/**
	 * 流程实例ID
	 */
	private Long procInsId;

	/**
	 * 工作项ID
	 */
	private Long workItemId;
	
	/**
	 * 步骤ID
	 */
	private String stepId;

	public Long getProcInsId() {
		return procInsId;
	}

	public void setProcInsId(Long procInsId) {
		this.procInsId = procInsId;
	}

	public Long getWorkItemId() {
		return workItemId;
	}

	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}

	public String getStepId() {
		return stepId;
	}

	public void setStepId(String stepId) {
		this.stepId = stepId;
	}

}
