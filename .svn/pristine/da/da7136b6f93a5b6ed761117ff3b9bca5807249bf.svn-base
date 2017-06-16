package com.ut.scf.service.project.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.project.ICarInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.project.ICarInfoService;

@Service("carInfoService")
public class CarInfoServiceImpl implements ICarInfoService {
	@Resource private ICarInfoDao carInfoDao;
	@Override
	public BaseRespBean getCarInfo(Map<String, Object> paramMap) {
		ListRespBean listRespBean = new ListRespBean(); 
		List<Map<String, Object>> carInfo = carInfoDao.getCarInfo(paramMap);
		listRespBean.setDataList(carInfo);
		return listRespBean;
	}

}
