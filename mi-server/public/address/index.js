// // 返回上一页
$('.back').on('click',function() {
    window.location.assign('/me/index.html')
})
$.ajax ({
    url: "/address/list",
    type: "get",
    headers: {
        "Authorization": sessionStorage.getItem('token'),
    },
    success: function(result) {
        console.log(result)
        if (result.code === 200) {
            if (result.data.length == 0 ) {
                $('.no-ress').addClass('show');
                $('.ress').removeClass('show')
            } else {
                $('.ress').addClass('show');
                $('.no-ress').removeClass('show')
            }
            result.data.forEach(function(item,index) {
                $(`
                    <div class="show-ress" data-default=${item.isDefault}>
                        <div>
                            <div class="show-ress_np">
                                <div class="name">${item.receiveName}</div>
                                <div class="phone">${item.receivePhone}</div>
                            </div>
                            <div class="show-ress_position">
                                <div class="if-default">
                                    默认
                                </div>
                                <div>
                                    <span class="region">${item.receiveRegion}</span>
                                    <span class="detail">${item.receiveDetail}</span>
                                </div>
                            </div>
                        </div>
                        <i>
                            <img src="img/change-icon.png" width="100%" class="revise-ress" data-gid=${item.id} />
                        </i>
                    </div>
                `).appendTo('.ress');
                // 判断是否为默认地址
                console.log($('.show-ress')[index].dataset.default)
                if ($('.show-ress')[index].dataset.default === '1') {
                    $('.if-default').eq(index).css('display','block')
                } else {
                    $('.if-default').eq(index).css('display','none')
                }

                // 跳转到编辑页
                $('.revise-ress').on('click',function() {
                    sessionStorage.setItem('ress-default',$(this).closest('.show-ress')[$(this).index()].dataset.default);
                    sessionStorage.setItem('ress-name',$(this).closest('.show-ress').find('.name').text());
                    sessionStorage.setItem('ress-phone',$(this).closest('.show-ress').find('.phone').text());
                    sessionStorage.setItem('ress-region',$(this).closest('.show-ress').find('.region').text());
                    sessionStorage.setItem('ress-detail',$(this).closest('.show-ress').find('.detail').text());
                    sessionStorage.setItem('ress-id',this.dataset.gid);
                    window.location.assign('revise-ress.html')
                })
            })
        } else {
            alert (result.msg);
        }
    }
})
