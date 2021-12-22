$(window).load(function() {
	$(".loader").fadeOut("slow");
})

$(document).on('submit','form.ajax',function(){
	$('#iniciar_op').hide();
	$('#fin_op').hide();

	$('#mensajes').html('<span class="title">Area de Mensajes<br><br>Cargando operaci&oacute;n...</span>');
	$('table#abiertas_inicio tbody').html('<tr><td colspan="4"><h2>Iniciando operaci&oacute;n...</h2></td></tr>');
	$('#loadingmessage').show();
	$('#loading').show();

	var code = $(this).serialize();

	$.ajax({
		url: 'open/start.php',
		type: 'POST',
		dataType: "json",
		data: code,
		success: function(response){
			$('#loadingmessage').hide();
			$('#loading').hide();

			$('#iniciar_op').show();
			$('#fin_op').show();

			$('#registroajax').val('');
			$('#registroajax').trigger('focus');
			$('#mensajes').html(response.messageBox);
			$('table#openedOps tbody').html(response.tbodyOpened);

			if (response.op == 'y') {
				$('p#ErrMssBox').html('Operaci&oacute;n cerrada, posible WO duplicado, reporta a tu supervisor.');
				$('.errorWindows').show();
			}
		}
	});

	return false;
});

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
		url: 'close/stop.php',
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

$(document).on('change','#final_ins',function(){
	if ($('input[name="final_ins"]:checked').length > 0) {
        var goodQty = $('input#maxInsSpec').val();
    	$('#goodQty').attr('max', goodQty);
    	$('#totQty').attr('max', goodQty);
    }else{
    	var goodQty = $('input#maxHidden').val();
    	$('#goodQty').attr('max', goodQty);
    	$('#totQty').attr('max', goodQty);
    }
});

$(document).on('submit','form#finish_op',function(){
	if ($('input[name="final_ins"]:checked').length > 0) {
		var goodQty = $('input#goodQty').val();
		var badQty = $('input#badQty').val();

		console.log("here");

		/*if (goodQty == 0) {
			$('p#ErrMssBox').html('La cantidad de piezas buenas debe ser mayor a 0.');
			$('.errorWindows').show();
		}else if(badQty>0){
			$('p#ErrMssBox').html('No puedes ingresar piezas malas');
			$('.errorWindows').show();
		}else{*/
			lastSubmit();
		//}
	}else{
		lastSubmit();
	}

	return false;
});

function lastSubmit(){
	if (confirm('¿Estas segur@ que deseas liberar?')) {
		data = $('form#finish_op').serialize();

		$('.button').hide();
		$('.loadingStpBtt').show();
		$('.finalP').html('Por favor espera');

		$.ajax({
			url: 'close/submit.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){
				$('.overlay').hide();
				$('.stop').hide();

				$('#mensajes').html(response.messageBox);
				$('table#openedOps tbody').html(response.openedOps);

				$('#registroajax').val('');
				$('#registroajax').trigger('focus');
			}
		});
	} 
}

function blocGsix(mess){
	$('p#ErrMssBox').html(mess);
	$('.errorWindows').show();
}

$(document).on('click','#labelE',function(){
	var data = $('#pnOpMess').val();

	 window.open('solutions/lectroetch.php?info='+data,'_blank ');
	return false;
});

$(document).on('submit','form#drawingehs',function(){
	var data = $(this).serialize();

	$('#infode').hide(); 

	$.ajax({
		url: 'solutions/ehsreg.php',
		type: 'POST', 
		data: data,
		success: function(response){ 
			$('#infode').show(); 
			$('#infode').html(response); 
		}
	});

	return false;
});

$(document).on('change','#selectBus',function(){
	var data = $(this).val();

	$('#selectBus').hide(); 

	$.ajax({
		url: 'solutions/getBusdetail.php',
		type: 'POST', 
		data: 'bus='+data,
		success: function(response){ 
			$('#selectBus').show(); 
			$('#bussub').show();
			$('.busoptions').html(response); 
		}
	});

	return false;
});

$(document).on('submit','form.submitbusstop',function(){
	var data = $(this).serialize();

	$('.submitbusstop').hide(); 

	$.ajax({
		url: 'solutions/savebus.php',
		type: 'POST', 
		data: data,
		dataType: 'JSON',
		success: function(response){ 
			if (response.okreg == 'ok') {
				$('.overlayNoClose').hide(); 
				$('.nocloseForm').hide();

				$('#new_op').html(response.info); 
			}else if(response.okreg == 'noout'){
				$('p#ErrMssBox').html('Para finalizar ingresa la info. requerida.');
				$('.errorWindows').show();

				$('.nocloseForm').html(response.info);
			}else{
				$('p#ErrMssBox').html(response.info);
				$('.errorWindows').show();
			}
		}
	});

	return false;
});

$(document).on('click','#changebus',function(){
	$('.overlayNoClose').show();
	$('.nocloseForm').show();

	return false;
});




