package com.ut.scf.dao.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICollectionManageDao {
	 	List<Map<String, Object>> selectCollectionManageList(Map<String, Object> paramMap,
				PageInfoBean page);

		int insertCollectionManage(Map<String, Object> paramMap);

		int deleteCollectionManage(String recUid);

		int updateCollectionManage(Map<String, Object> paramMap);
}
