package com.ut.scf.web.controller.crm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ExcelUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.reqbean.crm.CorpContrastAnalysisListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ExcelExportRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.crm.CorpContrastAnalysisService;
import com.ut.scf.web.controller.BaseJsonController;

@Controller
@RequestMapping("/corpContrastAnalysisExcel")
public class CorpContrastAnalysisExcelController extends BaseJsonController {
	
	private static final Logger log = LoggerFactory
			.getLogger(CorpContrastAnalysisExcelController.class);
	
	@Resource
	private CorpContrastAnalysisService corpContrastAnalysisService;
	
	/**
	 * 对比分析的导出
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean CorpContrastAnalysisExcelExport(
			HttpSession httpSession, HttpServletRequest request,
			HttpServletResponse response,
			@Valid @RequestBody CorpContrastAnalysisListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		// 获取用户信息
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);

		// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
		// 保理商类型下，保理商管理员可以查看所有数据，其他角色只能查看自己的业务数据
		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			paramMap.put("relaCorpId", corpIdSession);
			List<String> userCorpList = ScfCacheDict.userCorpMap
					.get(userIdSession);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
			paramMap.put("corpId", corpIdSession);
		}

		respBean = corpContrastAnalysisService
				.getCorpContrastAnalysisList(paramMap);
		if (respBean.getResult() != ErrorCodeEnum.SUCCESS.getValue()) {
			return respBean;
		}

		ListRespBean listRespBean = (ListRespBean) respBean;
		List<String> aliasList = new ArrayList<String>();
		aliasList.add("项目");
		aliasList.add((Integer.valueOf(reqBean.getOperYear()) - 1) + "年");
		aliasList.add(reqBean.getOperYear() + "年");
		aliasList.add("分析");
		List<String> keyNames = new ArrayList<String>();
		keyNames.add("analysisName");
		keyNames.add("lastYear");
		keyNames.add("currentYear");
		keyNames.add("anlysisResult");
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> dataList = (List<Map<String, Object>>) listRespBean
				.getDataList();
		String pathString = ExcelUtil.exportToCsv(request, dataList, aliasList,
				keyNames);
		ExcelExportRespBean excelExportRespBean = new ExcelExportRespBean();
		excelExportRespBean.setExcelPath(pathString);
		return excelExportRespBean;
	}
}
