package com.ut.scf.web.controller.project;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.auto.CarInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.ICarInfoService;
import com.ut.scf.web.controller.BaseJsonController;
@Controller
@RequestMapping("/carInfo")
public class CarInfoController  extends BaseJsonController{
	@Resource ICarInfoService carInfoService;
//	流程再申请
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getCarList(HttpSession httpSession,
			@RequestBody CarInfo reqBean,
			BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
//			获取当前用户
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			carInfoService.getCarInfo(paramMap);
			return respBean;
	}
}
