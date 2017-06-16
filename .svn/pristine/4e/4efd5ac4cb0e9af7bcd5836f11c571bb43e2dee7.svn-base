package com.ut.scf.web.interceptor;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.JsonUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.reqbean.BaseReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IUserOperService;

/**
 * 业务日志拦截器
 * 
 * @author sunll
 *
 */
@Component
@Aspect
public class BizLogInterceptor {

	private static final Logger log = LoggerFactory
			.getLogger(BizLogInterceptor.class);

	@Autowired
	private HttpSession httpSession;

	@Autowired
	private HttpServletRequest request;

	@Resource
	private IUserOperService userOperService;

	/**
	 * Pointcut 定义Pointcut，Pointcut的名称为init()，此方法没有返回值和参数 该方法就是一个标识，不进行调用
	 */
	@Pointcut("execution(public * com.ut.scf.web.controller..*.*(..))")
	private void init() {
	};

	/**
	 * Around 手动控制调用核心业务逻辑，以及调用前和调用后的处理,
	 * 
	 * 注意：当核心业务抛异常后，立即退出，转向AfterAdvice 执行完AfterAdvice，再转到ThrowingAdvice
	 * 
	 * @param pjp
	 * @return
	 * @throws Throwable
	 */
	@Around(value = "init()")
	public Object aroundAdvice(ProceedingJoinPoint pjp) throws Throwable {
		Object[] args = pjp.getArgs();
		for (Object object : args) {
			if (object instanceof BaseReqBean) {
				log.info("<-----REQUEST-----> {}",
						JsonUtil.writeValueAsString(object));
			}
		}

		// 调用核心逻辑
		Object retVal = pjp.proceed();
		if (retVal instanceof BaseRespBean) {
			log.info("<-----RESPONSE-----> {}",
					JsonUtil.writeValueAsString(retVal));

			// 登陆日志
			if (((BaseRespBean) retVal).getResult() == ErrorCodeEnum.SUCCESS
					.getValue()) {
				String userId = (String) httpSession
						.getAttribute(ScfConsts.SESSION_USER_ID);
				String interfaceId = request.getRequestURI() + "_"
						+ request.getMethod();
				String interFaceName = ScfCacheDict.interfaceMap
						.containsKey(interfaceId) ? ScfCacheDict.interfaceMap
						.get(interfaceId).getInterfaceName() : null;
				if (StringUtils.isNotBlank(userId)
						&& StringUtils.isNotBlank(interFaceName)) {
					Map<String, Object> logParamMap = new HashMap<>();
					String time = DateFormatUtils.format(Calendar.getInstance()
							.getTime(), ScfConsts.DATETIME_FORMAT);
					String userName = (String) httpSession
							.getAttribute(ScfConsts.SESSION_USERNAME);
					String content = "用户" + userName + "在" + time + "进行了"
							+ interFaceName + "操作";
					String ip = request.getRemoteAddr();
					logParamMap.put("logId", ScfUUID.generate());
					logParamMap.put("userId", userId);
					logParamMap.put("interfaceId", interfaceId);
					logParamMap.put("ip", ip);
					logParamMap.put("content", content);
					log.debug("logParamMap : {}", logParamMap);
					userOperService.insertBizLog(logParamMap);
				}
			}
		}

		return retVal;
	}

}
