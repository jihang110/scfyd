package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IGaranteeMoneyDao {
	
	List<Map<String, Object>> getGaranteeMoneyPageList(Map<String, Object> paramMap,PageInfoBean page);
	
	List<Map<String, Object>> getGaranteeMoneyByName(Map<String, Object> paramMap);
}
