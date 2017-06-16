package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.CashFlow;

public interface ICashFlowDao {
	List<Map<String, Object>> selectCashFlowList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> selectCashFlowList(Map<String, Object> paramMap);
	
	int insertCashFlow(Map<String, Object> paramMap);

	int deleteCashFlow(String recUid);

	int updateCashFlow(Map<String, Object> paramMap);

	Map<String, Object> selectCashflowById(String recUid);
	
	int hasOneYear(Map<String, Object> paramMap);
	
	int addCashFlowRecordBatch(List<CashFlow> list);
}
