package com.ut.scf.web.controller.crm;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ExcelUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.pojo.CashFlow;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ExcelExportRespBean;
import com.ut.scf.service.crm.ICashFlowService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 * 现金流表的导入导出
 */
@Controller
@RequestMapping("/cashFlowExcel")
public class CashFlowExcelController  extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(CashFlowExcelController.class);
	final String Names = "企业名称,时间(年),经营活动产生的现金流量净额,投资活动产生的现金流量净额,筹资活动产生的现金流量净额,现金及现金等价物净增加额,其他经营活动产生的现金流量净额";
	final String Keys ="corpName,operYear,netAmountOfCashFlow,investmentAmountOfCashFlow,financingAmountOfCashFlow,increaseCashEquivalent,otherAmountOfCashFlow";
	@Resource private ICashFlowService cashFlowService;
	
	/**
	 * 现金流的导出
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean CashFlowExport(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
			paramMap.put("relaCorpId", corpIdSession);
			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
			paramMap.put("userCorpList", userCorpStr);
		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
			paramMap.put("corpId", corpIdSession);
		}
		List<String> aliasList = new ArrayList<String>();
		List<String> keyNames = new ArrayList<String>();
		String[] dataArr = Names.split(",");
		String[] aliaArr = Keys.split(",");
		aliasList = Arrays.asList(dataArr);
		keyNames = Arrays.asList(aliaArr);
		List<Map<String, Object>> dataList = cashFlowService.getCashFlowList(paramMap);
		String pathString = ExcelUtil.exportToCsv(request, dataList, aliasList, keyNames);
		ExcelExportRespBean excelExportRespBean = new ExcelExportRespBean();
		excelExportRespBean.setExcelPath(pathString);
		return excelExportRespBean;
	}

	/**
	 * 现金流导入
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/import", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean binUpload(
			@RequestParam(value = "file1", required = false) MultipartFile file1,
			HttpServletRequest request, HttpServletResponse response) {
		BaseRespBean resp = new BaseRespBean();
		// 得到文件服务器存储目录
		String uploadFilePath = getUploadFilePath(request);
		String corpId = request.getParameter("corpId");
		String userId = request.getSession().getAttribute(ScfConsts.SESSION_USER_ID).toString();
		String path = request.getSession().getServletContext()
						.getRealPath(uploadFilePath);
		String uploadName = file1.getOriginalFilename();
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
		List<CashFlow> list = new ArrayList<CashFlow>();

		try {
			file1.transferTo(targetFile);
			list = parseExcel(fileName,targetFile,corpId,userId);
			if(list.size()>0){
				resp = cashFlowService.insertCashFlowBatch(list);
			}
		}catch(DataIntegrityViolationException e){
			log.error("batchImportProfit exception", e);
			resp.setResult(ErrorCodeEnum.ADD_FAILED);
			return resp;
		}catch (Exception e) {
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
	
	/**
	 * 
	 * 根据指定的配置文件，读取excel,把每一行转换成一个HashMap对象,通过List返回
	 * 
	 * @param excelURL
	 *            excel路径
	 * @return
	 * @throws Exception
	 * @see [类、类#方法、类#成员]
	 */
	@SuppressWarnings("deprecation")
	public List<CashFlow> parseExcel(String excelURL,File file,String corpId,String userId) throws Exception{
		InputStream strexc = null;
		List<CashFlow> list = new ArrayList<CashFlow>();//存放excel中的所有数据
		List<String> yearList = new ArrayList<String>();
		Calendar now = Calendar.getInstance();
		Pattern pattern = Pattern.compile("[0-9]*");
		//当前年份
		int currentYear = now.get(Calendar.YEAR);
		int x = 0;
		int y = 0;
		try {
			int pos=excelURL.lastIndexOf(".");	    	
			
			//解析excel上传文件数据
			strexc = new FileInputStream(file);
			Workbook workbook = null;
			if(".xls".equals(excelURL.substring(pos))){
				workbook = new HSSFWorkbook(strexc); //2003版
			}else if(".xlsx".equals(excelURL.substring(pos))){
				workbook = new XSSFWorkbook(strexc); //2007版
			}
			Sheet worksheet= workbook.getSheetAt(0);
			//获取excel的行数
			int rowMaxNum = worksheet.getLastRowNum();
			int colMaxNum = worksheet.getRow(0).getLastCellNum();   //3
			int colNum = 0;
			int rowNum = 0;
			if(colMaxNum<=1){
				throw new Exception("没有足够的信息，请检查！");
			}
			//int cellIndex = 0;
			for(colNum = 1;colNum<=colMaxNum;colNum++){
				CashFlow cashFlow = new CashFlow();
				cashFlow.setCorpId(corpId);
				cashFlow.setRelaCorpId(ScfCacheDict.relaCorpIdMap.get(corpId));
				cashFlow.setCreateUserId(userId);
				y = colNum + 1;
				x = 0;
				for(rowNum = 0;rowNum<=rowMaxNum;rowNum++){
					x = rowNum + 1;
					Cell cell = worksheet.getRow(rowNum).getCell(colNum);
					String ceStr = "";
                	BigDecimal ceVal = null;
                	//String ceValStr = "";
                	switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                    	ceStr = cell.getRichStringCellValue().getString();
                    	ceStr = ceStr.replaceAll("[\u4e00-\u9fa5]+", "");
                    	Matcher isNum = pattern.matcher(ceStr);
                    	if(!isNum.matches()){
                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    	}
                    	if(ceStr.equals("")){
                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                	}
                    	if(ceStr.contains(".")){
                    		String[] numArr = ceStr.split("\\.");
                    		String numStr = numArr[0];
                    		if(numStr.length()>9){
                    			throw new Exception("请检查数据长度, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}else{
                    		if(ceStr.length()>9){
                    			throw new Exception("请检查数据长度, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                    	DecimalFormat df = new DecimalFormat("#0.00");  
                     /*   ceValStr = df.format(cell.getNumericCellValue());  
                    	if(ceValStr.contains(".")){
                    		String[] numArr = ceValStr.split("\\.");
                    		String numStr = numArr[0];
                    		if(numStr.length()>15){
                    			throw new Exception("请检查数据长度, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}else{
                    		if(ceValStr.length()>15){
                    			throw new Exception("请检查数据长度, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}*/
                    	if (!DateUtil.isCellDateFormatted(cell)) {
                        	ceVal = new BigDecimal(df.format(cell.getNumericCellValue()));
                        	BigDecimal maxNum=BigDecimal.valueOf(100000000.00);
                        	BigDecimal minNum=BigDecimal.valueOf(-100000000.00);
                        	if(ceVal.compareTo(maxNum)==1 || ceVal.compareTo(minNum) ==-1){
                        		throw new Exception("请检查数据大小, 错误位置：第 "+x+" 行,第 "+y+" 列");
                        	}
                        }
                        if(null==ceVal){
                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                	}
                        break;
                }
					//判断并写入
					switch (x){
						case 1:
							String operYearStr = cell.toString();
							int yearIndex=operYearStr.lastIndexOf("年");
							if(yearIndex ==-1){
								throw new Exception("请检查年份格式, 错误位置：第 "+x+" 行,第 "+y+" 列");
							}else{
								String operYear = operYearStr.substring(0,yearIndex);
								if(operYear.length() != 4){
									throw new Exception("请检查年份长度, 错误位置：第 "+x+" 行,第 "+y+" 列");
								}else{
									if(!yearList.contains(operYear)){
										try {
										    int operYearInt = Integer.parseInt(operYear);
										    if(operYearInt>currentYear){
										    	throw new Exception("年份大于当前年份, 错误位置：第 "+x+" 行,第 "+y+" 列");
											}else{
												yearList.add(operYear);
												cashFlow.setOperYear(operYear);
											}
										} catch (NumberFormatException e) {
										    e.printStackTrace();
										}
									}else{
										throw new Exception("年份不能重复, 错误位置：第 "+x+" 行,第 "+y+" 列");
									}
								}
							}
							break;
						case 2:
							break;
						case 3:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeFromSellingAndOffering(ceVal);
							break;
						case 4:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setTaxBeReturned(ceVal);
							break;
						case 5:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOtherCapitalAboutTheActivity(ceVal);
							break;
						case 6:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeSubtotalOfOperatActivity(ceVal);
							break;
						case 7:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setExpendOfSellCommodity(ceVal);
							break;
						case 8:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setExpendOfPayToStaffs(ceVal);
							break;
						case 9:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setPaymentsOfTaxes(ceVal);
							break;
						case 10:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setTherExpendOfActivity(ceVal);
							break;
						case 11:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOutcomeSubtotalOfOperatActivity(ceVal);
							break;
						case 12:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setNetAmountOfCashFlow(ceVal);
							break;
						case 13:
							break;
						case 14:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeFromWithdrawInvestment(ceVal);
							break;
						case 15:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashFromInvestIncome(ceVal);
							break;
						case 16:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashOfFixedIntangibleOtherLong(ceVal);
							break;
						case 17:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashFromDisposalOtherBusiness(ceVal);
							break;
						case 18:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOtherCashReceivedInvestActivity(ceVal);
							break;
						case 19:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeSubtotalOfInvestmentActivities(ceVal);
							break;
						case 20:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashOfFixedIntangibleLong(ceVal);
							break;
						case 21:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setExpenditureOfInvest(ceVal);
							break;
						case 22:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashPaidForBusinessSubsidiaries(ceVal);
							break;
						case 23:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setExpendOfActivityAboutInvestment(ceVal);
							break;
						case 24:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOutcomeSubtotalOfInvestmentActivities(ceVal);
							break;
						case 25:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setInvestmentAmountOfCashFlow(ceVal);
							break;
						case 26:
							break;
						case 27:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeFromAbsorbInvestment(ceVal);
							break;
						case 28:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeFromObtainBorrowMoney(ceVal);
							break;
						case 29:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOtherIncomeFromRaiseMoney(ceVal);
							break;
						case 30:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncomeSubtotalOfFinanceActivities(ceVal);
							break;
						case 31:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setExpendOfRepaymentOfDept(ceVal);
							break;
						case 32:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashOfDividendsProfitInterest(ceVal);
							break;
						case 33:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOtherExpendActivityRaiseMoney(ceVal);
							break;
						case 34:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOutcomeSubtotalOfFinancingActivities(ceVal);
							break;
						case 35:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setFinancingAmountOfCashFlow(ceVal);
							break;
						case 36:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setInfluenceFluctuationCash(ceVal);
							break;
						case 37:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncreaseCashEquivalent(ceVal);
							break;
						case 38:
							break;
						case 39:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setMargin(ceVal);
							break;
						case 40:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setPreparationOfDevaluation(ceVal);
							break;
						case 41:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setDepreciationOfFixed(ceVal);
							break;
						case 42:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setAmortizationOfIntangible(ceVal);
							break;
						case 43:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setAmortizationOfLong(ceVal);
							break;
						case 44:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setLossFromDisposal(ceVal);
							break;
						case 45:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setLossOfFixed(ceVal);
							break;
						case 46:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setChangeInFairValueLoss(ceVal);
							break;
						case 47:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setFinancialExpenses(ceVal);
							break;
						case 48:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setInvestmentLoss(ceVal);
							break;
						case 49:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setDecreaseInDeferredTax(ceVal);
							break;
						case 50:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncreaseInDeferredTaxLiabilities(ceVal);
							break;
						case 51:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setDecreaseInInventories(ceVal);
							break;
						case 52:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setDecreaseInOperatingReceivables(ceVal);
							break;
						case 53:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setIncreaseInOperatingPayables(ceVal);
							break;
						case 54:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOther(ceVal);
							break;
						case 55:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOtherAmountOfCashFlow(ceVal);
							break;
						case 56:
							break;
						case 57:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setDebtTurnIntoCapital(ceVal);
							break;
						case 58:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setConvertibleBonds(ceVal);
							break;
						case 59:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setTheLeasedAssets(ceVal);
							break;
						case 60:
							break;
						case 61:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCloseBalanceOfCash(ceVal);
							break;
						case 62:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOpenBalanceOfCash(ceVal);
							break;
						case 63:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCloseBalanceOfCashEquivalents(ceVal);
							break;
						case 64:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setOpenBalanceOfCashEquivalents(ceVal);
							break;
						case 65:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							cashFlow.setCashAndCashEquivalents(ceVal);
							break;
						default:  
	                        break;
					}
				}
				list.add(cashFlow);
			}
	        
		}  catch(Exception e) {			
	        throw new Exception(e.getMessage());
		} finally {
			if (strexc != null) {
				strexc.close();
				strexc = null;
			}			
		}
		return list;
	}

}
