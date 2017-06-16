package com.ut.scf.service.sys.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.WarningInfoMapper;
import com.ut.scf.dao.sys.IWarningDao;
import com.ut.scf.pojo.auto.WarningInfo;
import com.ut.scf.reqbean.sys.WarningReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IWarningService;

@Service("warningService")
public class WarningServiceImpl implements IWarningService {

	@Resource
	private IWarningDao iWarningDao;
	@Resource
	private WarningInfoMapper warningInfoMapper;

	// 查询批处理列表
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean warningInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = iWarningDao.selectWarningList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	// 查询批处理列表
	@Override
	@Transactional
	public BaseRespBean warningInfoDetail(WarningReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		WarningInfo warningInfo = new WarningInfo();
		warningInfo.setRecUid(reqBean.getRecUid());
		warningInfo.setWarnStatus("1");
		int result = warningInfoMapper.updateByPrimaryKeySelective(warningInfo);
		if (result > 0) {
			respBean.setResult(ErrorCodeEnum.SUCCESS);
		}
		return respBean;
	}

	// 查询批处理列表
	@Override
	@Transactional(readOnly = true)
	public int warningInfoCount() {
		return iWarningDao.selectWarningCount();
	}
}
