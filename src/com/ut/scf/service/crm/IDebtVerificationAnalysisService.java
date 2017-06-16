package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IDebtVerificationAnalysisService {

	public BaseRespBean getDebtVerificationAnalysisList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addDebtVerificationAnalysis(Map<String, Object> paramMap);

	public BaseRespBean updateDebtVerificationAnalysis(Map<String, Object> paramMap);

	public BaseRespBean deleteDebtVerificationAnalysis(Map<String, Object> paramMap);

}
