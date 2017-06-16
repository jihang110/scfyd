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
import com.ut.scf.reqbean.pub.GaranteeMoneyAddReqBean;
import com.ut.scf.reqbean.pub.GaranteeMoneyDeleteReqBean;
import com.ut.scf.reqbean.pub.GaranteeMoneyListReqBean;
import com.ut.scf.reqbean.pub.GaranteeMoneyUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IGaranteeMoneyService;

/**
 *保证金管理的类
 * @author Yuancy
 *
 */
@Controller
@RequestMapping("/garantee")

public class GaranteeMoneyController {

	private static final Logger log = LoggerFactory
			.getLogger(GaranteeMoneyController.class);
	
	@Resource
	private IGaranteeMoneyService garanteeMoneyService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean garanteeMoneyList(HttpSession httpSession,
			@RequestBody GaranteeMoneyListReqBean reqBean, BindingResult bindingResult) {
		
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("productName",reqBean.getProductName());
		paramMap.put("productId",reqBean.getProductId());
		paramMap.put("guaranteeMoneyRate", reqBean.getGuaranteeMoneyRate());
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = garanteeMoneyService.getGaranteeMoneyList(paramMap, page);
		log.debug("garanteeMoneyList: {}", respBean);
		
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean garanteeMoneyAdd(@Valid @RequestBody GaranteeMoneyAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = this.garanteeMoneyService.insertGaranteeMoney(paramMap);
		
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean garanteeMoneyUpdate(@Valid @RequestBody GaranteeMoneyUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.garanteeMoneyService.updateGaranteeMoney(reqBean);

		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean garanteeMoneyDelete(@Valid @RequestBody GaranteeMoneyDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		String productId = reqBean.getProductId();
		respBean = this.garanteeMoneyService.deleteGaranteeMoney(productId);

		return respBean;
	}
}
