package com.ut.scf.reqbean.bpm;


/**
 * 
 * @author Yuancy
 *	流程终止参数
 */
public class ActFlowTerminateReqBean {
	/**
	 * 流程定义id
	 */
	private String processInstanceId;

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
}
