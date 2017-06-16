package com.ut.scf.service.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.Profit;
import com.ut.scf.respbean.BaseRespBean;

public interface IProfitService {
	public BaseRespBean getProfitList(Map<String, Object> paramMap, PageInfoBean page);
	
	public List<Map<String, Object>> getProfitList(Map<String, Object> paramMap);
	
	public BaseRespBean insertProfit(Map<String, Object> paramMap);
	
	public BaseRespBean deleteProfit(String recUid);
	
	public BaseRespBean updateProfit(Map<String, Object> paramMap);
	
	public BaseRespBean getProfitById(String recUid);
	
	public BaseRespBean insertProfitBatch(List<Profit> list);
}
