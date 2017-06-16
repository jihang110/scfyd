package com.ut.scf.service.sys.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.auto.SysTypeMapper;
import com.ut.scf.pojo.auto.SysType;
import com.ut.scf.pojo.auto.SysTypeExample;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.sys.ITypeService;

@Service("typeService")
public class TypeServiceImpl implements ITypeService {

	@Resource
	private SysTypeMapper sysTypeMapper;

	/**
	 * 查询系统类型
	 * 
	 */
	@Override
	public BaseRespBean getTypeList() {
		List<SysType> sysTypes = sysTypeMapper
				.selectByExample(new SysTypeExample());
		ListRespBean listRespBean = new ListRespBean();
		listRespBean.setDataList(sysTypes);
		return listRespBean;
	}
}
