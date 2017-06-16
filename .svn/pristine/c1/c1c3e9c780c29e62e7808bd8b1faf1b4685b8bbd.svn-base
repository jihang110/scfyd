package com.ut.scf.web.controller.finance;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ExcelUtil;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ExcelExportRespBean;
import com.ut.scf.service.finance.IInvoiceManagerService;
import com.ut.scf.web.controller.BaseJsonController;
/**
 * 
 * @author changxin
 *
 */
@Controller
@RequestMapping("invoiceExcel")
public class InvoiceExcelController extends BaseJsonController{
	private static final Logger log = LoggerFactory.getLogger(InvoiceExcelController.class);
	@Resource private IInvoiceManagerService InvoiceManagerService;
	final String Names = "项目名称,合同编号,发票编号,付款单据,发票币种,发票金额,发票余额,发票开立日期,发票起算日,发票结算日,开票单位,发票状态";
	final String Keys ="projectName,contractNo,invoiceNo,invoiceUrl,invoiceCurrencyExcel,invoiceAmt,invoiceBalance,invoiceDate,invoiceStartDate,invoiceEndDate,billUnit,invoiceStatusExcel";
	/**
	 * 发票信息的导出
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean InvoiceExcelExport(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		// 获取用户信息
		String corpIdSession = (String) request.getSession()
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userIdSession = (String) request.getSession()
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String roleIdSession = (String) request.getSession()
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) request.getSession()
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
		// 保理商类型下，保理商管理员可以查看所有数据，其他角色只能查看自己的业务数据
	/*	if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			paramMap.put("relaCorpId", corpIdSession);
			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
			
		}*/
		paramMap.put("corpId", corpIdSession);
		List<String> aliasList = new ArrayList<String>();
		List<String> keyNames = new ArrayList<String>();
		String[] dataArr = Names.split(",");
		String[] aliaArr = Keys.split(",");
		aliasList = Arrays.asList(dataArr);
		keyNames = Arrays.asList(aliaArr);
		List<Map<String, Object>> dataList = InvoiceManagerService.getInvoiceManagerList(paramMap);
		String pathString = ExcelUtil.exportToCsv(request, dataList, aliasList, keyNames);
		ExcelExportRespBean excelExportRespBean = new ExcelExportRespBean();
		excelExportRespBean.setExcelPath(pathString);
		return excelExportRespBean;
	}
}
