package com.ut.scf.web.controller.project;

import java.io.IOException;
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

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.ContractFileReqBean;
import com.ut.scf.reqbean.project.ContractReqBean;
import com.ut.scf.reqbean.project.ContractUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IContractMagagerService;

@Controller
@RequestMapping("/contract")
public class ContractManagerController {
	@Resource
	private IContractMagagerService contractMagagerService;
	@Resource
	private IActivitiService activitiService;

	private Logger log = LoggerFactory.getLogger(this.getClass());

	// 1.发起流程
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody ContractReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		reqBean.setActivitiKey("contractManager");
		JSONObject contactInfo = new JSONObject(reqBean);
		log.debug("corpInfoStr: {}", contactInfo);
		activitiService.startProcess(contactInfo);
		return respBean;
	}

	// 5.审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody ContractReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.doAgree(jsonObject);
		return respBean;
	}

	// 6.流程再申请
	@RequestMapping(value = "/reApply")
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody ContractReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.reApply(jsonObject);
		return respBean;
	}

	@RequestMapping(value = "/add")
	public @ResponseBody BaseRespBean contractAdd(
			@RequestBody ContractReqBean contractReqBean) throws IOException {
		Map<String, Object> map = BeanUtil.beanToMap(contractReqBean);
		BaseRespBean respBean = contractMagagerService.addFactorContract(map);

		return respBean;
	}

	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean contractMod(
			@Valid @RequestBody ContractUpdateReqBean contractUpdateReqBean)
			throws IOException {
		BaseRespBean respBean = contractMagagerService
				.modFactorContract(contractUpdateReqBean);

		return respBean;
	}

	@RequestMapping(value = "/list")
	public @ResponseBody BaseRespBean contractList(
			@Valid @RequestBody ContractReqBean contractReqBean)
			throws IOException {
		BaseRespBean respBean = contractMagagerService
				.factorContractList(contractReqBean);

		return respBean;
	}

	@RequestMapping(value = "/fileList")
	public @ResponseBody BaseRespBean contractFileList(
			@Valid @RequestBody ContractFileReqBean contractReqBean)
			throws IOException {
		BaseRespBean respBean = contractMagagerService
				.factorContractFileList(contractReqBean);

		return respBean;
	}

	@RequestMapping(value = "/check")
	public @ResponseBody BaseRespBean checkFactorContract(
			@RequestBody ContractReqBean ContractReqBean) throws IOException {
		BaseRespBean respBean = contractMagagerService
				.checkFactorContact(ContractReqBean);

		return respBean;
	}

	@RequestMapping(value = "/checkDyk")
	public @ResponseBody BaseRespBean checkFactorContractDYK(
			@RequestBody ContractReqBean ContractReqBean) throws IOException {
		BaseRespBean respBean = contractMagagerService
				.checkFactorContactDYK(ContractReqBean);

		return respBean;
	}
}
