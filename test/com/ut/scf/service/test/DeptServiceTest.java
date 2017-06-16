package com.ut.scf.service.test;

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
import com.ut.scf.reqbean.sys.DeptUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IDeptService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class DeptServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(DeptServiceTest.class);
    
    @Autowired
    private IDeptService deptService;
    
	@Test
	public void getDeptTreeTest()
	{
		log.info("getDeptTreeTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId", "corp00001");
		paramMap.put("deptId", null);
		BaseRespBean respBean = deptService.getDeptTree(paramMap);
		log.info("deptTree : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("getDeptTreeTest end");
	}
    
	@Test
	public void addDeptTest()
	{
		log.info("addDeptTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId", "corp00001");
		paramMap.put("deptName", "应用开发部");
		paramMap.put("parentId", "dept00003");
		paramMap.put("contactPerson", "王四");
		paramMap.put("contactPhone", "13011117777");
		paramMap.put("note", null);
		BaseRespBean respBean = deptService.addDept(paramMap);
		log.info("addDept : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("addDeptTest end");
	}
    
	@Test
	public void updateDeptTest()
	{
		log.info("updateDeptTest start");
		DeptUpdateReqBean reqBean = new DeptUpdateReqBean();
		reqBean.setDeptId("2c99812456d581800c1ed58180810000");
		reqBean.setDeptName("应用开发部");
		BaseRespBean respBean = deptService.updateDept(reqBean);
		log.info("updateDept : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateDeptTest end");
	}
    
	@Test
	public void deleteDeptTest()
	{
		log.info("deleteDeptTest start");
		String deptId = "2c99812456d4fa472a5bd4fa47580000";
		BaseRespBean respBean = deptService.deleteDept(deptId);
		log.info("deleteDept : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteDeptTest end");
	}
	
	@Test
	public void getDeptListTest()
	{
		log.info("getDeptListTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId", "corp00001");
		
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(5);
		
		BaseRespBean respBean = deptService.getDeptList(paramMap, page);
		log.info("getDeptList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("getDeptListTest end");
	}
}
