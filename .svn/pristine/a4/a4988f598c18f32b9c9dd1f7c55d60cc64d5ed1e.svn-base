package com.ut.scf.web.controller.query;
import java.io.IOException;
import javax.annotation.Resource;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ut.scf.reqbean.query.ContractFileListReqBean;
import com.ut.scf.reqbean.query.ContractInfoListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.query.IContractQueryService;

@Controller
@RequestMapping("/contractInfo")
public class ContractListController {
    @Resource
	private IContractQueryService contractQueryService;

    private Logger log = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping(value = "/list")
	public @ResponseBody BaseRespBean contractListInfo(
			@Valid @RequestBody ContractInfoListReqBean ContractInfoListReqBean)
			throws IOException {
		BaseRespBean respBean = contractQueryService
				.contractInfoList(ContractInfoListReqBean);

		return respBean;
	}

	@RequestMapping(value = "/fileList")
	public @ResponseBody BaseRespBean contractFileList(
			@Valid @RequestBody ContractFileListReqBean ContractFileListReqBean)
			throws IOException {
		BaseRespBean respBean = contractQueryService
				.contractInfoFileList(ContractFileListReqBean);

		return respBean;
	}


}



