// JavaScript Document
$(function(){

	var obj = $('.slider').bxSlider({	/* onSlideAfter用宣言 */
        slideWidth: 960, /* ひとつのスライドの幅 */
        slideMargin: 0, /* スライド同士の間隔 */
        minSlides: 1, /* 最少表示数 */
        maxSlides: 3, /* 最大表示数 */
        moveSlides: 1, /* 一度の切り替え枚数 */
        auto: true, /* 自動スタート */
		autoHover: true, /* マウスホバーで停止 */
        speed: 1500, /* 切り替えスピード */
		pause: 4000, /* 切り替え間隔 */
        pager: true, /* 何ページ目か表示 */
		pagerCustom: '#pager',
		controls: true, /*  前へ次へ表示 */
        nextSelector: '#nextSlider', /* 次へボタン */
        prevSelector: '#prevSlider', /* 前へボタン */
        nextText: '&nbsp;', /* テキスト疑似非表示（スペース） */
        prevText: '&nbsp;', /* テキスト疑似非表示（スペース） */
		onSlideAfter: function () { obj.startAuto(); }, /* controls押した後も動作 */
		onSliderLoad:function(){
			// 表示(alphaで設定)
			$(".slider").css({"opacity" : "1"});
		}
    });
	
});
