package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IFinanceQueryService {

	BaseRespBean carInfoList(String financeId);

	BaseRespBean guaranteeInfoInfoList(Map<String, Object> paramMap,
			PageInfoBean page);

}
