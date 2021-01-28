var re = /3000(.+)$/
var prePage = document.referrer.match(re)[1];
// 添加地址
$('.add-ress').on('click',function() {
    $.myajax ({
        url: "/address/add",
        type: "post",
        data: {
            receiveName: $('input.name').val().trim(),
            receivePhone: $('input.phone').val().trim(),
            receiveRegion: $('input.region').val(),
            receiveDetail: $('input.detail').val().trim(),
        },
        success: function(data) {
            window.location.replace(prePage);
        }
    })
    // $.ajax ({
    //     url: "/address/add",
    //     type: "post",
    //     headers: {
    //         "Authorization": sessionStorage.getItem('token'),
    //         "Content-Type": "application/json"
    //     },
    //     data:JSON.stringify ({
    //         receiveName: $('input.name').val().trim(),
    //         receivePhone: $('input.phone').val().trim(),
    //         receiveRegion: $('input.region').val(),
    //         receiveDetail: $('input.detail').val().trim(),
    //     }),
    //     success: function(result) {
    //         console.log(result)
    //         if (result.code === 200) {
    //             window.location.replace('index.html');
    //         } else {
    //             alert(result.msg)
    //         }
    //     }
    // })
    
})
// 返回上一页
$('.back').on('click',function() {
    history.go(-1)
})
