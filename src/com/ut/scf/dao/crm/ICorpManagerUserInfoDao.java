package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICorpManagerUserInfoDao {
	
	List<Map<String, Object>> selectCorpManagerUserInfoList(Map<String, Object> paramMap, PageInfoBean page);

	int insertCorpManagerUserInfo(Map<String, Object> paramMap);

	int updateCorpManagerUserInfo(Map<String, Object> paramMap);
	
	int deleteCorpManagerUserInfo(Map<String, Object> paramMap);
	
}