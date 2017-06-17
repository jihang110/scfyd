$(document).ready(function() {
    initCertifyFileListTable();
    // initCorpInfo();
    setForm();
    initCorpInfo();
});


function setForm() {
    var data = {};
    data.taskId = taskId;
    var options = {
        url: '../../activiti/getTaskDataByTaskId',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            if (data.result == 0) {
                debugger;
                var jsonData = eval("(" + data.str + ")");
                CloudUtils.setForm(jsonData, "infoForm");
                //初始化table数据
                var tableJsonData = eval("(" + $("#fileInfo").val() + ")");
                $("#certifyFileListTable").bootstrapTable("append", tableJsonData);

                $("#fileNum").val(tableJsonData.length);

            }
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}


function reapply() {
    var allTableData = $("#certifyFileListTable").bootstrapTable('getData');
    $("#fileInfo").val(JSON.stringify(allTableData));
    var data = CloudUtils.convertStringJson('infoForm');
    data = eval("(" + data + ")");
    data.taskId = taskId;
    var options = {
        url: '../../contract/reApply',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        },
        errorCallback: function(data) {
            bootbox.alert(data.resultNote);
            return false;
        }
    };
    CloudUtils.ajax(options);
}

function initCorpInfo() {
    var options = {
        url: '../../corp/dyk',
        data: {},
        callBackFun: function(data) {
            $("#corpName").val(data.corpName);
            $("#corpOrgnNum").val(data.orgnNum);
        },
        errorCallback: function(data) {
            return false;
        }
    };
    CloudUtils.ajax(options);
    debugger;
    var data = {};
    data.userId = store.get('userId');
    var options2 = {
        url: '../../corp/userCorpInfo',
        data: JSON.stringify(data),
        callBackFun: function(data) {
            $("#supplierName").val(data.corpName);
            $("#supplierOrgnNum").val(data.orgnNum);
            $("#agencyCorpId").val(data.corpId);
        },
        errorCallback: function(data) {
            return false;
        }
    };
    CloudUtils.ajax(options2);


}


function initCertifyFileListTable() {
    $('#certifyFileListTable').bootstrapTable('destroy');
    $("#certifyFileListTable").bootstrapTable({
        method: "post",
        //         url: "../..//", 
        striped: true, //表格显示条纹  
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
            return {};
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
            title: '附件名称',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row) {
                var a = "<a href='/../../.." + row.fileUrl + "' download='" + value + "'>" + value + "</a>"
                return a;
            }
        }, {
            field: 'fileClass',
            title: '附件类型',
            align: 'center',
            formatter: function(value) {
                if (value == '0') {
                    return '签约视频';
                } else if (value == '1') {
                    return '签约文件';
                } else if (value == '2') {
                    return '其他';
                }
            }

        }, {
            field: 'fileType',
            title: '文件格式',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'fileSize',
            title: '文件大小',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'fileUrl',
            title: '文件路径',
            align: 'center',
            valign: 'middle',
        }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
                var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
                return r;
            },
            events: 'operateEvents'
        }]
    });
}

function fileSelect() {
    document.getElementById("file").value = null;
    document.getElementById("file").click();
}

function uploadAttachment(id) {
    tableName = id;
    fileSelect();
}


function ajaxFileUpload(obj) {

    if (!checkFileNum()) {
        bootbox.alert("上传的附件数不能超过10个");
        $("#fileInfoForm")[0].reset();
        return;
    }

    var type = obj.value.substr(obj.value.lastIndexOf(".")).toLowerCase();
    if (!checkFileType(type)) {
        bootbox.alert("仅支持上传docx、excel、pdf、png、jpg、mp4、avi类型的文件");
        $("#fileInfoForm")[0].reset();
        return;
    }

     if (!checkFileSize(obj)) {
        bootbox.alert("文件大小不能超过50M");
        $("#fileInfoForm")[0].reset();
        return;
    }

    if ($(obj).val().length > 0) {
        $.ajaxFileUpload({
            url: '../../file/binUpload?pathId=2',
            secureuri: false,
            fileElementId: $(obj).attr("id"),
            dataType: 'json',
            success: function(data, status) {
                debugger;
                if (data.result == 0) {
                    CloudUtils.setForm(data, 'fileInfoForm');
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

var fileTypes = [".docx", ".excel", ".pdf", ".png", ".jpg", ".mp4", ".avi"];

function checkFileType(type) {
    var result = $.inArray(type, fileTypes);
    if (result == -1) {
        return false;
    }
    return true;
}

function checkFileNum() {
    var num = Number($("#fileNum").val());
    if (num >= 10) {
        return false;
    }
    return true;
}

function addFile() {
    debugger;
    var data = CloudUtils.convertStringJson('fileInfoForm');
    data = eval("(" + data + ")");
    $("#certifyFileListTable").bootstrapTable("append", data);
    $('#fileModal').modal('hide');
    $("#fileInfoForm")[0].reset();
    addFileNum();
}

function checkFileSize(obj) {
    debugger;
    var fileSize = 0;
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE && !obj.files) {
        var filePath = obj.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = obj.files[0].size;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    fileSize = Math.round(fileSize / 1024);
    if (fileSize > 50) {
        return false;
    }
    return true;
}

window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        bootbox.confirm("确定删除此条记录?", function(result) {
            if (result) {
                var values = [];
                values.push(row.fileUrl);
                $("#certifyFileListTable").bootstrapTable("remove", { field: 'fileUrl', values: values });
                subFileNum();
            }
        });
    },
    'click .modify': function(e, value, row, index) {
        modFun(row);
    },

};

function addFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num + 1);
}

function subFileNum() {
    var num = Number($("#fileNum").val());
    $("#fileNum").val(num - 1);
}
