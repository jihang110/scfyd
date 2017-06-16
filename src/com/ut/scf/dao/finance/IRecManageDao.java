package com.ut.scf.dao.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRecManageDao {
	List<Map<String, Object>> selectRecManageList(Map<String, Object> paramMap,
			PageInfoBean page);

	int countExistRecord(Map<String, Object> paramMap);
	
	int insertRecManage(Map<String, Object> paramMap);

	int deleteRecManage(String recUid);

	int updateRecManage(Map<String, Object> paramMap);
	
	int updateStatus(Map<String, Object> paramMap);
}
