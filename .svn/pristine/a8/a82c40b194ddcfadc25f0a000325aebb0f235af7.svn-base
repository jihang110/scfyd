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
import com.ut.scf.pojo.auto.RepaymentInfo;
import com.ut.scf.reqbean.project.RepayInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.IRepayManagerService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class repayService {
	 /**获得流程引擎*/  
	@Autowired
    ProcessEngine processEngine;
	@Autowired
	private IRepayManagerService repayManagerService;
	@Autowired HistoryService historyService;
	private static final Logger log = LoggerFactory.getLogger(repayService.class);
	
	@Test
	public void deployTest() throws IOException {
		   Deployment deployment = processEngine.getRepositoryService()//获取流程定义和部署相关的Service  
	                .createDeployment()//创建部署对象  
	                .addClasspathResource("还款申请.bpmn")
	                .deploy();//完成部署  
	        System.out.println("部署ID：" + deployment.getId());//部署ID:1  
	        System.out.println("部署时间：" + deployment.getDeploymentTime());//部署时间  
	        
	}
	
	@Test
	public void queryBykey(){
		ProcessDefinitionQuery processDefinitionKey = processEngine.getRepositoryService()  
	            .createProcessDefinitionQuery()  
	            // 查询条件  
	            .processDefinitionKey("repay");
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
	
	/**启动流程实例,test中无法获取上下文*/  
	@Test  
	public void startProcessInstance(){  
	      
		String processDefinitionKey = "repay";//流程定义的key,也就是bpmn中存在的ID  
	    ProcessInstance pi = processEngine.getRuntimeService()//管理流程实例和执行对象，也就是表示正在执行的操作  
	            .startProcessInstanceByKey(processDefinitionKey);
	              
	    System.out.println("流程实例ID：" + pi.getId());//流程实例ID：101  
	    System.out.println("流程实例ID：" + pi.getProcessInstanceId());//流程实例ID：101  
	    System.out.println("流程实例ID:" + pi.getProcessDefinitionId());//myMyHelloWorld:1:4  
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
		taskService.claim("382502", "jiangl");
		System.out.println("任务拾取成功");
	}
	
	/**
	 * 完成
	 */
	@Test
	public void complete(){
		TaskService taskService = processEngine.getTaskService();
		taskService.setVariable("382502", "agree", false);
		taskService.complete("382502");
	}
	@Test
	public void getHistoryVariable(){
		List<HistoricVariableInstance> historyList = processEngine.getHistoryService().createHistoricVariableInstanceQuery().processInstanceId("337501").list();
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		for (HistoricVariableInstance historicVariableInstance : historyList) {
			Map<String, Object> historyMap = new HashMap<String, Object>();
			if(historicVariableInstance.getVariableName().equals("repayInfoJson")){
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
					System.out.println(list);
				}
			}
		}
	}
	/**
	 * 获取变量
	 */
	@Test
	public void getVariable(){
		String processInstanceId = processEngine.getTaskService().createTaskQuery().taskId("337504").singleResult().getProcessInstanceId();
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
			Object value = processEngine.getHistoryService().createHistoricVariableInstanceQuery().variableName("repayInfoJson").taskId(list.get(list.size()-2).getId()).list().get(0).getValue();
			//respBean.setStr(variable.toString());
			System.out.println(value.toString());
		}
	}
	
	/**
	 * 获取还款信息列表
	 */
	@Test
	public void getRepayInfoList(){
		RepayInfoListReqBean reqBean = new RepayInfoListReqBean();
		reqBean.setName("张三");
		Map<String,Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		BaseRespBean list = repayManagerService.getRepayList(paramMap, page);
		log.info("getRepayInfoList : " +	list );
		
	}
	
	/**
	 * 添加还款信息列表
	 */
	@Test
	public void addRepayInfo(){
		BaseRespBean baseRes = new  BaseRespBean();
		RepaymentInfo reqBean = new RepaymentInfo();
		reqBean.setName("张三");
		reqBean.setIdCard("11123213");;
		baseRes = repayManagerService.addRepayInfo(reqBean);
		log.info("addRepayInfo : " +	baseRes );
		
	}
}
