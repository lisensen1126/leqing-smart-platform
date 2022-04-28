// JavaScript Document
var vms = {}

//登录逻辑
vms.login = function () {
	var storage = window.localStorage;
	var login_name = '';
	if("yes" == storage["isstorename"]){
		login_name = storage["loginname"];
	}
    var lo_vm = new Vue({
        el: '#lo',
        data: {
            inpPhone: login_name,
            inpPsw: '',
            pictureCode: '',
            pictureValue: '',
            inPsActive: [false, false],
            isOpenEye: true,
            showClearPsw: false,
            showClearPhone: false
        },
        created: function () {
            this.newPicImg();
        },
        methods: {
            loginMain: function () {
                var _self = this;
                var phoneState = util.checkMail(this.inpPhone);
                var pswState = util.checkPsw_login(this.inpPsw);
                //var codeState = _self.pictureValue.toUpperCase() === _self.pictureCode;
                var stateArr = [];
                if (phoneState !== true) {
                    stateArr.push(phoneState);
                }
                if (pswState !== true) {
                    stateArr.push(pswState);
                }
               /* if (codeState !== true) {
                    stateArr.push('图形码不正确');
                    this.newPicImg();
                }*/
                if (phoneState === true && pswState === true) {
                    $.ajax({
                        url: 'loginIn',
                        type: 'POST',
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        data: {
                            'userNo': this.inpPhone,
                            'password': this.inpPsw,
                        }
                    }).done(function (data) {
//                        var data = JSON.parse(data);
                        if (data == '1') {
                            util.toast('登录成功');
							var storage = window.localStorage;
                            storage["loginname"] = $("#login_name").val();
                            storage["isstorename"] =  "yes";
                            setTimeout(function () {
           					 location.href= 'auth/sd11x5';
                            }, 1500);
                        } else if (data == '0') {
                            util.toast('密码错误');
                        }
                    })
                } else {
                    util.toast(stateArr[0]);
                    stateArr = [];
                }
            },
            /*回车事件*/
            enterKey: function (ev) {
                if (ev.keyCode == 13) {
                    this.loginMain();
                }
            },
            contFilter: function (key) {
                util.forceNum.call(this, key);
            },
            inpFocus: function (num) {
                this.inPsActive = [false, false];
                this.inPsActive[num] = true;
                this.showClearPhone = false;
                this.showClearPsw = false;
                if (num === 0) {
                    if (this.inpPhone.length > 0) {
                        this.showClearPhone = true;
                    } else {
                        this.showClearPhone = false;
                    }
                } else if (num === 1) {
                    if (this.inpPsw.length > 0) {
                        this.showClearPsw = true;
                    } else {
                        this.showClearPsw = false;
                    }
                }
            },
            refreshPicture: function () {
                this.newPicImg();
            },
            clearText: function (num) {
                if (num === 0) {
                    this.inpPhone = '';
                    this.showClearPhone = false;
                } else if (num === 1) {
                    this.inpPsw = '';
                    this.showClearPsw = false;
                }
            },
            eyePsw: function () {
                this.isOpenEye = !this.isOpenEye;
            },
            newPicImg: function () {
                var code; //在全局 定义验证码  
                code = new Array();
                var codeLength = 4; //验证码的长度  
                var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
                    'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
                for (var i = 0; i < codeLength; i++) {
                    var charIndex = Math.floor(Math.random() * 32);
                    code += selectChar[charIndex];
                }
                this.pictureCode = code;
            },
            keyUpInp: function (num, key) {
                if (num === 0) {
                    util.forceNum.call(this, key);
                    if (this.inpPhone.length > 0) {
                        this.showClearPhone = true;
                    } else {
                        this.showClearPhone = false;
                    }
                } else if (num === 1) {
                    if (this.inpPsw.length > 0) {
                        this.showClearPsw = true;
                    } else {
                        this.showClearPsw = false;
                    }
                }

            }
        },
    })
}
