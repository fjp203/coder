var fjp = {};
fjp.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};
fjp.juicer = function(el, data, callback){
	if(el){
		var $tpl = $(el);
		$tpl.after(juicer($tpl.html(), data));
		if(callback) callback();
	}
};

fjp.h = {};
// page相关
fjp.h.normalStyle = {top:'45px',bottom:0};
fjp.h.centerStyle = {top:'45px',bottom:'50px'};
fjp.h.normalPage = function(id, options){
	var opt = $.extend({}, options, fjp.h.normalStyle);
	return fjp.h.page(id, {styles : opt});
};
fjp.h.centerPage = function(id, options){
	var opt = $.extend({}, options, fjp.h.centerStyle);
	return fjp.h.page(id, {styles : opt});
};
fjp.h.page = function(id, options){
	var url = id + '.html';
	
	options.id = id;
	options.url = url;
	return options;
};
fjp.h.indexPage = function(){
	return plus.webview.getWebviewById(plus.runtime.appid);
};
fjp.h.currentPage = function(){
	return plus.webview.currentWebview();
};
fjp.h.getPage = function(id){
	return id ? plus.webview.getWebviewById(id) : null;
};
fjp.h.show = function(id, ani, time, func){
	if(id) plus.webview.show(id, ani, time, func);
};
fjp.h.hide = function(id, ani, time){
	if(id) plus.webview.hide(id, ani, time);
};
fjp.h.fire = function(id, name, values){
	mui.fire(fjp.h.getPage(id), name, values);
};

// 以下为UI封装------------------------------------------------------------------------------
// fjp.h.tip
fjp.h.tip = function(msg, options){
	plus.nativeUI.toast(msg,options);
};

// fjp.h.waiting
fjp.h.waiting = function(titile, options){
	plus.nativeUI.showWaiting(titile, options);
};
fjp.h.closeWaiting = function(){
	plus.nativeUI.closeWaiting();
};

// popover
fjp.h.pop = function(){
	mui('.mui-popover').popover('toggle');
};

// actionsheet
fjp.h.sheet = function(title, btns,func){
	if(title && btns && btns.length > 0){
		var btnArray = [];
		for(var i=0; i<btns.length; i++){
			btnArray.push({title:btns[i]});
		}
		
		plus.nativeUI.actionSheet({
			title : title,
			cancel : '取消',
			buttons : btnArray
		}, function(e){
			if(func) func(e);
		});
	}
};

// 提示框相关
fjp.h.modaloptions = {
	title 	: 'title',
	abtn	: '确定',
	cbtn	: ['确定','取消'],
	content	: 'content'
};
fjp.h.alert = function(options, ok){
	var opt = $.extend({}, fjp.h.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.alert(opt.content, function(e){
		if(ok) ok();
	}, opt.title, opt.abtn);
};
fjp.h.confirm = function(options, ok, cancel){
	var opt = $.extend({}, fjp.h.modaloptions);
	
	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.confirm(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok();
		if(i == 1 && cancel) cancel();
	}, opt.title, opt.cbtn);
};
fjp.h.prompt = function(options, ok, cancel){
	var opt = $.extend({}, fjp.h.modaloptions);
	
	opt.title = '输入内容';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.prompt(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok(e.value);
		if(i == 1 && cancel) cancel(e.value);
	}, opt.title, opt.content, opt.cbtn);
};

// 以下为插件封装------------------------------------------------------------------------------
// 本地存储相关
fjp.h.length = function(){
	return plus.storage.getLength();
	// 获取应用存储区中保存的键值对的个数
};
fjp.h.key = function(i){
	return plus.storage.key(i);
	//获取键值对中指定索引值的key值
};
fjp.h.getItem = function(key){
	if(key){
		for(var i=0; i<fjp.h.length(); i++) {
			if(key == plus.storage.key(i)){
				return plus.storage.getItem(key);
			}
		};
	}
	
	return null;
};
fjp.h.insertItem = function(key, value){
	plus.storage.setItem(key, value);
};
fjp.h.delItem = function(key){
	plus.storage.removeItem(key);
};
fjp.h.clear = function(){
	plus.storage.clear();
};

// web sql
fjp.h.db = function(name, size){
	var db_name = name ? name : 'db_test';
	var db_size = size ? size : 4;
	
	return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
};
fjp.h.update = function(db, sql){
	if(db &&sql){
		db.transaction(function(tx){tx.executeSql(sql);});	
	}
};
fjp.h.query = function(db, sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};

// 以下为功能封装------------------------------------------------------------------------------
// 退出
fjp.h.exit = function(){
	fjp.h.confirm('确定要退出吗？', function(){
		plus.runtime.quit();
	});
};
// 刷新
fjp.h.endDown = function(selector){
	var sel = selector ? selector : '#refreshContainer';
	mui(sel).pullRefresh().endPulldownToRefresh();
};

// init
var db = fjp.h.db();