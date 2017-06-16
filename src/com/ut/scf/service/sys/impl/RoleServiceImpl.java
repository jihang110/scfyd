package com.ut.scf.service.sys.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SysMenuMapper;
import com.ut.scf.dao.auto.SysRoleMapper;
import com.ut.scf.dao.auto.SysRoleMenuMapper;
import com.ut.scf.dao.auto.SysUserRoleMapper;
import com.ut.scf.dao.sys.IRoleDao;
import com.ut.scf.pojo.auto.CorpDept;
import com.ut.scf.pojo.auto.SysRole;
import com.ut.scf.pojo.auto.SysRoleExample;
import com.ut.scf.pojo.auto.SysRoleExample.Criteria;
import com.ut.scf.pojo.auto.SysUserRole;
import com.ut.scf.pojo.auto.SysUserRoleExample;
import com.ut.scf.reqbean.sys.RoleAddReqBean;
import com.ut.scf.reqbean.sys.RoleListReqBean;
import com.ut.scf.reqbean.sys.RoleUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IRoleService;

@Service("roleService")
public class RoleServiceImpl implements IRoleService {

	private static final Logger log = LoggerFactory
			.getLogger(RoleServiceImpl.class);

	@Resource
	private IRoleDao roleDao;
	
	@Resource
	private SysRoleMapper sysRoleMapper;
	
	@Resource
	private SysMenuMapper sysMenuMapper;
	
	@Resource
	private SysRoleMenuMapper sysRoleMenuMapper;
	
	@Resource
	private SysUserRoleMapper sysUserRoleMapper;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRoleList(RoleListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = roleDao.selectRoleList(paramMap,
					page);
			log.debug("role list : {}", list);
			log.debug("role list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = roleDao.selectRoleList(paramMap);
			log.debug("role list : {}", list);

			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addRole(RoleAddReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		SysRoleExample sysRoleExample = new SysRoleExample();
		Criteria criteria = sysRoleExample.createCriteria();
		criteria.andStatusEqualTo((byte) 1);
		//criteria.andRoleIdEqualTo((String) reqBean.getRoleId());
		
		criteria.andRoleNameEqualTo((String) reqBean.getRoleName());
		
		// 查询角色名是否重复
		if (sysRoleMapper.countByExample(sysRoleExample) > 0) {
			respBean.setResult(ErrorCodeEnum.ROLE_NAME_EXIST);
			return respBean;
		}

		// 插入角色信息
		String roleId = ScfUUID.generate();
		paramMap.put("roleId", roleId);//插入主键
		
		SysRole record =new SysRole();
		BeanUtil.mapToBean(paramMap, record);
		
		record.setCreateTime(new Date());
		record.setStatus((byte)1);
		
		Integer roleType = new Integer((int)paramMap.get("roleType"));;
		
		record.setRoleType(roleType.shortValue());
//		record.setRoleType((short)2);
		
		int insertRoleNum = sysRoleMapper.insert(record);
		
		log.debug("insertRoleNum : {}", insertRoleNum);
		if (insertRoleNum <= 0) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}

		// 添加角色菜单关系
		if (reqBean.getMenuIdList() != null
				|| !reqBean.getMenuIdList().isEmpty()) {
			List<Map<String, Object>> roleMenuList = new ArrayList<Map<String, Object>>();
			for (String menuId : reqBean.getMenuIdList()) {
				if (StringUtils.isNotBlank(menuId)) {
					Map<String, Object> roleMenuInfo = new HashMap<String, Object>();
					roleMenuInfo.put("recUid", ScfUUID.generate());
					roleMenuInfo.put("roleId", roleId);
					roleMenuInfo.put("menuId", menuId);
					roleMenuList.add(roleMenuInfo);
				}
			}

			if (!roleMenuList.isEmpty()) {
				int insertRoleMenuNum = roleDao.insertRoleMenu(roleMenuList);
				log.debug("insertRoleMenuNum : {}", insertRoleMenuNum);
				if (insertRoleMenuNum <= 0) {
					throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
			}
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteRole(String roleId, int roleTypeSession) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 不能删除系统管理员
		if (ScfBizConsts.ROLE_ID_ROOT.equals(roleId)) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}
		
		SysRole sysRole = sysRoleMapper.selectByPrimaryKey(roleId);
		if (sysRole == null) {
			respBean.setResult(ErrorCodeEnum.ROLE_NOT_EXIST);
			return respBean;
		}
		
		/*if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT && sysRole.getCorpId() == null) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}*/
		//角色下存在用户不可以删除
		Map<String, Object> paraMap = new HashMap<>();
		paraMap.put("roleId", roleId);
		int num = roleDao.countRoleUsed(paraMap);
		if (num > 0) {
			throw new BizException(ErrorCodeEnum.ROLEID_USERD);
		}
		
		// 更新角色status为0
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("roleId", roleId);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
		int updateNum = roleDao.updateRole(paramMap);
		log.debug("update role count {}", updateNum);
		if (updateNum <= 0) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		
		// 删除角色菜单关系
		int deleteRoleMenuNum = sysRoleMenuMapper.deleteByPrimaryKey(roleId);
		log.debug("deleteRoleMenuNum {}", deleteRoleMenuNum);
		if (updateNum < 0) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateRole(RoleUpdateReqBean reqBean, String roleIdSession) {
		BaseRespBean respBean = new BaseRespBean();
		SysRole sysRole = sysRoleMapper.selectByPrimaryKey(reqBean.getRoleId());
		if (sysRole == null) {
			respBean.setResult(ErrorCodeEnum.ROLE_NOT_EXIST);
			return respBean;
		}
		
//		if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT && sysRole.getCorpId() == null) {
//			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
//			return respBean;
//		}
		
		if (!ScfBizConsts.ROLE_ID_FACTOR_ADMIN.equals(roleIdSession)) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}
		
		// 查询角色名是否重复，需要排除自己的角色名
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		if (reqBean.getRoleName() != null && !reqBean.getRoleName().equals(sysRole.getRoleName())) {
			
			SysRoleExample sysRoleExample = new SysRoleExample();
			Criteria criteria = sysRoleExample.createCriteria();
			criteria.andStatusEqualTo((byte) 1);
			//criteria.andRoleIdEqualTo((String) reqBean.getRoleId());
			criteria.andRoleNameEqualTo((String) reqBean.getRoleName());
			
			paramMap.put("corpId", sysRole.getCorpId());
			if (sysRoleMapper.countByExample(sysRoleExample) > 0) {
				respBean.setResult(ErrorCodeEnum.ROLE_NAME_EXIST);
				return respBean;
			}
		}

		// 修改角色信息
		if (reqBean.getRoleName() != null || reqBean.getNote() != null) {
			int updateRoleNum = roleDao.updateRole(paramMap);
			log.debug("updateRoleNum : {}", updateRoleNum);
			if (updateRoleNum <= 0) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
		}
		
		// 修改角色菜单关系
		if (reqBean.getMenuIdList() != null) {
			//先删除
			int deleteRoleMenuNum = sysRoleMenuMapper.deleteByPrimaryKey(reqBean.getRoleId());
			log.debug("deleteRoleMenuNum : {}", deleteRoleMenuNum);
			if (deleteRoleMenuNum < 0) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
			
			//后添加
			if (!reqBean.getMenuIdList().isEmpty()) {
				List<Map<String, Object>> roleMenuList = new ArrayList<Map<String, Object>>();
				for (String menuId : reqBean.getMenuIdList()) {
					if (StringUtils.isNotBlank(menuId)) {
						Map<String, Object> roleMenuInfo = new HashMap<String, Object>();
						roleMenuInfo.put("recUid", ScfUUID.generate());
						roleMenuInfo.put("roleId", reqBean.getRoleId());
						roleMenuInfo.put("menuId", menuId);
						roleMenuList.add(roleMenuInfo);
					}
				}

				if (!roleMenuList.isEmpty()) {
					int insertRoleMenuNum = roleDao.insertRoleMenu(roleMenuList);
					log.debug("insertRoleMenuNum : {}", insertRoleMenuNum);
					if (insertRoleMenuNum <= 0) {
						throw new BizException(ErrorCodeEnum.ADD_FAILED);
					}
				}
			}
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRoleTypeList(int roleType) {
		List<Map<String, Object>> list = roleDao.selectRoleTypeList(roleType);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getAllRoleTypeList() {
		List<Map<String, Object>> list = roleDao.selectAllRoleTypeList();
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
