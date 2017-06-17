package com.ut.scf.service.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.dao.project.IFactorContractInfoDao;
import com.ut.scf.reqbean.query.ContractFileListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IContractQueryService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class ContractQueryServiceTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContractQueryServiceTest.class);
	
	@Autowired
	private IContractQueryService contractQueryService;
	
	@Autowired
	private IFactorContractInfoDao factorContractInfoDao;
	
	@Test
	public void contractInfoListTest()
	{
    	log.info("**********************************contractInfoListTest start*********************************");
    	ContractInfoListReqBean reqBean = new ContractInfoListReqBean();
    	reqBean.setAgencyCorpName("友田");
    	reqBean.setContractNo("YDBL2016YW0019-03");
    	reqBean.setPageNumber(1);
    	reqBean.setPageSize(5);
    	BaseRespBean respBean = contractQueryService.contractInfoList(reqBean);
    	log.info("contractInfoList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************contractInfoList end*********************************");
	}
	
	@Test
	public void contractInfoFileListTest()
	{
    	log.info("**********************************contractInfoFileListTest start*********************************");
    	ContractFileListReqBean reqBean = new ContractFileListReqBean();
    	reqBean.setFileName("信雅达");
    	reqBean.setContractNo("YDBL2016YW0019-03");
    	reqBean.setPageNumber(1);
    	reqBean.setPageSize(5);
    	BaseRespBean respBean = contractQueryService.contractInfoFileList(reqBean);
    	log.info("contractInfoFileList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************contractInfoFileList end*********************************");
	}

}
