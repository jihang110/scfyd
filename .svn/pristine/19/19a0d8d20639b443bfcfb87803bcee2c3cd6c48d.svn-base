package com.ut.scf.core.util;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.impl.cmd.GetBpmnModelCmd;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.interceptor.Command;
import org.activiti.engine.impl.interceptor.CommandContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ExecutionEntityManager;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;


public class ActProcessInstanceDiagramCmd implements Command<InputStream> {
    protected String processInstanceId;

    public ActProcessInstanceDiagramCmd(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public InputStream execute(CommandContext commandContext) {
        ExecutionEntityManager executionEntityManager = commandContext
            .getExecutionEntityManager();
        ExecutionEntity executionEntity = executionEntityManager
            .findExecutionById(processInstanceId);
        List<String> activiityIds = executionEntity.findActiveActivityIds();
        String processDefinitionId = executionEntity.getProcessDefinitionId();

        GetBpmnModelCmd getBpmnModelCmd = new GetBpmnModelCmd(
                processDefinitionId);
        BpmnModel bpmnModel = getBpmnModelCmd.execute(commandContext);
        ProcessEngineConfiguration processEngineConfiguration = Context
                .getProcessEngineConfiguration();
        InputStream is = new DefaultProcessDiagramGenerator().generateDiagram(bpmnModel,
                "png", activiityIds, Collections.<String>emptyList(), 
                processEngineConfiguration.getProcessEngineConfiguration().getActivityFontName(), 
                processEngineConfiguration.getProcessEngineConfiguration().getLabelFontName(), 
                null, 1.0);

        return is;
    }
}
