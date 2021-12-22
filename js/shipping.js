$(document).ready(function() {  
	confirmNew = new jBox('Confirm', {
	    confirmButton: 'Registrar',
	    cancelButton: 'Cancelar',
	    content: '',
	    closeOnConfirm: false, 
	    title: 'Ingresa los datos requeridos para continuar',
	    confirm: function () {
			newHt('Y');
	    },
	    cancel: function () {
	    	confirmNew.close();
	    }
	});

	cancelB = new jBox('Confirm', { 
	    confirmButton: 'Cancelar',
	    cancelButton: 'Cerrar',
	    content: '',
	    closeOnConfirm: false, 
	    title: 'Ingresa causa y contraseña',
	    setContent: '<form',
	    confirm: function () {
			canelcurrbatch();
	    },
	    cancel: function () {
	    	cancelB.close();
	    }
	});

	binaryInfo = new jBox('Modal', {
		width: 480,
		height: 270,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Datos de la factura',
		overlay: false,
		reposition: false,
		repositionOnOpen: false, 
		content: '<div id="woInfo">test</div>'
	});

	addWo = new jBox('Modal', {
		attach: '#pendWo',
		width: 750,
		height: 500,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Registra tus Facturas',
		overlay: true,
		reposition: false,
		repositionOnOpen: false,
		ajax: {
	      method: 'post',
	      url: 'wo/add.php',
	      data: {
	        html: 'Test'
	      },
	      reload: 'strict'
	    }
	});

	pending = new jBox('Modal', {
		attach: '.openPend',
		width: 830,
		height: 500,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Selecciona un BATCH',
		overlay: true,
		reposition: false,
		repositionOnOpen: false,
		ajax: {
	      method: 'post',
	      url: 'openPend.php',
	      data: {
	        html: 'Test'
	      },
	      reload: 'strict'
	    }
	});

	timer = new jBox('Modal', { 
		width: 1190,
		height: 545,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Iniciar Timer', 
		overlay: true,
		reposition: false,
		repositionOnOpen: false 
	});

	lastForm = new jBox('Modal', {
		attach: '#lasformb',
		width: 680,
		height: 470,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Información Adicional',
		overlay: true,
		reposition: false,
		repositionOnOpen: false,
		ajax: {
	      method: 'post', 
	      url: 'lastForm/lastform.php',
	      setContent: true,
	      reload: 'strict'
	    }
	});

	report = new jBox('Modal', {
		attach: '.reportOp',
		width: 1190,
		height: 600,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Reporte de embarques',
		overlay: true,
		reposition: false,
		repositionOnOpen: false,
		ajax: {
	      method: 'post', 
	      url: 'report/getinfo.php',
	      setContent: true,
	      reload: 'strict'
	    }  
	});
}); 

function newHt(quench){
	if ($('#startNew').valid()) {
		$('.jBox-Confirm-footer').hide();
		var data = $('#startNew').serialize();

		$.ajax({
			url: 'new.php',
			type: 'POST',
			dataType: "json",
			data: data,
			success: function(response){ 
				$('.jBox-Confirm-footer').show();
				confirmNew.close();

				if(response.error == 'n'){
			       	$('#ErrMssBox').html('Error al registrar');
			       	$('.errorWindows').show();
			       	$('.overlay').show(); 
		        }else{
			       	$('#oldmen').hide();
			       	$('#newmen').show();
			       	$('#batchID').html(response.error);
			       	addWo.open();
		       }
			}
		});
	} 

	return false;
}

$(document).on('submit','.woForm',function(){
	var data = $(this).serialize();
	addWo.setContent('Leyendo...');

	$.ajax({
		url: 'wo/newWo.php',
		type: 'POST', 
		data: data,
		success: function(response){  
			addWo.setContent(response);
		}
	});

	return false;
});


$(document).on('submit','.formaddwon',function(){
	var data = $(this).serialize();
	addWo.setContent('Leyendo...');

	$.ajax({
		url: 'wo/newWoaddA.php',
		type: 'POST', 
		data: data,
		success: function(response){  
			addWo.setContent(response);
		}
	});

	return false;
});


$(document).on('submit','.form_del',function(){
	if (confirm('¿Estas segur@ que deseas eliminar?')) {
		var data = $(this).serialize();
		$('.floatTable').hide();

		$.ajax({
			url: 'wo/delete.php',
			type: 'POST', 
			data: data,
			success: function(response){
				$('.floatTable').show();
				$("#addWoId").val('');
				$("#addWoId").focus();
				$('table.floatTable tbody').html(response);
			}
		});
	}
	
	return false;
});

$(document).on('click','.retakeButt',function(){
	var name = this.name;

	$.ajax({
		url: 'openOldBatch.php',
		type: 'POST', 
		data: 'batch='+name,
		success: function(response){
			$('#oldmen').hide();
	       	$('#newmen').show();
	       	$('#batchID').html(response);
	       	pending.close();
	       	report.close();
		}
	});
});

$(document).on('click','.watchWo',function(){
	var name = this.name;

	window.open("report/letter.php?batchslipno="+name,'_blank');
});

$(document).on('click','.imgUser',function(){
	$('#oldmen').show();
	$('#newmen').hide();
});  

$(document).on('submit','#lastForm',function(){
	var data = $(this).serialize();
	
	$('#lastForm').hide();

	$.ajax({
		url: 'lastForm/submit.php',
		type: 'POST',  
		data: data,
		success: function(response){ 
			if (response == 'err') {
				$('#ErrMssBox').html('Error al registrar');
		       	$('.errorWindows').show();
		       	$('.overlay').show();
		       	$('#formdivs').show();
		    }else{
		       	lastForm.close();
		       	$('#ErrMssBox').html('¡Registro exitoso!');
		       	$('.errorWindows').show();
		       	$('.overlay').show();
		    } 
		}
	});

	return false;
});

$(document).on('submit','#openreport',function(){
	var data = $(this).serialize(); 

	$.ajax({
		url: 'report/get.php',
		type: 'POST',  
		data: data,
		success: function(response){ 
			$('table.floatTable tbody').html(response); 
		}
	});

	return false;	
});


$(document).on('click','.getBinaInstr',function(){
	var name = this.name;
	binaryInfo.open();
	$('#woInfo').html('Leyendo información');

	$.ajax({
		url: 'wo/readInfo.php',
		type: 'POST',  
		data: 'wo='+name,
		success: function(response){ 
			$('#woInfo').html(response);
		}
	});
});

$(document).on('click','.newVal',function(){
	var data = $(this).attr('href');

	confirmNew.setTitle("Ingresa los datos requeridos para continuar").ajax({method: 'post',url: 'getInitialForm.php', data: 'type='+data,reload: 'strict'}).open();
 
	  
	return false;
}); 

$(document).on('click','#cancelBatch',function(){
	cancelB.setContent('<form id="cancelBatchfor"><input type="text" name="user" placeholder="Ingresa usuario" required/><br><br><input type="password" name="pass" placeholder="Ingresa tu contraseña" required/><br><br><textarea name="comments" maxlength="128 placeholder="Ingresa la causa." required></textarea></form>').open();

	return false;
});

function canelcurrbatch(){
	if($('#cancelBatchfor').valid()){
		$('.jBox-Confirm-footer').hide();

	var data = $('#cancelBatchfor').serialize();

	$.ajax({
		url: 'cancelbtch.php',
		type: 'POST',  
		data: data, 
		success: function(response){
			$('.jBox-Confirm-footer').show();
			cancelB.close(); 
		    $('#ErrMssBox').html(response);
			$('.errorWindows').show();
			$('.overlay').show();    
		}
	});
	 
	}
	

	return false;
}

$(document).on('click','#info',function(){  
	window.open("report/letter.php",'_blank');
});

$(document).on('click','#exportshipments',function(){ 
	window.open('report/exportshippments.php', '_blank');			 			 
});