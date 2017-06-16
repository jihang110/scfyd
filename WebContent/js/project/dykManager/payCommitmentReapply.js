$(document).ready(function() {
	$("form").attr("autocomplete","off");
	// 保证金收取比例取得
	ajaxProGuarantee();
	downloadTemp();
	initCarInfoListTable();
	numFormat();
	setForm();
});

function initCarInfoListTable() { 
	$('#carInfoListTable').bootstrapTable('destroy'); 
	$("#carInfoListTable").bootstrapTable({  
		method: "post", 
        url: "", 
        striped: true,  //表格显示条纹  
        pagination: false, //启动分页  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
          return null;
        },  
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
	 	        field: 'fileType',
	 	        title: '文件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'fileSize',
	 	        title: '文件大小',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	            return r;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
       });  
}

window.operateEvents = {
    'click .remove':function (e, value, row, index) {
    	$('#carInfoListTable').bootstrapTable('remove', {field: 'fileUrl', values: [row.fileUrl]});
	}
};

function searchAgency() {
	initAgencyListTable();
}

function initAgencyListTable() { 
	$('#agencyListTable').bootstrapTable('destroy'); 
	$("#agencyListTable").bootstrapTable({
		method: "post", 
        url: "../../commitment/agencyList", 
        striped: true,  //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5,  //每页显示的记录数  
        pageNumber:1, //当前第几页  
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        singleSelect : true, // 单选checkbox 
        clickToSelect: true,  //是否启用点击选中行
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
        	return JSON.stringify({
        		pageSize: params.pageSize,
        		pageNumber: params.pageNumber,
        		agencyName: $("#agency_name").val(),
        		agencyNum: $("#agency_num").val(),
        		financeId: $("#finance_id").val()
        	});
        },  
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
                checkbox: true 
         	}, {
	 	        field: 'agencyName',
	 	        title: '经销商名称',
	 	        align: 'center',
	            valign: 'middle'
		 	}, {
	 	        field: 'agencyNum',
	 	        title: '经销商代码',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'financeId',
	 	        title: '融资编号',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'maxCredit',
	 	        title: '最高授信额度',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'availableCredit',
	 	        title: '可用授信额度',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'payActGuarantee',
	 	        title: '实缴保证金金额',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'financeStartDate',
	 	        title: '融资起始日',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'financeEndDate',
	 	        title: '融资到期日',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'financeAmount',
	 	        title: '融资金额',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }]
       });  
}

function ajaxProGuarantee() {
	var options = {
		url : '../../finance/getProGuarantee',
		data : '{"productId":"product01"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				$("#guaranteeRate").val(data.guaranteeRate);
			} else {
				bootbox.alert(data.resultNote);
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

function checkAgency() {
	var selData = $("#agencyListTable").bootstrapTable('getSelections')[0];
	CloudUtils.setForm(selData, 'addForm');
	$("#agencyModal").modal('hide');
}

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#payM").number(true, 2);
	$("#guaranteeAmt").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#guaranteeDiff").number(true, 2);
	$("#financeAmount").number(true, 2);
}

function chgPayM() {
	var payM = $("#payM").val();
	var guaranteeRate = $("#guaranteeRate").val();
	var payActGuarantee = $("#payActGuarantee").val();
	// 保证金金额
	var a = CloudUtils.Math(payM, guaranteeRate, "mul");
	var b = CloudUtils.Math(a, 100, "div");
	$("#guaranteeAmt").val(b);
	// 保证金差额
	var guaranteeAmt = $("#guaranteeAmt").val();
	var guaranteeDiff = CloudUtils.Math(payActGuarantee, guaranteeAmt, "sub");
	$("#guaranteeDiff").val(Math.abs(guaranteeDiff));
}

// 下载模板
function downloadTemp() {
	var options = {
			url : '../../user/configKey',
			data :'{"itemKey":"carDetailExcelTemp"}',
			callBackFun : function(data) {
				if (data.result == 0) {
					var excelUrl = "../../"+data.itemValue;
					$('#downloadTemp').attr('href',excelUrl);
				} else {
					bootbox.alert(data.resultNote);
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

// 文件上传
function upload() {
	$("#file").click();
}

function ajaxFileUpload() {
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({
	        url : '../../file/binUpload?pathId=3',
	        secureuri : false,
	        fileElementId : 'file',
	        dataType : 'json',
	        success : function(data, status) {
	            if (data.result == 0) { 
	            	$("#carInfoListTable").bootstrapTable('append', data);
	                bootbox.alert("上传成功！");
	            }else{
	            	bootbox.alert("上传失败！");
	            }
	        },
	        error : function(data, status, e) {
	        	bootbox.alert(e);
	        }
	    });
    } else {
    	bootbox.alert("请选择文件");
    }
}

function reapply() {
	var data = CloudUtils.convertStringJson('addForm');
	var jsonData = eval("(" + data + ")");
	var carListData = $("#carInfoListTable").bootstrapTable('getData');
	jsonData.carListInfo = JSON.stringify(carListData);
	jsonData.taskId = taskId;
	
	var options = {
		url : "../../commitment/reApply",
		data : JSON.stringify(jsonData),
		callBackFun : function(data) {
			if(data.result==0){
				bootbox.alert(data.resultNote, function() {
					window.location.href = '../../project/agencyTask/agencyTask.html';
				});
			}else{
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback:function(data){
			bootbox.alert("error");
		}
	};
	CloudUtils.ajax(options);
}

function setForm() {
	var options = {
		url : '../../commitment/getDataByTaskId',
		data : JSON.stringify({
			taskId : taskId,
			varName : "payApplyJson"
		}),
		callBackFun : function(data) {
			if (data.result == 0) {
				var json = JSON.parse(data.str);
				var carListInfo = json.carListInfo;
				CloudUtils.setForm(json, "addForm");
				$.each(JSON.parse(carListInfo), function(i, row) {
					$("#carInfoListTable").bootstrapTable('append', row);
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