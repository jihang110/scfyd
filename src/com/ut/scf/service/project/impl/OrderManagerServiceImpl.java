package com.ut.scf.service.project.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfDateUtil;
import com.ut.scf.dao.auto.OrderBatchInfoMapper;
import com.ut.scf.dao.auto.OrderInfoMapper;
import com.ut.scf.dao.auto.RepaymentPlanInfoMapper;
import com.ut.scf.dao.project.ISignContractDao;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.pojo.auto.OrderInfo;
import com.ut.scf.pojo.auto.OrderInfoExample;
import com.ut.scf.pojo.auto.OrderInfoExample.Criteria;
import com.ut.scf.pojo.auto.RepaymentPlanInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IOrderManagerService;

@Service("orderManagerService")
public class OrderManagerServiceImpl implements IOrderManagerService {

	Logger log = LoggerFactory.getLogger(this.getClass());

	@Resource
	private OrderInfoMapper orderInfoMapper;
	@Resource
	private OrderBatchInfoMapper orderBatchInfoMapper;
	@Resource
	private RepaymentPlanInfoMapper repaymentPlanInfoMapper;
	@Resource
	private ISignContractDao iSignContractDao;

	// 获取根据订单号获取订单信息
	@Override
	public BaseRespBean orderInfoById(String batchId, Map<String, String> map) {
		PageRespBean respBean = new PageRespBean();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("orderBatchId", batchId);
		List<Map<String, Object>> list = iSignContractDao
				.orderInfoByBatchId(paramMap);

		if (map != null) {
			for (Map<String, Object> tempMap : list) {
				if (map.containsKey(tempMap.get("orderId"))) {
					tempMap.put("orderStatus", map.get(tempMap.get("orderId")));
				}
			}
		}
		respBean.setDataList(list);
		return respBean;
	}

	// 获取根据订单号获取订单信息
	@Override
	public BaseRespBean addRepayPlanInfo(List<String> orderIds,
			Map<String, String> map) {
		PageRespBean respBean = new PageRespBean();
		OrderInfoExample example = new OrderInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andOrderIdIn(orderIds);
		List<OrderInfo> orderInfos = orderInfoMapper.selectByExample(example);
		if (map != null) {
			for (OrderInfo orderInfo : orderInfos) {
				if (map.containsKey(orderInfo.getOrderId())) {
					orderInfo.setOrderStatus(new Byte(map.get(orderInfo
							.getOrderId())));
				}
				// 跟新订单状态
				orderInfoMapper.updateByPrimaryKeySelective(orderInfo);
				if ("1".endsWith(map.get(orderInfo.getOrderId()))) {
					generateRepayPlan(BeanUtil.beanToMap(orderInfo), "1");
				}
			}
		}

		return respBean;
	}

	// 根据批次号获取订单信息
	@Override
	public OrderBatchInfo batchInfoById(String batchId) {
		return orderBatchInfoMapper.selectByPrimaryKey(batchId);
	}

	// 获取生成还款计划
	@Override
	public List<List<Map<String, Object>>> getRepaymentPlans(String ids) {
		List<List<Map<String, Object>>> plans = new ArrayList<List<Map<String, Object>>>();
		// List<OrderInfo> orderInfos = findOrderInfosById(ids);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		String[] idStrs = ids.split(",");
		paramMap.put("orderId", Arrays.asList(idStrs));
		List<Map<String, Object>> orderInfos = iSignContractDao
				.orderInfoByBatchId(paramMap);
		for (Map<String, Object> orderInfo : orderInfos) {
			List<Map<String, Object>> list = generateRepayPlan(orderInfo, "0");
			plans.add(list);
		}
		return plans;
	}

	// 根据订单号查询订单信息
	public List<OrderInfo> findOrderInfosById(List<String> ids) {
		OrderInfoExample example = new OrderInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andOrderIdIn(ids);
		return orderInfoMapper.selectByExample(example);
	}

	// 根据订单生成还款计划
	// type:1 插表 0 ：返回数组
	public List<Map<String, Object>> generateRepayPlan(
			Map<String, Object> orderInfo, String type) {
		List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>();

		int period = Integer.parseInt(orderInfo.get("period").toString()); // 分期期数
		BigDecimal crReqAmt = new BigDecimal(orderInfo.get("crReqAmt")
				.toString());// 申请金额
		BigDecimal money = paymentCalc(12, period, new BigDecimal(0.12),
				crReqAmt);// 每月应付
		BigDecimal principal = crReqAmt.divide(new BigDecimal(period), 2,
				BigDecimal.ROUND_HALF_UP);// 每月应还本金
		BigDecimal interest = money.subtract(principal);// 每月应还利息

		for (int i = 0; i < period; i++) {
			String date = addMonth((Date) orderInfo.get("startPayDay"), i);
			byte tempPeriod = (byte) (i + 1);
			if (i == period - 1) {
				// 最后一期 解决 本金四舍五入
				principal = crReqAmt.subtract(principal
						.multiply(new BigDecimal(i - 1)));
				interest = money.subtract(principal);
			}
			if ("1".equals(type)) {
				RepaymentPlanInfo repaymentPlanInfo = new RepaymentPlanInfo();
				repaymentPlanInfo.setOrderBatchId(orderInfo.get("orderBatchId")
						.toString());
				repaymentPlanInfo.setOrderId(orderInfo.get("orderId")
						.toString());
				repaymentPlanInfo.setStudentRepayStatus("0");
				repaymentPlanInfo.setSuperRepayStatus("0");
				repaymentPlanInfo.setPeriod(tempPeriod);
				repaymentPlanInfo.setCurrentRepayDate(ScfDateUtil
						.parseDate(date));
				repaymentPlanInfo.setCurrentPayableInterest(interest);
				repaymentPlanInfo.setCurrentPayablePrincipal(principal);
				repaymentPlanInfoMapper.insert(repaymentPlanInfo);
				// insertRepayPlanInfo(tempMap);
			} else {
				Map<String, Object> tempMap = new HashMap<String, Object>();
				tempMap.putAll(orderInfo);
				tempMap.put("studentRepayStatus", "0");
				tempMap.put("superRepayStatus", "0");
				tempMap.put("period", tempPeriod);
				tempMap.put("currentRepayDate", date);
				tempMap.put("currentPayableInterest", interest);
				tempMap.put("currentPayablePrincipal", principal);
				lists.add(tempMap);
			}
		}
		return lists;

	}

	// 传入具体日期和n ，返回具体日期减n个月
	private String addMonth(Date date, int n) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, n);
		Date tempDate = calendar.getTime();
		return ScfDateUtil.format(tempDate, ScfConsts.DATE_FORMAT);
	}

	// 计算 还款计划
	// 第一个m固定值12|n分期期数|r利率0.12|p金额 计算商家还款计划表的公式
	private BigDecimal paymentCalc(int m, int n, BigDecimal r,
			BigDecimal principal) {
		BigDecimal top = r.divide(new BigDecimal(m), 4,
				BigDecimal.ROUND_HALF_UP);
		top = new BigDecimal(1).add(top);
		top = new BigDecimal(1).divide(top, 4, BigDecimal.ROUND_HALF_UP);
		BigDecimal resultTop = new BigDecimal(1).subtract(top);
		resultTop = resultTop.multiply(resultTop);
		BigDecimal resultBtm = top.pow(n);
		resultBtm = new BigDecimal(1).subtract(resultBtm);
		resultBtm = top.multiply(resultBtm);
		BigDecimal result = resultTop.divide(resultBtm, 2,
				BigDecimal.ROUND_HALF_UP);
		return result;
	}

}
