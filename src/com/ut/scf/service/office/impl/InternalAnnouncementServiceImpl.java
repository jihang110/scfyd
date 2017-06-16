package com.ut.scf.service.office.impl;

import java.util.Date;
import java.util.HashMap;
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
import com.ut.scf.dao.auto.InternalAnnouncementMapper;
import com.ut.scf.dao.office.IinternalAnnouncementDao;
import com.ut.scf.pojo.auto.InternalAnnouncement;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.office.InternalAnnouncementDetailRespBean;
import com.ut.scf.service.office.IinternalAnnouncementService;

/**
 * 部门相关service类
 * 
 * @author changxin
 *
 */

@Service("internalAnnouncementService")
public class InternalAnnouncementServiceImpl implements IinternalAnnouncementService {
	private static final Logger log = LoggerFactory
			.getLogger(InternalAnnouncementServiceImpl.class);
	
	@Resource
	private IinternalAnnouncementDao internalAnnouncementDao;
	
	@Resource
	private InternalAnnouncementMapper internalAnnouncementMapper;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getInternalAnnouncementList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = internalAnnouncementDao.selectInternalAnnouncementList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		
		respBean.setRecords(page.getTotalRecord());
		
		
		
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addInternalAnnouncement(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());		
		
		InternalAnnouncement record = new InternalAnnouncement();
		BeanUtil.mapToBean(paramMap, record);
		record.setCreateTime(new Date());
		int insertNum = internalAnnouncementMapper.insert(record);
		
		log.debug("insert Announcement num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateInternalAnnouncement(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		InternalAnnouncement record = new InternalAnnouncement();
		BeanUtil.mapToBean(paramMap, record);
		
		int updateNum = internalAnnouncementMapper.updateByPrimaryKeySelective(record);
		log.debug("update internalAnnouncement num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteInternalAnnouncement(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("recUid", recUid);
		
		InternalAnnouncement record = new InternalAnnouncement();
		BeanUtil.mapToBean(paramMap, recUid);
		
		int deleteNum = internalAnnouncementMapper.deleteByPrimaryKey(recUid);
		log.debug("delete internalAnnouncement num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getInternalAnnouncement(String recUid) {
		Map<String, Object> resultList = internalAnnouncementDao.selectInternalAnnouncement(recUid);
		InternalAnnouncementDetailRespBean respBean = new InternalAnnouncementDetailRespBean();
		BeanUtil.mapToBean(resultList, respBean);
		return respBean;
	}

}
