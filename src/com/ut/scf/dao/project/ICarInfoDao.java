package com.ut.scf.dao.project;

import java.util.List;
import java.util.Map;

public interface ICarInfoDao {
	List<Map<String, Object>> getCarInfo(Map<String, Object> paramMap);
}
