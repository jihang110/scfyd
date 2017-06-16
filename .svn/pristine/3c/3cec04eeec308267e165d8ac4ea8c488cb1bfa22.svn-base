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
import com.ut.scf.service.crm.ICreditReportService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class CreditReportServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(CreditReportServiceTest.class);
    
    @Autowired
    private ICreditReportService creditReportService;
    
    
	@Test
	public void addCreditReportTest()
	{
		for(int i=0;i<10;i++){
			log.info(" start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("relaCorpId", "corp00001");
			paramMap.put("note", "测试1");
			BaseRespBean respBean = creditReportService.addCreditReport(paramMap);
			log.info("addCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addCreditReportTest end");
		}
	}
    
    @Test
    public void corpCreditReportListTest()
    {
    	log.info("**********************************CreditReportListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
		paramMap.put("corpName", "信雅达");
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = creditReportService.getCreditReportList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************CreditReportListTest end*********************************");
    }
    
	@Test
	public void updateCreditReportTest()
	{
		log.info("updateCreditReportTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("creditId", "2c9983885779e78a11c979e78eb90007");
		paramMap.put("relaCorpId", "2c9981e0572164670410216467f10000");
		paramMap.put("note", "2006");
		BaseRespBean respBean = creditReportService.updateCreditReport(paramMap);
		log.info("updateCredit : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateCreditReportTest end");
	}
    
	@Test
	public void deleteCreditReportTest()
	{
		log.info("deleteCreditReportTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("creditId", "2c9983885779e78a11c979e78eb90007");
		BaseRespBean respBean = creditReportService.deleteCreditReport(paramMap);
		log.info("deleteCreditReport : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteCreditReportTest end");
	}
	
}
