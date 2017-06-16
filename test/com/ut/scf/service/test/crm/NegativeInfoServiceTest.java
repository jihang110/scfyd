package com.ut.scf.service.test.crm;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.INegativeInfoService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class NegativeInfoServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(NegativeInfoServiceTest.class);
    
    @Autowired
    private INegativeInfoService negativeInfoService;
    
    
	@Test
	public void addNegativeInfoTest()
	{
		for(int i=0;i<10;i++){
			log.info("addNegativeInfoTest start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("relaCorpId", "corp00001");
			paramMap.put("operYear", "测试用户");
			BaseRespBean respBean = negativeInfoService.addNegativeInfo(paramMap);
			log.info("addNegativeInfo : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addNegativeInfoTest end");
		}
	}
    
    @Test
    public void corpNegativeInfoListTest()
    {
    	log.info("**********************************NegativeInfoListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
		paramMap.put("corpName", "信雅达");
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = negativeInfoService.getNegativeInfoList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************NegativeInfoListTest end*********************************");
    }
    
	@Test
	public void updateNegativeInfoTest()
	{
		log.info("updateNegativeInfoTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("negId", "2c9983885775420f143c75420f620000");
		paramMap.put("relaCorpId", "2c9981e0572164670410216467f10000");
		paramMap.put("operYear", "2006");
		BaseRespBean respBean = negativeInfoService.updateNegativeInfo(paramMap);
		log.info("updateCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateNegativeInfoTest end");
	}
    
	@Test
	public void deleteNegativeInfoTest()
	{
		log.info("deleteNegativeInfoTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("negId", "2c9983885775420f143c75420f620000");
		BaseRespBean respBean = negativeInfoService.deleteNegativeInfo(paramMap);
		log.info("deleteNegativeInfo : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteNegativeInfoTest end");
	}
	
}
