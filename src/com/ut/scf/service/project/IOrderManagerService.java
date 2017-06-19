package com.ut.scf.service.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.respbean.BaseRespBean;

public interface IOrderManagerService {

	BaseRespBean orderInfoById(String batchId, Map<String, String> map);

	OrderBatchInfo batchInfoById(String batchId);

	List<List<Map<String, Object>>> getRepaymentPlans(String orderIds);

	BaseRespBean addRepayPlanInfo(List<String> orderIds, Map<String, String> map);
}
