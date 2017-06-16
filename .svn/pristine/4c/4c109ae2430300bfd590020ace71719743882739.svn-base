package com.ut.scf.service.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.pojo.SysFuncInterface;
import com.ut.scf.pojo.UploadFilePath;
import com.ut.scf.reqbean.sys.BizLogListReqBean;
import com.ut.scf.reqbean.sys.UserAddReqBean;
import com.ut.scf.reqbean.sys.UserModPwdReqBean;
import com.ut.scf.reqbean.sys.UserSearchPageReqBean;
import com.ut.scf.reqbean.sys.UserUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IUserOperService {

	public BaseRespBean userLogin(Map<String, Object> paramMap);

	public BaseRespBean userPhoneLogin(String phone);
	
	public BaseRespBean userList(UserSearchPageReqBean searchPage);
	
	public BaseRespBean hasMenuUserList(UserSearchPageReqBean searchPage);
	
	public BaseRespBean insertUser(UserAddReqBean addUserReqBean);
	
	public BaseRespBean deleteUser(String userId);
	
	public BaseRespBean updateUser(UserUpdateReqBean userUpdataBean);

	public BaseRespBean updatePwd(UserModPwdReqBean usrModPwdBean);

	public BaseRespBean getBizLogList(BizLogListReqBean reqBean);

	public BaseRespBean resetPwd(UserModPwdReqBean usrModPwdBean);
	
	public BaseRespBean insertBizLog(Map<String, Object> paramMap);

	public List<SysFuncInterface> getAllInterFace();

	public List<UploadFilePath> getAllUploadFilePath();

	public List<Map<String, Object>> getAllSysConfig();
	
	public BaseRespBean getSysConfigByKey(Map<String, Object> paramMap);

	public List<Map<String, Object>> getAllUserCorpJurisdiction();
	
	public int countUserByPhone(String phone);
}
