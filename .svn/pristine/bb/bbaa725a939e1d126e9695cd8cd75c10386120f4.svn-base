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
import com.ut.scf.service.crm.ISupplierTradeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class SupplierTradeServiceTest {
    private static final Logger log = LoggerFactory.getLogger(SupplierTradeServiceTest.class);
    
    @Autowired ISupplierTradeService supplierTradeService;
	
    @Test
    public void getSupplierTradeListTest(){
    	log.info("**********************************getSupplierTradeListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00001");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		supplierTradeService.getSupplierTradeList(paramMap,page);
		log.info("**********************************getSupplierTradeListTest end*********************************");
    }
    
    @Test
    public void insertSupplierTradeTest(){
    	log.info("**********************************insertSupplierTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("supplierName","啦啦啦");
    	paramMap.put("corpId","corp00002");
    	paramMap.put("operTime","201610");
    	paramMap.put("currentBuy",1000.00);
    	paramMap.put("currentPay",1000.00);
    	paramMap.put("balance",2000.00);
    	paramMap.put("paymentScale",10.00);
    	supplierTradeService.insertSupplierTrade(paramMap);
    	log.info("**********************************insertSupplierTradeTest end*********************************");
    }
    
    @Test
    public void deleteSupplierTradeTest(){
    	log.info("**********************************deleteSupplierTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("recUid","2c9983845755b311319e55b311a20000");
    	supplierTradeService.deleteSupplierTrade(paramMap);
    	log.info("**********************************deleteSupplierTradeTest end*********************************");
    }
    
    @Test
    public void updateSupplierTradeTest(){
    	log.info("**********************************updateSupplierTradeTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	paramMap.put("recUid","123");
    	paramMap.put("supplierName","啦啦啦");
    	paramMap.put("corpId","corp00002");
    	paramMap.put("operTime","201610");
    	paramMap.put("currentBuy",1000.00);
    	paramMap.put("currentPay",1000.00);
    	paramMap.put("balance",2000.00);
    	paramMap.put("paymentScale",10.00);
    	supplierTradeService.updateSupplierTrade(paramMap);
    	log.info("**********************************updateSupplierTradeTest end*********************************");
    }
}
