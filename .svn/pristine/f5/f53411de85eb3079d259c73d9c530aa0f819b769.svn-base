package com.ut.scf.web.controller.project;

import java.io.File;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.reqbean.project.RepayInfoListReqBean;
import com.ut.scf.reqbean.project.RepayProcessReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IRepayManagerService;
import com.ut.scf.web.controller.BaseJsonController;
import com.ut.scf.web.controller.pub.CustManagerController;

@Controller
@RequestMapping("/repayInfo")
public class RepayManagerController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(CustManagerController.class);

	@Resource
	private IRepayManagerService repayManagerService;

	@Resource
	private IActivitiService activitiService;

	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getRepayInfoList(
			@RequestBody RepayInfoListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = repayManagerService.getRepayList(paramMap, page);
		log.debug("getRepayList: {}", respBean);

		return respBean;
	}

	@RequestMapping(value = "/carInfoList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getCarInfoList(
			@RequestBody RepayInfoListReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = repayManagerService.getCarInfoList(paramMap);
		log.debug("getRepayList: {}", respBean);

		return respBean;
	}
	
	// 流程发起
	@RequestMapping(value = "/startProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody RepayProcessReqBean repayProcessReqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		repayProcessReqBean.setUserId(userName);
		repayProcessReqBean.setActivitiKey("dykRepayment");
		JSONObject repayInfoStr = new JSONObject(repayProcessReqBean);
		activitiService.startProcess(repayInfoStr);
		return respBean;
	}

	// 审核是否同意
	@RequestMapping(value = "/doAgree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody RepayProcessReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		boolean isProcessEnd = repayManagerService.doAgree(jsonObject);
		if (isProcessEnd) {
			// 业务数据登录
			respBean = repayManagerService.addRepayInfo(reqBean);
		}
		return respBean;
	}

	// 流程再申请
	@RequestMapping(value = "/reApply", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean reApply(HttpSession httpSession,
			@RequestBody RepayProcessReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.reApply(jsonObject);
		return respBean;
	}

	@RequestMapping(value = "/import", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean binUpload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response) {
		BaseRespBean resp = new BaseRespBean();
		// 得到文件服务器存储目录
		String uploadFilePath = getUploadFilePath(request);
		String path = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		String uploadName = file.getOriginalFilename();
		int idx = uploadName.lastIndexOf(".");
		String suffix = uploadName.substring(idx).toLowerCase();// 获得上传文件的后缀名
		if (!(".xls".equals(suffix) || ".xlsx".equals(suffix))) {
			resp.setResult(ErrorCodeEnum.EXCEL_ERROR);
			return resp;
		}
		String fileName = ScfUUID.generate() + suffix;
		File targetFile = new File(path, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}

		try {
			file.transferTo(targetFile);
			resp = repayManagerService.importExcel(fileName, targetFile);
		} catch (DataIntegrityViolationException e) {
			log.error("batchImportProfit exception", e);
			resp.setResult(ErrorCodeEnum.ADD_FAILED);
			return resp;
		} catch (Exception e) {
			log.error("parse file exception", e);
			resp.setResult(ErrorCodeEnum.FAILED);
			resp.setResultNote(e.getMessage());
			return resp;
		}

		return resp;
	}

	/**
	 * 得到文件服务器存储目录
	 * 
	 * @param request
	 * @return
	 */
	private String getUploadFilePath(HttpServletRequest request) {
		// 得到路径规则
		int pathId = 0; // 通用目录
		try {
			pathId = Integer.parseInt(request.getParameter("pathId"));
		} catch (Exception e) {
			log.warn("parse file path exception", e);
		}

		// 如果字典中没有目录规则，选择通用目录
		String uploadFilePath;
		if (!ScfCacheDict.uploadFilePathMap.containsKey(pathId)) {
			uploadFilePath = "uploadFile/common/";
		} else {
			uploadFilePath = ScfCacheDict.uploadFilePathMap.get(pathId)
					.getPathRule();
		}

		return uploadFilePath;
	}

}
