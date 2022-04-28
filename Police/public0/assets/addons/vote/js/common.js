var isMobile, number_format, refresh_data;
$(function () {
    // 是否移动端
    isMobile = !!("ontouchstart" in window);

    // 格式化数字
    number_format = function (text) {
        return text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1");
    };

    // 刷新数字
    refresh_data = function (elem) {
        var elem = typeof elem != "undefined" ? $(elem) : $('.number-count');
        // 动画数字
        elem.each(function () {
            var $this = $(this);
            $({from: 0, to: $this.data("to"), elem: $this}).animate({from: $this.data("to")}, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.text(number_format(Math.ceil(this.from)));
                },
                complete: function () {
                    if (number_format(this.to) != this.elem.text()) {
                        this.elem.text(number_format(this.to));
                    }
                }
            });
        });
    };

    // 倒计时
    $('[data-countdown]').each(function () {
        var that = this;
        var $this = $(this), finalDate = parseInt($(this).data('countdown'));
        if (finalDate > 0) {
            finalDate = isNaN(finalDate) ? finalDate : new Date().getTime() + finalDate * 1000;
            var format = $(that).data("format");
            $this.on('finish.countdown', function () {
                location.reload();
            }).countdown(finalDate, function (event) {
                $this.html(event.strftime(format) || event.strftime('%D天%H时%M分%S秒'));
            });
        }
    });

    // 统计信息
    if ($("#statistics").size() > 0) {
        var flashed = false;
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > $("#statistics").position().top - $(window).height() && !flashed) {
                flashed = true;
                refresh_data();
            } else if ($(window).scrollTop() == 0) {
                flashed = false;
            }
        });
    }

    // 回到顶部
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

    // 开始投票
    $(document).on("click", ".btn-startvote", function () {
        $('html,body').animate({
            scrollTop: $("#players").offset().top - 50
        }, 700);
    });

    // 投票
    var vote = function (params, success, error) {
        var that = this;
        VOTE.api.ajax({
            url: "/addons/vote/index/vote",
            data: $.extend({player_id: $(that).data("id")}, params || {})
        }, function (data, ret) {
            if (typeof success == 'function') {
                if (false === success.call(that, data, ret)) {
                    return false;
                }
            }
            var elem = $(that).closest(".player-item").find("[data-to]");
            elem.data("to", parseInt(elem.data("to")) + 1);
            var ins = $(that).find("ins");
            if (ins.length > 0) {
                ins.text(parseInt(ins.text()) + 1);
            }
            refresh_data(elem);
            //添加禁用
            if (typeof data.disabled != 'undefined' && data.disabled) {
                $(that).addClass("disabled");
            }
        }, function (data, ret) {
            if (typeof error == 'function') {
                if (false === error.call(that, data, ret)) {
                    return false;
                }
            }
        });
    };

    // 点击投票
    $(document).on("click", ".btn-vote", function () {
        var that = this;
        if ($(that).data("captcha") == "1") {
            if (typeof initGeetest !== 'undefined') {
                var geetInit = false;
                layer.load(0);
                VOTE.api.ajax({
                    url: "/addons/geetest/index/start",
                }, function (data) {
                    initGeetest({
                        gt: data.gt,
                        https: true,
                        challenge: data.challenge,
                        new_captcha: data.new_captcha,
                        product: 'embed', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                        width: '100%',
                        offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    }, function (captchaObj) {
                        layer.closeAll();
                        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
                        geetInit = captchaObj;
                        layer.open({
                            type: 0,
                            title: '',
                            id: 'geetestdom',
                            content: '',
                            btn: false,
                            success: function (layero, index) {
                                captchaObj.appendTo($("#geetestdom"));
                            }
                        });
                        captchaObj.onSuccess(function () {
                            var result = captchaObj.getValidate();
                            vote.call(that, result, null, function (data, ret) {
                                geetInit.reset();
                            });
                        });
                        captchaObj.onError(function () {
                            geetInit.reset();
                        });
                    });
                    return false;
                });
            } else {
                layer.open({
                    type: 1,
                    title: '',
                    id: 'textdom',
                    btnAlign: 'c',
                    content: '<div class="p-4" style="padding:20px;"><div class="input-group"><input type="text" name="captcha" class="form-control input-lg" placeholder="请输入验证码" data-rule="required;length(4)" />\n' +
                        '    <span class="input-group-btn" style="padding:0;border:none;">\n' +
                        '        <img src="/captcha" width="100" height="40" onclick="this.src = \'/captcha?r=\' + Math.random();"/>\n' +
                        '    </span>' +
                        '    </div><a href="javascript:" class="btn btn-info btn-md btn-block btn-confirm-vote" style="margin-top:15px;font-size:14px;">确定</a></div>',
                    success: function (layero, index) {
                        $("input[name=captcha]", layero).focus();
                        $(".btn-confirm-vote", layero).click(function () {
                            var captcha = $("input[name=captcha]", layero).val();
                            if (captcha == '') {
                                layer.msg("验证码不能为空");
                                return false;
                            }
                            vote.call(that, {captcha: captcha}, null, function (data, ret) {
                                $("input[name=captcha]", layero).focus();
                                $("img", layero).trigger("click");
                            });
                        });
                    }
                });
            }
        } else {
            vote.call(that);
        }
        return;

    });

    // 发表评论
    if ($("#postform").size() > 0) {
        VOTE.api.form("#postform", function (data, ret) {
            VOTE.api.msg(ret.msg, function () {
                location.reload();
                return false;
            });
            return false;
        });
    }

    //如果是PC则移除navbar的dropdown点击事件
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent)) {
        $("#navbar-collapse [data-toggle='dropdown']").removeAttr("data-toggle");
    } else {
        $(".navbar-nav ul li:not(.dropdown-submenu):not(.dropdown) a").removeAttr("data-toggle");
    }

    //分享参数配置
    var shareConfig = {
        title: $("meta[property='og:title']").attr("content") || document.title,
        description: $("meta[property='og:description']").attr("content") || "",
        url: $("meta[property='og:url']").attr("content") || location.href,
        image: $("meta[property='og:image']").attr("content") || ""
    };

    // 点击分享
    $(document).on("click", ".btn-share", function () {
        var that = this;
        var type = $(that).data("type");
        if (typeof wx != 'undefined') {
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shade: 0.75,
                offset: 'rt',
                skin: 'layui-layer-nobg',
                shadeClose: true,
                content: template("wxsharetpl", shareConfig)
            });
        } else {
            layer.open({
                type: 1,
                area: isMobile ? 'auto' : ["450px", "380px"],
                zIndex: 1031,
                title: '分享', //不显示标题
                btn: ["关闭"],
                btnAlign: "c",
                content: template("sharetpl", shareConfig)
            });
        }
    });

    // 复制到剪贴板
    var clipboard = new ClipboardJS('.btn-copylink');
    clipboard.on('success', function (e) {
        layer.msg("链接已复制到剪贴板!");
        e.clearSelection();
    });

    // 搜索按钮
    $(document).on("click", "#searchbtn", function () {
        $(this).closest("form").trigger("submit");
    });

    // 搜索表单
    $(document).on("submit", "#searchform", function () {
        if (parseInt($(this).data("pagesize")) > 0) {
            return true;
        }
        $(".player-item").show();
        var q = $("#searchinput").val();
        if (q != '') {
            $(".player-item:not([data-" + (isNaN(q) ? "nickname" : "id") + "*='" + q + "'])").hide();
        }
        return false;
    });

    //如果是微信内
    if (typeof wx != 'undefined') {
        shareConfig.url = location.href;
        VOTE.api.ajax({
                url: "/addons/vote/index/share",
                data: {url: shareConfig.url},
                loading: false
            }, function (data, ret) {
                try {
                    wx.config({
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            "onMenuShareTimeline", //分享给好友
                            "onMenuShareAppMessage", //分享到朋友圈
                            "onMenuShareQQ", //分享到QQ
                            "onMenuShareWeibo" //分享到微博
                        ]
                    });
                    var shareData = {
                        title: shareConfig.title,
                        desc: shareConfig.description,
                        link: shareConfig.url,
                        imgUrl: shareConfig.image,
                        success: function () {
                            layer.closeAll();
                        },
                        cancel: function () {
                            layer.closeAll();
                        }
                    };
                    wx.ready(function () {
                        wx.onMenuShareTimeline(shareData);
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareWeibo(shareData);
                    });

                } catch (e) {

                }
                return false;
            }
        );
    }

    if (!isMobile) {
        $('body').tooltip({selector: '[data-toggle="tooltip"]'});
    }
});
