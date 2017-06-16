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
import com.ut.scf.dao.asset.IOverdueManageDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.asset.IOverdueManageService;

@Service("overdueManageService")
public class OverdueManageServiceImpl implements IOverdueManageService {
	private static final Logger log = LoggerFactory
			.getLogger(OverdueManageServiceImpl.class);
	@Resource
	private IOverdueManageDao overdueManageDao;
	@Override
	public BaseRespBean getOverdueManageList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = overdueManageDao.selectIOverdueManageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addOverdueManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = overdueManageDao.insertOverdueManage(paramMap);
		log.debug("insert overdueManageDao num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateOverdueManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = overdueManageDao.updateOverdueManage(paramMap);
		log.debug("update overdueManageDao num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteOverdueManage(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = overdueManageDao.deleteOverdueManage(recUid);
		log.debug("delete overdueManageDao num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	public BaseRespBean getBadDebtList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = overdueManageDao.selectBadDebtList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

}
