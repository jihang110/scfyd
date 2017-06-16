package com.ut.scf.respbean;

import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.springframework.validation.BindingResult;

import com.ut.scf.core.dict.ErrorCode;
import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.util.ErrorUtil;

/**
 * 响应Bean，基类
 * 
 * @author sunll
 *
 */
public class BaseRespBean {

	/**
	 * 响应结果错误码
	 */
	private int result = -1;

	/**
	 * 响应结果备注
	 */
	private String resultNote = null;

	/**
	 * 响应结果备注
	 */
	private Map<String, String> resultErrorMap = null;

	public BaseRespBean() {
		setResult(ErrorCodeEnum.SUCCESS);
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public void setResult(ErrorCodeEnum ece) {
		setResult(ece.getValue());
		setResultNote(ErrorCode.errorMsg(ece));
	}

	public String getResultNote() {
		return resultNote;
	}

	public void setResultNote(String resultNote) {
			this.resultNote = resultNote;
	}

	public Map<String, String> getResultErrorMap() {
		return resultErrorMap;
	}

	public void setResultErrorMap(Map<String, String> resultErrorMap) {
		this.resultErrorMap = resultErrorMap;
	}

	public void setResultErrorMap(BindingResult bindingResult) {
		this.resultErrorMap = ErrorUtil.getParamValidError(bindingResult);
		String resultErrorMapStr = "";
		Set<Map.Entry<String, String>> resultErrorMapSet=resultErrorMap.entrySet();
		  for (Map.Entry<String, String> entry:resultErrorMapSet) {
		   resultErrorMapStr +=  entry.getValue()+",";
		  }
		  resultErrorMapStr = resultErrorMapStr.substring(0, resultErrorMapStr.length()-1);
		  setResultNote(resultErrorMapStr);
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
