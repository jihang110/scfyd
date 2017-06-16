package com.ut.scf.service.test.bpm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.service.bpm.IWorkFlowService;
import com.ut.scf.service.sys.IUserOperService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class SunflowServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(SunflowServiceTest.class);
    
    @Autowired
    private IWorkFlowService workflowService;
    
    @Autowired
    private IUserOperService userService;
    
    @Before
	public void before1() throws Exception {
		List<Map<String, Object>> sysConfigList = userService.getAllSysConfig();
		for (Map<String, Object> sc : sysConfigList) {
			ScfCacheDict.sysConfigMap.put((String) sc.get("itemKey"), (String) sc.get("itemValue"));
		}
		
		log.debug("++++++++++++++++++　　数据字典缓存结束　　+++++++++++++++++++++");
	}

    
	@Test
	public void creatProcTest()
	{
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("port", "1093");
		paramMap.put("url", "127.0.0.1");
		paramMap.put("areaCode", "1001");
		paramMap.put("createUserId", "u00003");
		paramMap.put("workflowNm", "ReleaseSpecialItem");
		workflowService.create(paramMap);
	}
	
}
