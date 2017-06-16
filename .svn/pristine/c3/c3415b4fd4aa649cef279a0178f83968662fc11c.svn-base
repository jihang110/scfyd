package com.ut.scf.web.controller.pub;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.ProcessEngine;
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
import com.ut.scf.pojo.auto.LoanInfo;
import com.ut.scf.reqbean.pub.LoanInfoAgreeReqBean;
import com.ut.scf.reqbean.pub.LoanInfoDeleteReqBean;
import com.ut.scf.reqbean.pub.LoanInfoListReqBean;
import com.ut.scf.reqbean.pub.LoanInfoProcessReqBean;
import com.ut.scf.reqbean.pub.LoanInfoReApplyReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.ILoanInfoManagerService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * 放款管理的类
 * 
 * @author changx
 *
 */
@Controller
@RequestMapping("/loanInfo")
public class LoanInfoManagerController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(LoanInfoManagerController.class);
	
	@Resource 
	private ILoanInfoManagerService loanInfoManagerService;
	
	@Resource 
	ProcessEngine processEngine;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean loanInfoList(
			HttpSession httpSession, @RequestBody LoanInfoListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = loanInfoManagerService.getLoanInfoList(paramMap, page);
		log.debug("InterestManageList: {}", respBean);

		return respBean;
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean AddLoanInfo(
			@Valid @RequestBody LoanInfo reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = this.loanInfoManagerService.insertLoanInfo(paramMap);

		return respBean;
	}

	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean UpdateLoanInfo(
			@Valid @RequestBody LoanInfo reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.loanInfoManagerService.updateLoanInfo(reqBean);

		return respBean;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean DeleteLoanInfo(
			@Valid @RequestBody LoanInfoDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		String loanId = reqBean.getLoanId();
		respBean = this.loanInfoManagerService.deleteLoanInfo(loanId);

		return respBean;
	}
	
	
//	4.经销商类型,发起流程
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody LoanInfoProcessReqBean loanInfoProcess,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			loanInfoProcess.setUserId(userName);
			loanInfoProcess.setActivitiKey("loanInfo");
			JSONObject corpInfoStr = new JSONObject(loanInfoProcess);
			loanInfoManagerService.startProcess(corpInfoStr);
			return respBean;
	}
	
	
//	5.审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody LoanInfoAgreeReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = loanInfoManagerService.doAgree(jsonObject);
			return respBean;
	}

	
//	6.流程再申请
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody LoanInfoReApplyReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = loanInfoManagerService.reApply(jsonObject);
			return respBean;
	}
	
}
