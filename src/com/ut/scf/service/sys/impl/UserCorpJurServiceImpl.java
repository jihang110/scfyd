package com.ut.scf.service.sys.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.IUserCorpJurDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IUserCorpJurService;

@Service("userCorpJurService")
public class UserCorpJurServiceImpl implements IUserCorpJurService {
	
	private static final Logger log = LoggerFactory
			.getLogger(UserCorpJurServiceImpl.class);
	@Resource
	private IUserCorpJurDao userCorpJurDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getUserCorpJurList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = userCorpJurDao.selectCorpListByUserId(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateUserCorpJur(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		String userIdStr = (String) paramMap.get("userId");
		String corpIdStr = (String) paramMap.get("corpId");
		List<Map<String, Object>> userCorpList = new ArrayList<Map<String, Object>>();
		String[] userIdList = null;
		String[] corpIdList = null;
		//判断原来是否存在数据
		int hasUserCorpJur = userCorpJurDao.hasUserCorpJur(paramMap);
		if(userIdStr !=null){
			userIdList = userIdStr.split(",");
		}else{
			respBean.setResult(ErrorCodeEnum.USEID_NOT_EXIST);
			return respBean;
		}
		if(corpIdStr != null){
			corpIdList = corpIdStr.split(",");
			List<String> list = java.util.Arrays.asList(corpIdList);
			//先批量删除
			int deleteUserCorpNum = userCorpJurDao.deleteUserCorpJur(userIdList);
			log.debug("deleteUserCorpNum : {}", deleteUserCorpNum);
			if (deleteUserCorpNum < 0) {
				if(hasUserCorpJur>0){
					throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
				}else{
					throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
				
			}
			//批量添加
			for(String userId:userIdList){
				ScfCacheDict.userCorpMap.put(userId, list);
				for(String corpId:corpIdList){
					Map<String, Object> userCorpInfo = new HashMap<String, Object>();
					userCorpInfo.put("recUid", ScfUUID.generate());
					userCorpInfo.put("userId", userId);
					userCorpInfo.put("corpId", corpId);
					userCorpList.add(userCorpInfo);
				}
			}
			if (!userCorpList.isEmpty()) {
				int insertuserCorpNum = userCorpJurDao.insertUserCorpJur(userCorpList);
				log.debug("insertuserCorpNum : {}", insertuserCorpNum);
				if (insertuserCorpNum <= 0) {
					if(hasUserCorpJur>0){
						throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
					}else{
						throw new BizException(ErrorCodeEnum.ADD_FAILED);
					}
				}
			}
		}else{
			for(String userId:userIdList){
				ScfCacheDict.userCorpMap.put(userId, null);
			}
			//批量删除
			int deleteUserCorpNum = userCorpJurDao.deleteUserCorpJur(userIdList);
			log.debug("deleteUserCorpNum : {}", deleteUserCorpNum);
			if (deleteUserCorpNum < 0) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
		}
		return respBean;
	}

}
