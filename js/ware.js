$(document).ready(function() {    
	report = new jBox('Modal', { 
		width: 640,
		height: 380,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Reporte de embarques',
		overlay: true,
		reposition: false,
		repositionOnOpen: false 
	});
}); 

$(document).on('submit','form#insertNewWO',function(){
	var data = $(this).serialize();
	$('#woid').hide();
	$('#loaderImg').show();
	$('table#tableQi tbody').html('<tr><td colspan="7"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 

	$.ajax({
		url: 'in/registerWo.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#woid').show();
			$('#loaderImg').hide();
			$('#woid').val("");

			if (response.statErr === 'incorrect'){ 
				$('#ErrMssBox').html(response.message);
				$('.errorWindows').show();
				$('#woid').val("");
			}else{ 
				$('#woid').focus();
			}

			$('table#tableQi tbody').html(response.tbody); 
		}
	});

	return false;
});


$(document).on('click','.issueWO',function(){
	var data = "wo="+$(this).attr('href');
	$('.ehsQuery').show();
	$('.overlay').show(); 
	$('#wo4Form').val($(this).attr('href'));

	$('#woTotl').html($(this).attr('href')); 
	$('table#tableQi tbody').html('<tr><td colspan="11"><img src="../../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('#submitIss').hide();

	$.ajax({
		url: 'getMaterials.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('table#tableQi tbody').html(response.tbody); 
			$('#submitIss').show();
		}
	});

	return false; 
});

$(document).on('click','.issueWOAll',function(){
	var data = "wo="+$(this).attr('href');
	$('.ehsQuery').show();
	$('.overlay').show(); 
	$('#wo4Form').val($(this).attr('href'));

	$('#woTotl').html($(this).attr('href')); 
	$('table#tableQi tbody').html('<tr><td colspan="11"><img src="../../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('#submitIss').hide();

	$.ajax({
		url: 'getMaterialsAll.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('table#tableQi tbody').html(response.tbody); 
			$('#submitIss').show();
		}
	});

	return false; 
});

$(document).on('submit','#issueMat',function(){
	if (confirm("¿Estas seguro de dar issue a los materiales seleccionados?")) {
		$('.overlay').hide();
		$('.back').hide(); 

		var data = $(this).serialize();  
		$('table#tableQi tbody').html('<tr><td colspan="11"><img src="../../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
		$('#submitIss').hide();

		$.ajax({
			url: 'generateIssue.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){
				$('.overlay').show();
				$('.back').show(); 
				$('table#tableQi tbody').html(response.tbody); 
				$('#submitIss').show();
			}
		});
	}
	

	return false; 
});

$('#select_all').change(function() {
    var checkboxes = $(this).closest('form').find(':checkbox');
    if($(this).is(':checked')) {
        checkboxes.prop('checked', true);
    } else {
        checkboxes.prop('checked', false);
    }
});
 
function getTop20(){
	var data = 'data=1'; 
	$('table#tableQi tbody').html('<tr><td colspan="7"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 

	$.ajax({
		url: 'in/registerWo.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){    
			$('table#tableQi tbody').html(response.tbody); 
		}
	});

	return false;
}

function loadGiveWo(data){ 
	$('table#table1 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('table#table2 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('table#table3 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 

	$.ajax({
		url: 'give/loadWo.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){    
			$('table#table1 tbody').html(response.t1); 
			$('table#table2 tbody').html(response.t2);
			$('table#table3 tbody').html(response.t3);
		}
	});

	return false;
}

$(document).on('change','#ChangeLine',function(){
	$('table#table1 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('table#table2 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	$('table#table3 tbody').html('<tr><td colspan="5"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 

	$.ajax({
		url: 'give/loadWo.php',
		type: 'POST',
		dataType: "json",
		data: "dep="+$('#ChangeLine').val(),
		success: function(response){    
			$('table#table1 tbody').html(response.t1); 
			$('table#table2 tbody').html(response.t2);
			$('table#table3 tbody').html(response.t3);
		}
	});

	return false;
});

$(document).on('click','.getWoInfo',function(){
	var data = $(this).attr('href');
	$('table#materialsInfo tbody').html('<tr><td colspan="7"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>'); 
	

	$('#materials').show();
	$('#headingWO').html(data);

	$.ajax({
		url: 'give/getMaterials.php',
		type: 'POST',
		dataType: "json",
		data: "wo="+data,
		success: function(response){    
			$('table#materialsInfo tbody').html(response.tbody);  
		}
	}); 

	return false;
});


$(document).on('submit','#lastWareSub',function(){
	$('.overlayMore').show();
	$('.submitLogin').show();

	return false;
});

$(document).on('submit','#formLogin',function(){ 
	$('#registraLastr').hide();
	$('.overlayMore').hide();
	$('#loadingFormf').show();

	var data = $(this).serialize()+"&"+$('#lastWareSub').serialize()+"&dep="+$('#ChangeLine').val();
 

	$.ajax({
		url: 'give/registerData.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){    
			$('#userInputpass').val('');
		
			$('.submitLogin').hide();
			$('#loadingFormf').hide();
			$('#registraLastr').show();


			if (response.hide == '1') {
				$('#ErrMssBox').html(response.error);
				$('.errorWindows').show();
			}else{
				$('table#table1 tbody').html(response.t1); 
				$('table#table2 tbody').html(response.t2);
				$('table#table3 tbody').html(response.t3);
			}
		}
	});

	return false;
});

$(document).on('click','.overlayMore',function(){ 
	$('.overlayMore').hide();
	$('.submitLogin').hide();
});

$(document).on('click','#getComData',function(){ 
	if( !$('#startDate').val() || !$('#endDate').val() ) {
		$('#ErrMssBox').html('Ingresa fecha');
        $('.errorWindows').show();
    }else{
    	var data = $('#queryInc').serialize();
    	$('table#tableQueryRep tbody').html('<tr><td colspan="6"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
    	

		$.ajax({
			url: 'reports/getcom.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){     
				$('table#tableQueryRep thead').html(response.thead);
				$('table#tableQueryRep tbody').html(response.tbody);
			}
		});
    } 
});

$(document).on('click','#getWoDatas',function(){
	if( !$('#startDate').val() || !$('#endDate').val() ) {
        $('#ErrMssBox').html('Ingresa fecha');
        $('.errorWindows').show();
    }else{
    	var data = $('#queryInc').serialize();
    	$('table#tableQueryRep tbody').html('<tr><td colspan="11"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
    	

		$.ajax({
			url: 'reports/getres.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){    
				$('table#tableQueryRep thead').html(response.thead);
				$('table#tableQueryRep tbody').html(response.tbody);  
			}
		}); 
    } 
});

$(document).on('click','#getiseData',function(){
	if( !$('#startDate').val() || !$('#endDate').val() ) {
        $('#ErrMssBox').html('Ingresa fecha');
        $('.errorWindows').show();
    }else{
    	var data = $('#queryInc').serialize();
    	$('table#tableQueryRep tbody').html('<tr><td colspan="7"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
    	

		$.ajax({
			url: 'reports/getiseData.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){     
				$('table#tableQueryRep thead').html(response.thead);
				$('table#tableQueryRep tbody').html(response.tbody); 
			}
		});
    } 
});

$(document).on('click','#getrejData',function(){
	if( !$('#startDate').val() || !$('#endDate').val() ) {
        $('#ErrMssBox').html('Ingresa fecha');
        $('.errorWindows').show();
    }else{
    	var data = $('#queryInc').serialize();
    	$('table#tableQueryRep tbody').html('<tr><td colspan="10"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
    	

		$.ajax({
			url: 'reports/getRej.php',
			type: 'POST',
			dataType: "JSON",
			data: data,
			success: function(response){    
				$('table#tableQueryRep thead').html(response.thead);
				$('table#tableQueryRep tbody').html(response.tbody);  
			}
		}); 
    } 
});

$(document).on('click','.updateWOcom',function(){
 	if (confirm("¿Estas segur@ que deseas eliminar la entrega?")) {
 		if( !$('#startDate').val() || !$('#endDate').val() ) {
	        $('#ErrMssBox').html('Ingresa fecha');
	        $('.errorWindows').show();
	    }else{
	    	var href = $(this).attr('href');
	    	var data = "updatewo="+href+"&"+$('#queryInc').serialize();
	    	$('table#tableQueryRep tbody').html('<tr><td colspan="10"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
	    	

	     
			$.ajax({
				url: 'reports/updateWO.php',
				type: 'POST',
				dataType: "json",
				data: data,
				success: function(response){    
					$('table#tableQueryRep thead').html(response.thead);
					$('table#tableQueryRep tbody').html(response.tbody);  
				}
			}); 
	    } 
 	} 

 	return false;
});

$(document).on('click','.deleteWOcom',function(){
	 if (confirm("¿Estas segur@ que deseas eliminar el WO?")) {
 		if( !$('#startDate').val() || !$('#endDate').val() ) {
	        $('#ErrMssBox').html('Ingresa fecha');
	        $('.errorWindows').show();
	    }else{
	    	var href = $(this).attr('href');
	    	var data = "deleteWO="+href+"&"+$('#queryInc').serialize();
	    	$('table#tableQueryRep tbody').html('<tr><td colspan="10"><img src="../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
	    	


			$.ajax({
				url: 'reports/deleteWO.php',
				type: 'POST',
				dataType: "json",
				data: data,
				success: function(response){    
					$('table#tableQueryRep thead').html(response.thead);
					$('table#tableQueryRep tbody').html(response.tbody);  
				}
			}); 
	    } 
 	} 

 	return false;
});

$(document).on('submit','#getMatdel',function(){
	var data = $(this).serialize();
	$('table#getWO tbody').html('<tr><td colspan="6"><img src="../../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');

	$.ajax({
		url: 'searchDel.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){    
			$('table#getWO tbody').html(response.tbody);  
		}
	}); 

	return false;
});

$(document).on('submit','#delWoIss',function(){
	if (confirm('¿Estas segur@ que deseas eliminar? Esta acción no se puede deshacer.')) {
		var data = $(this).serialize();
		$('table#getWO tbody').html('<tr><td colspan="6"><img src="../../../../img/infinity.gif" height="30" width="30"> Cargando informaci&oacute;n</td></tr>');
 		$('.subWare').hide();

		$.ajax({
			url: 'perDelIss.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){    
				$('table#getWO tbody').html(response.tbody);  
				$('.subWare').show();
			}
		}); 
	}

	return false;
});