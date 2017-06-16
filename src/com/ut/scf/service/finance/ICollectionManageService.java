package com.ut.scf.service.finance;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ICollectionManageService {
	public BaseRespBean getCollectionManageList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addCollectionManage(Map<String, Object> paramMap);

	public BaseRespBean updateCollectionManage(Map<String, Object> paramMap);

	public BaseRespBean deleteCollectionManage(String recUid);
}
