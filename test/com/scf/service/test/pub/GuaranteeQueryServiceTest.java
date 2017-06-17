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
import com.ut.scf.dao.query.IGuaranteeInfoDao;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IGuaranteeQueryService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class GuaranteeQueryServiceTest {

	@Autowired
	private IGuaranteeInfoDao guaranteeInfoInfoDao;
	@Autowired
	private IGuaranteeQueryService guranteeQueryService;
	private static final Logger log = LoggerFactory.getLogger(GuaranteeQueryServiceTest.class);
	
	@Test
	public void getFinanceInfoListTest()
	{
		PageInfoBean page = new PageInfoBean();
		Map<String, Object> paramMap = new HashMap<String, Object>();
		PageRespBean respBean = new PageRespBean();
		log.info("-----------------getFinanceInfoListTest start-----------");
		paramMap.put("agencyName","");
		paramMap.put("agencyNum","");
		guranteeQueryService.getGuaranteeQueryList(paramMap, page);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		List<Map<String, Object>> list = guaranteeInfoInfoDao.getGuaranteeQueryList(paramMap, page);
		respBean.setDataList(list);
		log.info("----------------getGuaranteeQueryList : ------------" + respBean);
		Assert.assertNotNull(respBean);
		log.info("-----------------getGuaranteeQueryList end------------------");
	}
}
