/**********
sliderFan ver 2.0.
***********
*<div id="slider">
*	<div class="%pic%">
*		<img src="slider/picture_36.jpg" alt=" " />
*		<span class="%pic%_numb">239</span>
*		<span class="%pic%_name">Picture name</span>
*		<span class="%pic%_desc">Picture description</span>
*	</div>
*	<div class="%pic%" />
*	<div class="%pic%" />
*</div>
**********/

(function( $ ){
var slider = {
	index: 1,
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
		nav_cls = o.navCls,
		item_cls = o.naviCls;
		start = o.start - 1;
		
		
		initial = this.each(function(){
			var elem = $(this);
			var num = o.num;
			var elem_pic = $(pic_cls, elem);
			var len = elem_pic.length - 1;
			var slide = o.start - 1;
			
			//generate navigation
			if (o.nav){
				var nav_id = o.navId + '-' + slider.index;
				
				elem.append('<ul class="' + nav_cls + '" id="' + nav_id + '" />');
				elem.on('click', '#' + nav_id + ' .' + item_cls + ' a', function(){
					slide = $(this).parent().index();
					slider.action(elem, slide, nav_id);
					slider.pause(elem, slide, len, nav_id);
					slide++;
					return false;
				});
				slider.index++;
			}
			elem.append('<div class="positions"><a href="#prev" class="prev">prev</a><a href="#next" class="next">next</a></div>')
			elem.on('click', '.positions a', function(){
				dir = $(this).attr('href').substr(1);
				switch (dir) {
					case 'next':
						slide == 0 ? slide = 1 : slide;
						slide > len ? slide = 0 : slide;
						slide = (slide-1) == len ? 0 : slide;
						//if (slide > len) {slide = 0; console.log(slide);}
						break
					case 'prev':
						slide = slide-1 == 0 ? len : slide-2;
						slide > len ? slide = len-1 : slide;
						//if (slide > len) {slide = len-1; console.log(slide);}
						break;
				}
				slider.action(elem, slide, nav_id);
				slider.pause(elem, slide, len, nav_id);
				slide++
				return false;
			});
			
			for (n=0; n <= len; n++){
				$is = $(elem_pic[n]);
				src = $('img', $is).attr('src');
				
				$is.addClass('pic-' + num).hide();
				if (o.nav) {
					if (!o.navCall){
						$('#' + nav_id).append('<li class="' + item_cls + '"><a href="#pic-' + num + '">' + num + '</a></li>');
					} else {
						o.navCall(num, nav_id);
					}
				}
				num++
			}
			
			slider.start(elem, slide, len, nav_id);//start slider
			
			if (o.sliderCall) o.sliderCall();//additional callback
			
			if (o.autoplay){//autoplay start
				var playInterval = setInterval(function() {
					togg = slider.action(elem, slide, nav_id);
					if (slide < len){
						togg;
						slide++
					} else {
						slide = len;
						togg;
						slide = 0;
					}
				}, o.interval);
				elem.data('interval', playInterval);
			}
			
		});
		
		return initial;
	},
	start : function(_ob, _sd, _ln, _nv){
		_sd = (_sd < 0) ? 0 : _sd;
		_sd = (_sd > _ln) ? _ln : _sd;
		
		$(pic_cls + ':eq(' + _sd + ')', _ob).show();
		slider.intro(_ob, _sd);
		if (o.nav) slider.active(_sd, _nv);
	},
	action : function(_ob, _sd, _nv){
		$(pic_cls + ':eq(' + _sd + ')', _ob).fadeIn(600, slider.intro(_ob, _sd)).siblings(pic_cls + ':visible').fadeOut(600);
		if (o.nav) slider.active(_sd, _nv);
	},
	active: function(_sd, _nv){
		$('.' + item_cls + ':eq(' + _sd + ')', '#' + _nv).addClass(act_cls).siblings().removeClass(act_cls);
	},
	intro : function(_ob, _sd){
		$box = $(pic_cls + ':eq(' + _sd + ')', _ob),
		numb = $(pic_cls + '_numb', $box).text(),
		name = $(pic_cls + '_name', $box).text(),
		desc = $(pic_cls + '_desc', $box).text();
		$(text_box + ' b', _ob).text(numb + '.');
		$(text_box + ' span', _ob).text(name);
		$(text_box + ' i', _ob).text(desc);
		
		if(o.infoCall) o.infoCall();
	},
	pause : function(_ob, _sd, _ln, _nv){
		if (o.autoplay){
			clearTimeout(_ob.data('pause'));
			clearInterval(_ob.data('interval'));
			pauseTimeout = setTimeout(function() {
				clearTimeout(_ob.data('pause'));
				playInterval = setInterval(function() {
					togg = slider.action(_ob, _sd, _nv);
					if (_sd < _ln){
						togg;
						_sd++
					} else {
						_sd = _ln;
						togg;
						_sd = 0;
					}
				}, o.interval);
				_ob.data('interval', playInterval);
			}, o.pause);
			_ob.data('pause', pauseTimeout);
		}
	}
};
$.fn.sliderFan = function( _method ) {
	if (slider[ _method ]) return slider[ _method ].apply(this, Array.prototype.slice.call(arguments, 1));
	else if (typeof _method === 'object' || ! _method) return slider.init.apply(this, arguments);
	else $.error('Method ' +  _method + ' does not exist on $.sliderFan');
};
})( jQuery );