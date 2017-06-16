package com.ut.scf.reqbean.sys;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class DeptAddReqBean extends BaseReqBean {

	/**
	 * 公司Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	/**
	 * 部门名称
	 */
	@NotBlank(message = "{dept.deptName.notblank}")
	private String deptName;

	/**
	 * 父部门Id
	 */
	private String parentId;

    private String deptType;

    private Integer staffNum;

    private String functions;

    private String orgStructurePath;

	/**
	 * 联系人
	 */
	private String contactPerson;

	/**
	 * 联系电话
	 */
	private String contactPhone;

	/**
	 * 备注
	 */
	private String note;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getDeptType() {
		return deptType;
	}

	public void setDeptType(String deptType) {
		this.deptType = deptType;
	}

	public Integer getStaffNum() {
		return staffNum;
	}

	public void setStaffNum(Integer staffNum) {
		this.staffNum = staffNum;
	}

	public String getFunctions() {
		return functions;
	}

	public void setFunctions(String functions) {
		this.functions = functions;
	}

	public String getOrgStructurePath() {
		return orgStructurePath;
	}

	public void setOrgStructurePath(String orgStructurePath) {
		this.orgStructurePath = orgStructurePath;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

}
