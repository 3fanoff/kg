$(function(){
	$loha = $('.lovehate_block');
	$('.mode a', $loha).click(function(){
		cls = $(this).parent().attr('class').substr(6);
		$loha.removeClass('_hate').removeClass('_love');
		$loha.addClass(cls);
		return false;
	});
	
	maxBody('.lovehate_block');
	
	$('.grades._empty .list li').each(function(){
		$('.auto-submit-star', this).rating({
			callback: function(value, link){
				alert(value);
			}
			/*callback: function(value, link){
				$.getJSON('/useractions.php?action=grade&id=574&type=-1&grade='+value+'&loginza_id=2068', function(data) {
					$('.page_critic_user_rating').html('<h4>' + data['rating'] + '</h4>Рейтинг критика среди<br><u>посетителей &laquo;Критиканства&raquo;</u><i>' + data['votes'] + ' оцен' + ending (data['votes'], 'ка', 'ки', 'ок') + '</i>' + (data['votes']>=7?'<i>' + data['place'] + ' место в общем рейтинге</i>':''));
					$('.page_critic_user_rating').attr('class', 'page_critic_user_rating users_rating_' + grade_color (data['rating']));
				});
			}*/
		});
	});
	
	$('.favs .mg-add').click(function(){
		$is = $(this);
		$.ajax({
			beforeSend:function(){
				console.log('Отправка в избранное');//temp
			},
			success: function(){
				$is.attr('class','mg-icon mg-added');
				$is.attr('title','Добавлено');
			}
		})
		
	});
	
	$('.subs ._more_candidate').click(function(){
		$is = $(this);
		$.ajax({
			url:'temp_box2.html',
			dataType: 'html',
			beforeSend:function(){
				console.log('Другой пользователь');//temp
			},
			success: function(data){
				_cont = $(data).filter('.temp_box3').html();
				$('.subs._empty .critic_box').html(_cont);
			}
		});
		return false;
	});
	
	$field = $('form[name="status_field"] textarea');
	if($field.length){
		$field.charCount({allowed: 350});
		$field.focusin(function(){
			detect = setInterval(function(){
				$field.trigger('keyup');
			}, 1200);
		});
		$field.focusout(function(){
			clearInterval(detect);
		});
		$field.keyup(statusLimit);
	}
	
	$('.user_status .change').click(function(){
		$(this).next().addClass('act');
	});
	$('.status_field ._close').click(function(){
		$(this).parent().removeClass('act');
	});
	$('.section._empty').hover(function(){
		$t = $(this);
		ovp = setTimeout(function(){
			$t.addClass('over');
		}, 1200);
	}, function(){
		clearTimeout(ovp);
		$(this).removeClass('over');
	});
	
	disSubmit('.input_text','[name="add_email"]');
	
	
	confirmBox();
	replaceRadio();
	replaceCheck();
	
});
//табы секций
function sectTab(){
	$is = $(this);
	$(this).addClass('act').siblings().removeClass('act');
	$.ajax({
		url: 'temp_box2.html',
		dataType: 'html',
		beforeSend:function(){
				console.log('Получение содержмого таба');//temp
		},
		success: function(data){
			/* временное */
			_cont = $(data).filter('.temp_box').html();
			_sort = $(data).filter('.temp_box2') .html();
			$sect = $is.parents('.section');
			$('.body', $sect).html('<ul class="list">' + _cont + '</ul>');
			$('.sort', $sect).html(_sort);
		}
	});
}
//подгрузка в секции 
function addMore(){
	$is = $(this);
	$cx = $is.parents('ul.list');
	$anc = $is.parent('span');
	clsTemp = '.temp_box';
	$.ajax({
		url: 'temp_box.html',
		dataType: 'html',
		beforeSend: function(){
			$anc.hide();
			console.log('Подгрузка списка');//temp
		},
		success: function(data){
			cont = $(data);
			$cx.append(cont);
			$(clsTemp, $cx).slideDown(200, function(){
				$(this).children('li').appendTo($cx);
				$(clsTemp, $cx).remove();
				$anc.remove();
			});
		},
		error: function(){
			$anc.show();
		}
	});
}
function maxBody(lhb){
	arr = [ $(lhb + ' .body:eq(0)').height(), $(lhb + ' .body:eq(1)').height() ];
	num = Math.max.apply(Math, arr);
	$(lhb + ' .body').height(num);
}

//form[name="status_field"]
function statusLimit(){
	if ($(this).val().length > 350) {
		$('input[type="submit"]', $(this).parent()).prop('disabled', true);
	} else {
		$('input[type="submit"]', $(this).parent()).prop('disabled', false);
	}
}
/* disabled submit button */
function disSubmit(_area, _form){
	var form = 'form' + _form,
		btn = 'input[type="submit"]',
		dis = 'disabled',
		$ob = $(_area, $(form)),
		deftxt = $ob.val();
		
	disabled($ob);
	$ob.keyup(function(){
		disabled($(this));
	});
	function disabled(_el){
		if (_el.val() == deftxt || _el.val() == ''){
			$(btn, $(form)).attr(dis, dis)
		} else {
			$(btn, $(form)).removeAttr(dis);
		}
	}
}
//кастомизация радио и чекбоксов
function replaceRadio(){
	var $item = $('.box-item .box:not("._p-name")');
	var action = function(){
		$(this).addClass('check').removeClass('def').find('input[type="radio"]').prop('checked',true);
		$(this).siblings('.box:not("._p-name")').addClass('def').removeClass('check');
	};
	for (i = 0; i < $item.length; i++){
		var is = $item[i];
		if ($('input[type="radio"]', is).prop('checked') == true){
			action.call(is);
		}
	}
	$item.click(function(){
		if(!$(this).hasClass('check')) {
			lock.call(this);
			action.call(this);
		}
	});
}
function replaceCheck(){
	var $checks = $('.input_check');
	var action = function(){
		if ($(this).hasClass('check')){
			var stat = false;
		} else {
			var stat = true;
		}
		$(this).toggleClass('check').children('input').prop('checked',stat);
	};
	for (i = 0; i < $checks.length; i++){
		var is = $checks[i];
		if ($('input', is).addClass('rep-inp').prop('checked') == true){
			action.call(is);
		}
	}
	$checks.click(function(){
		lock.call(this);
		action.call(this);
	});
	$('label').click(function(){
		var id = $(this).attr('for');
		if ($('#' + id).is('.rep-inp')){
			var cont = $('input#' + id).parent().trigger('click');
			return false;
		}
	})
}
function lock(){
	$(this).parents('form').find('input[type="submit"]').prop('disabled',false);
	$('a.howtosee').hide();
}
//попапы подтверждений
function confirmBox(){
	var ec_s = '.ec_settings',
		c_box = '.confirm_box';
	$('.remove', ec_s).click(function(){
		$(this).parents(ec_s).siblings().find(c_box).hide();
		$(this).next(c_box).toggle();
		return false;
	});
	$(c_box + ', .remove', ec_s).click(function(e){
		e.stopPropagation();
	})
	$('body').click(function(){
		$(c_box, ec_s).hide();
	});
	$(c_box + ' .profile_button').click(function(){
		var $is = $(this);
		if($is.hasClass('delete')){
			$.ajax({
				//url: 'http://3fan.ru/',
				dataType: 'html',
				success: function(){
					console.log('удаляем e-mail');
				}
			});
		}
		$is.parent().hide();
		return false;
	});
}


