package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICorpConditionDao {
	List<Map<String, Object>> selectCorpConditionList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> selectCorpConditionList(Map<String, Object> paramMap);
	
	int insertCorpCondition(Map<String, Object> paramMap);

	int deleteCorpCondition(String recUid);

	int updateCorpCondition(Map<String, Object> paramMap);

	Map<String, Object> selectCorpConditionById(String recUid);
	
	int hasOneYear(Map<String, Object> paramMap);
	
	Map<String, Object> calculateData(Map<String, Object> paramMap);

}
