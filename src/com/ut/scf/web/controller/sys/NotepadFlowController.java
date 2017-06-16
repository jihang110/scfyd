package com.ut.scf.web.controller.sys;

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
import com.ut.scf.reqbean.BaseReqBean;
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.sys.NotepadFlowAddReqBean;
import com.ut.scf.reqbean.sys.NotepadFlowListReqBean;
import com.ut.scf.reqbean.sys.NotepadFlowUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.INotepadFlowService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 *	用户日历记事的控制类
 */
@Controller
@RequestMapping(value = "/notepadFlow")
public class NotepadFlowController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(NotepadFlowController.class);
	@Resource private INotepadFlowService notepadFlowService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean NotepadFlowList(
			HttpSession httpSession,
			@Valid @RequestBody NotepadFlowListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		/*
		 * 本人的id
		 */
		if(reqBean.getUserId()==null){
			paramMap.put("userId", userIdSession);
		}
		respBean = notepadFlowService.getNotepadFlowList(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean NotepadFlowAdd(
			HttpSession httpSession,
			@Valid @RequestBody NotepadFlowAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		String userIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		/*
		 * userId暂时是自己的id
		 */
		paramMap.put("userId", userIdSession);
		paramMap.put("createUserId", userIdSession);
		respBean = notepadFlowService.addNotepadFlow(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean NotepadFlowDelete(
			HttpSession httpSession,
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = notepadFlowService.deleteNotepadFlow(recUid);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean NotepadFlowUpdate(
			HttpSession httpSession,
			@Valid @RequestBody NotepadFlowUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = notepadFlowService.updateNotepadFlow(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/expenseExpireCount", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean expenseExpireCount(
			HttpSession httpSession, BaseReqBean reqBean) throws IOException {
		BaseRespBean respBean = new BaseRespBean();

		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);

		respBean = notepadFlowService.expenseExpireCount(userIdSession);
		return respBean;
	}
	
}
