package com.ut.scf.web.controller.project;

import java.util.Map;

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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.FinanceFlowReqBean;
import com.ut.scf.reqbean.project.FinanceInfoListReqBean;
import com.ut.scf.reqbean.project.FinanceListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IFinanceInfoService;


/**
 * 融资操作相关的控制类
 * 
 * @author yuancy
 *
 */
@Controller
@RequestMapping("/finance")
public class FinanceInfoController {

	private static final Logger log = LoggerFactory
			.getLogger(FinanceInfoController.class);
	
	@Resource
	private IFinanceInfoService financeInfoService;
	
	@Resource
	private IActivitiService activitiService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean financeInfoList(@RequestBody FinanceInfoListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = financeInfoService.getFinanceInfoList(paramMap, page);
		log.debug("financeInfoList: {}", respBean);
		
		return respBean;
	}
	
	@RequestMapping(value = "/getProGuarantee", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getProGuarantee(@RequestBody FinanceInfoListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = financeInfoService.getProGuarantee(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/apply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean apply(HttpSession httpSession,
			@Valid @RequestBody FinanceFlowReqBean flowReqBean,
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
		flowReqBean.setActivitiKey("financeMngProcess");
		JSONObject jsonObject = new JSONObject(flowReqBean);
		
		financeInfoService.startProcess(jsonObject);

		return respBean;
	}
	
	@RequestMapping(value = "/getFinanceInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getFinanceInfo(HttpSession httpSession,
			@Valid @RequestBody TaskInfoReqBean flowReqBean,
			BindingResult bindingResult){
		BaseRespBean respBean = new BaseRespBean();
		respBean = financeInfoService.getFinanceInfo(flowReqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/applyGuarantee", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean applyGuarantee(HttpSession httpSession,
			@Valid @RequestBody FinanceFlowReqBean flowReqBean,
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
		financeInfoService.applyGuarantee(flowReqBean);

		return respBean;
	}
	
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody FinanceFlowReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		boolean isProcessEnd = financeInfoService.doAgree(reqBean);
		if (isProcessEnd) {
			// 业务数据登录
			respBean = financeInfoService.addFinance(reqBean, httpSession);
		}
		return respBean;
	}
	
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody FinanceFlowReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		financeInfoService.reApply(reqBean);
		return respBean;
	}
	
/*	@RequestMapping(value = "/financelist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean financeList(@RequestBody FinanceInfoListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = financeInfoService.getFinanceList(paramMap, page);
		log.debug("financeList: {}", respBean);
		
		return respBean;
	}*/
	
	@RequestMapping(value = "/financelist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean financeList(HttpSession httpSession,
			@RequestBody FinanceListReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			respBean=financeInfoService.getFinanceList(paramMap);
			return respBean;
	}

}
