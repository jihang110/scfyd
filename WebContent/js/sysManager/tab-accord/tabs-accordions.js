$(function() {
	$("form").attr("autocomplete","off");
	//CloudUtils.ajax(CloudUtils.options);
	ajaxWarningCount();
	ajaxNotFlowCount();
	ajaxHandleCount();
	clickHandle();
	anchor();
	hideAndShow();
	//IFrameResize();
	
	ajaxTable(1);
	ajaxTable(2);
	ajaxOffice();
	ajaxDocument();
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
	$(".fa-th-large").click(function(){
		$(this).parent().parent().next().toggle(1000);
	});
	
	
});

/*****************************首页状态***************************/

function hideAndShow(){
	var userId = store.get("userId");
	 var param = {    
            userId:userId
         };
	var options = {
			url : 'homeInfo/list',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					 $.each(data.dataList, function(i, n) {
						 var obj = $("#"+n.infoType);
						 var tag_obj = $("#"+n.infoType+"Tag");
						 if(n.status =="0"){
						 obj.toggle(false);
						 tag_obj.removeClass('glyphicon glyphicon-minus form-control-feedback spanflow');
						 tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#2582e3"});
						 tag_obj.addClass('"glyphicon glyphicon-plus form-control-feedback spanflow');
						 }else{
						 obj.toggle(true);
						tag_obj.removeClass('glyphicon glyphicon-plus form-control-feedback spanflow');
						tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#f7643b"});
						tag_obj.addClass('"glyphicon glyphicon-minus form-control-feedback spanflow');
						 }
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
	
	elementClick();
}

function elementClick(){
	
	$('.clickJudge').click(function (e) {
		var v_idStr = $(e.target).attr('id');
		var tag_idStr = "";
		var t_idStr = "";
		if(v_idStr != undefined){
			
		if(v_idStr.indexOf("Tag") > 0){
			t_idStr = v_idStr.replace('Tag','');
			tag_idStr = v_idStr;
		} else if(v_idStr.indexOf("button") > 0){
			t_idStr = v_idStr.replace('button','');
			tag_idStr = t_idStr+"Tag";
		} else {
			return;
		}
		var t_obj = $("#"+t_idStr);
		var tag_obj = $("#"+tag_idStr);
		if( t_obj.css("display")=='none' ){
			tag_obj.removeClass('glyphicon glyphicon-plus form-control-feedback spanflow');
			tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#f7643b"});
			tag_obj.addClass('"glyphicon glyphicon-minus form-control-feedback spanflow');
			modfun(t_idStr,1);  
		}else{
			tag_obj.removeClass('glyphicon glyphicon-minus form-control-feedback spanflow');
			tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#2582e3"});
			tag_obj.addClass('"glyphicon glyphicon-plus form-control-feedback spanflow');
			modfun(t_idStr,0);
		}
		t_obj.toggle(0);
		//IFrameResize();
		}else{
			return;
		}
	}); 
}


function modfun(infoType,status){
	var userId = store.get("userId");
	 var param = {    
	            userId:userId,
	            infoType:infoType,
	            status:status
	         };
	var options = {
			url : 'homeInfo/mod',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					
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

/********************内部公告*********************/


function toOffice(){
	window.location.href="office/officeManager/office.html";
}
function toOfficeDetail(id){
	window.location.href="office/officeManager/officeDetail.html?id="+id;
}
function ajaxOffice(){
	var data = '{"isPage":1,"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'internalAnnouncement/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					
					var id = "officeTable";
					
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toOfficeDetail('"+units.recUid+"')\"><a>" + units.title + "</a></td></tr>");  
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

/********************文档下载*********************/


function toDocument(){
	window.location.href="office/documentManager/documentList.html";
}
function toDocumentDetail(id){
	window.location.href="office/documentManager/documentDetail.html?id="+id;
}
function ajaxDocument(){
	var data = '{"isPage":1,"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'document/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					
					var id = "documentTable";
					
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toDocumentDetail('"+units.recUid+"')\"><a>" + units.title + "</a></td></tr>");  
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
	$('#mainFrame',top.document).attr('src','sysManager/warningManager/warningManager.html');
}


function ajaxWarningCount(){
	var options = {
			url : 'warning/count',
			data : "{}",
			callBackFun : function(data) {
					$("#expenseExpireCount").html(data);
			}
	};
	CloudUtils.ajax(options);
}




function toDetail(id){
	window.location.href="sysManager/classNewsManager/classDetail.html?id="+id;
}
function toClasses(){
	window.location.href="sysManager/classNewsManager/classes.html";
}
function toNews(){
	window.location.href="sysManager/classNewsManager/news.html";
}
function ajaxTable(type){
	var data = '{"isPage":1,"type":'+type+',"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'classNews/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					var id;
					if(type==1){
						id = "newsTable";
					}else{
						id = "classTable";
					}
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toDetail('"+units.classNewsId+"')\"><a>" + units.title + "</a></td></tr>");  
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


/*********************标签Mark***************************/


function addFun() {
	//父页面滚动条滚动到顶部	
	window.parent.window.scrollTo(0,0);
	initTable();
	$("#addModalLabel").text("事项管理");
    $('#addModal').modal({backdrop: 'static', keyboard: false});// 防止点击空白/ESC 关闭
   // $('#isEdit').val(1); // 新增1；修改2
}

function modFun(row) {
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(isEdit); // 新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function addmark() {

 	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm'); 
	
	//var isEdit =  $('#isEdit').val(); 
	//if(isEdit == 1){// 新增1；修改2
	
		var options = {
				url : 'userMark/add',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
						initTable();
						$('input').val("");
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
	/*}else{
		var options = {
				url : '../../transfer/mod',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
						searchFun();
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
	}*/

}

function initTable() { 
	$('#userMarkListTable').bootstrapTable('destroy');  
	$("#userMarkListTable").bootstrapTable({  
         method: "post", 
         url: "userMark/list", 
         striped: false,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var corpId =  store.get("corpId");
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: corpId,
               websiteName:jsonData.txt_websiteName
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'markName',
 	        title: '事项名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'markDesc',
 	        title: '详细',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    },{
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
	 	         var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	        return r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

window.operateEvents = {
	    'click .remove': function (e, value, row, index) {
	    	
	    	
	    	
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	    		if(row.corpId != null){
	            	var options = {
	    					url : 'userMark/delete',
	    					data : '{"recUid":"'+row.recUid+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initTable();
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
	    		}else{
	    			bootbox.alert("系统标签不能删除");
	    			
	    		}
	    	 });
	    }
	};


function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  
	    	  markName: {
	    		  validators: {
	    			  notEmpty: {
	                      message: '不能为空'
	                  },
	                  stringLength: {
	                	  min: 1,
	                	  max: 10,
	                	  message: '最大为10个字'
							}
						}
	          }
	         
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
	});	
}

function IFrameResize(){
	 var obj = parent.document.getElementById("mainFrame");  //取得父页面IFrame对象  
	 //alert(obj.height); //弹出父页面中IFrame中设置的高度  
	 obj.height = $(".iframeBody").height();  //调整父页面中IFrame的高度为此页面的高度  
	  
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