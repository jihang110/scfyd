package com.ut.scf.service.sys;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IHomeInfoUserDefineService {
	public BaseRespBean getHomeInfoUserDefineList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addHomeInfoUserDefine(Map<String, Object> paramMap);

	public BaseRespBean updateHomeInfoUserDefine(Map<String, Object> paramMap);

	public BaseRespBean deleteHomeInfoUserDefine(String recUid);
	
}
