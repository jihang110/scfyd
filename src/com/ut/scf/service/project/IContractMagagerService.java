package com.ut.scf.service.project;

import java.util.Map;

import com.ut.scf.reqbean.project.ContractFileReqBean;
import com.ut.scf.reqbean.project.ContractReqBean;
import com.ut.scf.reqbean.project.ContractUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IContractMagagerService {

	BaseRespBean addFactorContract(Map<String, Object> map);

	BaseRespBean factorContractList(ContractReqBean reqBean);

	BaseRespBean factorContractFileList(ContractFileReqBean reqBean);

	BaseRespBean modFactorContract(ContractUpdateReqBean reqBean);

	BaseRespBean checkFactorContact(ContractReqBean reqBean);

	String getContractNo();

	BaseRespBean checkFactorContactDYK(ContractReqBean reqBean);

}
