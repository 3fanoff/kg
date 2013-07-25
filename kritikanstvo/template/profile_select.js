(function($){
	var $d = $(document);
	var cusel = {
		init: function(o){
			var o =  $.extend({
				onSelect: function(){}
			}, o);
			
			var $elem = $(this),
				imul_b = 'select_imul',
				opts_b = 'select_options';
				selenter = false;
				
			cusel.build.call(this);
			
			$d.on('click', '.' + imul_b, function() {
				var $this = $(this); 
				$('.' + imul_b).removeClass('act');
				$this.addClass('act');
				if ($('.' + opts_b, $this).is(':visible')) {
					$('.' + opts_b).hide();
				} else {
					$('.' + opts_b).hide();
					$('.' + opts_b, $this).show();
				}
				var $selbox = $(this).children('.select_options');
				var tops = $this.offset().top - $(window).scrollTop();
				var bots = $(window).height() - tops - 25;
				var $selbox_h = $selbox.outerHeight();
				if (bots < $selbox_h){
					$selbox.outerHeight(bots-10);
					$selbox.css({'bottom': 'auto'});
				} 
				if (bots < 120) {
					$selbox.outerHeight('auto');
					$selbox.css({'bottom': 25});
				}
				/*if (tops >= $(window).height() - 120){
					if(tops < $selbox_h){
						$selbox.outerHeight(tops-10);
					} else {
						$selbox.outerHeight('auto');
					}
					$selbox.css({'bottom': 25});
				} */
				if (o.onSelect) o.onSelect.call(this);
				
			});
			$d.on('click', '.' + opts_b + ' .option', function() {
				//insert selected value in DIV
				var $this = $(this),
					opttext = $this.html(),
					optval = $this.attr('value');
				$this.parents('.' + imul_b).find('.selected_text').html(opttext);
				//activ. current value
				$this.addClass('sel').siblings().removeClass('sel');
				//insert attr. in OPTION
				optval = typeof(optval) != 'undefined' ? optval : opttext;
				$this.parents('.select_block').find('option').removeAttr('selected').each(function() {
					if ($(this).val() == optval) {
						$(this).attr('selected', 'selected');
					}
				});
				if (o.onOption) o.onOption.call(this);
				
			}); 
			$d.on('mouseenter', '.' + imul_b, function() {
				selenter = true;
			});
			$d.on('mouseleave', '.' + imul_b, function() {
				selenter = false;
			});
			$d.click(function() {
				if (!selenter) {
					$('.' + opts_b).hide();
					$('.' + imul_b).removeClass('act');
				}
			});
			$elem.on('change', 'option', function(){
				var elem = $(this).parent();
				cusel.build.call(this);
			});
			return this;
		},
		build: function(){
				var elem = $(this);
				$.each(elem, function(){
					var $this = $(this),
						$select = '',
						pos = 0;
			
					$this.children('option').each(function(){
						pos += 1
						pos == 1 ? dis = 'style="display:none"': dis = '';
						$select += '<div class="option" value="'+ $(this).val() +'"' + dis + '>' + $(this).text() + '</div>';
					});
					var imul_opts = '<div class="select_options">' + $select + '</div>';
					//add or replace
					if ($this.parents('.select_block').length <=0){
						$this.wrapAll('<div class="select_block"/>');
						var imul = '<div class="select_imul">\
									<div class="select_selected">\
										<div class="selected_text">' + $("option:first", $this).html() + '</div><div class="selected_arrow"></div>\
									</div>\
								</div>';
						$this.before(imul);
						$this.prev().append(imul_opts);
					} else {
						var sel_val = $this.prev().find('.sel').attr('value'),
							dis_text = $('option:first', this).text();
						$this.prev().find('.select_options').replaceWith(imul_opts);
						$this.prev().find('.option[value="'+sel_val+'"]').addClass('sel');
						$this.prev().find('.selected_text').text(dis_text);
					}
				});
		}
	} 
	$.fn.customSel = function( method_or_options ){
		if (cusel[method_or_options]) return cusel[method_or_options].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method_or_options === 'object' || ! method_or_options) return cusel.init.apply(this, arguments);
		else $.error('Method ' +  method_or_options + ' does not exist on $.customSel');
	}
})(jQuery);

