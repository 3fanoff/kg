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
});
$("#review_location_offline").click(function() {
$(this).addClass('active'); $('#review_location_online').removeClass('active'); $('#mf_review_online_wrap').hide(); $('#mf_review_offline_wrap').show(); $('#mf_wisdom_online_wrap').hide(); $('#mf_wisdom_offline_wrap').hide();
$('.review_offline_manual_fields').show();
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
$('input[name=review_online_item_grade]').val('отлично');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade2").click(function() {
$('input[name=review_online_item_grade]').val('хорошо');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade3").click(function() {
$('input[name=review_online_item_grade]').val('так себе');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_online_grade4").click(function() {
$('input[name=review_online_item_grade]').val('плохо');
$('[id*=review_online_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});

// Выбор предустановленной оценки в офлайновых рецензиях
$("#review_offline_grade1").click(function() {
$('input[name=review_offline_item_grade]').val('отлично');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade2").click(function() {
$('input[name=review_offline_item_grade]').val('хорошо');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade3").click(function() {
$('input[name=review_offline_item_grade]').val('так себе');
$('[id*=review_offline_grade]').addClass('pseudolink'); $(this).removeClass('pseudolink');
});
$("#review_offline_grade4").click(function() {
$('input[name=review_offline_item_grade]').val('плохо');
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
		var deftext = $(this).data('placeholder-text');
		if (this.value == deftext) {
			$(this).removeClass('placeholder'); 
			this.value = '';
		}
	}).blur(function() {
		var deftext = $(this).data('placeholder-text');
		if (this.value == '' || this.value == deftext) {
			$(this).addClass('placeholder');
			this.value = deftext;
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
});
$("#review_online_type_game_pseudo").click(function() {
$('#review_online_type_game').attr('checked', 'checked');
$('#review_online_type_movie').removeAttr('checked');
$('#review_online_type_movie_pseudo').removeClass('active');
$('#review_online_type_game_pseudo').addClass('active');
$(".review_online_item_type").html("игры");
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
$(document).ready(function() {
$("#review_online_submit").click(function() {
$('input[name=review_online_submit]').val('Отправка...');
$('input[name="review_online_submit"]').attr('disabled','disabled');
$('#mf_review_online_wrap').hide();
$('.mf_hd_wrap').hide();
$('a.fancybox-close').hide();
$('#mf_submit_success').fadeIn(1000);
$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
});
});

// После отправки формы офлайновой рецензии
$(document).ready(function() {
$("#review_offline_submit").click(function() {
$('input[name=review_offline_submit]').val('Отправка...');
$('input[name="review_offline_submit"]').attr('disabled','disabled');
$('#mf_review_offline_wrap').hide();
$('.mf_hd_wrap').hide();
$('a.fancybox-close').hide();
$('#mf_submit_success').fadeIn(1000);
$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
});
});

// После отправки формы онлайновой мудрости
$(document).ready(function() {
$("#wisdom_online_submit").click(function() {
$('input[name=wisdom_online_submit]').val('Отправка...');
$('input[name="wisdom_online_submit"]').attr('disabled','disabled');
$('#mf_wisdom_online_wrap').hide();
$('.mf_hd_wrap').hide();
$('a.fancybox-close').hide();
$('#mf_submit_success').fadeIn(1000);
$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
});
});

// После отправки формы офлайновой мудрости
$(document).ready(function() {
$("#wisdom_offline_submit").click(function() {
$('input[name=wisdom_offline_submit]').val('Отправка...');
$('input[name="wisdom_offline_submit"]').attr('disabled','disabled');
$('#mf_wisdom_offline_wrap').hide();
$('.mf_hd_wrap').hide();
$('a.fancybox-close').hide();
$('#mf_submit_success').fadeIn(1000);
$('html,body').animate({scrollTop: $("#mf_default").offset().top - 40},'normal');
});
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