$(document).ready(function() {
	initTable(); 
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	initToolbarBootstrapBindings();
	$('#editor').wysiwyg({
		fileUploadError : showErrorAlert
	});
	formValidator();
	window.prettyPrint && prettyPrint();
} );

function initToolbarBootstrapBindings() {
	var fonts = [ 'Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
			'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact',
			'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
			'Times New Roman', 'Verdana' ], fontTarget = $('[title=Font]')
			.siblings('.dropdown-menu');
	$.each(fonts, function(idx, fontName) {
		fontTarget.append($('<li><a data-edit="fontName ' + fontName
				+ '" style="font-family:\'' + fontName + '\'">' + fontName
				+ '</a></li>'));
	});
	$('a[title]').tooltip({
		container : 'body'
	});
	$('.dropdown-menu input').click(function() {
		return false;
	}).change(
			function() {
				$(this).parent('.dropdown-menu').siblings(
						'.dropdown-toggle').dropdown('toggle');
			}).keydown('esc', function() {
		this.value = '';
		$(this).change();
	});

	$('[data-role=magic-overlay]').each(
			function() {
				var overlay = $(this), target = $(overlay.data('target'));
				overlay.css('opacity', 0).css('position', 'absolute')
						.offset(target.offset()).width(target.outerWidth())
						.height(target.outerHeight());
			});
	if ("onwebkitspeechchange" in document.createElement("input")) {
		var editorOffset = $('#editor').offset();
		$('#voiceBtn').css('position', 'absolute').offset({
			top : editorOffset.top,
			left : editorOffset.left + $('#editor').innerWidth() - 35
		});
	} else {
		$('#voiceBtn').hide();
	}
}

function showErrorAlert(reason, detail) {
	var msg = '';
	if (reason === 'unsupported-file-type') {
		msg = "Unsupported format " + detail;
	} else {
		console.log("error uploading file", reason, detail);
	}
	$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'
					+ '<strong>File upload error</strong> '
					+ msg
					+ ' </div>').prependTo('#alerts');
}

window.operateEvents = {
		'click .detail': function (e, value, row, index) {
				detailFun(row,0);
		},
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	    					url : '../../classNews/delete',
	    					data : '{"classNewsId":"'+row.classNewsId+'"}',
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
	            } 
	    	 });
	    }
	};




function searchFun() {
	initTable();  
}

function initTable() { 
	$('#userListTable').bootstrapTable('destroy');  
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../classNews/list", 
         striped: true,  //表格显示条纹  
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               title: jsonData.s_title==null?"":jsonData.s_title,
               type: jsonData.s_type
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
 	        field: 'classNewsId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'type',
 	        title: '类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
            	if(value==1){
            		return "新闻";
            	}else{
            		return "保理课堂";
            	}
            }
 	    }, {
 	        field: 'title',
 	        title: '标题',
 	        align: 'left',
            valign: 'middle',
            cellStyle:function(value, row, index, field) {
            	  return {
            		    css: {"color": "#8e9197", "height": "40px"}
            		  };
            		}
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-eye detail" style="color:#1c4efa;padding:0px 5px;" title="查看" href="javascript:void(0)"></a>';
 	            var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
// 	            if(store.get('roleType')==1){
// 	            	return d+' '+m;
// 	            }
 	            return d+' '+m+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}
 
function addFun() {
	$("#addModalLabel").text("新增");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
    $('#editor').html(""); 
}

function detailFun(row,isEdit) {
	window.location.href="classDetail.html?id="+row.classNewsId+"&type=0";
}

function modFun(row,isEdit) {
    $("#addModalLabel").text("修改");
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    $('#title').val(row.title);
    $("#type").find("option[value='"+row.type+"']").attr("selected", true);
    $('#editor').html(row.content);
    $('#classNewsId').val(row.classNewsId);
}

function saveUser() {
	var content = $('#editor').html(); 
	$('#content').val(content);
	var da = $('#addForm').data('bootstrapValidator');
	da.validate();
	
	if(!da.isValid()){  
		 	return false;
    }else{
    	var data = CloudUtils.convertStringJson('addForm');
    	var isEdit =  $('#isEdit').val(); 
    	if(isEdit == 1){//新增1；修改2
    		var options = {
    				url : '../../classNews/add',
    				data : data,
    				callBackFun : function(data) {
    					if(data.result==0){
    						searchFun();
    						bootbox.alert(data.resultNote);
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
    	}else if(isEdit == 2){
    		var options = {
    				url : '../../classNews/mod',
    				data : data,
    				callBackFun : function(data) {
    					if(data.result==0){
    						searchFun();
    						bootbox.alert(data.resultNote);
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
    	$("#addModal").modal("hide");
    }
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  title: {
	              validators: {
	                  notEmpty: {
	                      message: '标题不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 100,
	                      message: '长度为1-100'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator')
		});
}