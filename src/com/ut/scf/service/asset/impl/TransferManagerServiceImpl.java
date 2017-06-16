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
import com.ut.scf.dao.asset.ITransferDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.asset.ITransferManagerService;

/**
 * 
 * @author changxin
 *
 */
@Service("transferManagerService")
public class TransferManagerServiceImpl implements ITransferManagerService{
	private static final Logger log = LoggerFactory
			.getLogger(TransferManagerServiceImpl.class);
	@Resource
	private ITransferDao transferDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getTransferList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = transferDao.selectTransferList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addTransfer(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = transferDao.insertTransfer(paramMap);
		log.debug("insert Transfer num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateTransfer(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = transferDao.updateTransfer(paramMap);
		log.debug("update Transfer num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteTransfer(String recUid) {
		BaseRespBean respBean = new BaseRespBean(); 
		int deleteNum = transferDao.deleteTransfer(recUid);
		log.debug("delete Transfer num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}