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
	inputFlash('input_text', 'nof');
});

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
/* FLASHING INPUT v.2.0 */
function inputFlash(obj_cls, def_cls){
	var $obj = $('.' + obj_cls),
		type = 'type',
		//pass = 'password',
		text = 'text';
	if(!obj_cls) return;
	$obj.each(function(){
		var $el = $(this);
		$el.addClass(def_cls);
		/*if(el.attr(type) == pass){
			el.attr(type, text);
			el.data(type, pass);
		}*/
		$el.focus(function(){
			$el.removeClass(def_cls);	
			if (this.value == this.defaultValue){
				this.value = '';
				/*if(el.data(type) == pass){
					el.attr(type,pass);
				}*/
			}
		});
		$el.blur(function() {
			if ($.trim(this.value) == ''){
				$el.addClass(def_cls);
				this.value = (this.defaultValue ? this.defaultValue : '');
				/*if(el.data(type) == pass){
					el.attr(type,text);
				}*/
			}
		});
	});
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

