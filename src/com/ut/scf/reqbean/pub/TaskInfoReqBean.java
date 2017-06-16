package com.ut.scf.reqbean.pub;

import com.ut.scf.reqbean.BaseReqBean;

public class TaskInfoReqBean extends BaseReqBean {
	private String taskId;

	private String varName;

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getVarName() {
		return varName;
	}

	public void setVarName(String varName) {
		this.varName = varName;
	}
}
