$(document).ready(function(){
  getProductos();
});

var tabla = $('#tabla').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS",
    "zeroRecords": "NO HAY RESULTADOS PARA MOSTRAR",
    "info": "PÁGINA _PAGE_ DE _PAGES_",
    "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
    "infoFiltered": "",
    "search": "BUSCAR"
  },
  "columnDefs": [{
    "className": "dt-center", "targets": "_all"
  }],
  "lengthMenu": [
  [-1,10, 50, 100],
  ["Todos los registros",10, 50, 100]
  ],
  "order": [],
  "bSort": false,
  "bPaginate":false,
  "bInfo":false,
});

function getProductos(){
  var datasent={
    op:"getProductos"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Productos/App.php",
    data:datasent,
    success:function(response){
      response = JSON.parse(response.trim());
      tabla.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tabla.fnAddData([
          response[i]['Descripcion'],
          "$"+response[i]['Precio'],
          response[i]['Tipo'],
          `<button type="button" class='btn btnIconoEdit' title='Editar' style="color:white;font-weight:bold" onclick="AbrirModal('${response[i]["idProducto"]}','${response[i]["Descripcion"]}','${response[i]["Tipo"]}',
            '${response[i]["Precio"]}');">
            <i class="fa fa-pencil fa-1x"></i>
          </button>`,
          `<button type="button" class='btn btnIconoDrop' title='Baja' style="color:white;font-weight:bold" onclick="EliminarCliente('${response[i]["idCliente"]}')">
            <i class="fa fa-times fa-1x"></i>
          </button>`
          ]);
      }
    },
    error : function(e){
      toastr.error(e.responseText, "ERROR 500");
    }
  });
}

function AbrirModal(id_producto,descripcion,tipo,precio){
  if (id_producto != '') {
    $("#op").val("UpdateProducto");
    $("#idProducto").val(id_producto);
    $("#Descripcion").val(descripcion);
    $("#slcTipo").val(tipo);
    $("#slcTipo").prop("selected","selected").change();
    $("#Precio").val(precio);
    $("#TituloModal").text("Actualizar producto");
  }
  else {
    $("#op").val("InsertProducto");
    $("#Descripcion").val("");
    $("#slcTipo").val("");
    $("#Precio").val("");
    $("#TituloModal").text("Agregar producto");
  }
  $("#ModalProducto").modal('toggle');
}

$("#btnguardar").click(function(event){
  if (document.getElementById("formInserta").checkValidity()) {
    event.preventDefault();
    var form =$("#formInserta")[0];
    var data =new FormData(form);
    $("#btnGuardar").prop("disabled",true);
    $.ajax({
      type:"POST",
      url:"Backend/Productos/App.php",
      data:data,
      processData:false,
      contentType:false,
      cache:false,
      timeout:600000,
      success:function(data){
        if (data == "1") {
          Alerta("success","Operación exitosa");
          setTimeout(function () {
            location.reload();
          }, 1500);
        }
        else {
          Alerta("warning","¡Algo salio mal, reintentalo!");
        }
        $("#ModalProducto").modal('hide');
      },error:function(e){
        $("#btnGuardar").prop("disabled",false);
        $("#ModalProducto").modal('hide');
        toastr.error(e.responseText,"ERROR 500");
      }
    });
  }
});
