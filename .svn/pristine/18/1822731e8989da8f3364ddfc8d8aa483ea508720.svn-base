package com.ut.scf.web.controller.sys;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.sys.UserCorpJurListReqBean;
import com.ut.scf.reqbean.sys.UserCorpJurUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IUserCorpJurService;
import com.ut.scf.web.controller.BaseJsonController;
import com.ut.scf.web.controller.asset.DunManageController;

@Controller
@RequestMapping("/userCorpJur")
public class UserCorpJurController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(DunManageController.class);
	@Resource
	private IUserCorpJurService userCorpJurService;
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getUserCorpJurList(
			HttpSession httpSession,
			@Valid @RequestBody UserCorpJurListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = userCorpJurService.getUserCorpJurList(paramMap);
		return respBean;
		
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateUserCorpJur(
			HttpSession httpSession,
			@Valid @RequestBody UserCorpJurUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = userCorpJurService.updateUserCorpJur(paramMap);
		return respBean;
		
	}
	
}
