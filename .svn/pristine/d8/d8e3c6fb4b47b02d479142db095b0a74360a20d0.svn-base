package com.ut.scf.service.crm.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.ICorpConditionDao;
import com.ut.scf.dao.crm.ICorpContrastAnalysisDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.crm.CorpContrastAnalysisService;

/**
 * 
 * @author changxin
 *
 */
@Service("CorpContrastAnalysisService")
public class CorpContrastAnalysisServiceImpl implements CorpContrastAnalysisService{
	private static final Logger log = LoggerFactory
			.getLogger(CorpContrastAnalysisServiceImpl.class);

	@Resource
	private ICorpContrastAnalysisDao CorpContrastAnalysisDao;

	@Resource
	private ICorpConditionDao corpConditionDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpContrastAnalysisList(Map<String, Object> paramMap) {
		// 判断当年的财务指标是否有数据
		List<Map<String, Object>> currentList = corpConditionDao.selectCorpConditionList(paramMap);
		if (currentList == null || currentList.isEmpty()) {
			BaseRespBean respBean = new BaseRespBean();
			respBean.setResult(ErrorCodeEnum.QUERY_BLANK);
			return respBean;
		}
		
		// 对比结果
		List<Map<String, Object>> analysisList = CorpContrastAnalysisDao.selectContrastAnalysisList(paramMap);
		
		// 取上一年的数据
		int lastYear = Integer.valueOf((String) paramMap.get("operYear")) - 1;
		paramMap.put("operYear", String.valueOf(lastYear));
		List<Map<String, Object>> lastList = corpConditionDao.selectCorpConditionList(paramMap);
		
		// 数据横转纵
		LinkedHashMap<String, String> analysisNameMap = new LinkedHashMap<>();
		analysisNameMap.put("currentRate", "流动比率");
		analysisNameMap.put("quickRate", "速动比率");
		analysisNameMap.put("interestCoverage", "利息保障倍数");
		analysisNameMap.put("cashRate", "现金比率");
		analysisNameMap.put("assetsAndLiabilities", "资产负债率");
		analysisNameMap.put("equityRate", "产权比例");
		analysisNameMap.put("receivableTurnoverRate", "应收账款周转率（次/年）");
		analysisNameMap.put("receivableTurnoverRateDays", "应收账款周转天数（天/次）");
		analysisNameMap.put("inventoryTurnover", "存货周转率（次/年）");
		analysisNameMap.put("inventoryTurnoverDays", "存货周转期（天/次）");
		analysisNameMap.put("currentAssetsTurnover", "流动资产周转率（次/年）");
		analysisNameMap.put("currentAssetsTurnoverDays", "流动资产周转期（天/次）");
		analysisNameMap.put("fixedAssetsTurnover", "固定资产周转率（次/年）");
		analysisNameMap.put("fixedAssetsTurnoverDays", "固定资产周转期（天/次）");
		analysisNameMap.put("totalAssetTurnover", "总资产周转率（次/年）");
		analysisNameMap.put("totalAssetTurnoverDays", "总资产周转期");
		analysisNameMap.put("accountsPayableTurnover", "应付账款周转率（次/年）");
		analysisNameMap.put("accountsPayableTurnoverDays", "应付账款周转天数（天/次）");
		analysisNameMap.put("cashTurnover", "现金周转率（次/年）");
		analysisNameMap.put("cashTurnoverDays", "现金周转天数（天/次）");
		analysisNameMap.put("operatingMargin", "营业利润率");
		analysisNameMap.put("operatingNetProfit", "营业净利率");
		analysisNameMap.put("operatingGrossProfit", "营业毛利率");
		analysisNameMap.put("costMargins", "成本费用利润率");
		analysisNameMap.put("costRate", "成本费用率");
		analysisNameMap.put("returnTotalAssets", "总资产报酬率");
		analysisNameMap.put("returnNetAssets", "净资产收益率");
		analysisNameMap.put("mainBusinessRevenueGrowth", "主营业务收入增长率");
		analysisNameMap.put("mainBusinessProfitGrowth", "主营业务利润增长率");
		analysisNameMap.put("netProfitGrowth", "净利润增长率");
		analysisNameMap.put("totalAssetGrowth", "总资产增长率");
		analysisNameMap.put("capitalMaintenanceAndAppreciation", "资本保值增值率");
		analysisNameMap.put("cashOfSales", "销售收现比率");
		analysisNameMap.put("cashOfPurchase", "购货付现比率");
		analysisNameMap.put("netOperatingCashToSales", "经营现金净流量对销售收入比率");
		analysisNameMap.put("operatingCashRateOfReturn", "资产的经营现金流量回报率");
		analysisNameMap.put("netOperatingCashToProfit", "经营现金净流量对净利润的比率");
		analysisNameMap.put("netOperatingCashToDebt", "经营现金净流量对负债比率");
		analysisNameMap.put("proportionOfFixedAssets", "固定资产比重");
		analysisNameMap.put("shareholderRate", "股东权益比率");
		analysisNameMap.put("longtermDebtRate", "长期负债比率");
		analysisNameMap.put("fixedAssetsAndEquityRate", "股东权益与固定资产比率");
		analysisNameMap.put("mainBusinessProfitRate", "主营业务利润比重");
		analysisNameMap.put("accountsReceivableIncomeRate", "应收账款占收入比重");
		analysisNameMap.put("liquidityIncomeRate", "流动资金创收率");
		analysisNameMap.put("totalAssetsProfitMargin", "总资产利润率");
		analysisNameMap.put("loanRecoveryDuringReportingPeriod", "报告期内货款回收率");
		
		List<Map<String, Object>> dataList = new ArrayList<>();
		Map<String, Object> current = currentList.get(0);
		Map<String, Object> last = null;
		if (lastList != null && lastList.size() > 0) {
			last = lastList.get(0);
		}
		Map<String, Object> analysis = null;
		if (analysisList != null && analysisList.size() > 0) {
			analysis = analysisList.get(0);
		}
		for (Map.Entry<String, String> entry : analysisNameMap.entrySet()) {
			Map<String, Object> data = new HashMap<>();
			String analysisKey = entry.getKey() + "Analysis";
			data.put("analysisKey", analysisKey);
			data.put("analysisName", entry.getValue());
			data.put("lastYear", last!=null && last.get(entry.getKey()) != null ? last.get(entry.getKey()) : "");
			data.put("currentYear", current.get(entry.getKey()) != null ? current.get(entry.getKey()) : "");
			data.put("anlysisResult", analysis!=null &&  analysis.get(entry.getKey() + "Analysis")!=null ? analysis.get(analysisKey) : "");
			dataList.add(data);
		}
		
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(dataList);
		return respBean;
	}
	
	/**
	 * 分析数据的表格导出
	 */
	/*@Transactional(readOnly = true)
	public CorpContrastAnalysisExcelRespBean getCorpContrastAnalysisList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = CorpContrastAnalysisDao.selectContrastAnalysisList(paramMap);
		CorpContrastAnalysisExcelRespBean respBean = new CorpContrastAnalysisExcelRespBean();
		respBean.setDataList(list);
		return respBean;
	}*/
	

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpContrastAnalysis(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();	
		// 判断财务分析对比记录是否存在
		Map<String, Object> data = CorpContrastAnalysisDao.hasOneYear(paramMap);
		if(data == null) {
			// 插入 
			paramMap.put("recUid", ScfUUID.generate());
			int resultnum = CorpContrastAnalysisDao.insertContrastAnalysis(paramMap);
			log.debug("insert CorpContrastAnalysis num {}", resultnum);
			if (resultnum <= 0) {
				respBean.setResult(ErrorCodeEnum.ADD_FAILED);
				return respBean;
			}
		} else {
			// 更新
			paramMap.put("recUid", data.get("recUid").toString());
			int updateNum = CorpContrastAnalysisDao.updateContrastAnalysis(paramMap);
			log.debug("update CorpContrastAnalysis num {}", updateNum);
			if (updateNum <= 0) {
				respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
				return respBean;
			}
		}
		
		return respBean;
	}

}
