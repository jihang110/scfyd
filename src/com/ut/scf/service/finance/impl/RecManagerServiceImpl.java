package com.ut.scf.service.finance.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.finance.IRecManageDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.finance.IRecManageService;

@Service("recManagerService")
public class RecManagerServiceImpl implements IRecManageService {
	private static final Logger log = LoggerFactory.getLogger(RecManagerServiceImpl.class);
	@Resource private IRecManageDao recManageDao;
	@Override
	public BaseRespBean getRecManageList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = recManageDao.selectRecManageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean addRecManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = recManageDao.insertRecManage(paramMap);
		log.debug("insert RecManage num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	public BaseRespBean updateRecManage(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = recManageDao.updateRecManage(paramMap);
		log.debug("update RecManage num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	public BaseRespBean deleteRecManage(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = recManageDao.deleteRecManage(recUid);
		log.debug("delete RecManage num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	

}
