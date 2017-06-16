package com.ut.scf.service.query;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IGuaranteeQueryService {

	BaseRespBean getGuaranteeQueryList(Map<String, Object> paramMap,
			PageInfoBean page);
}
