$(document).on('change','.label',function(){
	var idTag = $(this).val();

	 
	var form = "<form id='getWO'><input type='text' name='wo' id='woValue' placeholer='Ingresa el WO' autofocus><br> </form>";
	form = form + "<form id='labelForm'><input type='hidden' name='idTag' value='"+idTag+"'/>";
	form = form + "<select name='subid' id='subwoid'><option>Ingresa WO</option></select><br>";
	form = form + "<input type='submit' value='Generar'>";
	form = form + "</form>";

	$(this).parent().html(form);
});

$(document).on('submit','form#getWO',function(e){
	//var code = e.keyCode || e.which;
    //if (code == '9') {
   	var wo = "wo="+$('#woValue').val();
	$('#subwoid').hide();

    $.ajax({
		url: 'getSub.php',
		type: 'POST',
		dataType: "json",
		data: wo,
		success: function(response){ 
			$('#subwoid').show();  
			$('#subwoid').html(response.options); 
		}
	});
    //}
    return false;
});

 $(document).on('submit','#labelForm',function(){ 
 	var id = $(this).parent().attr("id"); 
 	data = $(this).serialize();
 	
 	$.ajax({
		url: 'getLabel.php',
		type: 'POST',
		dataType: "json",
		data: data+'&wo='+$('#woValue').val(),
		success: function(response){  
			$('#'+id).html(response.options); 
		}
	}); 

 	return false;
 });

 $(document).on('click','.returnChange',function(){
 	var id = $(this).parent().attr("id");

 	var cont = '<select name="label" class="label"> <option>Selecciona...</option> <option value="1">Hamilton</option> ';
 	cont = cont + '<option value="2">Hamilton chones</option> <option value="3">Nuevos toros 5</option> <option value="4">';
 	cont = cont + 'Nuevos toros 6</option> </select> ';

 	$('#'+id).html(cont);
 });