package com.ut.scf.core.dict;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ut.scf.pojo.SysFuncInterface;
import com.ut.scf.pojo.UploadFilePath;

/**
 * 系统字典缓存类
 * 
 * @author sunll
 *
 */
public class ScfCacheDict {
	
	/**
	 * 功能接口字典缓存
	 */
	public static Map<String, SysFuncInterface> interfaceMap = Collections.synchronizedMap(new HashMap<String, SysFuncInterface>());
	
	/**
	 * 上传文件路径字典缓存
	 */
	public static Map<Integer, UploadFilePath> uploadFilePathMap = Collections.synchronizedMap(new HashMap<Integer, UploadFilePath>());
	
	/**
	 * 客户企业和保理商企业关系缓存，key是corpId，value是relaCorpId
	 */
	public static Map<String, String> relaCorpIdMap = Collections.synchronizedMap(new HashMap<String, String>());
	
	/**
	 * 系统配置字典缓存
	 */
	public static Map<String, String> sysConfigMap = Collections.synchronizedMap(new HashMap<String, String>());
	
	/**
	 * 用户可访问的客户企业Id列表，key是userId，value是客户企业Id列表
	 */
	public static Map<String, List<String>> userCorpMap = Collections.synchronizedMap(new HashMap<String, List<String>>());
	
}
