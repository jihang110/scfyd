package com.ut.scf.service.test.crm;

import java.util.HashMap;
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
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICorpEvalService;

/**
 * 
 * @author changxin
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class CorpEvalServiceTest {

	private static final Logger log = LoggerFactory.getLogger(CorpEvalServiceTest.class);

	@Autowired
	private ICorpEvalService corpEvalService;
	
	@Test
	public void addCorpEvalTest(){
		log.info("=============================addCorpEvalTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("financeComprehensiveEval", "666666");
		paramMap.put("financeIndicatorsAnaly", "666666");
		paramMap.put("progressProjectAnaly", "666666");
		paramMap.put("wholeRiskEval", "666666");
		paramMap.put("otherAnaly", "666666");
		paramMap.put("corpId", "corp00001");
		BaseRespBean respBean = corpEvalService.addCorpEval(paramMap);
		log.info("addCorpEval : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================addCorpEvalTest end=============================");
	}
	
	@Test
	public void getCorpEvalListTest(){
		log.info("=============================getCorpEvalListTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		PageInfoBean page = new PageInfoBean();
		paramMap.put("corpId","corp00001");
		page.setPageNumber(1);
		page.setPageSize(10);
		BaseRespBean respBean = corpEvalService.getCorpEvalList(paramMap,page);
		log.info("getCorpEvalList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getCorpEvalListTest end=============================");
	}
	
	@Test
	public void updateCorpEvalTest(){
		log.info("=============================updateCorpEvalTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("financeComprehensiveEval", "77667");
		paramMap.put("financeIndicatorsAnaly", "77667");
		paramMap.put("progressProjectAnaly", "77667");
		paramMap.put("wholeRiskEval", "77667");
		paramMap.put("otherAnaly", "77667");
		paramMap.put("corpId","corp00001");
		paramMap.put("recUid","123");
		paramMap.put("createUserId","u00001");

		BaseRespBean respBean = corpEvalService.updateCorpEval(paramMap);
		log.info("updateCorpEval : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================updateCorpEvalTest end=============================");
	}
	
	
}
