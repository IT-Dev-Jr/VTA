
function lines() {
	var url = '../lines.php';
	var type = 'POST';
    var data = $('form#dep_change').serialize();
    $.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('#line_sel').html(response.select);
		}
	});
}

function display_info(){
	$('#line_change').hide(); 
	$('#loading').show();

	var url = '../line_display.php';
	var type = 'POST';
    var data = $('form#line_change').serialize();
    $.ajax({
		url: url,
		type: type,
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#line_change').show();
			
			$('.main').html(response);
		}
	});
}

$(document).on('submit','form#searchbetween', function(){  
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	if($('#dep_sel').val() == 15) var url = "../line_display_lec.php";
	else if($('#dep_sel').val() == 14) var url = "../line_display_ware.php";
	else if($('#dep_sel').val() == 16) var url = "../line_display_press.php";
	else if($('#dep_sel').val() == 25) var url = "../line_display_scollins.php";
	else if($('#dep_sel').val() == 33) var url = "../line_display_scollinsv2.php";
	else if($('#dep_sel').val() == 99) var url = "../line_display_rh.php";
	else var url = "../line_display.php";

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).on('click','#line_spec_date', function(){
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	data = $(this).attr('href');

	$.ajax({
		url: '../line_display.php',
		type: 'POST',
		dataType: "JSON",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).on('click','#line_spec_date_ware', function(){
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	data = $(this).attr('href');

	$.ajax({
		url: '../line_display_ware.php',
		type: 'POST',
		dataType: "JSON",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).on('click','#line_spec_date_lectra', function(){
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	data = $(this).attr('href');

	$.ajax({
		url: '../line_display_lec.php',
		type: 'POST',
		dataType: "JSON",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).on('click','#line_spec_date_scollins', function(){
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	data = $(this).attr('href');

	$.ajax({
		url: '../line_display_scollins.php',
		type: 'POST',
		dataType: "JSON",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).on('click','#line_spec_date_press', function(){
	$('#loading').show(); 
	$('#searchbetween').hide(); 

	data = $(this).attr('href');

	$.ajax({
		url: '../line_display_press.php',
		type: 'POST',
		dataType: "JSON",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('.main').html(response.main);
			$('#searchbetween').html(response.formulario);
			$('table#graphfrjp tbody').html(response.jptable);
			$('table#graphfrjp thead').html(response.jptablehead);
		}
	});

	return false;
});

$(document).ready(function(){
	$(document).on('mouseenter','.masterTooltip', function(){  
		var title = $(this).attr('title');
	    $(this).data('tipText', title).removeAttr('title');
	    $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
	}).mousemove(function(e) {
            var mousex = e.pageX + 20; //Get X coordinates
            var mousey = e.pageY + 10; //Get Y coordinates
            $('.tooltip').css({ top: mousey, left: mousex })
    });

    $(document).on('mouseleave','.masterTooltip', function(){  
		$(this).attr('title', $(this).data('tipText'));
    	$('.tooltip').remove();
	});
});

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

function newdate(baseid,date,split,olddate){
	$('.overlay').show();

	var form = '<h1>Por favor selecciona la nueva fecha.</h1>';
		form = form+'<form id="newdatewo" action="../fechas/change_date.php" method="POST">';
		form = form+'<input type="date" name="newdate" value="'+date+'" required/><br>';
		form = form+'<input type="hidden" value="'+baseid+'" name="baseid">';
		form = form+'<input type="hidden" value="'+split+'" name="split">';
		form = form+'<input type="hidden" value="'+olddate+'" name="olddate">';
		form = form+'<textarea placeholder="Escribe la causa" name="reason" required></textarea><br>';
		form = form+'<input type="submit" value="Registrar"/>';
		form = form+'</form>';

	$(".datesel").css("display", "block");
	$(".datesel").css("position", "fixed");
    $(".datesel").css("top", "35%");
	$(".datesel").css("margin-top", "-75px");
	$('.datesel').show();

	$('.datesel').html(form);

	return false;
}

$(document).on('submit','form#newdatewo', function(){  
	var that = $(this),
		url = that.attr('action'),
		type = that.attr('method'),
		data = {};

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('.datesel').html(response.newdata);
		}
	});

	return false;
});

function newdateLec(baseid,date,split,olddate){
	$('.overlay').show();

	var form = '<h1>Por favor selecciona la nueva fecha.</h1>';
		form = form+'<form id="newdatewolec" action="../fechas/change_date_lec.php" method="POST">';
		form = form+'<input type="date" name="newdate" value="'+date+'" required/><br>';
		form = form+'<input type="hidden" value="'+baseid+'" name="baseid">';
		form = form+'<input type="hidden" value="'+split+'" name="split">';
		form = form+'<input type="hidden" value="'+olddate+'" name="olddate">';
		form = form+'<textarea placeholder="Escribe la causa" name="reason" required></textarea><br>';
		form = form+'<input type="submit" value="Registrar"/>';
		form = form+'</form>';

	$(".datesel").css("display", "block");
	$(".datesel").css("position", "fixed");
    $(".datesel").css("top", "35%");
	$(".datesel").css("margin-top", "-75px");
	$('.datesel').show();

	$('.datesel').html(form);

	return false;
}

$(document).on('submit','form#newdatewolec', function(){  
	var that = $(this),
		url = that.attr('action'),
		type = that.attr('method'),
		data = {};

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('.datesel').html(response.newdata);
		}
	});

	return false;
});

function newdateware(baseid,date,split,olddate){
	$('.overlay').show();

	var form = '<h1>Por favor selecciona la nueva fecha.</h1>';
		form = form+'<form id="newdatewoware" action="../fechas/change_date_ware.php" method="POST">';
		form = form+'<input type="date" name="newdate" value="'+date+'" required/><br>';
		form = form+'<input type="hidden" value="'+baseid+'" name="baseid">';
		form = form+'<input type="hidden" value="'+split+'" name="split">';
		form = form+'<input type="hidden" value="'+olddate+'" name="olddate">';
		form = form+'<textarea placeholder="Escribe la causa" name="reason" required></textarea><br>';
		form = form+'<input type="submit" value="Registrar"/>';
		form = form+'</form>';

	$(".datesel").css("display", "block");
	$(".datesel").css("position", "fixed");
    $(".datesel").css("top", "35%");
	$(".datesel").css("margin-top", "-75px");
	$('.datesel').show();

	$('.datesel').html(form);

	return false;
}

$(document).on('submit','form#newdatewoware', function(){  
	var that = $(this),
		url = that.attr('action'),
		type = that.attr('method'),
		data = {};

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('.datesel').html(response.newdata);
		}
	});

	return false;
});

function newdatepress(baseid,date,split,olddate){
	$('.overlay').show();

	var form = '<h1>Por favor selecciona la nueva fecha.</h1>';
		form = form+'<form id="newdatewopress" action="../fechas/change_date_press.php" method="POST">';
		form = form+'<input type="date" name="newdate" value="'+date+'" required/><br>';
		form = form+'<input type="hidden" value="'+baseid+'" name="baseid">';
		form = form+'<input type="hidden" value="'+split+'" name="split">';
		form = form+'<input type="hidden" value="'+olddate+'" name="olddate">';
		form = form+'<textarea placeholder="Escribe la causa" name="reason" required></textarea><br>';
		form = form+'<input type="submit" value="Registrar"/>';
		form = form+'</form>';

	$(".datesel").css("display", "block");
	$(".datesel").css("position", "fixed");
    $(".datesel").css("top", "35%");
	$(".datesel").css("margin-top", "-75px");
	$('.datesel').show();

	$('.datesel').html(form);

	return false;
}

$(document).on('submit','form#newdatewopress', function(){  
	var that = $(this),
		url = that.attr('action'),
		type = that.attr('method'),
		data = {};

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('.datesel').html(response.newdata);
		}
	});

	return false;
});


function newdateScol(baseid,date,split,olddate){
	$('.overlay').show();

	var form = '<h1>Por favor selecciona la nueva fecha.</h1>';
		form = form+'<form id="newdatewoscol" action="../fechas/change_date_scol.php" method="POST">';
		form = form+'<input type="date" name="newdate" value="'+date+'" required/><br>';
		form = form+'<input type="hidden" value="'+baseid+'" name="baseid">';
		form = form+'<input type="hidden" value="'+split+'" name="split">';
		form = form+'<input type="hidden" value="'+olddate+'" name="olddate">';
		form = form+'<textarea placeholder="Escribe la causa" name="reason" required></textarea><br>';
		form = form+'<input type="submit" value="Registrar"/>';
		form = form+'</form>';

	$(".datesel").css("display", "block");
	$(".datesel").css("position", "fixed");
    $(".datesel").css("top", "35%");
	$(".datesel").css("margin-top", "-75px");
	$('.datesel').show();

	$('.datesel').html(form);

	return false;
}

$(document).on('submit','form#newdatewoscol', function(){  
	var that = $(this),
		url = that.attr('action'),
		type = that.attr('method'),
		data = {};

	data = $(this).serialize();

	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		data: data,
		success: function(response){
			$('.datesel').html(response.newdata);
		}
	});

	return false;
});


$(document).on('click','.showallhr', function(ev) {
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