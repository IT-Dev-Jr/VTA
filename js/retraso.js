$(document).on('submit','form.ingresar_comentario', function(){  
	if (confirm("¿Estas seguro que deseas registrar el WO?")) {
		$('.submit').hide(); 
		$('.submit_load').show(); 
		
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
				//$(response.table).insertAfter('</span>');
				$('.submit_load').hide(); 
				$('.submit').show();
				$('.left').html(response.left);
				$('.right').html(response.right);
				$('#tbody').html(response.table);
			}
		});
	}   

	return false;
});

$(document).on('submit','form.ingresar_comentario_ware', function(){  
	if (confirm("¿Estas seguro que deseas registrar el WO?")) {
		$('.submit').hide(); 
		$('.submit_load').show(); 
		
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
				//$(response.table).insertAfter('</span>');
				$('.submit_load').hide(); 
				$('.submit').show();
				$('.left').html(response.left);
				$('.right').html(response.right);
				$('#tbody').html(response.table);
			}
		});
	}   

	return false;
});


$(document).on('submit','form.ingresar_comentario_lec', function(){  
	if (confirm("¿Estas seguro que deseas registrar el WO?")) {
		$('.submit').hide(); 
		$('.submit_load').show(); 
		
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
				//$(response.table).insertAfter('</span>');
				$('.submit_load').hide(); 
				$('.submit').show();
				$('.left').html(response.left);
				$('.right').html(response.right);
				$('#tbody').html(response.table);
			}
		});
	}   

	return false;
});

function lines() {
	$('#line_change').hide(); 
	$('#loading').show(); 
 
	if ($( "#line_sel" ).val() == 0) {
		window.location='retraso.php';
	}else{
		var url = 'line.php';
		var type = 'POST';
	    var data = $('form#line_change').serialize();
	    $.ajax({
			url: url,
			type: type,
			dataType: "json",
			data: data,
			success: function(response){
				$('#loading').hide(); 
				$('#line_change').show(); 
				$('.main').html(response.main);
				$('table#graphfrjp thead').html(response.thead);
				$('table#graphfrjp tbody').html(response.tbody);
			}
		});
	}
}

$(document).ready(function(){
	$(document).on('mouseenter','.masterTooltip', function(){  
		var title = $(this).attr('title');
	    $(this).data('tipText', title).removeAttr('title');
	    $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
	}).mousemove(function(e) {
            var mousex = e.pageX + 20; //Get X coordinates
            var mousey = e.pageY + 10; //Get Y coordinates
            $('.tooltip').css({ top: mousey, left: mousex })
    });

    $(document).on('mouseleave','.masterTooltip', function(){  
		$(this).attr('title', $(this).data('tipText'));
    	$('.tooltip').remove();
	});
});

