package com.ut.scf.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.JsonUtil;
import com.ut.scf.respbean.BaseRespBean;

public class LoginHandlerInterceptor extends HandlerInterceptorAdapter {

	private static final Logger log = LoggerFactory
			.getLogger(LoginHandlerInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		log.debug("-----------LoginHandlerInterceptor preHandle-----------");
		log.info("*******request func**********" + request.getRequestURI() + "_" + request.getMethod());
		
		String userId = (String) request.getSession().getAttribute(ScfConsts.SESSION_USER_ID);
		String roleId = (String) request.getSession().getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("*******userId**********" + userId);
		log.debug("*******username**********" + (String) request.getSession().getAttribute(ScfConsts.SESSION_USERNAME));
		log.debug("*******roleId**********" + roleId);
		log.debug("*******roleName**********" + (String) request.getSession().getAttribute(ScfConsts.SESSION_ROLE_NAME));
		
		// session中是否有用户登录信息
		if (StringUtils.isNotBlank(userId) && StringUtils.isNotBlank(roleId)) {
			return true;
		}
		
		// 设置未登录或登录超时信息
		BaseRespBean respBean = new BaseRespBean();
		respBean.setResult(ErrorCodeEnum.USER_NOT_SIGNIN);
		String outStr = JsonUtil.writeValueAsString(respBean);
		log.debug(outStr);
		
		response.setContentType(ScfConsts.CONTENT_TYPE_JSON_UTF8);
		response.setCharacterEncoding(ScfConsts.UTF8_ENCODING);
		response.setStatus(ScfConsts.HTTP_STATUS_OK); // 设置返回状态为OK
		response.getWriter().write(outStr);
		response.getWriter().close();
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}

}
