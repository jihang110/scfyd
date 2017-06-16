package com.ut.scf.service.bpm.impl;

import java.util.Arrays;
import java.util.List;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

/**
 * 设置会签成员
 * @author zyx
 *
 */
public class ActAssgineeMultiInstancePer implements JavaDelegate {
	    public void execute(DelegateExecution execution) throws Exception {  
	        System.out.println("设置会签环节的人员.");  
	        execution.setVariable("pers", Arrays.asList("张三", "李四", "王五", "赵六")); 
	        //初始化同意人数
	        execution.setVariable("signCount", 0);
	        //总共会签的人数
	        List list = (List)execution.getVariable("pers");
	        int signSize = list.size();
	        execution.setVariable("signSize", signSize);
	    }  
}
