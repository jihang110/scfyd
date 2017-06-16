package com.ut.scf.respbean.office;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.respbean.BaseRespBean;

public class documentDownloadDetailRespBean extends BaseRespBean{
	/**
	 * 所属企业id
	 */
	private String corpId;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 公告内容
	 */
	private String documentContent;
	/**
	 * 发布日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String releaseDate;
	/**
	 * 附件上传
	 */
	private String documentUrl;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDocumentContent() {
		return documentContent;
	}
	public void setDocumentContent(String documentContent) {
		this.documentContent = documentContent;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public String getDocumentUrl() {
		return documentUrl;
	}
	public void setDocumentUrl(String documentUrl) {
		this.documentUrl = documentUrl;
	}
}
