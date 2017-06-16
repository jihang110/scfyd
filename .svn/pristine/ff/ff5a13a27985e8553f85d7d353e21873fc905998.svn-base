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
import com.ut.scf.dao.crm.ICustomerTradeDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICustomerTradeService;

@Service("customerTradeService")
public class CustomerTradeServiceImpl implements ICustomerTradeService {
	private static final Logger log = LoggerFactory
			.getLogger(CustomerTradeServiceImpl.class);
	@Resource ICustomerTradeDao customerTradeDao;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCustomerTradeList(Map<String, Object> paramMap, PageInfoBean page) {	
		List<Map<String, Object>> resultList = 
				customerTradeDao.selectCustomerTradeList(paramMap, page);	
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertCustomerTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = customerTradeDao.insertCustomerTrade(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCustomerTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		String recUid = (String) paramMap.get("recUid");
		int resultnum = customerTradeDao.deleteCustomerTrade(recUid);
		log.debug("delete CustomerTrade num :{}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCustomerTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = customerTradeDao.updateCustomerTrade(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getSalesRiskAnalyList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = customerTradeDao.selectSalesRiskAnalyList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertSalesRiskAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = customerTradeDao.insertSalesRiskAnaly(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteSalesRiskAnaly(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = customerTradeDao.deleteSalesRiskAnaly(recUid);
		log.debug("delete SalesRiskAnaly num :{}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateSalesRiskAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = customerTradeDao.updateSalesRiskAnaly(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
