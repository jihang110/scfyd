package com.ut.scf.web.controller.project;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.FinanceInfoListReqBean;
import com.ut.scf.reqbean.project.RevenueListReqBean;
import com.ut.scf.reqbean.pub.GuaranteeInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.ICountAnalyseService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/CountAnalyse")
public class CountAnalyseController  extends BaseJsonController{
	@Resource ICountAnalyseService CountAnalyseService;
	private static final Logger log = LoggerFactory.getLogger(CountAnalyseController.class);
	
	@RequestMapping(value = "/financeInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getFinanceInfo(HttpSession httpSession,
			@RequestBody FinanceInfoListReqBean reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		log.debug("getFinanceList: {}", respBean);
		Map<String, Object> Map = BeanUtil.beanToMap(reqBean);
		respBean = CountAnalyseService.getFinanceCountInfo(Map);
		return respBean;
	}
	

	@RequestMapping(value = "/revenueInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getRevenueInfo(HttpSession httpSession,
			@RequestBody RevenueListReqBean reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		log.debug("getRevenueList: {}", respBean);
		Map<String, Object> Map = BeanUtil.beanToMap(reqBean);
		respBean = CountAnalyseService.getRevenueCountInfo(Map);
		return respBean;
	}
	
	@RequestMapping(value = "/guaranteeInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getRevenueInfo(HttpSession httpSession,
			@RequestBody GuaranteeInfoReqBean reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		log.debug("getGuaranteeInfo: {}", respBean);
		Map<String, Object> Map = BeanUtil.beanToMap(reqBean);
		respBean = CountAnalyseService.getGuarantInfo(Map);
		return respBean;
	}
}
