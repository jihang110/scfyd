package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.Profit;

/**
 * @author jihang
 *
 */
public interface IProfitDao {
	List<Map<String, Object>> selectProfitList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> selectProfitList(Map<String, Object> paramMap);

	int insertProfit(Map<String, Object> paramMap);

	int deleteProfit(String recUid);

	int updateProfit(Map<String, Object> paramMap);

	Map<String, Object> selectProfitById(String recUid);
	
	int hasOneYear(Map<String, Object> paramMap);
	
	int addProfitRecordBatch(List<Profit> list);
}
