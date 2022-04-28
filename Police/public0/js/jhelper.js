
if (typeof (Jhelper) === "undefined" || !Jhelper) {
    var Jhelper = {version: "1.0"};
}
//数组扩展
Array.prototype.contains = function (oObj) {
    var _THIS = this;
    for (var i = 0; i < _THIS.length; i += 1) {
        if (_THIS[i] === oObj) {
            return true;
        }
    }
    return false;
};
//扩展String对象，添加截掉字符串前后空格的方法
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
//继承机制(该继承方式只会继承父类中的原型，不会继承父类自己本身的属性和方法)
Jhelper.inherits = function (fSubclass, fSuperclass) {
    var F = function () {
    };
    F.prototype = fSuperclass.prototype;
    fSubclass.prototype = new F();
    fSubclass.prototype.constructor = fSuperclass;// 子类中保存父类的信息,主要用于子类原型重写父类原型方法后,可以调用到父类原型方法
    fSubclass.prototype.selfConstructor = fSubclass;// 保存自己类信息
};
//js map自定义实现
Jhelper.Map = function () {
    this.obj = {};
    this.prefix = "imap_key_prefix_";
    this.length = 0;
};
Jhelper.Map.prototype.put = function (key, value) {
    if (!this.hasKey(key)) {
        this.length += 1;
    }
    this.obj[this.prefix + key] = value;
};
Jhelper.Map.prototype.get = function (key) {
    return this.obj[this.prefix + key];
};
Jhelper.Map.prototype.remove = function (key) {
    if (this.hasKey(key)) {
        var _oValue = this.get(key);
        delete this.obj[this.prefix + key];
        this.length -= 1;
        return _oValue;
    }
};
Jhelper.Map.prototype.clear = function () {
    for (var fo in this.obj) {
        if (this.obj.hasOwnProperty(fo)) {
            delete this.obj[fo];
        }
    }
    this.length = 0;
};
Jhelper.Map.prototype.hasKey = function (key) {
    return this.obj.hasOwnProperty(this.prefix + key);
};
Jhelper.Map.prototype.size = function () {
    return this.length;
};
Jhelper.Map.prototype.values = function () {
    var _aArrays = [];
    for (var fo in this.obj) {
        if (this.obj.hasOwnProperty(fo)
            && fo.substring(0, this.prefix.length).toLowerCase() === this.prefix) {
            _aArrays.push(this.obj[fo]);
        }
    }
    return _aArrays;
};
Jhelper.Map.prototype.keys = function () {
    var _aArrays = [];
    for (var fo in this.obj) {
        if (this.obj.hasOwnProperty(fo)
            && fo.substring(0, this.prefix.length).toLowerCase() === this.prefix) {
            _aArrays.push(fo.substr(this.prefix.length));
        }
    }
    return _aArrays;
};


//*****基础ajax请求封装*****
Jhelper.BaseRemote = function (p) {
    p = p || {};
    // =================必须的属性S======================
    this.url = p.url; // 远程访问路径
    // =================必须的属性E======================
    this.params = p.params || {};// 请求参数json格式{param1:1,param2:2}
    this.method = p.method || "post";// 请求方法
    this.contentType = p.contentType || "application/x-www-form-urlencoded";
    this.isAsync = p.isAsync === undefined ? true : p.isAsync;// 请求方式，默认为异步请求
    this.timeoutMilli = p.timeoutMilli || 30000;//请求超时毫秒数
    this.isLoading = p.isLoading === undefined ? false : p.isLoading;//是否显示loading,默认不显示
    // 回调函数
    this.onSuccess = p.onSuccess;// 请求成功后回调方法
    this.onComplete = p.onComplete;// 请求完成回调方法

    //*****内部属性*****
    this.requestVersion = 0;//请求版本,防止多次请求
    this.load = null;//loading弹层对象
};
Jhelper.BaseRemote.prototype.addParameters = function (key, value) {
    if (Jhelper.fun.isNotNull(key)) {
        this.params[key] = value;
    }
    return this;
};
Jhelper.BaseRemote.prototype.removeParameters = function (key) {
    if (Jhelper.fun.isNotNull(key)) {
        delete this.params[key];
    }
};
Jhelper.BaseRemote.prototype.getParameters = function (key) {
    if (Jhelper.fun.isNotNull(key)) {
        return this.params[key];
    }
    return undefined;
};
Jhelper.BaseRemote.prototype.send = function () {
    var THIS = this;
    if (this.isLoading) {
        //请求弹出遮屏
        this.load = Jhelper.fun.openLoading();
    }
    -function (version) {
        $.ajax({
            type: THIS.method,
            url: THIS.url.split("?")[0],
            data: THIS.getParams(),
            dataType: "html",
            contentType: THIS.contentType,
            timeout: THIS.timeoutMilli,
            async: THIS.isAsync,
            success: function (data, status, xmlHttpRequest) {
                if (version !== THIS.requestVersion) {
                    return;
                }
                //sessionstatus服务器特别响应码,表示权限不足
                if (xmlHttpRequest.getResponseHeader("sessionstatus")) {
                    //可加入权限处理代码,本脚本在全局$(document).ajaxComplete处理过了,所以此处忽略处理
                    return;
                }
                THIS.success(data, status, xmlHttpRequest);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (textStatus === "timeout") {
                    Jhelper.fun.warning("请求超时!");
                } else {
                    Jhelper.fun.warning("请求错误!");
                }
            },
            complete: function (xmlHttpRequest, textStatus) {
                THIS.complete(xmlHttpRequest, textStatus);
            }
        });
    }(THIS.requestVersion);
};
Jhelper.BaseRemote.prototype.complete = function (xmlHttpRequest, textStatus) {
    if (this.isLoading) {
        //请求完毕关闭遮屏
        Jhelper.fun.closeLoading(this.load);
    }
    if (typeof (this.onComplete) === 'function') {
        this.onComplete(xmlHttpRequest, textStatus);
    }
};
Jhelper.BaseRemote.prototype.success = function (data, status, xmlHttpRequest) {
    if (typeof (this.onSuccess) === 'function') {
        this.onSuccess(data, status, xmlHttpRequest);
    }
};

// 获取提交参数
Jhelper.BaseRemote.prototype.getParams = function () {
    var _content = {};
    var prop;
    for (var element_client in this.params) {
        prop = this.params[element_client];
        if (prop !== undefined && prop !== null && typeof prop != "function") {
            _content[element_client] = prop;
        }
    }
    // 分解请求中的url参数
    if (this.url) {
        var m = this.url.split("?");
        if (m[1]) {
            var t = m[1].split("&");
            for (var i = 0; i < t.length; i++) {
                var subt = t[i].split("=");
                if (subt[1]) {
                    _content[subt[0]] = subt[1];
                }
            }
        }
    }
    return _content;
};

/**
 * 请求html格式数据,渲染到div中
 */
Jhelper.QueryRemote = function (p) {
    p = p || {};
    Jhelper.BaseRemote.call(this, p);
    this.renderId = p.renderId;
    this.isAppend = p.isAppend === undefined ? false : p.isAppend;//是否追加在rederId,默认为覆盖
};
Jhelper.inherits(Jhelper.QueryRemote, Jhelper.BaseRemote);
Jhelper.QueryRemote.prototype.success = function (data, status, xmlHttpRequest) {
    if (this.renderId) {
        if (this.isAppend) {
            $("#" + this.renderId).append(data);
        } else {
            $("#" + this.renderId).html(data);
        }
    }
    //如果有成功回调方法
    if (typeof (this.onSuccess) === 'function') {
        this.onSuccess(data, status, xmlHttpRequest);
    }
};

/**
 * 分页查询,渲染到div中
 * 后端响应消息中,如果相应头中有totalSize参数,则分页组件属性totalSize和totalPageSize生效.pre,next,last方法会判断边界
 * 如果没有,pre,next不判断分页边界,last方法不生效
 */
Jhelper.PageQueryRemote = function (p) {
    p = p || {};
    Jhelper.QueryRemote.call(this, p);
    this.pageSize = p.pageSize || 20;// 页大小(默认20页),自动发送到后台的参数
    //查询到空是否提示,默认不提示
    this.isQueryEmptyHint = p.isQueryEmptyHint === undefined ? false : p.isQueryEmptyHint;
    //*****内部属性*****
    this.currentPage = 1;// 当前页,自动发送到后台的参数
    this.isQueryEmpty = false;//是否加载到空,如果加载为空,则下次调用next方法的时候currentPage不自动+1
    //响应头中有totalSize参数时,则下面两个属性生效
    this.totalSize = -1;// 总共记录数
    this.totalPageSize = -1;// 总共页大小
};
Jhelper.inherits(Jhelper.PageQueryRemote, Jhelper.QueryRemote);
//跳转到第几页
Jhelper.PageQueryRemote.prototype.jump = function (num) {
    this.currentPage = num > 0 ? num : 1;
    this.addParameters("currentPage", this.currentPage);
    this.addParameters("pageSize", this.pageSize);
    this.send();
};
Jhelper.PageQueryRemote.prototype.pre = function () {
    var _nCurrent = this.currentPage - 1;
    if (_nCurrent <= 1) {
        _nCurrent = 1;
    }
    if (this.totalPageSize >= 0) {
        if (_nCurrent > this.totalPageSize) {
            _nCurrent = this.totalPageSize;
        }
    }
    this.jump(_nCurrent);
};
Jhelper.PageQueryRemote.prototype.next = function () {
    var _nCurrent = this.currentPage;
    //如果上次查询为空,则下一页查询不+1
    if (!this.isQueryEmpty) {
        _nCurrent = this.currentPage + 1;
    }
    if (_nCurrent <= 1) {
        _nCurrent = 1;
    }
    this.jump(_nCurrent);
};
Jhelper.PageQueryRemote.prototype.first = function () {
    this.jump(1);
};
Jhelper.PageQueryRemote.prototype.last = function () {
    if (this.totalPageSize >= 0) {
        this.jump(this.totalPageSize);
    }
};
Jhelper.PageQueryRemote.prototype.success = function (data, status, xmlHttpRequest) {
    if (!data || data.trim().length <= 0) {
        this.isQueryEmpty = true;//查询到空元素
        if (this.isQueryEmptyHint) {
            Jhelper.fun.warning("没有更多的记录");
        }
    } else {
        this.isQueryEmpty = false;
    }
    var totalSizeStr = xmlHttpRequest.getResponseHeader("totalSize");
    //如果后端有返回页大小
    if (totalSizeStr && Jhelper.fun.parseInt(totalSizeStr) > 0) {
        this.totalSize = Jhelper.fun.parseInt(totalSizeStr);//总共记录数
        // 页总大小
        var totalPage = this.totalSize / this.pageSize;
        // 计算总共页数
        totalPage = (totalPage === Jhelper.fun.parseInt(totalPage)) ? totalPage
            : Jhelper.fun.parseInt(totalPage) + 1;
        this.totalPageSize = totalPage;
    }
    Jhelper.PageQueryRemote.prototype.constructor.prototype.success.call(this, data, status, xmlHttpRequest);
};

/**
 * json数据远程请求类
 * @param p
 * @constructor
 */
Jhelper.JsonRemote = function (p) {
    p = p || {};
    Jhelper.BaseRemote.call(this, p);
    //*****内部属性*****
    this.sending = false;// 避免用户快速点击多次，向服务器发送多次重复的请求
};
Jhelper.inherits(Jhelper.JsonRemote, Jhelper.BaseRemote);
Jhelper.JsonRemote.prototype.send = function () {
    if (!this.sending) {
        this.sending = true;
        Jhelper.JsonRemote.prototype.constructor.prototype.send.call(this);
    }
};
Jhelper.JsonRemote.prototype.success = function (data, status, xmlHttpRequest) {
    var jsonData = $.parseJSON(data);
    this.onSuccess(jsonData, status, xmlHttpRequest);
};
Jhelper.JsonRemote.prototype.complete = function (xmlHttpRequest, textStatus) {
    this.sending = false;
    Jhelper.JsonRemote.prototype.constructor.prototype.complete.call(this, xmlHttpRequest, textStatus);
};

/**
 * json格式数据扩展请求
 * 后端返回的json对象中没有isSuccess字段或isSuccess字段为true表示请求是否成功
 * 后端返回的json对象中存在isSuccess字段并且isSuccess值为false表示请求失败
 * 请求成功后会执行onSuccess(先执行)或successRedirectUrl(后执行)
 * 请求失败后会执行onError
 */
Jhelper.JsonResultRemote = function (p) {
    p = p || {};
    Jhelper.JsonRemote.call(this, p);
    //成功后跳转的页面,优先级比onSuccess低
    this.successRedirectUrl = p.successRedirectUrl;
    //表示业务成功后回调函数.后端返回的json对象中没有isSuccess字段或isSuccess字段为true则调用此方法,优先级比successRedirectUrl高
    this.onSuccess = p.onSuccess;
    //表示业务失败后的回调函数.后端返回的json对象中的isSuccess字段为false则回调该方法
    this.onError = p.onError;
};
Jhelper.inherits(Jhelper.JsonResultRemote, Jhelper.JsonRemote);
Jhelper.JsonResultRemote.prototype.success = function (data, status, xmlHttpRequest) {
    var jsonData = $.parseJSON(data);
    if (jsonData.isSuccess === undefined || jsonData.isSuccess) {
        if (typeof (this.onSuccess) === "function") {
            this.onSuccess(jsonData, status, xmlHttpRequest);
        }
        if (typeof (this.successRedirectUrl) === "string") {
            location.href = this.successRedirectUrl;
        }
    } else {
        if (typeof (this.onError) === "function") {
            this.onError(jsonData, status, xmlHttpRequest);
        } else {
            if (jsonData.message) {
                Jhelper.fun.warning(jsonData.message);
            }
        }
    }
};

//jquery form扩展
Jhelper.FormRemote = function (p) {
    p = p || {};
    Jhelper.JsonResultRemote.call(this, p);
    this.id = p.id;//form表单的ID
    this.isLoading = p.isLoading === undefined ? true : p.isLoading;//是否显示loading,默认显示
    this.onSubmit = p.onSubmit;//当onSubmit返回false的时候取消提交
    this.successRedirectUrl = p.successRedirectUrl;//成功后跳转的页面,优先级比onSuccess高
};
Jhelper.inherits(Jhelper.FormRemote, Jhelper.JsonResultRemote);
Jhelper.FormRemote.prototype.submit = function () {
    var THIS = this;
    if (typeof (THIS.onSubmit) === "function" && THIS.onSubmit() === false) {
        return;
    }
    var _array = $("#" + THIS.id).serializeArray();
    var params = {};
    for (var i = 0; i < _array.length; i += 1) {
        params[_array[i].name] = _array[i].value;
    }
    $.extend(THIS.params, params);
    THIS.url = $("#" + THIS.id).attr("action");
    THIS.method = $("#" + THIS.id).attr("method");
    THIS.send();//不用form的机制提交,使用JsonRemote机制提交
};

//*****公用全局函数*****
if (typeof (Jhelper.fun) === "undefined" || !Jhelper.fun) {
    Jhelper.fun = {};
}
//判断是否为null
Jhelper.fun.isNull = function (value) {
    if (value === undefined || value === null) {
        return true;
    }
    return false;
};
Jhelper.fun.isNotNull = function (value) {
    return !Jhelper.fun.isNull(value);
};
Jhelper.fun.isEmpty = function (value) {
    if (Jhelper.fun.isNull(value) || value.trim() === "") {
        return true;
    } else {
        return false;
    }
};
Jhelper.fun.parseInt = function (value, radio) {
    return parseInt(value, radio);
};
//判断是否为正整数
Jhelper.fun.isPositiveInteger = function (s) {
    var re = /^[1-9][0-9]*$/;
    return re.test(s)
};

//判断是否为正整数
Jhelper.fun.isInteger = function (s) {
    var re = /^[0-9]+$/;
    return re.test(s)
};

Jhelper.fun.isArray = function (object) {
    return object && typeof object === 'object' &&
        Array == object.constructor;
};
//高级查询参数获取，忽略-1 "-1" "" 3个特殊字符
Jhelper.fun.getQueryValue = function (object) {
    if (Jhelper.fun.isArray(object)) {
        if (object.length === 1 && (object[0] === -1 || object[0] === "-1" || object[0] === "")) {
            return undefined;
        }
    } else {
        if (object === -1 || object === "-1" || object === "") {
            return undefined;
        }
    }
    return object;
};
Jhelper.fun.toString = function (object) {
    if (typeof object == "string") {
        return "\"" + object.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    else if (typeof object == "object") {
        if (!Jhelper.fun.isArray(object)) {
            var o_arr = [];
            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    o_arr.push(i + ":" + Jhelper.fun.toString(object[i]));
                }
            }
            return "{" + o_arr.join() + "}";
        } else {
            var arr = [];
            for (var i = 0; i < object.length; i++) {
                arr.push(Jhelper.fun.toString(object[i]))
            }
            return "[" + arr.join() + "]";
        }
    }
    else if (typeof object == "function") {
        return "function*"
    } else {
        return object;
    }
};
//*****项目定制js部分*****
//项目路径配置
Jhelper.path = "";
Jhelper.loginPath = Jhelper.path + "/login";
//权限处理
$(document).ajaxComplete(function (event, xmlHttpRequest) {
    var flag = xmlHttpRequest.getResponseHeader("sessionstatus");
    if (flag && flag === "NoPermission") {
        Jhelper.fun.warning("没有足够的权限");
    }
    if (flag && flag === "NoLogin") {
        location.href = Jhelper.loginPath;
    }
});
//警告消息-自动消失
Jhelper.fun.warning = function (content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 2
    });
};
//提示消息-自动消失
Jhelper.fun.message = function (content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 2
    });
};
//提示弹框,有确定按钮
Jhelper.fun.alert = function (content, fn) {
    layer.open({
        content: content,
        btn: '我知道了',
        yes: function (index) {
            layer.close(index);
            if (typeof fn === 'function') {
                fn();
            }
        }
    });
};
//打开全屏遮层loading
Jhelper.fun.openLoading = function () {
    return layer.open({type: 2, shade: 'background-color: rgba(0,0,0,.3)'});
};
//关闭全屏遮层loading
Jhelper.fun.closeLoading = function (loadObj) {
    layer.close(loadObj);
};


//*****全局执行的js部分,每个页面都需要执行的js程序*****
//自适应字体,手机网站需要
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth < 640) {
                docEl.style.fontSize = Math.floor(14 * (clientWidth / 320)) + "px";
            } else {
                docEl.style.fontSize = 14 * ( 640 / 320) + "px";
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
