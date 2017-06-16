package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IPayCommitmentDao {

	List<Map<String, Object>> getPayInfoList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> getAgencyFinanceList(Map<String, Object> paramMap, PageInfoBean page);
}
