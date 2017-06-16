$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	dateload();
	initTable();
	numFormat();
	$('#detailModal').on('hidden.bs.modal', function() {
		$("#detailForm").bootstrapValidator('resetForm', true);
		$("#detailForm")[0].reset();
	});
} );

window.operateEvents = {
	'click .detail': function (e, value, row, index) {
		detailFun(row);
    },
};

function searchFun(){
	 initTable();
}

function detailFun(row) {
 	CloudUtils.setForm(row,'detailForm');
 	initInterestTable();
 	$('#detailForm').find("input, select").attr('disabled',true);
 	$('#detailModal').modal({backdrop: 'static', keyboard: false});
}

function dateload(){
	 $("#searchForm").find('#financeStartDate,#financeEndDate').datetimepicker({
      language: 'zh-CN',
      autoclose: 1,
      todayBtn: true,// 显示今天时间
      pickerPosition: "bottom-left",
      minuteStep: 5,
      format: 'yyyy-mm-dd',
      minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
      initialDate : new Date() //参考financeInfoManager.js
     });
	 $('#financeStartDate').datetimepicker('setEndDate', new Date());
}

function initTable() { 
	$('#financeInfoList').bootstrapTable('destroy'); 
	$("#financeInfoList").bootstrapTable({  
		 method: "post", 
         url: "../../finance/list", 
         striped: true,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var param = {    
               pageNumber: params.pageNumber,
               pageSize: params.pageSize,
               isPage : 1,
               agencyName:jsonData.agencyName,
               agencyNum:jsonData.agencyNum,
	           financeId:jsonData.financeId,
	           financeStartDate:jsonData.financeStartDate,
	           financeEndDate:jsonData.financeEndDate
           };    
           return JSON.stringify(param);
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
 	        field: 'agencyName',
 	        title: '经销商名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'agencyNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'financeId',
 	        title: '融资编号',
 	        align: 'center',
            valign: 'middle',
            visible:false
 	    }, {
 	        field: 'financeStartDate',
 	        title: '融资起始日',
 	       align: 'center',
           valign: 'middle'
 	    },{
 	        field: 'financeEndDate',
 	        title: '融资到期日',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'financeAmount',
 	        title: '融资金额',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index){
 	        	return $.number(value, 2);
 	        }
 	    },{
 	        field: 'expense',
 	        title: '付款金额',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index){
 	        	return $.number(value, 2);
            }
 	    },{
 	        field: 'financeStatus',
 	        title: '融资状态',
 	        align: 'center',
 	        valign: 'middle',
 	       formatter:function(value,row,index) {
				if (value == "0") {
					return "未审核";
				} else if (value == "1") {
					return "待放款";
				}else if (value == "2") {
					return "已放款";
				}else if (value == "3") {
					return "已部分还款";
				}else if (value == "4") {
					return "已全额还款";
				}else if (value == "5") {
					return "逾期";
				}
	    	}
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'operateEvents'
 	    }
 	    ]
       });
}

function initInterestTable() {
	$('#interestInfoList').bootstrapTable('destroy'); 
	$("#interestInfoList").bootstrapTable({  
		 method: "post", 
         url: "../../finance/getProGuarantee", 
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
           return '{"productId" : "product01"}';
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
 	        field: 'rateStandard',
 	        title: '利率标准',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'dykRate',
 	        title: '利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    }, {
 	        field: 'interest',
 	        title: '利息',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
 	        	// 利息:融资金额*（融资到期日-融资起始日）*利率/360
 	        	var financeAmount = $("#financeAmount").val();
 	        	var financeStartDate = $("#detailForm #financeStartDate").val();
 	        	var financeEndDate = $("#detailForm #financeEndDate").val();
 	        	var diff = CloudUtils.DateDiffSec(financeEndDate, financeStartDate);
 	        	var a = CloudUtils.Math(financeAmount, diff, "mul");
 	        	var b = CloudUtils.Math(a, row.dykRate, "mul");
 	        	var c = CloudUtils.Math(b, 360, "div");
 	        	var d = CloudUtils.Math(c, 100, "div");
				return CloudUtils.ccyFormatNoPre(d, 2);
	    	}
 	    }]
       });
}

function numFormat(){
	$("#maxCredit").number(true, 2);	//最高信用额度
	$("#availableCredit").number(true, 2);	//可用信用额度
	$("#financeRate").number(true, 2);	//融资比例
	$("#cashRate").number(true, 4);	//费率
	$("#financeAmount").number(true, 2);	//融资金额
	$("#expense").number(true, 2);	//费用
}

function addFun() {
	$('#mainFrame',top.document).attr('src','project/dykManager/financeAdd.html');
}