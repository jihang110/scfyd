package com.ut.scf.service.test;

import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.impl.util.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.web.controller.project.AgencyManageController;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class AgencyServiceTest {
	private static final Logger log = LoggerFactory
			.getLogger(AgencyManageController.class);

	@Resource
	private IAgencyService agencyService;

	@Test
	public void agencyListTest() {
		log.info("=============================agencyListTest start=============================");
		try {

			
			 AgencySearchPageReqBean searchPage =new  AgencySearchPageReqBean();
			 searchPage.setAgencyCode("1111");
			 searchPage.setAgencyName("222");
			 searchPage.setSysType((byte)1);
			
			BaseRespBean agencyList = agencyService.agencyList(searchPage);
			System.out.println(agencyList.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.info("=============================agencyListTest end=============================");
	};

	@Test
	public void doAgreeTest() {
		log.info("=============================doAgreeTest start=============================");
		try {
			AgencyFlowReqBean aencyFlowReqBean = new AgencyFlowReqBean();
			aencyFlowReqBean.setProcInstId("111111");
			aencyFlowReqBean.setTaskId("222222");
			aencyFlowReqBean.setUserId("333333");
			aencyFlowReqBean.setAgree("4444");
			JSONObject jsonObject = new JSONObject(aencyFlowReqBean);
			boolean doAgree = agencyService.doAgree(jsonObject);
			System.out.println(doAgree);
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.info("=============================doAgreeTest end=============================");
	};

	@Test
	public void addAgencyTest() {
		log.info("=============================addAgencyTest start=============================");
		try {
			AgencyFlowReqBean reqBean = new AgencyFlowReqBean();

			reqBean.setUserId("bly2017");

			BaseRespBean addAgency = agencyService.addAgency(reqBean);
			System.out.println(addAgency.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.info("=============================addAgencyTest end=============================");
	};
}
