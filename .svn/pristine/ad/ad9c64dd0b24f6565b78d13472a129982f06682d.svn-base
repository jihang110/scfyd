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
import com.ut.scf.dao.crm.ICashFlowDao;
import com.ut.scf.pojo.CashFlow;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.CashFlowRespBean;
import com.ut.scf.service.crm.ICashFlowService;

/**
 * 
 * @author changxin
 *
 */
@Service("cashFlowService")
public class CashFlowServiceImpl implements ICashFlowService {
	private static final Logger log = LoggerFactory
			.getLogger(CashFlowServiceImpl.class);

	@Resource
	private ICashFlowDao cashFlowDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCashFlowList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = cashFlowDao.selectCashFlowList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getCashFlowList(Map<String, Object> paramMap) {
		return cashFlowDao.selectCashFlowList(paramMap);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCashFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		int hasYearNum = cashFlowDao.hasOneYear(paramMap);
		if(hasYearNum>0){
			log.debug("already have cashFlowInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		
		
		
		
		
		
		
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = cashFlowDao.insertCashFlow(paramMap);
		log.debug("insert CashFlow num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCashFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int hasYearNum = cashFlowDao.hasOneYear(paramMap);
		String operYear = (String) paramMap.get("operYear");
		if(hasYearNum>0&&operYear!=null){
			log.debug("already have cashFlowInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		int updateNum = cashFlowDao.updateCashFlow(paramMap);
		log.debug("update CashFlow num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCashFlow(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = cashFlowDao.deleteCashFlow(recUid);
		log.debug("insert CashFlow num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCashFlowById(String recUid) {
		Map<String, Object> result = cashFlowDao.selectCashflowById(recUid);
		CashFlowRespBean respBean = new CashFlowRespBean();
		BeanUtil.mapToBean(result, respBean);
		return respBean;
	}

	@Override
	public BaseRespBean insertCashFlowBatch(List<CashFlow> list) {
		BaseRespBean respBean = new BaseRespBean();
		for(CashFlow cashFlow :list){
			Map<String, Object> map = BeanUtil.beanToMap(cashFlow);
			int hasYearNum = cashFlowDao.hasOneYear(map);
			if(hasYearNum>0){
				log.debug("already have cashFlow years num {}", hasYearNum);
				respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
				return respBean;
			}
		}
		int resultnum = cashFlowDao.addCashFlowRecordBatch(list);
		log.debug("insert CashFlowRecordBatch num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

}
