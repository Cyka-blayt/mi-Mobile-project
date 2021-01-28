// window.location.reload()

var arrId = location.search.slice(7).split('/')
console.log(arrId)
// 总价
var sum = 0;
// 渲染
$.myajax ({
    url: "/cart/list_ids",
    type: "post",
    data: {
        ids: arrId,
    },
    success: function(data) {
        console.log(data)
        
        data.forEach(function(item) {
            $(`
                <div class="goods-content">
                    <div class="goods-avatar">
                        <img src="${item.avatar}" width="100%">
                    </div>
                    <div class="goods-other">
                        <div class="goods-name">${item.name}</div>
                        <div class="goods-pc">
                            <span class="goods-price">￥${item.price}</span>
                            <span class="goods-count">x ${item.count}</span>
                        </div>
                    </div>
                </div>
            `).appendTo('.goods');
            sum = sum + item.price * item.count;;
        })
        $('span.price-all').text('￥' + sum + '.00');
        $('.order-footer_price').text('￥' + sum + '.00');
    }
})

// 渲染地址
$.myajax ({
    url: "/address/list",
    success: function(data) {
        console.log(data);
        data.forEach(function(item,index) {
            $(`
                <div class="ress-show" data-default=${item.isDefault} data-ressid=${item.id}>
                    <div class="circle">
                        <i class="iconfont icon-duigou"></i>
                    </div>
                    <div class="information">
                        <div class="information-top">
                            <div class="information-top_left">
                                <span class="ress-name">${item.receiveName}</span>
                                <span class="default">默认</span>
                            </div>
                            <div class="information-top_right">
                                <span>${item.receivePhone}</span>
                            </div>
                        </div>
                        <div class="information-bottom">
                            <span class="ress-region">${item.receiveRegion}</span>
                            <span class="ress-detail">${item.receiveDetail}</span>
                        </div>
                    </div>
                    <i class="edit">
                        <img src="img/edit.png" width="100%" alt="">
                    </i>
                </div>
            `).appendTo('.ress-center')
            // 是否为默认地址
            if ($('.ress-show')[index].dataset.default === '1') {
                $('.default').eq(index).css('display','block');
                $('.circle').eq(index).css({
                    'background': 'rgb(180, 115, 31)',
                })
            } else {
                $('.default').eq(index).css('display','none')
            }
        })
        // 点击选择收货地址
        var lock = true;
        $('.ress-show').click(function() {
            if (lock) {
                $('.circle').css('background','white')
                $('.circle').eq($(this).index()).css('background','rgb(180, 115, 31)');
                var ressId = $('.ress-show')[$(this).index()].dataset.ressid;
                $('.ress-left').css('display','block');
                $('.default-null').css('display','none');
                $('.name').text(`${data[$(this).index()].receiveName}`);
                $('.phone').text(`${data[$(this).index()].receivePhone}`);
                $('.region').text(`${data[$(this).index()].receiveRegion}`);
                $('.detail').text(`${data[$(this).index()].receiveDetail}`);
                $('.ress-left').attr('data-rid',null);
                $('.ress-left').attr('data-rid',`${data[$(this).index()].id}`);
                $('.ress-jump').css('display','none')
            }
            lock = true;
        })
        // 编辑地址
        $('.edit').on('click',function() {
            var index = $('.edit').index(this);
            console.log(index)
            lock = false;
            
            console.log($(this).closest('.ress-show')[0])
            sessionStorage.setItem('ress-default',$(this).closest('.ress-show')[0].dataset.default);
            sessionStorage.setItem('ress-name',$(this).closest('.ress-show').find('.ress-name').text());
            sessionStorage.setItem('ress-phone',$(this).closest('.ress-show').find('.information-top_right span').text());
            sessionStorage.setItem('ress-region',$(this).closest('.ress-show').find('.ress-region').text());
            sessionStorage.setItem('ress-detail',$(this).closest('.ress-show').find('.ress-detail').text());
            sessionStorage.setItem('ress-id',$(this).closest('.ress-show')[0].dataset.ressid);
            window.location.assign('/address/revise-ress.html')
        })
        // 添加地址
        $('.ress-add').click(function() {
            window.location.assign('/address/address.html')
        })
        
    }
})
// 渲染初始地址为默认地址
$.myajax ({
    url: '/address/get_default',
    success: function(data) {
        console.log(data)
        if (data !== null) {
            $('.name').text(`${data.receiveName}`);
            $('.phone').text(`${data.receivePhone}`);
            $('.region').text(`${data.receiveRegion}`);
            $('.detail').text(`${data.receiveDetail}`)
            $('.ress-left').attr('data-rid',`${data.id}`);
        } else {
            $('.ress-left').css('display','none');
            $('.default-null').css('display','block')
        }
    }
})

// 点击选择收货地址
$('.ress').click(function() {
    $('.ress-jump').css('display','block')
})

// 点击黑边关闭
var isDown = true;
$('.ress-content').click(function() {
    isDown = false;
})
$('.ress-jump').click(function() {
    if (isDown) {
        $('.ress-jump').css('display','none')
    }
    isDown = true;
})

// 滑动显示
$('.order-content').scroll(function() {
    var opacity = ($('.order-content').scrollTop() / 45 > 1)?1:$('.order-content').scrollTop() / 45;
    $('.order-header').css({'opacity': opacity})
})

// 返回上一页
$('.icon-back').click(function() {
    history.go(-1)
})

// 点击生成订单
$('.submit').on('click',function() {
    console.log(sum)
    console.log($('.ress-left')[0].dataset.rid)
    $.myajax ({
        url: "/order/confirm",
        type: "post",
        data: {
            ids: arrId,
            account: sum,
            addressId: $('.ress-left')[0].dataset.rid,
        },
        success: function(data) {
            console.log(data)
            window.location.assign(`/pay/index.html?number=${data}`)
        }
    })
})