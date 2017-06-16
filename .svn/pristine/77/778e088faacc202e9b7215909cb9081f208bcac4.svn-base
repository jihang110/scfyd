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
import com.ut.scf.dao.crm.IAffiliatedEnterpriseDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IAffiliatedEnterpriseService;

/**
 * 
 * @author sunll
 *
 */
@Service("affiliatedEnterpriseService")
public class AffiliatedEnterpriseServiceImpl implements IAffiliatedEnterpriseService {
	
	private static final Logger log = LoggerFactory
			.getLogger(AffiliatedEnterpriseServiceImpl.class);

	@Resource
	private IAffiliatedEnterpriseDao affiliatedEnterpriseDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getAffiliatedEnterpriseList(Map<String, Object> paramMap) {
		int isPage = (Integer) paramMap.get("isPage");

		// 是否分页，0：否，1：是
		if (isPage == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber((Integer) paramMap.get("pageNumber"));
			page.setPageSize((Integer) paramMap.get("pageSize"));
			List<Map<String, Object>> list = affiliatedEnterpriseDao
					.selectAffiliatedEnterpriseList(paramMap, page);
			log.debug("affiliatedEnterprise list : {}", list);
			log.debug("affiliatedEnterprise list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = affiliatedEnterpriseDao
					.selectAffiliatedEnterpriseList(paramMap);
			log.debug("affiliatedEnterprise list : {}", list);

			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addAffiliatedEnterprise(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		paramMap.put("recUid", ScfUUID.generate());
		int resultnum = affiliatedEnterpriseDao.insertAffiliatedEnterprise(paramMap);
		log.debug("insert affiliatedEnterprise num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateAffiliatedEnterprise(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = affiliatedEnterpriseDao.updateAffiliatedEnterprise(paramMap);
		log.debug("update affiliatedEnterprise num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteAffiliatedEnterprise(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = affiliatedEnterpriseDao.deleteAffiliatedEnterprise(recUid);
		log.debug("delete affiliatedEnterprise num {}", resultnum);
		if (resultnum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
