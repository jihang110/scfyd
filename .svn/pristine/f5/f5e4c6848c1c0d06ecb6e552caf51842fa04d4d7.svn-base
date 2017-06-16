package com.ut.scf.web.controller.pub;

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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.pub.ImAddReqBean;
import com.ut.scf.reqbean.pub.ImDeleteReqBean;
import com.ut.scf.reqbean.pub.ImListReqBean;
import com.ut.scf.reqbean.pub.ImUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.InterestManageService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 息费管理的类
 * 
 * @author changx
 *
 */
@Controller
@RequestMapping("/im")
public class InterestManageController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(InterestManageController.class);

	@Resource
	private InterestManageService interestManageService;

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InterestManageList(
			HttpSession httpSession, @RequestBody ImListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = interestManageService.getInterestManageList(paramMap, page);
		log.debug("InterestManageList: {}", respBean);

		return respBean;
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InterestManageAdd(
			@Valid @RequestBody ImAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = this.interestManageService.insertInterestManage(paramMap);

		return respBean;
	}

	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean ImUpdate(
			@Valid @RequestBody ImUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = this.interestManageService.updateInterestManage(reqBean);
		return respBean;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean ImDelete(
			@Valid @RequestBody ImDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = this.interestManageService.deleteInterestManage(recUid);
		return respBean;
	}
}
