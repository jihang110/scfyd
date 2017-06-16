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
import com.ut.scf.dao.finance.ICorpAccountDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.finance.ICorpAccountService;


@Service("CorpAccountService")
public class CorpAccountServiceImpl implements ICorpAccountService{
	private static final Logger log = LoggerFactory
			.getLogger(CorpAccountServiceImpl.class);
	@Resource
	private ICorpAccountDao corpAccountDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpAccountList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = corpAccountDao.selectCorpAccountList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = corpAccountDao.insertCorpAccount(paramMap);
		log.debug("insert CorpAccount num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorpAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = corpAccountDao.updateCorpAccount(paramMap);
		log.debug("update CorpAccount num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorpAccount(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = corpAccountDao.deleteCorpAccount(recUid);
		log.debug("delete CorpAccount num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}
}
