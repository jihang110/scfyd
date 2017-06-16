package com.ut.scf.web.listener;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.pojo.SysFuncInterface;
import com.ut.scf.pojo.UploadFilePath;
import com.ut.scf.service.sys.ICorpService;
import com.ut.scf.service.sys.IUserOperService;
import com.ut.scf.service.sys.impl.CorpServiceImpl;
import com.ut.scf.service.sys.impl.UserOperServiceImpl;

public class DictCacheListener implements ServletContextListener {

	private static final Logger log = LoggerFactory
			.getLogger(DictCacheListener.class);

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		log.debug("++++++++++++++++++　　数据字典缓存开始　　+++++++++++++++++++++");
		
		WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
		IUserOperService userService = webApplicationContext.getBean(UserOperServiceImpl.class);
		
		// 功能接口字典缓存
		List<SysFuncInterface> interfaceList = userService.getAllInterFace();
		for (SysFuncInterface sysFuncInterface : interfaceList) {
			ScfCacheDict.interfaceMap.put(sysFuncInterface.getInterfaceId(), sysFuncInterface);
		}
		
		// 上传文件路径字典缓存
		List<UploadFilePath> filePathList = userService.getAllUploadFilePath();
		for (UploadFilePath uploadFilePath : filePathList) {
			ScfCacheDict.uploadFilePathMap.put((int) uploadFilePath.getPathId(), uploadFilePath);
		}
		
		// 关联企业Id缓存
		ICorpService corpService = webApplicationContext.getBean(CorpServiceImpl.class);
		List<Map<String, String>> relaCorpIdList = corpService.getAllRelaCorp();
		for (Map<String, String> relaCorp : relaCorpIdList) {
			ScfCacheDict.relaCorpIdMap.put(relaCorp.get("corpId"), relaCorp.get("relaCorpId"));
		}
		
		// 系统配置字典缓存
		List<Map<String, Object>> sysConfigList = userService.getAllSysConfig();
		for (Map<String, Object> sc : sysConfigList) {
			ScfCacheDict.sysConfigMap.put((String) sc.get("itemKey"), (String) sc.get("itemValue"));
		}
		
		// 用户可访问的客户企业Id列表缓存
		List<Map<String, Object>> userCorpList = userService.getAllUserCorpJurisdiction();
		for (Map<String, Object> userCorp : userCorpList) {
			String userId = userCorp.get("userId").toString();
			String corpIds = userCorp.get("corpIds").toString();
			if (StringUtils.isNotBlank(corpIds)) {
				String[] corpIdArr = corpIds.split(",");
				ScfCacheDict.userCorpMap.put(userId, Arrays.asList(corpIdArr));
			}
				
		}
		
		log.debug("++++++++++++++++++　　数据字典缓存结束　　+++++++++++++++++++++");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}

}
