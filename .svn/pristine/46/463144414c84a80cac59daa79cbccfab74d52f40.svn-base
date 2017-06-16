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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.ICorpConditionDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.CorpConditionCautRespBean;
import com.ut.scf.respbean.crm.CorpConditionRespBean;
import com.ut.scf.service.crm.ICorpConditionService;

/**
 * 
 * @author changxin
 *
 */
@Service("CorpConditionService")
public class CorpConditionServiceImpl implements ICorpConditionService {
	private static final Logger log = LoggerFactory
			.getLogger(CorpConditionServiceImpl.class);

	@Resource
	private ICorpConditionDao CorpConditionDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpConditionList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = CorpConditionDao.selectCorpConditionList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpCondition(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();	
		int hasYearNum = CorpConditionDao.hasOneYear(paramMap);
		if(hasYearNum>0){
			log.debug("already have ProfitInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}						
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = CorpConditionDao.insertCorpCondition(paramMap);
		log.debug("insert CorpCondition num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorpCondition(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int hasYearNum = CorpConditionDao.hasOneYear(paramMap);
		String operYear = (String) paramMap.get("operYear");
		if(hasYearNum>0&&operYear!=null){
			log.debug("already have ProfitInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		int updateNum = CorpConditionDao.updateCorpCondition(paramMap);
		log.debug("update CorpCondition num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorpCondition(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = CorpConditionDao.deleteCorpCondition(recUid);
		log.debug("insert CorpCondition num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpConditionById(String recUid) {
		Map<String, Object> result = CorpConditionDao.selectCorpConditionById(recUid);
		CorpConditionRespBean respBean = new CorpConditionRespBean();
		BeanUtil.mapToBean(result, respBean);
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean calculateData(Map<String, Object> paramMap) {
		Map<String, Object> result = CorpConditionDao.calculateData(paramMap);
		CorpConditionCautRespBean respBean = new CorpConditionCautRespBean();
		BeanUtil.mapToBean(result, respBean);
		return respBean;
	}
}
