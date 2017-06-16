package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.query.IRateInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IRateInfoQueryService;
@Service("RateInfoQueryService")
public class RateInfoQueryServiceImpl implements IRateInfoQueryService{
	@Resource
	private IRateInfoDao rateInfoDao;
	
	// 查询利息信息
		@Override
		public BaseRespBean getRateInfoList(Map<String, Object> paramMap,
				PageInfoBean page) {
			List<Map<String, Object>> list = rateInfoDao.getRateInfoList(paramMap, page);
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		}
	
}
