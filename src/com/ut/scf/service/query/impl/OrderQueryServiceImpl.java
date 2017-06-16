package com.ut.scf.service.query.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.RepaymentPlanInfoMapper;
import com.ut.scf.dao.query.IOrderInfoDao;
import com.ut.scf.pojo.auto.RepaymentPlanInfo;
import com.ut.scf.pojo.auto.RepaymentPlanInfoExample;
import com.ut.scf.pojo.auto.RepaymentPlanInfoExample.Criteria;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IOrderQueryService;

@Service("orderQuerySevice")
public class OrderQueryServiceImpl implements IOrderQueryService {
	@Resource
	private IOrderInfoDao orderInfoDao;
	@Resource
	private RepaymentPlanInfoMapper repaymentPlanInfoMapper;

	// 查询订单信息
	@Override
	public BaseRespBean orderInfoInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = orderInfoDao.orderInfoList(paramMap,
				page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	// 根据批次号 查询还款计划
	@Override
	public BaseRespBean repayPlanInfo(String batchId) {
		RepaymentPlanInfoExample example = new RepaymentPlanInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andOrderBatchIdEqualTo(batchId);
		List<RepaymentPlanInfo> repaymentPlanInfos = repaymentPlanInfoMapper
				.selectByExample(example);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(repaymentPlanInfos);
		return respBean;

	}

	// 查询还款计划信息
	@Override
	public BaseRespBean repayPlanInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = orderInfoDao
				.repayPlanInfoList(paramMap);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
