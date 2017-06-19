package com.ut.scf.respbean.sys;

import com.ut.scf.respbean.BaseRespBean;

public class FileRespBean extends BaseRespBean {
	private String fileUrl;
	private double fileSize;
	private String fileName;
	private String fileType;

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public void setFileSize(double d) {
		this.fileSize = d;
	}

	public double getFileSize() {
		return fileSize;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

}
