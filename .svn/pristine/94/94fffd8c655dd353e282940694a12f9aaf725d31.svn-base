package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.CarInfoMapper;
import com.ut.scf.dao.query.IGuaranteeInfoDao;
import com.ut.scf.pojo.auto.CarInfo;
import com.ut.scf.pojo.auto.CarInfoExample;
import com.ut.scf.pojo.auto.CarInfoExample.Criteria;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IFinanceQueryService;

@Service("financeQuerySevice")
public class FinanceQueryServiceImpl implements IFinanceQueryService {
	@Resource
	private CarInfoMapper carInfoMapper;
	@Resource
	private IGuaranteeInfoDao guaranteeInfoInfoDao;

	// 根据融资id查询车辆信息
	@Override
	public BaseRespBean carInfoList(String financeId) {
		CarInfoExample example = new CarInfoExample();
		Criteria cirCriteria = example.createCriteria();
		cirCriteria.andFinanceIdEqualTo(financeId);
		List<CarInfo> carInfos = carInfoMapper.selectByExample(example);
		ListRespBean listRespBean = new ListRespBean();
		listRespBean.setDataList(carInfos);
		return listRespBean;
	}

	// 查询保证金信息
	@Override
	public BaseRespBean guaranteeInfoInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = guaranteeInfoInfoDao
				.getGuaranteeInfoInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
}
