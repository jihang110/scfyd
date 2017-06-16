package com.ut.scf.web.controller.query;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.FinanceInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IFinanceQueryService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/financeQuery")
public class FinanceQueryController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(FinanceQueryController.class);

	@Resource
	private IFinanceQueryService financeQueryService;

	@RequestMapping(value = "/carList")
	@ResponseBody
	public BaseRespBean list(@Valid @RequestBody FinanceInfoListReqBean reqBean)
			throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		respBean = financeQueryService.carInfoList(reqBean.getFinanceId());
		return respBean;
	}

	@RequestMapping(value = "/marginList")
	@ResponseBody
	public BaseRespBean financeInfoList(
			@RequestBody FinanceInfoListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = financeQueryService.guaranteeInfoInfoList(paramMap, page);
		log.debug("financeInfoList: {}", respBean);

		return respBean;
	}
}
