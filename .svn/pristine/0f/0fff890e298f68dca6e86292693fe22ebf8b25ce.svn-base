package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.IDeptDao;
import com.ut.scf.pojo.CorpDept;
import com.ut.scf.reqbean.sys.DeptUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IDeptService;

/**
 * 部门相关service类
 * 
 * @author sunll
 *
 */
@Service("deptService")
public class DeptServiceImpl implements IDeptService {

	private static final Logger log = LoggerFactory
			.getLogger(DeptServiceImpl.class);

	@Resource
	private IDeptDao deptDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDeptTree(Map<String, Object> paramMap) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> list = deptDao
				.getDeptList(paramMap);
		respBean.setDataList(ScfBizUtil.deptListToTree(list));
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDept(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 部门名称在同一企业下不能重复。
		if (deptDao.countDeptByName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
			return respBean;
		}

		// 生成主键Id
		paramMap.put("deptId", ScfUUID.generate());
		int insertNum = deptDao.insertDept(paramMap);
		log.debug("insert dept num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDept(DeptUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		// 部门名称在同一企业下不能重复。，需要排除自己的部门名
		CorpDept dept = deptDao.queryDeptById(reqBean.getDeptId());
		if (dept == null)
		{
			respBean.setResult(ErrorCodeEnum.DEPT_NOT_EXIST);
			return respBean;
		}
		if (reqBean.getDeptName() != null && !reqBean.getDeptName().equals(dept.getDeptName())) {
			paramMap.put("corpId", dept.getCorpId());
			
			if (deptDao.countDeptByName(paramMap) > 0) {
				respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
				return respBean;
			}
		}

		int updateNum = deptDao.updateDept(paramMap);
		log.debug("update dept num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteDept(String deptId) {
		BaseRespBean respBean = new BaseRespBean();

		// 有子部门，父部门是不能删除的。
		if (deptDao.countDeptByParentId(deptId) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_DEPT);
			return respBean;
		}

		// 部门里有员工，不能删除。
		if (deptDao.countUserByDeptId(deptId) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_HAS_USER);
			return respBean;
		}
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("deptId", deptId);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
		int updateNum = deptDao.updateDept(paramMap);
		log.debug("update dept num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDeptList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = deptDao.getDeptPageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

}
