package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.reqbean.sys.MenuMoveReqBean;

public interface IMenuDao {

	List<Map<String, Object>> menuListByRoleId(String roleId);

	List<Map<String, Object>> selectMenuList();

	int insertMenu(Map<String, Object> paramMap);

	int updateMenu(Map<String, Object> paramMap);
	
	int countMenuByParentId(String parentId);
	
	int countMenuByName(Map<String, Object> paramMap);

	int updateMenuByMove(List<MenuMoveReqBean> list);
	
	int countByMenuName(Map<String, Object> paramMap);
}
