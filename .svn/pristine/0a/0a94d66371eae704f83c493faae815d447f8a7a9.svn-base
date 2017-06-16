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
import com.ut.scf.dao.crm.INegativeInfoUploadDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.INegativeInfoUploadService;

@Service("negativeInfoUploadService")
public class NegativeInfoUploadServiceImpl implements INegativeInfoUploadService {

	private static final Logger log = LoggerFactory
			.getLogger(NegativeInfoUploadServiceImpl.class);

	@Resource
	private INegativeInfoUploadDao negativeInfoUploadDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getNegativeInfoUploadList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = negativeInfoUploadDao.selectNegativeInfoUploadList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addNegativeInfoUpload(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("negUpId", ScfUUID.generate());
		int insertNum = negativeInfoUploadDao.insertNegativeInfoUpload(paramMap);
		log.debug("insert NegativeInfoUpload num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateNegativeInfoUpload(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = negativeInfoUploadDao.updateNegativeInfoUpload(paramMap);
		log.debug("update NegativeInfoUpload num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteNegativeInfoUpload(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = negativeInfoUploadDao.deleteNegativeInfoUpload(paramMap);
		log.debug("delete NegativeInfoUpload num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
