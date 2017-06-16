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
import com.ut.scf.dao.crm.IProfitDao;
import com.ut.scf.pojo.Profit;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.ProfitRespBean;
import com.ut.scf.service.crm.IProfitService;

@Service("profitService")
public class ProfitServiceImpl implements IProfitService{
	private static final Logger log = LoggerFactory.getLogger(ProfitServiceImpl.class);
	
	@Resource IProfitDao profitDao;
	@Transactional(readOnly = true)
	public BaseRespBean getProfitList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = profitDao.selectProfitList(paramMap, page);
		log.debug("role resultList : {}", resultList);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}
	
	public List<Map<String, Object>> getProfitList(Map<String, Object> paramMap) {
		return profitDao.selectProfitList(paramMap);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertProfit(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		int hasYearNum = profitDao.hasOneYear(paramMap);
		if(hasYearNum>0){
			log.debug("already have ProfitInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = profitDao.insertProfit(paramMap);
		log.debug("insert Profit num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteProfit(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = profitDao.deleteProfit(recUid);
		log.debug("insert Profit num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateProfit(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int hasYearNum = profitDao.hasOneYear(paramMap);
		String operYear = (String) paramMap.get("operYear");
		if(hasYearNum>0&&operYear!=null){
			log.debug("already have ProfitInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		int resultnum = profitDao.updateProfit(paramMap);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getProfitById(String recUid) {
		Map<String, Object> resultList = profitDao.selectProfitById(recUid);
		ProfitRespBean respBean = new ProfitRespBean();
		BeanUtil.mapToBean(resultList, respBean);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertProfitBatch(List<Profit> list) {
		BaseRespBean respBean = new BaseRespBean();
		for(Profit profit :list){
			Map<String, Object> map = BeanUtil.beanToMap(profit);
			int hasYearNum = profitDao.hasOneYear(map);
			if(hasYearNum>0){
				log.debug("already have ProfitInfo years num {}", hasYearNum);
				respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
				return respBean;
			}
		}
		
		int resultnum = profitDao.addProfitRecordBatch(list);
		log.debug("insert ProfitBatch num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

}
