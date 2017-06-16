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

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.reqbean.sys.UserAddReqBean;
import com.ut.scf.reqbean.sys.UserSearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IUserOperService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class UserServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(UserServiceTest.class);
    
    @Autowired
    private IUserOperService userService;
    
	@Test
	public void userLoginTest()
	{
		log.info("userLoginTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("username", "root");
		paramMap.put("password", "670b14728ad9902aecba32e22fa4f6bd");
		BaseRespBean respBean = userService.userLogin(paramMap);
		log.info("userLogin : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("userLoginTest end");
	}

	 
	
	@Test
	public void userListTest()
	{
		log.info("**********************************userListTest start*********************************");
		UserSearchPageReqBean searchPage = new UserSearchPageReqBean();
		searchPage.setPageSize(15);
		searchPage.setPageNumber(1);
		searchPage.setUsername("root");
		
		BaseRespBean respBean = userService.userList(searchPage);
		log.info("userList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************userListTest end*********************************");
	}
	
	@Test
	public void userAddTest()
	{
		log.info("**********************************userAddTest start*********************************");
		UserAddReqBean addUserBean = new UserAddReqBean();
		addUserBean.setUsername("testUser");
		addUserBean.setDeptId(null);
		addUserBean.setEmail("test@test.com");
		addUserBean.setFixedPhone("025123");
		addUserBean.setMobilephone("133123");
		addUserBean.setNote("测试人员");
		addUserBean.setPassword("670b14728ad9902aecba32e22fa4f6bd");
		addUserBean.setRealname("测试用户");
		addUserBean.setRoleId("ROLE000001");
		BaseRespBean respBean = userService.insertUser(addUserBean);
		log.info("userAddBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************userAddTest end*********************************");
	}
	
	@Test
	public void LogAddTest(){
		log.info("**********************************LogAddTest start*********************************");
		Map<String, Object> LogparamMap = new HashMap<>();
		LogparamMap.put("logId",ScfUUID.generate());
	    LogparamMap.put("userId","testuserId");
	    LogparamMap.put("interfaceId","testinterfaceId");
	    LogparamMap.put("ip","127.0.0.1");
	    LogparamMap.put("content","登录系统test");
	    userService.insertBizLog(LogparamMap);
		log.info("**********************************LogAddTest end*********************************");
	}
}
