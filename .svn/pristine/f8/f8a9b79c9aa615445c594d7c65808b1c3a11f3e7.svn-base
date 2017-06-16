package com.ut.scf.service.bpm.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.reqbean.bpm.ActFlowDeleteDeployReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.bpm.IActFlowService;

@Service("actFlowService")
public class ActFlowServiceImpl implements IActFlowService{

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActDefinitionList(RepositoryService repositoryService) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (ProcessDefinition processDefinition : repositoryService.createProcessDefinitionQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("definitionKey", processDefinition.getKey());
			map.put("definitionName", processDefinition.getName());
			map.put("deploymentId", processDefinition.getDeploymentId());
			map.put("definitionId", processDefinition.getId());
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActProcessInstanceList(RuntimeService runtimeService) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (ProcessInstance processInstance : runtimeService.createProcessInstanceQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("processInstanceId", processInstance.getId());
			map.put("processDefinitionId", processInstance.getProcessDefinitionId());
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActTaskList(TaskService taskService) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (Task task : taskService.createTaskQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("taskId", task.getId());
			map.put("taskName", task.getName());
			map.put("assignee", task.getAssignee());
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean startActFlow(RuntimeService runtimeService,String processDefinitionId) {
		ListRespBean respBean = new ListRespBean();
		runtimeService.startProcessInstanceById(processDefinitionId);
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean  completeTask(TaskService taskService, Map<String, String> paramMap){
		ListRespBean respBean = new ListRespBean();
		String agreeStr = paramMap.get("agreeStr");
		String taskId = paramMap.get("taskId");
		String taskName = paramMap.get("taskName");
		String userName = paramMap.get("userName");
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("superior", "superior");
		boolean agree;
		if(agreeStr.equals("0")){
			agree = true;
		}else{
			agree = false;
		}
		taskService.setVariable(taskId, "agree", agree);//true批准，false不批准
		if(taskName.equals("会签环节")){
		     taskService.setVariable(taskId, "mulitiInstance", new MulitiInstanceCompleteTask());
		     String currentSignCount = taskService.getVariable(taskId, "signCount").toString();
		     if (agree == true) {
		    	 taskService.setVariable(taskId, "signCount", Integer.parseInt(currentSignCount) + 1);
			}
		}
		taskService.setOwner(taskId, userName);
		taskService.complete(taskId);
		return respBean;
	}
	
	@Override
	public BaseRespBean deployActFlow(RepositoryService repositoryService,String processDefinitionId) {
		ListRespBean respBean = new ListRespBean();
		repositoryService.activateProcessDefinitionById(processDefinitionId);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean terminateActFlow(RuntimeService runtimeService,
			String processInstanceId) {
		ListRespBean respBean = new ListRespBean();
		runtimeService.deleteProcessInstance(processInstanceId, "删除");
		return respBean;
	}	
	/**
	 * 查询历史流程
	 * @param HistoryService
	 * @param paramMap
	 * 		     用户信息
	 * @param boolean finish 
	 * 	               判断结束与否
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getHistoricProcessList(HistoryService historyService,Map<String, Object> paramMap,boolean finish) {
		ListRespBean respBean = new ListRespBean();
		boolean root ;
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		String roleId = paramMap.get("roleId").toString();
		if (roleId.equals("ROLE000001")) {     //是否root用户
			root = true;
		}else {     
			root = false;   
		}
		String userName = paramMap.get("userName").toString();
		List<HistoricTaskInstance> taskList = getHistoricTaskByName(historyService, userName, finish, root);
		list.addAll(getHistoricTaskList(taskList, finish));
		respBean.setDataList(list);
		return respBean;
	}
	/**
	 * 查询历史任务列表
	 * @param userName 
	 * 		    任务办理人
	 * @param finish
	 * 		    是否结束
	 * @param root
	 * 		    是否root用户
	 */
	private List<HistoricTaskInstance> getHistoricTaskByName(HistoryService historyService, String userName, boolean finish, boolean root){
		List<HistoricTaskInstance> taskList;
		if (root == true) {             //root用户查询
			if (finish == true) {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .finished() // 查询已结任务    
			            .list();
			}else {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .unfinished() // 查询未结任务    
			            .list();
			}
		}else {                          //其他用户查询
			if (finish == true) {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .taskCandidateUser(userName)
			            .finished() // 查询已结任务    
			            .list();
			}else {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .taskCandidateUser(userName)
			            .unfinished() // 查询未结任务    
			            .list();
			}
		}
		return taskList;
	}

	/**
	 * 查询历史任务
	 */
	private List<Map<String, String>> getHistoricTaskList(List<HistoricTaskInstance> taskList, boolean finish){
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(HistoricTaskInstance hti:taskList){  
	        Map<String, String> map = new HashMap<String, String>();
	        map.put("taskId", hti.getId());//任务ID
	        map.put("processInstanceId", hti.getProcessInstanceId());//流程实例ID
	        if (hti.getAssignee() == null) {
	        	map.put("assignee", hti.getOwner());//办理人
			}else {
				map.put("assignee", hti.getAssignee());
			}
	        map.put("startTime", sdf.format(hti.getStartTime()));//创建时间
	        if (finish==true) {
	        	map.put("endTime", sdf.format(hti.getEndTime()));//结束时间
			}
	        list.add(map);
		}
		return list;
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean  delteProcessDefinitionByKey(ActFlowDeleteDeployReqBean reqBean,RepositoryService repositoryService){
		BaseRespBean respBean = new BaseRespBean();
		// 先使用流程定义的key查询流程定义，查询出所有的版本  
	    List<ProcessDefinition> list = repositoryService
	            .createProcessDefinitionQuery()  
	            .processDefinitionKey(reqBean.getProcessDefinitionKey())// 使用流程定义的key查询  
	            .list();  
	    // 遍历，获取每个流程定义的部署ID  
	    if (list != null && list.size() > 0) {  
	        for (ProcessDefinition pd : list) {  
	            // 获取部署ID  
	            String deploymentId = pd.getDeploymentId();  
	            if(reqBean.getDeploymentId().equals(deploymentId)){
	            	//      /*  
	            	//       * 不带级联的删除， 只能删除没有启动的流程，如果流程启动，就会抛出异常  
	            	//       */  
	            	//       processEngine.getRepositoryService().deleteDeployment(deploymentId);  
	            	
	            	/** 
	            	 * 级联删除 不管流程是否启动，都可以删除 
	            	 */  
	            	repositoryService.deleteDeployment(deploymentId, true);  
	            	respBean.setResult(ErrorCodeEnum.SUCCESS);
	            }
	        }  
	  
	    }  
		return respBean;
	}
}
