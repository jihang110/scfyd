package com.ut.scf.web.controller.pub;


import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.dao.pub.IStuInfoDao;
import com.ut.scf.reqbean.pub.StuDetailListReqBean;
import com.ut.scf.reqbean.pub.StuInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IStuManagerService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * 学生信息查看的类
 * @author Yuancy
 *
 */
@Controller
@RequestMapping("/stuInfo")
public class StuManagerController extends  BaseJsonController{
	
	private static final Logger log = LoggerFactory
			.getLogger(StuManagerController.class);
	
	@Resource
	private IStuManagerService stuManagerService;
	
	@Resource
	private IStuInfoDao stuInfoDao;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getStuInfoList(HttpSession httpSession,
			@RequestBody StuInfoListReqBean reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = stuManagerService.getStuInfoList(reqBean);
		log.debug("getStuInfoList: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getStuDetailList(@RequestBody StuDetailListReqBean reqBean,BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		respBean = stuManagerService.getStuDetailList(reqBean);
		log.debug("getStuDetailList: {}", respBean);
		return respBean;
	}
}
