
$(document).on('submit','form#registerEmp', function(){  
	$('#loading').show(); 
	$('.addButtons').hide();  

	data = $(this).serialize(); 

	$.ajax({
		url: 'add.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('.addButtons').show(); 

			$('#empAssPass').show(); 
			$('#empPassdiv').show(); 
			$('#registerEmp').hide();

			$('table#empAssPass tbody').html(response.tbody); 
		}
	});

	return false;
});

function assingPass(e_id,first,last,dpto){
	$('#empAssPass').hide();
	$('#empPassdiv').hide();
	$('#he_id').val(e_id);
	$('#ie_id').val(e_id);
	$('#ifirst').val(first);
	$('#ilast').val(last);
	$('#idpto').val(dpto); 
	$('#registerEmp').show();
}

$(document).on('submit','form#editEmp', function(){  
	$('#loading').show(); 
	$('.addButtons').hide();  

	data = $(this).serialize(); 
	$.ajax({
		url: 'edit.php',
		type: 'POST',
		dataType: "json",
		data: data,
		success: function(response){
			$('#loading').hide(); 
			$('.addButtons').show(); 

			$('#empAssPass').show(); 
			$('#empPassdiv').show(); 
			$('#editEmp').hide();

			$('table#empAssPass tbody').html(response.tbody); 
		}
	});

	return false;
});

function editUser(e_id,first,last,dpto){
	$('#empAssPass').hide();
	$('#empPassdiv').hide();
	$('#he_id').val(e_id);
	$('#ie_id').val(e_id);
	$('#ifirst').val(first);
	$('#ilast').val(last);
	$('#idpto').val(dpto); 
	$('#editEmp').show();
}

function delUser(e_id,first,last,dpto){
	if(confirm('Estas segur@ que deseas eliminar a: '+first+' '+last)){
		$('#loading').show();  
		$('#empAssPass').hide(); 

		$.ajax({
			url: 'delete.php',
			type: 'POST',
			dataType: "json",
			data: 'e_id='+e_id,
			success: function(response){
				$('#loading').hide();   
				$('#empAssPass').show();

				$('table#empAssPass tbody').html(response.tbody); 
			}
		});

		return false;
	}
}

function hideRegistry(){
	$('#empAssPass').show(); 
	$('#empPassdiv').show(); 
	$('#registerEmp').hide();
	$('#editEmp').hide();
}



