// 获取商品id
var id = location.search.slice(4);
var cid = sessionStorage.getItem(cid);
// 初始商品数量
var count = 1;
// 调用服务器
$.myajax ({
    url: `/product/model/${id}`,
    success: function(data) {
        console.log(data)
        arrImg = (data.bannerImgs || "").split(',');
        arrOtherimg = (data.otherImgs || "").split(',')
        console.log(arrOtherimg)
        arrImg.forEach(function(item) {
            $(`
                <div class="swiper-slide">
                    <img src="${item}" width="100%">
                </div>
            `).appendTo('.swiper-wrapper')
            
        })
        arrOtherimg.forEach(function (item) {
            $(`
                <div class="other-img">
                    <img src="${item}" width="100%" style="display:block">
                </div>
            `).appendTo('.other')
        })
        $(`
            <div class="container">
                <div class="detail-title_left">
                    <span>￥${data.price}</span>
                </div>
                <div class="detail-title_right">
                    <i class="iconfont icon-shoucang"></i>
                    <span>收藏</span>
                </div>
            </div>
        `).appendTo('.detail-title');
        $(`
            <div class="container">
                <span class="icon">
                    <i class="iconfont icon-xiaomi"></i> 自营
                </span>
                <span class="detail-name">${data.name}</span>
            </div>
        `).appendTo('.shop-name');
        $(`
            <div class="container">
                <span>${data.brief}</span>
            </div>
        `).appendTo('.detail-brief');
        // 将图片放入弹窗
        $(`
            <img src="${data.avatar}" width="100%">
        `).appendTo('.detail-img')
        // 价格
        $('.detail-price').text(`￥${data.price}`);
        // 数量
        $('.detail-count').text("已选：" + count + "件");
        $('.num').text(count);
        
        // 计数添加
        $('.select').on('click',function() {
        })

        var mySwiper = new Swiper ('.swiper-container', {
            autoplay: true, //自动播放
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
             
        })
    }
})
// 减号数量
$('.reduce-num').on('click',function() {
    if (count === 1) {
        $('.reduce-num').addClass('stop');
        layer.open({
            content: '商品数量已达到了最小哟'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
        return;
    } else {
        $('.reduce-num').removeClass('stop');
        $('.add-num').removeClass('stop');
        --count;
        $('.num').text(count);
        $('.detail-count').text("已选：" + count + "件");
        $('.select .count').text(count + "件")
    }    
})

// 加号
$('.add-num').on('click',function() {
    if (count === 5) {
        $('.add-num').addClass('stop');
        layer.open({
            content: '商品数量已达到了最大哟'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    } else {
        $('.add-num').removeClass('stop');
        $('.reduce-num').removeClass('stop');
        ++count;
        $('.num').text(count);
        $('.detail-count').text("已选：" + count + "件");
        $('.select .count').text(count + "件")
    }
})

// 点击弹窗
$('.select').click(function() {
    $('.count-wrapper').css("height","100%");
    $('.count-wrapper .content').animate({"height": "70%"},800);
})
// 点击黑边消失
var if_bw = true;
$('.count-wrapper .content').click(function() {
    if_bw = false;
})
$('.count-wrapper').click(function() {
    if (if_bw === true) {
        $('.count-wrapper .content').animate({"height": "0%"},800);
        $('.count-wrapper').animate({"height": "0"},500);
    }
    if_bw = true;
})

// 头部下滑显示
$('.detail-content').scroll(function() {
    var opcaity = ($('.detail-content').scrollTop() / 400 > 1)?1:$('.detail-content').scrollTop() / 400;
    $('.header').css({'background-color': 'rgba(239, 239, 240,' +  opcaity + ')'});
    $('.nav_center li').css({'color': 'rgba(0, 0, 0,' +  opcaity + ')'});
    if ($('.detail-content').scrollTop() > 400) {
        $('.top').removeClass('show');
        $('.bottom').addClass('show');
    } else {
        $('.top').addClass('show');
        $('.bottom').removeClass('show');
    }
})

// 添加购物车
$('.add-cart').on('click',function() {
    $.myajax ({
        url: "/cart/add",
        type: "post",
        data: {
            pid: id,
            count: count,
        },
        success: function(data) {
            console.log('添加成功')
            layer.open({
                content: '添加成功'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }
    })
})
// 返回上一级
$('.nav_left').on('click',function() {
    history.go(-1);
})
$('.cart-icon').on('click',function() {
    window.location.assign('/cart/index.html')
})
// 显示购物车内容数量
$.ajax({
    url: '/cart/total',
    type: 'get',
    headers: {
        "Authorization": sessionStorage.getItem('token'),
    },
    success: function(result) {
        console.log(result)
        if (result.code === 200) {
            if (result.data > 0) {
                $('.show-num').css('display','block');
                $('.show-num').text(result.data);
            } else {
                $('.show-num').css('display','none');
            }
        }
    }
})