package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IPrdInfoDao {
	List<Map<String, Object>> getProductIfnoPageList(Map<String, Object> paramMap,PageInfoBean page);
	
}
