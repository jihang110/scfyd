package com.ut.scf.service.sys;

import java.util.List;

import com.ut.scf.pojo.auto.SysMenu;
import com.ut.scf.reqbean.sys.MenuListReqBean;
import com.ut.scf.reqbean.sys.MenuMoveReqBean;
import com.ut.scf.reqbean.sys.MenuTreeReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IMenuService {

	public BaseRespBean getMenuTree(MenuTreeReqBean reqBean);

	public BaseRespBean addMenu(SysMenu record);

	public BaseRespBean deleteMenu(String menuId);

	public BaseRespBean updateMenu(SysMenu record);

	public BaseRespBean getMenuList(MenuListReqBean reqBean);

	public BaseRespBean updateMenuByMove(List<MenuMoveReqBean> reqBean);
}
