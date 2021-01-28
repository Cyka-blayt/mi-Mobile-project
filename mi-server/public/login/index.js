$('button.btn-toggle').on('click',function() {
    $('.login-pwd, .login-phone').toggleClass('show');
})
// 手机号登录
$('button.btn-login-phone').on('click',function() {
    layer.open({
        content: '手机号验证暂未开放，请切换用户名密码登录'
        ,btn: '我知道了'
      });
})
$('button.btn-login-pwd').on('click',function() {
    $.ajax({
        url: "/user/login_pwd",
        type: "post",
        //  headers节点用于设置请求头
        headers: {
            "Content-Type": "application/json"
        },
        // 怎么样把用户输入的用户名和密码发给服务器
        data:JSON.stringify(
            {
                name: $('input.name').val().trim(),  // trim()取消字符串两侧空白
                pwd: $('input.pwd').val()
            }
        ),
        success: function(result) {
            if (result.code === 200) {
                sessionStorage.setItem("token",result.data);
                sessionStorage.setItem("name",$('input.name').val().trim());
                window.location.replace('/me/index.html');
            } else {
                alert(result.msg);
            }
        }
    })
})
// 注册
$('.register span').on('click',function() {
    window.location.assign('/register/index.html');
})

// 快乐
console.log(
    `
    %c
    ⣿⣿⣿⣿⣿⣿⢟⣡⣴⣶⣶⣦⣌⡛⠟⣋⣩⣬⣭⣭⡛⢿⣿⣿⣿⣿
    ⣿⣿⣿⣿⠋⢰⣿⣿⠿⣛⣛⣙⣛⠻⢆⢻⣿⠿⠿⠿⣿⡄⠻⣿⣿⣿
    ⣿⣿⣿⠃⢠⣿⣿⣶⣿⣿⡿⠿⢟⣛⣒⠐⠲⣶⡶⠿⠶⠶⠦⠄⠙⢿
    ⣿⠋⣠⠄⣿⣿⣿⠟⡛⢅⣠⡵⡐⠲⣶⣶⣥⡠⣤⣵⠆⠄⠰⣦⣤⡀
    ⠇⣰⣿⣼⣿⣿⣧⣤⡸⢿⣿⡀⠂⠁⣸⣿⣿⣿⣿⣇⠄⠈⢀⣿⣿⠿
    ⣰⣿⣿⣿⣿⣿⣿⣿⣷⣤⣈⣙⠶⢾⠭⢉⣁⣴⢯⣭⣵⣶⠾⠓⢀⣴
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣉⣤⣴⣾⣿⣿⣦⣄⣤⣤⣄⠄⢿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠈⢿
    ⣿⣿⣿⣿⣿⣿⡟⣰⣞⣛⡒⢒⠤⠦⢬⣉⣉⣉⣉⣉⣉⣉⡥⠴⠂⢸
    ⠻⣿⣿⣿⣿⣏⠻⢌⣉⣉⣩⣉⡛⣛⠒⠶⠶⠶⠶⠶⠶⠶⠶⠂⣸⣿
    ⣥⣈⠙⡻⠿⠿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⠿⠛⢉⣠'
    `, `color: green`)
    console.log('%c                         ------来自七夕蛤蟆的祝福："孤寡~"', 'color: hotpink')