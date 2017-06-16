package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

/**
 * 
 * @author changxin
 *
 */
public interface ICorpEvalDao {
	
	List<Map<String, Object>> corpEvalList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	int insertCorpEval(Map<String, Object> paramMap);

	int updateCorpEval(Map<String, Object> paramMap);

}
