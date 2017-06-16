package com.ut.scf.service.finance;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IPayService {
	public BaseRespBean getPayList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addPay(Map<String, Object> paramMap);

	public BaseRespBean updatePay(Map<String, Object> paramMap);

	public BaseRespBean deletePay(String recUid);
}
