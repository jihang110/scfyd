package com.scf.service.test.pub;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.auto.GuaranteeInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IAgencyService;
import com.ut.scf.service.project.ICountAnalyseService;
import com.ut.scf.service.project.IOffsetDepositService;
import com.ut.scf.service.project.IRefundDepositService;
import com.ut.scf.service.pub.ICustManagerService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class activiti {
	@Autowired public IActivitiService activitiService;
	@Autowired
    ProcessEngine processEngine;
	@Autowired ICustManagerService custManagerService;
	@Autowired IAgencyService agencyService;
	@Autowired HistoryService historyService;
	@Autowired ICountAnalyseService countAnalyseService;
	@Autowired IRefundDepositService refundDepositService;
	@Autowired IOffsetDepositService offsetDepositService; 
	private static final Logger log = LoggerFactory.getLogger(activiti.class);
	@Test
	public void getagencyTaskNum(){
		Map<String, Object> map = new HashMap<>();
		map.put("userId", "jiangl");
		BaseRespBean agencyTaskNum = activitiService.getAgencyTaskNum(map);
		System.out.println(agencyTaskNum);
	}
	
	/**
	 * 获取已办任务
	 */
	@Test
	public void getHandleTask(){
		log.debug("********************************** start*********************************");
		processEngine.getHistoryService().
		createNativeHistoricTaskInstanceQuery().sql("SELECT count(RES.ID_) FROM ACT_HI_TASKINST RES INNER JOIN ACT_RE_PROCDEF D ON RES.PROC_DEF_ID_ = D.ID_ WHERE RES.ASSIGNEE_ = 'jiangl'");
		log.debug("********************************** end*********************************");
	}
	
	@Test
	public void getcount(){
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("agencyName", "测试");
		BaseRespBean financeCountInfo = countAnalyseService.getFinanceCountInfo(paramMap);
		System.out.println(financeCountInfo);
	}
	@Test
	public void refundDepositFinanceInfo(){
		PageInfoBean pageInfoBean = new PageInfoBean();
		pageInfoBean.setPageNumber(1);
		pageInfoBean.setPageSize(5);
		Map<String, Object> paramMap = new HashMap<>();
		BaseRespBean refundDepositInfo = refundDepositService.getRefundDepositInfo(paramMap, pageInfoBean);
		log.debug("refundDepositInfo:{}"+refundDepositInfo);
	}
	
	@Test
	public void getCarInfoByFinanceId(){
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("financeId", "2c9983075c3f2bf249a83f2bf2f10000");
		BaseRespBean carInfo = offsetDepositService.getCarInfo(paramMap);
		log.debug("carInfo:{}"+carInfo);
	}
	@Test
	public void getguaranteeInfo(){
		GuaranteeInfo guaranteeInfo = new GuaranteeInfo();
		guaranteeInfo.setFinanceId("2c9983075c422c1077c1422c10bc0000");
		BigDecimal guaranteeBalance = new BigDecimal(2017);
		BigDecimal payActGuarantee = new BigDecimal(2017);
		guaranteeInfo.setGuaranteeBalance(guaranteeBalance);
		guaranteeInfo.setPayActGuarantee(payActGuarantee);
		BaseRespBean updateRefundDepositInfo = refundDepositService.updateRefundDepositInfo(guaranteeInfo);
		log.debug("updateRefundDepositInfo:{}"+updateRefundDepositInfo);
	}
}
