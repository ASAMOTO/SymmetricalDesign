/**
 * jQuery plugin - crossfader.js
 * Version 1
 * jQuery Version 1.7.2
 * http://cutupworks.ldblog.jp/
 *
 * Copyright 2012, Yoshihito Fujiwara
 * MIT License.
 *
 *
 * Date: 2012-04-04
 * Author: Yoshihito Fujiwara
 * E-mail: mpc.sound@gmail.com
 *
 *
 * Capable Browser
 * internet exploer 6 later
 * chrome 17 later
 * Firefox 3.6 later
 * safari 4 later
 *
 *
 *
 */


(function($){
	$.fn.crossfader = function(options){
		
		// option 
		settings = jQuery.extend({
			start: 0,
			speed: 2000,
			interval: 4000,
			imageWrapElement: 'li',
			isLoop: true,
			isRandom: false,
			isController: false,
			controller: '#crossfaderController',
			isFeed: false,
			feedPrev: '#crossfaderPrev',
			feedNext: '#crossfaderNext',
			feedEvent: 'click',
			isPager: false,
			pager: '#crossfaderPager',
			pagerElement: 'li',
			pagerId: 'pager',
			pagerEvent: 'click'
		}, options);
		
		
		// global variable
		var jQueryMatchedObj = this,
			falg = true,
			loop,
			len = $(jQueryMatchedObj).find(settings.imageWrapElement).length;

	
		// initialize 
		function init(){
			$(jQueryMatchedObj).find(settings.imageWrapElement + ':not(:eq('+ settings.start +'))').css({'opacity':'0', 'display': 'block'});
			tween(settings.start);
			if(settings.isLoop) _loop.init();
			if(settings.isController) _controller.init();
			if(settings.isFeed) _feed.event();
			if(settings.isPager) _pager.init(len);
		}
		
		
		// tween
		function tween(n){
			flag = false;
			if(settings.isPager) _pager.active(n);
			
			$(jQueryMatchedObj).find(settings.imageWrapElement + ':not(:eq('+n+'))').fadeTo(settings.speed, 0);
			$(jQueryMatchedObj).find(settings.imageWrapElement + ':eq('+n+')').fadeTo(settings.speed, '1', function(){
				if(settings.isLoop || settings.isController){
					var m = n == $(jQueryMatchedObj).find(settings.imageWrapElement).length-1 ? 0: n+1;
					_loop.startTimer(m);
					if(settings.isController) _controller.start = m;
				}
				
				if(settings.isFeed) _feed.start = n;
				flag = true;
			});
		}
		
		
		var _loop = {
			init: function(){
				loop = true;
			},
			
			startTimer: function(n){
				if(loop){
					if(settings.isRandom){
						this.timer = setTimeout(function(){tween(Math.floor(Math.random() * len))}, settings.interval);
					} else {
						this.timer = setTimeout(function(){tween(n)}, settings.interval);
					}
				}
			},
			
			clearTimer: function(){ clearTimeout(this.timer)}
		}
		
		
		var _pager = {
			init: function(n){
				var target = $(settings.pager).find(settings.pagerElement);
				for(var i= 0; i < n; i++) $(target[i]).attr('id', settings.pagerId + i);
				this.event();
			},
			
			active: function(n){
				$(settings.pager).find('a:eq('+n+')').removeClass('inactive').addClass('active').fadeTo(settings.speed, 1);
				$(settings.pager).find('a:not(:eq('+n+'))').removeClass('active').addClass('inactive').fadeTo(settings.speed, .4);
			},
			
			event: function(){
				$(settings.pager).find('a').bind(settings.pagerEvent, function(){
					if(flag){
						if(settings.isLoop) _loop.clearTimer();
						tween($(settings.pager).find('a').index(this));
					}
					return false;
				});
			}
		}
		
		
		
		var _controller = {
			start: 0,
			init: function(){
				if(settings.isLoop){
					$(settings.controller).append('<a href="#" class="play">Pause</a>');
				} else {
					$(settings.controller).append('<a href="#" class="stop">Play</a>');
				}
				this.event();
			},
			
			event: function(){
				var t = $(settings.controller).find('a');
				$(t).click(function(){
					if($(this).attr('class') == 'play'){
						$(this).text('Play').removeClass('play').addClass('pause');
						_loop.clearTimer();
						loop = false;
					} else {
						$(this).text('Pause').removeClass('pause').addClass('play');
						tween(_controller.start); 
						loop = true;
					}
					return false;
				});
			}
		}
		
		
		var _feed = {
			start: 0,
			event: function(){
				var prev = $(settings.feedPrev).append('<a href="#" class="prev">Prev</a>'),
					next = $(settings.feedNext).append('<a href="#" class="next">Next</a>');
				
				prev.bind(settings.feedEvent, function(){
					if(flag){
						if(settings.isLoop) _loop.clearTimer();
						if(0 < _feed.start) tween(_feed.start-1);
					}
					return false;
				});
				
				next.bind(settings.feedEvent, function(){
					if(flag){
						if(settings.isLoop) _loop.clearTimer();
						if(len > _feed.start+1) tween(_feed.start+1);
					}
					return false;
				});
			}
		}

		return init();
	};
})(jQuery);