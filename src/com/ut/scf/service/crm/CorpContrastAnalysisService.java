package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;

public interface CorpContrastAnalysisService {
	
	public BaseRespBean getCorpContrastAnalysisList(Map<String, Object> paramMap);

	public BaseRespBean addCorpContrastAnalysis(Map<String, Object> paramMap);
	
}
                        