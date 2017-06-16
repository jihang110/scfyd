package com.ut.scf.reqbean.sys;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class MenuAddReqBean extends BaseReqBean {

	/**
	 * 菜单名称
	 */
	@NotBlank(message = "{menu.menuName.notblank}")
	private String menuName;
	
	private Byte menuLevel = 1;
	
	private String parentId;
	
	private String menuPath;
	
	private Byte menuOrder = 1;
	
	private String note;

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Byte getMenuLevel() {
		return menuLevel;
	}

	public void setMenuLevel(Byte menuLevel) {
		this.menuLevel = menuLevel;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getMenuPath() {
		return menuPath;
	}

	public void setMenuPath(String menuPath) {
		this.menuPath = menuPath;
	}

	public Byte getMenuOrder() {
		return menuOrder;
	}

	public void setMenuOrder(Byte menuOrder) {
		this.menuOrder = menuOrder;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

}
