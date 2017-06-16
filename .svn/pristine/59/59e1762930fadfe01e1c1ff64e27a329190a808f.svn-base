package com.ut.scf.core.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * 错误信息操作工具类
 * 
 * @author sunll
 *
 */
public class ErrorUtil {

	/**
	 * 使用jsr303 校验参数得到的错误信息 只有bindingResult.hasErrors()为true时，才能调用此方法
	 * 
	 * @param bindingResult
	 * @return
	 */
	public static Map<String, String> getParamValidError(
			BindingResult bindingResult) {
		Map<String, String> resultErrorMap = new HashMap<>();
		List<FieldError> fieldList = bindingResult.getFieldErrors();
		for (FieldError fieldError : fieldList) {
			// 如果一个参数有多个错误，则需要显示多个错误信息，逗号分隔
			if (resultErrorMap.containsKey(fieldError.getField())) {
				resultErrorMap.put(fieldError.getField(),
						resultErrorMap.get(fieldError.getField()) + ","
								+ fieldError.getDefaultMessage());
			} else {
				resultErrorMap.put(fieldError.getField(),
						fieldError.getDefaultMessage());
			}
		}
		return resultErrorMap;
	}

}
