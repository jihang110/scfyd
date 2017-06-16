package com.ut.scf.service.sys.impl;

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
import com.ut.scf.dao.sys.IClassNewsDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.sys.ClassNewsDetailRespBean;
import com.ut.scf.service.sys.IClassNewsService;

@Service("classNewsService")
public class ClassNewsServiceImpl implements IClassNewsService {

	private static final Logger log = LoggerFactory
			.getLogger(ClassNewsServiceImpl.class);

	@Resource
	private IClassNewsDao classNewsDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getClassNewsList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = classNewsDao.selectClassNewsList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addClassNews(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("classNewsId", ScfUUID.generate());
		int insertNum = classNewsDao.insertClassNews(paramMap);
		log.debug("insert ClassNews num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateClassNews(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = classNewsDao.updateClassNews(paramMap);
		log.debug("update ClassNews num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteClassNews(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("status", 0);
		int deleteNum = classNewsDao.deleteClassNews(paramMap);
		log.debug("delete ClassNews num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public ClassNewsDetailRespBean getClassNews(Map<String, Object> paramMap) {
		ClassNewsDetailRespBean respBean = new ClassNewsDetailRespBean();
		Map<String, Object> params  = classNewsDao.selectClassNews(paramMap);
		BeanUtil.mapToBean(params, respBean);
		return respBean;
	}
}
