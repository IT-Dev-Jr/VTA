function stop_op(trans_id,type){
	$('#iniciar_op').hide();
	$('#fin_op').hide();
	$('.overlay').show();
	$('.stop').show();

	$('.box1').html('<p>Cargando informaci&oacute;n <img src="../../img/line_loader.gif"></p>');
	$('.box2').html('<p>Cargando informaci&oacute;n <img src="../../img/line_loader.gif"></p>');

	$('#loadingmessage').show();
	$('#loading').show();
	$('#abiertas_inicio').hide();
	$('#loadingabiertas').show();

	var code = 'id_trans='+trans_id+'&type='+type;

	$.ajax({
		url: '../interface/close/stop.php',
		type: 'POST',
		dataType: "json",
		data: code,
		success: function(response){
			$('#iniciar_op').show();
			$('#fin_op').show();
			$('#loadingmessage').hide();
			$('#loading').hide();
			$('#loadingabiertas').hide();
			$('#abiertas_inicio').show();

			$('.box1').html(response.box1);
			$('.box2').html(response.box2);
		}
	});

	return false;
}


$(document).on('submit','form#finish_op',function(){
	var hr = $('input#hr').val();
	var min = $('input#min').val();

	if (hr == 0 && min == 0) {
		$('p#ErrMssBox').html('El tiempo trabajado debe ser mayor a 0.');
		$('.errorWindows').show();
	}else{
		lastSubmit();
	} 

	return false;
});

function lastSubmit(){
	data = $('form#finish_op').serialize();

	$('.button').hide();
	$('.loadingStpBtt').show();
	$('.finalP').html('Por favor espera');

	$.ajax({
		url: '../interface/close/submit.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('.overlay').hide();
			$('.stop').hide();

			$('#mensajes').html(response.messageBox);
			$('table#openedOps tbody').html(response.openedOps);
		}
	});
}

function blocGsix(mess){
	$('p#ErrMssBox').html(mess);
	$('.errorWindows').show();
}