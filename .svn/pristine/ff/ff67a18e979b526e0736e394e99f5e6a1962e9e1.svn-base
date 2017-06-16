package com.ut.scf.service.test.crm;


import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.service.crm.IAccountAnalyService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class AccountAnalyServiceTest {
	private static final Logger log = LoggerFactory.getLogger(AccountAnalyServiceTest.class);
	@Autowired IAccountAnalyService accountAnalyService;
	@Test
	public void getAccountAnalyListTest(){
	    log.info("**********************************getAccountAnalyListTest start*********************************");
	    Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00002");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		accountAnalyService.getAccountAnalyList(paramMap, page);
		log.info("**********************************getAccountAnalyListTest end*********************************");
	    }
	@Test
	public void insertAccountAnalyTest(){
	    log.info("**********************************insertAccountAnalyTest start*********************************");
	    Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00002");
		paramMap.put("buyerName","买方");
		paramMap.put("contractId","contractId001");
		paramMap.put("invoiceId","invoiceId001");
		paramMap.put("invoiceAmount",1000.00);
		paramMap.put("invoiceTime","2016-08-09 12:00:30");
		paramMap.put("expectedPaymentTime","2016-08-09 12:00:30");
		paramMap.put("actualPaymentTime","2016-08-09 12:00:30");
		paramMap.put("actualPaymentAmount",1000);
		paramMap.put("ifExpired",1);
		paramMap.put("ifOverdue",1);
		paramMap.put("overdueDays",10);
		accountAnalyService.insertAccountAnaly(paramMap);
		log.info("**********************************insertAccountAnalyTest end*********************************");
	    }
	@Test
	public void deleteAccountAnalyTest(){
	    log.info("**********************************deleteAccountAnalyTest start*********************************");
	    String recUid = "2c99838a57a8896c1453a8896c020000";
		accountAnalyService.deleteAccountAnaly(recUid);
		log.info("**********************************deleteAccountAnalyTest end*********************************");
	    }
	@Test
	public void updateAccountAnalyTest(){
	    log.info("**********************************updateAccountAnalyTest start*********************************");
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("recUid","2c99838a57a8896c1453a8896c020000");
	    paramMap.put("buyerName","买方1232");
		paramMap.put("contractId","contractId001");
		paramMap.put("invoiceId","invoiceId001");
		paramMap.put("invoiceAmount",1000.00);
		paramMap.put("invoiceTime","2016-08-09 12:00:30");
		paramMap.put("expectedPaymentTime","2016-08-09 12:00:30");
		paramMap.put("actualPaymentTime","2016-08-09 12:00:30");
		paramMap.put("actualPaymentAmount",1000);
		paramMap.put("ifExpired",1);
		paramMap.put("ifOverdue",1);
		paramMap.put("overdueDays",10);
		accountAnalyService.updateAccountAnaly(paramMap);
		log.info("**********************************updateAccountAnalyTest end*********************************");
	    }
	@Test
	public void accountAnalyProportionTest(){
	    log.info("**********************************accountAnalyProportionTest start*********************************");
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("corpId","corp00001");
		accountAnalyService.AccountAnalyProportion(paramMap);
		log.info("**********************************accountAnalyProportionTest end*********************************");
	    }
}

