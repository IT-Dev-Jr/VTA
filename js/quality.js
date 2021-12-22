$(document).on('submit','form#searchbetween', function(){  
	$('#loading').show(); 
	$('#searchbetween').hide(); 

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
		url: 'ftq/line_display.php',
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