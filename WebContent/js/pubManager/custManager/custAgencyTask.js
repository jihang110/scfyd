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
				initShareHolderTable(jsonData.shareInfoList);
				attachInfoTable(jsonData.attachInfoList);
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

function checkAdvice(){
	var advice = $.trim($("#advice").val());
	if(advice == ""){
		$("#check").text("意见说明不能为空");
	}else{
		$("#check").text("");
	}
}

function doAgree(type){
	var advice = $.trim($("#advice").val());
	if(type==1){
		checkAdvice();
		if(advice){
			getInfo(type);
		}
	}
	 if(type ==0){
		 getInfo(type);		
	 }
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

function initShareHolderTable(data){
	$('#shareHolderInfoTable').bootstrapTable('destroy');  
	$("#shareHolderInfoTable").bootstrapTable({  
	     method: "post", 
	     data : data, 
	     striped: false,  //表格显示条纹  
	     search: false,  //是否启用查询  
	     showColumns: false,  //显示下拉框勾选要显示的列  
	     showRefresh: false,  //显示刷新按钮  
	     sidePagination: "server", //表示服务端请求  
	     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	     //设置为limit可以获取limit, offset, search, sort, order  
	     queryParamsType : "undefined", 
	     responseHandler:function responseHandler(res) {
	    	 if (res.result==0) {
	        	 return {
	        		 "rows": res.dataList,
	        		 "total": res.records
	        	 };

	    	 } else {
	    		 alert(res.resultNote);
	    		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
	    	 }
	     },
	     columns: [{
	 	        field: 'shareName',
	 	        title: '股东名称',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'shareProportion',
	 	        title: '持股比例',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'registeredCapital',
	 	        title: '注册资本份额',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'registeredCapitalProportion',
	 	        title: '注册资本占比',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="shareInfo" href="javascript:void(0)"></a>';
	 	        	var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" data-type="shareInfo" href="javascript:void(0)"></a>';
	 	            return m +' '+ r;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	   });  
}

//添加附件信息
function attachInfoTable(data){
	 $('#attachInfoTable').bootstrapTable('destroy'); 
		$("#attachInfoTable").bootstrapTable({  
			 method: "post", 
		     data : data, 
		     striped: false,  //表格显示条纹  
		     search: false,  //是否启用查询  
		     showColumns: false,  //显示下拉框勾选要显示的列  
		     showRefresh: false,  //显示刷新按钮  
		     sidePagination: "server", //表示服务端请求  
		     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		     //设置为limit可以获取limit, offset, search, sort, order  
		     queryParamsType : "undefined",    
	         responseHandler:function responseHandler(res) {
	        	 if (res.result==0) {
		        	 return {
		        		 "rows": res.dataList,
		        		 "total": res.records
		        	 };

	        	 } else {
	        		 bootbox.alert(res.resultNote);
	        		 return {
				        	 "rows": [],
				        	 "total": 0
				        	 };
	        	 }
	         },
	         columns: [{
	 	        field: 'fileUrl',
	 	        title: '附件地址',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
		 	}, {
	 	        field: 'fileName',
	 	        title: '附件名称',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 var s = '<a href="/../..'+row.fileUrl+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'attachType',
	 	        title: '附件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'attachSize',
	 	        title: '附件大小',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	            return r;
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
}

function getInfo(type){
	var data = CloudUtils.convertStringJson('detailForm');
	data = eval("(" + data + ")");
	var allTableData = $('#shareHolderInfoTable').bootstrapTable('getData');
	var attachData = $('#attachInfoTable').bootstrapTable('getData');
	data.shareInfoList = allTableData;
	data.attachInfoList = attachData;
	data.agree = type;
	data.taskId = taskId;
	var jsonString = null;
		   var options = {
					url : '../../custInfo/doAgree',
					data : JSON.stringify(data),
					callBackFun : function(data) {
						jsonString = data.str;
						if(type==1){
							bootbox.alert(data.resultNote,function(){
								window.location.href='../../project/agencyTask/agencyTask.html';
							});
						}
					},
					errorCallback : function(data) {
						bootbox.alert(data.resultNote);
						return false;
					}
				};
		CloudUtils.ajax(options); 
		//同意并且是最后一步录入数据库
		if(type==0){
			 var jsonData =  eval("(" + jsonString + ")");
//			 同意的时候录入数据库
			 if(jsonData.isEdit=="2"){
//				 修改
				 var options = {
	 	 				url : '../../custInfo/mod',
	 	 				data : JSON.stringify(jsonData),
	 	 				callBackFun : function(data) {
	 	 					bootbox.alert(data.resultNote);
	 	 					if (data.result == 0) {
	 	 						bootbox.alert(data.resultNote,function(){
									window.location.href='../../project/agencyTask/agencyTask.html';
								});
	 	 						searchFun();
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
			 }else{
//				 添加
				 var options = {
							url : '../../custInfo/add',
							data : JSON.stringify(jsonData),
							callBackFun : function(data) {
								if (data.result == 0) {
									bootbox.alert(data.resultNote,function(){
										window.location.href='../../project/agencyTask/agencyTask.html';
									});
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
		}
}