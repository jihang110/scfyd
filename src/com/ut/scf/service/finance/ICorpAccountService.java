package com.ut.scf.service.finance;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ICorpAccountService {
	public BaseRespBean getCorpAccountList(Map<String, Object> paramMap,
			PageInfoBean page);

	public BaseRespBean addCorpAccount(Map<String, Object> paramMap);

	public BaseRespBean updateCorpAccount(Map<String, Object> paramMap);

	public BaseRespBean deleteCorpAccount(String recUid);
}
