package com.ut.scf.service.crm.impl;

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
import com.ut.scf.dao.crm.ICorpManagerUserInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICorpManagerUserInfoService;

@Service("corpManagerUserInfoService")
public class CorpManagerUserInfoServiceImpl implements ICorpManagerUserInfoService {

	private static final Logger log = LoggerFactory
			.getLogger(CorpManagerUserInfoServiceImpl.class);

	@Resource
	private ICorpManagerUserInfoDao corpManagerUserInfoDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpManagerUserInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = corpManagerUserInfoDao.selectCorpManagerUserInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpManagerUserInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("corpManagerId", ScfUUID.generate());
		int insertNum = corpManagerUserInfoDao.insertCorpManagerUserInfo(paramMap);
		log.debug("insert CorpManagerUserInfo num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorpManagerUserInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = corpManagerUserInfoDao.updateCorpManagerUserInfo(paramMap);
		log.debug("update CorpManagerUserInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorpManagerUserInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = corpManagerUserInfoDao.deleteCorpManagerUserInfo(paramMap);
		log.debug("delete CorpManagerUserInfo num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
