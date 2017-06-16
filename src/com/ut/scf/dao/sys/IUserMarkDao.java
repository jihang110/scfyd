package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
/**
 * 
 * @author changxin
 *
 */
public interface IUserMarkDao {
	List<Map<String, Object>> selectUserMarkList(Map<String, Object> paramMap,
			PageInfoBean page);

	int insertUserMark(Map<String, Object> paramMap);

	int updateUserMark(Map<String, Object> paramMap);

	int deleteUserMark(String recUid);
	
}
