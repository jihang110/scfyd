package com.ut.scf.service.test;

import java.util.Date;
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

import com.ut.scf.pojo.auto.SysMenu;
import com.ut.scf.reqbean.sys.MenuTreeReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.sys.IMenuService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class MenuServiceTest {

	private static final Logger log = LoggerFactory.getLogger(MenuServiceTest.class);

	@Autowired
	private IMenuService menuService;

	@Test
	public void getMenuTreeTest() {
		log.info("=============================getMenuTreeTest start=============================");
		MenuTreeReqBean reqBean = new MenuTreeReqBean();
		reqBean.setRoleId("ROLE000001");
		BaseRespBean respBean = menuService.getMenuTree(reqBean);
		log.info("menuTree : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getMenuTreeTest end=============================");
	}

	@Test
	public void addMenuTest() {
		log.info("=============================addMenuTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("menuName", "测试类专用Name");
		
		SysMenu record = new SysMenu();
		record.setCreateTime(new Date());
		record.setMenuLevel((byte) 1);
		record.setMenuName("测试类专用Name");
		BaseRespBean respBean = menuService.addMenu(record);
		log.info("addMenu : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================addMenuTest end=============================");
	}

	@Test
	public void updateMenuTest() {
		log.info("=============================updateMenuTest start=============================");
		SysMenu sysmenu = new SysMenu();
		sysmenu.setCreateTime(new Date());
		sysmenu.setMenuName("测试类专用Name");
		BaseRespBean respBean = menuService.updateMenu(sysmenu);
		log.info("updateMenu : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================updateMenuTest end=============================");

	}

	@Test
	public void deleteMenuTest() {
		log.info("=============================deleteMenuTest start=============================");
		String menuId = "2c9981c65703513e273403513e400000";
		BaseRespBean respBean = menuService.deleteMenu(menuId);
		log.info("deleteMenu : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================deleteMenuTest end=============================");
	}

}
