$('.list-main').on('click',function(e) {
    var li = e.target.tagName === 'LI' ? e.target : e.target.parentNode;
    $('img.avatar').attr('src',li.dataset.avatar);
    if ($(li).find('span').hasClass('active')) return;  //防止ajax一直发送
    $('.list-main li span').attr('class',null);
    $(li).find('span').attr('class','active');
    // 请求二级分类
    $.myajax({
        url: `/category/list/${li.dataset.id}`,
        success: function(data) {
            $('.list-sub').empty().toggleClass('show',data.length > 0); //清空
            $('.empty').toggleClass('show',data.length === 0);
            data.forEach(function(item) {
                $(`
                    <li>
                        <a href="/list/index.html?cid=${item.id}">
                            <img src="${item.avatar}" width="100%">
                            <span>${item.name}</span>
                        </a>
                    </li>
                `).appendTo('.list-sub');
            })
        }
    })
    // $.ajax({
    //     url: `/category/list/${li.dataset.id}`,
    //     type: "get",
    //     success: function(result) {
    //         console.log(result)
    //         if (result.code === 200) {
    //             $('.list-sub').empty().toggleClass('show',result.data.length > 0); //清空
    //             $('.empty').toggleClass('show',result.data.length === 0);
    //             result.data.forEach(function(item) {
    //                 $(`
    //                     <li>
    //                         <a href="/list/index.html?cid=${item.id}">
    //                             <img src="${item.avatar}" width="100%">
    //                             <span>${item.name}</span>
    //                         </a>
    //                     </li>
    //                 `).appendTo('.list-sub');
    //             })
    //         }
    //     }
    // })
})

//发送ajax请求一级分类的数据
$.myajax ({
    url: "/category/list/0",
    success: function(data) {
        data.forEach(function(item) {
            $(`
                <li data-id=${item.id} data-avatar=${item.avatar}>
                    <span>${item.name}</span>
                </li>
            `).appendTo($('.list-main'))
        })
        $('.list-main li').eq(0).trigger('click');  // 点击事件直接触发
    }
})
// $.ajax ({
//     url: "/category/list/0",
//     type: "get",
//     success: function(result) {
//         //据回来的数据拼成多个li放在ul.list-main中
//         if (result.code == 200) {
//             result.data.forEach(function(item) {
//                 $(`
//                     <li data-id=${item.id} data-avatar=${item.avatar}>
//                         <span>${item.name}</span>
//                     </li>
//                 `).appendTo($('.list-main'))
//             })
//             $('.list-main li').eq(0).trigger('click');
//         }
//         console.log(result);
//     }   //回来以后的回调函数
// })
