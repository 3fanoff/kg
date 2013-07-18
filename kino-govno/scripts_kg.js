jQuery(function(){
	$('.n_i_t').hover(function(){
		if($('.like', $(this)).length == 0){
			$('.socials', $(this)).append('<div class="like l-tw"><i class="l-ico"></i><span class="l-count"></span></div>\
                        				<div class="like l-fb"><i class="l-ico"></i><span class="l-count"></span></div>\
                        				<div class="like l-vk"><i class="l-ico"></i><span class="l-count"></span></div>');
			$('.like', $(this)).socialButton({
				selectors: {
					shareTitle: 'a:first',
					shareSumary: 'a:first',
					shareImages: 'a:first img'
				}
			});
		}
	});
	commentsOdd();
	/***  CONFIG_BOXES ***/
	selectBox();
	var cols = '.ten_col1, .ten_col3'
	$(cols).actionboxes().sortable({
			connectWith: cols,
			handle: 'h2',
			opacity: 0.7,
			distance: 20,
			cursor: 'move',
			tolerance:'pointer',
			placeholder: 'place-col'
	});
	/***  CONFIG_TAGS ***/
	$('.tag_zone ul.tags').sortable({
		connectWith: '.tag_zone ul.tags',
		handle:	'span',
		cursor:	'move',
		containment: '#tag_filter',
		tolerance:'pointer',
		placeholder: 'place',
		receive: function() {
			meta.empty('.tag_zone');
			meta.deleted();
			meta.outset($(this).parents('.news_box'));
			meta.visual();
		}
	});
	$('.tag_zone').on('click','li .close', meta.closed);
	meta.init();
	/***  CONFIG_NEWS ***/
	$('.settings').click(function(){
		var cls_tip = '.tooltip_gr',
			act = 'active',
			set_cls = 'set_act',
			$parent = $('.ten_col2_content'),
			$is = $(this);
		showPopup(act, cls_tip, $is);
		$('.' + tooltip.cls).slideUp(100, tooltip.force);
		if($is.hasClass(act)){
			$parent.addClass(set_cls);
		} else {
			$parent.removeClass(set_cls);
		}
		$is.prev(cls_tip).append($('form[name="news_settings"]'));
		meta.insert($is);
		meta.visual();
	}).hover(function(){
		tooltip.add.call(this,'Фильтр вывода новостей','right');
	}, tooltip.del);
	
	$('.help_tool').click(function(){
		$is = $(this);
		$is.prev().append($('#help_tool'));
		showPopup('active','.tooltip_gr', $is);
	});
	$('i, span','.news_shares').click(function(e){
		e.stopPropagation();
		$is = $(this);
		$('.tooltip_shares').hide();
		$is.parent().find('.tooltip_shares').show();
	});
	$('body').click(function(){
		if($('.tooltip_shares:visible')) $('.tooltip_shares').hide();
	});
	$('.news_shares').click(function(e){
		e.stopPropagation();
	});
	$('.news_shares').on('click','.close',function(){
		$(this).parents('.tooltip_shares').hide();
	});
	
	/* tooltips */
	$('.news_box_hidden .count').hover(function(){
		tooltip.add.call(this,'Показать новость и комментарии');
	}, tooltip.del);
	$('.news_box .count').hover(function(){
		tooltip.add.call(this,'Комментарии');
	}, tooltip.del);
	$('.auth_block .options').hover(function(){
		tooltip.add.call(this,'Настройки','right');
	}, tooltip.del);
	/* /tooltips */
	
	/* Add comment forms */
	if($('#text_comm').length > 0) $('#text_comm').autoResize({extraSpace:16});
	inputFlash('flash','nofocus');
	disSubmit('text_comm','add_comm');
	/* /Add comment forms */
	
	$('.toggler').toggler({
		zones		: [{'z1':0},{'z2':110},{'z3':220}],
		zoneNames	: ['Показывать все','Только важные','Не показывать'],
		step		: 55,
		onClick		: function(cls, val){
			if(val == 3){
				$('.news_box.' + cls).addClass(cls + '_opacity');
			} else {
				$('.news_box.' + cls).removeClass(cls + '_opacity');
			}
		}
	});
});

/* TOGGLER ver. 1.0. 
	for auto-create:
	<div class="%class%" data-name="%input_name%" data-val="%input_checked(only number)%"></div>
*/
(function( $ ){
	$.fn.toggler = function(options){
		var def = {
			speedmoving : 400,
			speedstart 	: 200,
			activate	: '.settings',
			activateon	: 'click',
			buttonCls	: 'button',
			zoneCls		: 'zone',
			zones		: [{'z1':0},{'z2':40},{'z3':80}],
			names		: 1,
			zoneNames	: ['один','два','три'],
			step		: 20,	// halfzone
			input		: 'radio',
			autocreate	: 1,
			onClick		: function(){}
		};
		var o = $.extend(def, options, {}),
			$d = $(document),
			zone = '.' + o.zoneCls,
			button = '.' + o.buttonCls,
			zone_arr = o.zones,
			zone_name = o.zoneNames,
			inp_type = 'input[type="' + o.input + '"]',
			check = 'checked';
			
		init_func = function(_is){
			var	name = _is.data('name'),
				hold = _is.data('val');
			for (var i = 0; i < zone_arr.length; i++) {
				$.each(zone_arr[i], function(cls, pos) {
					_is.append('<div class="' + o.zoneCls + ' ' + cls + '" style="left: ' + pos + 'px">\
						<input type="' + o.input + '" value="' + (i+1) + '" name="' + name + '"/>\
					</div>');
					if(o.names){
						_is.find('div.' + o.zoneCls + ':eq(' + i + ')').append('<span>' + zone_name[i] + '</span>');
					}
				});
			}
			if(hold){
				_is.find('input[value="' + hold + '"]').attr(check, true).parent().addClass(check);
			}
			_is.prepend('<a class="' + o.buttonCls + '" href="javascript:void(0);"></a>');
		}
		
		click_func = function(){
			_is = $(this);
			$radio = _is.find(inp_type);
			posBtn = _is.position().left;
			$togg = _is.parent();
				
			$togg.find(inp_type).removeAttr(check).parent().removeClass(check);
			$radio.attr(check, true).parent().addClass(check);
			getPosition($togg, posBtn, o.speedmoving);
			getParams();
		}
		
		move_func = function(_is, _btn){
			var posTrig = _is.offset().left;
			if (posCur <= (posTrig + xGap)){
				xPos = 0;
			} else if (posCur >= (posTrig + lastVal + xGap)){
				xPos = lastVal;
			} else {
				xPos = posCur - posTrig - xGap;
			}
			_btn.css({'left': xPos});
		}
		
		endPosition = function(_is, _btn){
			var posBtn = _btn.position().left;
			for (var i = 0; i < zone_arr.length; i++) {
				$.each(zone_arr[i], function(cls, val) {
					if ((val + o.step) >= posBtn && (val - o.step) <= posBtn){
						_btn.animate({'left': val}, o.speedstart);
						_is.find(inp_type).removeAttr(check).parent().removeClass(check);
						$('.' + cls + ' ' + inp_type, _is).attr(check, true).parent().addClass(check);
						$radio = $('.' + cls + ' ' + inp_type, _is);
						getParams();
					}
				});
			}
		}
		
		startPosition = function(_is){
			posBtn = 0;
			$(inp_type, _is).each(function(){
				if($(this).attr(check) == check){
					posBtn = $(this).parent().position().left;
				}
			});
			getPosition(_is, posBtn, o.speedstart);
		}
		
		getPosition = function(_obj, posX, speed){
			_obj.find(button).animate({'left': posX}, speed);
		}
		
		getParams = function(){
			name = $radio.attr('name');
			val = $radio.val();
			id = $radio.attr('id');
			
			if (o.onClick) o.onClick.call(this,name,val,id);
		}
		
		lastZone = function(){
			var	l_obj = zone_arr.length - 1;
				l_arr = zone_arr[l_obj];
			for (var key in l_arr) {
    			lastVal = l_arr[key];
			}
		}
		
		return this.each(function(){
			var $is = $(this);
			if (o.autocreate) init_func($is);
			var	$btn = $is.find(button);
				clicked = 0;
			lastZone();
			$d.on(o.activateon, o.activate, function(){
				startPosition($is);
			});
			$is.on('click', zone, click_func);
			$is.on('mousedown', button, function(e){
				clicked = 1,
				xDown = e.pageX,
				xBtn = $btn.offset().left,
				xGap = (xDown - xBtn);
				$d.bind('mousemove.togg', function(e){	
					posCur = e.pageX;
					move_func($is, $btn);
				});
				return false
			});
			$is.on('mouseup mouseleave', button, function(){
				if(clicked){
					$d.unbind('mousemove.togg');
					endPosition($is, $btn);
					clicked = 0;
				}
			});
		});
	}
})( jQuery );

/* ACTIONBOX ver. 1.0. */
(function($){
	var el = 'blist',
		tip_cls = 'tooltip_del',
		holder = 'placeholder',
		action = 'Добавление блока';
	var methods = {
		init: function(){
			return this.each(function(){
				is = $(this);
				is.on('click', '.options_box .close', methods.removeAct);
				is.on('click', '.addblock_box', methods.addAct);
			});
		},
		removeAct: function(){
			methods.delTooltip();
			$(this).after('<div class="' + tip_cls + '">\
							<span class="hideblock btn yes">Скрыть этот блок</span>&nbsp;<span class="abort btn no">Отмена</span>\
						</div>');
			$('.' + tip_cls + ' .yes').click(methods.removeBox);
			$('.' + tip_cls + ' .no').click(methods.delTooltip);
		},
		addAct: function(){
			is = $(this);
			methods.delTooltip();
			is.after('<div class="' + tip_cls + ' add" />');
			$.getJSON('options.json', function(data){
				obj = is.next('.' + tip_cls);
				$.each(data, function (i, item) {
					obj.append('<option value="' + item.value + '">' + item.text + '</option>');
				});
				obj.prepend('<option disabled selected>' + action + '</option>').wrapInner('<select class="styled">');
				obj.prepend('<div class="hide"></div>');
				selectBox();//start select's customization script
			});
			$('.' + tip_cls).on('click', '.hide', methods.delTooltip);
			$('.' + tip_cls).on('change', 'select', function(){
				is = $(this);
				elem_id = is.find('option:selected').val();
				methods.addBox(is,elem_id);
			});
		},
		removeBox: function(){
			is = $(this);
			$.ajax({
				dataType:'html',//temp
  				success: function(){
					var elem = is.parents('.' + el),
						posY = elem.outerHeight(true);
					elem.after('<div class="' + holder + '" />');
					elem.next().css('height',posY);
					elem.hide().next().animate({'height':0}, 'slow', function(){
						elem.remove();
						$(this).remove();
					});
  				}
			});
		},
		addBox: function(is,elem_id){
			$.ajax({
				url: 'http://3fan.ru/cityjam/kino-govno/block.html',
				dataType: 'html',
				dataFilter: function(data){
					content = $(data).find('#' + elem_id).html();
					content = '<div class="' + el + ' redesign_border" id="' + elem_id + '">' + content + '</div>';
				},
				success: function(){
					elem = is.parents('.' + el);
					elem.after(content);
					posY = $('#' + elem_id).outerHeight(true);
					$('#' + elem_id).hide().after('<div class="' + holder + ' ' + elem_id + '" />');
					$('.' + holder + '.' + elem_id).animate({'height':posY}, 'slow', function(){
						$(this).prev().fadeIn();
						$(this).remove();
					});
					methods.delTooltip();
				}
			});
		},
		delTooltip: function(){
			$('.' + el).find('.' + tip_cls).remove();
		}
	};
	$.fn.actionboxes = function(method) {
		return methods.init.apply(this, arguments);
	};
})( jQuery );

/* Meta-Tags script*/
meta = {
	closed: function(){
		var zone = $(this).parents('.tag_zone');
		var el = zone.siblings().children('ul.tags');
		$(this).parent().appendTo(el);
		meta.empty('.tag_zone');
		meta.deleted();
		meta.outset(zone.parents('.news_box'));
		meta.visual();
	},
	empty: function(zone){
		$(zone).each(function() {
			if ($(this).find('li').length == 0){
				$(this).addClass('empty');
			} else {
				$(this).removeClass('empty');
			}
    	});
	},
	deleted: function(){
		tags = '';
		$('.del ul.tags li').each(function() {
			tag = $(this).attr('class');
			tags += tag;
		});
		$('input[name="del_tags"]').val(tags.substr(1));
	},
	visual: function(){
		$('ul.tags li').each(function(){
			tag = $(this).attr('class');
			if($(this).parents('.tag_zone').hasClass('del') && $(this).parents('.tooltip_gr').next().hasClass('active')){
				$('.ten_col2_content').find('.news_box.' + tag).addClass('op' + tag);
			} else {
				$('.ten_col2_content').find('.news_box.' + tag).removeClass('op' + tag);
			}
		});
	},
	insert: function(_is){
		addTag = $('ul.add', _is.parent()).html();
		delTag = $('ul.del', _is.parent()).html();
		$('.add ul.tags', _is.prev()).html(addTag);
		$('.del ul.tags', _is.prev()).html(delTag);
		meta.empty($('.tag_zone', _is.prev()));
	},
 	outset:function(_is){
		addTag = $('.add ul.tags', _is).html();
		delTag = $('.del ul.tags', _is).html();
		_is.find('ul.add').html(addTag);
		_is.find('ul.del').html(delTag);
	},
	init: function(){
		$('.news_tags').each(function(i) {
			$is = $(this);
			$is.append('<ul class="add"></ul><ul class="del"></ul>');
			$('.t-tag',$is).each(function(){
				tag = $(this).attr('href').substr(1).split('/');
				txt = $(this).text();
				if(tag[tag.length-2] == 'system'){
					$is.parents('.news_box').addClass('_' + tag[tag.length-1]);
					$('ul.add',$is).append('<li class="_' + tag[tag.length-1] + '"><span>' + txt + '</span><i class="close"></i></li>');
				}
			});
		});
	}
}

/* Tooltip script */
tooltip = {
	cls: 'tooltip_help',
	act: 'active',
	add: function(text, dir){
		if (!dir) dir = 'left';
		var $is = $(this);
		if (!$is.hasClass(tooltip.act)){
			$is.append('<span class="' + tooltip.cls + '" style="display:none;' + dir + ':0;">' + text + '</span>');
			$is.children('.' + tooltip.cls).slideDown(100);
		}
	},
	del: function(){
		$is = $(this);
		if (!$is.hasClass(tooltip.act)){
			$is.children('.' + tooltip.cls).remove();
		}
	},
	force: function(){
		$(this).remove();
	}
}
/* another */
function commentsOdd(){
	var com = 'ul.comments_list';
	if($(com)){
		$(com + ' li:odd').addClass('odd');
	}
}
function showPopup(_act, _cls_tip, _is){
	_is.toggleClass(_act).prev(_cls_tip).toggle();
	_is.parents('div[class^="news_box"]').siblings().find(_cls_tip).hide().next().removeClass(_act);
}
/* FLASHING INPUT v.2.0 */
function inputFlash(obj_cls, def_cls){
	var $obj = $('.'+obj_cls),
		type = 'type',
		pass = 'password',
		text = 'text';
	if(!$obj) return;
	$obj.each(function(){
		var el = $(this);
		el.addClass(def_cls);
		if(el.attr(type) == pass){
			el.attr(type,text);
			el.data(type,pass);
		}
		el.focus(function(){
			el.removeClass(def_cls);	
			if (this.value == this.defaultValue){
				this.value = '';
				if(el.data(type) == pass){
					el.attr(type,pass);
				}
			}
		});
		el.blur(function() {
			if ($.trim(this.value) == ''){
				el.addClass(def_cls);
				this.value = (this.defaultValue ? this.defaultValue : '');
				if(el.data(type) == pass){
					el.attr(type,text);
				}
			}
		});
	});
}
/* disabled submit button */
function disSubmit(areaid, formid){
	var btn = 'form#' +  formid + ' input[type="submit"]',
		dis = 'disabled',
		def_txt = 'Ваш комментарий';
	$(document).ready(function(){
		disabled('#' + areaid);
	});
	$('#' + areaid).keyup(function(){
		disabled(this);
	});
	function disabled(_el){
		if($(_el).val() == def_txt || $(_el).val() == ''){
			$(btn).attr(dis,dis)
		} else {
			$(btn).removeAttr(dis);
		}
	}
}
/* SELECTBOX */
function selectBox(){
	$(document).bind('click', function(e) {
		var clicked = $(e.target);
		if (!clicked.parents().hasClass('dropdown')) {
			$('span.selectbox ul.dropdown').hide().find('li.sel').addClass('selected');
			$('span.selectbox').removeClass('focused');
		}
	});

	$('select.styled').each(function() {
		if ($(this).prev().hasClass('selectbox')) return;
		var option = $(this).find('option');
		var optionSelected = $(this).find('option:selected');
		var dropdown = '';
		var selectText = $(this).find('option:first').text();
		if (optionSelected.length) selectText = optionSelected.text();

		for (i = 0; i < option.length; i++) {
			var selected = '';
			var disabled = ' class="disabled"';
			if ( option.eq(i).is(':selected') ) selected = ' class="selected sel"';
			if ( option.eq(i).is(':disabled') ) selected = disabled;
			dropdown += '<li' + selected + '>'+ option.eq(i).text() +'</li>';
		}

		$(this).before(
			'<span class="selectbox" style="display: inline-block; position: relative">'+
				'<span class="select" style="float: left; position: relative; z-index: 10000"><span class="text">' + selectText + '</span>'+
					'<b class="trigger"><i class="arrow"></i></b>'+
				'</span>'+
				'<ul class="dropdown" style="position: absolute; z-index: 9999; overflow: auto; overflow-x: hidden; list-style: none">' + dropdown + '</ul>'+
			'</span>'
		).css({position: 'absolute', left: -9999});

		var ul = $(this).prev().find('ul');
		var selectHeight = $(this).prev().outerHeight();
		if ( ul.css('left') == 'auto' ) ul.css({left: 0});
		if ( ul.css('top') == 'auto' ) ul.css({top: selectHeight});
		var liHeight = ul.find('li').outerHeight();
		var position = ul.css('top');
		ul.hide();

		/* при клике на псевдоселекте */
		$(this).prev().find('span.select').click(function() {

			/* умное позиционирование */
			var topOffset = $(this).parent().offset().top;
			var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
			if (bottomOffset < 0 || bottomOffset < liHeight * 6)	{
				ul.height('auto').css({top: 'auto', bottom: position});
				if (ul.outerHeight() > topOffset - $(window).scrollTop() - 20 ) {
					ul.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
				}
			} else if (bottomOffset > liHeight * 6) {
				ul.height('auto').css({bottom: 'auto', top: position});
				if (ul.outerHeight() > bottomOffset - 20 ) {
					ul.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
				}
			}

			$('span.selectbox').css({zIndex: 1}).removeClass('focused');
			if ( $(this).next('ul').is(':hidden') ) {
				$('ul.dropdown:visible').hide();
				$(this).next('ul').show();
			} else {
				$(this).next('ul').hide();
			}
			$(this).parent().css({zIndex: 2});
			return false;
		});

		/* при наведении курсора на пункт списка */
		$(this).prev().find('li:not(.disabled)').hover(function() {
			$(this).siblings().removeClass('selected');
		})
		/* при клике на пункт списка */
		.click(function() {
			$(this).siblings().removeClass('selected sel').end()
				.addClass('selected sel').parent().hide()
				.prev('span.select').find('span.text').text($(this).text())
			;
			option.removeAttr('selected').eq($(this).index()).attr({selected: 'selected'});
			$(this).parents('span.selectbox').next().change();
		});

		/* фокус на селекте при нажатии на Tab */
		$(this).focus(function() {
			$('span.selectbox').removeClass('focused');
			$(this).prev().addClass('focused');
		})
		/* меняем селект с клавиатуры */
		.keyup(function() {
			$(this).prev().find('span.text').text($(this).find('option:selected').text()).end()
				.find('li').removeClass('selected sel').eq($(this).find('option:selected').index()).addClass('selected sel')
			;
		});

	});
}
$(document).on('keydown',function(e){
	if($('form[name="add_comm"]').length > 0){
		if ((e.which==13)&&(e.ctrlKey)) {e.preventDefault(); document.enter.submit();}
		if ((e.which==66)&&(e.ctrlKey)) {e.preventDefault(); alert('bold');}
		if ((e.which==73)&&(e.ctrlKey)) {e.preventDefault(); alert('italic');}
		if ((e.which==83)&&(e.ctrlKey)) {e.preventDefault(); alert('spoiler');}
		if ((e.which==80)&&(e.ctrlKey)) {e.preventDefault(); alert('strike');}
	}
});
