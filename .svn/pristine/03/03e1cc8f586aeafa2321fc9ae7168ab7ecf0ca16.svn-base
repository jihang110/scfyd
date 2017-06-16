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
import com.ut.scf.service.crm.ICorpManagerUserInfoService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class CorpManagerUserInfoServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(CorpManagerUserInfoServiceTest.class);
    
    @Autowired
    private ICorpManagerUserInfoService corpManagerUserInfoService;
    
    
	@Test
	public void addCorpManagerUserInfoTest()
	{
		for(int i=0;i<10;i++){
			log.info("addCorpTest start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("relaCorpId", "corp00001");
			paramMap.put("userName", "测试用户");
			paramMap.put("note", "测试一下");
			BaseRespBean respBean = corpManagerUserInfoService.addCorpManagerUserInfo(paramMap);
			log.info("addCorp : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addCorpTest end");
		}
	}
    
    @Test
    public void corpManagerUserInfoListTest()
    {
    	log.info("**********************************CorpManagerUserInfoListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
		paramMap.put("userName", "测试");
		paramMap.put("education", "");
		paramMap.put("userType", "");
		paramMap.put("hasBadCredit", 1);
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = corpManagerUserInfoService.getCorpManagerUserInfoList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************CorpManagerUserInfoListTest end*********************************");
    }
    
	@Test
	public void updateCorpManagerUserInfoTest()
	{
		log.info("updateCorpTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpManagerId", "2c9983885774f55179b774f558ce0005");
		paramMap.put("relaCorpId", "2c9981e0572164670410216467f10000");
		paramMap.put("userName", "新的测试用户");
		paramMap.put("note", "测试两下");
		BaseRespBean respBean = corpManagerUserInfoService.updateCorpManagerUserInfo(paramMap);
		log.info("updateCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateCorpTest end");
	}
    
	@Test
	public void deleteCorpManagerUserInfoTest()
	{
		log.info("deleteCorpTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpManagerId", "2c9983885774f55179b774f558ce0005");
		BaseRespBean respBean = corpManagerUserInfoService.deleteCorpManagerUserInfo(paramMap);
		log.info("deleteCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteCorpTest end");
	}
	
}
