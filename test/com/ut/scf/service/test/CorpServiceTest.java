package com.ut.scf.service.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.reqbean.sys.CorpAddReqBean;
import com.ut.scf.reqbean.sys.CorpDeleteReqBean;
import com.ut.scf.reqbean.sys.CorpListReqBean;
import com.ut.scf.reqbean.sys.CorpUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.ICorpService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class CorpServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(CorpServiceTest.class);
    
    @Autowired
    private ICorpService corpService;
    
    
	@Test
	public void addCorpTest()
	{
		for(int i=0;i<10;i++){
			log.info("addCorpTest start");
			CorpAddReqBean bean = new CorpAddReqBean();
			bean.setCorpName("测试企业"+i);
			bean.setSysType(2);
			BaseRespBean respBean = corpService.addCorpInfo(bean);
			log.info("addCorp : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addCorpTest end");
		}
	}
    
    @Test
    public void corpListTest()
    {
    	log.info("**********************************userListTest start*********************************");
    	CorpListReqBean reqBean = new CorpListReqBean();
    	reqBean.setCorpName("信雅达友田公司");
    	reqBean.setPageNumber(1);
    	reqBean.setPageSize(5);
    	BaseRespBean respBean = corpService.corpList(reqBean);
    	log.info("userList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************userListTest end*********************************");
    }
    
	@Test
	public void updateCorpTest()
	{
		log.info("updateCorpTest start");
		CorpUpdateReqBean reqBean = new CorpUpdateReqBean();
		reqBean.setCorpId("2c9981e056e4b47b6656e4b47b040000");
		reqBean.setCorpName("更新测试企业");
		BaseRespBean respBean = corpService.updateCorp(reqBean);
		log.info("updateCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateCorpTest end");
	}
    
	@Test
	public void deleteCorpTest()
	{
		log.info("deleteCorpTest start");
		CorpDeleteReqBean reqBean = new CorpDeleteReqBean();
		String CorpId = "2c9981e056e4b47b6656e4b47b040000";
		reqBean.setCorpId(CorpId);
		BaseRespBean respBean = corpService.deleteCorp(reqBean);
		log.info("deleteCorp : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteCorpTest end");
	}
	
}
