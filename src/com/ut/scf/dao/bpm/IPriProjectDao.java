package com.ut.scf.dao.bpm;

import java.util.Map;

public interface IPriProjectDao {
	
	int insertPriProject(Map<String, Object> paramMap);
	
	int updatePriProject(Map<String, Object> paramMap);
	
	String selectTerminateUserName(long procInsId);
	
	int countProjectName(Map<String, Object> paramMap);
}