package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ISupplierTradeDao {

	List<Map<String, Object>> selectSupplierTradeList(Map<String, Object> paramMap, PageInfoBean page);

	int insertSupplierTrade(Map<String, Object> paramMap);

	int deleteSupplierTrade(String recUid);

	int updateSupplierTrade(Map<String, Object> paramMap);
	
	List<Map<String, Object>> selectPurchasingRiskAnalyList(Map<String, Object> paramMap, PageInfoBean page);
	
	int insertPurchasingRiskAnaly(Map<String, Object> paramMap);
	
	int deletePurchasingRiskAnaly(String recUid);
	
	int updatePurchasingRiskAnaly(Map<String, Object> paramMap);

}
