package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface INegativeInfoUploadDao {
	List<Map<String, Object>> selectNegativeInfoUploadList(Map<String, Object> paramMap, PageInfoBean page);

	int insertNegativeInfoUpload(Map<String, Object> paramMap);

	int updateNegativeInfoUpload(Map<String, Object> paramMap);
	
	int deleteNegativeInfoUpload(Map<String, Object> paramMap);
}