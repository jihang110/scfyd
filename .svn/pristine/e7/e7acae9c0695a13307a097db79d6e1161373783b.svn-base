package com.ut.scf.web.controller.crm;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
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
import com.ut.scf.pojo.Profit;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ExcelExportRespBean;
import com.ut.scf.service.crm.IProfitService;
import com.ut.scf.web.controller.BaseJsonController;



@Controller
@RequestMapping("/profitExcel")
public class ProfitExcelController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(ProfitExcelController.class);
	final String Names = "时间(年),企业名称,毛利率(%),费用率(%),利润总额,净利润,净利润增长率(%),主营业务成本率(%)";
	final String Keys ="operYear,corpName,grossProfitRate,expenseRate,totalProfit,netProfit,netProfitGrowthRate,mainCostRate";
	@Resource private IProfitService profitService;
	
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean ProfitExport(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
		for(int i=0;i<dataArr.length;i++){
			aliasList.add(dataArr[i]);
		}
		for(int i=0;i<aliaArr.length;i++){
			keyNames.add(aliaArr[i]);
		}
		List<Map<String, Object>> dataList = profitService.getProfitList(paramMap);
		String pathString = ExcelUtil.exportToCsv(request, dataList, aliasList, keyNames);
		ExcelExportRespBean excelExportRespBean = new ExcelExportRespBean();
		excelExportRespBean.setExcelPath(pathString);
		return excelExportRespBean;
		
	}

	/**
	 * 利润表导入
	 * 
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
		List<Profit> list = new ArrayList<Profit>();
		
		try {
			file.transferTo(targetFile);
			list = parseExcel(fileName,targetFile,corpId,userId);
			if(list.size()>0){
				resp = profitService.insertProfitBatch(list);
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
	public List<Profit> parseExcel(String excelURL,File file,String corpId,String userId) throws Exception{
		InputStream strexc = null;
		List<Profit> list = new ArrayList<Profit>();//存放excel中的所有数据
		List<String> yearList = new ArrayList<String>();
		Calendar calendar = Calendar.getInstance();
		DecimalFormat df = new DecimalFormat("#0.00");  
		Pattern pattern = Pattern.compile("[0-9]*");
		int x = 0;
		int y = 0;
		try {
			int pos=excelURL.lastIndexOf(".");	    	
			
			//解析excel上传文件数据
			strexc = new FileInputStream(file);
			Workbook workbook = null;
			if(".xlsx".equals(excelURL.substring(pos))){
				workbook = new XSSFWorkbook(strexc); //2005版
			}
			Sheet worksheet= workbook.getSheetAt(0);
			
			int columnNum=worksheet.getRow(0).getPhysicalNumberOfCells();
	        for(int c=1;c<columnNum;c++){
	        	y = c +1 ;
	        	Profit profit = new Profit();
	        	profit.setCorpId(corpId);
	            profit.setRelaCorpId(ScfCacheDict.relaCorpIdMap.get(corpId));
	            profit.setCreateUserId(userId);
	            
	            int rowIndex = 1;  
	            Iterator<Row> itRow = worksheet.rowIterator();  
	        	while (itRow.hasNext()) {  
	        		x = rowIndex;
	        		Row row = itRow.next();  
	 	            // 读行格  
	        		Cell ce = row.getCell(c);
	        		String ceStr = "";
                	BigDecimal ceVal = null;
                	switch (ce.getCellType()) {
	                    case Cell.CELL_TYPE_STRING:
	                    	ceStr = ce.getRichStringCellValue().getString();
	                    	ceStr = ceStr.replaceAll("[\u4e00-\u9fa5]+", "");
	                    	Matcher isNum = pattern.matcher(ceStr);
	                    	if(!isNum.matches()){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    	}
	                    	if(ceStr.equals("")){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
//	                    	if(ceStr.contains("-")){
//                    			throw new Exception("不能导入负数, 错误位置：第 "+x+" 行,第 "+y+" 列");
//                    		}
	                    	if(ceStr.contains(".")){
                        		String[] numArr = ceStr.split("\\.");
                        		String numStr = numArr[0];
                        		if(Float.parseFloat(numStr)>1000000000||Float.parseFloat(numStr)<-1000000000){
                        			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                        		}
                        	}else{
                        		if(Float.parseFloat(ceStr)>100000000||Float.parseFloat(ceStr)<-1000000000){
                        			throw new Exception("请检查数据长度,在-1000000000~1000000000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
                        		}
                        	}
	                    	Double cellVal = Double.valueOf(ceStr);
	                    	ceVal = new BigDecimal(df.format(cellVal));
	                        break;
	                    case Cell.CELL_TYPE_NUMERIC:
	                        ceStr = df.format(ce.getNumericCellValue());  
//	                        if(ceStr.contains("-")){
//                    			throw new Exception("不能导入负数, 错误位置：第 "+x+" 行,第 "+y+" 列");
//                    		}
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
                        	if (!DateUtil.isCellDateFormatted(ce)) {
	                        	ceVal = new BigDecimal(df.format(ce.getNumericCellValue()));
	                        }
	                        if(null==ceVal){
	                    		throw new Exception("请检查数据类型, 错误位置：第 "+x+" 行,第 "+y+" 列");
		                	}
	                        break;
	                    case Cell.CELL_TYPE_BLANK:
	                    	throw new Exception("数据不能为空, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                }
                	switch (rowIndex){  
	                    case 1:// 第一行  
	                    	DateFormat format = new SimpleDateFormat("yyyy");  
	                    	format.setLenient(false);  
	                    	Date date = null;
	                    	try {
	                    		date = format.parse(ceStr); 
							} catch (Exception e) {
								throw new Exception("年份格式错误, 错误位置：第 "+x+" 行,第 "+y+" 列");
							}
	                    	Date nowDate = new Date();
	                    	if(nowDate.before(date)){
	                    		throw new Exception("年份错误, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    	}
	                    	calendar.setTime(date);
	                    	String year = String.valueOf(calendar.get(Calendar.YEAR));//ceStr.split("\\.")[0].substring(0, 4);
	                    	if(year.length()!=4){
	                    		throw new Exception("年份格式错误, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    	}
	                    	if(!yearList.contains(year)){
	                    		yearList.add(year);
	                    		profit.setOperYear(year);  
	                    	}else{
	                    		throw new Exception("年份不能重复, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    	}
	                        break;  
	                    case 2:  // 营业收入
	                    	profit.setOperatingGain(ceVal);
	                        break;  
	                    case 3: // 营业成本
	                        profit.setOperatingCost(ceVal);  
	                        break;  
	                    case 4: // 毛利率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setGrossProfitRate(ceVal);
	                        break;
	                    case 5: // 营业税金及附加
	                        profit.setTaxAndSurcharges(ceVal);
	                        break;
	                    case 6: // 销售费用
	                        profit.setSalesExpense(ceVal);
	                        break;
	                    case 7: // 管理费用
	                        profit.setManagementExpense(ceVal);
	                        break;
	                    case 8: // 财务费用
	                        profit.setFinancialExpense(ceVal);
	                        break;
	                    case 9: // 费用率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setExpenseRate(ceVal);
	                        break;
	                    case 10: //资产减值损失
	                        profit.setImpairmentLosses(ceVal);
	                        break;
	                    case 11: // 公允价值变动收益
	                        profit.setChangesInFairValueGain(ceVal);
	                        break;
	                    case 12: // 投资收益
	                        profit.setInvestmentGain(ceVal);
	                        break;
	                 	case 13: // 对联营企业和合营企业的投资收益
	                        profit.setAssociatesAndJointVenturesGain(ceVal);
	                        break;
	                 	case 14: // 营业利润
	                        profit.setOperatingProfit(ceVal);
	                        break;
	                 	case 15: // 营业外收入
	                        profit.setNonOperatingGain(ceVal);
	                        break;
	                 	case 16: // 营业外支出
	                        profit.setNonOperatingExpense(ceVal);
	                        break;
	                 	case 17: // 非流动资产处置净损失
	                        profit.setNonCurrentAssetsLoss(ceVal);
	                        break;
	                 	case 18: // 利润总额
	                        profit.setTotalProfit(ceVal);
	                        break;
	                 	case 19: // 所得税费用
	                        profit.setIncomeTaxExpense(ceVal);
	                        break;
	                 	case 20: // 净利润
	                        profit.setNetProfit(ceVal);
	                        break;
	                 	case 21: // 每股收益
	                        profit.setEarningsPerShare(ceVal);
	                        break;
	                 	case 22: // 基本每股收益
	                        profit.setBasicEarningsPerShare(ceVal);
	                        break;
	                 	case 23: // 稀释每股收益
	                        profit.setDilutedEarningsPerShare(ceVal);
	                        break;
	                 	case 24: // 净利润率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setNetProfitRate(ceVal);
	                        break;
	                 	case 25: // 成本费用总额
	                        profit.setTotalCost(ceVal);
	                        break;
	                 	case 26: // 成本费用率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setCostExpenseRate(ceVal);
	                        break;
	                 	case 27: // 计税基数
	                        profit.setTaxBase(ceVal);
	                        break;
	                 	case 28: // 付税率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setTaxRate(ceVal);
	                        break;
	                 	case 29: // 主营业务收入增长额
	                        profit.setMainRevenueGrowthAmount(ceVal);
	                        break;
	                 	case 30: // 增长率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setGrowthRate(ceVal);
	                        break;
	                 	case 31: // 营业利润增长额
	                        profit.setOperatingProfitGrowthAmount(ceVal);
	                        break;
	                 	case 32: // 营业利润增长率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setOperatingProfitGrowthRate(ceVal);
	                        break;
	                 	case 33: // 净利润增长额
	                        profit.setNetProfitGrowthAmount(ceVal);
	                        break;
	                 	case 34: // 净利润增长率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setNetProfitGrowthRate(ceVal);
	                        break;
	                 	case 35: // 主营业务成本率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setMainCostRate(ceVal);
	                        break;
	                 	case 36: // 期间费用率
	                    	if(ceStr.contains(".")){
	                    		String[] numArr = ceStr.split("\\.");
	                    		String numStr = numArr[0];
	                    		if(Float.parseFloat(numStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}else{
	                    		if(Float.parseFloat(ceStr)>10000){
	                    			throw new Exception("请检查数据长度, 在0-10000之间, 错误位置：第 "+x+" 行,第 "+y+" 列");
	                    		}
	                    	}
	                        profit.setPeriodExpenseRate(ceVal);
	                        break;
	                    default:  
	                        break;  
	                } 
                	rowIndex ++;
	        	}
                list.add(profit);  
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
