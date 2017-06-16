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
import com.ut.scf.reqbean.query.OrderInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IOrderQueryService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/orderQuery")
public class OrderQueryController extends BaseJsonController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Resource
	private IOrderQueryService orderQueryService;

	@RequestMapping(value = "/orderList")
	@ResponseBody
	public BaseRespBean financeInfoList(
			@RequestBody OrderInfoListReqBean reqBean,
			BindingResult bindingResult) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean respBean = orderQueryService.orderInfoInfoList(paramMap,
				page);
		log.debug("financeInfoList: {}", respBean);

		return respBean;
	}

	// 合同内容
	@RequestMapping(value = "/contract")
	@ResponseBody
	public BaseRespBean contract(@RequestBody OrderInfoListReqBean reqBean,
			BindingResult bindingResult) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		BaseRespBean respBean = orderQueryService.repayPlanInfoList(paramMap);
		return respBean;
	}

	@RequestMapping(value = "/repayPlanList")
	@ResponseBody
	public BaseRespBean repayPlanInfoList(
			@RequestBody OrderInfoListReqBean reqBean) {
		return orderQueryService.repayPlanInfo(reqBean.getOrderBatchId());
	}
}
