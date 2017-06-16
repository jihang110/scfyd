package com.ut.scf.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.reqbean.sys.RoleAddReqBean;
import com.ut.scf.reqbean.sys.RoleListReqBean;
import com.ut.scf.reqbean.sys.RoleUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IRoleService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class RoleServiceTest {
	private static final Logger log = LoggerFactory.getLogger(RoleServiceTest.class);

	@Autowired
	private IRoleService roleService;

	@Test
	public void getRoleListTest() {
		log.debug("**********************************getRoleListTest start*********************************");
		RoleListReqBean reqBean = new RoleListReqBean();
		reqBean.setRoleName("管理员");
		reqBean.setRoleType(1);
		reqBean.setCorpId(null);
		reqBean.setIsPage(1);
		reqBean.setPageNumber(1);
		reqBean.setPageSize(10);
		BaseRespBean respBean = roleService.getRoleList(reqBean);
		log.debug("getRoleList respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.debug("**********************************getRoleListTest end*********************************");
	}

	@Test
	public void addRoleTest() {
		log.debug("**********************************addRoleTest start*********************************");
		List<String> list = new ArrayList<String>();
		list.add("MENU010101");
		list.add("MENU010102");
		list.add("MENU010103");
		
		RoleAddReqBean reqBean = new RoleAddReqBean();
		reqBean.setRoleName("测试管理员");
		reqBean.setRoleType(2);
		reqBean.setCorpId("corp00001");
		reqBean.setMenuIdList(list);
		reqBean.setNote("备注");
		
		BaseRespBean respBean = roleService.addRole(reqBean);
		log.debug("addRole respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.debug("**********************************addRoleTest end*********************************");
	}

	@Test
	public void deleteRoleTest() {
		log.debug("**********************************deleteRoleTest start*********************************");
		BaseRespBean respBean = roleService.deleteRole("2c99812456d9786618f2d97866730000", 1);
		log.debug("deleteRole respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.debug("**********************************deleteRoleTest end*********************************");
	}

	@Test
	public void updateRoleTest() {
		log.debug("**********************************updateRoleTest start*********************************");
		List<String> list = new ArrayList<String>();
		list.add("MENU010131");
		list.add("MENU010122");
		list.add("MENU010114");
		
		RoleUpdateReqBean reqBean = new RoleUpdateReqBean();
		reqBean.setRoleId("2c99812456d9786618f2d97866730000");
		reqBean.setRoleName(null);
		reqBean.setMenuIdList(list);
		reqBean.setNote("备注");
		
		BaseRespBean respBean = roleService.updateRole(reqBean, "ROLE000002");
		log.debug("updateRole respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.debug("**********************************updateRoleTest end*********************************");
	}

	@Test
	public void getRoleTypeListTest() {
		log.debug("**********************************getRoleTypeListTest start*********************************");
		BaseRespBean respBean = roleService.getRoleTypeList(1);
		log.debug("getRoleTypeList respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.debug("**********************************getRoleTypeListTest end*********************************");
	}
}
