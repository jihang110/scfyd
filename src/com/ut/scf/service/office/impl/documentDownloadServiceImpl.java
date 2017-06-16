package com.ut.scf.service.office.impl;

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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.office.documentDownloadDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.office.documentDownloadDetailRespBean;
import com.ut.scf.service.office.documentDownloadService;

@Service("documentDownloadService")

public class documentDownloadServiceImpl implements documentDownloadService{
	private static final Logger log = LoggerFactory
			.getLogger(documentDownloadServiceImpl.class);
	@Resource
	private documentDownloadDao documentDownloadDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getdocumentDownloadList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = documentDownloadDao.selectdocumentDownloadList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean adddocumentDownload(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = documentDownloadDao.insertdocumentDownload(paramMap);
		log.debug("insert Announcement num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updatedocumentDownload(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = documentDownloadDao.updatedocumentDownload(paramMap);
		log.debug("update documentDownload num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deletedocumentDownload(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = documentDownloadDao.deletedocumentDownload(recUid);
		log.debug("delete documentDownload num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getdocumentDownload(String recUid) {
		Map<String, Object> resultList = documentDownloadDao.selectdocumentDownload(recUid);
		documentDownloadDetailRespBean respBean = new documentDownloadDetailRespBean();
		BeanUtil.mapToBean(resultList, respBean);
		return respBean;
	}

}
