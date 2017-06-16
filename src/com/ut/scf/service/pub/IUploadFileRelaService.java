package com.ut.scf.service.pub;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IUploadFileRelaService {
	public BaseRespBean addUploadFileRela(Map<String, Object> paramMap);
	public BaseRespBean deleteFileRela(String fileId);
	public BaseRespBean getFileRelaList(Map<String, Object> paramMap, PageInfoBean page);
}
