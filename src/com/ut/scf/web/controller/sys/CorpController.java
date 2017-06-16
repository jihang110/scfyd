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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.reqbean.project.AgencyListReqBean;
import com.ut.scf.reqbean.project.AgencyRevenueReqBean;
import com.ut.scf.reqbean.sys.CorpAddReqBean;
import com.ut.scf.reqbean.sys.CorpDeleteReqBean;
import com.ut.scf.reqbean.sys.CorpListReqBean;
import com.ut.scf.reqbean.sys.CorpUpdateReqBean;
import com.ut.scf.reqbean.sys.UserRoleReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.ICorpService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 企业操作相关的控制类
 * 
 * @author zyx
 *
 */
@Controller
@RequestMapping("/corp")
public class CorpController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(CorpController.class);

	@Resource
	private ICorpService corpService;

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpAdd(HttpSession httpSession,
			@Valid @RequestBody CorpAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {

		// 获取用户信息
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		// 保理商类型新增
		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			if (!roleIdSession.equals(ScfBizConsts.ROLE_ID_FACTOR_ADMIN)) {
				reqBean.setCreateUserId(userIdSession);
			}
		}
		// 当系统类型为买方卖方时，才会新增部门,0为待定的
		if (reqBean.getSysType() == 4 || reqBean.getSysType() == 5
				|| reqBean.getSysType() == 0) {
			reqBean.setRelaCorpId(corpIdSession);
		}
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = this.corpService.addCorpInfo(reqBean);

		return respBean;
	}

	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpUpdate(
			@Valid @RequestBody CorpUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.corpService.updateCorp(reqBean);

		return respBean;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpDelete(
			@Valid @RequestBody CorpDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.corpService.deleteCorp(reqBean);

		return respBean;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean list(HttpSession httpSession,
			@Valid @RequestBody CorpListReqBean reqBean,
			BindingResult bindingResult) throws IOException {

		BaseRespBean respBean = new BaseRespBean();
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		reqBean.setUserId(userIdSession);
//		reqBean.setRelaCorpId(corpIdSession);
		respBean = this.corpService.corpList(reqBean);

		return respBean;
	}

	@RequestMapping(value = "/dyk")
	@ResponseBody
	public CorpInfo dyk() throws IOException {
		return corpService.coreCorpInfo();
	}

	@RequestMapping(value = "/userCorpInfo")
	@ResponseBody
	public CorpInfo userCorpInfo(@Valid @RequestBody UserRoleReqBean reqBean)
			throws IOException {
		return corpService.findCorpInfoByUserId(reqBean.getUserId());
	}
	
	@RequestMapping(value = "/agencyList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean list(@Valid @RequestBody AgencyListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = this.corpService.getAgencyInfoList(paramMap, page);

		return respBean;
	}
	
	@RequestMapping(value = "/agencyRevenue", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean list(@Valid @RequestBody AgencyRevenueReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = this.corpService.getAgencyRevenueList(paramMap, page);

		return respBean;
	}
	
}
