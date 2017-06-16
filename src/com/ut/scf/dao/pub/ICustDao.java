package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

/**
 * @author jihang
 *
 */
public interface ICustDao {
	List<Map<String, Object>> getUserByRole(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getCorpInfoList(Map<String, Object> paramMap,PageInfoBean page);
    
    List<Map<String, Object>> getCorpInfoList(Map<String, Object> paramMap);
    
}
