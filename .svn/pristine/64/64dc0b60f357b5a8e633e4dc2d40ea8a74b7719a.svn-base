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
import com.ut.scf.dao.crm.ICreditReportDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICreditReportService;

@Service("creditReportService")
public class CreditReportServiceImpl implements ICreditReportService {

	private static final Logger log = LoggerFactory
			.getLogger(CreditReportServiceImpl.class);

	@Resource
	private ICreditReportDao creditReportDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCreditReportList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = creditReportDao.selectCreditReportList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCreditReport(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("creditId", ScfUUID.generate());
		int insertNum = creditReportDao.insertCreditReport(paramMap);
		log.debug("insert CreditReport num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCreditReport(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = creditReportDao.updateCreditReport(paramMap);
		log.debug("update CreditReport num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCreditReport(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = creditReportDao.deleteCreditReport(paramMap);
		log.debug("delete CreditReport num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
