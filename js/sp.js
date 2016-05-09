$(function(){
	setBodyClass.init();
	setOrientationChangeEvent();
	setTimeout(doScroll, 100);
});

// 端末やOS、傾きによってクラスを付与
var setBodyClass = {
	init: function(){
		var orientation = this.getOrientation()
			, deviceArr = this.getDeviceName();

		if(deviceArr.length > 0) deviceArr.push(orientation);
		this.setClasses( deviceArr );
		this.setTiltEvent();
	}
	,onTilt:function(){
		var orientation = this.getOrientation()
			, deviceArr = this.getDeviceName();

		if(deviceArr.length > 0) deviceArr.push(orientation);
		this.setClasses( deviceArr );
	}
	,setClasses: function(classes){
		if(classes.length > 0) $('body').attr( 'class', classes.join(' ') );
	}
	,getDeviceName:function(){
		var arr = []
			, device
			,	ua = navigator.userAgent.toLowerCase()
			, uamatch = ua.match(/iphone|ipad|ipod|android/)
			, uastring = String(uamatch);
			
		if(uamatch) {
			arr.push('smartphone');
			arr.push(uastring);
			if ( (uastring == 'ipad') || ( ua.indexOf('android') > -1 && ua.indexOf('mobile') < 0 ) ) arr.push('tablet');
		}
		return arr;	
	}
	,getOrientation: function(){
		var orientation;
		if (window.orientation == 0) {
			orientation = 'portrait';
		} else {
			orientation = 'landscape';
		}
		return orientation;
	}
	,setTiltEvent: function(){
		$(window).resize($.proxy(this,this.onTilt));
	}
}

//強制スクロールをしてツールバーを隠す
var isScroll;
function doScroll() {
	if (window.pageYOffset === 0) { window.scrollTo(0,1); }
	//コンテンツ部分をタップしたらツールバーを隠す
	isScroll = window.pageYOffset === 0 ? false : true;
	if( navigator.userAgent.match(/iPhone|Android|iPod/) ) {
		$(window).bind('scroll',function(){
			var pos = window.pageYOffset;
			if (pos === 0 && isScroll) {
				$('html').bind('touchstart',function(){;
					if(pos === 0) window.scrollTo(0,1);
					isScroll = false;
					$('html').unbind('touchstart');
				});
			} else {
				if(pos !== 0) {
					isScroll = true;
					$('html').unbind('touchstart');
				}
			}			
		});
	}
}
function setOrientationChangeEvent() {
	$(window).bind('orientationchange',function(){
		window.scrollTo(0,1);
		isScroll = false;
		$('html').unbind('touchstart');
	});
}

function onBackScrollPosSet() {
	var pos;
	window.onpagehide = function() {
		pos = window.pageYOffset > 0 ? window.pageYOffset+1 : 1;
	}
	window.onpageshow = function() {
		setTimeout(function(){ window.scrollTo(0,pos); }, 50);
	}	
}
onBackScrollPosSet();
