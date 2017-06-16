package com.ut.scf.web.controller.bpm;

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
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.bpm.ExpenseListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IExpenseService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 *	对费用表进行操作
 */
@Controller
@RequestMapping("/expense")
public class ExpenseController  extends BaseJsonController{
	// LOG
		private static final Logger log = LoggerFactory
				.getLogger(ExpenseController.class);
		@Resource 
		private IExpenseService expenseService;
		@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean startSpProcess(HttpSession httpSession,
				@Valid @RequestBody ExpenseListReqBean reqBean,
				BindingResult bindingResult) throws IOException {
			BaseRespBean respBean = new BaseRespBean();
			if (bindingResult.hasErrors()) {
				log.warn("bindingResult has error");
				respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
				respBean.setResultErrorMap(bindingResult);
				return respBean;
			}
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			
			// 获取用户信息
			String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
			log.debug("corpIdSession: {}", corpIdSession);
			String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
			log.debug("userNameSession: {}", userNameSession);
			String roleIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_ROLE_ID);
			log.debug("roleIdSession: {}", roleIdSession);
			paramMap.put("corpId", corpIdSession); // 企业ID
			respBean = expenseService.getExpenseList(paramMap);
			return respBean;
		}
}
