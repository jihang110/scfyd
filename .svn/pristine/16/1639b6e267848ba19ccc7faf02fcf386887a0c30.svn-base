package com.scf.service.test.pub;

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
import com.ut.scf.dao.project.IFinanceInfoDao;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IFinanceInfoService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class FinanceInfoTest {
	
	private static final Logger log = LoggerFactory.getLogger(FinanceInfoTest.class);
	
	@Autowired
	private IFinanceInfoService financeInfoService;
	
	@Autowired
	private IFinanceInfoDao financeInfoDao;
	
	@Test
	public void getFinanceInfoListTest()
	{
		PageInfoBean page = new PageInfoBean();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		PageRespBean respBean = new PageRespBean();
		log.info("-----------------getFinanceInfoListTest start-----------");
		paramMap.put("agencyName","");
		paramMap.put("agencyNum","");
		financeInfoService.getFinanceInfoList(paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		List<Map<String, Object>> list = financeInfoDao.getFinanceInfoList(paramMap, page);
		respBean.setDataList(list);
		log.info("----------------getFinanceInfoListTest : ------------" + respBean);
		Assert.assertNotNull(respBean);
		log.info("-----------------getFinanceInfoListTest end------------------");
	}

}
