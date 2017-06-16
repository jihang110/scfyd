package com.ut.scf.service.sys;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.sys.DeptUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IDeptService {

	public BaseRespBean getDeptTree(Map<String, Object> paramMap);
	
	public BaseRespBean getDeptList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addDept(Map<String, Object> paramMap);

	public BaseRespBean updateDept(DeptUpdateReqBean reqBean);

	public BaseRespBean deleteDept(String deptId);

}
