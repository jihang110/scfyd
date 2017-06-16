//获取url中的值taskId
var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;
var procInstId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).procInstId;
var taskDefKey = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskDefKey;

$(document).ready(function() {
    getTaskData();
    if (taskDefKey == "task_order_fzr") {
        $("#div_refuse").show();
    }
});

function getTaskData() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: "../../../activiti/getTaskDataByTaskId",
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                debugger;
                var jsonData = eval("(" + data.str + ")");
                getBatchInfoById(jsonData.orderBatchId);
                initOrderListTable(jsonData.orderId, jsonData.orderStatus);

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


function getBatchInfoById(batchId) {
    var data = {};
    data.orderBatchId = batchId;

    var options = {
        url: '../../../order/batchInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            CloudUtils.setForm(data, 'detailForm');
        }
    };
    CloudUtils.ajax(options);
}


function getPlanInfos() {
    debugger;
    var orderIds = "";
    var data = {};
    var allTableData = $("#orderList").bootstrapTable('getData'); //获取表格的所有内容行 
    for (i = 0; i < allTableData.length; i++) {
        var row = allTableData[i];
        if (row.orderStatus == '1') {
            orderIds = orderIds + "," + row.orderId;
        }
    }
    data.orderId = orderIds;
    var options = {
        url: '../../../order/plans',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            debugger;
            initRepayPlanListTable();
            for (var i = 0; i < data.length; i++) {
                $("#planInfoListTable").bootstrapTable('append', data[i]);
            }


        }
    };
    CloudUtils.ajax(options)
}


function doAgree(type) {
    var data = {};
    var orderIds = "";
    var status = "";
    var allTableData = $("#orderList").bootstrapTable('getData'); //获取表格的所有内容行 
    for (i = 0; i < allTableData.length; i++) {
        var row = allTableData[i];
        orderIds = orderIds + "," + row.orderId;
        status = status + "," + row.orderStatus
    }
    data.orderId = orderIds;
    data.orderStatus = status;
    data.taskId = taskId;
    data.agree = type;
    data.orderBatchId = $("#orderBatchId2").val();
    var options = {
        url: '../../../order/doAgree',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote);
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);

    if (taskDefKey == "task_order_fzr"&&type=="0") {
         var options = {
        url: '../../../order/add',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote);
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
    }
}

function initOrderListTable(orderIds, orderStatus) {
    $('#orderList').bootstrapTable('destroy');
    $("#orderList").bootstrapTable({
        method: "post",
        url: "../../../order/orderList",
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
            debugger;
            var param = {
                orderId: orderIds,
                orderStatus: orderStatus
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
            field: 'orderId',
            title: '订单号',
            align: 'center',
            valign: 'middle',
            width: 150

        }, {
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
            field: 'name',
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
            field: 'birth_ym',
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
            field: 'contact',
            title: '联系方式',
            align: 'center',
            valign: 'middle',
            width: 150
        }, {
            field: 'school',
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
        }, {
            field: 'orderStatus',
            title: '订单状态',
            align: 'center',
            valign: 'middle',
            width: 150,
            formatter: function(value) {
                if (value == "1") {
                    return "通过";
                } else {
                    return "拒绝";
                }
            }
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            width: 100,
            formatter: function(value, row, index) {
                var m = '<a class = "agree" style="color:#278bdd;padding:0px 5px;" title="通过" href="javascript:void(0)">通过</a>';
                var d = '<a class = "refuse" style="color:#278bdd;padding:0px 5px;" title="拒绝" href="javascript:void(0)">拒绝</a>';
                if (taskDefKey == "task_order_fzr") {
                    return "-";
                }
                return m + ' ' + d;

            },
            events: 'operateEvents'
        }]
    });
}

function initRepayPlanListTable() {
    $('#planInfoListTable').bootstrapTable('destroy');
    $("#planInfoListTable").bootstrapTable({
        method: "post",
        // url: "../../../repayInfo/repayPlanInfo",
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
            field: 'name',
            title: '学生姓名',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'idCard',
            title: '身份证号',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'contact',
            title: '联系方式',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'productAmt',
            title: '应收账款总额',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'crReqAmt',
            title: '保理融资投放金额',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'contact',
            title: '每期应收账款金额',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'currentRepayDate',
            title: '每期应收账款到期日',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'period',
            title: '期数',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'currentRepayDate',
            title: '每期保理融资到账日',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'currentPayablePrincipal',
            title: '每期保理融资本金到账金额',
            align: 'center',
            valign: 'middle',

        }, {
            field: 'currentPayableInterest',
            title: '每期保理融资利息到账金额',
            align: 'center',
            valign: 'middle',

        }]
    });
}



window.operateEvents = {
    'click .agree': function(e, value, row, index) {
        row.orderStatus = '1';
        $("#orderList").bootstrapTable('updateRow', { index, row });
    },
    'click .refuse': function(e, value, row, index) {
        row.orderStatus = '0';
        $("#orderList").bootstrapTable('updateRow', { index, row });
    }

};
