package com.ut.scf.dao.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IReceiveAccountDao {
	List<Map<String, Object>> selectReceiveAccountList(Map<String, Object> paramMap,
			PageInfoBean page);

	int insertReceiveAccount(Map<String, Object> paramMap);

	int deleteReceiveAccount(String recUid);

	int updateReceiveAccount(Map<String, Object> paramMap);
}
