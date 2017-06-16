package com.ut.scf.reqbean;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

public class LogReqBean extends BaseReqBean
{
    
    /**
     * 日志级别
     */
    @NotBlank(message = "{log.level.notblank}")
    @Pattern(regexp = "DEBUG|INFO|WARN|ERROR|FATAL", message = "{log.level.pattern}")
    private String logLevel;
    
    public String getLogLevel()
    {
        return logLevel;
    }
    
    public void setLogLevel(String logLevel)
    {
        this.logLevel = logLevel;
    }
    
}
