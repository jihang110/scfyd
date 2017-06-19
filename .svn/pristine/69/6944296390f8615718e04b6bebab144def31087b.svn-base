package com.ut.scf.web.controller.pub;

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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.pub.PrdAddReqBean;
import com.ut.scf.reqbean.pub.PrdDeleteReqBean;
import com.ut.scf.reqbean.pub.PrdListPageReqBean;
import com.ut.scf.reqbean.pub.PrdUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.pub.IPrdManagerService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 产品管理的类
 * @author Yuancy
 *
 */
@Controller
@RequestMapping("/product")
public class PrdManagerController extends  BaseJsonController{

	private static final Logger log = LoggerFactory
			.getLogger(PrdManagerController.class);
	
	@Resource
	private IPrdManagerService prdManagerService ;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean productList(HttpSession httpSession,
			@RequestBody PrdListPageReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("productName",reqBean.getProductName());
		paramMap.put("productDesc",reqBean.getProductDesc());
		paramMap.put("attachment",reqBean.getAttachment());
		paramMap.put("fileName",reqBean.getFileName());
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = prdManagerService.getProductList(paramMap, page);
		log.debug("productList: {}", respBean);
		
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean productAdd(@Valid @RequestBody PrdAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = this.prdManagerService.insertProduct(paramMap);
		
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deptUpdate(@Valid @RequestBody PrdUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = this.prdManagerService.updateProduct(reqBean);

		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deptDelete(@Valid @RequestBody PrdDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		String productId = reqBean.getProductId();
		respBean = this.prdManagerService.deleteProduct(productId);

		return respBean;
	}
}
