//
var re = /.+\/(.+?)\/index.html$/;
var pageName = window.parent.location.href.match(re)[1];
$(`li[data-page=${pageName}] i`).addClass('active');

$('li').on('click',function() {
    window.parent.location.assign(`/${this.dataset.page}/index.html`);
})

// 显示购物车内容数量
$.ajax({
    url: '/cart/total',
    type: 'get',
    headers: {
        "Authorization": sessionStorage.getItem('token'),
    },
    success: function(result) {
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
