function agregarPiezas(){ 
  var idAg1=1;
  //Agregar fila nueva.
  $(document).on('click','.button_agregar_producto',function(){
    var cantPiezas=$('#cantPiezas').val();
    var index;
    var id;
    var trid;
    
    if(confirm("¿Estas segur@ de la cantidad de piezas malas que deseas agregar?")){// se pedira confirmacion 

      $('#cantPiezas').hide();// se ocultara el cuadro de texto
      $('.button_agregar_producto').hide();//y el boton de agregar


    
   
    if(cantPiezas=='' || cantPiezas=='0'){
      alert("Debes agregar la cantidad de piezas");// si la cantidad de piezas es 0 o esta vacio despliega el msj
    }else{
      $('#cantpiezasmalas').val(cantPiezas);
      for ( id = 0; id < cantPiezas; id++) {
        //$('#tabla_errores').find('th').eq((id+1)).after('<th id="Col'+(id+1)+'"></th>');
        $('#tabla_errores').find('tr:not(:last-child)').each(function () {
          
          index = ($(this).closest("tr").index())+1;//obtener la posicion de la fila (se le aumetar un 1 ya que se inicia en 0)
          $(this).find('td').eq((id+1)).after('<td></td>');
          
        });
        $('#tabla_errores').find('tr:last-child').each(function () {//se agrega el boton y y un input donde se vera la suma de las columnas
         // $(this).find('td').eq((id+1)).after('<td><input type="text" class="sumaTotalColumna'+(id+1)+'" style="width: 20px;"></td>');//<button type="button" class="btn btn-danger button_eliminar_producto" id="'+(id+1)+'" style="background: red;border: 0;"> X </button><br>

        });
 
    }
    $('#tabla_errores').find('tr:not(:last-child)').each(function () {
        trid = $(this).closest("tr").attr('id');//se obtiente el id del tr para identificar cual se esta seleccionando
        index2 = ($(this).closest("tr").index())+1;//obtener la posicion de la fila (se le aumetar un 1 ya que se inicia en 0)
        $(this).find('td').eq(2).after('<td><input type="text" name="sumaTotalFila[]" class="sumaTotalFila'+index2+'"></td>');
        
      });
  }

}
});

  $(document).on('click','.button_eliminar_producto', function() {
    var actualId=parseInt($(this).attr('id'));
    var columna=$('#'+actualId+'').parentsUntil('tr').index();
    console.log(columna);
    $("#tabla_errores tr ").each(function() {
      $(this).find("td:eq(" + (columna) + ")").remove();
      $(this).find("th:eq("+(columna)+")").remove();
      });
});

 

}




function sumaValor(columna) {

  var total=0;   
  $("#tabla_errores tbody tr:not(:last-child) td:eq(" + (columna+1) + ") ").each(function() {
    $("input[type=checkbox]:checked").each(function(){
      var bandera = $(this).attr('id');
      if(bandera==columna){
        total+=parseInt(1) ;  
      }
     });                
  }); //each
   $('.sumaTotalColumna'+columna+'').val(total);
}

function sumaValorFila(check,posicion_tabla){
  var trid = $(check).closest("tr").attr('id');//se obtiente el id del tr para identificar cual se esta seleccionando
  var index = ($(check).closest("tr").index())+1;//se obtiene el numero de fila del input seleccionado
  var total=0;
  $('#tabla_errores').find('tr#'+trid+'').each(function() {//busca los tr con el id de la fila seleccionada  
    $("input[class=chmet"+index+"]:checked").each(function(){
      
        total+=parseInt(1) ;  
      
    });
  }); //each
  
  $('.sumaTotalFila'+index+'').val(total);

}
  
  
