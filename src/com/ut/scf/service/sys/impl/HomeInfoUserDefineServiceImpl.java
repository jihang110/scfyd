package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.IHomeInfoUserDefineDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IHomeInfoUserDefineService;

@Service("homeInfoUserDefine")
public class HomeInfoUserDefineServiceImpl implements IHomeInfoUserDefineService {
	private static final Logger log = LoggerFactory
			.getLogger(HomeInfoUserDefineServiceImpl.class);
	@Resource
	private IHomeInfoUserDefineDao homeInfoUserDefineDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getHomeInfoUserDefineList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = homeInfoUserDefineDao.selectHomeInfoUserDefineList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addHomeInfoUserDefine(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = homeInfoUserDefineDao.insertHomeInfoUserDefine(paramMap);
		log.debug("insert homeInfoUserDefine num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateHomeInfoUserDefine(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		String userId = (String) paramMap.get("userId");
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userId", userId);
		//一个都没有的时候
		int num = homeInfoUserDefineDao.homeInfoIsNull(paramMap);
		if(num == 0){
			String[] s = {"adds","news","class","notices","document"};
			for(int i=0;i<s.length;i++){
				param.put("infoType", s[i]);
				param.put("status", 1);
				param.put("recUid", ScfUUID.generate());
				homeInfoUserDefineDao.insertHomeInfoUserDefine(param);
			}
		}else{
			int typenum = homeInfoUserDefineDao.homeInfoTypeIsNull(paramMap);
			if(typenum>0){
				//原来有了
				int updateNum = homeInfoUserDefineDao.updateHomeInfoUserDefine(paramMap);
				log.debug("update homeInfoUserDefine num {}", updateNum);
				if (updateNum <= 0) {
					respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
					return respBean;
				}
			}else{
				//原来没有
				paramMap.put("recUid", ScfUUID.generate());
				homeInfoUserDefineDao.insertHomeInfoUserDefine(paramMap);
			}
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteHomeInfoUserDefine(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = homeInfoUserDefineDao.deleteHomeInfoUserDefine(recUid);
		log.debug("delete homeInfoUserDefine num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
