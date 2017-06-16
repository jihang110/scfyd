package com.ut.scf.pojo;

/**
 * 
 * @author jiangl
 *
 */
public class WorkItemListInfo {

	/**
	 * 流程实例ID
	 */
	private Long procInsId;
	/**
	 * 工作项id
	 */
	private Long workItemId;
	
	/**
	 * 名称
	 */
	private String name;
	
	/**
	 * 开始时间
	 */
	private String startDate;
	
	/**
	 * 结束时间
	 */
	private String endDate;
	
	/**
	 * 负责人
	 */
	private String user;

	/**
	 * 状态
	 */
	private String status;
	
	/**
	 * 意见
	 */
	private String advice;
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
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
