package com.ut.scf.web.controller.sys;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.ITypeService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/type")
public class TypeController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(TypeController.class);

	@Resource
	private ITypeService typeService;

	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean list(HttpSession httpSession)
			throws IOException {

		return typeService.getTypeList();
	}
}
