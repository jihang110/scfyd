package com.ut.scf.respbean.sys.inner;

import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;

public class Dept {
	
	private int nodeId;
	
	private String deptId;

	private String deptName;

	private String corpId;

	private String parentId;

    private String deptType;

    private Integer staffNum;

    private String functions;

    private String orgStructurePath;

	private String contactPerson;

	private String contactPhone;

	private boolean childFlag;

	private String note;

	private List<Dept> subDeptList;

	public int getNodeId() {
		return nodeId;
	}

	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
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

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
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

	public boolean isChildFlag() {
		return childFlag;
	}

	public void setChildFlag(boolean childFlag) {
		this.childFlag = childFlag;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public List<Dept> getSubDeptList() {
		return subDeptList;
	}

	public void setSubDeptList(List<Dept> subDeptList) {
		this.subDeptList = subDeptList;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
