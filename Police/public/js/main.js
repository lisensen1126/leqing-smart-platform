$(function (){
	var act=$("#act").val();
	if(act == 2){
		util.confirm('您还未激活账户,部分功能关闭,是否前去激活账户?', function () { '/center', 0); });
	}
	if(act == 0){
		util.confirm('您的账户已过期,部分功能关闭,是否前去激活账户?', function () { '/center', 0); });
	}
});