package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

/**
 * 
 * @author changxin
 *
 */
public interface IFixedExpendDao {
	List<Map<String, Object>> selectFixedExpendList(Map<String, Object> paramMap, PageInfoBean page);
	
	int insertFixedExpend(Map<String, Object> paramMap);
	
	int deleteFixedExpend(String recUid);

	int updateFixedExpend(Map<String, Object> paramMap);

	int hasOneYear(Map<String, Object> paramMap);
	
}
