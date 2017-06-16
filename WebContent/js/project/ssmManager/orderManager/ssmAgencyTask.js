var url = "";
$(document).ready(function() {
    getTaskData();


});

$("#contractFrame").load(function() {
    var mainheight = $(this).contents().find("body").height() + 30;
    $(this).height(mainheight);
});


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
                $("#contractInfo").val(data.str);
                viewContract(data.str);

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

//预览合同
function viewContract(data) {
    var tempdata = eval("(" + data + ")");
    var jsonData = {
        signId: tempdata.signId,
        fileId: tempdata.fileId
    };
    jsonData = JSON.stringify(jsonData);
    var options = {

        url: '../../sign/view',
        data: jsonData,
        callBackFun: function(data) {
            // reqContractPage(data);
            $('#contractFrame').attr('src', data);
            url = data;
        }

    };
    CloudUtils.ajax(options);
}


function reqContractPage(url) {
    debugger;

    $.ajax({
        type: "GET",
        dataType: 'JSONP',
        url: url,
        jsonp: 'callback',
        jsonpCallback: "success_jsonpCallback",
        success: function(data) {
            debugger;
            alert(data.msg);
            $("#contractPage").append(data);
        }
    });
}

function saveFun() {
    var data = $("#contractInfo").val();
    data = eval("(" + data + ")");
    data.agree = "0";
    data.taskId = taskId;
    data.url = url;
    data = JSON.stringify(data);
    debugger;
    var options = {
        url: '../../sign/doAgree',
        data: data,
        callBackFun: function(data) {
            bootbox.alert(data.resultNote, function() {
                window.location.href = '../../project/agencyTask/agencyTask.html';
            });
        }
    };
    CloudUtils.ajax(options);
}
