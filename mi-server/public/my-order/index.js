var url = '/order/list_all';

$('.all').on('click',function() {
    if ($(this).hasClass('active')) return;
    url = '/order/list_all';
    $(this).addClass('active').siblings('.active').removeClass('active');
    $('.order-state').empty();
    run();
})
$('.no-paid').on('click',function() {
    if ($(this).hasClass('active')) return;
    url = '/order/list_unpay';
    $(this).addClass('active').siblings('.active').removeClass('active');
    $('.order-state').empty();
    run();
})
$('.paid').on('click',function() {
    if ($(this).hasClass('active')) return;
    url = '/order/list_pay';
    $(this).addClass('active').siblings('.active').removeClass('active');
    $('.order-state').empty();
    run();
})
function run() {
    $.myajax ({
        url: url,
        success: function (data) {
            console.log(data.reverse());
            data.reverse().forEach(function(item,index) {
                $(`
                    <div class="container" data-number=${item.orderId}>
                        <div class="mi-title">
                            <div class="left">
                                <i class="iconfont icon-xiaomi"></i>
                                <span>小米自营</span>
                            </div>
                            <div class="right"></div>
                        </div>

                        <div class="all-information">
                            <span class="all-count">共${item.details.length}件商品，</span>
                            <span class="all-price">总金额￥${item.account}.00</span>
                        </div>
                        <div class="order-footer">
                            <span class="remove">删除订单</span>
                            <div class="btn"></div>
                        </div>
                    </div>
                `).appendTo('.order-state');
                item.details.forEach(function(items) {
                    $(`
                        <div class="goods-content">
                            <div class="avatar">
                                <img src=${items.avatar} width="100%">   
                            </div>
                            <div class="goods-name">${items.name}</div>
                            <div class="other">
                                <div class="goods-price">￥${items.price}.00</div>
                                <div class="goods-count">x ${items.count}</div>
                            </div>
                        </div>
                    `).insertBefore($('.all-information').eq(index));
                })
                // 判断
                if (item.pay === 0) {
                    $('.mi-title .right').eq(index).text('待付款');
                    $('.btn').eq(index).text('去付款');
                } else {
                    $('.mi-title .right').eq(index).text('已付款');
                    $('.btn').eq(index).text('再次购买');
                }
                $('.btn').eq(index).click(function() {
                    if (item.pay === 0) {
                        var number = $(this).closest('.container')[0].dataset.number;
                        window.location.assign(`/pay/index.html?number=${number}`)
                    } else {
                        window.location.assign('/category/index.html')
                    }
                })
                // 删除订单功能
                $('.remove').click(function() {
                    var number = $(this).closest('.container')[0].dataset.number;
                    $.myajax ({
                        url: `/order/remove/${number}`,
                        success: data => {
                            layer.open({
                                content: '删除成功'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $(this).closest('.container').remove(); 
                        }
                    })
                })
            })
            // 跳转详情
            $('.goods-content').on('click',function() {
                var number = $(this).closest('.container')[0].dataset.number;
                window.location.assign(`/order-detail/index.html?number=${number}`)
            })
        }
    })
}
run();

// 返回个人页面
$('.header .left').on('click',function() {
    window.location.assign('/me/index.html')
})

