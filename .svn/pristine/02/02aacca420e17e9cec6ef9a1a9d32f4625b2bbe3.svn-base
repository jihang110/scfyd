$(document).ready(function() {
	CloudUtils.getMenuNames("nav");
    initTable();
    numFormat();
});

function searchFun() {
    initTable();
}

function initTable() {
    $('#marginListTable').bootstrapTable('destroy');
    $("#marginListTable").bootstrapTable({
        method: "post",
        url: "../guaranteeQuery/list",
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
            jsonData.pageSize=params.pageSize;
            jsonData.pageNumber=params.pageNumber;
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
            field: 'financeId',
            title: '融资编号',
            align: 'center',
            valign: 'middle'
        },{
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
            valign: 'middle',
            formatter:function (value,row) {
        		return $.number(value,2);
            }
        }, {
            field: 'payAmt',
            title: '放款金额',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
            	if(!row.payAmt){
            		return '--';
            	}else{
            		return $.number(value,2);
            	}
            }
        }, {
            field: 'payAbleGuarantee',
            title: '应缴保证金金额',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
            	
            	return $.number(row.payAbleGuarantee,2);
            }
        }, {
            field: 'guaranteePayDate',
            title: '缴纳日期',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
            	if(!row.guaranteePayDate){
            		row.guaranteePayDate= '--';
            	}
            	return value;
            }
        }, {
            field: 'payActGuarantee',
            title: '实缴保证金金额',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
                if(!row.payActGuarantee){
                	return '--';
                }else{
                	return $.number(row.payActGuarantee,2);
                }
            }
        }, {
            field: 'guaranteeBalance',
            title: '剩余保证金金额',
            align: 'center',
            valign: 'middle',
            formatter:function (value,row) {
                return $.number(parseInt(row.payAbleGuarantee)-parseInt(row.payActGuarantee),2);
            }
        },{
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
    	var guaranteeBalance = parseInt(row.payAbleGuarantee)-parseInt(row.payActGuarantee);
        $('#financeInfo').modal('show')
        CloudUtils.setForm(row, 'detailForm');
        $("#guaranteeBalance").val(guaranteeBalance);
    }
};

function numFormat(){
	$("#payAbleGuarantee").number(true, 2);
	$("#financeAmount").number(true,2);
	$("#payAmt").number(true,2);
	$("#guaranteeBalance").number(true,2);
	$("#payActGuarantee").number(true,2);
}
