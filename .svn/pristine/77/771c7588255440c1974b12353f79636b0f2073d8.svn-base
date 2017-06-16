package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.NegativeInfo;

public interface INegativeInfoDao {
    
	List<Map<String, Object>> selectNegativeInfoList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> selectNegativeInfoList(Map<String, Object> paramMap);
	
	int insertNegativeInfo(Map<String, Object> paramMap);

	int updateNegativeInfo(Map<String, Object> paramMap);
	
	int deleteNegativeInfo(Map<String, Object> paramMap);
	
	Map<String, Object> selectTotalLbEq(Map<String, Object> paramMap);
	
	Map<String, Object> selectEarningsPerShare(Map<String, Object> paramMap);
	
	int hasOneYear(Map<String, Object> paramMap);
    
	int addNegativeInfoRecordBatch(List<NegativeInfo> list);
}