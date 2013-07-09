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
			num: 1,
			start: 1,
			autoplay: true,
			navcenter: false,
			interval: 4000,
			pause: 8000,
			slideCls: 'pic',
			infoboxCls: 'pic_info',
			actCls: 'active',
			navId: 'navigation',
			navCls: 'navigation',
			naviCls: 'item',
			nav: true,
			navCall: false,
			sliderCall: false,
			infoCall: false
		}
		o = $.extend(defaults, options, {});
		
		pic_cls = '.' + o.slideCls,
		act_cls = o.actCls,
		text_box = '.' + o.infoboxCls,
		//nav_id = o.navId,
		nav_cls = o.navCls,
		item_cls = o.naviCls;
		
		return this.each(function(i){
			num = o.num,
			slide = o.start - 1,
			elem = $(this),
			elem_pic = $(pic_cls, this),
			len = elem_pic.length - 1;
			
			//generate navigation
			if (o.nav){
				nav_id = o.navId + '-' + (i+1);
				elem.append('<ul class="' + nav_cls + '" id="' + nav_id + '" />');
				$('#' + nav_id).on('click', '.' + item_cls + ' a', function(){
					slide = $(this).parent().index();
					slider.action();
					slider.pause();
					slide++;
					return false;
				});
			}
			for (n=0; n <= len; n++){
				$is = $(elem_pic[n]),
				src = $('img', $is).attr('src');
				//$is.attr('id','pic-' + num);
				$is.addClass('pic-' + num);
				if (o.nav) {
					if (!o.navCall){
						$('#' + nav_id).append('<li class="' + item_cls + '"><a href="#pic-' + num + '">' + num + '</a></li>');
					} else {
						o.navCall.call(this);
					}
				}
				num++
			}
			//start slider
			slider.start();
			//additional callback
			if (o.sliderCall) o.sliderCall();
			//autoplay start
			if (o.autoplay){
				playInterval = setInterval(function() {
					slider.autoplay();
				}, o.interval);
				elem.data('interval', playInterval);
			}
		});
	},
	start : function(){
		//console.log(elem);
		slide = (slide < 0) ? 0 : slide;
		slide = (slide > len) ? len : slide;
		
		$(pic_cls + ':eq(' + slide + ')', elem).show();
		slider.intro();
		if (o.nav){
			$('#' + nav_id + ' .' + item_cls + ':eq(' + slide + ')').addClass(act_cls);
		}
	},
	action : function(){
		$(pic_cls + ':eq(' + slide + ')', elem).fadeIn(600, slider.intro()).siblings(pic_cls + ':visible').fadeOut(600);
		if (o.nav){
			$('.' + item_cls + ':eq(' + slide + ')', '#' + nav_id).addClass(act_cls).siblings().removeClass(act_cls);
		}
	},
	intro : function(){
		$box = $(pic_cls + ':eq(' + slide + ')', elem),
		numb = $(pic_cls + '_numb', $box).text(),
		name = $(pic_cls + '_name', $box).text(),
		desc = $(pic_cls + '_desc', $box).text();
		$(text_box + ' b', elem).text(numb + '.');
		$(text_box + ' span', elem).text(name);
		$(text_box + ' i', elem).text(desc);
		
		if(o.infoCall) o.infoCall();
	},
	pause : function(){
		if (o.autoplay){
			clearTimeout(elem.data('pause'));
			clearInterval(elem.data('interval'));
			pauseTimeout = setTimeout(function() {
				clearTimeout(elem.data('pause'));
				playInterval = setInterval(function() {
					slider.autoplay();
				}, o.interval);
				elem.data('interval', playInterval);
			}, o.pause);
			elem.data('pause', pauseTimeout);
		}
	},
	autoplay : function(){
			if (slide < len){
				slider.action();
				slide++
			} else {
				slide = len;
				slider.action();
				slide = 0;
			}
	}
};
$.fn.sliderFan = function( _method ) {
		if (slider[ _method ]) return slider[ _method ].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof _method === 'object' || ! _method) return slider.init.apply(this, arguments);
		else $.error('Method ' +  _method + ' does not exist on $.sliderFan');
};
})( jQuery );