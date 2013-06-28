$(function(){
		//FANCIES
		lock = 0;//lock ajax load
		$('.gallery_box a[rel="gal"]').fancybox({
			nextEffect: 'fade',
			prevEffect: 'fade',
			padding: 0,
			maxWidth: 1200,
			helpers: {
				thumbs: {width:	35, height: 35, position: 'top'}
			},
			afterLoad: function(){
				this.outer.prepend('<div class="comments" onclick="$.fancybox.close();lock=1">+</div>');
			},
			afterClose: function(){
				wFancy = this.outer.parents('.fancybox-wrap').width();
				if(lock){
					$.fancybox.reposition();
					this.element.parents('li').find('a.comm').trigger('click');
					lock = 0;
				}
			}
		});
		
		$('.gallery_box a[rel="ajax"]').fancybox({
			nextEffect: 'none',
			prevEffect: 'none',
			autoSize:	false,
			height: 'auto',
			maxWidth: 1200,
			padding: 0,
			fitToView: false,
			scrolling: 'no',
			type: 'ajax',
			wrapCSS: 'edit_mode',
			arrows: true,
			ajax: { dataType: 'html' },
			beforeLoad: function(){
				if(!window.wFancy) wFancy = '100%';
				this.width = wFancy;
			},
			beforeShow: function(){
				img = this.element.data().pic;
				//this.inner.find('img').attr('src', img);//подставляем картинку
				out = hov = 1;
				res = 1;
				$.fancybox.update();
			},
			afterLoad: function(){
				this.outer.prepend('<div class="comments back" onclick="$.fancybox.close();lock=1">&larr;</div>');
			},
			afterShow: function(){
				$.getJSON('noteboxes.json', met.render);//получаем данные о подписях
			},
			afterClose: function(){
				if(lock){
					//$.fancybox.reposition();
					this.element.parents('li').find('a.pic').trigger('click');
					lock = 0;
				}
			},
			onUpdate: function(){
				met.init();
			},
			helpers: {
				thumbs: {
					width:	35, height: 35, position: 'top',
					source: function(el){
						return el.element.parents('li').find('img').attr('src');
					}
				}
			}
		});
		met.edit();
});
var met = {
	init: function(){// размеры области редактирования
		$zone = $( _zone ),
		imgX = $zone.offset().left,
		imgY = $zone.offset().top,
		imgH = $zone.height(),
		imgW = $zone.width();
	},
	position: function(_w, _h){
		rat_x = (_w/note_x),
		rat_y = (_h/note_y),
		rat_x = Math.floor(rat_x*100)/100,
		rat_y = Math.floor(rat_y*100)/100;
	},
	sides: function(_w, _h){
		rat_w = (_w/note_w);
		rat_h = (_h/note_h);
		rat_w = Math.floor(rat_w*100)/100;
		rat_h = Math.floor(rat_h*100)/100;
	},
	inImg: function(){
		if (out && hov){
			//$('.note-box').css('opacity',0).show().animate({'opacity':1}, 800);
			$('.note-box').addClass('visible');
			hov = 0;
		}
	},
	outImg: function(){
		if (out && !hov) {
			//$('.note-box').animate({'opacity':0}, 400);
			$('.note-box').removeClass('visible');
			hov = 1;
		}
	},
	blocks: function(){
		clicked = 0;
		out = 1;
		$('.button.add').show().next().hide();//показываем кнопку и скрываем кнопку отмены
		$('.note-box .carma').show().carma();//показываем и запускаем карму
	},
	render: function(_data){
		met.init();//инициализируем размеры
		//рендерим подписи
		for (var i = 0; i < _data.length; i++) {
			var p = _data[i],
				nW = Math.round(imgW/p.width),
				nH = Math.round(imgH/p.height),
				nX = Math.round(imgW/p.x),
				nY = Math.round(imgH/p.y);
			$zone.append('<div class="' + _note + '" id="note' + i + '">\
							<div class="box"/>\
							<div class="note"><span>' + p.text + '</span></div>\
							<div class="carma">\
								<a href="javascript:void(0);" class="minus">&minus;</a>\
								<a href="javascript:void(0);" class="plus">+</a>\
								<span/>\
								<input type="hidden" value="0" name="carma' + i + '" />\
							</div>\
						</div>');
			$('#note' + i, $zone).css({width: nW, height: nH, left: nX, top: nY });//, display: 'block'
		}
		$('.carma', $zone).carma();//запускаем карму
		//hov = 0;
	},
	edit: function(){
		$d = $(document),
		_zone = '.img_edit',
		_note = 'note-box',
		_scroll = '.fancybox-overlay';
		
		//запускаем режим создания комментария
		$d.on('click','.button.add', function(){
			met.inImg(); //делаем все комментарии видимыми
			$zone = $( _zone );
			$o = $( _scroll );
			clicked = 1;
			out = resize = tool = 0;
			
			$zone.append('<div class="' + _note + ' new"><div class="box" /></div>');
			//включаем добавление комментария
			$d.on('mousemove.edit', _zone, function(e){
				$nbox = $('.' + _note + '.new');
				sLeft = $o.scrollLeft(),
				sTop = $o.scrollTop(),
				xPos = e.pageX - imgX + sLeft,
				yPos = e.pageY - imgY + sTop;
				
				$nbox.css({'left':xPos,'top':yPos,'display':'block'})
				.resizable({
					handles	:	'se',
					maxHeight:	200,
					maxWidth:	200,
					containment: _zone,
					create: function() {
						note_w = note_h = 50;
						met.sides(imgW, imgH);
						//console.log($(this).parent().data().ratio.ratio_w);
					},
					start: function(){
						resize = 1;
					},
					stop: function(e, ui) {
						$el = ui.element;
						if (ui.size.width < 50) $el.width(50) ;
						if (ui.size.height < 50) $el.height(50);
						note_w = $el.width();//ui.size.width;
						note_h = $el.height();//ui.size.height;
						met.sides(imgW, imgH);
					}
				});//устанавливаем resizable
				$d.on('mousedown.edit', _zone, function(){
					$d.off('mousemove.edit');
					if (clicked){
						$nbox.css({'left':xPos,'top':yPos})
						.draggable({
							containment: _zone,
							cursor: 'move',
							snap: true,
							snapMode: 'outer',
							create: function() {
								note_x = $(this).position().left,
								note_y = $(this).position().top;
								met.position(imgW, imgH);
							},
							stop: function(e, ui) {
								note_x = ui.position.left,
								note_y = ui.position.top;
								met.position(imgW, imgH);
							}
						});
						clicked = 0;
					}
				});
				
			});
			$d.on('mouseup.edit', _zone, function(){
				$nbox = $('.' + _note + '.new');
				if (!tool) {
					$nbox.append('<div class="tool"><textarea name="note"/><span>Сохранить</span><b>х</b></div>');
					tool = 1
				}
				if (!resize){
					$nbox.animate({'width':50,'height':50});
					resize = 1;
				}
			});
			$(this).hide();//скрываем эту кнопку
			$('.button.del').show();// и показываем "отменить"
			$('.' + _note + ' .carma').hide();//скрываем карму
		});
		
		//$d.on('mouseenter.hover', _zone, met.inImg);
		//$d.on('mouseleave.hover', _zone, met.outImg);
		
		//сохраняем комментарий
		$d.on('click', '.' + _note + '.new .tool span', function(){
			$this = $(this);
			txt = $this.prev().val();
			$.ajax({
				type: "GET",
				//url: 'http://3fan.ru/',
				dataType: 'html',
				data: { // данные о соотношенях; текст
					width: rat_w,
					height: rat_h,
					x: rat_x,
					y: rat_y,
					text: txt,
					codename: $('.gallery_box').data().code
				},
				success: function(){
					$this.parents('.' + _note).removeClass('new')
					.draggable("destroy").append('<div class="note"><span>' + txt + '</span></div>')
					.resizable("destroy");
					//добавляем карму в созданный комментарий
					$this.parent().after('<div class="carma">\
											<a href="javascript:void(0);" class="minus">&minus;</a>\
											<a href="javascript:void(0);" class="plus">+</a>\
											<span></span>\
											<input type="hidden" value="0" name="carma2" />\
										</div>');
					$this.parent().remove();//удаляем textarea
					met.blocks();//проводим манипуляции с блоками
					met.outImg();
				}
			});
		});
		//отменяем добавление комментария
		$d.on('click','.' + _note + ' .tool b, .button.del',function(){
			$('.' + _note + '.new').remove();
			met.blocks();
			if ($(this).hasClass('del')){
				hov = 0;
				met.outImg();
			}
		});
	}
};
/**
	CARMA
**/
(function($){
	var acts = {
		color: function(_is){
			if(_is.find('input[type="hidden"]').val() < 0){
				_is.parent().addClass('mn');
			} else if(_is.find('input[type="hidden"]').val() > 5){
				_is.parent().addClass('pl');
			} else {
				_is.parent().removeClass('mn').removeClass('pl');
			}
		},
		change: function(_val, _inp){
			var sum = parseInt(_inp.val())+parseInt(_val);
			_inp.val()=="NaN" ? sum = 0 : sum;
			_inp.val(sum);
		},
		prints: function(_inp){
			_inp.prev('span').text(_inp.val());
		}
	}
	$.fn.carma = function(){
		return this.each(function(){
			var input = $(this).find('input[type="hidden"]');
				$is = $(this);
			acts.prints(input);
			acts.color($is);
			if (input.val() == "NaN"){
				input.val('0');
				acts.prints(input);
				acts.color($is);
			}
			$is.on('click', '.minus', function(){
				acts.change(-1, input);
				acts.prints(input);
				acts.color($(this).parent());
			});
			$is.on('click', '.plus', function(){
				acts.change(1, input);
				acts.prints(input);
				acts.color($(this).parent());
			});
		});
	}
})(jQuery);