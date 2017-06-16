package com.ut.scf.service.asset.impl;

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
import com.ut.scf.dao.asset.IDunManageDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.asset.IDunManageService;

@Service("dunManageService")
public class DunManageServiceImpl implements IDunManageService{
	private static final Logger log = LoggerFactory
			.getLogger(DunManageServiceImpl.class);
	@Resource
	private IDunManageDao dunManageDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDunManageList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = dunManageDao.selectDunManageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDunManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = dunManageDao.insertDunManage(paramMap);
		log.debug("insert dunManage num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDunManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = dunManageDao.updateDunManage(paramMap);
		log.debug("update dunManage num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteDunManage(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = dunManageDao.deleteDunManage(recUid);
		log.debug("delete dunManage num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}


}
