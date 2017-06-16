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
import com.ut.scf.dao.finance.IReceiveAccountDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.finance.IReceiveAccountService;
@Service("receiveAccountService")
public class ReceiveAccountServiceImpl implements IReceiveAccountService {
	private static final Logger log = LoggerFactory
			.getLogger(ReceiveAccountServiceImpl.class);
	@Resource
	private IReceiveAccountDao receiveAccountDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getReceiveAccountList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = receiveAccountDao.selectReceiveAccountList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addReceiveAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = receiveAccountDao.insertReceiveAccount(paramMap);
		log.debug("insert receiveAccount num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateReceiveAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = receiveAccountDao.updateReceiveAccount(paramMap);
		log.debug("update receiveAccount num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteReceiveAccount(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = receiveAccountDao.deleteReceiveAccount(recUid);
		log.debug("delete receiveAccount num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
