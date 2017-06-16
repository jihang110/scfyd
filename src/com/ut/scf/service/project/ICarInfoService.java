package com.ut.scf.service.project;

import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;

public interface ICarInfoService {
	public BaseRespBean getCarInfo(Map<String, Object> paramMap);
}
