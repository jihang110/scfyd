var orderBatchId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).orderBatchId;
var isFirst = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isFirst; //表示是否为发起 0 表示被打回
var taskId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).taskId;

$(document).ready(function() {
    $('.date').html("");
    $('.date').append(CloudUtils.getcurrentdate());
    contractNO();
    initRepayPlanListTable();
    crReqAmtByBatchId(orderBatchId);
    getRate();
});

function contractNO() {
    var options = {
        url: '../../../sign/no',
        data: {},
        callBackFun: function(data) {
            $('.code').html("");
            $('.code').append(data);
        }
    };
    CloudUtils.ajax(options);
}

function crReqAmtByBatchId(orderBatchId) {
    var jsonData = { orderBatchId: orderBatchId };
    var options = {
        url: '../../../sign/crReqAmt',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            $('#money').html("");
            $('#money').append(data);
        }
    };
    CloudUtils.ajax(options);
}

function getRate() {
    var jsonData = { productId: $("#productId").val() };
    var options = {
        url: '../../../sign/rate',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            debugger;
            var rate = Number(data) / 100;
            var money = $('#money').html();
            var guarantee = Number(money) * Number(rate);
            $('#money2').html("");
            $('#money2').append(guarantee);
        }

    };
    CloudUtils.ajax(options);
}

function send() {
    debugger;
    var jsonData = { productId: $("#productId").val() };
    jsonData.orderBatchId = orderBatchId;
    var options = {
        url: '../../../sign/send',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            data = JSON.stringify(data);
            if (data) {
                if (isFirst == "0") {
                    agree(data);
                } else {
                    startProcess(data);
                }
            } else {
                bootbox.alert("操作失败");
            }
        }

    };
    CloudUtils.ajax(options);
}

function initRepayPlanListTable() {
    $('#repayPlanListTable').bootstrapTable('destroy');
    $("#repayPlanListTable").bootstrapTable({
        method: "post",
        url: "../../../sign/repayList",
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
            valign: 'top',
            width: 60

        }, {
            field: 'stuName',
            title: '学生姓名',
            align: 'center',
            valign: 'top',
            width: 80

        }, {
            field: 'idCard',
            title: '身份证号',
            align: 'center',
            valign: 'top',
            width: 80

        }, {
            field: 'mobilePhone',
            title: '联系方式',
            align: 'center',
            valign: 'top',
            width: 80

        }, {
            field: 'productAmt',
            title: '应收账款<br>总额',
            align: 'center',
            valign: 'top',
            width: 75

        }, {
            field: 'crReqAmt',
            title: '保理融资<br>投放金额',
            align: 'center',
            valign: 'top',
            width: 75

        }, {
            field: 'payM',
            title: '每期应收<br>账款金额',
            align: 'center',
            valign: 'top',
            width: 75

        }, {
            field: 'currentRepayDate',
            title: '每期应收账<br>款到期日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'period',
            title: '期数',
            align: 'center',
            valign: 'middle',
            width: 50

        }, {
            field: 'currentRepayDate',
            title: '每期保理融<br>资到账日',
            align: 'center',
            valign: 'middle',
            width: 110

        }, {
            field: 'currentPayablePrincipal',
            title: '每期保理融<br>资本金到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115

        }, {
            field: 'currentPayableInterest',
            title: '每期保理融<br>资利息到账<br>金额',
            align: 'center',
            valign: 'middle',
            width: 115

        }],
        onLoadSuccess: function(data) {
            mergeCells();
        }
    });
}
//合并单元格
function mergeCells() {
    var index = [];
    var rowspan = [];
    var field = ['orderId', 'stuName', 'idCard', 'mobilePhone', 'payM', 'productAmt', 'crReqAmt'];
    var orderId = "";
    var j = 0;
    var rows = $("#repayPlanListTable").bootstrapTable('getData');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].orderId != orderId) {
            index.push(i);
            if (orderId) {
                rowspan.push(j);
            }
            j = 0;
        }
        orderId = rows[i].orderId;
        j++;
    }
    rowspan.push(j);
    debugger;
    for (var m = 0; m < index.length; m++) {
        var tempIndex = Number(index[m]);
        var tempRowspan = Number(rowspan[m]);
        for (var n = 0; n < field.length; n++) {
            $('#repayPlanListTable').bootstrapTable('mergeCells', { index: tempIndex, field: field[n], colspan: 0, rowspan: tempRowspan });
        }

        // $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'stuName', colspan: 0, rowspan: tempRowspan});
        // $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'idCard', colspan: 0, rowspan: tempRowspan});
        // $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'mobilePhone', colspan: 0, rowspan: tempRowspan});
        // $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'payM', colspan: 0, rowspan: tempRowspan});
        // $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'productAmt', colspan: 0, rowspan: tempRowspan});
        //  $('#repayPlanListTable').bootstrapTable('mergeCells', { index:tempIndex, field: 'crReqAmt', colspan: 0, rowspan: tempRowspan});
    }
}




function uploadContract(obj) {
    $(obj).hide();

    var w = $("body").width();
    var h = $("body").height();

    //要将 canvas 的宽高设置成容器宽高的 2 倍
    var canvas = document.createElement("canvas");
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var context = canvas.getContext("2d")
    context.scale(2, 2);
    html2canvas(document.body, { //截图对象
        //此处可配置详细参数
        canvas: canvas,
        allowTaint: true,
        height: $("body").outerHeight() + 20,
        onrendered: function(canvas) { //渲染完成回调canvas
            canvas.id = "mycanvas";
            // 生成base64图片数据
            var dataUrl = canvas.toDataURL('../../../images/ht'); //指定格式，也可不带参数
            var formData = new FormData(); //模拟表单对象
            formData.append("imgData", convertBase64UrlToBlob(dataUrl), "ht.png"); //写入数据
            var xhr = new XMLHttpRequest(); //数据传输方法
            xhr.open("POST", "../../../sign/send"); //配置传输方式及地址
            xhr.send(formData);
            xhr.onreadystatechange = function() { //回调函数
                debugger;
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (isFirst == "0") {
                            agree(xhr.responseText);
                        } else {
                            startProcess(xhr.responseText);
                        }

                    }
                }
            };
        }
    });
}

//将以base64的图片url数据转换为Blob
function convertBase64UrlToBlob(urlData) {
    //去掉url的头，并转换为byte
    var bytes = window.atob(urlData.split(',')[1]);
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: '../../../images/ht' });
}

//签合同 同意流程
function agree(data) {
    debugger;
    var jsonData = eval("(" + data + ")");
    jsonData.orderBatchId = orderBatchId;
    jsonData.agree = "0";
    jsonData.taskId = taskId;
    jsonData.signDate = CloudUtils.getcurrentdate();
    var options = {

        url: '../../../sign/agreeAndSign',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}


//签合同 并发起流程
function startProcess(data) {
    debugger;
    var jsonData = eval("(" + data + ")");
    jsonData.orderBatchId = orderBatchId;
    jsonData.signDate = CloudUtils.getcurrentdate();
    var options = {

        url: '../../../sign/startProcess',
        data: JSON.stringify(jsonData),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../../homePage.html';
            });
        }
    };
    CloudUtils.ajax(options);
}
