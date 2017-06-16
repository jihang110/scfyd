package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRevenueDao {
	List<Map<String, Object>> getDykRepayMent(Map<String, Object> paramMap,PageInfoBean page);
	
	int addDykRepayMent(Map<String, Object> paramMap);
	
    int updateDykRepayMent(Map<String, Object> paramMap);
	
	int deleteDykRepayMent(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getRevenueInfoByAgency(Map<String, Object> paramMap);
	
	
	
}
