package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;



public interface INotepadFlowDao {

	List<Map<String, Object>> selectNotepadFlowList(Map<String, Object> paramMap);

	int insertNotepadFlow(Map<String, Object> paramMap);

	int deleteNotepadFlow(String recUid);
	
	int updateNotepadFlow(Map<String, Object> paramMap);

	int expenseExpireCount(String userId);
}
