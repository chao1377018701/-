$(function () {
    $('#login-btn').on('tap', function () {
        var username = $("[name='username']").val().trim();
        var password = $("[name='password']").val().trim();
        if (!username) {
            mui.toast('请输入用户名');
            return;
        }
        if (!password) {
            mui.toast('请输入密码');
            return;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {
                $('#login-btn').html('正在登陆...');
            },
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    mui.toast('登陆成功');
                    setTimeout(function () {
                        location.href = "user.html";
                    }, 2000)
                }
            }
        })
    })
})