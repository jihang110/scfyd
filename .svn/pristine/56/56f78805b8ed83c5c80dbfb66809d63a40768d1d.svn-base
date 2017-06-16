package com.ut.scf.web.controller.sys;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Level;
import org.apache.log4j.LogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;
import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.EncryptUtil;
import com.ut.scf.core.util.JsonUtil;
import com.ut.scf.core.util.LoginCodeUtil;
import com.ut.scf.reqbean.BaseReqBean;
import com.ut.scf.reqbean.LogReqBean;
import com.ut.scf.reqbean.sys.LoginPhoneReqBean;
import com.ut.scf.reqbean.sys.PhoneReqBean;
import com.ut.scf.reqbean.sys.UserLoginReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.LogRespBean;
import com.ut.scf.respbean.sys.UserLoginRespBean;
import com.ut.scf.service.sys.IUserOperService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 登录相关的控制类
 * 
 * @author sunll
 *
 */
@Controller
public class LoginController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(LoginController.class);

	@Resource
	private IUserOperService userOperService;

	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean login(HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody UserLoginReqBean userLogin,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		// 从session中取校验码，校验是否正确或过期。
		String loginCodeSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_LOGIN_CODE);
		Date loginCodeExpireTime = (Date) httpSession
				.getAttribute(ScfConsts.SESSION_LOGIN_CODE_EXPIRE_TIME);
		log.debug("loginCodeSession " + loginCodeSession);
		log.debug("loginCodeExpireTime " + loginCodeExpireTime);
		if(StringUtils.isBlank(loginCodeSession)){
			respBean.setResult(ErrorCodeEnum.LOGIN_CODE_EXPIRE);
			return respBean;
		}else{
			if (!userLogin.getCode().equalsIgnoreCase(loginCodeSession)) {
				respBean.setResult(ErrorCodeEnum.LOGIN_CODE_ERROR);
				return respBean;
			}
			if (loginCodeExpireTime == null
					|| (Calendar.getInstance().getTimeInMillis()
							- loginCodeExpireTime.getTime() > 60 * 1000)) {
				respBean.setResult(ErrorCodeEnum.LOGIN_CODE_EXPIRE);
				return respBean;
			}
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(userLogin);
		respBean = this.userOperService.userLogin(paramMap);

		// session存放用户相关信息
		if (respBean.getResult() == ErrorCodeEnum.SUCCESS.getValue()) {
			setUserSession((UserLoginRespBean) respBean, httpSession);

			// 登陆成功，清除验证码
			httpSession.removeAttribute(ScfConsts.SESSION_LOGIN_CODE);
			httpSession.removeAttribute(ScfConsts.SESSION_LOGIN_CODE_EXPIRE_TIME);
		}

		return respBean;
	}

	/**
	 * 设置session存放用户信息
	 * 
	 * @param respBean
	 * @param httpSession
	 */
	private void setUserSession(UserLoginRespBean respBean,
			HttpSession httpSession) {
		httpSession.setAttribute(ScfConsts.SESSION_USER_ID,
				respBean.getUserId());
		httpSession.setAttribute(ScfConsts.SESSION_USERNAME,
				respBean.getUsername());
		httpSession.setAttribute(ScfConsts.SESSION_ROLE_ID,
				respBean.getRoleId());
		httpSession.setAttribute(ScfConsts.SESSION_ROLE_NAME,
				respBean.getRoleName());
		httpSession.setAttribute(ScfConsts.SESSION_ROLE_TYPE,
				respBean.getRoleType());
		httpSession.setAttribute(ScfConsts.SESSION_CORP_ID,
				respBean.getCorpId());
		httpSession.setAttribute(ScfConsts.SESSION_DEPT_ID,
				respBean.getDeptId());
		httpSession.setAttribute(ScfConsts.SESSION_MENU_LIST,
				respBean.getMenuList());
	}

	@RequestMapping(value = "/login/code", method = RequestMethod.GET)
	public void loginCode(HttpSession httpSession, HttpServletResponse response)
			throws IOException {
		// 获取登录验证码，设置过期时间,1分钟到期
		LoginCodeUtil vCode = new LoginCodeUtil();
		Date loginCodeExpireTime = DateUtils.addMinutes(Calendar.getInstance()
				.getTime(), 1);
		httpSession.setAttribute(ScfConsts.SESSION_LOGIN_CODE, vCode.getCode());
		httpSession.setAttribute(ScfConsts.SESSION_LOGIN_CODE_EXPIRE_TIME,
				loginCodeExpireTime);
		log.debug("loginCode " + vCode.getCode());
		log.debug("loginCodeExpireTime " + loginCodeExpireTime);

		// 设置响应的类型格式为图片格式
		response.setContentType("image/jpeg");
		// 禁止图像缓存。
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		vCode.write(response.getOutputStream());
	}

	@RequestMapping(value = "/login/phone", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean loginPhone(HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody LoginPhoneReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		// 从session中取校验码，校验是否正确或过期。
		String loginPhoneCodeSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE);
		Date loginPhoneCodeExpireTime = (Date) httpSession
				.getAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE_EXPIRE_TIME);
		log.debug("loginPhoneCodeSession " + loginPhoneCodeSession);
		log.debug("loginPhoneCodeExpireTime " + loginPhoneCodeExpireTime);

		if (StringUtils.isBlank(loginPhoneCodeSession)
				|| !reqBean.getCode().equalsIgnoreCase(loginPhoneCodeSession)) {
			respBean.setResult(ErrorCodeEnum.LOGIN_CODE_ERROR);
			return respBean;
		}
		if (loginPhoneCodeExpireTime == null
				|| (Calendar.getInstance().getTimeInMillis()
						- loginPhoneCodeExpireTime.getTime() > 60 * 1000)) {
			respBean.setResult(ErrorCodeEnum.LOGIN_CODE_EXPIRE);
			return respBean;
		}

		respBean = this.userOperService.userPhoneLogin(reqBean.getPhone());

		// session存放用户相关信息
		if (respBean.getResult() == ErrorCodeEnum.SUCCESS.getValue()) {
			setUserSession((UserLoginRespBean) respBean, httpSession);

			// 登陆成功，清除验证码
			httpSession.removeAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE);
			httpSession.removeAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE_EXPIRE_TIME);
		}

		return respBean;
	}

	@RequestMapping(value = "/login/phoneCode", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean loginPhoneCode(HttpServletRequest request, HttpSession httpSession,
			@Valid @RequestBody PhoneReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		// 查找手机号对应的用户是否存在
		int countUserByPhone = userOperService.countUserByPhone(reqBean.getPhone());
		if (countUserByPhone < 1) {
			respBean.setResult(ErrorCodeEnum.PHONE_NOT_REGISTER);
			return respBean;
		} else if (countUserByPhone > 1) {
			respBean.setResult(ErrorCodeEnum.PHONE_EXIST_ABNORMAL);
			return respBean;
		}
		
		// 获取手机验证码
		String phoneCode = EncryptUtil.generalVerifyCode();
		log.info("login phone code is : {}", phoneCode);
		
		// 发送短信
		TaobaoClient smsClient = new DefaultTaobaoClient(
				ScfCacheDict.sysConfigMap.get("taobaoApiURL"),
				ScfCacheDict.sysConfigMap.get("taobaoAppkey"),
				ScfCacheDict.sysConfigMap.get("taobaoSecret"));
		AlibabaAliqinFcSmsNumSendRequest smsReq = new AlibabaAliqinFcSmsNumSendRequest();
		smsReq.setSmsType("normal");// 标准的短信
		smsReq.setSmsFreeSignName("信雅达保理云");// 短信签名
		smsReq.setRecNum(reqBean.getPhone());
		smsReq.setSmsTemplateCode("SMS_26045244");// 手机登录验证码模版
		smsReq.setSmsParam("{\"code\":'" + phoneCode + "'}");
		try {
			AlibabaAliqinFcSmsNumSendResponse response = smsClient.execute(smsReq, "");
			String jsonRespStr = response.getBody();
			log.info("send sms response : {}", jsonRespStr);
			Map<?, ?> mapResp = JsonUtil.readValue(jsonRespStr, Map.class);
			if (!(boolean)((Map<?, ?>)((Map<?, ?>)mapResp.get("alibaba_aliqin_fc_sms_num_send_response")).get("result")).get("success")) {
				respBean.setResult(ErrorCodeEnum.SEND_SMS_FAILED);
				return respBean;
			}
		} catch (Exception e) {
			log.error("send sms failed!", e);
			respBean.setResult(ErrorCodeEnum.SEND_SMS_FAILED);
			return respBean;
		}
		
		// 手机验证码存储于session中
		Date loginCodeExpireTime = DateUtils.addMinutes(Calendar.getInstance()
				.getTime(), 1);
		httpSession.setAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE, phoneCode);
		httpSession.setAttribute(ScfConsts.SESSION_LOGIN_PHONE_CODE_EXPIRE_TIME,
				loginCodeExpireTime);
		
		return respBean;
	}

	/**
	 * 发送在线签约验证码
	 * @param request
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/login/signPhoneCode", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean signPhoneCode(HttpServletRequest request, HttpSession httpSession,
			@Valid @RequestBody PhoneReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		// 获取手机验证码
		String phoneCode = EncryptUtil.generalVerifyCode();
		log.info("onlineSign phone code is : {}", phoneCode);
		
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		
		// 发送短信
		TaobaoClient smsClient = new DefaultTaobaoClient(
				ScfCacheDict.sysConfigMap.get("taobaoApiURL"),
				ScfCacheDict.sysConfigMap.get("taobaoAppkey"),
				ScfCacheDict.sysConfigMap.get("taobaoSecret"));
		AlibabaAliqinFcSmsNumSendRequest smsReq = new AlibabaAliqinFcSmsNumSendRequest();
		smsReq.setSmsType("normal");// 标准的短信
		smsReq.setSmsFreeSignName("信雅达保理云");// 短信签名
		smsReq.setRecNum(reqBean.getPhone());
		smsReq.setSmsTemplateCode("SMS_42760093");// 在线签约验证码模版
		smsReq.setSmsParam("{\"name\":'" + userNameSession + "',\"code\":'" + phoneCode + "'}");
		try {
			AlibabaAliqinFcSmsNumSendResponse response = smsClient.execute(smsReq, "");
			String jsonRespStr = response.getBody();
			log.info("send sms response : {}", jsonRespStr);
			Map<?, ?> mapResp = JsonUtil.readValue(jsonRespStr, Map.class);
			if (!(boolean)((Map<?, ?>)((Map<?, ?>)mapResp.get("alibaba_aliqin_fc_sms_num_send_response")).get("result")).get("success")) {
				respBean.setResult(ErrorCodeEnum.SEND_SMS_FAILED);
				return respBean;
			}
		} catch (Exception e) {
			log.error("send sms failed!", e);
			respBean.setResult(ErrorCodeEnum.SEND_SMS_FAILED);
			return respBean;
		}
		
		// 手机验证码存储于session中
		Date loginCodeExpireTime = DateUtils.addMinutes(Calendar.getInstance()
				.getTime(), 5);
		httpSession.setAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE, phoneCode);
		httpSession.setAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE_EXPIRE_TIME,
				loginCodeExpireTime);
		
		return respBean;
	}
	/**
	 * 验证在线签约验证码
	 * @param request
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/login/signPhoneCheck", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean signPhoneCheck(HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody LoginPhoneReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		// 从session中取校验码，校验是否正确或过期。
		String signPhoneCodeSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE);
		Date signPhoneCodeExpireTime = (Date) httpSession
				.getAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE_EXPIRE_TIME);
		log.debug("signPhoneCodeSession " + signPhoneCodeSession);
		log.debug("signPhoneCodeExpireTime " + signPhoneCodeExpireTime);

		if (StringUtils.isBlank(signPhoneCodeSession)
				|| !reqBean.getCode().equalsIgnoreCase(signPhoneCodeSession)) {
			respBean.setResult(ErrorCodeEnum.LOGIN_CODE_ERROR);
			return respBean;
		}
		if (signPhoneCodeExpireTime == null
				|| (Calendar.getInstance().getTimeInMillis()
						- signPhoneCodeExpireTime.getTime() > 60 * 1000)) {
			respBean.setResult(ErrorCodeEnum.LOGIN_CODE_EXPIRE);
			return respBean;
		}else{
			respBean.setResult(ErrorCodeEnum.SUCCESS);
		}

		// session存放用户相关信息
		if (respBean.getResult() == ErrorCodeEnum.SUCCESS.getValue()) {
			// 验证成功，清除验证码
			httpSession.removeAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE);
			httpSession.removeAttribute(ScfConsts.SESSION_SIGN_PHONE_CODE_EXPIRE_TIME);
		}

		return respBean;
	}

	@RequestMapping(value = "/login/logout", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean logout(HttpSession httpSession,
			@RequestBody BaseReqBean reqBean) throws IOException {
		if (httpSession != null) {
			httpSession.invalidate();
		}
		BaseRespBean respBean = new BaseRespBean();
		return respBean;
	}

	@RequestMapping(value = "/login/logDetail", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean logDetail(@RequestBody BaseReqBean reqBean)
			throws IOException {
		LogRespBean respBean = new LogRespBean();
		respBean.setLogLevel(LogManager.getRootLogger().getLevel().toString());
		return respBean;
	}

	@RequestMapping(value = "/login/setLog", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean setLog(
			@Valid @RequestBody LogReqBean reqBean, BindingResult bindingResult)
			throws IOException {
		if (bindingResult.hasErrors()) {
			BaseRespBean respBean = new BaseRespBean();
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		// 设置日志级别
		log.info("LogManager RootLogger setLevel to {}", reqBean.getLogLevel());
		LogManager.getRootLogger().setLevel(
				Level.toLevel(reqBean.getLogLevel()));

		LogRespBean respBean = new LogRespBean();
		respBean.setLogLevel(LogManager.getRootLogger().getLevel().toString());
		return respBean;
	}

}
