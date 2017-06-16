package com.ut.scf.service.crm;

import java.util.Map;


import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ICustomerTradeService {
	public BaseRespBean getCustomerTradeList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean insertCustomerTrade(Map<String, Object> paramMap);
	
	public BaseRespBean deleteCustomerTrade(Map<String, Object> paramMap);
	
	public BaseRespBean updateCustomerTrade(Map<String, Object> paramMap);
	
	public BaseRespBean getSalesRiskAnalyList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean insertSalesRiskAnaly(Map<String, Object> paramMap);
	
	public BaseRespBean deleteSalesRiskAnaly(String recUid);
	
	public BaseRespBean updateSalesRiskAnaly(Map<String, Object> paramMap);
}
