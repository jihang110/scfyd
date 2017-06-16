package com.ut.scf.web.controller.project;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.impl.cmd.GetDeploymentProcessDiagramCmd;
import org.activiti.engine.impl.interceptor.Command;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ActProcessInstanceDiagramCmd;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.pub.ProcessListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.reqbean.pub.custProcInstHistoryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.pub.ICustManagerService;
import com.ut.scf.web.controller.pub.CustManagerController;

@Controller
@RequestMapping("/activiti")
public class ActivitiController{
	private static final Logger log = LoggerFactory
			.getLogger(CustManagerController.class);
	@Resource
	private ICustManagerService custManagerService;
	@Resource
	ProcessEngine processEngine;
	@Resource
	IActivitiService activitiService;

	// 2.获取代办任务
	@RequestMapping(value = "/getAgencyTaskList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getAgencyTaskList(
			HttpSession httpSession, @RequestBody ProcessListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> map = BeanUtil.beanToMap(reqBean);
		map.put("userId", userName);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		log.debug("----");
		respBean = activitiService.getAgencyTaskList(map, page);
		return respBean;
	}

	// 获取代办任务的数量
	@RequestMapping(value = "/getAgencyTaskNum", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getAgencyTaskNum(HttpSession httpSession,
			@RequestBody ProcessListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> map = new HashMap<>();
		map.put("userId", userName);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		log.debug("----");
		respBean = activitiService.getAgencyTaskNum(map);
		return respBean;
	}

	// 查看已办任务列表
	// 2.获取代办任务
	@RequestMapping(value = "/getHandleTaskList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getHandleTaskList(
			HttpSession httpSession, @RequestBody ProcessListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> map = BeanUtil.beanToMap(reqBean);
		map.put("userId", userName);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = activitiService.getHandleTaskList(map, page);
		return respBean;
	}

	// 查看已办任务的数量
	@RequestMapping(value = "/getHandleTaskNum", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getHandleTaskNum(HttpSession httpSession,
			@RequestBody ProcessListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> map = new HashMap<>();
		map.put("userId", userName);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = activitiService.getHandleTaskNum(map);
		return respBean;
	}

	// 3.点击查看代办数据
	@RequestMapping(value = "/getTaskDataByTaskId", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getTaskDataByTaskId(
			HttpSession httpSession, @RequestBody TaskInfoReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取taskId
		String taskId = reqBean.getTaskId();
		respBean = activitiService.getDataByTaskId(taskId);
		return respBean;
	}

	// 3.点击查看代办数据 当前节点
	@RequestMapping(value = "/findDataByTaskId", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean findDataByTaskId(HttpSession httpSession,
			@RequestBody TaskInfoReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取taskId
		String taskId = reqBean.getTaskId();
		respBean = activitiService.findDataByTaskId(taskId);
		return respBean;
	}

	// 5.获取流程图
	@RequestMapping(value = "/graph", method = RequestMethod.GET)
	public void Graph(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		String processDefinitionId = request
				.getParameter("processDefinitionId");
		String processInstanceId = request.getParameter("processInstanceId");
		String taskId = request.getParameter("taskId");
		// 设置响应的类型格式为图片格式
		response.setContentType("image/jpeg");
		// 禁止图像缓存。
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setCharacterEncoding("utf-8");

		Command<InputStream> cmd = null;

		if (!processDefinitionId.equals("")) {
			cmd = new GetDeploymentProcessDiagramCmd(processDefinitionId);
		}

		if (!processInstanceId.equals("")) {
			cmd = new ActProcessInstanceDiagramCmd(processInstanceId);
		}

		if (!taskId.equals("")) {
			// Task task =
			// processEngine.getTaskService().createTaskQuery().taskId(taskId).singleResult();
			HistoricTaskInstance singleResult = processEngine
					.getHistoryService().createHistoricTaskInstanceQuery()
					.taskId(taskId).singleResult();
			cmd = new ActProcessInstanceDiagramCmd(
					singleResult.getProcessInstanceId());
		}

		if (cmd != null) {
			InputStream is = processEngine.getManagementService()
					.executeCommand(cmd);
			OutputStream toClient = response.getOutputStream();
			int len = 0;
			byte[] b = new byte[1024];
			while ((len = is.read(b, 0, 1024)) != -1) {
				toClient.write(b, 0, len);
			}
			toClient.flush();
			toClient.close();
			is.close();
		}

	}

	// 7.获取流程所有的流程变量
	@RequestMapping(value = "/getAllHistoryVariable", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getAllHistoryVariable(
			HttpSession httpSession,
			@RequestBody custProcInstHistoryReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		Map<String, Object> map = new HashMap<>();
		map.put("procInstId", reqBean.getProcInstId());
		respBean = activitiService.getAllHistoryVariable(map);
		return respBean;
	}

	// 获取历史任务列表
	@RequestMapping(value = "/getHistoryTaskList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getHistoryTaskList(
			HttpSession httpSession,
			@RequestBody custProcInstHistoryReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		Map<String, Object> map = new HashMap<>();
		map.put("procInstId", reqBean.getProcInstId());
		respBean = activitiService.getHistoryTaskList(map);
		return respBean;
	}
}
