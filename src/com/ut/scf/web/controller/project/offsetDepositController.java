package com.ut.scf.web.controller.project;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.project.offsetDepositAgreeReqBean;
import com.ut.scf.reqbean.project.offsetDepositCarInfoReqBean;
import com.ut.scf.reqbean.project.offsetDepositReapplyReqBean;
import com.ut.scf.reqbean.project.offsetDepositStartReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IOffsetDepositService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 *	保证金冲抵
 */
@Controller
@RequestMapping("/offsetDeposit")
public class offsetDepositController extends BaseJsonController{
	@Resource private IActivitiService activitiService;
	@Resource private IOffsetDepositService offsetDepositService;
//	发起流程
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody offsetDepositStartReqBean reqBean,BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			reqBean.setActivitiKey("OffsetDeposit");
			JSONObject reqBeanStr = new JSONObject(reqBean);
			activitiService.startProcess(reqBeanStr);
			return respBean;
	}
	
//	审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody offsetDepositAgreeReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = activitiService.doAgree(jsonObject);
			return respBean;
	}

	
//	流程再申请
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody offsetDepositReapplyReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			String userName = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USERNAME);
			reqBean.setUserId(userName);
			JSONObject jsonObject = new JSONObject(reqBean);
			respBean = activitiService.reApply(jsonObject);
			return respBean;
	}
	
	
//	获取车辆明细
	@RequestMapping(value = "/getCarInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getCarInfo(HttpSession httpSession,
			@RequestBody offsetDepositCarInfoReqBean reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			respBean=offsetDepositService.getCarInfo(paramMap);
			return respBean;
	}
}
