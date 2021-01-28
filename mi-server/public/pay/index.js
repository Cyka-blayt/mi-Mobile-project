var num = location.search.slice(8)
console.log(num)
// 获取订单金额
$.myajax ({
    url: `/order/account/${num}`,
    success: function(data) {
        console.log(data)
        $('.show-price span').text(data);
        $('.pay-btn').text('确认支付￥' + data + '.00');
    }
})
// 返回
$('.icon-back').click(function() {
    layer.open({
        content: '确认离开'
        ,btn: ['确认离开', '继续支付']
        ,skin: 'footer'
        ,yes: function(index){
          window.location.replace('/me/index.html')
        }
    });
})

// 选择支付方式
$('.mode').click(function() {
    if ($('.right').eq($(this).index()).hasClass('show')) return;
    $('.pay-mode .right').removeClass('show');
    $('.right').eq($(this).index()).addClass('show');
})

// 确认支付
$('.pay-btn').on('click',function() {
    $.myajax ({
        url: `/order/pay/${num}`,
        success: data => {
            layer.open({
                content: '支付成功'
                ,btn: '确认'
                ,yes: function() {
                    window.location.replace('/my-order/index.html')
                }
            });
            
        }
    })
})