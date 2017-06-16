package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.SysFuncInterface;
import com.ut.scf.pojo.SysRole;
import com.ut.scf.pojo.UploadFilePath;
import com.ut.scf.pojo.auto.SysUser;
import com.ut.scf.pojo.auto.SysUserRole;

public interface IUserDao {

	Map<String, Object> userLogin(Map<String, Object> paramMap);

	Map<String, Object> userPhoneLogin(String phone);

	Map<String, Object> changeRole(Map<String, Object> paramMap);

	List<SysRole> selectUserRoleList(String userid);

	List<Map<String, Object>> userList(Map<String, Object> paramMap,
			PageInfoBean page);

	List<Map<String, Object>> userList(Map<String, Object> paramMap);

	List<Map<String, Object>> hasMenuUserList(Map<String, Object> paramMap,
			PageInfoBean page);

	List<Map<String, Object>> hasMenuUserList(Map<String, Object> paramMap);

	int updateUser(SysUser sysUser);

	int updateUserRole(SysUserRole sysUserRole);

	int hasUserByName(String username);

	int hasUserByMobilephone(String mobilephone);

	int updatePwd(Map<String, Object> paramMap);

	List<Map<String, Object>> selectBizLogList(Map<String, Object> paramMap,
			PageInfoBean page);

	List<SysFuncInterface> selectAllInterface();

	int insertBizLog(Map<String, Object> paramMap);

	List<UploadFilePath> selectAllFilePath();

	List<Map<String, Object>> selectAllSysConfig();

	Map<String, Object> selectSysConfigByKey(Map<String, Object> paramMap);

	List<Map<String, Object>> callExpenseExpireProcedure();

	List<Map<String, Object>> selectAllUserCorpJurisdiction();
}