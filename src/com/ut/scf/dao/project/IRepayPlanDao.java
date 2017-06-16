package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRepayPlanDao {

	List<Map<String, Object>> selectRepayPlanInfo(Map<String, Object> paramMap);

	String selectCrReqAmtByBatchId(Map<String, Object> paramMap);

	List<Map<String, Object>> selectRepayInfo(Map<String, Object> paramMap,
			PageInfoBean page);

	List<Map<String, Object>> selectSumAmt(Map<String, Object> paramMap);

	int updateSSMStatus(Map<String, Object> paramMap);
}
