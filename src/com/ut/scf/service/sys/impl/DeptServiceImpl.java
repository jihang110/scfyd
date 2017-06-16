package com.ut.scf.service.sys.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
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
import com.ut.scf.dao.auto.CorpDeptMapper;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.dao.sys.IDeptDao;
import com.ut.scf.pojo.auto.CorpDept;
import com.ut.scf.pojo.auto.CorpDeptExample;
import com.ut.scf.pojo.auto.CorpDeptExample.Criteria;
import com.ut.scf.pojo.auto.SysUserExample;
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
	
	@Resource
	private CorpDeptMapper corpDeptMapper;
	
	@Resource
	private SysUserMapper sysUserMapper;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDeptTree(Map<String, Object> paramMap) {
		ListRespBean respBean = new ListRespBean();
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andStatusEqualTo((byte) 1);
		criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		corpDeptExample.setOrderByClause("create_time asc");
		List<CorpDept> list = corpDeptMapper.selectByExample(corpDeptExample);
		
		respBean.setDataList(ScfBizUtil.deptListToTree(list));
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDept(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 部门名称在同一企业下不能重复。
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andStatusEqualTo((byte) 1);
		criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		criteria.andDeptNameEqualTo((String) paramMap.get("deptName"));
		
		if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
			return respBean;
		}

		// 生成主键Id
		paramMap.put("deptId", ScfUUID.generate());
		
		CorpDept record = new CorpDept();
		BeanUtil.mapToBean(paramMap, record);
		record.setCreateTime(new Date());
		record.setStatus((byte)1);
		int insertNum = corpDeptMapper.insert(record);
		
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

		// 部门名称在同一企业下不能重复，需要排除自己的部门名
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andDeptIdEqualTo(reqBean.getDeptId());
		criteria.andStatusEqualTo((byte) 1);
		List<CorpDept> list = corpDeptMapper.selectByExample(corpDeptExample);
		
		if (CollectionUtils.isEmpty(list)) {
			respBean.setResult(ErrorCodeEnum.DEPT_NOT_EXIST);
			return respBean;
		}
		CorpDept dept = list.get(0);
		if (reqBean.getDeptName() != null && !reqBean.getDeptName().equals(dept.getDeptName())) {
			paramMap.put("corpId", dept.getCorpId());
			
			corpDeptExample.clear();
			criteria = corpDeptExample.createCriteria();
			criteria.andStatusEqualTo((byte) 1);
			criteria.andCorpIdEqualTo(dept.getCorpId());
			criteria.andDeptNameEqualTo(reqBean.getDeptName());
			
			if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
				respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
				return respBean;
			}
		}
		
		CorpDept record = new CorpDept();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = corpDeptMapper.updateByPrimaryKeySelective(record);
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
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criCorpDept = corpDeptExample.createCriteria();
		criCorpDept.andStatusEqualTo((byte) 1);
		criCorpDept.andParentIdEqualTo(deptId);
		if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_DEPT);
			return respBean;
		}

		// 部门里有员工，不能删除。
		SysUserExample sysUserExample = new SysUserExample();
		com.ut.scf.pojo.auto.SysUserExample.Criteria criSysUser = sysUserExample.createCriteria();
		criSysUser.andStatusEqualTo((byte) 1);
		criSysUser.andDeptIdEqualTo(deptId);
		if (sysUserMapper.countByExample(sysUserExample) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_HAS_USER);
			return respBean;
		}
		
		CorpDept record = new CorpDept();
		record.setDeptId(deptId);
		record.setStatus((byte) ScfBizConsts.STATUS_DELETE);
		int updateNum = corpDeptMapper.updateByPrimaryKeySelective(record);
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
