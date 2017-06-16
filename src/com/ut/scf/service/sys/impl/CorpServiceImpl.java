package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.dao.sys.IDeptDao;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.reqbean.sys.CorpAddReqBean;
import com.ut.scf.reqbean.sys.CorpDeleteReqBean;
import com.ut.scf.reqbean.sys.CorpListReqBean;
import com.ut.scf.reqbean.sys.CorpUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.ICorpService;

/**
 * 企业相关service类
 * 
 * @author zyx
 *
 */
@Service("corpService")
public class CorpServiceImpl implements ICorpService {

	private static final Logger log = LoggerFactory
			.getLogger(CorpServiceImpl.class);

	@Resource
	private ICorpDao corpDao;

	@Resource
	private IDeptDao deptDao;

	@Resource
	private CorpInfoMapper corpInfoMapper;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpInfo(CorpAddReqBean corpAddReqBean) {
		BaseRespBean respBean = new BaseRespBean();

		Map<String, Object> paramMap = BeanUtil.beanToMap(corpAddReqBean);

		// 企业名称不能重复。
		if (corpDao.countCorpByName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}

		// 生成主键Id
		CorpInfo corpInfo = new CorpInfo();
		BeanUtil.BeanToBean(corpInfo, corpAddReqBean);
		String corpId = ScfUUID.generate();
		corpInfo.setCorpId(corpId);

		if (null != corpAddReqBean.getRelaCorpId()
				&& corpAddReqBean.getRelaCorpId() != "") {
			ScfCacheDict.relaCorpIdMap.put(corpId,
					corpAddReqBean.getRelaCorpId());
		}

		int insertNum = corpDao.insertCorp(corpInfo);

		log.debug("insert corpInfo num {}", insertNum);
		if (insertNum < 1) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorp(CorpUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		// 企业名称不能重复。
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		if (corpDao.countCorpByName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
		int updateNum = corpDao.updateCorpInfoByPrimaryKey(paramMap);

		log.debug("update corpInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorp(CorpDeleteReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();

		String corpId = reqBean.getCorpId();
		// 有子部门，企业是不能删除的。
		if (corpDao.countDeptByCorpId(corpId) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_DEPT);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
		int updateNum = corpDao.updateCorpInfoByPrimaryKey(paramMap);
		log.debug("delete corpInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		if (updateNum > 0 && null != ScfCacheDict.relaCorpIdMap.get(corpId)
				&& ScfCacheDict.relaCorpIdMap.get(corpId) != "") {
			ScfCacheDict.relaCorpIdMap.remove(corpId);
		}
		return respBean;
	}

	@Override
	public BaseRespBean corpList(CorpListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		String userId = (String) paramMap.get("userId");
		String isLogo = (String) paramMap.get("isLogo");
		if (!isLogo.equals("Y")) {
			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userId);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		}

		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = corpDao.getCorpInfoList(paramMap,
					page);
			log.debug("corp list : {}", list);
			log.debug("corp list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = corpDao.getCorpInfoList(paramMap);
			log.debug("corp list : {}", list);

			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}

	// 核心企业信息 dyk
	@Override
	public CorpInfo coreCorpInfo() {
		CorpInfo corpInfo = corpInfoMapper.selectByPrimaryKey("corp00002");
		return corpInfo;
	}

	// 根据用户id查企业信息
	@Override
	public CorpInfo findCorpInfoByUserId(String userId) {
		CorpInfo corpInfo = corpDao.getCorpInfoByUserId(userId);
		return corpInfo;
	}

	// 根据企业id查询企业信息

	@Override
	@Transactional(readOnly = true)
	public List<Map<String, String>> getAllRelaCorp() {
		return corpDao.selectAllRelaCorp();
	}

	@Override
	public BaseRespBean getAgencyInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = corpDao.getAgencyInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean getAgencyRevenueList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = corpDao.getAgencyRevenueList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
}
