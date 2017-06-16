package com.ut.scf.reqbean.sys;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

public class RoleAddReqBean {
	
	/**
	 * 角色名称
	 */
	@NotBlank(message = "{role.roleName.notblank}")
	private String roleName;
	
	/**
	 * 角色类型，关联表sys_type
	 */
	@NotNull(message = "{role.roleType.notnull}")
	private Integer roleType;
	
	/**
	 * 所属企业Id
	 */
	private String corpId;
	
	/**
	 * 备注
	 */
	private String note;
	
	/**
	 * 添加的菜单列表
	 */
	private List<String> menuIdList;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public List<String> getMenuIdList() {
		return menuIdList;
	}

	public void setMenuIdList(List<String> menuIdList) {
		this.menuIdList = menuIdList;
	}

}
