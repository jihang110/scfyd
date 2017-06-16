package com.scf.service.test.pub;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.reqbean.pub.CustListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.pub.ICustManagerService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class custService {
	  /**获得流程引擎*/  
	@Autowired
    ProcessEngine processEngine;
	@Autowired ICustManagerService custManagerService;
	@Autowired IAgencyService agencyService;
	@Autowired HistoryService historyService;
	private static final Logger log = LoggerFactory.getLogger(custService.class);
	@Test
	public void queryBykey(){
		ProcessDefinitionQuery processDefinitionKey = processEngine.getRepositoryService()  
	            .createProcessDefinitionQuery()  
	            // 查询条件  
	            .processDefinitionKey("agencyTest1");
		List<ProcessDefinition> list = processDefinitionKey.list();
		
		 if(list!=null && list.size()>0){  
		        for(ProcessDefinition pd:list){  
		            System.out.println("流程定义的ID："+pd.getId());  
		            System.out.println("流程定义的名称："+pd.getName());  
		            System.out.println("流程定义的Key："+pd.getKey());  
		            System.out.println("流程定义的部署ID："+pd.getDeploymentId());  
		            System.out.println("流程定义的资源名称："+pd.getResourceName());  
		            System.out.println("流程定义的版本："+pd.getVersion());  
		            System.out.println("########################################################");  
		        }  
		    }  
		
	}
	
	@Test
	public void test() throws IOException {
		   Deployment deployment = processEngine.getRepositoryService()//获取流程定义和部署相关的Service  
	                .createDeployment()//创建部署对象  
	                .addClasspathResource("保证金冲抵.bpmn")
	                .deploy();//完成部署  
	        System.out.println("部署ID：" + deployment.getId());//部署ID:1  
	        System.out.println("部署时间：" + deployment.getDeploymentTime());//部署时间  
	        
	}
	/**启动流程实例,test中无法获取上下文*/  
	@Test  
	public void startProcessInstance(){  
	      
		String processDefinitionKey = "agencyTest1";//流程定义的key,也就是bpmn中存在的ID  
	    ProcessInstance pi = processEngine.getRuntimeService()//管理流程实例和执行对象，也就是表示正在执行的操作  
	            .startProcessInstanceByKey(processDefinitionKey);
	              
	    System.out.println("流程实例ID：" + pi.getId());//流程实例ID：101  
	    System.out.println("流程实例ID：" + pi.getProcessInstanceId());//流程实例ID：101  
	    System.out.println("流程实例ID:" + pi.getProcessDefinitionId());//myMyHelloWorld:1:4  
	} 
	@Test
	public void getVariableByTaskId(){
		Object value = processEngine.getHistoryService()
				.createHistoricVariableInstanceQuery()
				.variableName("agencyJson").taskId("450034").singleResult()
				.getValue();
		System.out.println(value);
	}
	/**查看当前任务办理人的个人任务*/  
	@Test  
	public void findPersonnelTaskList(){  
	    String assignee = "jiangl";//当前任务办理人  
	    List<Task> tasks = processEngine.getTaskService()//与任务相关的Service  
	            .createTaskQuery()//创建一个任务查询对象  
	            .taskAssignee(assignee)
	            .list();  
	    if(tasks !=null && tasks.size()>0){  
	        for(Task task:tasks){  
	            System.out.println("任务ID:"+task.getId());  
	            System.out.println("任务的办理人:"+task.getAssignee());  
	            System.out.println("任务名称:"+task.getName());  
	            System.out.println("任务的创建时间:"+task.getCreateTime());  
	            System.out.println("流程实例ID:"+task.getProcessInstanceId());  
	            System.out.println("#####################################");  
	        }  
	    }  
	}
	
	/**
	 * 拾取用户
	 */
	@Test
	public void claim(){
		TaskService taskService = processEngine.getTaskService();
		taskService.claim("220013", "xmfzr");
	}
	
	/**
	 * 获取变量
	 */
	@Test
	public void getVariable(){
		String processInstanceId = processEngine.getTaskService().createTaskQuery().taskId("297523").singleResult().getProcessInstanceId();
//		根据流程id查询出所有的taskId,获取倒数到第二个
//		List<Task> list = taskService.createTaskQuery().processInstanceId(processInstanceId).list();
		List<HistoricTaskInstance> list = processEngine.getHistoryService()  
	            .createHistoricTaskInstanceQuery()  
	            .processInstanceId(processInstanceId)  
	            .list();  
		System.out.println(list.get(list.size()-2).getId());
		StringRespBean respBean = new StringRespBean();
		if(list.size()>1){
			
//			Object variable = processEngine.getTaskService().getVariable(list.get(list.size()-2).getId(), "agencyJson");
			Object value = processEngine.getHistoryService().createHistoricVariableInstanceQuery().variableName("agencyJson").taskId(list.get(list.size()-2).getId()).list().get(0).getValue();
			//respBean.setStr(variable.toString());
			System.out.println(value.toString());
		}
	}
	
	@Test
	public void getData(){
		 Map<String, Object> variables = processEngine.getTaskService().getVariablesLocal("320049");
		 System.out.println(variables);
	}
	
	/**
	 * 完成
	 */
	@Test
	public void complete(){
		TaskService taskService = processEngine.getTaskService();
		taskService.setVariable("220013", "agree", true);
		taskService.complete("220013");
	}
	@Test
	public void getHistoryVariable(){
		List<HistoricVariableInstance> historyList = processEngine.getHistoryService().createHistoricVariableInstanceQuery().processInstanceId("285001").list();
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		for (HistoricVariableInstance historicVariableInstance : historyList) {
			Map<String, Object> historyMap = new HashMap<String, Object>();
			if(historicVariableInstance.getVariableName().equals("agencyJson")){
				Object value = historicVariableInstance.getValue();
				JSONObject jsonObject = new JSONObject(value.toString());
				if(jsonObject.has("advice")){
					String taskId = historicVariableInstance.getTaskId();
					HistoricTaskInstance task = processEngine.getHistoryService().createHistoricTaskInstanceQuery().taskId(taskId).list().get(0);
					historyMap.put("taskName", task.getName());
					historyMap.put("assignee", task.getAssignee());
					historyMap.put("createTime", historicVariableInstance.getCreateTime());
					historyMap.put("advice", jsonObject.get("advice"));
					historyMap.put("taskId", taskId);
					historyMap.put("hisId", historicVariableInstance.getId());
					list.add(historyMap);
				}
			}
		}
	}
	
	@Test
	public void getHistoryTask(){
		List<HistoricTaskInstance> list = processEngine.getHistoryService().createHistoricTaskInstanceQuery().processInstanceId("420001").orderByTaskCreateTime().desc().list();
		for (HistoricTaskInstance historicTaskInstance : list) {
			System.out.println(historicTaskInstance.getCreateTime()); 
			System.out.println(historicTaskInstance.getAssignee());
			System.out.println(historicTaskInstance.getName());
			System.out.println(historicTaskInstance.getProcessInstanceId());
			System.out.println(historicTaskInstance.getEndTime());
			System.out.println(historicTaskInstance.getId());
			
		}
	}
	
	/**
	 * 获取所有符合条件的企业信息
	 */
	@Test
	public void getCustInfoList(){
		CustListReqBean reqBean = new CustListReqBean();
		reqBean.setCorpType("私营企业");
		reqBean.setSysType((byte)6);
		Map<String,Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean list = custManagerService.getcorpList(paramMap, page);
		log.info("deleteCorp : " +	list );
	}
	
	@Test
	public void addCustInfo(){
		CorpInfo corpinfo = new CorpInfo();
		corpinfo.setAgencyNum("343434");
		corpinfo.setCorpType("上市企业");
		corpinfo.setCorpName("不空");
	}
	
	@Test
	public void updateCustInfo(){
		CorpInfo corpinfo = new CorpInfo();
		corpinfo.setCorpId("2c9984ba5c1feeec68521feeec950000");
		corpinfo.setCorpName("不bu空");
	}
	
	@Test
	public void getInfoById(){
		HistoricVariableInstance singleResult = processEngine.getHistoryService().createHistoricVariableInstanceQuery().taskId("500037").singleResult();
		System.out.println(singleResult.getVariableName()+"  "+singleResult.getValue());
	}
} 
