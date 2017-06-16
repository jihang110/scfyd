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
import com.ut.scf.dao.crm.IShareHolderInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IShareHolderService;

@Service("shareHolderService")
public class ShareHolderServiceImpl implements IShareHolderService {

	private static final Logger log = LoggerFactory
			.getLogger(ShareHolderServiceImpl.class);

	@Resource
	private IShareHolderInfoDao shareHolderInfoDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getShareHolderInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = shareHolderInfoDao.selectShareHolderList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addShareHolderInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("shareHolderId", ScfUUID.generate());
		int insertNum = shareHolderInfoDao.insertShareHolder(paramMap);
		log.debug("insert ShareHolderInfo num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateShareHolderInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = shareHolderInfoDao.updateShareHolder(paramMap);
		log.debug("update ShareHolderInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteShareHolderInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = shareHolderInfoDao.deleteShareHolder(paramMap);
		log.debug("delete ShareHolderInfo num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
