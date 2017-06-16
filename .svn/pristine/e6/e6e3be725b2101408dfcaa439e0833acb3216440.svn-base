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
import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.pojo.auto.LoanInfo;
import com.ut.scf.reqbean.pub.DykRateListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IDykRateService;
import com.ut.scf.web.controller.BaseJsonController;
@Controller
@RequestMapping("/dykRate")
public class DykRateController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(DykRateController.class);

	@Resource
	private IDykRateService dykRateService;

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean DykRateList(
			HttpSession httpSession, @RequestBody DykRateListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = dykRateService.getDykRateList(paramMap, page);
		log.debug("DykRateList: {}", respBean);

		return respBean;
	}
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean UpdateDykRate(
			@Valid @RequestBody DykRate reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.dykRateService.updateDykRate(reqBean);

		return respBean;
	}
	
}
