/*var htmlType = getQueryString("type");//'1、新闻，2、课堂'
*/$(document).ready(function() {
	ajaxDetail(); 
	window.parent.scrollTo(0,0);
	//首先将#back-to-top隐藏
    $("#topBtn").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $("#topBtn").fadeIn(1500);
            } else {
                $("#topBtn").fadeOut(1500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#topBtn").click(function() {
        	$(window.frames["mainFrame"].document).animate({
                scrollTop: 0
            },
            1000);
            return false;
        });
    });
} );

var test = null;
function ajaxDetail(){
	var id = getQueryString("id");
	var data = '{"recUid":"'+id+'"}';
	var options = {
			url : '../../internalAnnouncement/detail',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#title").html(data.title);
					$("#announcementContent").html(data.announcementContent);
					$("#attachmentUrl").html(data.attachmentUrl);
					test = data.attachmentUrl;
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

function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}  

function back(){
		window.location.href="office.html";
}

function click1(){
	if(test == ''){
    	bootbox.alert("没有附件可以下载");
    }else{ 
    	window.location.href=test;
    }
   
  
}