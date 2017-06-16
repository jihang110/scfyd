package com.ut.scf.respbean.bpm;

import com.ut.scf.respbean.ListRespBean;

public class ProDetailRespBean extends ListRespBean {

	/**
	 * 流程实例ID
	 */
	private Long procInsId;
	/**
	 * 工作项ID
	 */
	private Long workItemId;
	
	/**
	 * 经办可否flg(0--查看,1--经办)
	 */
	private int operateFlg;
	
	/**
	 * 步骤ID
	 */
	private String stepId;
	
	public Long getWorkItemId() {
		return workItemId;
	}

	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}

	public int getOperateFlg() {
		return operateFlg;
	}

	public void setOperateFlg(int operateFlg) {
		this.operateFlg = operateFlg;
	}

	public String getStepId() {
		return stepId;
	}

	public void setStepId(String stepId) {
		this.stepId = stepId;
	}

	public Long getProcInsId() {
		return procInsId;
	}

	public void setProcInsId(Long procInsId) {
		this.procInsId = procInsId;
	}
	
}
