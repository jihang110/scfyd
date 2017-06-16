package com.ut.scf.service.project.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.dao.project.IFinanceInfoDao;
import com.ut.scf.dao.project.IRevenueDao;
import com.ut.scf.dao.pub.IGaranteeMoneyDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.project.ICountAnalyseService;

@Service("countAnalyseService")
public class CountAnalyseServiceImpl implements ICountAnalyseService {
	@Resource private IFinanceInfoDao financeInfoDao;
	@Resource private IRevenueDao revenueDao;
	@Resource private IGaranteeMoneyDao garanteeMoneyDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFinanceCountInfo(Map<String, Object> paramMap) {
		ListRespBean listRespBean = new ListRespBean();
		List<Map<String, Object>> financeInfoList = financeInfoDao.getFinanceInfoGroupByName(paramMap);
//		循环获取总值
//		BigDecimal financeTotalAmount = BigDecimal.ZERO;//融资总值
//		BigDecimal payTotalAmt= BigDecimal.ZERO;//放款总值
//		for (Map<String, Object> map : financeInfoList) {
//			financeTotalAmount = financeTotalAmount.add((BigDecimal) map.get("financeAmount"));
//			payTotalAmt = payTotalAmt.add((BigDecimal) map.get("payAmt"));
//		}
//		List<Map<String, Object>> financeCount = new ArrayList<>();
//		Map<String, Object> countMap = new HashMap<>();
//		countMap.put("financeTotalAmount", financeTotalAmount);
//		countMap.put("payTotalAmt", payTotalAmt);
//		financeCount.add(countMap);
		listRespBean.setDataList(financeInfoList);
		return listRespBean;
	}
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRevenueCountInfo(Map<String, Object> paramMap) {
		ListRespBean listRespBean = new ListRespBean();
		List<Map<String, Object>> revenueInfoByAgency = revenueDao.getRevenueInfoByAgency(paramMap);
		listRespBean.setDataList(revenueInfoByAgency);
		return listRespBean;
	}
	/*
	 * (non-Javadoc)保证金统计分析
	 * @see com.ut.scf.service.project.ICountAnalyseService#getRevenueCountInfo(java.util.Map)
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getGuarantInfo(Map<String, Object> paramMap) {
		ListRespBean listRespBean = new ListRespBean();
		List<Map<String, Object>> garanteeMoneyByName = garanteeMoneyDao.getGaranteeMoneyByName(paramMap);
		listRespBean.setDataList(garanteeMoneyByName);
		return listRespBean;
	}

}
