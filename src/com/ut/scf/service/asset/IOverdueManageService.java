package com.ut.scf.service.asset;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IOverdueManageService {
	public BaseRespBean getOverdueManageList(Map<String, Object> paramMap, PageInfoBean page);

	
	public BaseRespBean addOverdueManage(Map<String, Object> paramMap);

	public BaseRespBean updateOverdueManage(Map<String, Object> paramMap);

	public BaseRespBean deleteOverdueManage(String recUid);
	
	public BaseRespBean getBadDebtList(Map<String, Object> paramMap, PageInfoBean page);
	
}
