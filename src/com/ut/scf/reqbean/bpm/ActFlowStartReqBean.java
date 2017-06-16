package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * 
 * @author Yuancy
 *	流程开始参数
 */
public class ActFlowStartReqBean extends BaseReqBean{
	/**
	 * 流程定义id
	 */
	private String processDefinitionId;

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	
}
