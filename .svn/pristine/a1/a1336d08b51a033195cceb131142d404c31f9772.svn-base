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
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.sys.HomeInfoUserDefineAddReqBean;
import com.ut.scf.reqbean.sys.HomeInfoUserDefineListReqBean;
import com.ut.scf.reqbean.sys.HomeInfoUserDefineUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IHomeInfoUserDefineService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 *	首页用户信息配置
 */
@Controller
@RequestMapping("/homeInfo")
public class HomeInfoUserDefineController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(ClassNewsController.class);
	@Resource private IHomeInfoUserDefineService homeInfoUserDefineService;
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean HomeInfoUserDefineList(HttpSession httpSession,@Valid @RequestBody HomeInfoUserDefineListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		//paramMap.put("userId", userIdSession);
		PageInfoBean page = new PageInfoBean();
		respBean = homeInfoUserDefineService.getHomeInfoUserDefineList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean HomeInfoUserDefineAdd(HttpSession httpSession,@Valid @RequestBody HomeInfoUserDefineAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("userId", userIdSession);
		respBean = homeInfoUserDefineService.addHomeInfoUserDefine(paramMap);
		return respBean;
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean HomeInfoUserDefineDelete(HttpSession httpSession,@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = homeInfoUserDefineService.deleteHomeInfoUserDefine(recUid);
		return respBean;
	}
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean HomeInfoUserDefineUpdate(HttpSession httpSession,@Valid @RequestBody HomeInfoUserDefineUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		
		// 获取用户信息
				String userIdSession = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USER_ID);
				log.debug("userIdSession: {}", userIdSession);
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("userId", userIdSession);
		respBean = homeInfoUserDefineService.updateHomeInfoUserDefine(paramMap);
		return respBean;
	}
}
