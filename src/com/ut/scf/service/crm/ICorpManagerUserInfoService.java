package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ICorpManagerUserInfoService {

	public BaseRespBean getCorpManagerUserInfoList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addCorpManagerUserInfo(Map<String, Object> paramMap);

	public BaseRespBean updateCorpManagerUserInfo(Map<String, Object> paramMap);

	public BaseRespBean deleteCorpManagerUserInfo(Map<String, Object> paramMap);

}
