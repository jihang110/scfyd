package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRepayManagerDao {

	List<Map<String, Object>> getRepayList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> getCarInfoList(Map<String, Object> paramMap);

	List<Map<String, Object>> repayPlanInfoList(Map<String, Object> paramMap);
}
