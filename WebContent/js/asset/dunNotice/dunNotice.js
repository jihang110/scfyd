$(function() { 
	//alert("加载就执行");
});


function exportWord(){
	var paramMap = CloudUtils.convertStringJson('noticeForm');
	paramMap = eval("(" + paramMap + ")");
	var data ={};
	data.fileName = "dunNoticeTemp.html";
	data.paramMap = paramMap;
	data = JSON.stringify(data);
	$.ajax({  
	    type: "post",  
	    url: '../../export/htmlToWord',  
	    contentType : "application/json;charset=utf-8",  
	    data: data,  
	    success: function (res) { 
	    	var blob = new Blob([res], {type: "text/plain;charset=utf-8"});
	    	saveAs(blob, "dunNotice.doc");
	    }
	    	
	});  
}
	
