var htmlType = getQueryString("type");//'1、新闻，2、课堂'
$(document).ready(function() {
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

function ajaxDetail(){
	var id = getQueryString("id");
	var data = '{"classNewsId":"'+id+'"}';
	var options = {
			url : '../../classNews/detail',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#title").html(data.title);
					$("#content").html(data.content);
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
	if(htmlType==1){
		window.location.href="news.html";
	}else if(htmlType==2){
		window.location.href="classes.html";
	}else if(htmlType==3){
		window.location.href="classNewsManager.html";
	}else{
		parent.location.reload();
	}
}

