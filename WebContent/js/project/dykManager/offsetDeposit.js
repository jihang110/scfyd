$(document).ready(function() {
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	formValidator();
});

function initInterestTable(data) {
	$('#carInfoTable').bootstrapTable('destroy'); 
	$("#carInfoTable").bootstrapTable({
		 url:"../../offsetDeposit/getCarInfo",
		 method: "post", 
         striped: true,  //表格显示条纹  
         pagination: false, //启动分页  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         onCheck: function (row) {
        	 getTableListValue();
	  	},
	  	onCheckAll: function (row) {
        	 getTableListValue();
	  	},
	  	onUncheck: function (row) {
        	 getTableListValue();
	  	},
	  	onUncheckAll: function (row) {
        	 getTableListValue();
	  	},
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
        	 return JSON.stringify({
         		financeId:data.financeId
         	});
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
        		 chengeValue(res);
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
      	},{
 	        field: 'carFrameNum',
 	        title: '车架号',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'carActualPrice',
 	        title: '实际提车价(元)',
 	        align: 'center',
            valign: 'middle'
 	    }]
       });
}

function save(){
	if(!$("#financeId").val()){
		bootbox.alert("请选择融资信息！");
		return false;
	}
	if(!$("#file").val()){
		bootbox.alert("请上传凭证！");
		return false;
	}
	$('#addForm').data('bootstrapValidator').validate();
	 if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 return false;
		    //没有通过校验 
		} else {
		   //通过校验，可进行提交等操作
	var data = CloudUtils.convertStringJson('addForm');
	data = eval("(" + data + ")");
	var tableData = $('#carInfoTable').bootstrapTable('getData');
	data.tableData = tableData;
	 var options = {
				url : '../../offsetDeposit/startProcess',
				data : JSON.stringify(data),
				callBackFun : function(data) {
					if (data.result == 0) {
						bootbox.alert(data.resultNote);
					} else {
						return false;
					}
				},
				errorCallback : function(data) {
					return false;
				}
			};
	 CloudUtils.ajax(options);
	}
}

/**
 * 获取融资信息
 */
function getFinanceInfo(){
	$("#financeModal").modal();
	initFinanceInfoTable();
}


function initFinanceInfoTable(){
	$('#agencyListTable').bootstrapTable('destroy'); 
	$("#agencyListTable").bootstrapTable({  
		method: "post", 
        url: "../../refDeposit/getFinanceInfo", 
        striped: false,  //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5,  //每页显示的记录数  
        pageNumber:1, //当前第几页  
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        singleSelect : true, // 单选checkbox 
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "undefined",   
        queryParams: function queryParams(params) {   //设置查询参数  
        	return JSON.stringify({
        		pageSize: params.pageSize,
        		pageNumber: params.pageNumber
        	});
        },  
        responseHandler:function responseHandler(res) {
       	 if (res.result==0) {
       		 debugger
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
	 	        field: 'financeId',
	 	        title: '融资编号',
	 	        align: 'center',
	            valign: 'middle'
		 	}, {
	 	        field: 'applyDate',
	 	        title: '申请日期',
	 	        align: 'center',
	            valign: 'middle'
	 	    },{
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
	 	    }, {
	 	        field: 'payDate',
	 	        title: '付款日期',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'payAmt',
	 	        title: '付款金额',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'guaranteeMoneyRate',
	 	        title: '保证金收取比例',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'payAbleGuarantee',
	 	        title: '应缴保证金金额',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }, {
	 	        field: 'guaranteePayDate',
	 	        title: '保证金缴纳日期',
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
	 	        field: 'financeBalance',
	 	        title: '付款余额',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    },{
	 	        field: 'guaranteePayHis',
	 	        title: '保证金缴纳历史',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
	 	    }]
       });  
}


function checkFinaceInfo(){
	var finData = $("#agencyListTable").bootstrapTable('getSelections')[0];
	CloudUtils.setForm(finData, 'addForm');
	$("#financeModal").modal('hide');
	//初始化车辆明细表
	initInterestTable(finData);
}

function chengeValue(res){
//	时间
	$("#repaymentDate").val(CloudUtils.getcurrentdate());
	$("#salesAmount").val(res.carActualPriceTotal);
	$("#payInterestAmount").val(12);//假数据
	$("#salesRate").val(CloudUtils.Math($("#salesAmount").val(),$("#financeAmount").val(),"div"));
}

//获取列值并循环计算
function getTableListValue(){
	var carActualPriceTotal = 0;
	var finData = $("#carInfoTable").bootstrapTable('getSelections');
	$.each(finData, function(index, value) {
		carActualPriceTotal += value.carActualPrice;
	});
	$("#payOrginAmount").val(carActualPriceTotal);
	$("#repayAmt").val(CloudUtils.Math($("#payInterestAmount").val(),carActualPriceTotal,"add"));
	$("#offsetGap").val(CloudUtils.Math($("#repayAmt").val(),$("#payActGuarantee").val(),"sub"))
	
}

function uploadAttachment(){
	document.getElementById("file").click();
}

function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({  
	        url : '../../file/binUpload?pathId=3',  
	        secureuri : false,  
	        fileElementId : 'file',  
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
//	            	1.先添加进页面中
	            	$("#carCertificate").val(data.fileUrl);
	            	$("#carCertificateName").val(data.fileName);
	                bootbox.alert("上传成功！");
	                
	            }else{
	            	bootbox.alert("上传失败！"); 
	            } 
	        },  
	        error : function(data, status, e) {  
	        	bootbox.alert(e);  
	        }  
	    });  
    }
    else {
    	bootbox.alert("请选择文件");
    }
	
}

function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  remark : {
	        	 validators: {
	        		 notEmpty: {
	                      message: '请添加备注！'
	                  }	
					}	        	 
		      }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}