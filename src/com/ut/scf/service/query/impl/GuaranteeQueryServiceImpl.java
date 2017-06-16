package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.query.IGuaranteeInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IGuaranteeQueryService;

@Service("guaranteeQueryService")
public class GuaranteeQueryServiceImpl implements IGuaranteeQueryService{

	@Resource
	private IGuaranteeInfoDao guaranteeInfoInfoDao;
	
	@Override
	public BaseRespBean getGuaranteeQueryList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = guaranteeInfoInfoDao
				.getGuaranteeQueryList(paramMap, page);
		guaranteeInfoInfoDao.getGuaranteeQueryList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

}
