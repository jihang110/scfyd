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
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.INotepadFlowDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.sys.ExpenseExpireCountRespBean;
import com.ut.scf.service.crm.impl.BankStreamServiceImpl;
import com.ut.scf.service.sys.INotepadFlowService;

@Service("notepadFlowService")
public class NotepadFlowServiceImpl implements INotepadFlowService {
	private static final Logger log = LoggerFactory.getLogger(BankStreamServiceImpl.class);
	@Resource private INotepadFlowDao notepadFlowDao;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getNotepadFlowList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = notepadFlowDao.selectNotepadFlowList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addNotepadFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = notepadFlowDao.insertNotepadFlow(paramMap);
		log.debug("insert NotepadFlow num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateNotepadFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = notepadFlowDao.updateNotepadFlow(paramMap);
		log.debug("update NotepadFlow num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteNotepadFlow(String recUid) {
		BaseRespBean respBean = new BaseRespBean();	
		int deleteNum = notepadFlowDao.deleteNotepadFlow(recUid);		
		log.debug("delete NotepadFlow num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean expenseExpireCount(String userId) {
		ExpenseExpireCountRespBean respBean = new ExpenseExpireCountRespBean();
		respBean.setExpenseExpireCount(notepadFlowDao.expenseExpireCount(userId));
		return respBean;
	}

}
