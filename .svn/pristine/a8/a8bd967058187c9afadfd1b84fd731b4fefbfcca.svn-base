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
import com.ut.scf.service.crm.IProfitService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class ProfitServiceTest {
	 private static final Logger log = LoggerFactory.getLogger(ProfitServiceTest.class);
	    
	    @Autowired IProfitService profitService;
		
	    @Test
	    public void getProfitListTest(){
	    	log.info("**********************************getProfitListTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("corpId","corp00002");
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(1);
			page.setPageSize(10);
			profitService.getProfitList(paramMap, page);
			log.info("**********************************getProfitListTest end*********************************");
	    }
	    
	    @Test
	    public void insertProfitTest(){
	    	log.info("**********************************insertProfitTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("corpId","corp00002");
	    	paramMap.put("operYear","2016");
	    	paramMap.put("operatingGain",1000.00);
	    	paramMap.put("operatingCost",1000.00);
	    	paramMap.put("taxAndSurcharges",1000.00);
	    	paramMap.put("salesExpense",1000.00);
	    	paramMap.put("managementExpense",1000.00);
	    	paramMap.put("financialExpense",1000.00);
	    	paramMap.put("impairmentLosses",1000.00);
	    	paramMap.put("changesInFairValueGain",1000.00);
	    	paramMap.put("investmentGain",1000.00);
	    	paramMap.put("associatesAndJointVenturesIncome",1000.00);
	    	paramMap.put("nonOperatingGain",1000.00);
	    	paramMap.put("nonOperatingExpense",1000.00);
	    	paramMap.put("nonCurrentAssetsLoss",1000.00);
	    	paramMap.put("incomeTaxExpense",1000.00);
	    	paramMap.put("earningsPerShare",1000.00);
	    	paramMap.put("basicEarningsPerShare",1000.00);
	    	paramMap.put("dilutedEarningsPerShare",1000.00);
	    	paramMap.put("mainRevenueGrowthAmount",1000.00);
	    	paramMap.put("operatingProfitGrowthAmount",1000.00);
	    	paramMap.put("operatingProfitGrowthRate",10.00);
	    	paramMap.put("netProfitGrowthAmount",1000.00);
	    	paramMap.put("netProfitGrowthRate",10.00);
	    	paramMap.put("grossProfitRate",10.00);
	    	paramMap.put("expenseRate",10.00);
	    	paramMap.put("operatingProfit",10.00);
	    	paramMap.put("totalProfit",1000.00);
	    	paramMap.put("netProfit",1000.00);
	    	paramMap.put("netProfitRate",10.00);
	    	paramMap.put("totalCost",10.00);
	    	paramMap.put("costExpenseRate",10.00);
	    	paramMap.put("taxBase",10.00);
	    	paramMap.put("taxRate",10.00);
	    	paramMap.put("mainCostRate",10.00);
	    	paramMap.put("periodExpenseRate",10.00);
	    	profitService.insertProfit(paramMap);
			log.info("**********************************insertProfitTest end*********************************");
	    }
	    
	    @Test
	    public void deleteProfitTest(){
	    	log.info("**********************************deleteProfitTest start*********************************");
			String recUid = "rec00002";
			profitService.deleteProfit(recUid);
			log.info("**********************************deleteProfitTest end*********************************");
	    }
	    
	    @Test
	    public void updateProfitTest(){
	    	log.info("**********************************updateProfitTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("recUid","2c99838a57a86ac318dda86ac3950000");
	    	paramMap.put("operYear","2099");
	    	paramMap.put("operatingGain",1000.00);
	    	paramMap.put("operatingCost",1000.00);
	    	paramMap.put("taxAndSurcharges",1000.00);
	    	paramMap.put("salesExpense",1000.00);
	    	paramMap.put("managementExpense",1000.00);
	    	paramMap.put("financialExpense",1000.00);
	    	paramMap.put("impairmentLosses",1000.00);
	    	paramMap.put("changesInFairValueGain",1000.00);
	    	paramMap.put("investmentGain",1000.00);
	    	paramMap.put("associatesAndJointVenturesIncome",1000.00);
	    	paramMap.put("nonOperatingGain",1000.00);
	    	paramMap.put("nonOperatingExpense",1000.00);
	    	paramMap.put("nonCurrentAssetsLoss",1000.00);
	    	paramMap.put("incomeTaxExpense",1000.00);
	    	paramMap.put("earningsPerShare",1000.00);
	    	paramMap.put("basicEarningsPerShare",1000.00);
	    	paramMap.put("dilutedEarningsPerShare",1000.00);
	    	paramMap.put("mainRevenueGrowthAmount",1000.00);
	    	paramMap.put("operatingProfitGrowthAmount",1000.00);
	    	paramMap.put("operatingProfitGrowthRate",10.00);
	    	paramMap.put("netProfitGrowthAmount",1000.00);
	    	paramMap.put("netProfitGrowthRate",10.00);
	    	paramMap.put("grossProfitRate",10.00);
	    	paramMap.put("expenseRate",10.00);
	    	paramMap.put("operatingProfit",10.00);
	    	paramMap.put("totalProfit",1000.00);
	    	paramMap.put("netProfit",1000.00);
	    	paramMap.put("netProfitRate",10.00);
	    	paramMap.put("totalCost",10.00);
	    	paramMap.put("costExpenseRate",10.00);
	    	paramMap.put("taxBase",10.00);
	    	paramMap.put("taxRate",10.00);
	    	paramMap.put("mainCostRate",10.00);
	    	paramMap.put("periodExpenseRate",10.00);
	    	profitService.updateProfit(paramMap);
			log.info("**********************************updateProfitTest end*********************************");
	    }
	    
	    @Test
	    public void getProfitByIdTest(){
	    	log.info("**********************************getProfitByIdTest start*********************************");
	    	String recUid = "2c99838a576e454536706e493b210002";
			profitService.getProfitById(recUid);
			log.info("**********************************getProfitByIdTest end*********************************");
	    }

	    
}
