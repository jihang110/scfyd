package com.ut.scf.reqbean.bpm;


import com.ut.scf.reqbean.BaseReqBean;

public class CheckReqBean extends BaseReqBean {

	/**
	 * 流程实例ID
	 */
	private Long procInsId;
	
	/**
	 * 工作项ID
	 */
	private Long workItemId;
	
	/**
	 * 是否同意(0--不同意,1--同意)
	 */
	private String agreeFlg;
	
	/**
	 * 项目意见
	 */
	private String proAdvice;
	
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

	public String getAgreeFlg() {
		return agreeFlg;
	}

	public void setAgreeFlg(String agreeFlg) {
		this.agreeFlg = agreeFlg;
	}

	public String getProAdvice() {
		return proAdvice;
	}

	public void setProAdvice(String proAdvice) {
		this.proAdvice = proAdvice;
	}

	public String getStepId() {
		return stepId;
	}

	public void setStepId(String stepId) {
		this.stepId = stepId;
	}
	
}
