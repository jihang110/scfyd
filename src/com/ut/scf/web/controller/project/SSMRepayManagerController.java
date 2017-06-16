package com.ut.scf.web.controller.project;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.RepayPlanListReqBean;
import com.ut.scf.reqbean.project.RepayPlanReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IRepayManagerService;
import com.ut.scf.web.controller.BaseJsonController;
import com.ut.scf.web.controller.pub.CustManagerController;

@Controller
@RequestMapping("/ssmRepay")
public class SSMRepayManagerController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(CustManagerController.class);

	@Resource
	private IRepayManagerService repayManagerService;

	@Resource
	private IActivitiService activitiService;

	// 超人还款计划 代还款
	@RequestMapping(value = "/repayPlan")
	@ResponseBody
	public BaseRespBean findRepayPlanByStatus(
			@RequestBody RepayPlanListReqBean reqBean) {
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		BaseRespBean respBean = repayManagerService.findRepayPlanByStatus(
				paramMap, page);
		return respBean;
	}

	// 超人需还金额
	@RequestMapping(value = "/sum")
	@ResponseBody
	public BaseRespBean repaySumAmt(@RequestBody RepayPlanListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		BaseRespBean respBean = repayManagerService.selectSumAmt(paramMap);
		return respBean;
	}

	// 超人还款还款状态
	@RequestMapping(value = "/updateStatus")
	@ResponseBody
	public BaseRespBean updateSSMRepayStatus(
			@RequestBody RepayPlanReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		BaseRespBean respBean = repayManagerService
				.updateSSMRepayStatus(paramMap);
		return respBean;
	}

	// 流程发起
	@RequestMapping(value = "/startProcess")
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody RepayPlanReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		reqBean.setActivitiKey("ssmRepayManager");
		JSONObject repayInfoStr = new JSONObject(reqBean);
		activitiService.startProcess(repayInfoStr);
		return respBean;
	}

	// 审核是否同意
	@RequestMapping(value = "/doAgree")
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody RepayPlanReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		activitiService.doAgree(jsonObject);
		return respBean;
	}

}
