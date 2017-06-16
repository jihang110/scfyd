$(document).ready(function() {
    getTaskData();
    loadCWView();
    initTable();


});


function loadCWView() {
    $('input').attr("disabled", true);
}

function getTaskData() {
    debugger;
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../activiti/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                debugger;
                var jsonData = eval("(" + data.str + ")");
                CloudUtils.setForm(jsonData, 'infoForm');


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

function saveFun() {
        agree();
        updateStatus();
}


//同意流程
function agree() {
    debugger;
    var dataTemp = CloudUtils.convertStringJson('infoForm');
    var jsonData = eval("(" + dataTemp + ")");
    jsonData.agree = '0';
    jsonData.taskId = taskId;
    var options = {

        url: '../../ssmRepay/doAgree',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            // bootbox.alert(data.resultNote);
        }
    };
    CloudUtils.ajax(options);
}

function updateStatus() {
    var data = {};
    data.repayDate = $("#repayDate").val();
    var options = {
        url: '../../ssmRepay/updateStatus',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote,function(){
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}

function initTable() {
    $('#repaymentListTable').bootstrapTable('destroy');
    $("#repaymentListTable").bootstrapTable({
        method: "post",
        url: "../../ssmRepay/repayPlan",
        striped: true, //表格显示条纹  
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
        queryParams: function queryParams(params) { //设置查询参数  
            debugger;
            var param = {
                repayDate: $("#repayDate").val(),
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            };
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
            field: 'productId',
            title: '序号',
            align: 'center',
            valign: 'middle',
            //          visible: false
        }, {
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqAmt',
            title: '超人所需总费用',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'currentPayablePrincipal',
            title: '本期应还本金金额',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'currentPayablePrincipal',
            title: '本期应还利息金额',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'operation',
            title: '接收订单明细',
            align: 'center',
            valign: 'middle',
            events: 'operateEvents2',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                return d;
            }
        }, {
            field: 'operation',
            title: '还款计划',
            align: 'center',
            valign: 'middle',
            events: 'operateEvents',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
                return d;
            }
        }]
    });
}


function initOrderTable() {
    $('#orderListTable').bootstrapTable('destroy');
    $("#orderListTable").bootstrapTable({
        method: "post",
        url: "../../ssmRepay/repayPlan",
        striped: true, //表格显示条纹  
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
        queryParams: function queryParams(params) { //设置查询参数  
            debugger;
            var param = {
                pageNumber: params.pageNumber,
                pageSize: params.pageSize
            };
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
            field: 'productId',
            title: '序号',
            align: 'center',
            valign: 'middle',
            //          visible: false
        }, {
            field: 'orderBatchId',
            title: '订单批次号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqAmt',
            title: '超人所需总费用',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'crReqAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'currentPayablePrincipal',
            title: '本期应还本金金额',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'currentPayablePrincipal',
            title: '本期应还利息金额',
            align: 'center',
            valign: 'middle',
        }]
    });
}


function initRepayPlanTable(orderBatchId) {
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
                orderBatchId: orderBatchId
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


function initOrderListTable(orderBatchId) {
    $('#orderListTable').bootstrapTable('destroy');
    $("#orderListTable").bootstrapTable({
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
            width: 100
        }, {
            field: 'productAmt',
            title: '产品金额',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'period',
            title: '分期期数',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'productAmt',
            title: '分期总费用',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'sellerId',
            title: '商家id',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'sellerName',
            title: '商家名称',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'crReqAmt',
            title: '超人所需费用',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'startPayAmt',
            title: '首付金额',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'payM',
            title: '每期还款金额',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'startPayDay',
            title: '首期还款日期',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'stuName',
            title: '姓名',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'birthDate',
            title: '出身年月',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'idCard',
            title: '身份证',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'schoolName',
            title: '学校',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'grade',
            title: '年级',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'graduateDate',
            title: '毕业时间',
            align: 'center',
            valign: 'middle',
            width: 100
        }, {
            field: 'file',
            title: '相关图片',
            align: 'center',
            valign: 'middle',
            width: 100
        }]
    });
}

window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        $("#repayModal").modal("show");
        initRepayPlanTable(row.orderBatchId);
    }
};

window.operateEvents2 = {
    'click .detail': function(e, value, row, index) {
        $("#orderModal").modal("show");
        initOrderListTable(row.orderBatchId);
    }
};
