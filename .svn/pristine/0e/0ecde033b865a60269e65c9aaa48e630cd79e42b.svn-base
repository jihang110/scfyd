package com.ut.scf.core.util;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.scf.respbean.sys.inner.Dept;
import com.ut.scf.respbean.sys.inner.Menu;

/**
 * 业务工具类
 * 
 * @author sunll
 *
 */
public class ScfBizUtil {

	private static final Logger log = LoggerFactory
			.getLogger(ScfBizUtil.class);

	/**
	 * 菜单列表转化为菜单树
	 * 
	 * @param list
	 * @return
	 */
	public static List<Menu> menuListToTree(List<Map<String, Object>> list) {
		List<Menu> menuList = new ArrayList<>();
		if (list == null || list.isEmpty()) {
			log.warn("menu list is empty!");
			return menuList;
		}

		Map<String, List<Menu>> childMenus = new LinkedHashMap<>();

		for (Map<String, Object> map : list) {
			Menu menu = new Menu();
			BeanUtil.mapToBean(map, menu);
			if (StringUtils.isBlank(menu.getParentId())) {
				menuList.add(menu);
			} else {
				if (childMenus.containsKey(menu.getParentId())) {
					childMenus.get(menu.getParentId()).add(menu);
				} else {
					List<Menu> childMenuList = new ArrayList<>();
					childMenuList.add(menu);
					childMenus.put(menu.getParentId(), childMenuList);
				}

			}
		}
		
		// 如果没有顶级菜单，则返回空
		if (menuList == null || menuList.isEmpty()) {
			return menuList;
		}

		int nodeId = 0; // 初始化为0
		appendChildMenu(menuList, childMenus, nodeId);

		return menuList;
	}

	/**
	 * 递归得到菜单树
	 * 
	 * @param menuList
	 * @param childMenus
	 */
	private static int appendChildMenu(List<Menu> menuList,
			Map<String, List<Menu>> childMenus, int nodeId) {
		for (Menu menu : menuList) {
			menu.setNodeId(nodeId++);
			if (childMenus.containsKey(menu.getMenuId())) {
				List<Menu> subMenuList = childMenus.remove(menu.getMenuId());
				menu.setChildFlag(true);
				menu.setSubMenuList(subMenuList);
				nodeId = appendChildMenu(subMenuList, childMenus, nodeId);
			}
		}
		return nodeId;
	}

	/**
	 * 部门列表转化为部门树
	 * 
	 * @param list
	 * @return
	 */
	public static List<Dept> deptListToTree(List<Map<String, Object>> list) {
		List<Dept> deptList = new ArrayList<>();
		if (list == null || list.isEmpty()) {
			log.warn("dept list is empty!");
			return deptList;
		}

		Map<String, List<Dept>> childDepts = new LinkedHashMap<>();

		for (Map<String, Object> map : list) {
			Dept dept = new Dept();
			BeanUtil.mapToBean(map, dept);
			if (StringUtils.isBlank(dept.getParentId())) {
				deptList.add(dept);
			} else {
				if (childDepts.containsKey(dept.getParentId())) {
					childDepts.get(dept.getParentId()).add(dept);
				} else {
					List<Dept> childDeptList = new ArrayList<>();
					childDeptList.add(dept);
					childDepts.put(dept.getParentId(), childDeptList);
				}

			}
		}
		
		// 如果没有顶级部门，则返回空
		if (deptList == null || deptList.isEmpty()) {
			return deptList;
		}

		int nodeId = 0; // 初始化为0
		appendChildDept(deptList, childDepts, nodeId);

		return deptList;
	}

	/**
	 * 递归得到部门树
	 * 
	 * @param deptList
	 * @param childDepts
	 */
	private static int appendChildDept(List<Dept> deptList,
			Map<String, List<Dept>> childDepts, int nodeId) {
		for (Dept dept : deptList) {
			dept.setNodeId(nodeId++);
			if (childDepts.containsKey(dept.getDeptId())) {
				List<Dept> subDeptList = childDepts.remove(dept.getDeptId());
				dept.setChildFlag(true);
				dept.setSubDeptList(subDeptList);
				nodeId = appendChildDept(subDeptList, childDepts, nodeId);
			}
		}
		return nodeId;
	}
	
	/**
	 * 把list转化为sql使用的字符串，如('1','2','3')
	 * @param list
	 * @return
	 */
	public static String listToSQLStr(List<?> list) {
		if (list == null || list.isEmpty()) {
			return null;
		}
		
		StringBuffer sbStr = new StringBuffer("(");
		for (Object object : list) {
			sbStr.append("'" + object + "',");
		}
		
		
		return sbStr.substring(0, sbStr.length() - 1) + ")";
	}
	
}
