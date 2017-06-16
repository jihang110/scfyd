package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.CorpDept;

public interface IDeptDao {
	
	List<Map<String, Object>> getDeptPageList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> getDeptList(Map<String, Object> paramMap);
	
	int countDeptByName(Map<String, Object> paramMap);
	
	int insertDept(Map<String, Object> paramMap);

	int updateDept(Map<String, Object> paramMap);
	
	int countDeptByParentId(String parentId);
	
	int countUserByDeptId(String deptId);
	
	CorpDept queryDeptById(String deptId);

}