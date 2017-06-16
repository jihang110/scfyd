package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IClassNewsDao {
	List<Map<String, Object>> selectClassNewsList(Map<String, Object> paramMap,
			PageInfoBean page);

	int insertClassNews(Map<String, Object> paramMap);

	int updateClassNews(Map<String, Object> paramMap);

	int deleteClassNews(Map<String, Object> paramMap);
	
	Map<String, Object> selectClassNews(Map<String, Object> paramMap);
}