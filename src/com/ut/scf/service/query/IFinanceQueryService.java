package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IFinanceQueryService {

	BaseRespBean getCarInfoList(Map<String, Object> paramMap,PageInfoBean page);

	BaseRespBean guaranteeInfoInfoList(Map<String, Object> paramMap,
			PageInfoBean page);

}
