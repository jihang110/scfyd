package com.ut.scf.dao.pub;

import com.ut.scf.core.dict.PageInfoBean;
import java.util.List;
import java.util.Map;

public interface InterestManagementDao {
	List<Map<String, Object>> getInterestManagementPageList(Map<String, Object> paramMap,PageInfoBean page);
}