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
		}
	});

	return false;
});