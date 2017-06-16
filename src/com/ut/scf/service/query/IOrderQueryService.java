package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IOrderQueryService {

	BaseRespBean orderInfoInfoList(Map<String, Object> paramMap,
			PageInfoBean page);

	BaseRespBean repayPlanInfo(String batchId);

	BaseRespBean repayPlanInfoList(Map<String, Object> paramMap);

}
