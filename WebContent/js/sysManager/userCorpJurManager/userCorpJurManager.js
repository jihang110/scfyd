$(document).ready(function(){
	userNameList();
	addiCheck();
	checkAllOrUn();
	checked();
	ajaxRelaCorps();
});

function addiCheck(){
	$('input').iCheck({
	    checkboxClass: 'icheckbox_square-blue',
	    radioClass: 'iradio_square-blue',
	    increaseArea: '20%'
	  });
}

/**
 * 全选或者全不选
 */
function checkAllOrUn()	{
	$('#chkall').on('ifChecked', function(event){
/*		$("#createCheck input").each(function(){
	          //alert($(this).attr("id"));  //打印子div的ID
	          var id = $(this).attr("id");
	          alert(id);
		});*/
		$("#createCheck").iCheck('check');
	});
	$('#chkall').on('ifUnchecked', function(event){
		$("#createCheck").iCheck('uncheck');
		$("#corpId option").attr("selected",false);
	});
}

/**
 * 被选中触发事件
 */
function checked(){
	clearSelect();
	$('#createCheck').on('ifChecked', function(event){
		  var id = event.target.id;
			 var options = {
						url : "../../userCorpJur/list",
						data :'{"userId":"'+id+'","isPage": 0}',
				         callBackFun : function(data) {
				        	 $.each(data.dataList, function(i, n) {
				        		 $("#corpId option[value='"+n.corpId+"']").attr("selected","selected");
					           });
				        	 
							},
						errorCallback:function(data){
						bootbox.alert("error");
						}
					};
				CloudUtils.ajax(options);
		});
	showNon();
}

/**
 * 清除select
 */
function clearSelect(){
	$('#createCheck').on('ifClicked', function(event){
		ajaxRelaCorps();
	});
}

/**
 * 若选择多个就不显示选项
 */
function showNon(){
	$('#createCheck').on('ifChecked', function(event){
		var cks = document.querySelectorAll("#createCheck input[type=checkbox]:checked");
		if(cks.length>1){
			$("#corpId option").attr("selected",false);
		}
	});
	$('#createCheck ').on('ifUnchecked', function(event){
		var cks = document.querySelectorAll("#createCheck input[type=checkbox]:checked");
		if(cks.length>1){
			$("#corpId option").attr("selected",false);
		}else if(cks.length == 1){
			/*选中的那个*/
			var data = CloudUtils.convertStringJson('editForm');
			var jsonData = eval("(" + data + ")");
			 var options = {
						url : "../../userCorpJur/list",
						data :'{"userId":"'+jsonData.userId+'"}',
				         callBackFun : function(data) {
				        	 $.each(data.dataList, function(i, n) {
				        		 $("#corpId option[value='"+n.corpId+"']").attr("selected","selected");
					           });
				        	 
							},
						errorCallback:function(data){
						bootbox.alert("error");
						}
					};
				CloudUtils.ajax(options);
		}
	});
}


function userNameList(){
	var data = CloudUtils.convertStringJson('searchForm');
    var jsonData = eval("(" + data + ")");
    var corpId = store.get('corpId');
    var param = {
        username: jsonData.txt_userName,
        corpId: corpId,
        isPage:0
    };
	 var options = {
				url : "../../user/list",
				data : JSON.stringify(param),
		         callBackFun : function(data) {
		        	 var checkAdd = ''
		        	 $.each(data.dataList, function(i, n) {
		        		 if(n.roleId !='ROLE000002'){
		        			 checkAdd += '<label><input type="checkbox" name="userId" id="'+n.userId+'" value="'+n.userId+'">'+n.username+'</label><br>'; 
		        		 }
			           });
		        	 $("#createCheck").append(checkAdd);
					},
				errorCallback:function(data){
				bootbox.alert("error");
				}
			};
		CloudUtils.ajax(options);
}

function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var data = CloudUtils.convertStringJson('searchForm');
    var jsonData = eval("(" + data + ")");
    var param = {
    	relaCorpId: relaCorpId,
    	corpName: jsonData.txt_corpName,
        isPage:0
    };
	var options = {
			url : '../../corp/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
					});  
				}else{
					bootbox.alert(data.resultNote);
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 清空后查找
 */
function searchFun(){
	$("#createCheck").empty();
	userNameList();
	addiCheck();
	checkAllOrUn();
	$("#corpName").empty();
	ajaxRelaCorps();
}

function showDetail(){
	 //个数判断
	 var cks = document.querySelectorAll("#createCheck input[type=checkbox]:checked");
	 if(cks.length>1){
		 bootbox.alert("请选择单个用户");
		 return;
	 }else if(cks.length == 0){
		 bootbox.alert("未选择用户");
		 return;
	 }else{
		 $("#detailList").empty();
		 var data = CloudUtils.convertStringJson('editForm');
			var jsonData = eval("(" + data + ")");
			 var options = {
						url : "../../userCorpJur/list",
						data :'{"userId":"'+jsonData.userId+'"}',
				         callBackFun : function(data) {
				        	 if(data.dataList.length != 0){
				        	$('#showDetail').modal();
				        	 var detailList = "<ul style='list-style-type:none'>";
				        	 $.each(data.dataList, function(i, n) {
				        		 detailList += "<li><b>"+n.corpName+"</b></li>"
					           });
				        	 detailList += "</ul>";
				        	 $("#detailList").append(detailList);
				        	 }else{
				        		 bootbox.alert("该用户未分配企业");
				        	 }
							},
						errorCallback:function(data){
						bootbox.alert("error");
						}
					};
				CloudUtils.ajax(options); 
	 }
}

function saveUserCorp(){
	var data = CloudUtils.convertStringJson('editForm');
	var options = {
			url : '../../userCorpJur/mod',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote);
				}else{
					bootbox.alert(data.resultNote);
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

