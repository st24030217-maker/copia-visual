$(document).ready(function(){
  getClientes();
});

var tablaProductos = $('#tablaProductos').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS",
    "zeroRecords": "NO HAY RESULTADOS PARA MOSTRAR",
    "info": "PÁGINA _PAGE_ DE _PAGES_",
    "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
    "infoFiltered": "",
    "search": "BUSCAR PRODUCTO"
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

var tablaTemporal = $('#tablaTemporal').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS",
    "zeroRecords": "NO HAY RESULTADOS PARA MOSTRAR",
    "info": "PÁGINA _PAGE_ DE _PAGES_",
    "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
    "infoFiltered": "",
    "search": "BUSCAR PRODUCTO"
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

function getClientes(){
  $.ajax({
    type:"POST",
    url:"Backend/Productos/App.php",
    data:"op=getClientes",
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slcClientes").append(`<option value="${response[i]["idCliente"]}">${response[i]["Nombre"].toUpperCase()}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function GetProductos(){
  document.getElementById('divProductos').style.display="block";
  var datasend = {
    op:"getProductos"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Productos/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      if (response != null || response.length != 0) {
        tablaProductos.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tablaProductos.fnAddData([
            response[i]['Descripcion'],
            response[i]['Tipo'],
            "$"+response[i]['Precio'],
            `<button type="button" class='btn btnAgregarTemporal' title='Agregar' style="color:white;font-weight:bold" onclick="InsertTemporal('${response[i]["idProducto"]}')">
              <i class="fa fa-hand-pointer-o fa-1x"></i>
            </button>`
            ]);
        }
      }
    }
  });
}

function getInformacion(){
  $("#divProductos").empty();
  document.getElementById('compT').style.display="none";
  var id_cliente = $("#slcClientes").val();
  var datasend = {
    op:"getClientesInf",
    id_cliente:id_cliente
  };
  $.ajax({
    type:"POST",
    url:"Backend/Ventas/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      $("#Nom").text(response[0]["Nombre"]);
      $("#Mem").text("Membresia: "+response[0]["Tipo"]);
      $("#Correo").text(response[0]["Correo"]);
      $("#Tele").text(response[0]["Telefono"]);
      var puntos = "";
      if (response[0]["PuntosAcumulados"] != null) {
        puntos = response[0]["PuntosAcumulados"];
      }
      else {
        puntos=0;
      }
      $("#Punt").text(puntos+" Puntos acumulados");
      $("#nptIdMem").val(response[0]["idMembresia"]);
      $("#idCliente").val(response[0]["idCliente"]);
      $("#idMembresia").val(response[0]["idMembresia"]);
      document.getElementById('divButto').style.display="block";
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function AbrirModal(){
  $("#ModalProducto").modal('toggle');
  GetProductos();
}

function InsertTemporal(idProducto){
  var id_cliente = $("#idCliente").val();
  var id_Membresia = $("#idMembresia").val();
  var datasend = {
    op:"InsertVentTemp",
    idCliente:id_cliente,
    idProducto:idProducto,
    idMembresia:id_Membresia
  }
  $.ajax({
    type:"POST",
    url:"Backend/Ventas/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto agregado',
          showConfirmButton: false,
          timer: 1500
        });
      }else {
        toastr.warning("Reintentalo nuevamente","Algo salio mal...");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function getVentaTemporal(){
  $("#divProductos").empty();
  document.getElementById('divtablaTemporal').style.display="none";
  document.getElementById('Finaliza').style.display="block";
  $("#ModalProducto").modal('hide');
  var idCliente=$("#slcClientes").val();
  var datasend= {
    op:"getVentaTemporal",
    idCliente:idCliente
  };
  $.ajax({
    type:"POST",
    url:"Backend/Ventas/App.php",
    data:datasend,
    success:function(response){
      document.getElementById('compT').style.display="block";
      response = JSON.parse(response.trim());
      $("#divProductos").append(`<h3>Detalle de la venta</h3>`);
      $("#divProductos").append(`<h4>Productos/Servicio</h4>`);
      var total=0;
      if (response.length>0) {
        for (var i = 0; i < response.length; i++) {
          $("#divProductos").append(`
              <div class="row text-left">
                <div class="col-8 col-lg-8 offset-lg-2">
                  <h5 style="color:black;">* ${response[i]["Descripcion"]}</h5>
                </div>
                <div class="col-4 col-lg-2">
                  <h5 style="color:black;">$${response[i]["Precio"]}</h5>
                </div>
              </div>`);
              total += parseFloat(response[i]["Precio"]);
        }
        $("#divProductos").append(`
            <div class="row text-left">
              <div class="col-6 offset-6 col-lg-3 offset-lg-9">
                <h4 style="color:black;font-weight:bold"> Total: $${total}</h4>
              </div>
            </div>`);
            document.getElementById('FormaPago').style.display="block";
            GetFormaPago();
      }
      else {
        document.getElementById('FormaPago').style.display="none";
      }

    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function GetFormaPago(){
  $("#Formas").empty();
  $.ajax({
    type:"POST",
    url:"Backend/Ventas/App.php",
    data:"op=GetFormaPago",
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#Formas").append(`
          <div class="row" style="cursor:pointer;border:1px solid #DFDFDF;border-radius:5px;margin-bottom:10px;" onclick="clickForma('${response[i]["idFormaPago"]}');">
            <div class="col-4 col-lg-2 text-center">
              <img src="FormaPago/${response[i]["Forma"]}.png" height="100%" width="50vh">
            </div>
            <div class="col-8 col-lg-10 text-left">
              <br>
              <h5>Pago ${response[i]["Forma"]}</h5>
            </div>
          </div>`);
      }
    }
  })
}

function clickForma(id){
  $("#nptFormaP").val(id);
}

function GetTemporal(){
  document.getElementById('compT').style.display="block";
  $("#ModalProducto").modal('hide');

  var idCliente=$("#slcClientes").val();
  var datasend= {
    op:"getVentaTemporal",
    idCliente:idCliente
  };
  var tablaTemporal = $('#tablaTemporal').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS",
      "zeroRecords": "NO HAY RESULTADOS PARA MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR PRODUCTO"
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
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Ventas/App.php",
      "data":datasend,
      "success":function(response){
        tablaTemporal.fnClearTable();
        if (response.length>0) {
          for (var i = 0; i < response.length; i++) {
            tablaTemporal.fnAddData([
              response[i]['Descripcion'],
              "$"+response[i]['Precio'],
              `<button type="button" class='btn btnQuitarTemporal' style="color:white;font-weight:bold" onclick="EliminarTemporal('${response[i]["idVentaTemporal"]}')">
                <i class="fa fa-minus fa-1x"></i>
              </button>`
              ]);
          }
        }else {
          Alerta("warning","No haz seleccionado productos");
        }
      }
    }
  });
}

function Reload(){
  var tablaTemporal = $('#tablaTemporal').dataTable();
  tablaTemporal.api().ajax.reload();
}

function EliminarTemporal(idTemp){
  var datasend= {
    op:"EliminarTemporal",
    idTemp:idTemp
  };
  $.ajax({
    type:"POST",
    url:"Backend/Ventas/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto removido de la lista',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(function () {
          Reload();
        }, 500);
      }
      else {
        toastr.warning("Reintentalo de nuevo","Algo salio mal...");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function Atras(){
  document.getElementById('divtablaTemporal').style.display="block";
  document.getElementById('Finaliza').style.display="none";
}
