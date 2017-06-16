package com.ut.scf.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.respbean.BaseRespBean;

/**
 * json控制类的基类，用于异常处理。
 * 
 * @author sunll
 *
 */
@Controller
public class BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(BaseJsonController.class);

	/**
	 * 异常处理
	 * 
	 * @param e
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	public @ResponseBody BaseRespBean exceptionHandler(Exception e) {
		log.error(e.getMessage(), e);

		BaseRespBean respBean = new BaseRespBean();

		if (e instanceof BizException) {
			respBean.setResult(((BizException) e).getErrorCodeEnum());
		} else if (e instanceof HttpMessageNotReadableException) {
			respBean.setResult(ErrorCodeEnum.REQUEST_FORMAT_ERROR);
		} else {
			respBean.setResult(ErrorCodeEnum.FAILED);
		}

		return respBean;
	}

}
