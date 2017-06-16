package com.ut.scf.web.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.HtmlToWordReqBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * 导出相关的控制类
 * 
 * @author sunll
 *
 */
@Controller
public class ExportController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(ExportController.class);

	@RequestMapping(value = "/export/htmlToWord", method = RequestMethod.POST, consumes = { "application/json" })
	public void htmlToWord(HttpServletRequest request, HttpServletResponse response,
			@Valid @RequestBody HtmlToWordReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		// 设置输出word类型
		response.setContentType("application/msword;charset=gbk");
        response.setCharacterEncoding(ScfConsts.GBK_ENCODING);
        response.setStatus(200); // 设置返回状态为OK
        PrintWriter writer = response.getWriter();
        
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			writer.write(respBean.getResultNote());
			writer.flush();
			writer.close();
			return;
		}

		// 查找模板文件
		ServletContext application = request.getSession().getServletContext();
        String serverRealPath = application.getRealPath("exportTemp/");
        File tempFile = new File(serverRealPath, reqBean.getFileName());
        if (!tempFile.exists()) {
        	respBean.setResult(ErrorCodeEnum.FILE_NOT_EXIST);
			writer.write(respBean.getResultNote());
			writer.flush();
			writer.close();
        	return;
        }
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(tempFile), ScfConsts.UTF8_ENCODING));
        StringBuffer sbStr = new StringBuffer();
        String tempStr = null;
        // 一次读入一行，直到读入null为文件结束
        while ((tempStr = reader.readLine()) != null) {
        	sbStr.append(tempStr);
        }
        reader.close();
        
        String writeStr = sbStr.toString();
        for (Map.Entry<?, ?> entry : reqBean.getParamMap().entrySet()) {
			writeStr = writeStr.replace("${" + entry.getKey() + "}", entry.getValue().toString());
		}
        
        
        writer.write(writeStr);
        writer.flush();
        writer.close();
	}

}
