package com.ut.scf.service.crm.impl;

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
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.IFixedExpendAnalyDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IFixedExpendAnalyService;

/**
 * 
 * @author changxin
 *
 */
@Service("fixedExpendAnalyService")
public class FixedExpendAnalyServiceImpl implements IFixedExpendAnalyService {
	
	private static final Logger log = LoggerFactory
			.getLogger(FixedExpendAnalyServiceImpl.class);

	@Resource
	IFixedExpendAnalyDao fixedExpendAnalyDao;

	@Transactional(readOnly = true)
	public BaseRespBean getFixedExpendAnalyList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> resultList = fixedExpendAnalyDao
				.selectFixedExpendAnalyList(paramMap, page);
		log.debug("FixedExpendAnaly resultList : {}", resultList);

		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFixedExpendAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = fixedExpendAnalyDao.insertFixedExpendAnaly(paramMap);
		log.debug("insert FixedExpendAnaly num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFixedExpendAnaly(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = fixedExpendAnalyDao.deleteFixedExpendAnaly(recUid);
		log.debug("insert FixedExpendAnaly num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFixedExpendAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = fixedExpendAnalyDao.updateFixedExpendAnaly(paramMap);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
