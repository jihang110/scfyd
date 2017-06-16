package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IDebtVerificationAnalysisDao {
	List<Map<String, Object>> selectDebtVerificationAnalysisList(Map<String, Object> paramMap, PageInfoBean page);

	int insertDebtVerificationAnalysis(Map<String, Object> paramMap);

	int updateDebtVerificationAnalysis(Map<String, Object> paramMap);
	
	int deleteDebtVerificationAnalysis(Map<String, Object> paramMap);
}