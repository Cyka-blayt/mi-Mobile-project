$('.name').blur(function () {
    var re = /\W/ig;
    var name = $(this).val();
    if (re.test(name)) {
        $(this).siblings('.tips').text('*非法字符*');
        $(this).siblings('.tips').css({
            'color': 'red',
        })
    } else if (name.length < 3 || name.length > 10) {
        $(this).siblings('.tips').text('*用户名过长或过短*');
        $(this).siblings('.tips').css({
            'color': 'red',
        })
    } else {
        $.myajax ({
            url: `/user/check_name/${name}`,
            success: data => {
                console.log(data)
                if (data !== 0) {
                    $(this).siblings('.tips').text('*用户名已存在*');
                    $(this).siblings('.tips').css({
                        'color': 'red',
                    })
                } else {
                    $(this).siblings('.tips').text('*用户名可以使用*');
                    $(this).siblings('.tips').css({
                        'color': 'green',
                    })
                }
            }
        })
    }
      
})
$('.phone').blur(function() {
    var phone = $(this).val();
    var re = /^1\d{10}$/;
    if (re.test(phone) === false) {
        $(this).siblings('.tips').text('*手机号码格式不正确*');
        $(this).siblings('.tips').css({
            'color': 'red',
        })
    } else {
        $.myajax ({
            url: `/user/check_phone/${phone}`,
            success: data => {
                if (data !== 0) {
                    $(this).siblings('.tips').text('*手机号码已被注册*');
                    $(this).siblings('.tips').css({
                        'color': 'red',
                    })
                } else {
                    $(this).siblings('.tips').text('*手机号码可以使用*');
                    $(this).siblings('.tips').css({
                        'color': 'green',
                    })
                }
            }
        })
    }
})
$('.pwd').blur(function() {
    if ($(this).val().length < 3 || $(this).val().length > 12) {
        $(this).siblings('.tips').text('*密码长度过长或过短*');
        $(this).siblings('.tips').css({
            'color': 'red',
        })
    } else {
        $(this).siblings('.tips').text('*密码格式正确*');
        $(this).siblings('.tips').css({
            'color': 'green',
        })
    }
})

var fuck = 0;
$('.submit').on('click',function() {
    fuck++;
    var re = /\W/ig;
    var name = $('.name').val();
    if (fuck > 5) {
        layer.open({
            content: '点尼玛呢！看不到提示嘛！'
            ,btn: '我错了'
        });
    } else {
        if (re.test(name)) {
            layer.open({
                content: '用户名为非法字符'
                ,btn: '我知道了'
            });
            return;
        } else if (name.length < 3 || name.length > 10) {
            layer.open({
                content: '用户名长度过长或过短'
                ,btn: '我知道了'
            });
            return;
        } else {
            $.myajax ({
                url: `/user/check_name/${name}`,
                success: data => {
                    console.log(data)
                    if (data !== 0) {
                        layer.open({
                            content: '用户名已存在'
                            ,btn: '我知道了'
                        });
                        return;
                    } else {
                        if ($('.pwd').val().length < 3 || $('.pwd').val().length > 12) {
                            layer.open({
                                content: '密码长度过长或过短'
                                ,btn: '我知道了'
                            });
                            return;
                        } else {
                            var phone = $('.phone').val();
                            var re1 = /^1\d{10}$/;
                            if (re1.test(phone) === false) {
                                layer.open({
                                    content: '手机号码格式不正确'
                                    ,btn: '我知道了'
                                });
                                return
                            } else {
                                $.myajax ({
                                    url: `/user/check_phone/${phone}`,
                                    success: data => {
                                        if (data !== 0) {
                                            layer.open({
                                                content: '手机号码已被注册'
                                                ,btn: '我知道了'
                                            });
                                            return
                                        } else {
                                            $.myajax ({
                                                url: '/user/register',
                                                type: 'post',
                                                data: {
                                                    name: $('.name').val().trim(),
                                                    pwd: $('.pwd').val(),
                                                    phone: $('.phone').val().trim()
                                                },
                                                success: data => {
                                                    window.location.replace('/login/index.html')
                                                }
                                            })
                                        }
                                    }
                                })
                            }                        
                        }
                    }
                }
            })
        }
    }
    
})

$('.back').on('click',function() {
    window.location.assign('/login/index.html')
})