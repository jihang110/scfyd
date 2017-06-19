$(function() {
	$("form").attr("autocomplete","off");
	//CloudUtils.ajax(CloudUtils.options);
	ajaxWarningCount();
	ajaxNotFlowCount();
	ajaxHandleCount();
	clickHandle();
	toWarning();
	setUserName();
	managePwd();
	if(store.get('roleType')!=1){
//		ajaxNotFlowCount();
		$("#toNotFlow").click(function(){
			toNotFlow();
		});
		$("#notFlowCount").click(function(){
			toNotFlow();
		});
	}else{
		$("#toNotFlow").unbind();  
		$("#notFlowCount").unbind();  
	}	
	
});



/**
 * 查询未结流程数目
 */
function ajaxNotFlowCount(){
	var data = '{}';
	var options = {
			url : 'activiti/getAgencyTaskNum',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#notFlowCount").text(data.dataList[0].AgencyTaskNum);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 查询已办流程数目
 */
function ajaxHandleCount(){
	var data = '{}';
	var options = {
			url : 'activiti/getHandleTaskNum',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#handleFlowNum").text(data.dataList[0].HandleTaskNum);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 点击已办进入列表详情页
 */
function clickHandle(){
	$("#handleFlow,#handleFlowNum").click(function(){
		$('#mainFrame',top.document).attr('src','project/handleTask/handleTask.html');
	});
}

function toNotFlow(){
	$('#mainFrame',top.document).attr('src','project/agencyTask/agencyTask.html');
} 

/********************预警通知*********************/

function toWarning(){
	$("#warnFlow").click(function(){
		$('#mainFrame',top.document).attr('src','sysManager/warningManager/warningManager.html');
	});
}


function ajaxWarningCount(){
	var options = {
			url : 'warning/count',
			data : "{}",
			callBackFun : function(data) {
					$("#warnCount").html(data);
			}
	};
	CloudUtils.ajax(options);
}

function anchor(){
	 $("a").each(function (){
		    var link = $(this);
		    var href = link.attr("href");
		    if(href && href[0] == "#")
		    {
		      var name = href.substring(1);
		      $(this).click(function() {
		        var nameElement = $("[name='"+name+"']");
		        var idElement = $("#"+name);
		        var element = null;
		        if(nameElement.length > 0) {
		          element = nameElement;
		        } else if(idElement.length > 0) {
		          element = idElement;
		        }
		 
		        if(element) {
		          var offset = element.offset();
		          window.parent.scrollTo(offset.left, offset.top);
		        }
		 
		        return false;
		      });
		    }
		  });
}

/*********************************设置用户名称************************************/
function setUserName(){
	var username=store.get('username');
	if(username.length>10){
		$("p[id='loginRealName']").attr("title",username);
		username = username.substring(0,8)+"...";
	}
	$("p[id='loginRealName']").text(username);
}

/********************************密码维护跳转*************************************/
function managePwd(){
	$("#pwdManage").click(function(){
		$('#mainFrame',top.document).attr("menuPathNames",JSON.stringify(["系统管理","密码维护"]));
		$('#mainFrame',top.document).attr('src','sysManager/userManager/pwdManager.html');
	});
}