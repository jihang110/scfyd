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
import com.ut.scf.service.crm.IBankStreamService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class BankStreamServiceTest {
    private static final Logger log = LoggerFactory.getLogger(BankStreamServiceTest.class);
    @Autowired IBankStreamService bankStreamService;
    @Test
    public void getCustomerBankStreamListTest(){
    	log.info("**********************************getCustomerBankStreamListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00001");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		bankStreamService.getCustomerBankStreamList(paramMap, page);
		log.info("**********************************getCustomerBankStreamListTest end*********************************");
    }
    
    @Test
    public void addCustomerBankStreamTest(){
    	log.info("**********************************addCustomerBankStreamTest start*********************************");
    	/*
    	 * "corpId": "corp00001",
  "bankName": "光大银行",
  "bankAccount": "B24444",
  "operTime": "201607",
  "amount": 20000.00

    	 */
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("corpId","corp00002");
    	paramMap.put("operTime","201610");
    	paramMap.put("bankName","光大银行");
    	paramMap.put("bankAccount","B24444");
    	paramMap.put("amount",20000.00);
    	bankStreamService.addCustomerBankStream(paramMap);
    	log.info("**********************************addCustomerBankStreamTest end*********************************");
    }
    
    @Test
    public void deleteCustomerBankStreamTest(){
    	log.info("**********************************deleteCustomerBankStreamTest start*********************************");
    	bankStreamService.deleteCustomerBankStream("2c9983845755d4af2ff055d4af490000");
    	log.info("**********************************deleteCustomerBankStreamTest end*********************************");
    }
    
    @Test
    public void updateCustomerBankStreamTest(){
    	log.info("**********************************updateCustomerBankStreamTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("recUid","2c9983845750e8da2752510104b70004");
    	paramMap.put("corpId","corp00001");
    	paramMap.put("operTime","201610");
    	paramMap.put("bankName","招商1银行");
    	paramMap.put("bankAccount","B24444");
    	paramMap.put("amount",20000.00);
    	bankStreamService.updateCustomerBankStream(paramMap);
    	log.info("**********************************updateCustomerBankStreamTest end*********************************");
    }
    
    @Test
    public void customerBankStreamStatisticTest(){
    	log.info("**********************************customerBankStreamStatisticTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("corpId","corp00001");
    	bankStreamService.customerBankStreamStatistic(paramMap);
    	log.info("**********************************customerBankStreamStatisticTest end*********************************");
    }
}
