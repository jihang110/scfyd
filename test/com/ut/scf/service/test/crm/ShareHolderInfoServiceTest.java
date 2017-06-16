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
import com.ut.scf.service.crm.IShareHolderService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class ShareHolderInfoServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(ShareHolderInfoServiceTest.class);
    
    @Autowired
    private IShareHolderService shareHolderService;
    
    
	@Test
	public void addShareHolderInfoTest()
	{
		for(int i=0;i<10;i++){
			log.info("addShareHolderTest start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("shareName", "测试股东");
			paramMap.put("shareType", "测试用户");
			paramMap.put("relaCorpId", "corp00001");
			BaseRespBean respBean = shareHolderService.addShareHolderInfo(paramMap);
			log.info("addShareHolder : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addShareHolderTest end");
		}
	}
    
    @Test
    public void corpShareHolderInfoListTest()
    {
    	log.info("**********************************ShareHolderInfoListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
    	paramMap.put("shareName", "测试股东");
		paramMap.put("shareType", "测试用户");
		paramMap.put("corpName", "信雅达");
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = shareHolderService.getShareHolderInfoList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************ShareHolderInfoListTest end*********************************");
    }
    
	@Test
	public void updateShareHolderInfoTest()
	{
		log.info("updateCorpTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("shareHolderId", "2c998388577516dd0a867516e0b10004");
		paramMap.put("relaCorpId", "2c9981e0572164670410216467f10000");
		paramMap.put("userName", "新的测试用户");
		paramMap.put("note", "测试两下");
		BaseRespBean respBean = shareHolderService.updateShareHolderInfo(paramMap);
		log.info("updateCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateCorpTest end");
	}
    
	@Test
	public void deleteShareHolderInfoTest()
	{
		log.info("deleteShareHolderInfoTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("shareHolderId", "2c998388577516dd0a867516e0b10004");
		BaseRespBean respBean = shareHolderService.deleteShareHolderInfo(paramMap);
		log.info("deleteShareHolderInfo : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteShareHolderInfoTest end");
	}
	
}
