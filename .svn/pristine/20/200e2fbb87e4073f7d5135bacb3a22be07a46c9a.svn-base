package com.ut.scf.service.project;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.project.FinanceFlowReqBean;
import com.ut.scf.reqbean.project.FinanceInfoListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;


/**
 * 融资
 * @author Yuancy
 *
 */
public interface IFinanceInfoService {

	public BaseRespBean getFinanceInfoList(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean getProGuarantee(FinanceInfoListReqBean reqBean);
	
	void startProcess(JSONObject jsonObject);
	
	public BaseRespBean getFinanceInfo(TaskInfoReqBean flowReqBean);
	
	void applyGuarantee(FinanceFlowReqBean flowReqBean);
	
	public boolean doAgree(FinanceFlowReqBean reqBean);
	
	void reApply(FinanceFlowReqBean reqBean);
	
	public BaseRespBean addFinance(FinanceFlowReqBean reqBean);
}
