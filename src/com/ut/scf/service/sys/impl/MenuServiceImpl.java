package com.ut.scf.service.sys.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SysMenuMapper;
import com.ut.scf.dao.sys.IMenuDao;
import com.ut.scf.pojo.auto.SysMenu;
import com.ut.scf.pojo.auto.SysMenuExample;
import com.ut.scf.reqbean.sys.MenuListReqBean;
import com.ut.scf.reqbean.sys.MenuMoveReqBean;
import com.ut.scf.reqbean.sys.MenuTreeReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.sys.IMenuService;

@Service("menuService")
public class MenuServiceImpl implements IMenuService {

	private static final Logger log = LoggerFactory
			.getLogger(MenuServiceImpl.class);

	@Resource
	private IMenuDao menuDao;
	
	@Resource
	private SysMenuMapper sysMenuMapper;
	
	@Transactional(readOnly = true)
	public BaseRespBean getMenuTree(MenuTreeReqBean reqBean) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> list = null;
		
		// 系统管理员角色和保理商管理员可以查询整个菜单树，其他角色只能查询配置的菜单树。
		if ((ScfBizConsts.ROLE_ID_ROOT.equals(reqBean.getRoleId()) || ScfBizConsts.ROLE_ID_FACTOR_ADMIN.equals(reqBean.getRoleId()))
				&& reqBean.getIsRelation() == 0) {
	/*		SysMenuExample sme = new SysMenuExample();
			Criteria criteria = sme.createCriteria();
			criteria.andStatusEqualTo((byte) 1);
			sme.setOrderByClause("menu_level");
			sme.setOrderByClause("menu_order");
			list = sysMenuMapper.selectByExample(sme);*/
			list = menuDao.selectMenuList();
			
		} else {
			list = menuDao.menuListByRoleId(reqBean.getRoleId());
		}
		respBean.setDataList(ScfBizUtil.menuListToTree(list));

		return respBean;
	}

	@Transactional(readOnly = true)
	public BaseRespBean getMenuList(MenuListReqBean reqBean) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> list = menuDao.menuListByRoleId(reqBean.getRoleId());
		respBean.setDataList(list);

		return respBean;
	}

	/**
	 * 添加到菜单sys_menu表
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addMenu(SysMenu record) {
		BaseRespBean respBean = new BaseRespBean();
		
		/*
		 * 查询菜单名字是否重复
		 */
		SysMenuExample sme = new SysMenuExample();
		sme.or().andStatusEqualTo((byte) 1).andMenuNameEqualTo(record.getMenuName());
		if (sysMenuMapper.countByExample(sme) > 0) {
			respBean.setResult(ErrorCodeEnum.MENU_NAME_EXIST);
			return respBean;
		}
		record.setMenuId(ScfUUID.generate());
		record.setStatus((byte) ScfBizConsts.STATUS_NORMAL);
		record.setCreateTime(new Date());
		int insertMenuNum = sysMenuMapper.insert(record);
		log.debug("insertMenuNum : {}", insertMenuNum);
		
		if (insertMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		
		return respBean;
	}

	/**
	 * 删除菜单
	 */
	@Override
	public BaseRespBean deleteMenu(String menuId) {
		BaseRespBean respBean = new BaseRespBean();

		// 有子菜单，父菜单是不能删除的。
		if (menuDao.countMenuByParentId(menuId) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_MENU);
			return respBean;
		}

	/*	Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("menuId", menuId);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);*/
		SysMenu record = new SysMenu();
		record.setMenuId(menuId);
		record.setStatus((byte) ScfBizConsts.STATUS_DELETE);
		int updateNum = sysMenuMapper.updateByPrimaryKeySelective(record);
		log.debug("update menu num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	/*
	 * 修改菜单信息
	 */
	@Override
	public BaseRespBean updateMenu(SysMenu record) {
		
		BaseRespBean respBean = new BaseRespBean();
		
		/*
		 * 查询菜单名字是否重复
		 */
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("menuName", record.getMenuName());
		paramMap.put("menuId", record.getMenuId());
		if (menuDao.countByMenuName(paramMap) > 0) {
			respBean.setResultNote("菜单名称已存在");
			return respBean;
		}
		
		int updateMenuNum = sysMenuMapper.updateByPrimaryKeySelective(record);
		log.debug("updateMenuNum : {}", updateMenuNum);

		if (updateMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		
		return respBean;
	}
	
	/* 
	 * 移动菜单信息
	 */
	@Override
	public BaseRespBean updateMenuByMove(List<MenuMoveReqBean> reqBean) {
		int updateMenuNum = menuDao.updateMenuByMove(reqBean);
		log.debug("updateMenuNum : {}", updateMenuNum);
		
		BaseRespBean respBean = new BaseRespBean();
		if (updateMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		
		return respBean;
	}
}
