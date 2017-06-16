package com.ut.scf.web.controller.project;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.reqbean.project.OrderManagerReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.project.RepaymentPlanInfoRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IOrderManagerService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 订单管理
 * 
 * @author liwd
 *
 */
@Controller
@RequestMapping("/order")
public class OrderManagerController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(OrderManagerController.class);

	@Resource
	private IActivitiService activitiService;
	@Resource
	private IOrderManagerService iOrderManagerService;

	// 1.签署合同 并 发起流程
	@RequestMapping(value = "/startProcess")
	@ResponseBody
	public BaseRespBean startProcess(HttpSession httpSession) throws Exception {
		// 发起流程
		BaseRespBean respBean = new BaseRespBean();
		OrderManagerReqBean reqBean = new OrderManagerReqBean();
		// 获取当前用户

		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setOrderId("order_1,order_2");
		reqBean.setOrderBatchId("batch_1");
		reqBean.setUserId(userName);
		reqBean.setActivitiKey("orderManagerProcess");
		JSONObject contactInfo = new JSONObject(reqBean);
		log.debug("corpInfoStr: {}", contactInfo);
		activitiService.startProcess(contactInfo);
		return respBean;
	}

	// 5.审核是否同意
	@RequestMapping(value = "/doAgree")
	@ResponseBody
	public BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody OrderManagerReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.doAgree(jsonObject);
		return respBean;
	}

	// 获取订单信息
	@RequestMapping(value = "/orderList")
	@ResponseBody
	public BaseRespBean orderList(HttpSession httpSession,
			@RequestBody OrderManagerReqBean reqBean) {
		Map<String, String> map = null;
		String[] ids = reqBean.getOrderId().split(",");
		if (reqBean.getOrderStatus() != null) {
			String[] status = reqBean.getOrderStatus().split(",");
			map = new HashMap<String, String>();
			for (int i = 0; i < status.length; i++) {
				map.put(ids[i], status[i]);
			}
		}
		return iOrderManagerService.orderInfoById(Arrays.asList(ids), map);

	}

	// 添加
	@RequestMapping(value = "/add")
	@ResponseBody
	public BaseRespBean addRepayPlanInfo(HttpSession httpSession,
			@RequestBody OrderManagerReqBean reqBean) {
		Map<String, String> map = null;
		String[] ids = reqBean.getOrderId().split(",");
		if (reqBean.getOrderStatus() != null) {
			String[] status = reqBean.getOrderStatus().split(",");
			map = new HashMap<String, String>();
			for (int i = 0; i < status.length; i++) {
				map.put(ids[i], status[i]);
			}
		}
		return iOrderManagerService.addRepayPlanInfo(Arrays.asList(ids), map);

	}

	// 获取批次信息
	@RequestMapping(value = "/batchInfo")
	@ResponseBody
	public OrderBatchInfo batchInfoById(HttpSession httpSession,
			@RequestBody OrderManagerReqBean reqBean) {
		return iOrderManagerService.batchInfoById(reqBean.getOrderBatchId());

	}

	// 生成还款计划
	@RequestMapping(value = "/plans")
	@ResponseBody
	public List<List<RepaymentPlanInfoRespBean>> repayPlans(
			HttpSession httpSession, @RequestBody OrderManagerReqBean reqBean) {
		String[] strings = reqBean.getOrderId().split(",");
		return iOrderManagerService.getRepaymentPlans(Arrays.asList(strings));

	}
}
