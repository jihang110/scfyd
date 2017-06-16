package com.ut.scf.service.project.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.dao.auto.OrderBatchInfoMapper;
import com.ut.scf.dao.auto.OrderInfoMapper;
import com.ut.scf.dao.auto.RepaymentPlanInfoMapper;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.pojo.auto.OrderInfo;
import com.ut.scf.pojo.auto.OrderInfoExample;
import com.ut.scf.pojo.auto.OrderInfoExample.Criteria;
import com.ut.scf.pojo.auto.RepaymentPlanInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.project.RepaymentPlanInfoRespBean;
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

	// 获取根据订单号获取订单信息
	@Override
	public BaseRespBean orderInfoById(List<String> orderIds,
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
			}
		}
		respBean.setDataList(orderInfos);
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
				generateRepayPlan(orderInfo, "1");
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
	public List<List<RepaymentPlanInfoRespBean>> getRepaymentPlans(
			List<String> ids) {
		List<List<RepaymentPlanInfoRespBean>> plans = new ArrayList<List<RepaymentPlanInfoRespBean>>();
		List<OrderInfo> orderInfos = findOrderInfosById(ids);
		for (OrderInfo orderInfo : orderInfos) {
			List<RepaymentPlanInfoRespBean> list = generateRepayPlan(orderInfo,
					"0");
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
	public List<RepaymentPlanInfoRespBean> generateRepayPlan(
			OrderInfo orderInfo, String type) {
		List<RepaymentPlanInfoRespBean> lists = new ArrayList<RepaymentPlanInfoRespBean>();

		int period = orderInfo.getPeriod();// 分期期数
		BigDecimal crReqAmt = orderInfo.getCrReqAmt();// 申请金额
		BigDecimal money = paymentCalc(12, period, new BigDecimal(0.12),
				crReqAmt);// 每月应付
		BigDecimal principal = crReqAmt.divide(new BigDecimal(period), 2,
				BigDecimal.ROUND_HALF_UP);// 每月应还本金
		BigDecimal interest = money.subtract(principal);// 每月应还利息

		for (int i = 0; i < period; i++) {
			RepaymentPlanInfoRespBean planInfo = new RepaymentPlanInfoRespBean();
			planInfo.setOrderBatchId(orderInfo.getOrderBatchId());
			planInfo.setOrderId(orderInfo.getOrderId());
			planInfo.setRepayStatus("0");
			Date date = addMonth(orderInfo.getStartPayDay(), i);
			planInfo.setPeriod(new Byte(i + 1 + ""));
			planInfo.setCurrentRepayDate(date);
			// planInfo.setName(orderInfo.getName());
			// planInfo.setIdCard(orderInfo.getIdCard());
			planInfo.setPayM(orderInfo.getPayM());
			// planInfo.setContact(orderInfo.getContact());
			planInfo.setProductAmt(orderInfo.getProductAmt());
			if (i == period - 1) {
				// 最后一期 解决 本金四舍五入
				principal = crReqAmt.subtract(principal
						.multiply(new BigDecimal(i - 1)));
				interest = money.subtract(principal);
			}
			planInfo.setCurrentPayableInterest(interest);
			planInfo.setCurrentPayablePrincipal(principal);
			if ("1".equals(type)) {
				insertRepayPlanInfo(planInfo);
			} else {
				lists.add(planInfo);
			}

		}
		return lists;

	}

	// 还款计划插表
	public void insertRepayPlanInfo(RepaymentPlanInfoRespBean planInfo) {
		RepaymentPlanInfo repaymentPlanInfo = new RepaymentPlanInfo();
		repaymentPlanInfo.setCurrentPayableInterest(planInfo
				.getCurrentPayableInterest());
		repaymentPlanInfo.setCurrentPayablePrincipal(planInfo
				.getCurrentPayablePrincipal());
		repaymentPlanInfo.setCurrentRepayDate(planInfo.getCurrentRepayDate());
		repaymentPlanInfo.setOrderBatchId(planInfo.getOrderBatchId());
		repaymentPlanInfo.setOrderId(planInfo.getOrderId());
		repaymentPlanInfo.setPeriod(planInfo.getPeriod());
		repaymentPlanInfo.setStudentRepayStatus(planInfo.getRepayStatus());
		repaymentPlanInfoMapper.insert(repaymentPlanInfo);
	}

	// 传入具体日期和n ，返回具体日期减n个月
	private Date addMonth(Date date, int n) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, n);
		return calendar.getTime();
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
