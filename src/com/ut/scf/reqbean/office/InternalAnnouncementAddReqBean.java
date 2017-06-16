package com.ut.scf.reqbean.office;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;

public class InternalAnnouncementAddReqBean extends BaseReqBean {
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
	private String announcementContent;
	/**
	 * 发布日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String releaseDate;
	/**
	 * 附件上传
	 */
	private String attachmentUrl;
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
	public String getAnnouncementContent() {
		return announcementContent;
	}
	public void setAnnouncementContent(String announcementContent) {
		this.announcementContent = announcementContent;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public String getAttachmentUrl() {
		return attachmentUrl;
	}
	public void setAttachmentUrl(String attachmentUrl) {
		this.attachmentUrl = attachmentUrl;
	}
	
}
