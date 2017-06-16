package com.ut.scf.service.test;

import java.util.HashMap;
import java.util.List;
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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.pub.IPrdInfoDao;
import com.ut.scf.dao.pub.IStuInfoDao;
import com.ut.scf.reqbean.pub.PrdUpdateReqBean;
import com.ut.scf.reqbean.pub.StuInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IPrdManagerService;
import com.ut.scf.service.pub.IStuManagerService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class PubManagerServiceTest {

		private static final Logger log = LoggerFactory.getLogger(PubManagerServiceTest.class);
		
		@Autowired
	    private IStuManagerService custManagerService ;
		
		@Autowired
		private IStuInfoDao stuInfoDao;
		
		@Autowired
	    private  IPrdManagerService prdManagerService ;
	    
		@Autowired
		private IPrdInfoDao prdInfoDao;
		
	    @Test
		public void stuInfoListTest()
		{
			PageInfoBean page = new PageInfoBean();
			StuInfoListReqBean reqBean = new StuInfoListReqBean();
			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
			PageRespBean respBean = new PageRespBean();
			log.info("-----------------stuInfoListTest start-----------");
			paramMap.put("stuName","张三");
			paramMap.put("idNum","");
			paramMap.put("mobilePhone","");
			custManagerService.getStuInfoList(reqBean);
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			List<Map<String, Object>> list = stuInfoDao.getStuIfnoPageList(paramMap,page);
			respBean.setDataList(list);
			log.info("----------------stuInfoList : ------------" + respBean);
			Assert.assertNotNull(respBean);
			log.info("-----------------stuInfoListTest end------------------");
		}
	    
	    @Test
	  		public void getProductListTest()
	  		{
	  			PageInfoBean page = new PageInfoBean();
	  			StuInfoListReqBean reqBean = new StuInfoListReqBean();
	  			Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
	  			PageRespBean respBean = new PageRespBean();
	  			log.info("-----------------getProductListTest start-----------");
	  			paramMap.put("productName","");
				paramMap.put("productDesc","");
				paramMap.put("attachment","");
				prdManagerService.getProductList(paramMap, page);
	  			respBean.setPages(page.getTotalPage());
	  			respBean.setRecords(page.getTotalRecord());
	  			List<Map<String, Object>> list = prdInfoDao.getProductIfnoPageList(paramMap,page);
	  			respBean.setDataList(list);
	  			log.info("----------------getProductList : ------------" + respBean);
	  			Assert.assertNotNull(respBean);
	  			log.info("-----------------getProductList end------------------");
	  		}
	    
	    @Test
		public void addProductTest()
		{
			log.info("addProductTest start");
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("productName", "悦达保理");
			paramMap.put("productDesc", "计划一个月内完成");
			paramMap.put("attachment", "参考doc文档");
			BaseRespBean respBean = prdManagerService.insertProduct(paramMap);
			log.info("addProduct : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addProductTest end");
		}
	    
	    @Test
		public void updateProductTest()
		{
			log.info("updateProductTest start");
			PrdUpdateReqBean reqBean = new PrdUpdateReqBean();
			reqBean.setProductId("2c9983075c1f7f98582b1f7f989f0000");
			reqBean.setProductName("德源保理");
			BaseRespBean respBean = prdManagerService.updateProduct(reqBean);
			log.info("updateProduct : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("updateProductTest end");
		}
	    
	    @Test
	  		public void deleteProductTest()
	  		{
	  			log.info("deleteProductTest start");
	  			String productId = "2c9983075c1f7f98582b1f7f989f0000";
	  			BaseRespBean respBean = prdManagerService.deleteProduct(productId);
	  			log.info("deleteProduct : " + respBean);
	  			Assert.assertNotNull(respBean);
	  			log.info("deleteProductTest end");
	  		}
}
