$(document).ready(function(){	

// Что добавляем
$("#type_review").click(function() {
$(this).addClass('active'); $('#type_wisdom').removeClass('active'); $('#review_location_online').addClass('active'); $('#review_location_offline').removeClass('active'); $('#mf_review_location').show(); $('#mf_wisdom_location').hide(); $('#mf_review_online_wrap').show(); $('#mf_review_offline_wrap').hide(); $('#mf_wisdom_online_wrap').hide(); $('#mf_wisdom_offline_wrap').hide();
});
$("#type_wisdom").click(function() {
$(this).addClass('active'); $('#type_review').removeClass('active'); $('#wisdom_location_online').addClass('active'); $('#wisdom_location_offline').removeClass('active'); $('#mf_review_location').hide(); $('#mf_wisdom_location').show(); $('#mf_review_online_wrap').hide(); $('#mf_review_offline_wrap').hide(); $('#mf_wisdom_online_wrap').show(); $('#mf_wisdom_offline_wrap').hide();
});

// Где оно находится
$("#review_location_online").click(function() {
$(this).addClass('active'); $('#review_location_offline').removeClass('active'); $('#mf_review_online_wrap').show(); $('#mf_review_offline_wrap').hide(); $('#mf_wisdom_online_wrap').hide(); $('#mf_wisdom_offline_wrap').hide();
setTimeout(function() { $('#review_online_item_title').focus(); }, 0);
});
$("#review_location_offline").click(function() {
$(this).addClass('active'); $('#review_location_online').removeClass('active'); $('#mf_review_online_wrap').hide(); $('#mf_review_offline_wrap').show(); $('#mf_wisdom_online_wrap').hide(); $('#mf_wisdom_offline_wrap').hide();
$('.review_offline_manual_fields').show();
setTimeout(function() { $('#review_offline_item_title').focus(); }, 0);
});
$("#wisdom_location_online").click(function() {
$(this).addClass('active'); $('#wisdom_location_offline').removeClass('active'); $('#mf_review_online_wrap').hide(); $('#mf_review_offline_wrap').hide(); $('#mf_wisdom_online_wrap').show(); $('#mf_wisdom_offline_wrap').hide();
});
$("#wisdom_location_offline").click(function() {
$(this).addClass('active'); $('#wisdom_location_online').removeClass('active'); $('#mf_review_online_wrap').hide(); $('#mf_review_offline_wrap').hide(); $('#mf_wisdom_online_wrap').hide(); $('#mf_wisdom_offline_wrap').show();
$('.wisdom_offline_manual_fields').show();
});



// Выбор предустановленной оценки в онлайновых рецензиях
$("#review_online_grade1").click(function() {
$('input[name=review_online_item_grade]').val('#отлично');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade2").click(function() {
$('input[name=review_online_item_grade]').val('#хорошо');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade3").click(function() {
$('input[name=review_online_item_grade]').val('#так себе');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade4").click(function() {
$('input[name=review_online_item_grade]').val('#плохо');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});

// Выбор предустановленной оценки в офлайновых рецензиях
$("#review_offline_grade1").click(function() {
$('input[name=review_offline_item_grade]').val('#отлично');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade2").click(function() {
$('input[name=review_offline_item_grade]').val('#хорошо');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade3").click(function() {
$('input[name=review_offline_item_grade]').val('#так себе');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade4").click(function() {
$('input[name=review_offline_item_grade]').val('#плохо');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});


});




// Smooth scroll to anchors
function goToByScroll(id){
$('html,body').animate({scrollTop: $("#"+id).offset().top - 40},'normal');
}

// Временный текст в полях ввода
$(document).ready(function() {
var $input = $('.clearonfocus');
$input.focus(function() {
if($(this).val() == $(this).data('placeholder-text')) {
$(this).removeClass('placeholder'); 
$(this).val('') 
}
}).blur(function() {
if($(this).val() == '') {
$(this).addClass('placeholder');
$(this).val($(this).data('placeholder-text'));
}
}).trigger('blur');
});






// textarea твиттер-стайл
$(document).ready(function(){	
$("#review_online_quote").charCount({
allowed: 400,		
warning: 50,
counterText: ''	
});
});
$(document).ready(function(){	
$("#review_offline_quote").charCount({
allowed: 400,		
warning: 50,
counterText: ''	
});
});
$(document).ready(function(){	
$("#wisdom_online_quote").charCount({
allowed: 400,		
warning: 50,
counterText: ''	
});
});
$(document).ready(function(){	
$("#wisdom_offline_quote").charCount({
allowed: 400,		
warning: 50,
counterText: ''	
});
});
$(document).ready(function(){	
$("#wisdom_online_explanation").charCount({
allowed: 200,		
warning: 20,
counterText: ''	
});
});
$(document).ready(function(){	
$("#wisdom_offline_explanation").charCount({
allowed: 200,		
warning: 20,
counterText: ''	
});
});





// Ручной ввод онлайновой рецензии
$(document).ready(function(){
	$('#review_online_manual').click(function () {
	$('#review_online_parse_url').fadeOut(1000); $('.review_online_manual').fadeOut(1000); $('.review_online_manual_fields').fadeIn(1000);
});});

// Ручной ввод онлайновой мудрости
$(document).ready(function(){
	$('#wisdom_online_manual').click(function () {
	$('#wisdom_online_parse_url').fadeOut(1000); $('.wisdom_online_manual').fadeOut(1000); $('.wisdom_online_manual_fields').fadeIn(1000);
});});







// Выключаем "Проверить" при пустой ссылке в онлайновой рецензии
$(document).ready(function(){
$('#review_online_parse_url').attr('disabled','disabled');
$('#review_online_url').keyup(function(){
    if($('#review_online_url').val() == ""){
        $('#review_online_parse_url').attr('disabled','disabled');
    }
    else{
        $('#review_online_parse_url').removeAttr('disabled');
    }
    });
});

// Выключаем "Проверить" при пустой ссылке в онлайновой мудрости
$(document).ready(function(){
$('#wisdom_online_parse_url').attr('disabled','disabled');
$('#wisdom_online_url').keyup(function(){
    if($('#wisdom_online_url').val() == ""){
        $('#wisdom_online_parse_url').attr('disabled','disabled');
    }
    else{
        $('#wisdom_online_parse_url').removeAttr('disabled');
    }
    });
});




// Псевдопереключатели типа фильм/игра для онлайновой рецензии
$(document).ready(function() {
$("#review_online_type_movie_pseudo").click(function() {
$('#review_online_type_movie').attr('checked', 'checked');
$('#review_online_type_game').removeAttr('checked');
$('#review_online_type_game_pseudo').removeClass('active');
$('#review_online_type_movie_pseudo').addClass('active');
$(".review_online_item_type").html("фильма");
$('#review_online_type_attention').text('');

});
$("#review_online_type_game_pseudo").click(function() {
$('#review_online_type_game').attr('checked', 'checked');
$('#review_online_type_movie').removeAttr('checked');
$('#review_online_type_movie_pseudo').removeClass('active');
$('#review_online_type_game_pseudo').addClass('active');
$(".review_online_item_type").html("игры");
$('#review_online_type_attention').text('');
});
});

// Псевдопереключатели типа фильм/игра для офлайновой рецензии
$(document).ready(function() {
$("#review_offline_type_movie_pseudo").click(function() {
$('#review_offline_type_movie').attr('checked', 'checked');
$('#review_offline_type_game').removeAttr('checked');
$('#review_offline_type_game_pseudo').removeClass('active');
$('#review_offline_type_movie_pseudo').addClass('active');
$(".review_offline_item_type").html("фильма");
});
$("#review_offline_type_game_pseudo").click(function() {
$('#review_offline_type_game').attr('checked', 'checked');
$('#review_offline_type_movie').removeAttr('checked');
$('#review_offline_type_movie_pseudo').removeClass('active');
$('#review_offline_type_game_pseudo').addClass('active');
$(".review_offline_item_type").html("игры");
});
});


// Псевдопереключатели типа фильм/игра для онлайновой мудрости
$(document).ready(function() {
$("#wisdom_online_type_movie_pseudo").click(function() {
$('#wisdom_online_type_movie').attr('checked', 'checked');
$('#wisdom_online_type_game').removeAttr('checked');
$('#wisdom_online_type_game_pseudo').removeClass('active');
$('#wisdom_online_type_movie_pseudo').addClass('active');
$(".wisdom_online_item_type").html("фильма");
});
$("#wisdom_online_type_game_pseudo").click(function() {
$('#wisdom_online_type_game').attr('checked', 'checked');
$('#wisdom_online_type_movie').removeAttr('checked');
$('#wisdom_online_type_movie_pseudo').removeClass('active');
$('#wisdom_online_type_game_pseudo').addClass('active');
$(".wisdom_online_item_type").html("игры");
});
});

// Псевдопереключатели типа фильм/игра для офлайновой мудрости
$(document).ready(function() {
$("#wisdom_offline_type_movie_pseudo").click(function() {
$('#wisdom_offline_type_movie').attr('checked', 'checked');
$('#wisdom_offline_type_game').removeAttr('checked');
$('#wisdom_offline_type_game_pseudo').removeClass('active');
$('#wisdom_offline_type_movie_pseudo').addClass('active');
$(".wisdom_offline_item_type").html("фильма");
});
$("#wisdom_offline_type_game_pseudo").click(function() {
$('#wisdom_offline_type_game').attr('checked', 'checked');
$('#wisdom_offline_type_movie').removeAttr('checked');
$('#wisdom_offline_type_movie_pseudo').removeClass('active');
$('#wisdom_offline_type_game_pseudo').addClass('active');
$(".wisdom_offline_item_type").html("игры");
});
});







// После отправки формы онлайновой рецензии
//
$(document).ready(function() {
$("#review_online_submit").click(function() {

if ($('#review_online_item_title').val()!='' && $('#review_online_item_title').val()!='Начните вводить название' &&
	$('#review_online_item_src').val()!='' && $('#review_online_item_src').val()!='Название издания, сайта или журнала'
	&& $('#review_online_item_grade').val()!=''
	&& $('#review_online_quote').val()!=''
	&& ($('#review_online_type_movie').attr('checked')=='checked' || $('#review_online_type_game').attr('checked')=='checked')
	)
{
	$('input[name=review_online_submit]').val('Отправка...');
	$('input[name="review_online_submit"]').attr('disabled','disabled');
	
    $.ajax({url: "/useractions.php?action=insertreview&type=" + ($('#review_online_type_movie').attr('checked')=='checked'?0:($('#review_online_type_game').attr('checked')=='checked'?1:'')) + "&issue=" + encodeURIComponent($('#review_online_url').val()) + "&title=" + encodeURIComponent($('#review_online_item_title').val()) + "&publication=" + encodeURIComponent($('#review_online_item_src').val()) + "&author=" + encodeURIComponent($('#review_online_item_author').val()) + "&grade=" + encodeURIComponent($('#review_online_item_grade').val()) + "&date=" + encodeURIComponent($('#mf_review_online_datepicker').val()) + "&summary=" + encodeURIComponent($('#review_online_quote').val()) + "&codename=" + encodeURIComponent($('#universal_codename').val()) + "&page=" + encodeURIComponent(document.URL),
    	  dataType: "json"})
    	  .done(function(data) {
				$('#mf_review_online_wrap').hide();
				$('.mf_hd_wrap').hide();
				$('a.fancybox-close').hide();
				$('#mf_submit_success').fadeIn(1000);
				$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
				$('.button_add').focus();
    	  })
    .fail(function() { alert("Не получилось считать данные"); });

} else
{
	if ($('#review_online_item_title').val()=='' || $('#review_online_item_title').val()=='Начните вводить название')
		$('#review_online_item_title').css('border-color','#FF0000');
	else
		$('#review_online_item_title').css('border-color','#000000');	
	if ($('#review_online_item_src').val()=='' || $('#review_online_item_src').val()=='Название издания, сайта или журнала')
		$('#review_online_item_src').css('border-color','#FF0000');
	else
		$('#review_online_item_src').css('border-color','#000000');
	if ($('#review_online_item_grade').val()=='')
		$('#review_online_item_grade').css('border-color','#FF0000');
	else
		$('#review_online_item_grade').css('border-color','#000000');
	if ($('#review_online_quote').val()=='')
		$('#review_online_quote').css('border-color','#FF0000');
	else
		$('#review_online_quote').css('border-color','#000000');

	if ($('#review_online_type_movie').attr('checked')!='checked' && $('#review_online_type_game').attr('checked')!='checked')
		$('#review_online_type_attention').text('А на что рецензия?');

}

});
});
//
// После отправки формы офлайновой рецензии
$(document).ready(function() {
$("#review_offline_submit").click(function() 

{

if ($('#review_offline_item_title').val()!='' && $('#review_offline_item_title').val()!='Начните вводить название' &&
	$('#review_offline_item_src').val()!='' && $('#review_offline_item_src').val()!='Название журнала или газеты'
	&& $('#review_offline_item_grade').val()!=''
	&& $('#review_offline_quote').val()!=''
	&& ($('#review_offline_type_movie').attr('checked')=='checked' || $('#review_offline_type_game').attr('checked')=='checked')
	)
{
	$('input[name=review_offline_submit]').val('Отправка...');
	$('input[name="review_offline_submit"]').attr('disabled','disabled');
    $.ajax({url: "/useractions.php?action=insertreview&type=" + ($('#review_offline_type_movie').attr('checked')=='checked'?0:($('#review_offline_type_game').attr('checked')=='checked'?1:'')) + "&issue=" + encodeURIComponent($('#mf_review_offline_issue').val()) + "&title=" + encodeURIComponent($('#review_offline_item_title').val()) + "&publication=" + encodeURIComponent($('#review_offline_item_src').val()) + "&author=" + encodeURIComponent($('#review_offline_item_author').val()) + "&grade=" + encodeURIComponent($('#review_offline_item_grade').val()) + "&year=" + encodeURIComponent($('#mf_review_offline_year').val()) + "&summary=" + encodeURIComponent($('#review_offline_quote').val()) + "&codename=" + encodeURIComponent($('#universal_codename').val()) + "&page=" + encodeURIComponent(document.URL),
    	  dataType: "json"})
    	  .done(function(data) {
				$('#mf_review_offline_wrap').hide();
				$('.mf_hd_wrap').hide();
				$('a.fancybox-close').hide();
				$('#mf_submit_success').fadeIn(1000);
				$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
				$('.button_add').focus();
    	  })
    .fail(function() { alert("Не получилось считать данные"); });

} else
{
	if ($('#review_offline_item_title').val()=='' || $('#review_offline_item_title').val()=='Начните вводить название')
		$('#review_offline_item_title').css('border-color','#FF0000');
	else
		$('#review_offline_item_title').css('border-color','#000000');	

	if ($('#review_offline_item_src').val()=='' || $('#review_offline_item_src').val()=='Название журнала или газеты')
		$('#review_offline_item_src').css('border-color','#FF0000');
	else
		$('#review_offline_item_src').css('border-color','#000000');

	if ($('#review_offline_item_grade').val()=='')
		$('#review_offline_item_grade').css('border-color','#FF0000');
	else
		$('#review_offline_item_grade').css('border-color','#000000');

	if ($('#review_offline_quote').val()=='')
		$('#review_offline_quote').css('border-color','#FF0000');
	else
		$('#review_offline_quote').css('border-color','#000000');

	if ($('#review_offline_type_movie').attr('checked')!='checked' && $('#review_offline_type_game').attr('checked')!='checked')
		$('#review_offline_type_attention').text('А на что рецензия?');

}

}

);
});

// После отправки формы онлайновой мудрости
$(document).ready(function() {
$("#wisdom_online_submit").click(function() 
{

if ($('#wisdom_online_item_title').val()!='' && $('#wisdom_online_item_title').val()!='Начните вводить название' &&
	$('#wisdom_online_item_src').val()!='' && $('#wisdom_online_item_src').val()!='Название издания, сайта или журнала'
	&& $('#wisdom_online_quote').val()!=''
	&& $('#wisdom_online_explanation').val()!=''
	&& ($('#wisdom_online_type_movie').attr('checked')=='checked' || $('#wisdom_online_type_game').attr('checked')=='checked')
	)
{
	$('input[name=wisdom_online_submit]').val('Отправка...');
	$('input[name="wisdom_online_submit"]').attr('disabled','disabled');
	
    $.ajax({url: "/useractions.php?action=insertwisdom&type=" + ($('#wisdom_online_type_movie').attr('checked')=='checked'?0:($('#wisdom_online_type_game').attr('checked')=='checked'?1:'')) + "&issue=" + encodeURIComponent($('#wisdom_online_url').val()) + "&title=" + encodeURIComponent($('#wisdom_online_item_title').val()) + "&publication=" + encodeURIComponent($('#wisdom_online_item_src').val()) + "&author=" + encodeURIComponent($('#wisdom_online_item_author').val()) + "&grade=" + encodeURIComponent($('#wisdom_online_item_grade').val()) + "&date=" + encodeURIComponent($('#mf_wisdom_online_datepicker').val()) + "&wisdom=" + encodeURIComponent($('#wisdom_online_quote').val()) + "&truth=" + encodeURIComponent($('#wisdom_online_explanation').val()) + "&codename=" + encodeURIComponent($('#universal_codename').val()) + "&page=" + encodeURIComponent(document.URL),
    	  dataType: "json"})
    	  .done(function(data) {
			$('#mf_wisdom_online_wrap').hide();
			$('.mf_hd_wrap').hide();
			$('a.fancybox-close').hide();
			$('#mf_submit_success').fadeIn(1000);
			$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
			$('.button_add').focus();
    	  })
    .fail(function() { alert("Не получилось считать данные"); });

} else
{
	if ($('#wisdom_online_item_title').val()=='' || $('#wisdom_online_item_title').val()=='Начните вводить название')
		$('#wisdom_online_item_title').css('border-color','#FF0000');
	else
		$('#wisdom_online_item_title').css('border-color','#000000');	
	if ($('#wisdom_online_item_src').val()=='' || $('#wisdom_online_item_src').val()=='Название издания, сайта или журнала')
		$('#wisdom_online_item_src').css('border-color','#FF0000');
	else
		$('#wisdom_online_item_src').css('border-color','#000000');

	if ($('#wisdom_online_quote').val()=='')
		$('#wisdom_online_quote').css('border-color','#FF0000');
	else
		$('#wisdom_online_quote').css('border-color','#000000');

	if ($('#wisdom_online_explanation').val()=='')
		$('#wisdom_online_explanation').css('border-color','#FF0000');
	else
		$('#wisdom_online_explanation').css('border-color','#000000');

	if ($('#wisdom_online_type_movie').attr('checked')!='checked' && $('#wisdom_online_type_game').attr('checked')!='checked')
		$('#wisdom_online_type_attention').text('А на что рецензия?');

}

}


);
});

// После отправки формы офлайновой мудрости
$(document).ready(function() {
$("#wisdom_offline_submit").click(function() 

{

if ($('#wisdom_offline_item_title').val()!='' && $('#wisdom_offline_item_title').val()!='Начните вводить название' &&
	$('#wisdom_offline_item_src').val()!='' && $('#wisdom_offline_item_src').val()!='Название издания, сайта или журнала'
	&& $('#wisdom_offline_quote').val()!=''
	&& $('#wisdom_offline_explanation').val()!=''
	&& ($('#wisdom_offline_type_movie').attr('checked')=='checked' || $('#wisdom_offline_type_game').attr('checked')=='checked')
	)
{
	$('input[name=wisdom_offline_submit]').val('Отправка...');
	$('input[name="wisdom_offline_submit"]').attr('disabled','disabled');
		
    $.ajax({url: "/useractions.php?action=insertwisdom&type=" + ($('#wisdom_offline_type_movie').attr('checked')=='checked'?0:($('#wisdom_offline_type_game').attr('checked')=='checked'?1:'')) + "&issue=" + encodeURIComponent($('#mf_wisdom_offline_issue').val()) + "&title=" + encodeURIComponent($('#wisdom_offline_item_title').val()) + "&publication=" + encodeURIComponent($('#wisdom_offline_item_src').val()) + "&author=" + encodeURIComponent($('#wisdom_offline_item_author').val()) + "&grade=" + encodeURIComponent($('#wisdom_offline_item_grade').val()) + "&year=" + encodeURIComponent($('#mf_wisdom_offline_year').val()) + "&wisdom=" + encodeURIComponent($('#wisdom_offline_quote').val()) + "&truth=" + encodeURIComponent($('#wisdom_offline_explanation').val()) + "&codename=" + encodeURIComponent($('#universal_codename').val()) + "&page=" + encodeURIComponent(document.URL),
    	  dataType: "json"})
    	  .done(function(data) {
				$('#mf_wisdom_offline_wrap').hide();
				$('.mf_hd_wrap').hide();
				$('a.fancybox-close').hide();
				$('#mf_submit_success').fadeIn(1000);
				$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
				$('.button_add').focus();
    	  })
    .fail(function() { alert("Не получилось считать данные"); });

} else
{
	if ($('#wisdom_offline_item_title').val()=='' || $('#wisdom_offline_item_title').val()=='Начните вводить название')
		$('#wisdom_offline_item_title').css('border-color','#FF0000');
	else
		$('#wisdom_offline_item_title').css('border-color','#000000');	
	if ($('#wisdom_offline_item_src').val()=='' || $('#wisdom_offline_item_src').val()=='Название журнала или газеты')
		$('#wisdom_offline_item_src').css('border-color','#FF0000');
	else
		$('#wisdom_offline_item_src').css('border-color','#000000');

	if ($('#wisdom_offline_quote').val()=='')
		$('#wisdom_offline_quote').css('border-color','#FF0000');
	else
		$('#wisdom_offline_quote').css('border-color','#000000');

	if ($('#wisdom_offline_explanation').val()=='')
		$('#wisdom_offline_explanation').css('border-color','#FF0000');
	else
		$('#wisdom_offline_explanation').css('border-color','#000000');

	if ($('#wisdom_offline_type_movie').attr('checked')!='checked' && $('#wisdom_offline_type_game').attr('checked')!='checked')
		$('#wisdom_offline_type_attention').text('А на что рецензия?');

}

}

);
});








// Переключение visibility: hidden
// Пример: $("#element").invisible(); и $("#element").visible();
(function($) {
$.fn.invisible = function() {
return this.each(function() {
$(this).css("visibility", "hidden");
});
};
$.fn.visible = function() {
return this.each(function() {
$(this).css("visibility", "visible");
});
};
}(jQuery));





$(document).ready(function(){

	$('#review_online_parse_url').click(function () {
	$('#review_online_parse_url').fadeOut(1000);
	$('.review_online_manual').fadeOut(1000);
	$('.review_online_manual_fields').fadeIn(1000,import_review('review_online'));
	});
	
	$('#wisdom_online_parse_url').click(function () {
	$('#wisdom_online_parse_url').fadeOut(1000);
	$('.wisdom_online_manual').fadeOut(1000);
	$('.wisdom_online_manual_fields').fadeIn(1000,import_review('wisdom_online'));
	});

});


function import_review (table, review_id)
{
    	$.ajax({url: "/parser.php?" + (review_id>0?"review_id=" + review_id:"url=" + $('#' + table + '_url').val()) + (table=="wisdom_online" || table=="wisdom_offline"?"&table=wisdom":""),
    	  dataType: "json"})
    	  .done(function(data) {
    	  	if (data['russian']!='')
			  $('#' + table + '_item_title').removeClass('placeholder').val(data['russian']);
    	  	else
    	  	if (data['original']!='')
			  $('#' + table + '_item_title').removeClass('placeholder').val(data['original']);
    	  	if (data['publication']!='')
			  $('#' + table + '_item_src').removeClass('placeholder').val(data['publication']);
    	  	if (data['author']!='')
			  $('#' + table + '_item_author').removeClass('placeholder').val(data['author']);
    	  	if (data['grade']!='')
			  $('#' + table + '_item_grade').removeClass('placeholder').val(data['grade']);	
			if (table=='review_online')
    	  		if (data['summary']!='')
    	  			$('#' + table + '_quote').removeClass('placeholder').val(data['summary']);			  
    	  	if (data['date']!='')
			  $('#mf_' + table + '_datepicker').val(data['nicedate']);
			
			if (data['issue']!='')
			{
				iss=data['issue'].split('#');
				if (iss.length==2)
				{
					$('#mf_' + table + '_issue').removeClass('placeholder').val(iss[1]);
					//alert($('#mf_' + table + '_year').find('option:selected').val());
					//$('#mf_' + table + '_year').find('option:selected').val('2009');
					//$('select').selectBox('value', '2009');
					
					// $('#mf_offline_year').val('2009');
					//$('select').val('new value');
					// $('#mf_' + table + '_year').val(jQuery.trim(iss[0]));
					
					//
					// $('#mf_' + table + '_year').find(":selected").text("foo");

					//
				}
			}
			
			if ($('#' + table + '_url').val()=='' || $('#' + table + '_url').val()=='http://')
			 	$('#' + table + '_url').val(data['issue']);
			 	
    	  	if (data['type']==0)
    	  		$("#" + table + "_type_movie_pseudo").click();
    	  	if (data['type']==1)
    	  		$("#" + table + "_type_game_pseudo").click();
    })
    .fail(function() { alert("Не получилось считать данные"); });
}