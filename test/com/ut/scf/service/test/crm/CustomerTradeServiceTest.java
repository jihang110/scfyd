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
import com.ut.scf.service.crm.ICustomerTradeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class CustomerTradeServiceTest {
    private static final Logger log = LoggerFactory.getLogger(CustomerTradeServiceTest.class);
    @Autowired ICustomerTradeService customerTradeService;
    @Test
    public void getCustomerTradeListTest(){
    	log.info("**********************************getCustomerTradeListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00001");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		customerTradeService.getCustomerTradeList(paramMap, page);
		log.info("**********************************getCustomerTradeListTest end*********************************");
    }
    
    @Test
    public void insertCustomerTradeTest(){
    	log.info("**********************************insertCustomerTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("customerName","啦啦啦");
    	paramMap.put("corpId","corp00002");
    	paramMap.put("operTime","201610");
    	paramMap.put("currentSales",1000.00);
    	paramMap.put("currentPayment",1000.00);
    	paramMap.put("receivableBalance",2000.00);
    	paramMap.put("currentAgreementPayment",20.00);
    	paramMap.put("currentRealPayment",2000.00);
    	paramMap.put("loanAmount",2000.00);
    	paramMap.put("paymentScale",10.00);
    	customerTradeService.insertCustomerTrade(paramMap);
    	log.info("**********************************insertCustomerTradeTest end*********************************");
    }
    
    @Test
    public void deleteCustomerTradeTest(){
    	log.info("**********************************deleteCustomerTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("recUid","2c998384574f666c51db4f6855330001");
    	customerTradeService.deleteCustomerTrade(paramMap);
    	log.info("**********************************deleteCustomerTradeTest end*********************************");
    }
    
    @Test
    public void updateSupplierTradeTest(){
    	log.info("**********************************updateSupplierTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("recUid","123");
    	paramMap.put("customerName","啦啦啦");
    	paramMap.put("corpId","corp00002");
    	paramMap.put("operTime","201610");
    	paramMap.put("currentSales",1000.00);
    	paramMap.put("currentPayment",1000.00);
    	paramMap.put("receivableBalance",2000.00);
    	paramMap.put("currentAgreementPayment",20.00);
    	paramMap.put("currentRealPayment",2000.00);
    	paramMap.put("loanAmount",2000.00);
    	paramMap.put("paymentScale",10.00);
    	customerTradeService.updateCustomerTrade(paramMap);
    	log.info("**********************************updateSupplierTradeTest end*********************************");
    }
}
