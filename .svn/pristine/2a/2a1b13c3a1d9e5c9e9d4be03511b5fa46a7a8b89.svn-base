$(document).ready(function() {
	ajaxTable(); 
	window.parent.scrollTo(0,0);
} );

function ajaxTable(){
	var data = '{"isPage":0,"type": 1}';
	var options = {
			url : '../../internalAnnouncement/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$.each(data.dataList, function (index, units) {
						$("#userListTable").append("<tr><td class='tableTitleCss' onclick=\"toDetail('"+units.recUid+"')\"><a>" + units.title + "</a></td><td class='tableTimeCss'>" + dateFormat(units.createTime, 'yyyy-MM-dd HH:mm') + "</td></tr>");  
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}

function toDetail(id){
	window.location.href="officeDetail.html?id="+id;
}

function back(){
	parent.location.reload();
}

var dateFormat = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
