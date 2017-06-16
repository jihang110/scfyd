package com.ut.scf.service.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.CashFlow;
import com.ut.scf.respbean.BaseRespBean;
/**
 * 
 * @author changxin
 *
 */
public interface ICashFlowService {
	public BaseRespBean getCashFlowList(Map<String, Object> paramMap, PageInfoBean page);
	
	public List<Map<String, Object>> getCashFlowList(Map<String, Object> paramMap);
	
	public BaseRespBean addCashFlow(Map<String, Object> paramMap);

	public BaseRespBean updateCashFlow(Map<String, Object> paramMap);

	public BaseRespBean deleteCashFlow(String recUid);
	
	public BaseRespBean getCashFlowById(String recUid);
	
	public BaseRespBean insertCashFlowBatch(List<CashFlow> list);
}
