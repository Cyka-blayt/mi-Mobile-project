// ajax封装
$.extend({
    myajax: function(userOptions) {
        var defaultOptions = {
            type: 'get',
            headers: {
                "Authorization": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
        }
        var options = Object.assign({}, defaultOptions, userOptions);
        if (options.data) {
            options.data = JSON.stringify(options.data)
        }
        options.success = function (result) {
            if (result.code === 200) {
                userOptions.success(result.data);
            } else {
                alert(result.msg)
            }
        }
        // 发起真正的ajax
        $.ajax (options);
    },
    // 防抖 减少某一函数调用频率
    debouce: function(func,time) {
        var lock = false;
        return function(e) {
            if (lock) {
                return;
            }
            setTimeout(function() {
                lock = false;
            },time)
            func.call(this,e);
        }
    }

})


