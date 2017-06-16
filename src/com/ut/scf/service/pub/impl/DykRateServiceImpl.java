package com.ut.scf.service.pub.impl;

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
import com.ut.scf.dao.auto.DykRateMapper;
import com.ut.scf.dao.pub.IDykRateDao;
import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;


import com.ut.scf.service.pub.IDykRateService;

@Service("dykRateService")
public class DykRateServiceImpl implements IDykRateService{

	private static final Logger log = LoggerFactory
			.getLogger(DykRateServiceImpl.class);
	
	@Resource
	private IDykRateDao dykRateDao;

	@Resource
	private DykRateMapper dykRateMapper;

	/**
	 * 条件查询 分页获取
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDykRateList(Map<String, Object> paramMap,PageInfoBean page) {
		List<Map<String, Object>> list = dykRateDao.getDykRateList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		log.debug("DykRate list : {}", list);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	/**
	 * 修改   
	 * 
	 * @param DykRate
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDykRate(DykRate dykRate) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(dykRate);
		DykRate record = new DykRate();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = dykRateMapper.updateByPrimaryKeySelective(record);
		log.debug("update im num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	} 

}
