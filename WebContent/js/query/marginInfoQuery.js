$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
    initTable();
});

function searchFun() {
    initTable();
}

function initTable() {
    $('#marginListTable').bootstrapTable('destroy');
    $("#marginListTable").bootstrapTable({
        method: "post",
        url: "../finance/list",
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
        queryParams: function queryParams(params) {
            var dataTemp = CloudUtils.convertStringJson('searchForm');
            var jsonData = eval("(" + dataTemp + ")");
            return JSON.stringify(jsonData);
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
            field: 'agencyName',
            title: '客户名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'agencyNum',
            title: '组织机构代码证号',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'financeAmount',
            title: '融资金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'loanAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'depositPay',
            title: '应缴保证金金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'marginPayDate',
            title: '缴纳日期',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'actualMarginPay',
            title: '实缴保证金金额',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'marginSurplus',
            title: '剩余保证金金额',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
                return parseInt(row.depositPay)-parseInt(row.actualMarginPay);
            }
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


window.operateEvents = {
    'click .detail': function(e, value, row, index) {
        $('#financeInfo').modal('show')
        CloudUtils.setForm(row, 'detailForm');
        initCarInfoTable();
    }
};


