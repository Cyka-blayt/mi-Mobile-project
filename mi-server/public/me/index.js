if (sessionStorage.getItem("token")) {
    $('.me-header_word span').text(sessionStorage.getItem("name") + ' 欢迎你');
    $('.logout').css('display','block');
}
$('.me-header_word').on('click',function() {
    if (sessionStorage.getItem("token")) {
        
    } else {
        $('.me-header_word span').text('请登录');
        window.location.assign('/login/index.html')
        $('.logout').css('display','none');
    }
})
$('div.ress').on('click',function() {
    window.location.assign('/address/index.html')
})
// 退出登录
$('.logout').click(function() {
    sessionStorage.clear();
    window.location.reload();
})
// 跳转订单页
$('.me-order_top').on('click',function() {
    window.location.assign('/my-order/index.html');
})