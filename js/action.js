function init(){
	tab();
	more();
	selectMenu();
}
function tab(){
	$('.tab_list a').click(function(e){
		$('.tab_list .active').removeClass('active');
		$(this).parent().addClass('active');
		
		$('.tab_content').each(function(){
			$(this).removeClass('active');
		});
		$(this.hash).addClass('active');
		
		e.preventDefault();
	});
}
function more(){
	$('.more').click(function(e){
		$(this).parent().find('li').fadeIn();
		$(this).hide();
		
		e.preventDefault();			
	});
}
function selectMenu(){
	$('#select_menu').change(function(){
		location.href = '#'+$(this).val();
	});
}

$(function(){
	init();
});