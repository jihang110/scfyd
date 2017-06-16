$(document).ready(function() {
    getTaskData();
    loadTaskFwView();


});


function getTaskData() {
    debugger;
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../activiti/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            debugger;
            if (data.result == 0) {
                data = eval("(" + data.str + ")");
                CloudUtils.setForm(data, 'detailForm');
            } else {
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function loadTaskFwView() {
    batchInfoById($("#orderBatchId2").val());
    initRepayListTable($("#orderBatchId2").val());
}


function batchInfoById(orderBatchId) {
    var data = {};
    data.orderBatchId = orderBatchId;
    debugger;
    var options = {
        url: '../../sign/batchInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            CloudUtils.setForm(data, 'detailForm');
        }
    };
    CloudUtils.ajax(options);
}

function searchFun() {
    initTable();
    // dateload();
}

function getBatchInfo() {
    initTable();
}


function saveFun() {
    var type = $("#agree").val();
    agree(type);
    if (type == "0") {
        add();
    }
}

function add() {
    var dataTemp = CloudUtils.convertStringJson('detailForm');
    var options = {
        url: '../../sign/add',
        data: dataTemp,
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

function agree(type) {
    var data = {};
    data.agree = type;
    data.taskId = taskId;
    data.orderBatchId = $("#orderBatchId2").val();
    data = JSON.stringify(data);
    debugger;
    var options = {
        url: '../../sign/doAgree',
        data: data,
        callBackFun: function(data) {
            if (type == "1") {
                bootbox.alert(data.resultNote, function() {
                    window.location.href = '../../project/agencyTask/agencyTask.html';
                });
            }
        }
    };
    CloudUtils.ajax(options);
}





function initRepayListTable(orderBatchId) {
    $('#repayListTable').bootstrapTable('destroy');
    $("#repayListTable").bootstrapTable({
        method: "post",
        url: "../../sign/orderList",
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
            debugger;
            var param = { orderBatchId: orderBatchId };
            return JSON.stringify(param);
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
            width: 150
        }, {
            field: 'productAmt',
            title: '产品金额',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'period',
            title: '分期期数',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'productAmt',
            title: '分期总费用',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'sellerId',
            title: '商家id',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'sellerName',
            title: '商家名称',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'crReqAmt',
            title: '超人所需费用',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'startPayAmt',
            title: '首付金额',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'payM',
            title: '每期还款金额',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'startPayDay',
            title: '首期还款日期',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'stuName',
            title: '姓名',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'birthDate',
            title: '出身年月',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'idCard',
            title: '身份证',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'schoolName',
            title: '学校',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'grade',
            title: '年级',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'graduateDate',
            title: '毕业时间',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'file',
            title: '相关图片',
            align: 'center',
            valign: 'middle',
            width: 150
        }]
    });
}


function initRepayPlanListTable() {
    $('#repayPlanListTable').bootstrapTable('destroy');
    $("#repayPlanListTable").bootstrapTable({
        method: "post",
        url: "../../orderQuery/repayPlanList",
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
                orderBatchId: $("#orderBatchId2").val()
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


function dateload() {
    $('#financeStartDate').datetimepicker({
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
