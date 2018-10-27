var userInfo=null;//用来保存用户的信息
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    //设置成同步
    async:false,
    success:function(res){
        // console.log(res);
        if(res.error && res.error==400){
            location.href='login.html';//未登录时跳转到登录页面
        }
        userInfo=res;
    }
})


$(function(){
//退出登录操作
    $('#logout').on('tap',function(){
        // console.log(123)
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function(res){
                if(res.success){
                    mui.toast('退出登录成功');
                    setTimeout(
                    function(){
                        location.href = "index.html";
                    },2000);

                }
            }
        })
    })

    //登录状态下渲染页面来展示用户信息
    var html=template('userTpl',userInfo);
    $('#userInfoBox').html(html);
})
