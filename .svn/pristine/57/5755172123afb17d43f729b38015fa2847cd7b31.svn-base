package com.ut.scf.service.project.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.project.ICarInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.project.GetCarInfoByFinanceIdRespBean;
import com.ut.scf.service.project.IOffsetDepositService;

@Service("offsetDepositService")
public class OffsetDepositServiceImpl implements IOffsetDepositService {
	@Resource private ICarInfoDao carInfoDao;
	@Override
	public BaseRespBean getCarInfo(Map<String, Object> paramMap) {
		GetCarInfoByFinanceIdRespBean RespBean = new GetCarInfoByFinanceIdRespBean(); 
		List<Map<String, Object>> carInfo = carInfoDao.getCarInfo(paramMap);
		List<Map<String, Object>> newList = new ArrayList<>();
		BigDecimal carActualPrice = BigDecimal.ZERO;
		for (Map<String, Object> map : carInfo) {
			int saleStatus = (int) map.get("saleStatus");
//			未赎
			if(saleStatus==0){
				newList.add(map);
			}else if(saleStatus==1){
				carActualPrice = carActualPrice.add((BigDecimal) map.get("carActualPrice"));
			}
		}
		RespBean.setDataList(newList);
		RespBean.setCarActualPriceTotal(carActualPrice);
		return RespBean;
	}

}
