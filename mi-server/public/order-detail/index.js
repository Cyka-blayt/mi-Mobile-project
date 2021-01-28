var number = location.search.slice(8)
$('span.number').text(number)
$.myajax ({
    url: `/order/list_all`,
    success: function(data) {
        console.log(data);
        var content = data.filter(function(item) {
            return item.orderId === number;
        })
        content.forEach(function(item) {
            $('.all-price').text('￥' + item.account + '.00')
            $(`
                <div>
                    <div class="ress-top">
                        <span class="user-name">${item.receiveName}</span>
                        <span class="user-phone">${item.receivePhone}</span>
                    </div>
                    <div class="ress-bottom">
                        <span class="region">${item.receiveRegion}</span>
                        <span class="detail">${item.receiveDetail}</span>
                    </div>
                </div>
            `).appendTo('.ress');

            $(`
                <div class="goods-content">
                    <div class="goods-top">
                        
                    </div>
                    <div class="goods-bottom>
                        <div>联系客服</div>
                    </div>
                </div>
            `).appendTo('.goods')

            item.details.forEach(function(item) {
                $(`
                    <div class="container">
                        <div class="goods-avatar">
                            <img src=${item.avatar} width="100%">
                        </div>
                        <div class="goods-name">
                            ${item.name}
                        </div>
                        <div class="goods-other">
                            <span class="goods-price">￥${item.price}.00</span>
                            <span class="goods-count">x ${item.count}</span>
                        </div>
                    </div>
                `).appendTo('.goods-top')
            })
            // 判断
            if (item.pay === 0) {
                $('.btn').eq(0).text('去付款');
            } else {
                $('.btn').eq(0).text('再次购买');
            }
            $('.btn').eq(0).click(function() {
                if (item.pay === 0) {
                    window.location.assign(`/pay/index.html?number=${number}`)
                } else {
                    window.location.assign('/category/index.html')
                }
            })
            // 删除订单功能
            $('.remove').click(function() {
                $.myajax ({
                    url: `/order/remove/${number}`,
                    success: data => {
                        layer.open({
                            content: '删除成功'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $(this).closest('.container').remove();
                        window.location.replace('/my-order/index.html')
                    }
                })
            })
        })
        
    }
})

// 返回
$('.icon-back').click(function() {
    window.location.assign('/my-order/index.html')
})