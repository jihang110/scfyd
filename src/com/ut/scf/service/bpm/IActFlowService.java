package com.ut.scf.service.bpm;


import java.util.Map;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;

import com.ut.scf.reqbean.bpm.ActFlowDeleteDeployReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IActFlowService {

	public BaseRespBean getActProcessInstanceList(RuntimeService runtimeService);

	public BaseRespBean getActDefinitionList(RepositoryService repositoryService);
	
	public BaseRespBean getActTaskList(TaskService taskService);
	
	public BaseRespBean startActFlow(RuntimeService runtimeService,String processDefinitionId);
	
	public BaseRespBean completeTask(TaskService taskService, Map<String, String> paramMap);
	
	public BaseRespBean deployActFlow(RepositoryService repositoryService,String processDefinitionId);

	public BaseRespBean terminateActFlow(RuntimeService runtimeService,String processInstanceId);

	public BaseRespBean getHistoricProcessList(HistoryService historyService, Map<String, Object> paramMap, boolean finish);

	public BaseRespBean delteProcessDefinitionByKey(ActFlowDeleteDeployReqBean reqBean, RepositoryService repositoryService);
	
}
