$(document).on('click','.showallcom', function(ev) {
	ev.preventDefault();
	var addressValue = $(this).attr("href");

	$.get(addressValue, function(json) {
	  	$('.infowo').html(json.component);
	  	$(".infowo").css("display", "block");
	  	$(".infowo").css("position", "fixed");
	  	$(".infowo").css("top", "17%");
	  	$(".infowo").css("margin-top", "-75px");
	  	$('.infowo').show();
	  	$('.overlay').show();
	}, 'json');
});

$(document).on('click','.overlay', function(ev) {
	$('.infowo').hide();
	$('.overlay').hide();
	$('.datesel').hide();
});

$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
        $('.infowo').hide();
		$('.overlay').hide();
		$('.datesel').hide();
    }
});