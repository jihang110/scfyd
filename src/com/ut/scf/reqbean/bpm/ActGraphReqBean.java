package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;

/**
 * @author zyx
 *	流程图请求参数
 */
public class ActGraphReqBean extends BaseReqBean{
	
	/**
	 * 流程定义id
	 */
	private String processDefinitionId;
	
	/**
	 * 流程实例id
	 */
	private String processInstanceId;
	
	/**
	 * 任务id
	 */
	private String taskId;

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	
}
