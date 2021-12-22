$(document).ready(function() { 
	historyAll = new jBox('Modal', { 
		width: 1200,
		height: 500,
		blockScroll: false,
		animation: 'zoomIn',
		draggable: 'title',
		closeButton: true, 
		title: 'Historial Entrega EPP',
		overlay: true,
		reposition: false,
		repositionOnOpen: false 
	});   
});

$(document).on('submit','form#searchEmp', function(){  
	$('#loading').show(); 
	$('form#searchEmp').hide();  

	data = $(this).serialize();

	$.ajax({
		url: 'registro/loadEmp.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('form#searchEmp').show(); 

			$('#empInfo').html(response.formEmp); 
		}
	});

	return false;
});

$(document).on('submit','form#searchEmpEpp', function(){  
	$('#loading').show(); 
	$('form#searchEmpEpp').hide();  

	data = $(this).serialize();

	$.ajax({
		url: 'registro/loadEmpepp.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('form#searchEmpEpp').show(); 

			$('#empInfoepp').html(response.formEmp); 
		}
	});

	return false;
});

$(document).on('change','#wasteType',function(){
				var data = $(this).val();

				$('#wasteType').hide();

				$.ajax({
					url: 'waste/loadCat.php',
					type: 'POST',
					dataType: "json",
					data: "info="+data,
					success: function(response){
						$('#wasteType').show(); 

						$('#reas').val(response.reas); 
						$('#phase').val(response.phase); 
						$('#provier').val(response.provier); 
						$('#auth').val(response.auth);  
					}
				});

				return false;
			});

$(document).on('submit','form#registerEmp', function(){  
	$('#loading').show(); 
	$('form#searchEmp').hide();  

	data = $(this).serialize();

	$.ajax({
		url: 'registro/registerinc.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('form#searchEmp').show(); 

			$('#empInfo').html(response.formEmp); 
		}
	});

	return false;
});

function queryInc(){
	$.ajax({
		url: 'consulta/consultainc.php',
		type: 'POST',
		dataType: "json",
		success: function(response){ 
			$('table#tableQi tbody').html(response.tbody); 
		}
	});
}

$(document).on('submit','form#queryInc', function(){  
	$('#loaderImg').show(); 
	$('#subQuerDate').hide();  

	data = $(this).serialize();

	$.ajax({
		url: 'consulta/queryDate.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loaderImg').hide(); 
			$('#subQuerDate').show(); 

			$('table#tableQi tbody').html(response.tbody); 
		}
	});

	return false;
});
 
function exportQuerEhs(){
	if(confirm('¿Estas seguro que deseas exportar?')){
		window.location='consulta/exportQuer.php?'+$('form#queryInc').serialize();
	}
}

$(function(){
	$("#searchemp").keyup(function() { 
		var searchid = $(this).val();
		var dataString = 'search='+ searchid;
		if(searchid!=''){
			$.ajax({
				type: "POST",
				url: "consulta/queryEmp.php",
				data: dataString,
				cache: false,
				success: function(html){
					$("#result").html(html).show();
					$("#result").css("left","50%");
					$("#result").css("margin-left","7px");
					$("#result").css("margin-top","8px");
				}
			});
		}
		
		return false; 
	});
	
	$(document).on("click",".name",function(e){ 
		var clicked = $(this).text();
		//$('#search_partid').val(clicked);

		$('#loading').show(); 
		$('form#searchEmp').hide();

		var data = 'e_id='+ clicked;

		if(clicked!=''){
			$.ajax({
				url: 'registro/loadEmp.php',
				type: 'POST',
				dataType: "json",
				data: data,
				success: function(response){
					var $clicked = $(e.target);
					if (! $clicked.hasClass("search")){
						$("#result").fadeOut(); 
					}
					$('#loading').hide(); 
					$('form#searchEmp').show(); 

					$('#empInfo').html(response.formEmp); 
				}
			});
		}
	});

	/*$(document).on("click",".name", function(e) { 
		var $clicked = $(e.target);
		if (! $clicked.hasClass("search")){
			$("#result").fadeOut(); 
		}
	});*/

	$('#searchid').click(function(){
		$("#result").fadeIn();
	});
});

$(document).on('submit','#registerRes',function(){
	$('#loaderImg').show();    

	data = $(this).serialize();

	$.ajax({
		url: 'waste/register.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){ 

			$('#loaderImg').hide();   
			$('.willHide').html(response.message);
			$('.willHide').show();
			$('.eraseField').val("");
		}
	});

	return false;
});

$(function(){
	$("#searchempsfatey").keyup(function() { 
		var searchid = $(this).val();
		var dataString = 'search='+ searchid;
		if(searchid!=''){
			$.ajax({
				type: "POST",
				url: "consulta/queryEmp.php",
				data: dataString,
				cache: false,
				success: function(html){
					$("#resultepp").html(html).show();
					$("#resultepp").css("left","50%");
					$("#resultepp").css("margin-left","7px");
					$("#resultepp").css("margin-top","8px");
				}
			});
		}
		
		return false; 
	});
	
	$(document).on("click",".name",function(e){ 
		var clicked = $(this).text();
		//$('#search_partid').val(clicked);

		$('#loading').show(); 
		$('form#searchEmpEpp').hide();

		var data = 'e_id='+ clicked;

		if(clicked!=''){
			$.ajax({
				url: 'registro/loadEmpepp.php',
				type: 'POST',
				dataType: "json",
				data: data,
				success: function(response){
					var $clicked = $(e.target);
					if (! $clicked.hasClass("search")){
						$("#resultepp").fadeOut(); 
					}
					$('#loading').hide(); 
					$('form#searchEmpEpp').show(); 

					$('#empInfoepp').html(response.formEmp); 
				}
			});
		}
	});

	/*$(document).on("click",".name", function(e) { 
		var $clicked = $(e.target);
		if (! $clicked.hasClass("search")){
			$("#result").fadeOut(); 
		}
	});*/

	$('#searchid').click(function(){
		$("#result").fadeIn();
	});
});

$(document).on('submit','form#registerEmpEpp',function(){
	var data = $(this).serialize();

	$('form#registerEmpEpp').hide();

	$.ajax({
		url: 'registro/regeppform.php',
		type: 'POST', 
		data: data,
		success: function(response){
			$('#empInfoepp').html(response); 
		}
	});

	return false;
});

$(document).on('click','#getEppinfo',function(){
	var emp = $('#empIdVal').val(); 

	historyAll.setTitle("Historial EPP").ajax({method: 'post',url: 'consulta/getAllEpp.php',data: 'emp='+emp,reload: 'strict'}).open(); 
});

$(document).on('submit','form#getEpphistdate',function(){
	var data = $('form#getEpphistdate').serialize();

	$('form#getEpphistdate').hide();

	$.ajax({
		url: 'consulta/getAllEpp.php',
		type: 'POST', 
		data: data,
		success: function(response){
			$('form#getEpphistdate').show();
			$('table#infoAllTable tbody').html(response); 
		}
	});

	return false;
});

$( document ).on( 'click', '.btnEliminar', function ( ) {
	if (confirm("¿Estas seguro de Eliminar esta fila?")) {
	var id=$(this).attr('id');
	$.ajax({
		url: 'registro/updateEPP.php',
		type: 'POST', 
		data: 'id='+id,
		success: function(response){
			//$('form#getEpphistdate').show();
			alert("Se ha eliminado el registro");
			//$('table#infoAllTable tbody').html(response); 
		}
	});

	return false;
}
});

$( document ).on( 'change', '#selectArea', function ( ) {
	var area=$(this).val();
	$.ajax({
		url: 'consulta/buscaArea.php',
		type: 'POST', 
		data: 'area='+area,
		success: function(response){
			
			
			$('#tbody').html(response); 
		}
	});
	return false;
});