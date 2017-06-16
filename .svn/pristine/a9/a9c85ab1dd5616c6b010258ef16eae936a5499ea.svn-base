package com.ut.scf.service.crm.impl;

import java.util.HashMap;
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
import com.ut.scf.dao.crm.INegativeInfoDao;
import com.ut.scf.pojo.NegativeInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.NegParaRespBean;
import com.ut.scf.service.crm.INegativeInfoService;

@Service("negativeInfoService")
public class NegativeInfoServiceImpl implements INegativeInfoService {

	private static final Logger log = LoggerFactory
			.getLogger(NegativeInfoServiceImpl.class);

	@Resource
	private INegativeInfoDao negativeInfoDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getNegativeInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = negativeInfoDao.selectNegativeInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getNegativeInfoList(Map<String, Object> paramMap) {
		return negativeInfoDao.selectNegativeInfoList(paramMap);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addNegativeInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int hasYearNum = negativeInfoDao.hasOneYear(paramMap);
		if(hasYearNum>0){
			log.debug("already have NegativeInfo years num {}", hasYearNum);
			respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
			return respBean;
		}
		
		// 生成主键Id
		paramMap.put("negId", ScfUUID.generate());
		int insertNum = negativeInfoDao.insertNegativeInfo(paramMap);
		log.debug("insert NegativeInfo num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateNegativeInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = negativeInfoDao.updateNegativeInfo(paramMap);
		log.debug("update NegativeInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteNegativeInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = negativeInfoDao.deleteNegativeInfo(paramMap);
		log.debug("delete NegativeInfo num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean selectParams(Map<String, Object> paramMap) {
		NegParaRespBean respBean = new NegParaRespBean();
		Map<String, Object> params = new HashMap<String, Object>();
		Map<String, Object> params1 = negativeInfoDao.selectTotalLbEq(paramMap);
		if(params1 !=null){
			params.putAll(params1); 
		}
		Map<String, Object> params2 = negativeInfoDao.selectEarningsPerShare(paramMap);
		if(params2 !=null){
			params.putAll(params2); 
		}
		if(params !=null){
			BeanUtil.mapToBean(params, respBean);
		}
		return respBean;
	}

	@Override
	public BaseRespBean insertNegativeInfoBatch(List<NegativeInfo> list) {
		BaseRespBean respBean = new BaseRespBean();
		for(NegativeInfo negativeInfo :list){
			Map<String, Object> map = BeanUtil.beanToMap(negativeInfo);
			int hasYearNum = negativeInfoDao.hasOneYear(map);
			if(hasYearNum>0){
				log.debug("already have cashFlow years num {}", hasYearNum);
				respBean.setResult(ErrorCodeEnum.HAS_SAME_DATE);
				return respBean;
			}
		}
		int resultnum = negativeInfoDao.addNegativeInfoRecordBatch(list);
		log.debug("insert CashFlowRecordBatch num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}


}
