$(document).ready(function(event){
  getDatosFiscales();
});

var tabla = $('#table').dataTable({
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

function getDatosFiscales(){
  var datasend={
    op:"GetDatosFiscales"
  }
  $.blockUI({ message: '<h4>CARGANDO DATOS FISCALES...</h4>', css: { backgroundColor: null, color: '#fff', border: null } });
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:datasend,
    success:function(response){
        response = JSON.parse(response.trim());
        tabla.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tabla.fnAddData([
            response[i]['RFC'],
            response[i]['razonsocial'],
            response[i]['colonia'],
            response[i]['Estado'],
            response[i]['Municipio'],
            `<form name="Datos${[i]}" id="Datos${[i]}" method="post" action="ABCDatosFiscales.php">
              <input name="nptIdDato" id="nptIdDato" value="${response[i]["id_dato_fiscal"]}" style="display:none;">

              <button class='btn btnIconoUpload' title='Detalle' style="color:white;font-weight:bold" onclick="document.getElementById('Datos${[i]}').submit();">
                <i class="fa fa-pencil fa-1x"></i>
              </button>
            </form>`,
            `<button class='btn btnIconoAgregar' title='Cancelar' style="color:white;font-weight:bold" onclick="UpdateEstatusDato('${response[i]["id_dato_fiscal"]}');">
              <i class="fa fa-times fa-1x"></i>
            </button>`
          ]);
        }
     },error:function(e){
       toastr.error(e.responseText,"ERROR 500");
     },complete:function(){
       $.unblockUI();
     }
  });
}

function UpdateEstatusDato(idDato){
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:"op=UpdateEstatusDato&idDato="+idDato,
    success:function(data){
      if (data == "1") {
        toastr.success("Desactivado correctamente","EXÍTO");
        setTimeout(function () {
          location.reload();
        }, 1500);
      }else {
        toastr.warning("No se pudo desactivar el cliente fiscal","Algo salio mal");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}
