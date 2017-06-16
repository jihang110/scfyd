package com.ut.scf.web.controller.project;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.project.PayCommitProcessReqBean;
import com.ut.scf.reqbean.project.PayCommitmentListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IPayCommitmentService;

@Controller
@RequestMapping("/commitment")
public class PayCommitmentManagerController {
	@Resource
	private IPayCommitmentService iPayCommitmentService;
	
	@Resource
	private IActivitiService activitiService;

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getPayInfoList(
			@Valid @RequestBody PayCommitmentListReqBean reqBean) throws IOException {
		BaseRespBean respBean = iPayCommitmentService.getPayInfoList(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/agencyList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean agencyFinanceList(
			@Valid @RequestBody PayCommitmentListReqBean reqBean) throws IOException {
		BaseRespBean respBean = iPayCommitmentService.agencyFinanceList(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody PayCommitProcessReqBean reqBean,BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		reqBean.setActivitiKey("payCommitment");
		JSONObject repayInfoStr = new JSONObject(reqBean);
		iPayCommitmentService.startProcess(repayInfoStr);
		return respBean;
	}
	
	@RequestMapping(value = "/getDataByTaskId", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getDataByTaskId(HttpSession httpSession,
			@RequestBody TaskInfoReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = iPayCommitmentService.getDataByTaskId(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/fillGuarantee", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean fillGuarantee(HttpSession httpSession,
			@RequestBody PayCommitProcessReqBean reqBean,BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		iPayCommitmentService.fillGuarantee(reqBean);
		return respBean;
	}
	
	//审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody PayCommitProcessReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		boolean isProcessEnd = iPayCommitmentService.doAgree(reqBean);
		if (isProcessEnd) {
			// 业务数据登录
			respBean = iPayCommitmentService.updateFinance(reqBean, httpSession);
		}
		return respBean;
	}
	
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody PayCommitProcessReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		iPayCommitmentService.reApply(reqBean);
		return respBean;
	}
}
