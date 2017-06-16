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
import com.ut.scf.reqbean.query.RateInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IRateInfoQueryService;
import com.ut.scf.web.controller.BaseJsonController;
@Controller
@RequestMapping("rateInfo")
public class RateInfoQueryController extends BaseJsonController{
	
	private final Logger log =LoggerFactory.getLogger(this.getClass());
	
	@Resource
	private IRateInfoQueryService rateInfoQueryService;
	
	@RequestMapping(value = "/rateInfoList")
	@ResponseBody
	public BaseRespBean rateInfoList(
			@RequestBody RateInfoListReqBean reqBean,
			BindingResult bindingResult) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean respBean = rateInfoQueryService.getRateInfoList(paramMap,
				page);
		log.debug("rateInfoList: {}", respBean);

		return respBean;
	}
	
}
