package com.ut.scf.web.controller.crm;

import java.io.IOException;
import java.util.List;
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

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.crm.PurchasingRiskAnalyAddReqBean;
import com.ut.scf.reqbean.crm.PurchasingRiskAnalyListReqBean;
import com.ut.scf.reqbean.crm.PurchasingRiskAnalyUpdateReqBean;
import com.ut.scf.reqbean.crm.SupplierTradeAddReqBean;
import com.ut.scf.reqbean.crm.SupplierTradeListReqBean;
import com.ut.scf.reqbean.crm.SupplierTradeUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ISupplierTradeService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * 供应商采购及付款明细
 * @author jihang
 *
 */
@Controller
@RequestMapping("/supplierTrade")
public class SupplierTradeController extends BaseJsonController{
	
	@Resource private ISupplierTradeService supplierTradeService;
	private static final Logger log = LoggerFactory
			.getLogger(SupplierTradeController.class);

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean SupplierTradeList(
			HttpSession httpSession,
			@RequestBody SupplierTradeListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
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
		// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
		// 保理商类型下，保理商管理员可以查看所有数据，其他角色只能查看自己的业务数据
		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			paramMap.put("relaCorpId", corpIdSession);
//			if (!roleIdSession.equals(ScfBizConsts.ROLE_ID_FACTOR_ADMIN)) {
//				paramMap.put("createUserId", userIdSession);
//			}
			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
			paramMap.put("corpId", corpIdSession);
		}
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = supplierTradeService.getSupplierTradeList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean SupplierTradeAdd(HttpSession httpSession,
			@RequestBody SupplierTradeAddReqBean reqBean, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("relaCorpId", ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId()));
		if(ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId())!=null||ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId())!=""){
			paramMap.put("isRelaCorp", 1);
		}else{
			paramMap.put("isRelaCorp", 0);
		}
		String userId = httpSession.getAttribute(ScfConsts.SESSION_USER_ID).toString();
		log.debug("userIdSession: {}", userId);
		paramMap.put("createUserId", userId);
		respBean = supplierTradeService.insertSupplierTrade(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean SupplierTradeDelete(HttpSession httpSession,
			@RequestBody RecUidReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = supplierTradeService.deleteSupplierTrade(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean SupplierTradeUpdate(HttpSession httpSession,
			@RequestBody SupplierTradeUpdateReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = supplierTradeService.updateSupplierTrade(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/riskAnalyList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PurchasingRiskAnalyList(HttpSession httpSession,
			@RequestBody PurchasingRiskAnalyListReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
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
				// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
				// 保理商类型下，保理商管理员可以查看所有数据，其他角色只能查看自己的业务数据
				if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
					paramMap.put("relaCorpId", corpIdSession);
	/*				if (!roleIdSession.equals(ScfBizConsts.ROLE_ID_FACTOR_ADMIN)) {
						paramMap.put("createUserId", userIdSession);
					}*/
					List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
					String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
					paramMap.put("userCorpList", userCorpStr);
				} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
					paramMap.put("corpId", corpIdSession);
				}
				PageInfoBean page = new PageInfoBean();
				page.setPageNumber(reqBean.getPageNumber());
				page.setPageSize(reqBean.getPageSize());
		respBean = supplierTradeService.getPurchasingRiskAnalyList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/riskAnalyAdd", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PurchasingRiskAnalyAdd(HttpSession httpSession,
			@RequestBody PurchasingRiskAnalyAddReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("relaCorpId", ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId()));
		String userId = httpSession.getAttribute(ScfConsts.SESSION_USER_ID).toString();
		log.debug("userIdSession: {}", userId);
		paramMap.put("createUserId", userId);
		respBean = supplierTradeService.insertPurchasingRiskAnaly(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/riskAnalyMod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PurchasingRiskAnalyUpdate(HttpSession httpSession,
			@RequestBody PurchasingRiskAnalyUpdateReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = supplierTradeService.updatePurchasingRiskAnaly(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/riskAnalyDelete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PurchasingRiskAnalyDelete(HttpSession httpSession,
			@RequestBody RecUidReqBean reqBean, BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = supplierTradeService.deletePurchasingRiskAnaly(recUid);
		return respBean;
	}
		
}
