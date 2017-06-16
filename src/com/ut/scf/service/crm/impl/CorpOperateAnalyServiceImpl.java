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
import com.ut.scf.dao.crm.ICorpOperateAnalyDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICorpOperateAnalyService;

@Service("corpOperateAnalyService")
public class CorpOperateAnalyServiceImpl implements ICorpOperateAnalyService {

	private static final Logger log = LoggerFactory
			.getLogger(CorpOperateAnalyServiceImpl.class);

	@Resource
	private ICorpOperateAnalyDao corpOperateAnalyDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpOperateAnalyList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = corpOperateAnalyDao.selectCorpOperateAnalyList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpOperateAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = corpOperateAnalyDao.insertCorpOperateAnaly(paramMap);
		log.debug("insert CorpOperateAnaly num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorpOperateAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = corpOperateAnalyDao.updateCorpOperateAnaly(paramMap);
		log.debug("update CorpOperateAnaly num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorpOperateAnaly(String recUid) {
		BaseRespBean respBean = new BaseRespBean();

		int deleteNum = corpOperateAnalyDao.deleteCorpOperateAnaly(recUid);
		log.debug("delete CorpOperateAnaly num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
