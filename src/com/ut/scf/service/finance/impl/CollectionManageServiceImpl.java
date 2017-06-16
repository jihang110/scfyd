package com.ut.scf.service.finance.impl;

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
import com.ut.scf.dao.finance.ICollectionManageDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.finance.ICollectionManageService;
@Service("collectionManageService")
public class CollectionManageServiceImpl implements ICollectionManageService {
	private static final Logger log = LoggerFactory
			.getLogger(CollectionManageServiceImpl.class);
	@Resource
	private ICollectionManageDao collectionManageDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCollectionManageList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = collectionManageDao.selectCollectionManageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCollectionManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = collectionManageDao.insertCollectionManage(paramMap);
		log.debug("insert collectionManage num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCollectionManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = collectionManageDao.updateCollectionManage(paramMap);
		log.debug("update collectionManage num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCollectionManage(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = collectionManageDao.deleteCollectionManage(recUid);
		log.debug("delete collectionManage num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
