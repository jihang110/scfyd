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
import com.ut.scf.dao.crm.IDebtVerificationAnalysisDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IDebtVerificationAnalysisService;

@Service("debtVerificationAnalysisService")
public class DebtVerificationAnalysisServiceImpl implements IDebtVerificationAnalysisService {

	private static final Logger log = LoggerFactory
			.getLogger(DebtVerificationAnalysisServiceImpl.class);

	@Resource
	private IDebtVerificationAnalysisDao debtVerificationAnalysisDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDebtVerificationAnalysisList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = debtVerificationAnalysisDao.selectDebtVerificationAnalysisList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDebtVerificationAnalysis(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("debtVaId", ScfUUID.generate());
		int insertNum = debtVerificationAnalysisDao.insertDebtVerificationAnalysis(paramMap);
		log.debug("insert DebtVerificationAnalysis num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDebtVerificationAnalysis(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = debtVerificationAnalysisDao.updateDebtVerificationAnalysis(paramMap);
		log.debug("update DebtVerificationAnalysis num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteDebtVerificationAnalysis(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = debtVerificationAnalysisDao.deleteDebtVerificationAnalysis(paramMap);
		log.debug("delete DebtVerificationAnalysis num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}
