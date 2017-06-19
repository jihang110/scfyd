package com.ut.scf.service.project;

import javax.servlet.http.HttpSession;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.reqbean.project.PayCommitProcessReqBean;
import com.ut.scf.reqbean.project.PayCommitmentListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IPayCommitmentService {
	
	BaseRespBean getPayInfoList(PayCommitmentListReqBean reqBean);
	
	BaseRespBean agencyFinanceList(PayCommitmentListReqBean reqBean);
	
	BaseRespBean startProcess(JSONObject jsonObject, HttpSession httpSession);
	
	BaseRespBean getDataByTaskId(TaskInfoReqBean reqBean);
	
	void fillGuarantee(PayCommitProcessReqBean reqBean);
	
	boolean doAgree(PayCommitProcessReqBean reqBean);
	
	BaseRespBean reApply(PayCommitProcessReqBean reqBean, HttpSession httpSession);
	
	BaseRespBean updateFinance(PayCommitProcessReqBean reqBean, HttpSession httpSession);
}
