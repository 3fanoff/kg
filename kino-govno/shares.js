$(function(){
	$('span, i', '.news_shares').click(function(){
		if($(this).parent().find('.tooltip_shares').length > 0 ) return;
		$(this).parent().append('<div class="tooltip_shares" style="display:block;">\
									<div class="head">Поделиться новостью<div class="close"></div></div>\
										<div class="body">\
											<a href="javaScript:void(0);" class="vk" onclick="shares.init.call(this,\'vk\');"></a>\
											<a href="javaScript:void(0);" class="fb" onclick="shares.init.call(this,\'fb\');"></a>\
											<a href="javaScript:void(0);" class="tw" onclick="shares.init.call(this,\'tw\');"></a>\
											<a href="javaScript:void(0);" class="lj" onclick="shares.init.call(this,\'lj\');"></a>\
											<a href="javaScript:void(0);" class="li" onclick="shares.init.call(this,\'li\');"></a>\
											<a href="javaScript:void(0);" class="dr" onclick="shares.init.call(this,\'dr\');"></a>\
										</div>\
								</div>');
	});
	
});

shares = {
	init: function( _service ){
		$news	= $(this).parents('.news_box'),
		uri		= 'http://kino-govno.com' + $news.find('.news_head').attr('href'), 
		title	= $news.find('.news_head').children('span').text(),
		image	= $news.find('img:first').attr('src'),
		text	= $news.find('p:first').text();
		if (!window.image) image = '';
		if (!window.text) text = title;
		
		shares[ _service ].call(this);	
	},
	vk: function() {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(uri);
        url += '&title='       + encodeURIComponent(title);
        url += '&image='       + encodeURIComponent(image);
        url += '&noparse=true';
        shares.popup(url);
    },
	fb: function() { //facebook
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(title);
        url += '&p[url]='       + encodeURIComponent(uri);
        url += '&p[images][0]=' + encodeURIComponent(image);
		shares.popup(url);
    },
	tw: function() { //twitter
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(title);
        url += '&url='      + encodeURIComponent(uri);
        url += '&counturl=' + encodeURIComponent(uri);
        shares.popup(url);
    },
	lj: function() { //livejournal
        url  = 'http://www.livejournal.com/update.bml?';
        url += 'subject='     + encodeURIComponent(title);
        url += '&event=' + encodeURIComponent('<a href="' + uri + '">' + title + '</a>');
		shares.popup(url);
    },
	li: function() { //livejournal
        url  = 'http://www.liveinternet.ru/journal_post.php?action=n_add';
        url += '&cntitle='     + encodeURIComponent(title);
        url += '&cnurl' + encodeURIComponent(uri);
		shares.popup(url);
    },
	dr: function() { //diary.ru
        url  = 'http://www.diary.ru/?newpost';
        url += '&title='      + encodeURIComponent(title);
        url += '&text='      + encodeURIComponent(text);
        shares.popup(url);
    },
	popup: function( _url ) {
        window.open(_url,'','toolbar=0,status=0,width=600,height=400');
    }
}