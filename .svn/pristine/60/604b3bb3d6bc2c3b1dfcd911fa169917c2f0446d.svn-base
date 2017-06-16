package com.ut.scf.service.sys;

import com.ut.scf.reqbean.sys.RoleAddReqBean;
import com.ut.scf.reqbean.sys.RoleListReqBean;
import com.ut.scf.reqbean.sys.RoleUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IRoleService {

	public BaseRespBean getRoleList(RoleListReqBean reqBean);

	public BaseRespBean addRole(RoleAddReqBean reqBean);

	public BaseRespBean deleteRole(String roleId, int roleTypeSession);

	public BaseRespBean updateRole(RoleUpdateReqBean reqBean, String roleIdSession);

	public BaseRespBean getRoleTypeList(int roleType);

	public BaseRespBean getAllRoleTypeList();
}
