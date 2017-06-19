var IS_INTEREST_DATE = true;

$(function () {
	CloudUtils.getMenuNames("nav");
	$("form").attr("autocomplete","off");
	$('#addModal').on('hidden.bs.modal', function() {
		$("#addForm")[0].reset();
		$("#addForm").bootstrapValidator('resetForm', true);
	});
	numFormat();
	downloadTemp();
	initTableInfo();
	formValidator()
	// 还款日期
	$("#repaymentDate").val(CloudUtils.getcurrentdate());
	// 收息日
	ajaxReceptionDate();
	$("#interestDate").val(IS_INTEREST_DATE);
	if (IS_INTEREST_DATE == false) {//非收息日，利息项目不显示
		$("#divRepayInterestAmt").hide();
		$("#carInfoListTable").bootstrapTable('hideColumn', 'notPayInterest');
	}
});

function initTableInfo() { 
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
	 	        field: 'carFrameNum',
	 	        title: '车架号',
	 	        align: 'center',
	            valign: 'middle'
		 	}, {
	 	        field: 'carActualPrice',
	 	        title: '实际提车价（元）',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'financeId',
	 	        title: '融资编号',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeStartDate',
	 	        title: '融资起始日',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeEndDate',
	 	        title: '融资到期日',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'financeAmount',
	 	        title: '融资金额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'payAmt',
	 	        title: '付款金额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'financeBalance',
	 	        title: '付款余额',
	 	        align: 'center',
	             valign: 'middle',
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
	 	    }, {
	 	        field: 'notPayInterest',
	 	        title: '应还利息金额',
	 	        align: 'center',
	             valign: 'middle',
	             visible: true,
	             formatter:function(value,row,index){
					 return $.number(value, 2);
		        }
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
	'click .remove': function (e, value, row, index) {
		$("#carInfoListTable").bootstrapTable('remove', {
			field: 'carFrameNum',
			values: [row.carFrameNum]
		});
		
		var repayCapitalAmt = $("#repayCapitalAmt").val();// 本金
		repayCapitalAmt = CloudUtils.Math(repayCapitalAmt, row.carActualPrice, 'sub');
		
		var hasNotFinanceId = true;
		var allData = $("#carInfoListTable").bootstrapTable('getData');
		for (var i = 0; i < allData.length; i++) {
			if (allData[i].financeId == row.financeId) {
				hasNotFinanceId = false;
				break;
			}
		}
		
		var repayInterestAmt = 0;
		if (IS_INTEREST_DATE == true) {
			repayInterestAmt = $("#repayInterestAmt").val();// 利息
			if (hasNotFinanceId == true) {
				repayInterestAmt = CloudUtils.Math(repayInterestAmt, row.notPayInterest, 'sub');
			}
		}
		
		$("#repayCapitalAmt").val(repayCapitalAmt);
		$("#repayInterestAmt").val(repayInterestAmt);
		$("#repaySumAmt").val(CloudUtils.Math(repayCapitalAmt, repayInterestAmt, 'add'));
    }
};

function save(){
	
	if(!$("#carStolenCertificate").val()){
		bootbox.alert("请上传赎车凭证");
		return false;
	}
	
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
	    //没有通过校验 
		return false;
	} else {
	
		var data = CloudUtils.convertStringJson('addForm');
		var jsonData = eval("(" + data + ")");
		var carListData = $("#carInfoListTable").bootstrapTable('getData');
		if(carListData){
			bootbox.alert("请上传车辆明细");
			return false;
		}
		jsonData.carListInfo = JSON.stringify(carListData);
		
		var options = {
			url : "../../repayInfo/startProcess",
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href="../../project/dykManager/repayManager.html";
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
}

//下载模板
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
function upload(obj) {
	$(obj).next().click();
}

function ajaxFileUpload(id) {
	var url;
	if (id == 'certificateFile') {
		url = '../../file/binUpload?pathId=3';
	} else {
		url = '../../repayInfo/import?pathId=3';
	}
	
	if ($("#" + id).val().length > 0) {
		$.ajaxFileUpload({
	        url : url,
	        secureuri : false,
	        fileElementId : id,
	        dataType : 'json',
	        success : function(data, status) {
	            if (data.result == 0) {
	            	if (id == 'certificateFile') {
	            		$("#carStolenCertificate").val(data.fileUrl);
	            	} else {
	            		var datas = $("#carInfoListTable").bootstrapTable('getData');
	            		if (datas.length > 0) {
	            			var carFrameNumArr = new Array();
	            			$.each(datas, function(i, row) {
		            			carFrameNumArr.push(row.carFrameNum);
		            		});
		            		$("#carInfoListTable").bootstrapTable('remove', {
		            			field: 'carFrameNum',
		            			values: carFrameNumArr
		            		});
	            		}
	            		
	            		var newCarFrameNumArr = new Array();
	            		var repaySumAmt = 0;//还款总金额
	            		var repayCapitalAmt = 0;//还款本金金额
	            		var repayInterestAmt = 0;//还款利息金额
	            		$.each(data.dataList, function(i, row) {
            				repayCapitalAmt = CloudUtils.Math(repayCapitalAmt, row.carActualPrice, 'add');
            				if (IS_INTEREST_DATE == true
            						&& $.inArray(row.financeId, newCarFrameNumArr) == -1) {
            					repayInterestAmt = CloudUtils.Math(repayInterestAmt, row.notPayInterest, 'add');
            					newCarFrameNumArr.push(row.financeId);
            				}
            				$("#carInfoListTable").bootstrapTable('append', row);
            			});
	            		repaySumAmt = CloudUtils.Math(repayCapitalAmt, repayInterestAmt, 'add');
	            		$("#repaySumAmt").val(repaySumAmt);
	            		$("#repayCapitalAmt").val(repayCapitalAmt);
	            		$("#repayInterestAmt").val(repayInterestAmt);
	            	}
	            }else{
	            	bootbox.alert(data.resultNote);
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

function ajaxReceptionDate() {
	var options = {
		url : '../../finance/getProGuarantee',
		data : '{"productId":"product01"}',
		callBackFun : function(data) {
			if (data.result == 0) {
				// 收息日
				if ($("#repaymentDate").val() != data.receptionDate) {
					IS_INTEREST_DATE = false;
				}
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

function numFormat(){
	$("#repaySumAmt").number(true, 2);
	$("#repayCapitalAmt").number(true, 2);
	$("#repayInterestAmt").number(true, 2);
}

function formValidator(){
	$('#addForm').bootstrapValidator({
		 message: 'This value is not valid',
	      excluded:':disabled',
	      group:".valid_group",
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  note:{
	        	  validators: {
	        		  notEmpty: {message: '备注不能为空'}
	        	  } 
	          }
	      }
		}).on('success.form.bv', function (e) {
			e.preventDefault();
			//submitContract();
			//$(e.target).bootstrapValidator('resetForm', true);
		});
}
