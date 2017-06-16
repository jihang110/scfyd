/** 
 * 供应链前端公共js
 * @author chenyk
 * @date:  2016-08-18 
 */
(function ($){
	
	/**
	 * 添加serializeAll 打包disable属性表单。
	 */
    $.fn.serializeAll = function () {
        var data = $(this).serializeArray();

        $(':disabled[name]', this).each(function () { 
            data.push({ name: this.name, value: $(this).val() });
        });

        return data;
      }
	
	
    //全局系统对象
    //var visit_history = [];
    window['CloudUtils'] = {};
    //Web工程根目录
    CloudUtils.ROOTURL = "/scfyd";
	/**
	 * 针对add，sub，mul，div sub 进行二次封装，支持任意多数值加减乘除运算，
	 * 
	 * @param strArr
	 *            传入格式为var strArr = "1,2,3,5,5,6";
	 * @param strArrOperator
	 *            传入格式为 var strArrOperator ="add,sub,mul,div,add";
	 *            运算顺序为：1add2sub3mul5div5add6
	 *                    1+2-3*5/5+6=6;
	 *            运算符 'add'|'sub'|'mul'|'div' 对应‘加减乘除’
	 * @returns 运算结果
	 */
    CloudUtils.MathArray=function (strArr,strArrOperator){
    	 
    	 var arr = strArr.split(",");
    	 var arrOperator=strArrOperator.split(",");
    	 var m,n;
    	 var arrayObj = new Array([arr.length]);
    	 for(var i=0;i<arr.length;i++){
    		 arrayObj[i]=CloudUtils.isEmpty(arr[i])?0:arr[i];
    	 }
    	 var rObj=new Array([arr.length-1]);
    	 var mulObj=new Array([arr.length-1]);
    	 for(var i=0;i<arr.length;i++){
    		 try{
    			 rObj[i] = arrayObj[i].toString().split(".")[1].length;
    			}catch(e){
    			 rObj[i] = 0;
    			}
    	 }
    	 for(var i=0;i<arrOperator.length;i++){
    		 if("mul"===arrOperator[i]){//浮点数乘法运算
    				m = 0;
    				mulObj[i] = arrayObj[i];
    				mulObj[i+1] = arrayObj[i+1];
    				try {
    					m += mulObj[i].split(".")[1].length;
    				} catch (e) {
    				}
    				try {
    					m += mulObj[i+1].split(".")[1].length;
    				} catch (e) {
    				}
    				var mulSub= Number(mulObj[i].replace(".", "")) * Number(mulObj[i+1].replace(".", ""))/ Math.pow(10, m);
    				arrayObj.splice(i,2);
    				arrOperator.splice(i,1);
    				arrayObj.splice(i,0,mulSub);
    				if(arrOperator.length==1){
    					i=-1
    				}else{
    					i=0
    				}
    			}
    		if("div"===arrOperator[i]){//浮点数除法运算
    				with(Math){
    					m = Number(arrayObj[i].toString().replace(".", ""));
    					n = Number(arrayObj[i+1].toString().replace(".", ""));
    					divSub= (m/n)*pow(10,rObj[i+1]-rObj[i]);
    					arrayObj.splice(i,2);
    					arrOperator.splice(i,1);
    					arrayObj.splice(i,0,divSub);
    					if(arrOperator.length==1){
    						i=-1
    					}else{
    						i=0
    					}
    				}
    			}
    		 
    		 
    	 }
    	 for(var i=0;i<=arrOperator.length;i++){
    			if("add"===arrOperator[i]){//浮点数加法运算
    				m = Math.pow(10,Math.max(rObj[i],rObj[i+1]));
    				var addSub=(arrayObj[i]*m+arrayObj[i+1]*m)/m;
    				arrayObj.splice(i,2);
    				arrOperator.splice(i,1);
    				arrayObj.splice(i,0,addSub);
    				if(arrOperator.length==1){
    					i=-1
    				}else{
    					i=0
    				}
    				
    			}
    			if("sub"===arrOperator[i]){//浮点数减法运算
    				m = Math.pow(10,Math.max(rObj[i],rObj[i+1]));
    				// 动态控制精度长度
    				n = (rObj[i] >= rObj[i+1]) ? rObj[i] : rObj[i+1];
    				var sub= ((arrayObj[i] * m - arrayObj[i+1] * m) / m).toFixed(n);
    				arrayObj.splice(i,2);
    				arrOperator.splice(i,1);
    				arrayObj.splice(i,0,sub);
    				if(arrOperator.length==1){
    					i=-1
    				}else{
    					i=0
    				}
    			}
    	 }
    	 return arrayObj.toString();
    	 
    }
    /**
     * 返回数字或非数字中最大的数字
     */
    CloudUtils.maxNumber=function(a,b){
    	
    	if(isNaN(a)&&isNaN(b)){
    		return 0;
    	}else if(!isNaN(a)&&!isNaN(b)){
    		return Math.max(a,b);
    	}else{
    		return isNaN(a)?b:a;
    	}
    }
    /**
     * 返回数字或非数字中最小的数字
     */
    CloudUtils.minNumber=function(a,b){
    	
    	if(isNaN(a)&&isNaN(b)){
    		return 0;
    	}else if(!isNaN(a)&&!isNaN(b)){
    		return Math.min(a,b);
    	}else{
    		return isNaN(a)?b:a;
    	}
    }
    /**
     * 共同ajax调用
     * @param config 是一个自定义对象属性有
     * config.data:提交参数信息
     * config.url:请交路径
     * config.callBackFun:回调函数
     * config.async : true|false 默认为false，是同步模式，true 表示异步加载
     */
    CloudUtils.ajax = function(config){
    	var btn = config.btn;
    	if(config.url){    		
    		config.url+=(config.url.indexOf("?")!=-1?"&":"?")+"_dc="+$.now();
    	}
		$.ajax($.extend({
			async : config.async||false,
			cache:false,
			type: "POST",
			dataType:"json",
			contentType: "application/json",
			timeout:300000,
			url : "",
			data : {},				
			success:function(data){
				//如果失败显示失败信息
    	   		if(!CloudUtils.isEmpty(data)&&data.result==6){
   	 	    		 store.clear();
   	 	    		window.top.location.href=CloudUtils.ROOTURL+"/login.html";
    	   		}
				var fn = function(data){
				};
				if(config.callBackFun){//如果有回调函数
					fn =  function(rs){
	   					config.callBackFun(rs);
	    	   		};
				}
				fn(data);
			},
			error : function(r, m, d) {// 请求失败处理函数
				if (config.errorCallback && config.errorCallback !== null) {
					config.errorCallback(r,m,d);
				} else {
					CloudUtils.ajaxError(r, m, d);
				}
			}
		},config));
    };
    
    /**
     * Ajax 调用失败时的处理
     * @param r
     * @param m
     * @param d
     */
    CloudUtils.ajaxError = function(r, m, d)
    { 
       if(r.readyState==4 && r.status == 200){
    	   alert("向服务器发送请求失败，失败的原因是:<br>" + d.message);
       }
       else {
    	   alert("向服务器发送请求无响应！" );
       }
    };
    
    //表单加载json对象数据
    CloudUtils.setForm=function (jsonValue,form) {
    	var obj = $("#"+form);
        $.each(jsonValue, function (name, ival) {
            var $oinput = obj.find("input[name=" + name + "]");
            if ($oinput.attr("type") == "checkbox") {
                if (ival !== null) {
                    var checkboxObj = obj.find("[name=" + name + "]");
                    var checkArray = ival.split(";");
                    for (var i = 0; i < checkboxObj.length; i++) {
                        for (var j = 0; j < checkArray.length; j++) {
                            if (checkboxObj[i].value == checkArray[j]) {
                                checkboxObj[i].click();
                            }
                        }
                    }
                }
            }
            else if ($oinput.attr("type") == "radio") {
                $oinput.each(function () {
                    var radioObj = obj.find("[name=" + name + "]");
                    for (var i = 0; i < radioObj.length; i++) {
                        if (radioObj[i].value == ival) {
                            radioObj[i].click();
                        }
                    }
                });
            }
            else if ($oinput.attr("type") == "textarea") {
                obj.find("[name=" + name + "]").html(ival);
            }
            else {
                obj.find("[name=" + name + "]").val(ival);
            }
        })
    }
    /**
	 * 格式化金额 <code>
	 * 	var a = -40000.2356;
	 *  var b = CloudUtils.ccyFormat(a,2);
	 *  b:-40,000.24;
	 * </code>
	 * 
	 * @param vstr
	 *            数值
	 * @param sacle
	 *            小数点位数
	 * @returns 格式化后的金额
	 */
	CloudUtils.ccyFormatNoPre = function(vstr, sacle) {
		var value = vstr;
		value = value + "";
		if (value === null || value === '') {
			return '';
		}

		if (value.length > 1) {
			if ('-' != value.substring(0, 1)
					&& isNaN(parseInt(value.substring(0, 1)))) {
				return value;
			}
		}
		sacle = isNaN(sacle) ? 2 : parseInt(sacle);

		var point = sacle == 0 ? "" : ".";
		for (var i = 0; i < sacle; i += 1) {
			point = point + "0";
		}
		value = (Math.round((value - 0) * 100)) / 100;
		value = (value == Math.floor(value)) ? value + point
				: ((value * 10 == Math.floor(value * 10)) ? value + "0" : value);
		value = String(value);
		var ps = value.split('.');
		var whole = ps[0];
		var sub = ps[1] ? '.' + ps[1] : point;
		var r = /(\d+)(\d{3})/;
		while (r.test(whole)) {
			whole = whole.replace(r, '$1' + ',' + '$2');
		}
		value = whole + sub;
		if (value.charAt(0) == '-') {
			return value.substr(1); // 正常
		}

		return value;
	};

	/**
	 * 将按币种格式化化的金额反格式化为数值 <code>
	 * 	var b = '￥-40,000.24';
	 * 	var c = CloudUtils.deformatCcy(b);
	 *  c:-40000.24
	 * </code>
	 * 
	 * @param s
	 *            按币种格式化化的金额
	 * @returns 数值
	 */
	CloudUtils.deformatCcy = function(s) {
		var str = CloudUtils.isEmpty(s) ? "" : s.toString().replace(/[^-.0-9]/g,
				'');
		if (str == "" || isNaN(str)) {
			return "";
		}
		// 负号移动到最左边
		if (str.indexOf("-") > 0) {
			str = "-" + str.replace("-", "");
		}
		return Number(str);
	};
    
    //表单加载json对象数据避免click
    CloudUtils.setFormNoClick=function (jsonValue,form) {
    	var obj = $("#"+form);
        $.each(jsonValue, function (name, ival) {
            var $oinput = obj.find("input[name=" + name + "]");
            if ($oinput.attr("type") == "checkbox") {
                if (ival !== null) {
                    var checkboxObj = obj.find("[name=" + name + "]");
                    var checkArray = ival.split(";");
                    for (var i = 0; i < checkboxObj.length; i++) {
                        for (var j = 0; j < checkArray.length; j++) {
                            if (checkboxObj[i].value == checkArray[j]) {
                                checkboxObj[i].checked = true;
                            }
                        }
                    }
                }
            }
            else if ($oinput.attr("type") == "radio") {
                $oinput.each(function () {
                    var radioObj = obj.find("[name=" + name + "]");
                    for (var i = 0; i < radioObj.length; i++) {
                        if (radioObj[i].value == ival) {
                            radioObj[i].checked = true;
                        }
                    }
                });
            }
            else if ($oinput.attr("type") == "textarea") {
                obj.find("[name=" + name + "]").html(ival);
            }
            else {
                obj.find("[name=" + name + "]").val(ival);
            }
        })
    }
    
    CloudUtils.options = {
			url : CloudUtils.ROOTURL+'/user/getSession',
			data : '{}',
			callBackFun : function(data) {},
			errorCallback:function(data){
				alert("error");
			}
	};
	
	/**
	 * 浮点数的四则运算 var a = -40.051;var b = 2; CloudUtils.Math(a,b,'add') = -38.051;
	 * a+b CloudUtils.Math(a,b,'sub') = -42.051; a-b CloudUtils.Math(a,b,'mul') =
	 * -80.102; a*b CloudUtils.Math(a,b,'div') = -20.0255; a/b
	 * 
	 * @param arg1
	 *            数值1
	 * @param arg2
	 *            数值2
	 * @param operator
	 *            运算符 'add'|'sub'|'mul'|'div' 对应‘加减乘除’
	 * @returns 运算结果
	 */
    CloudUtils.Math = function(arg1,arg2,operator){
    	arg1 = CloudUtils.isEmpty(arg1)?0:arg1;
    	arg2 = CloudUtils.isEmpty(arg2)?0:arg2;   	
    	var r1,r2,m,n;
    	try{
    		r1 = arg1.toString().split(".")[1].length;
    	}catch(e){
    		r1 = 0;
    	}
    	try{
    		r2 = arg2.toString().split(".")[1].length;
    	}catch(e){
    		r2 = 0;
    	}
    	if(CloudUtils.isEmpty(operator)){
    		return ;
    	}
    	if("add"===operator){//浮点数加法运算
    		m = Math.pow(10,Math.max(r1,r2));
    		return (arg1*m+arg2*m)/m;
    	}
    	if("sub"===operator){//浮点数减法运算
    		m = Math.pow(10,Math.max(r1,r2));
    		// 动态控制精度长度
			n = (r1 >= r2) ? r1 : r2;
			return ((arg1 * m - arg2 * m) / m).toFixed(n);
    	}
    	if("mul"===operator){//浮点数乘法运算
    		m = 0, r1 = arg1.toString(), r2 = arg2.toString();
    		try {
				m += r1.split(".")[1].length;
			} catch (e) {
			}
			try {
				m += r2.split(".")[1].length;
			} catch (e) {
			}
    		return Number(r1.replace(".", "")) * Number(r2.replace(".", ""))
			/ Math.pow(10, m);
    	}
    	if("div"===operator){//浮点数除法运算
    		with(Math){
    			m = Number(arg1.toString().replace(".", ""));
    			n = Number(arg2.toString().replace(".", ""));
    			return (m/n)*pow(10,r2-r1);
    		}
    	}
    };
    /**
     * 判断是否为空
     */	
    CloudUtils.isEmpty = function(value, allowEmptyString) {
    	return (value === null) || (value === undefined) 
    			|| (!allowEmptyString ? value === '' : false) 
    			|| ($.isArray(value) && value.length === 0);
	};
	
	/**
	 * 打包，包含disable属性的表单
	 */

    CloudUtils.convertAllJson = function(form) { 
		var v = null;	 
			v={};
			var o = $("#"+form).serializeAll();
			for ( var i in o) {
				if(!o[i].name){
					//忽略length属性
					continue;
				}
				if (typeof (v[o[i].name]) == 'undefined')
					//v[o[i].name] = o[i].value;
						//对password加密
					if ("password" == o[i].name || "newPwd" == o[i].name || "enterPwd" == o[i].name) {
						v[o[i].name] = hex_md5(o[i].value);
					}
					else {
						v[o[i].name] = o[i].value;				
					}
				else
					v[o[i].name] += "," + o[i].value;
			}
		return JSON.stringify(v);
	};
	
	
	
	/**
	 * 打包form表单数据并将json数据转换为String
	 */
    CloudUtils.convertStringJson = function(form) { 
		var v = null;	 
			v={};
			var o = $("#"+form).serializeArray();
			for ( var i in o) {
				if(!o[i].name){
					//忽略length属性
					continue;
				}
				if (typeof (v[o[i].name]) == 'undefined')
					//v[o[i].name] = o[i].value;
						//对password加密
					if ("password" == o[i].name || "newPwd" == o[i].name || "enterPwd" == o[i].name) {
						v[o[i].name] = hex_md5(o[i].value);
					}
					else {
						v[o[i].name] = o[i].value;				
					}
				else
					v[o[i].name] += "," + o[i].value;
			}
		return JSON.stringify(v);
	};
	
	/**
	 *1、 打包form表单数据并json数据转换为String
	 *2、 集成jqueryValidate表单校验需要引入jquery.validate.min.js
	 */
    CloudUtils.convertStringAndValid = function(form) {
    	if( $("#"+form).valid()){
    		var v={};
    		var o = $("#"+form).serializeArray();
    		for ( var i in o) {
    			if(!o[i].name){
    				//忽略length属性
    				continue;
    			}
    			if (typeof (v[o[i].name]) == 'undefined'){
    				
    				if ("password" == o[i].name || "newPwd" == o[i].name || "enterPwd" == o[i].name) {
    					v[o[i].name] = hex_md5(o[i].value);
    				}
    				else {
    					v[o[i].name] = o[i].value;				
    				}				
    			}else{
    				v[o[i].name] += "," + o[i].value;
    			}
    		}
    		return JSON.stringify(v);
    	}else{
    		return null;
    	}
	};
  
  
	/**
	 * 计算指两个日期差值
	 * @param Bdate  前一日期，格式为“yyyy-MM-dd”
	 * @param Fdate  后一日期，格式为“yyyy-MM-dd”
	 * @returns
	 */
	CloudUtils.DateDiffSec = function(Bdate, Fdate) {
		var day = 24 * 60 * 60 * 1000;
		try {
			var dataArray = Bdate.split("-");
			var checkDate = new Date();
			checkDate.setFullYear(dataArray[0], dataArray[1] - 1, dataArray[2]);
			var checkTime = checkDate.getTime();

			var dateArray2 = Fdate.split("-");
			var checkDate2 = new Date();
			checkDate2.setFullYear(dateArray2[0], dateArray2[1] - 1,
					dateArray2[2]);
			var checkTime2 = checkDate2.getTime();

			var cha = (checkTime - checkTime2) / day;
			return Math.ceil(cha);
		} catch (e) {
			return false;
		}
	};
	
	
/*	CloudUtils.setIframeHeight=function (body) {
		var iframe=$('#mainFrame');
		var contentHeight= $(window).height()-$("#titleLogo").height()-85;
		alert("111111111111="+contentHeight);
		var mainheight = iframe.contents().find("body").height()+30;
		 alert("mainheight=="+mainheight)
		    iframe.height(mainheight); 
		 
		var iframeHeight = body.contents().find(".main-content-child").height();
//		var mainheight = body.scrollHeight()+30;
		 alert("iframeHeight=="+iframeHeight);
		 var main = $(window.parent.document).find("#mainFrame");
		 alert("main=="+main.height())
		 var thisheight = document.body.scrollHeight+30;
		 alert("thisheight=="+thisheight)
		 main.height(thisheight);
		if (iframe) {
			if (typeof(iframe.contentWindow) == "undefined") { 
				   return false;
				}
				var iframeWin = iframe.contentWindow||(typeof(iframe.contentDocument.parentWindow)== "undefined"?false:iframe.contentDocument.parentWindow);
			if (iframeWin.document.body) {
				alert("maxScrollHeight"+CloudUtils.maxNumber(iframeWin.document.documentElement.scrollHeight , iframeWin.document.body.scrollHeight))
			iframe.height =CloudUtils.maxNumber( CloudUtils.maxNumber(iframeWin.document.documentElement.scrollHeight , iframeWin.document.body.scrollHeight),contentHeight);
				}
			}
		
		};*/
	/**
	 * 获取当前日期,格式为YYYY-MM-DD
	 */
	CloudUtils.getcurrentdate = function() {
		var curr_date = new Date();
		var month = (curr_date.getMonth() + 1);
		if (eval(month) < 10) {
			month = 0 + "" + month;
		}
		var day = curr_date.getDate();
		if (eval(day) < 10) {
			day = 0 + "" + day;
		}
		return curr_date.getFullYear() + "-" + month + "-" + day;
	};
	
	/**
	 * 勾选树形结构的复选框，需要有treeview插件
	 * @param 树的id值
	 * @param sessionJson  需要勾选的josn
	 * @param ajaxJson  需要展现的整个树
	 * @returns
	 */
	CloudUtils.checkByJson = function(tree,sessionJson,ajaxJson) {
		var data2string = JSON.stringify(ajaxJson);
//		var ss= data2string.replace(/[\s\S]*"menuId"/g,'JH');
		var arr = data2string.split('"menuId":');
		arr.splice(0,1);
		for(var i=0;i<arr.length;i++){
			var num = arr[i].indexOf('",');
			arr[i] = arr[i].substring(1,num);
		}
		for(var j=0;j<arr.length;j++){
			var ss = '"menuId":"'+arr[j]+'"';
			var arrlast = sessionJson.split('"menuId":"'+arr[j]+'"');
			var start = arrlast[0].lastIndexOf('"nodeId":')+9;
			var end = arrlast[0].lastIndexOf(',');
			var num = arrlast[0].substring(start,end);
			num = eval('('+ num +')');
			$("#"+tree).treeview('checkNode', [ num, { silent: true } ]);
			//arrlast[0].endwith();
		}
	};
	
	// 方法1 : 将数字金额进行千位分隔
	CloudUtils.formatNumber= function(number) {
		if(typeof(number)!="string"){
			number = number.toString();	
		}
	    number = number.replace(/,/g, "");
	    var digit = number.indexOf("."); // 取得小数点的位置
	    var int = number.substr(0, digit); // 取得小数中的整数部分
	    var i;
	    var mag = new Array();
	    var word;
	    if (number.indexOf(".") == -1) { // 整数时
	        i = number.length; // 整数的个数
	        while (i > 0) {
	            word = number.substring(i, i - 3); // 每隔3位截取一组数字
	            i -= 3;
	            mag.unshift(word); // 分别将截取的数字压入数组
	        }
	        number = mag;
	    } else { // 小数时
	        i = int.length; // 除小数外，整数部分的个数
	        while (i > 0) {
	            word = int.substring(i, i - 3); // 每隔3位截取一组数字
	            i -= 3;
	            mag.unshift(word);
	        }
	        number = mag + number.substring(digit);
	    }
	    return number;
	}

	/**
	 * 计算指两个日期差值
	 * @param s_date 开始日期，格式为“yyyy-MM-dd HH:mi:ss”
	 * @param e_date 结束日期，格式为“yyyy-MM-dd HH:mi:ss”
	 * @returns
	 */
	CloudUtils.dateSub = function(s_date, e_date) {
		var day, hour, min, sec;
		try {
			var startDate = new Date(s_date);
			var startTimes = startDate.getTime();
			var endDate = new Date(e_date);
			var endTimes = endDate.getTime();
			var diff = endTimes - startTimes;

			day = Math.floor(diff / (24 * 60 * 60 * 1000));
			hour = Math.floor(diff / (60 * 60 * 1000) - day * 24);
			min = Math.floor(diff / (60 * 1000) - day * 24 * 60 - hour * 60);
			sec = Math.floor(diff / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);

			return day + "天" + hour + "时" + min + "分" + sec + "秒";
		} catch (e) {
			return '';
		}
	};
	
	/**
	 * 文本框(input)不保存缓存记录
	 */
	CloudUtils.inputCacheClear = function(){
		$("input[type=text]").attr("AUTOCOMPLETE","off");
	}
	
	// 获取iframe的参数
	CloudUtils.getIframeParams = function(url) {
		var regexpParam = /\??([\w\d%]+)=([\w\d%:]*)&?/g; //分离参数的正则表达式
	    var paramMap = {};
	    //开始循环查找url中的参数，并以键值对形式放入结果集
        while((ret = regexpParam.exec(url)) != null) {
        	//ret[1]是参数名，ret[2]是参数值
        	paramMap[ret[1]] = ret[2];
        }
        return paramMap; //返回结果集
	}
	/**
	 * 格式化时间
	 */
	CloudUtils.FormatDate = function(strTime) {
	    var date = new Date(strTime);
	    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	}
	
	/**
	 * 获取tab子页面
	 * url 页面的地址
	 * id 主页面的id
	 */
	CloudUtils.getTab = function(url,id) {
		$.ajax({
			url: url,
			async:false,
			type:'post',
			dataType:'html',
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			success:function(data) {
				$("#"+id).html(data);
			}
		});
	}
	/**
	 * 导航路径
	 * 
	 * 
	 */
	CloudUtils.getMenuNames = function(id){
		var menupathnames = $(window.parent.document).find('iframe').attr('menupathnames');
		var menuArray = eval(menupathnames);
		var nav ='<ol id="breadcrumb" class="breadcrumb">';
		menuArray.forEach(function(e){  
			nav +='<li class="active">'+e+'</li>';
		});
		nav += '</ol>';
		$("#"+id).append(nav);
	}
})(jQuery);


