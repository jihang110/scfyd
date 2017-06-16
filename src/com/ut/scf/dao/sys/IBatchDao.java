package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IBatchDao {
	List<Map<String, Object>> selectBatchList(Map<String, Object> paramMap,
			PageInfoBean page);
}