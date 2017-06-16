package com.ut.scf.web.controller.project;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/agency")
public class AgencyManageController extends BaseJsonController{

	private static final Logger log = LoggerFactory
			.getLogger(AgencyManageController.class);
	
	@Resource
	private IAgencyService agencyService;
	
	@Resource
	private IActivitiService activitiService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getAgencyList(HttpSession httpSession,
			@Valid @RequestBody AgencySearchPageReqBean searchPage,
			BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.agencyService.agencyList(searchPage);

		return respBean;
	}
	
	@RequestMapping(value = "/apply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean apply(HttpSession httpSession,
			@Valid @RequestBody AgencyFlowReqBean flowReqBean,
			BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		flowReqBean.setUserId(userName);
		flowReqBean.setActivitiKey("accAgencyProcess");
		JSONObject jsonObject = new JSONObject(flowReqBean);
		
		respBean = activitiService.startProcess(jsonObject);

		return respBean;
	}
	
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody AgencyFlowReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			// 获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			boolean isProcessEnd = agencyService.doAgree(jsonObject);
			if (isProcessEnd) {
				// 业务数据登录
				respBean = agencyService.addAgency(reqBean);
			}
			return respBean;
	}
	
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody AgencyFlowReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			// 获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = activitiService.reApply(jsonObject);
			return respBean;
	}
}
