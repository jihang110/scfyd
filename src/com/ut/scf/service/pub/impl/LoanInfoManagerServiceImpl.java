package com.ut.scf.service.pub.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.LoanInfoMapper;
import com.ut.scf.dao.pub.ILoanInfoDao;
import com.ut.scf.pojo.auto.LoanInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.pub.ILoanInfoManagerService;

@Service("loanInfoManagerService")
public class LoanInfoManagerServiceImpl implements ILoanInfoManagerService{
	private static final Logger log = LoggerFactory
			.getLogger(LoanInfoManagerServiceImpl.class);
	
	@Resource
	private ILoanInfoDao loanInfoDao;
	
	@Resource
	private LoanInfoMapper loanInfoMapper;
	
	@Resource 
	ProcessEngine processEngine;
	
	@Resource 
	RuntimeService runtimeService;
	
	@Resource 
	TaskService taskService;
	
	@Resource
	RepositoryService repositoryService;
	
	
	/**
	 * 条件查询 分页获取
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getLoanInfoList(Map<String, Object> paramMap,PageInfoBean page) {
		
		List<Map<String, Object>> list = loanInfoDao.getLoanInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		
		log.debug("LoanInfo list : {}", list);
		
		
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	

	/**
	 * 新增 
	 * 
	 * @param paramMap
	 * 
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertLoanInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		paramMap.put("loanId", ScfUUID.generate());
		
		LoanInfo record = new LoanInfo();
		BeanUtil.mapToBean(paramMap, record);
		int insertNum = loanInfoMapper.insert(record);
		
		log.debug("insert loanInfo num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}
	
	/**
	 * 删除   
	 * 
	 * @param loanId
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteLoanInfo(String loanId) {
		BaseRespBean respBean = new BaseRespBean();
		LoanInfo record = new LoanInfo();
		record.setLoanId(loanId);
		int deleteNum = loanInfoMapper.deleteByPrimaryKey(loanId);
		log.debug("delete loanInfo num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}
	
	/**
	 * 修改   
	 * 
	 * @param loanInfo
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateLoanInfo(LoanInfo loanInfo) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(loanInfo);
		LoanInfo record = new LoanInfo();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = loanInfoMapper.updateByPrimaryKeySelective(record);
		log.debug("update im num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}
	
	
	/**
	 * 发起流程
	 */
	public void startProcess(JSONObject jsonObject) {
		String userName = (String) jsonObject.get("userId");
		String key = (String) jsonObject.get("activitiKey");
//		加上当前用户
		ProcessInstance pi = processEngine.getRuntimeService()//管理流程实例和执行对象，也就是表示正在执行的操作  
		            .startProcessInstanceByKey(key);
//		TaskService taskService = processEngine.getTaskService();//获取任务的Service，设置和获取流程变量  
		Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).singleResult();
//		获取所有的候选人
//		List<IdentityLink> identityLinksForTask = taskService.getIdentityLinksForTask(task.getId());
//		判断候选人

//		拾取用户
		taskService.claim(task.getId(), userName);
//		设置变量
		taskService.setVariableLocal(task.getId(), "agencyJson", jsonObject.toString());
//		完成节点
		taskService.complete(task.getId());
		
		System.out.println("完成任务"+task.getId());
	}
	

	@Override
	public BaseRespBean doAgree(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		boolean flag;
		StringRespBean respBean = new StringRespBean(); 
//		1.获取taskId和当前用户
		String taskId = (String) jsonObject.get("taskId");
		String agree = (String) jsonObject.get("agree");
		String userId = (String) jsonObject.get("userId");
		
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.流程走向
		if(agree.equals("0")){
			flag = 	true;
		}else{
			flag = 	false;
		}
		taskService.setVariable(taskId, "agree", flag);
//		5.完成流程
		taskService.complete(taskId);
		respBean.setStr(jsonObject.toString());
		return respBean;
	}

	@Override
	public BaseRespBean reApply(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		BaseRespBean respBean = new BaseRespBean(); 
//		1.获取taskId和userId
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置流程变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.完成流程
		taskService.complete(taskId);
		return respBean;
	}
	
}
