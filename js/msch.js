$(document).on('submit','form#searchbetween', function(){  
	$('#loading').show(); 
	$('#searchbetween').hide(); 
  
	data = $(this).serialize();

	$.ajax({
		url: 'activateWO.php',
		type: 'POST', 
		data: data,
		dataType: 'JSON',
		success: function(response){
			$('#loading').hide(); 
			$('#searchbetween').show(); 

			$('table#logbook tbody').html(response.tbody); 
			$('#comments').html(response.data);
			$('#comments').html(response.plawo); 
		}
	});

	return false;
});
