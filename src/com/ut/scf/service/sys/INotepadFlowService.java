package com.ut.scf.service.sys;

import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;

public interface INotepadFlowService {
	public BaseRespBean getNotepadFlowList(Map<String, Object> paramMap);

	public BaseRespBean addNotepadFlow(Map<String, Object> paramMap);

	public BaseRespBean updateNotepadFlow(Map<String, Object> paramMap);

	public BaseRespBean deleteNotepadFlow(String recUid);

	public BaseRespBean expenseExpireCount(String userId);
	
}
