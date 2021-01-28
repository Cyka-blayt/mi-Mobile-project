var re = /3000(.+)$/
var prePage = document.referrer.match(re)[1];
console.log(prePage)
// 返回上一页
$('.icon-back').click (function () {
    history.go(-1);
})
// 初始化上一页数据
$('.name').val(sessionStorage.getItem("ress-name"));
$('.phone').val(sessionStorage.getItem("ress-phone"));
$('.region').val(sessionStorage.getItem("ress-region"));
$('.detail').val(sessionStorage.getItem("ress-detail"));
// 删除地址
var id = sessionStorage.getItem("ress-id");
$('.remove').on('click',function() {
    layer.open({
        content: '是否删除'
        ,btn: ['删除', '取消']
        ,skin: 'footer'
        ,yes: function(index){
          $.myajax ({
            url: `/address/remove/${id}`,
            success: function(data) {
                window.location.replace('index.html')
            }
          })
        }
    })    
})
// 判断是否已经为默认地址
if (sessionStorage.getItem('ress-default') === "1") {
    $('.default .circle').css({
        'background':'rgb(207, 63, 59)',
        'border':'none'
    })
    $('.default span').text('默认地址')
}
// 点击设为默认地址
var i = 0;
$('.default').on('click',function() {
    ++i;
    if (i % 2 !== 0) {
        $('.default .circle').css({
            'background':'rgb(207, 63, 59)',
            'border':'none'
        })
        $('.default span').text('默认地址')
        layer.open({
            content: '设为默认地址'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    } else {
        $('.default .circle').css({
            'background':'white',
            'border':'1px solid gray'
        })
        $('.default span').text('设为默认地址')
        layer.open({
            content: '取消默认地址'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    }
})
// 修改地址信息
$('.revise-ress').on('click', $.debouce(function(e) {
    $.ajax ({
        url: "/address/update",
        type: "post",
        headers: {
            "Authorization": sessionStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            id: id,
            receiveName: $('input.name').val().trim(),
            receivePhone: $('input.phone').val().trim(),
            receiveRegion: $('input.region').val(),
            receiveDetail: $('input.detail').val().trim(), 
        }),
        success: function(result) {
            console.log(result)
            if (result.code === 200) {
                window.location.replace(prePage)
            } else {
                alert(result.msg)
            }
        }
    })
    if (i % 2 !== 0) {
        $.ajax ({
            url: `/address/set_default/${id}`,
            type: 'get',
            headers: {
                "Authorization": sessionStorage.getItem('token'),
            },
            success: function(result) {
                if (result.code === 200) {
                    
                } else {
                    layer.open({
                        content: result.msg
                        ,btn: '我知道了'
                      });
                }
                console.log(result)
            }
        })
    }
},3000))
