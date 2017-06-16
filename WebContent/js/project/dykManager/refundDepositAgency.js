$(function () {
	"use strict";
    setForm();
    numFormat();
 });
function setForm(){
	var data = {};
	data.taskId = taskId;
	debugger
	 var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData,"infoForm");
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


function getInfo(type){
	var data = CloudUtils.convertStringJson('infoForm');
	data = eval("(" + data + ")");
	data.agree = type;
	data.advice = $("#advice").val();
	data.taskId = taskId;
	var jsonString = null;
	var options = {
				url : '../../refDeposit/doAgree',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					jsonString = data.str;
					bootbox.alert(data.resultNote,function(){
						if(type==1){
							bootbox.alert(data.resultNote,function(){
								window.location.href='../agencyTask/agencyTask.html';
							});
						}
					});
				},
				errorCallback : function(data) {
					bootbox.alert(data.resultNote);
					return false;
				}
			};
	 CloudUtils.ajax(options);
}
function saveFun(){
	 var advice = $.trim($("#advice").val());
	 var type = $("#agree").val();
	 if(type==1){
		if(advice){
			getInfo(type);
		}
	}else{
		getInfo(type);
		 if(taskDefKey == "usertask3"){
			if(type ==0){
				var guaranteeData = eval("(" + jsonString + ")");
				var payActGuarantee = CloudUtils.Math(guaranteeData.payActGuarantee,guaranteeData.returnGuaranteeAmt,"sub");
				var guaranteeBalance = CloudUtils.Math(guaranteeData.guaranteeBalance,guaranteeData.returnGuaranteeAmt,"sub");
				var options = {
						url : '../../refDeposit/modGuaranteeInfo',
						data : '{"financeId":"'+guaranteeData.financeId+'","payActGuarantee":"'+payActGuarantee+'","guaranteeBalance":"'+guaranteeBalance+'"}',
						callBackFun : function(data) {
							bootbox.alert(data.resultNote,function(){
								window.location.href='../agencyTask/agencyTask.html';
							});
						},
						errorCallback : function(data) {
							bootbox.alert(data.resultNote);
							return false;
						}
					};
				CloudUtils.ajax(options);
			} 
		 }
	}
}

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#financeAmount").number(true, 2);
	$("#payAmt").number(true, 2);
	$("#payAbleGuarantee").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#returnGuaranteeAmt").number(true, 2);
	
}