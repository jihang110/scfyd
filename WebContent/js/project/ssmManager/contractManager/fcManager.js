$(document).ready(function() {
	$("form").attr("autocomplete","off");
    CloudUtils.getMenuNames("nav");
    checkFactorContract();
    dateload();
    initFileTable();
    formValidator();
});


window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var values = [];
                values.push(row.fileUrl);
                $("#fileListTable").bootstrapTable("remove", { field: 'fileUrl', values: values });
            }
        });
    },
    'click .modify': function(e, value, row, index) {
        modFun(row);
    },

};







function initFileTable(contractNo) {

    $('#fileListTable').bootstrapTable('destroy');
    $("#fileListTable").bootstrapTable({
        method: "post",
        url: '../../../contract/fileList',
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
        queryParams: function queryParams(params) { //设置查询参数  
            var param = {
                contractNo: contractNo
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileType',
            title: '文件类型',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'fileSize',
            title: '文件大小',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var d = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return d;
            },
            events: 'operateEvents'
        }]
    });

}


function ajaxFileUpload(obj) {

    if ($(obj).val().length > 0) {
        $.ajaxFileUpload({
            url: '../../../file/binUpload?pathId=2',
            secureuri: false,
            fileElementId: $(obj).attr("id"),
            dataType: 'json',
            success: function(data, status) {
                debugger;
                if (data.result == 0) {
                    $("#fileListTable").bootstrapTable("append", data);
                } else {
                    bootbox.alert("上传失败！");
                }
            },
            error: function(data, status, e) {
                bootbox.alert(e);
            }
        });
    } else {
        bootbox.alert("请选择附件");
    }
};


function dateload() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var now = year + '-' + p(month) + "-" + p(date);
    $('#signDate').val(now);
    $('#contractValDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });
    $('#contractValDate').datetimepicker('setStartDate', now);
    $('#contractDueDate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: true, // 显示今天时间
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'　　　　 // 日期时间选择器所能够提供的最精确的时间选择视图。
    });


    $('#signDate').datetimepicker({
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

function setStartdate() {
    debugger;
    var startDate = $('#contractValDate').val();
    $('#contractDueDate').datetimepicker('setStartDate', startDate);
}

function save() {
    var allTableData = $("#fileListTable").bootstrapTable('getData');
    $("#fileInfo").val(JSON.stringify(allTableData));
    var data = CloudUtils.convertStringJson('addForm');
    data = eval("(" + data + ")");
    data = JSON.stringify(data);
    var options = {
        url: '../../../contract/add',
        data: data,
        callBackFun: function(data) {
            if (data.result == 0) {
                bootbox.alert(data.resultNote);
            } else {
                bootbox.alert(data.resultNote);
                return false;
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);


}

function checkFactorContract() {
	var data ={
		productType:"1"
	};
    var options = {
        url: '../../../contract/check',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result != 0) {
                bootbox.alert(data.resultNote);
                $("#btn_save").attr("disabled", true);
            }
        },
        errorCallback: function(data) {
            bootbox.alert("error");
        }
    };
    CloudUtils.ajax(options);
}
//form验证规则
function formValidator() {
    $('#addForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                signDate: {
                    validators: {
                        notEmpty: {
                            message: '签约日期不能为空'
                        }
                    }
                },
                contractValDate: {
                    validators: {
                        notEmpty: {
                            message: '合同生效日期不能为空'
                        },
                        callback: {
                            message: '合同生效日期不能小于签约日期',
                            callback: function(value, validator, $field, options) {
                                var begin = $('#addForm').find("input[name='signDate']").val();
                                return parseInt(value) <= parseInt(begin);
                            }
                        }
                    }
                },
                contractDueDate: {
                    validators: {
                        notEmpty: {
                            message: '合同到期日期不能为空'
                        },
                        callback: {
                            message: '合同到期日期不能小于签约日期',
                            callback: function(value, validator, $field) {
                                var contractValDate = $('#addForm').find("input[name='contractValDate']").val();
                                return parseInt(value) >= parseInt(contractValDate);
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
        });
}

function p(s) {
    return s < 10 ? '0' + s : s;
}
