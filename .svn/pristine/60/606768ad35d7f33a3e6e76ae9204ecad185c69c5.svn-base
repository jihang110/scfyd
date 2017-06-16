package com.ut.scf.service.project;

import java.util.List;
import java.util.Map;

import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.project.RepaymentPlanInfoRespBean;

public interface IOrderManagerService {

	BaseRespBean orderInfoById(List<String> orderIds, Map<String, String> map);

	OrderBatchInfo batchInfoById(String batchId);

	List<List<RepaymentPlanInfoRespBean>> getRepaymentPlans(List<String> ids);

	BaseRespBean addRepayPlanInfo(List<String> orderIds, Map<String, String> map);
}
