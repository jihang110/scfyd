package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.FlowListInfo;

public interface IExpenseDao {
	
	List<Map<String, Object>> selectExpenseList(Map<String, Object> paramMap);

	int insertExpense(Map<String, Object> paramMap);

	int deleteExpense(String recUid);

	int updateExpense(Map<String, Object> paramMap);
    
	List<FlowListInfo> selectNotProcList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<FlowListInfo> selectNotProcList(Map<String, Object> paramMap);
			
	List<FlowListInfo> selectOverProcList(Map<String, Object> paramMap, PageInfoBean page);
	
	int countProjectName(Map<String, Object> paramMap);
}