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
import com.ut.scf.dao.crm.IFixedExpendDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IFixedExpendService;
/**
 * 
 * @author changxin
 *
 */
@Service("fixedExpendService")
public class FixedExpendServiceImpl implements IFixedExpendService{
private static final Logger log = LoggerFactory.getLogger(FixedExpendServiceImpl.class);
	
	@Resource
	IFixedExpendDao fixedExpendDao;
	
	@Transactional(readOnly = true) 
	public BaseRespBean getFixedExpendList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = fixedExpendDao.selectFixedExpendList(paramMap, page);
		log.debug("FixedExpend resultList : {}", resultList);
		
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFixedExpend(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		int hasYearNum = fixedExpendDao.hasOneYear(paramMap);
		if(hasYearNum>0){
			log.debug("already have fixedExpendInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		
		
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = fixedExpendDao.insertFixedExpend(paramMap);
		log.debug("insert FixedExpend num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFixedExpend(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = fixedExpendDao.deleteFixedExpend(recUid);
		log.debug("insert FixedExpend num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFixedExpend(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		
		int hasYearNum = fixedExpendDao.hasOneYear(paramMap);
		String operTime = (String) paramMap.get("operTime");
		if(hasYearNum>0&&operTime!=null){
			log.debug("already have fixedExpendInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		
		int resultnum = fixedExpendDao.updateFixedExpend(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}



}
