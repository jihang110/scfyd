package com.ut.scf.service.office;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface documentDownloadService {
	public BaseRespBean getdocumentDownloadList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean adddocumentDownload(Map<String, Object> paramMap);

	public BaseRespBean updatedocumentDownload(Map<String, Object> paramMap);

	public BaseRespBean deletedocumentDownload(String recUid);
	
	public BaseRespBean getdocumentDownload(String recUid);
}
