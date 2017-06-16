package com.ut.scf.web.controller.query;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.query.GuaranteeQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IGuaranteeQueryService;

@Controller
@RequestMapping("/guaranteeQuery")
public class GuaranteeQueryController {

	private static final Logger log = LoggerFactory
			.getLogger(GuaranteeQueryController.class);
	
	@Resource
	private IGuaranteeQueryService guaranteeQueryService;
	
	@RequestMapping(value = "/list")
	@ResponseBody
	public BaseRespBean getGuaranteeQueryList(
			@RequestBody GuaranteeQueryReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = guaranteeQueryService.getGuaranteeQueryList(paramMap, page);
		log.debug("getGuaranteeQueryList: {}", respBean);

		return respBean;
	}
}
