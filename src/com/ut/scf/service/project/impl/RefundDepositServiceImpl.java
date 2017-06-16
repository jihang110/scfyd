package com.ut.scf.service.project.impl;

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
import com.ut.scf.dao.auto.GuaranteeInfoMapper;
import com.ut.scf.dao.project.IFinanceInfoDao;
import com.ut.scf.pojo.auto.GuaranteeInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IRefundDepositService;

@Service("refundDepositService")
public class RefundDepositServiceImpl implements IRefundDepositService {
	@Resource IFinanceInfoDao financeInfoDao;
	@Resource GuaranteeInfoMapper guaranteeInfoMapper;
	private static final Logger log = LoggerFactory
			.getLogger(RefundDepositServiceImpl.class);
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRefundDepositInfo(Map<String, Object> paramMap,PageInfoBean page) {
		List<Map<String, Object>> refundDepositInfo = financeInfoDao.getRefundDepositInfo(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(refundDepositInfo);
		return respBean;
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateRefundDepositInfo(GuaranteeInfo guaranteeInfo) {
		BaseRespBean respBean = new BaseRespBean();
		int updateByPrimaryKeySelective = guaranteeInfoMapper.updateByPrimaryKeySelective(guaranteeInfo);
		log.debug("update im num {}", updateByPrimaryKeySelective);
		if (updateByPrimaryKeySelective <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
