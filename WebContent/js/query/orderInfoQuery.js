$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
    initTable();
    dateload();
});

function searchFun() {
    initTable();
    
}

function initTable() {
    $('#orderListTable').bootstrapTable('destroy');
    $("#orderListTable").bootstrapTable({
        method: "post",
        url: "../orderQuery/orderList",
        striped: false, //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            return JSON.stringify(jsonData);
            // return JSON.stringify({});
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
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
            field: 'loanDate',
            title: '放款日期',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'contractNo',
            title: '合同编号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'recOrderAmt',
            title: '接收订单金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqTotalAmt',
            title: '超人所需费用总额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'loanAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeStartDay',
            title: '融资起始日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeDueDay',
            title: '融资到期日',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operation',
            title: '详情',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var m = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';

                return m;
            },
            events: 'operateEvents'
        }]
    });
}

function initRepayListTable() {
    $('#repayListTable').bootstrapTable('destroy');
    $("#repayListTable").bootstrapTable({
        method: "post",
        // url: "../orderQuery/orderList",
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            // var dataTemp = CloudUtils.convertStringJson('searchForm');
            // var jsonData = eval("(" + dataTemp + ")");
            // return JSON.stringify(jsonData);
            return JSON.stringify({});
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
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
            field: 'productName',
            title: '产品名称',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'productAmt',
            title: '产品金额',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'period',
            title: '分期期数',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'loan',
            title: '分期总费用',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'sellerId',
            title: '商家id',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'sellerName',
            title: '商家名称',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'crReqAmt',
            title: '超人所需费用',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'startPayAmt',
            title: '首付金额',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'payM',
            title: '每期还款金额',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'startPayDay',
            title: '首期还款日期',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'name',
            title: '姓名',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'birth_ym',
            title: '出身年月',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'idCard',
            title: '身份证',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'contact',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'school',
            title: '学校',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'grade',
            title: '年级',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'graduateDate',
            title: '毕业时间',
            align: 'center',
            valign: 'middle',
            width:150
        }, {
            field: 'file',
            title: '相关图片',
            align: 'center',
            valign: 'middle',
            width:150
        }]
    });
}


function initRepayPlanListTable() {
    $('#repayPlanListTable').bootstrapTable('destroy');
    $("#repayPlanListTable").bootstrapTable({
        method: "post",
        url: "../orderQuery/repayPlanList",
        striped: false, //表格显示条纹  
        pagination: false, //启动分页  
        pageSize: 5, //每页显示的记录数  
        pageNumber: 1, //当前第几页  
        pageList: [5, 10, 15, 20, 25], //记录数可选列表  
        search: false, //是否启用查询  
        showColumns: false, //显示下拉框勾选要显示的列  
        showRefresh: false, //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType: "undefined",
        queryParams: function queryParams(params) {
            var jsonData = {
                orderBatchId:$("#orderBatchId2").val()
            };
            return JSON.stringify(jsonData);
            // return JSON.stringify({});
        },
        responseHandler: function responseHandler(res) {
            if (res.result == 0) {
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
            field: 'orderId',
            title: '订单号',
            align: 'center',
            valign: 'middle',
           
        }, {
            field: 'period',
            title: '期数',
            align: 'center',
            valign: 'middle',
           
        }, {
            field: 'currentRepayDate',
            title: '本期还款日',
            align: 'center',
            valign: 'middle',
            
        }, {
            field: 'currentPayablePrincipal',
            title: '本期还款本金',
            align: 'center',
            valign: 'middle',
            
        }, {
            field: 'currentPayableInterest',
            title: '本期应款利息',
            align: 'center',
            valign: 'middle',
            
        }, {
            field: 'repayStatus',
            title: '还款状态',
            align: 'center',
            valign: 'middle',
          
        }, {
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle',
           
        }]
    });
}

window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        $('#financeInfo').modal('show');
        CloudUtils.setForm(row, 'detailForm');
        initRepayListTable();
        $('#repayListTable').bootstrapTable('append', row);
    }
};


function dateload() {
    $('#financeStartDay').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

    $('#financeDueDay').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });

    $('#loanDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        initialDate: new Date(), //初始化当前日期
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });
}
