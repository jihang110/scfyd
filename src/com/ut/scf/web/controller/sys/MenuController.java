package com.ut.scf.web.controller.sys;

import java.util.List;

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
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.pojo.auto.SysMenu;
import com.ut.scf.reqbean.sys.MenuDeleteReqBean;
import com.ut.scf.reqbean.sys.MenuListReqBean;
import com.ut.scf.reqbean.sys.MenuMoveReqBean;
import com.ut.scf.reqbean.sys.MenuTreeReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IMenuService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
public class MenuController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(MenuController.class);

	@Resource
	private IMenuService menuService;

	// 查询
	@RequestMapping(value = "/menu/tree", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean menuTree(HttpSession httpSession,
			@RequestBody MenuTreeReqBean reqBean) {
		// 获取角色类型
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		
		// 如果没有传roleId，则从session中获取当前用户信息，
		if (StringUtils.isBlank(reqBean.getRoleId())) {
			reqBean.setRoleId(roleIdSession);
		}
		
		BaseRespBean respBean = menuService.getMenuTree(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/menu/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean menuList(HttpSession httpSession,
			@RequestBody MenuListReqBean reqBean) {
		// 获取角色类型
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		
		// 如果没有传roleId，则从session中获取当前用户信息，
		if (StringUtils.isBlank(reqBean.getRoleId())) {
			reqBean.setRoleId(roleIdSession);
		}
		
		BaseRespBean respBean = menuService.getMenuList(reqBean);
		return respBean;
	}

	// 增加菜单
	@RequestMapping(value = "/menu/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean addMenu(@Valid @RequestBody SysMenu reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		respBean = this.menuService.addMenu(reqBean);
		return respBean;
	}

	// 删除菜单信息
	@RequestMapping(value = "/menu/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deleteMenu(@Valid @RequestBody MenuDeleteReqBean reqBean,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		respBean = this.menuService.deleteMenu(reqBean.getMenuId());
		return respBean;
	}

	// 修改菜单信息
	@RequestMapping(value = "/menu/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean updateMenu(@Valid @RequestBody SysMenu record,
			BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		respBean = this.menuService.updateMenu(record);
		return respBean;
	}
	
	// 上移或者下移菜单信息
		@RequestMapping(value = "/menu/move", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
		public @ResponseBody BaseRespBean updateMenuByMove(@Valid @RequestBody List<MenuMoveReqBean> reqBean, BindingResult bindingResult) {
			BaseRespBean respBean = new BaseRespBean();
			if (bindingResult.hasErrors()) {
				log.warn("bindingResult has error");
				respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
				respBean.setResultErrorMap(bindingResult);
				return respBean;
			}
			
			respBean = this.menuService.updateMenuByMove(reqBean);
			return respBean;
		}
}
