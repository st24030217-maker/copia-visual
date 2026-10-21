$(document).ready(function(){
  getProductos();
});

function getProductos(){
  var idMembresia = $("#nptId").val();
  var datasend={
    op:"GetProdMem",
    id_Membresia:idMembresia
  };
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
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Productos/App.php",
      "data":datasend,
      "success":function(response){
        tabla.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tabla.fnAddData([
            response[i]['Descripcion'],
            response[i]['Tipo'],
            "$"+response[i]['Precio'],
            `<input class="form-control" value="${response[i]['Puntos']}" name="nptPuntos${i}" id="nptPuntos${i}" style="text-align:center;">`,
            `<button class='btn btnIconoChange' name="btnAct${i}" id="btnAct${i}" title='Actualizar' style="color:white;font-weight:bold" onclick="Actualizar('${i}','${response[i]["idProductoMembresia"]}');">
              <i class="fa fa-check fa-1x"></i>
            </button>`
            ]);
        }
      }
    }
  });
}

function Reload(){
  var tabla = $('#tabla').dataTable();
  tabla.api().ajax.reload();
}

function Actualizar(i,idProdMem){
  var punt = $("#nptPuntos"+i).val();
  var datasend={
    op:"UpdatePuntos",
    puntos:punt,
    idProductoMembresia:idProdMem
  };
  $("#btnAct"+i).prop("disabled",true);
  $.ajax({
    type:"POST",
    url:"Backend/Productos/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Se actualizo con exito","ÉXITO");
        setTimeout(function () {
          Reload()
        }, 500);
      }else {
        toastr.warning("Reintentalo de nuevo","Algo salio mal...");
        setTimeout(function () {
          Reload()
        }, 500);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function EliminaCampo(){
  var table = document.getElementById("tabla");
  var rowCount = table.rows.length;
  if(rowCount <= 1){
    toastr.warning('No se puede eliminar el encabezado',"Advertencia");
  }else{
    table.deleteRow(rowCount -1);
  }
}

function AgregarCampo(){
  document.getElementById('tabla').insertRow(-1).innerHTML =
  `<td class="text-center">
    <select class="form-control"></select>
  </td>
  <td class="text-center">Servicio</td>
  <td class="text-center">$350.55</td>
  <td class="text-center">
    <input class="form-control" value="" name="nptPuntos" id="nptPuntos" style="text-align:center;">
  </td>
  <td class="text-center">
    <button class="btn btnIconoChange" name="btnInsertaNuevo" id="btnInsertaNuevo" onclick=''>
      <i class="fa fa-upload fa-1px"></i>
    </button>
  </td>
  <td class="text-center">
    <button class="btn btnIconoDelete" name="btnElimina" id="btnElimina" onclick="EliminaCampo();">
      <i class="fa fa-minus fa-0px"></i>
    </button>
  </td>`;
}
