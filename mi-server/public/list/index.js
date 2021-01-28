// 回到上一页
$('.icon-back').click(function() {
    window.location.assign('/category/index.html')
})
// 获取父id
var id = location.search.slice(5);
// 初始
var name = '';
var col = 'price';
var dir = 'asc';
var begin = 0;
var pageSize = 6;

var pHeight = 0;
var lHeight = 0;
var bHeight = 0;
// 防止空渲染
var ifNull = true;
// 切换卡片
$('.list-screen li').click(function() {
    if ($(this).index() === 0) {
        return;
    } else {
        $('.list-screen li').removeClass('show');
        $(this).addClass('show');
    }
})
// 搜索
$('.search').blur(function() {
    name = $('.search').val();
    recovery();
    run();
})
// 升序降序更改
$('.dir').on('click',function() {
    if ($('.dir span').text() === '升序') {
        $('.dir span').text('降序');
        $('.icon-shang').removeClass('show');
        $('.icon-xia').addClass('show');
        dir = 'desc';
    } else {
        $('.dir span').text('升序');
        $('.icon-xia').removeClass('show');
        $('.icon-shang').addClass('show');
        dir = 'asc';
    }
    recovery()
    run();
})
// 价格索引
$('.price').on('click',function() {
    col = 'price';
    recovery()
    run();
})
// 评价索引
$('.rate').on('click',function() {
    col = 'rate';
    recovery();
    run();
})
// 销量索引
$('.sale').on('click',function() {
    col = 'sale';
    recovery();
    run();
})
function run() {
    $.myajax ({
        url: "/product/list",
        type: "post",
        data : {
            name: name,
            cid: id,
            orderCol: col,
            orderDir: dir,
            begin: begin,
            pageSize: pageSize,
        },
        success : function(data) {
            if (data.length < pageSize) {
                ifNull = false;
            } 
            // $('.list-content').toggleClass('show',data.length > 0); //清空
            // $('.empty').toggleClass('show',data.length === 0);
            data.forEach(function(item) {
                $(`
                    <a href="/details/index.html?id=${item.id}">
                        <div class="shop-list" data-sid="${item.id}">
                            <i class="list-show_img">
                                <img src="${item.avatar}" width="100%">
                            </i>
                            <div class="list-show_content">
                                <div class="shop-name">
                                    ${item.name}
                                </div>
                                <div class="shop-brief">
                                    ${item.brief}
                                </div>
                                <div class="shop-price">￥${item.price}</div>
                                <div class="shop-sale">
                                    销量：${item.sale}
                                </div>
                                <div class="shop-rate">
                                    ${item.rate}条评论
                                </div>
                            </div>
                        </div>
                    </a>
                `).appendTo('.list-show');
                $(`
                    <a href="/details/index.html?id=${item.id}">
                        <div class="shop-block" data-sid="${item.id}>
                            <i class="block-show_img">
                                <img src="${item.avatar}" width="100%">
                            </i>
                            <div>
                                <div class="shop-name">
                                    ${item.name}
                                </div>
                                <div class="shop-price">￥${item.price}</div>
                                <div class="shop-sale">
                                    销量：${item.sale}
                                </div>
                                <div class="shop-rate">
                                    ${item.rate}条评论
                                </div>
                            </div>
                        </div>
                    </a>
                `).appendTo('.container')
            })   
        }
    })
}
run();   
 // 滑动加载           
$('.list-content').scroll(function() {
    pHeight = $('.list-content').height();  // 父元素的高度
    lHeight = $('.list-show').height();    // 列表高度
    bHeight = $('.block-show').height(); 
    if (ifNull == false) return;
    if ($('.list-content').scrollTop() > lHeight - pHeight) {
        begin += pageSize;
        pageSize = 2;
        run();
    }
})
// 切换列表样式
$('.list-header div').on('click',function() {
    $('i.icon-kuaizhuangshitu, i.icon-liebiao').toggleClass('show');
    $('.list-show, .block-show').toggleClass('show');
    pHeight = $('.list-content').height();  // 父元素的高度
    bHeight = $('.block-show').height();   // 块版高度
    lHeight = $('.list-show').height();    // 列表高度
    $('.list-content').scroll(function() {
        if (ifNull == false) return;
        if ($('.list-content').scrollTop() > bHeight - pHeight - 1) {
            begin += pageSize;
            pageSize = 2;
            run();
        }
    })
})

// 切换时清空内容
function recovery() {
    $('.list-show').empty();
    $('.container').empty();
    begin = 0;
    pageSize = 6;
    ifNull = true;
}