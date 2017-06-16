package com.ut.scf.reqbean.sys;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.PageReqBean;

public class DeptListReqBean extends PageReqBean {

	/**
	 * 公司Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	/**
	 * 部门Id
	 */
	private String deptId;
	private String deptName;
	private String parentName;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

}
