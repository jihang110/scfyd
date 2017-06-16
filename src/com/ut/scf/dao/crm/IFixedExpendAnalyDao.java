package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

/**
 * 
 * @author changxin
 *
 */
public interface IFixedExpendAnalyDao {
	
	List<Map<String, Object>> selectFixedExpendAnalyList(
			Map<String, Object> paramMap, PageInfoBean page);

	int insertFixedExpendAnaly(Map<String, Object> paramMap);

	int deleteFixedExpendAnaly(String recUid);

	int updateFixedExpendAnaly(Map<String, Object> paramMap);

}
