package com.ut.scf.web.controller.sys;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;
import com.ut.scf.reqbean.sys.RoleAddReqBean;
import com.ut.scf.reqbean.sys.RoleDeleteReqBean;
import com.ut.scf.reqbean.sys.RoleListReqBean;
import com.ut.scf.reqbean.sys.RoleUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IRoleService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
public class RoleController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(RoleController.class);

	@Resource
	private IRoleService roleService;

	@RequestMapping(value = "/role/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean roleList(HttpSession httpSession,
			@RequestBody RoleListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 获取角色类型
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		// 平台类型角色可以查看所有角色。其他类型只能查看相同类型的角色列表。
		if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
//			if (reqBean.getRoleType() == null) {
//				reqBean.setRoleType(roleTypeSession);
//			} else {
				if (!roleIdSession.equals(ScfBizConsts.ROLE_ID_FACTOR_ADMIN) && roleTypeSession != reqBean.getRoleType()){
					respBean.setResult(ErrorCodeEnum.ROLE_TYPE_NO_PERMISSION);
					return respBean;
				}
//			}
		}

		respBean = this.roleService.getRoleList(reqBean);
		return respBean;
	}

	@RequestMapping(value = "/role/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean addRole(HttpSession httpSession,
			@Valid @RequestBody RoleAddReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		// 获取角色类型
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);

		// 平台类型角色可以查看所有角色。其他类型只能查看相同类型的角色列表。
		//不需要该验证
//		if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT
//				&& roleTypeSession != reqBean.getRoleType()) {
//			respBean.setResult(ErrorCodeEnum.ROLE_TYPE_NO_PERMISSION);
//			return respBean;
//		}
		
		// 从session获取企业Id，优先填充session中的企业Id
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		if (StringUtils.isNotBlank(corpIdSession))
		{
			reqBean.setCorpId(corpIdSession);
		}
		
		respBean = this.roleService.addRole(reqBean);
		return respBean;
	}

	@RequestMapping(value = "/role/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deleteRole(HttpSession httpSession,
			@Valid @RequestBody RoleDeleteReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		// 获取角色类型
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		
		respBean = this.roleService.deleteRole(reqBean.getRoleId(), roleTypeSession);
		return respBean;
	}

	@RequestMapping(value = "/role/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateRole(HttpSession httpSession,
			@Valid @RequestBody RoleUpdateReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

//		// 获取角色类型
//		int roleTypeSession = (int) httpSession
//				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
//		log.debug("roleTypeSession: {}", roleTypeSession);
		// 获取角色id
		String roleIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		
		respBean = this.roleService.updateRole(reqBean, roleIdSession);
		return respBean;
	}

	@RequestMapping(value = "/role/roleTypeList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean roleTypeList(HttpSession httpSession,
			@RequestBody BaseReqBean reqBean) {
		// 获取类型
		int roleTypeSession = (int) httpSession.getAttribute("roleType");
		log.debug("roleTypeSession: {}", roleTypeSession);

		return this.roleService.getRoleTypeList(roleTypeSession);
	}
	
	@RequestMapping(value = "/role/selectAllRoleList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean selectAllRoleList(HttpSession httpSession,
			@RequestBody BaseReqBean reqBean) {
		// 获取类型

		return this.roleService.getAllRoleTypeList();
	}
}
