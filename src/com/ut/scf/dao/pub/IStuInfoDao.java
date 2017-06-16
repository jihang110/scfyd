package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IStuInfoDao {
	List<Map<String, Object>> getStuIfnoPageList(Map<String, Object> paramMap,PageInfoBean page);
	List<Map<String, Object>> getStuDetailList(Map<String, Object> paramMap);
}
