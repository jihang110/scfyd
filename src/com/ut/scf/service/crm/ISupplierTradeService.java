package com.ut.scf.service.crm;

import java.util.Map;


import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ISupplierTradeService {
	public BaseRespBean getSupplierTradeList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean insertSupplierTrade(Map<String, Object> paramMap);
	
	public BaseRespBean deleteSupplierTrade(Map<String, Object> paramMap);
	
	public BaseRespBean updateSupplierTrade(Map<String, Object> paramMap);
	
	public BaseRespBean getPurchasingRiskAnalyList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean insertPurchasingRiskAnaly(Map<String, Object> paramMap);
	
	public BaseRespBean deletePurchasingRiskAnaly(String recUid);
	
	public BaseRespBean updatePurchasingRiskAnaly(Map<String, Object> paramMap);
}
