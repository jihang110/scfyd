
function testSubmit(){
	var data = CloudUtils.convertStringJson('buttonsTest');
	alert(data);
//    Refresh();
	 $("#myModalLabel").text("新增");
     $('#myModal').modal();
	/****
	 * ajax 处理data 后发送submajax请求。
	 */
}
