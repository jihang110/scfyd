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
import com.ut.scf.dao.crm.IFinanceInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.FinanceInfoRespBean;
import com.ut.scf.service.crm.IFinanceInfoService;

/**
 * 
 * @author changxin
 *
 */
@Service("financeInfoService")
public class FinanceInfoServiceImpl implements IFinanceInfoService{
	
	private static final Logger log = LoggerFactory.getLogger(FinanceInfoServiceImpl.class);
	
	@Resource
	IFinanceInfoDao financeInfoDao;
	
	@Transactional(readOnly = true) 
	public BaseRespBean getFinanceInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = financeInfoDao.selectFinanceInfoList(paramMap, page);
		log.debug("FinanceInfo resultList : {}", resultList);
		
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFinanceInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = financeInfoDao.insertFinanceInfo(paramMap);
		log.debug("insert FinanceInfo num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFinanceInfo(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = financeInfoDao.deleteFinanceInfo(recUid);
		log.debug("insert FinanceInfo num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFinanceInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = financeInfoDao.updateFinanceInfo(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFinanceInfoById(String recUid) {
		Map<String, Object> result = financeInfoDao.selectFinanceInfoById(recUid);
		FinanceInfoRespBean respBean = new FinanceInfoRespBean();
		BeanUtil.mapToBean(result, respBean);
		return respBean;
	}

}
