// 购物记录的id
var id = 0;
// 数量
var count;
// 数据存放
var arrSelect = [];
var arrId = [];
var num = 0;
// 获取购物车数据
$.myajax ({
    url: "/cart/list",
    type: "post",
    success: function(data) {
        console.log(data);
        
        //渲染
        data.forEach(function(item,index) {
            $(`
                <div class="cart-goods_content" data-goodsid=${item.id}>
                    <input type="checkbox" class="checked">
                    <div class="goods-img">
                        <img src="${item.avatar}" width="100%">
                    </div>
                    <div class="goods-suggest">
                        <div class="goods-name">
                            ${item.name}
                        </div>
                        <div class="goods-bottom">
                            <div class="goods-price">
                                ￥${item.price}.00
                            </div>
                            <div class="goods-count">
                                <span class="reduce-count">－</span>
                                <span class="count">${item.count}</span>
                                <span class="add-count">＋</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).appendTo('.cart-goods');
        })

        // 进入全选
        // arrSelect = data;
        // num = data.length;
        // $('.cart-goods_title .checked')[0].checked = true;
        // $('.left .checked')[0].checked = true
        // for (var i = 0;i < $('.cart-goods_content input.checked').length;i++) {
        //     $('.cart-goods_content input.checked')[i].checked = true;
        //     arrId.push(data[i].id)
        // }
        // priceAll()
        // toggleCount();
        // 单选
        $('.cart-goods_content .checked').on('click',function() {
            var index = $('.cart-goods_content .checked').index(this);
            console.log(index)
            if (this.checked) {
                num++;
                arrId.push(data[index].id);
                arrSelect.push(data[index]);
            } else {
                num--;
                var del1 = arrSelect.indexOf(data[index]);
                var del2 = arrId.indexOf(data[index].id);
                arrSelect.splice(del1,1);
                arrId.splice(del2,1);
                // console.log(arrId)
            }
            // 全选时
            if (num === data.length) {
                $('.cart-goods_title .checked')[0].checked = true;
                $('.left .checked')[0].checked = true;
                $('.left .checked')[1].checked = true;
            } else {
                $('.cart-goods_title .checked')[0].checked = false;
                $('.left .checked')[0].checked = false;
                $('.left .checked')[1].checked = false;
            }
            console.log(arrId)
            priceAll();
            toggleCount();
        })

        // 全选
        $('.cart-goods_title .checked').click(function() {
            if (this.checked) {
                arrSelect = [];
                arrId = [];
                num = data.length;
                $('.cart-goods_content .checked').prop('checked',true);
                $('.left .checked')[0].checked = true;
                $('.left .checked')[1].checked = true;
                data.forEach(function(item,index) {
                    arrId.push(item.id);
                    arrSelect.push(item);
                })     
            } else {
                num = 0;
                $('.cart-goods_content .checked').prop('checked',false);
                $('.left .checked')[0].checked = false;
                $('.left .checked')[1].checked = false;
                arrSelect = [];
                arrId = [];
            }
            priceAll();
            toggleCount();
        })
        $('.left .checked').click(function() {
            if (this.checked) {
                arrSelect = [];
                arrId = [];
                num = data.length;
                $('.cart-goods_content .checked').prop('checked',true);
                $('.cart-goods_title .checked')[0].checked = true;
                data.forEach(function(item,index) {
                    arrId.push(item.id);
                    arrSelect.push(item);
                })   
            } else {
                num = 0;
                $('.cart-goods_content .checked').prop('checked',false);
                $('.cart-goods_title .checked')[0].checked = false;
                arrSelect = [];
                arrId = [];
            }
            priceAll();
            toggleCount();
        })

        // －
        $('.reduce-count').on('click',function() {
            $('.add-count').eq($(this).index()).removeClass('stop');
            count = $(this).siblings('.count').text();
            var index = $('.reduce-count').index(this);
            if (count === '1') {
                $(this).addClass('stop');
                layer.open({
                    content: '已到达最小数量咯'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            } else {
                data[index].count--;
                if ( $('.cart-goods_content .checked')[index].checked) {
                    // var del = arrCount.indexOf(data[index].count + 1);
                }
                id = $(this).closest('.cart-goods_content')[0].dataset.goodsid;
                $.myajax ({
                    url: `/cart/decrease/${id}`,
                    type: "post",
                    success: function(data) {
                    }
                })
            }
            $('.count').eq(index).text(data[index].count);
            priceAll();
            toggleCount();
        })

        // ＋
        $('.add-count').on('click',function() {
            $('.reduce-count').eq($(this).index()).removeClass('stop');
            count = $(this).siblings('.count').text();
            var index = $('.add-count').index(this);
            if (count === '5') {
                $(this).addClass('stop');
                layer.open({
                    content: '已到达最大数量咯'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            } else {
                data[index].count++;
                if ( $('.cart-goods_content .checked')[index].checked) {
                    // var del = arrCount.indexOf(data[index].count - 1);
                }
                id = $(this).closest('.cart-goods_content')[0].dataset.goodsid;
                $.myajax ({
                    url: `/cart/increase/${id}`,
                    type: "post",
                    success: function(data) {
                        console.log('增加一');
                    }
                })
            }
            $('.count').eq(index).text(data[index].count);
            priceAll();
            toggleCount();
        })

        // 删除商品
        $('.del-btn').on('click',function() {
            $.myajax ({
                url: "/cart/remove",
                type: "post",
                data: {
                    ids: arrId,
                },
                success: function(data) {
                    $('.cart-goods_content:has(input:checked)').remove();   
                }
            })
            arrId.forEach(function(item) {
                // var del = data.indexOf(data.id == item);
                var del = data.findIndex((items) => items.id === item);
                console.log(del)
                data.splice(del,1)
               
            })
           
            num = 0;
            arrSelect = [];
            arrId = [];
            priceAll();
            toggleCount();
            ifGoods();
        })

        // 计算总价
        function priceAll() {
            var totalPrice = 0;
            for (var i = 0;i < arrSelect.length;i++) {
                totalPrice += arrSelect[i].price * arrSelect[i].count;
            }
            $('.priceAll .red').text('￥' + totalPrice + '.00');
        }

        // 总共选中多少
        function toggleCount() {
            var sum = 0;
            for (var i = 0;i < arrSelect.length;i++) {
                sum += parseInt(arrSelect[i].count);
            }
            $('.settlement-btn').text('结算(' + sum + ')')
        }

        // 传送订单页面
        $('.settlement-btn').on('click',function() {
            var post_id = arrId.join('/')
            console.log(post_id)
            $.myajax ({
                url: "/cart/list_ids",
                type: 'post',
                data: {
                    ids: arrId,
                },
                success: function(data) {
                    // console.log(data);
                    window.location.assign(`/order/index.html?arrId=${post_id}`)
                }
            })
        })

        // 判断有没有内容
        function ifGoods() {
            $.myajax ({
                url: "/cart/total",
                success: function(data) {
                    if (data === 0) {
                        $('.cart-goods').css({'display': 'none'})
                    } else {
                        $('.cart-goods').css({'display': 'block'})
                    }
                } 
            })
        }
        ifGoods();
    }
})

// 返回上一页
$('.icon-back').on('click',function() {
    history.go(-1);
})

// 编辑
$('.edit').on('click',function() {
    $('.container, .del-container').toggleClass('show');
    if ($(this).text() === '编辑') {
        $(this).text('完成')
    } else {
        $(this).text('编辑')
    }
})

// 头部滑动显示
$('.cart-content').scroll(function() {
    var opacity = ($('.cart-content').scrollTop() / 45 > 1)?1:$('.cart-content').scrollTop() / 45;
    $('.cart-header').css({'opacity': opacity})
})
