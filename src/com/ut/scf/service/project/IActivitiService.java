package com.ut.scf.service.project;

import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IActivitiService {

	/**
	 * @param jsonObject
	 *            发起流程
	 */
	public BaseRespBean startProcess(JSONObject jsonObject);

	/**
	 * 代办任务查询
	 */
	public BaseRespBean getAgencyTaskList(Map<String, Object> map,
			PageInfoBean page);

	/**
	 * 获取代办数量
	 * 
	 * @param map
	 * @return
	 */
	public BaseRespBean getAgencyTaskNum(Map<String, Object> map);

	/**
	 * 获取存储在流程中的数据
	 * 
	 * @param taskId
	 *            任务Id
	 * @return
	 */
	public BaseRespBean getDataByTaskId(String taskId);

	/**
	 * 审核的数据
	 * 
	 * @param jsonObject
	 *            需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean doAgree(JSONObject jsonObject);

	/**
	 * 流程再申请
	 * 
	 * @param jsonObject
	 *            需要处理的数据，转换为jsonObject传过来
	 * @return
	 */
	public BaseRespBean reApply(JSONObject jsonObject);

	/**
	 * 获取所有的历史数据
	 * 
	 * @param map
	 *            map
	 * @return
	 */
	public BaseRespBean getAllHistoryVariable(Map<String, Object> map);

	/**
	 * 已办事项列表
	 * 
	 * @param map
	 *            查询数据
	 * @param page
	 *            分页
	 * @return
	 */
	public BaseRespBean getHandleTaskList(Map<String, Object> map,
			PageInfoBean page);

	/**
	 * 获取已办数量
	 * 
	 * @param map
	 * @return
	 */
	public BaseRespBean getHandleTaskNum(Map<String, Object> map);

	/**
	 * 获取所有的任务历史列表
	 * 
	 * @param map
	 *            map
	 * @return
	 */
	public BaseRespBean getHistoryTaskList(Map<String, Object> map);

	BaseRespBean findDataByTaskId(String taskId);
}
