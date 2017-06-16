package com.ut.scf.web.controller.crm;

import java.io.IOException;
import java.util.List;
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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.crm.AffiliatedEnterpriseAddReqBean;
import com.ut.scf.reqbean.crm.AffiliatedEnterpriseListReqBean;
import com.ut.scf.reqbean.crm.AffiliatedEnterpriseUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IAffiliatedEnterpriseService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * 客户关联企业控制类
 * @author sunll
 *
 */
@Controller
@RequestMapping("/affiliatedEnterprise")
public class AffiliatedEnterpriseController extends BaseJsonController {
	
	@Resource
	private IAffiliatedEnterpriseService affiliatedEnterpriseService;
	
	private static final Logger log = LoggerFactory
			.getLogger(AffiliatedEnterpriseController.class);

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean affiliatedEnterpriseList(HttpSession httpSession,
			@RequestBody AffiliatedEnterpriseListReqBean reqBean) throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		// 获取用户信息
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		
		// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			paramMap.put("relaCorpId", corpIdSession);
			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
			paramMap.put("corpId", corpIdSession);
		}
		return affiliatedEnterpriseService.getAffiliatedEnterpriseList(paramMap);

	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean affiliatedEnterpriseAdd(HttpSession httpSession,
			@Valid @RequestBody AffiliatedEnterpriseAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("relaCorpId",
				ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId()));
		String userId = httpSession.getAttribute(ScfConsts.SESSION_USER_ID)
				.toString();
		paramMap.put("createUserId", userId);
		log.debug("userIdSession: {}", userId);
		
		respBean = affiliatedEnterpriseService.addAffiliatedEnterprise(paramMap);
		return respBean;
	}

	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean affiliatedEnterpriseUpdate(HttpSession httpSession,
			@Valid @RequestBody AffiliatedEnterpriseUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = affiliatedEnterpriseService.updateAffiliatedEnterprise(paramMap);
		return respBean;

	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean affiliatedEnterpriseDelete(HttpSession httpSession,
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		String recUid = reqBean.getRecUid();
		respBean = affiliatedEnterpriseService.deleteAffiliatedEnterprise(recUid);
		return respBean;

	}
	
}
