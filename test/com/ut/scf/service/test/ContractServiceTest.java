package com.ut.scf.service.test;

import java.util.Map;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSONObject;
import com.ut.scf.service.project.ISignContractService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class ContractServiceTest {

	private static final Logger log = LoggerFactory
			.getLogger(ContractServiceTest.class);
	@Resource
	private ISignContractService signContractService;

	@Test
	public void sendContractTest() {
		log.info("=============================sendContractTest start=============================");
		try {
			Map<String, String> map = signContractService
					.sendContract("E:\\java\\workspace_eclipse\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\scfyd\\uploadFile\\common\\exportPdf2.pdf");
			System.out.println(map.toString());
		} catch (Exception e) {

			e.printStackTrace();
		}
		log.info("=============================sendContractTest end=============================");
	}

	@Test
	public void autoSignFoppTest() {
		log.info("=============================autoSignFoppTest start=============================");
		try {
			JSONObject jsonObject = signContractService
					.autoSignFopp("1496658299669DDJ12");
			System.out.println(jsonObject.toJSONString());
		} catch (Exception e) {

			e.printStackTrace();
		}
		log.info("=============================autoSignFoppTest end=============================");
	}
}
