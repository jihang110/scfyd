$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
	$('#detailModal').on('hidden.bs.modal', function() {
		$("#detailForm")[0].reset();
	});
	dateload();
	initTable();
	numFormat();
});

window.operateEvents = {
	'click .detail': function (e, value, row, index) {
		detailFun(row);
	}
};

function addFun() {
	$('#mainFrame',top.document).attr('src','project/dykManager/payCommitmentAdd.html');
}

function searchFun(){
	initTable();
}

function detailFun(row) {
 	$('#detailModal').modal();
 	CloudUtils.setForm(row, 'detailForm');
}

function dateload(){
	$('#pay_date').datetimepicker({
      language: 'zh-CN',
      autoclose: 1,
      todayBtn: true,// 显示今天时间
      pickerPosition: "bottom-left",
      minuteStep: 5,
      format: 'yyyy-mm-dd',
      minView: 'month',　　// 日期时间选择器所能够提供的最精确的时间选择视图。
      initialDate : new Date() //参考financeInfoManager.js
    });
}

function initTable() { 
	$('#payCommitmentInfoList').bootstrapTable('destroy'); 
	$("#payCommitmentInfoList").bootstrapTable({  
		method: "post", 
        url: "../../commitment/list", 
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
              agencyName:jsonData.agency_name,
              agencyNum:jsonData.agency_num,
              financeId:jsonData.finance_id,
              payId:jsonData.pay_id,
              payDate:jsonData.pay_date
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
            valign: 'middle',
 	    }, {
 	        field: 'agencyNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'payId',
 	        title: '付款编号',
 	       align: 'center',
           valign: 'middle'
 	    },{
 	        field: 'payDate',
 	        title: '付款日期',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'payAmt',
 	        title: '付款金额',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    },{
 	        field: 'financeId',
 	        title: '融资编号',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'financeAmount',
 	        title: '融资金额',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index) {
				return $.number(value, 2);
	    	}
 	    },{
 	        field: 'maxCredit',
 	        title: '最高授信额度',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    },{
 	        field: 'availableCredit',
 	        title: '可用授信额度',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    },{
 	        field: 'financeStartDate',
 	        title: '融资起始日',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    },{
 	        field: 'financeEndDate',
 	        title: '融资到期日',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    },{
 	        field: 'guaranteeAmt',
 	        title: '应缴保证金金额',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    },{
 	        field: 'payActGuarantee',
 	        title: '实缴保证金金额',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
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

function numFormat(){
	$("#maxCredit").number(true, 2);
	$("#availableCredit").number(true, 2);
	$("#payAmt").number(true, 2);
	$("#guaranteeAmt").number(true, 2);
	$("#payActGuarantee").number(true, 2);
	$("#financeAmount").number(true, 2);
}