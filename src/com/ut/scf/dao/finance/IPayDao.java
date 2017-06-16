package com.ut.scf.dao.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IPayDao {
	List<Map<String, Object>> selectPayList(Map<String, Object> paramMap, PageInfoBean page);

	int insertPay(Map<String, Object> paramMap);

	int deletePay(String recUid);

	int updatePay(Map<String, Object> paramMap);
}
