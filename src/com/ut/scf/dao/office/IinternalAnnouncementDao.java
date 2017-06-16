package com.ut.scf.dao.office;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IinternalAnnouncementDao {
	List<Map<String, Object>> selectInternalAnnouncementList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	Map<String, Object> selectInternalAnnouncement(String recUid);
}
