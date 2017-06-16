package com.ut.scf.service.sys.impl;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.BatchHndlInfoMapper;
import com.ut.scf.dao.sys.IBatchDao;
import com.ut.scf.pojo.auto.BatchHndlInfo;
import com.ut.scf.reqbean.sys.BatchReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IBatchService;

@Service("batchService")
public class BatchServiceImpl implements IBatchService {

	private static final Logger log = LoggerFactory
			.getLogger(BatchServiceImpl.class);

	@Resource
	private IBatchDao batchDao;
	@Resource
	private BatchHndlInfoMapper batchHndlInfoMapper;

	// 查询批处理列表
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean batchInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = batchDao.selectBatchList(paramMap,
				page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	// 插入批处理
	@Override
	public BaseRespBean insertBathInfo(BatchHndlInfo batchHndlInfo) {
		String batchId = batchHndlInfo.getBatchId();
		BaseRespBean respBean = new BaseRespBean();
		batchHndlInfo.setBatchType("");// 类型
		// 如果有则先删除 保证某次自动任务只有一条批处理信息
		if (batchId != null && batchId != "") {
			batchHndlInfoMapper.deleteByPrimaryKey(batchHndlInfo.getBatchId());
		} else {
			batchId = ScfUUID.generate();
		}
		batchHndlInfo.setBatchId(batchId);
		batchHndlInfo.setExecuteTime(new Date());
		int result = batchHndlInfoMapper.insert(batchHndlInfo);
		if (result > 0) {
			respBean.setResult(ErrorCodeEnum.SUCCESS);
		}
		return respBean;
	}

	// 执行批处理
	@Override
	public BaseRespBean doBatch(BatchReqBean batchReqBean) {
		BaseRespBean respBean = new BaseRespBean();
		try {
			Class cls = Class.forName(batchReqBean.getClassName());
			Object object = cls.newInstance();
			// 获取方法
			Method m = object.getClass().getDeclaredMethod(
					batchReqBean.getMethodName(), String.class);
			// 调用方法
			m.invoke(object, batchReqBean.getBatchId());
			respBean.setResult(ErrorCodeEnum.SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			respBean.setResult(ErrorCodeEnum.BATCH_FAIL);
		}

		return respBean;
	}
}
