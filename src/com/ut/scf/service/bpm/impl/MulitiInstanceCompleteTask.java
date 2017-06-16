package com.ut.scf.service.bpm.impl;

import java.io.Serializable;

import org.activiti.engine.delegate.DelegateExecution;

public class MulitiInstanceCompleteTask implements Serializable{
	private static final long serialVersionUID = 1L;  
    public boolean completeTask(DelegateExecution execution) {  
        System.out.println("总的会签任务数量：" + execution.getVariable("nrOfInstances") + "当前获取的会签任务数量：" + execution.getVariable("nrOfActiveInstances") + " - " + "已经完成的会签任务数量：" + execution.getVariable("nrOfCompletedInstances"));  
        System.out.println("I am invoked.");  
        return false;  
    }  
}
