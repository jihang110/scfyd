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
import com.ut.scf.dao.crm.ISupplierTradeDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ISupplierTradeService;

@Service("supplierTradeService")
public class SupplierTradeServiceImpl implements ISupplierTradeService {
	private static final Logger log = LoggerFactory
			.getLogger(SupplierTradeServiceImpl.class);
	
	@Resource ISupplierTradeDao supplierTradeDao;
	@Transactional(readOnly = true)
	public BaseRespBean getSupplierTradeList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = 
				supplierTradeDao.selectSupplierTradeList(paramMap, page);
		log.debug("role resultList : {}", resultList);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertSupplierTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = supplierTradeDao.insertSupplierTrade(paramMap);
		log.debug("insert supplierTrade num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteSupplierTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		String recUid = (String) paramMap.get("recUid");
		int resultnum = supplierTradeDao.deleteSupplierTrade(recUid);
		log.debug("insert supplierTrade num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateSupplierTrade(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = supplierTradeDao.updateSupplierTrade(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getPurchasingRiskAnalyList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = supplierTradeDao.selectPurchasingRiskAnalyList(paramMap, page);
		log.debug("role resultList : {}", resultList);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertPurchasingRiskAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = supplierTradeDao.insertPurchasingRiskAnaly(paramMap);
		log.debug("insertPurchasingRiskAnaly resultnum {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deletePurchasingRiskAnaly(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = supplierTradeDao.deletePurchasingRiskAnaly(recUid);
		log.debug("deletePurchasingRiskAnaly resultnum {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updatePurchasingRiskAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = supplierTradeDao.updatePurchasingRiskAnaly(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
