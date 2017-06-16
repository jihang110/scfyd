$(function(){
	//初始化页面操作类型：ADD、EDIT、DELETE、VIEW,RS等。
	SCFUtils.OPTSTATUS = $("#OPTSTATUS").val().toUpperCase();
	//初始化功能操作类型：PM、MM、RE、EC等。
	SCFUtils.FUNCTYPE = $("#FUNCTYPE").val().toUpperCase();
	//初始化功能ID
	SCFUtils.FUNCTIONID = $("#FUNCTIONID").val().toUpperCase();	
	//当前页面索引。
	SCFUtils.CURRENTPAGE = $("#CURRENTPAGE").val().toUpperCase();
	//当前功能的所有页面总数。
	SCFUtils.TOTALPAGE = $("#TOTALPAGE").val().toUpperCase();
	
	//当前页面来源，next标示下一步或者提交来的，pre 标示上一步来的。
	SCFUtils.REQPAGETYPE = $("#REQPAGETYPE").val().toUpperCase();
	
	//当前页面来源，next标示下一步或者提交来的，pre 标示上一步来的。
	SCFUtils.ENTRYTYPE = $("#ENTRYTYPE").val().toUpperCase();
	
	//SYSBUSIUNIT系统栏位
	SCFUtils.SYSBUSIUNIT = $("#SYSBUSIUNIT").val();
	
	//USEROWNERID系统栏位
	SCFUtils.USEROWNERID = $("#USEROWNERID").val();
	
	//LOGOPATH系统栏位
	SCFUtils.LOGOPATH = $("#LOGOPATH").val();
	
	//SYSBUSIDATE系统时间
	SCFUtils.SYSBUSIDATE = $("#SYSBUSIDATE").val();
	
	/*if(/MSIE ([678])/.test( navigator.userAgent)){//IE 678
		SCFUtils.loadJs('js/plugin/jquery/IE9.js',function(){
		});
	}*/

	layer.config({
		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
		//shift: 1, //默认动画风格
		//skin: 'layui-layer-molv' //默认皮肤
	});
	
	//初始化按钮
	SCFUtils.initBar();
	
	//初始化温馨提示
	SCFUtils.initNotice();
	 	
	$(window).bind('beforeunload',function(){
		/*@author YHY @date 2015-6-24 @ref SCF-NO-00002 edit_S*/
		//	var options = {
		//	url : SCFUtils.CANCEL,
		//	async : false
		//};
		//SCFUtils.ajax(options);
		var clientData;
		if (parent.work&&parent.work.onCancelBtnClick&& $.isFunction(parent.work.onCancelBtnClick)) {
			clientData = parent.work.onCancelBtnClick();
		}
		var options = {
			url : SCFUtils.CANCEL,
			data : clientData,	
			async : false
		};
		SCFUtils.ajax(options);
		/*@author YHY @date 2015-6-24 @ref SCF-NO-00002 edit_E*/
	});
	
	//初始化页面数据
	SCFUtils.init();
	
});

/**
 * 初始化页面：
 * 发AJAX请求到后台，如自定义页面中有beforeLoad方法。则beforeLoad方法返回AJAX请求的参数。格式为：
 * { url:'',
 *	 data:{"":"","":''}
 *	}
 * 只有自定义页面中有pageOnLoad方法时，才会执行AJAX请求。
 */
 SCFUtils.init = function(){
	if (typeof pageOnInt !== "undefined" && $.isFunction(pageOnInt)) {
		pageOnInt();
	}
//	alert(SCFUtils.ENTRYTYPE);
	var data ={};
	if(typeof beforeLoad !== "undefined" && $.isFunction(beforeLoad)){
		data = beforeLoad();
	}
	
	if(SCFUtils.ENTRYTYPE ==='WORKFLOW'){
		processWorkflowEntry(data);
	}else if(SCFUtils.ENTRYTYPE ==='CUSTOMER'){
		processCustomerEntry(data);
	}else{//normal
		processNormalEntry(data);
	}
	
	
};

function processWorkflowEntry(data){
	//workflow 进来的功能，除了复合功能以外，全部调FP
	if(SCFUtils.FUNCTYPE ==='RE'){
		processReleasePage(data);
	}else{
		if(data.data){
			$.extend(data.data,{'funcType':'FP'});
		}else{
			data.data ={'funcType':'FP'}; 
		}
		
		processFixPendingPage(data);
	}
}

function processNormalEntry(data){
	if(SCFUtils.FUNCTYPE ==='RE'){
		processReleasePage(data);
	}else if(SCFUtils.FUNCTYPE ==='FP' || SCFUtils.FUNCTYPE ==='FPN'){
		processFixPendingPage(data);
	}else if(SCFUtils.FUNCTYPE ==='EC'){
		processRollBackPage(data);
	}else if(SCFUtils.FUNCTYPE ==='DP'){
		//processRollBackPage(data);
		processReleasePage(data);
	}else{
		processPendingPage(data);
	}
}

function processCustomerEntry(){
	
}

function processReleasePage(data){
//	if(SCFUtils.OPTSTATUS ==='RS'){
//		processResultPage();
//	}else{
//		processBussiPage();
//	}
	//复合功能没有result页面
	processBussiReleasePage(data);
}

function processFixPendingPage(data){
	if(SCFUtils.OPTSTATUS ==='RS'){
		var options = {
				url:data.url||SCFUtils.QUERYURL,
				data:data.data||{},
				callBackFun:function(data){
					if(typeof pageOnResultLoad !== "undefined" && $.isFunction(pageOnResultLoad)){
						return pageOnResultLoad(data);
					}
					return SCFUtils.emptyFn();
				}
		};	
		if(typeof pageOnResultLoad !== "undefined" && $.isFunction(pageOnResultLoad)){
	     	SCFUtils.ajax(options);
		}else{
			orginalPaqgeOnLoad(data);
		}
	}else{
		if(SCFUtils.REQPAGETYPE==='PRE'){
			var options = {
					url:data.url||SCFUtils.QUERYURL,
					data:data.data||{},
					callBackFun:function(data){
						if(typeof pageOnPreLoad !== "undefined" && $.isFunction(pageOnPreLoad)){
							return pageOnPreLoad(data);
						}
						return SCFUtils.emptyFn();
					}
			};	
			if(typeof pageOnPreLoad !== "undefined" && $.isFunction(pageOnPreLoad)){
		     	SCFUtils.ajax(options);
			}else{
				orginalPaqgeOnLoad(data);
			}
		}else{//next
			var options = {
					url:data.url||SCFUtils.QUERYURL,
					data:data.data||{},
					callBackFun:function(data){
						if(typeof pageOnFPLoad !== "undefined" && $.isFunction(pageOnFPLoad)){
							return pageOnFPLoad(data);
						}
						return SCFUtils.emptyFn();
					}
			};	
			if(typeof pageOnFPLoad !== "undefined" && $.isFunction(pageOnFPLoad)){
		     	SCFUtils.ajax(options);
			}else{
				orginalPaqgeOnLoad(data);
			}
		}
	}
}

function processRollBackPage(data){
	
}

function processPendingPage(data){
	if(SCFUtils.OPTSTATUS ==='RS'){
		var options = {
				url:data.url||SCFUtils.QUERYURL,
				data:data.data||{},
				callBackFun:function(data){
					if(typeof pageOnResultLoad !== "undefined" && $.isFunction(pageOnResultLoad)){
						return pageOnResultLoad(data);
					}
					return SCFUtils.emptyFn();
				}
		};	
		if(typeof pageOnResultLoad !== "undefined" && $.isFunction(pageOnResultLoad)){
	     	SCFUtils.ajax(options);
		}else{
			orginalPaqgeOnLoad(data);
		}
	}else{
		if(SCFUtils.REQPAGETYPE==='PRE'){
			var options = {
					url:data.url||SCFUtils.QUERYURL,
					data:data.data||{},
					callBackFun:function(data){
						if(typeof pageOnPreLoad !== "undefined" && $.isFunction(pageOnPreLoad)){
							return pageOnPreLoad(data);
						}
						return SCFUtils.emptyFn();
					}
			};	
			if(typeof pageOnPreLoad !== "undefined" && $.isFunction(pageOnPreLoad)){
		     	SCFUtils.ajax(options);
			}else{
				orginalPaqgeOnLoad(data);
			}
		}else{//next
			var options = {
					url:data.url||SCFUtils.QUERYURL,
					data:data.data||{},
					callBackFun:function(data){
						if(typeof pageOnLoad !== "undefined" && $.isFunction(pageOnLoad)){
							return pageOnLoad(data);
						}
						return SCFUtils.emptyFn();
					}
			};	
			if(typeof pageOnLoad !== "undefined" && $.isFunction(pageOnLoad)){
		     	SCFUtils.ajax(options);
			}else{
				orginalPaqgeOnLoad(data);
			}
		}
	}
}

function processResultPage(){
	var options = {
			url:data.url||SCFUtils.QUERYURL,
			data:data.data||{},
			callBackFun:function(data){
				if(typeof pageOnReleaseResultLoad !== "undefined" && $.isFunction(pageOnReleaseResultLoad)){
					return pageOnReleaseResultLoad(data);
				}
				return SCFUtils.emptyFn();
			}
	};	
	if(typeof pageOnReleaseResultLoad !== "undefined" && $.isFunction(pageOnReleaseResultLoad)){
     	SCFUtils.ajax(options);
	}else{
		orginalPaqgeOnLoad(data);
	}
}

function processBussiReleasePage(data){
	if(SCFUtils.REQPAGETYPE==='PRE'){
		var options = {
				url:data.url||SCFUtils.QUERYURL,
				data:data.data||{},
				callBackFun:function(data){
					if(typeof pageOnReleasePreLoad !== "undefined" && $.isFunction(pageOnReleasePreLoad)){
						return pageOnReleasePreLoad(data);
					}
					return SCFUtils.emptyFn();
				}
		};	
		if(typeof pageOnReleasePreLoad !== "undefined" && $.isFunction(pageOnReleasePreLoad)){
	     	SCFUtils.ajax(options);
		}else{
			orginalPaqgeOnLoad(data);
		}
	}else{//next
		var options = {
				url:data.url||SCFUtils.QUERYURL,
				data:data.data||{},
				callBackFun:function(data){
					if(typeof pageOnReleasePageLoad !== "undefined" && $.isFunction(pageOnReleasePageLoad)){
						return pageOnReleasePageLoad(data);
					}
					return SCFUtils.emptyFn();
				}
		};	
		if(typeof pageOnReleasePageLoad !== "undefined" && $.isFunction(pageOnReleasePageLoad)){
	     	SCFUtils.ajax(options);
		}else{
			orginalPaqgeOnLoad(data);
		}
	}
}

function orginalPaqgeOnLoad(data){
	var options = {
			url:data.url||SCFUtils.QUERYURL,
			data:data.data||{},
			callBackFun:function(data){
				if(typeof pageOnLoad !== "undefined" && $.isFunction(pageOnLoad)){
					return pageOnLoad(data);
				}
				return SCFUtils.emptyFn();
			}
	};	
	if(typeof pageOnLoad !== "undefined" && $.isFunction(pageOnLoad)){
     	SCFUtils.ajax(options);
	}
}

/**
 * 初始化页面按钮：默认有主页、登出系统、取消。当页面类型为增、改、删、查时分别有保存、删除、查询等按钮。
 * 如需自定义按钮，则在自己页面中重写initToolBar方法。返回showButton数组即可。
 */
 SCFUtils.initBar = function(){
	if (typeof ignoreToolBar !== "undefined" && $.isFunction(ignoreToolBar)) {
		return;
	}
	var showButton = ['cancel'];
	if(SCFUtils.CURRENTPAGE>0){
		showButton.push('prev');
	}
	if(SCFUtils.CURRENTPAGE<SCFUtils.TOTALPAGE-1){
		if('APPROVE'===SCFUtils.OPTSTATUS){
			showButton.push('appr');	
		}else{
			showButton.push('next');
		}
	}else{		
		if(SCFUtils.FUNCTYPE !="VW")
			showButton.push('submit');
	}
	
	if(typeof appendToolBar !== "undefined" && $.isFunction(appendToolBar)){	
		var custToolbar = appendToolBar();
		if(!SCFUtils.isEmpty(custToolbar)){
			showButton = $.unique($.merge(showButton,custToolbar));
		}
	}
		
	if(typeof initToolBar !== "undefined" && $.isFunction(initToolBar)){	
		showButton = initToolBar();
	}
	var tlbarConfigs = {
			showButton:showButton,
			isShowText:true
	};
	SCFUtils.getToolBar(tlbarConfigs);	
};

/**
 * 初始化页面 温馨提示内容
 * <div class="fL blockAreaNotice red" id="blockAreaNotice">
 *	<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
 *  <p class="blockAreaNoticeTxt" id="blockAreaNoticeTxt"></p>  
 *</div>
 */
SCFUtils.initNotice = function(){
	if (typeof initNotice !== "undefined" && $.isFunction(initNotice)) {		
		var blockAreaFooter = $('#blockAreaFooter',parent.document);
		var blockAreaNotice = $('<div class="fL blockAreaNotice red" id="blockAreaNotice"></div>');		
		blockAreaNotice.appendTo(blockAreaFooter);				
		var noticeTxt = initNotice();
		if(!SCFUtils.isEmpty(noticeTxt)){
			$('<p class="blockAreaNoticeTitle fWb">温馨提示：</p>').appendTo(blockAreaNotice);
			var blockAreaNoticeTxt = $('<p class="blockAreaNoticeTxt" id="blockAreaNoticeTxt"></p>').appendTo(blockAreaNotice);
			blockAreaNoticeTxt.html(noticeTxt);	
			blockAreaFooter.addClass("noticeB");
		}
	}
};