package com.ut.scf.service.sys;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.sys.WarningReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IWarningService {

	BaseRespBean warningInfoList(Map<String, Object> paramMap, PageInfoBean page);

	BaseRespBean warningInfoDetail(WarningReqBean warningReqBean);

	int warningInfoCount();
}
