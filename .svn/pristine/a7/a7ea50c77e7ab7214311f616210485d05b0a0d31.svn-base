package com.ut.scf.service.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.pub.IGaranteeMoneyDao;
import com.ut.scf.reqbean.pub.GaranteeMoneyListReqBean;
import com.ut.scf.reqbean.pub.GaranteeMoneyUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IGaranteeMoneyService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class GaranteeMoneyServiceTest {
	
	private static final Logger log = LoggerFactory.getLogger(GaranteeMoneyServiceTest.class);

	@Autowired
	private IGaranteeMoneyService garanteeMoneyService;
	
	@Resource
	private IGaranteeMoneyDao garanteeMoneyDao;
	
	@Test
		public void getGMMdataListTest()
		{
			PageInfoBean page = new PageInfoBean();
			GaranteeMoneyListReqBean reqBean = new GaranteeMoneyListReqBean();
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			PageRespBean respBean = new PageRespBean();
			log.info("-----------------getGMMdataListTest start-----------");
			paramMap.put("productName","");
			paramMap.put("guaranteeMoneyRate","");
			garanteeMoneyService.getGaranteeMoneyList(paramMap, page);
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			List<Map<String, Object>> list = garanteeMoneyDao.getGaranteeMoneyPageList(paramMap, page);
			respBean.setDataList(list);
			log.info("----------------getGMMdataListTest : ------------" + respBean);
			Assert.assertNotNull(respBean);
			log.info("-----------------getGMMdataListTest end------------------");
		}
	
	 @Test
		public void addGMMdata()
		{
			log.info("addGMMdata start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("productName", "scfdy保理");
			paramMap.put("guaranteeMoneyRate", "20");
			BaseRespBean respBean = garanteeMoneyService.insertGaranteeMoney(paramMap);
			log.info("addGMMdata : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addGMMdata end");
		}
	 
	 @Test
		public void updateGMMdata()
		{
			log.info("updateGMMdata start");
			GaranteeMoneyUpdateReqBean reqBean = new GaranteeMoneyUpdateReqBean();
			reqBean.setProductId("2c9983075c2e2a1667232e2a16f40000");
			reqBean.setProductName("yueda保理");
			reqBean.setGuaranteeMoneyRate(29.01);
			BaseRespBean respBean = garanteeMoneyService.updateGaranteeMoney(reqBean);
			log.info("updateGMMdata : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("updateGMMdata end");
		}
	 
	 @Test
		public void deleteGMMdata()
		{
			log.info("deleteGMMdata start");
			String productId = "2c9983075c2e162f245a2e162f9f0000";
			BaseRespBean respBean = garanteeMoneyService.deleteGaranteeMoney(productId);
			log.info("deleteGMMdata : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("deleteGMMdata end");
		}
}
