package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IActivitiDao {
	List<Map<String, Object>> selectAgencyTask(Map<String, Object> paramMap,PageInfoBean page);
	int countAgencyTask(Map<String, Object> paramMap);
	List<Map<String, Object>> selectHandleTask(Map<String, Object> paramMap,PageInfoBean page);
	int countHandleTask(Map<String, Object> paramMap);
}
