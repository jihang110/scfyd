//获取url中的值taskId
var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;
var procInstId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).procInstId;
$(function () {
	"use strict";
    setForm();
    getAllHisVal();
 });
function setForm(){
	var data = {};
	data.taskId = taskId;
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"detailForm");
			} else {
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	 CloudUtils.ajax(options);
}

function repapply(){
	var data = CloudUtils.convertStringJson('detailForm');
	data = eval("(" + data + ")");
	data.taskId = taskId;
	var options = {
				url : '../../revenue/reApply',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
}

function getAllHisVal(){
		var options = {
				url : '../../activiti/getAllHistoryVariable',
				data : '{"procInstId":"'+procInstId+'"}',
				callBackFun : function(data) {
					
					for(var i=0;i<data.dataList.length;i++){
						var s = '<li>'+data.dataList[i].assignee +" "+CloudUtils.FormatDate(data.dataList[i].createTime)+" "+data.dataList[i].taskName+" "+data.dataList[i].advice+'</li>';
						$("#histroyAdvice").append(s);
					}
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
}

