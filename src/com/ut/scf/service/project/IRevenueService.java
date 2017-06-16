package com.ut.scf.service.project;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.RevenueManagement;
import com.ut.scf.respbean.BaseRespBean;

public interface IRevenueService {

	public BaseRespBean getDykRepayMent(Map<String, Object> paramMap, PageInfoBean page);
	
	public BaseRespBean insertDykRepayMent(Map<String, Object> paramMap);
	
	public BaseRespBean updateDykRepayMent(Map<String, Object> paramMap);
	
	//public BaseRespBean deleteDykRepayMent(String repaymentId);
	
	
	/**
	 * @param jsonObject
	 * 发起流程
	 */
	public void startProcess(JSONObject jsonObject);
	
	/**
	 * 审核的数据
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean doAgree(JSONObject jsonObject);
	
	/**
	 * 流程再申请
	 * @param jsonObject 需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean reApply(JSONObject jsonObject);
}
