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
import com.ut.scf.pojo.NegativeInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ExcelExportRespBean;
import com.ut.scf.service.crm.INegativeInfoService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * @author jihang
 * 资产负载表的导入和导出
 */
@Controller
@RequestMapping("/negativeInfoExcel")
public class NegativeInfoExcelController extends BaseJsonController {
	private static final Logger log = LoggerFactory.getLogger(NegativeInfoExcelController.class);
	@Resource private INegativeInfoService negativeInfoService;
	final String Names = "企业名称,时间(年),流动资产合计,非流动资产合计,资产总计,流动负债合计,非流动负债合计,负债合计,所有者权益（或股东权益）合计,负债和所有者权益（或股东权益）总计";
	final String Keys ="corpName,operYear,totalCurrentAssets,totalNonCurrentAssets,totalAssets,totalCurrentLiabilities,totalNonCurrentLiabilities,totalLiabilities,totalOwnersEquity,totalLiabilitiesAndOwnersEquity";
	/**
	 * 资产负载表的导出
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean NelgativeExcelExport(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
		List<Map<String, Object>> dataList = negativeInfoService.getNegativeInfoList(paramMap);
		String pathString = ExcelUtil.exportToCsv(request, dataList, aliasList, keyNames);
		ExcelExportRespBean excelExportRespBean = new ExcelExportRespBean();
		excelExportRespBean.setExcelPath(pathString);
		return excelExportRespBean;
	}

	/**
	 * 资产负载表的导入
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/import", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean binUpload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response) {
		BaseRespBean resp = new BaseRespBean();
		// 得到文件服务器存储目录
		String uploadFilePath = getUploadFilePath(request);
		String corpId = request.getParameter("corpId");
		String userId = request.getSession().getAttribute(ScfConsts.SESSION_USER_ID).toString();
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
		List<NegativeInfo> list = new ArrayList<NegativeInfo>();

		try {
			file.transferTo(targetFile);
			list = parseExcel(fileName,targetFile,corpId,userId);
			if(list.size()>0){
				resp = negativeInfoService.insertNegativeInfoBatch(list);
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
	public List<NegativeInfo> parseExcel(String excelURL,File file,String corpId,String userId) throws Exception{
		InputStream strexc = null;
		List<NegativeInfo> list = new ArrayList<NegativeInfo>();//存放excel中的所有数据
		List<String> yearList = new ArrayList<String>();
		Calendar now = Calendar.getInstance();
		DecimalFormat df = new DecimalFormat("#0.00");  
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
			int colMaxNum = worksheet.getRow(0).getLastCellNum();   //4
			int colNum = 0;
			int rowNum = 0;
			if(colMaxNum<=1){
				throw new Exception("没有足够的信息，请检查！");
			}
			//int cellIndex = 0;
			for(colNum = 1;colNum<colMaxNum;colNum++){
				NegativeInfo negativeInfo = new NegativeInfo();
				negativeInfo.setCorpId(corpId);
				negativeInfo.setRelaCorpId(ScfCacheDict.relaCorpIdMap.get(corpId));
				negativeInfo.setCreateUserId(userId);
				y = colNum + 1;
				x = 0;
				for(rowNum = 0;rowNum<=rowMaxNum;rowNum++){
					x = rowNum + 1;
					Cell cell = worksheet.getRow(rowNum).getCell(colNum);
					String ceStr = "";
                	BigDecimal ceVal = null;
                	switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_STRING:
                    	ceStr = cell.getRichStringCellValue().getString();
                    	ceStr = ceStr.replaceAll("[\u4e00-\u9fa5]+", "");
                    	if(ceStr.equals("")){
                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                	}
                 /*   	if(ceStr.contains("-")){
                			throw new Exception("不能导入负数, 错误位置：第 "+x+" 行,第 "+y+" 列");
                		}*/
                    	if(ceStr.contains(".")){
                    		String[] numArr = ceStr.split("\\.");
                    		String numStr = numArr[0];
                    		if(Float.parseFloat(numStr)>100000000||Float.parseFloat(numStr)<-1000000000){
                    			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}else{
                    		if(Float.parseFloat(ceStr)>100000000||Float.parseFloat(ceStr)<-1000000000){
                    			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}
                        break;
                    case Cell.CELL_TYPE_NUMERIC:
                    	 ceStr = df.format(cell.getNumericCellValue());  
	                /*        if(ceStr.contains("-")){
                 			throw new Exception("不能导入负数, 错误位置：第 "+x+" 行,第 "+y+" 列");
                 		}*/
                        if(ceStr.contains(".")){
                    		String[] numArr = ceStr.split("\\.");
                    		String numStr = numArr[0];
                    		if(Float.parseFloat(numStr)>1000000000||Float.parseFloat(numStr)<-1000000000){
                    			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}else{
                    		if(Float.parseFloat(ceStr)>1000000000||Float.parseFloat(ceStr)<-1000000000){
                    			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                    		}
                    	}
                    	if (!DateUtil.isCellDateFormatted(cell)) {
                        	ceVal = new BigDecimal(df.format(cell.getNumericCellValue()));
                        }
                        if(null==ceVal){
                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                	}
                        break;
                   /* case Cell.CELL_TYPE_BLANK:
                    	throw new Exception("数据不能为空, 错误位置：第 "+x+" 行,第 "+y+" 列");*/
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
												negativeInfo.setOperYear(operYear);
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
							negativeInfo.setMoneyFunds(ceVal);
							break;
						case 4:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherMoneyFunds(ceVal);
							break;
						case 5:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTransactionalFinancialAssets(ceVal);
							break;
						case 6:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setBillReceivable(ceVal);
							break;
						case 7:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAccountsReceivable(ceVal);
							break;
						case 8:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setPrepayments(ceVal);
							break;
						case 9:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setInterestReceivable(ceVal);
							break;
						case 10:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setDividendReceivable(ceVal);
							break;
						case 11:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherReceivables(ceVal);
							break;
						case 12:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setStock(ceVal);
							break;
						case 13:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setNonCurrentAssetsDueWithinOneYear(ceVal);
							break;
						case 14:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherCurrentAssets(ceVal);
							break;
						case 15:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalCurrentAssets(ceVal);
							break;
						case 16:
							break;
						case 17:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAvailableForSaleFinancialAssets(ceVal);
							break;
						case 18:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setHeldToMaturityInvestments(ceVal);
							break;
						case 19:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setLongTermReceivables(ceVal);
							break;
						case 20:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setLongTermEquityInvestment(ceVal);
							break;
						case 21:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setInvestmentRealEstate(ceVal);
							break;
						case 22:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setFixedAssets(ceVal);
							break;
						case 23:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setConstructionInProgress(ceVal);
							break;
						case 24:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setEngineerMaterial(ceVal);
							break;
						case 25:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setCleanUpOfFixedAssets(ceVal);
							break;
						case 26:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setProductiveBiologicalAssets(ceVal);
							break;
						case 27:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOilAndGasProperties(ceVal);
							break;
						case 28:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setIntangibleAssets(ceVal);
							break;
						case 29:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setDevelopmentExpenditure(ceVal);
							break;
						case 30:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setGoodwill(ceVal);
							break;
						case 31:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setLongTermPrepaidExpenses(ceVal);
							break;
						case 32:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setDeferredTaxAssets(ceVal);
							break;
						case 33:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherNonCurrentAssets(ceVal);
							break;
						case 34:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalNonCurrentAssets(ceVal);
							break;
						case 35:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalAssets(ceVal);
							break;
						case 36:
							break;
						case 37:
							break;
						case 38:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setShortTermLoan(ceVal);
							break;
						case 39:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTransactionalFinancialLiabilities(ceVal);
							break;
						case 40:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setNotesPayable(ceVal);
							break;
						case 41:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAccountsPayable(ceVal);
							break;
						case 42:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAdvancePayment(ceVal);
							break;
						case 43:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setEmployeeBenefitsPayable(ceVal);
							break;
						case 44:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTaxesPayable(ceVal);
							break;
						case 45:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setInterestPayable(ceVal);
							break;
						case 46:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setDividendPayable(ceVal);
							break;
						case 47:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherPayables(ceVal);
							break;
						case 48:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setNonCurrentLiabilitiesDueWithinOneYear(ceVal);
							break;
						case 49:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherCurrentLiabilities(ceVal);
							break;
						case 50:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalCurrentLiabilities(ceVal);
							break;
						case 51:
							break;
						case 52:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setLongTermLoan(ceVal);
							break;
						case 53:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setBondsPayable(ceVal);
							break;
						case 54:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setLongTermPayables(ceVal);
							break;
						case 55:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setSpecialPayables(ceVal);
							break;
						case 56:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setProjectedLiabilities(ceVal);
							break;
						case 57:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setDeferredIncomeTaxLiabilities(ceVal);
							break;
						case 58:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setOtherNonCurrentLiabilities(ceVal);
							break;
						case 59:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalNonCurrentLiabilities(ceVal);
							break;
						case 60:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalLiabilities(ceVal);
							break;
						case 61:
							break;
						case 62:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setPaidUpCapital(ceVal);
							break;
						case 63:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setCapitalReserve(ceVal);
							break;
						case 64:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTreasuryStocks(ceVal);
							break;
						case 65:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setSurplusReserve(ceVal);
							break;
						case 66:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setUndistributedProfit(ceVal);
							break;
						case 67:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalOwnersEquity(ceVal);
							break;
						case 68:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalLiabilitiesAndOwnersEquity(ceVal);
							break;
						case 69:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageCurrentAssets(ceVal);
							break;
						case 70:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageCurrentLiabilities(ceVal);
							break;
						case 71:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageTotalAssets(ceVal);
							break;
						case 72:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageTotalLiabilities(ceVal);
							break;
						case 73:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageNetAssets(ceVal);
							break;
						case 74:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageNetFixedAssets(ceVal);
							break;
						case 75:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageAccountsReceivable(ceVal);
							break;
						case 76:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageAccountsPayable(ceVal);
							break;
						case 77:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageInventory(ceVal);
							break;
						case 78:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAveragePrepayment(ceVal);
							break;
						case 79:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageOtherReceivables(ceVal);
							break;
						case 80:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalAssetsGrowth(ceVal);
							break;
						case 81:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setTotalAssetsGrowthRate(ceVal);
							break;
						case 82:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setAverageMoneyFunds(ceVal);
							break;
						case 83:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setUnallocatedProfitSpreadsheet(ceVal);
							break;
						case 84:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setBalanceOfUndistributedProfit(ceVal);
							break;
						case 85:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setIncreaseInSurplusFunds(ceVal);
							break;
						case 86:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setIncreaseInNetAssets(ceVal);
							break;
						case 87:
							if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
							negativeInfo.setNetAssetsGrowthRate(ceVal);
							break;
						default:  
	                        break;
					}
				}
				list.add(negativeInfo);
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
