/**********
sliderFan ver 2.0.
***********
<div id="slider">
	<div class="%pic%">
		<img src="slider/picture_36.jpg" alt=" " />
		<span class="%pic%_numb">239</span>
		<span class="%pic%_name">Picture name</span>
		<span class="%pic%_desc">Picture description</span>
	</div>
	<div class="%pic%" />
	<div class="%pic%" />
</div>
**********/

(function( $ ){
var slider = {
	init : function(options){
		defaults = {
			num: 0,
			slide: 0,
			autoplay: 1,
			navcenter: 0,
			interval: 4000,
			pause: 8000,
			slideCls: 'pic',
			infoboxCls: 'pic_info',
			actCls: 'active',
			navId: 'navigation',
			nav: 1,
			navCall: false,
			infoCall: false
		}
		o = $.extend(defaults, options, {});
		
		num = o.num,
		slide = o.slide,
		play = o.autoplay,
		navcenter = o.navcenter,
		slidetime = o.interval,
		slidepause = o.pause,
		pic = '.' + o.slideCls,
		act_cls = o.actCls,
		text_box = '.' + o.infoboxCls,
		nav_id = o.navId,
		nav = o.nav;
			
		return this.each(function(){
			elem = $(this);
			elem_pic = $(pic, this);
			//generate navigation
			if (nav){
				elem.append('<ul class="mb_thumbs clearfix" id="' + nav_id + '"></ul>');
				elem_pic.each(function(){
					$is = $(this),
					src = $('img', this).attr('src');
					$is.attr('id','pic-' + num);
					
					if(!o.navCall){
						$('#' + nav_id).append('<li><a href="#pic-' + num + '">' + num + '</a></li>');
					} else {
						o.navCall.call(this);
					}
					
					num++
				});
				$('#' + nav_id + ' li a').click(function(){
					slide = $(this).parent().index();
					slider.action(this);
					slider.pause();
					slide++;
					return false;
				});
			}
			//start slider
			slider.start();
			slider.intro(':first');
			
			//align-center navigation
			if (navcenter && nav){
				slider.navwidth();
			}
			//autoplay start
			if (play){
				playInterval = setInterval(function() {
					slider.autoplay();
				}, slidetime);
				elem.data('interval', playInterval);
			}
		});
	},
	start : function(){
		$('#' + nav_id + ' li:eq(0)').addClass(act_cls);
		elem_pic = $(pic + ':eq(0)', elem).show();
	},
	action : function(obj){
		pic_id = $(obj).attr('href');	
		$(obj).parent().addClass(act_cls).siblings().removeClass(act_cls);
		$(pic_id, elem).fadeIn(600, slider.intro(pic_id)).siblings(pic + ':visible').fadeOut(600);
	},
	intro : function(atr){
		$box = $(pic + atr, elem),
		numb = $(pic + '_numb', $box).text(),
		name = $(pic + '_name', $box).text(),
		desc = $(pic + '_desc', $box).text();
		$(text_box + ' b').text(numb + '.');
		$(text_box + ' span').text(name);
		$(text_box + ' i').text(desc);
		
		if(o.infoCall) o.infoCall();
	},
	navwidth : function(){
		li_w = $('#' + nav_id + ' li').outerWidth(true),
		li_num = num;
		$('#' + nav_id).css({'width':li_num*li_w, 'margin-left':(-li_num*li_w)/2});
	},
	pause : function(){
		if (play){
			clearTimeout(elem.data('pause'));
			clearInterval(elem.data('interval'));
			pauseTimeout = setTimeout(function() {
				clearTimeout(elem.data('pause'));
				playInterval = setInterval(function() {
					slider.autoplay();
				}, slidetime);
				elem.data('interval',playInterval);
			},slidepause);
			//console.log('sec');
			elem.data('pause',pauseTimeout);
		}
	},
	autoplay : function(){
		pos = num - 1;
		//console.log(slide,pos);
		if (slide < pos){
			slider.action($('#' + nav_id + ' li:eq('+slide+') a'));
			slide++
		} else {
			slide = pos;
			slider.action($('#' + nav_id + ' li:eq('+slide+') a'));
			slide = 0;
		}
	}
};
$.fn.sliderFan = function( method ) {
		if (slider[ method ]) return slider[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || ! method) return slider.init.apply(this, arguments);
		else $.error('Method ' +  method + ' does not exist on $.sliderFan'); 
};
})( jQuery );