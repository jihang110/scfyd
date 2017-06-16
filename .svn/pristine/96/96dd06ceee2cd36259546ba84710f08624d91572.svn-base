package com.ut.scf.service.project;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.respbean.BaseRespBean;

public interface ISignContractService {

	Map<String, String> sendContract(String path) throws Exception;

	JSONObject autoSignFopp(String signid) throws Exception;

	String viewContract(String signid, String fileid) throws Exception;

	BaseRespBean batchInfoList(PageInfoBean page);

	BaseRespBean repaymentInfoList(Map<String, Object> paramMap);

	String getCrReqAmtByBatchId(Map<String, Object> paramMap);

	OrderBatchInfo batchInfoById(String batchId);

	BaseRespBean insertContract(Map<String, Object> paramMap);

	BaseRespBean orderInfoByBatchId(Map<String, Object> paramMap,
			PageInfoBean page);

	double getGuaranteeRate(String id);

	List<Map<String, Object>> repayPlanInfoList(Map<String, Object> paramMap);

}
