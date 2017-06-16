package com.ut.scf.pojo;

/**
 * 
 * @author jiangl
 *
 */
public class FlowListInfo {

	/**
	 * 流程实例id
	 */
	private Long procInsId;
	
	/**
	 * 流程定义名称
	 */
	private String procInsName;
	
	/**
	 * 创建时间
	 */
	private String createDate;
	
	/**
	 * 结束时间
	 */
	private String endDate;
	
	/**
	 * 持续时间
	 */
	private String continueDate;
	
	/**
	 * 项目状态
	 */
	private String status;
	
	/**
	 * 项目名称
	 */
	private String proName;

	/**
	 * 流程状态图访问地址
	 */
	private String monitorUrl;
	
	public Long getProcInsId() {
		return procInsId;
	}

	public void setProcInsId(Long procInsId) {
		this.procInsId = procInsId;
	}

	public String getProcInsName() {
		return procInsName;
	}

	public void setProcInsName(String procInsName) {
		this.procInsName = procInsName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getContinueDate() {
		return continueDate;
	}

	public void setContinueDate(String continueDate) {
		this.continueDate = continueDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getMonitorUrl() {
		return monitorUrl;
	}

	public void setMonitorUrl(String monitorUrl) {
		this.monitorUrl = monitorUrl;
	}
	
}
