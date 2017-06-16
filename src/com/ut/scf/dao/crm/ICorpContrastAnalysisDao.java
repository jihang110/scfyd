package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

public interface ICorpContrastAnalysisDao {

	List<Map<String, Object>> selectContrastAnalysisList(Map<String, Object> paramMap);
	
	int insertContrastAnalysis(Map<String, Object> paramMap);

	int updateContrastAnalysis(Map<String, Object> paramMap);
	
	Map<String, Object> hasOneYear(Map<String, Object> paramMap);
	
}
