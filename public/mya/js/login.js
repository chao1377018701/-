
//在页面加载前直接同步判断是否处于登录状态,登录状态下无法进入
$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res){
		if(res.success){
			location.href = "user.html";
		}	
	}
});
$(function(){
    $('#login-button').on('click',function(){
        var userName=$.trim($("[name='userName']").val());
        var passWord = $.trim($("[name='passWord']").val());
        if(!userName){
            alert("请输入用户名");
			return;
        }
        if(!passWord){
            alert("请输入密码");
			return;
        }
        $.ajax({
            url: '/employee/employeeLogin',
			type: 'post',
			data: {
				username: userName,
				password: passWord
            },
            success:function(res){
                if(res.success){
                    location.href = "user.html";
                }else {
					alert(res.message);
				}
            }
        })
    })
})