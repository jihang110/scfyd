package com.ut.scf.dao.query;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IRateInfoDao {
	List<Map<String, Object>> getRateInfoList(
			Map<String, Object> paramMap, PageInfoBean page);
}
