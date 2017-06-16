package com.ut.scf.service.project;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.GuaranteeInfo;
import com.ut.scf.respbean.BaseRespBean;

public interface IRefundDepositService {
	public BaseRespBean getRefundDepositInfo(Map<String, Object> paramMap,PageInfoBean page);
	public BaseRespBean updateRefundDepositInfo(GuaranteeInfo guaranteeInfo);
}
