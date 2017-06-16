package com.ut.scf.dao.asset;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IOverdueManageDao {
	List<Map<String, Object>> selectIOverdueManageList(Map<String, Object> paramMap, PageInfoBean page);
	
	int insertOverdueManage(Map<String, Object> paramMap);

	int deleteOverdueManage(String recUid);

	int updateOverdueManage(Map<String, Object> paramMap);
	
	List<Map<String, Object>> selectBadDebtList(Map<String, Object> paramMap, PageInfoBean page);

}
