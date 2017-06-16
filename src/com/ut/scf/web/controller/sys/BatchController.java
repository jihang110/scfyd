package com.ut.scf.web.controller.sys;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.sys.BatchReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IBatchService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/batch")
public class BatchController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(BatchController.class);
	@Resource
	private IBatchService batchService;

	// 获取批处理列表
	@RequestMapping(value = "/list")
	@ResponseBody
	public BaseRespBean batchInfoList(@Valid @RequestBody BatchReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean respBean = new BaseRespBean();
		respBean = batchService.batchInfoList(paramMap, page);
		return respBean;
	}

	// 批处理手动执行
	@RequestMapping(value = "/doBatch")
	@ResponseBody
	public BaseRespBean doBatch(@Valid @RequestBody BatchReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean respBean = new BaseRespBean();
		respBean = batchService.doBatch(reqBean);
		return respBean;
	}
}
