$(document).ready(function(){
  if ($("#id_perfil").val() == "12" || $("#id_perfil").val() == "4") {
    $("#menu_toggle")[0].click();
    GetOrdenesEscaneoT();
    GetOrdenesDiseñoT();
    GetOrdenesFabricacionT();
    GetOrdenesEntregaT();
    getNotificaciones();
    getOrdenesPendientesP();
    getOrdenesC();
    showTime();
    }
})
getCantidadOrdenesLab();

$("#nptBuscar").blur(async function () {
  await getCantidadOrdenesLab();
});
async function getCantidadOrdenesLab() {
  let datos = await {
    op: "getCantidadOrdenesLab"
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/DentLab/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    let cantidadRegistros = "";
      respuesta.forEach(Registros => {
        cantidadRegistros = Registros.CantidadRegistros;
      });
    let ArrayCantRegistros = [];
    for (var i = 0; i < cantidadRegistros; i++) {
        ArrayCantRegistros.push(i);
    }
    let stringCantRegistros = "";
      $('#pagination-container').pagination({
          dataSource: ArrayCantRegistros,
          pageSize: 150,
          beforePaging: function(a){
            GetOrdenesT(a);
          }
      })
  }
}

function simpleTemplating(data) {
    var html = '<ul>';
    $.each(data, function(index, item){
        html += `<li id="menu${index}" onclick="obtenerOrdenes(${index})">`+ item +'</li>';
    });
    html += '</ul>';
    return html;
}

function loading(){
  GetOrdenesEscaneoT();
  GetOrdenesDiseñoT();
  GetOrdenesFabricacionT();
  GetOrdenesEntregaT();
  getCantidadOrdenesLab(1);
}

function refresh(){
  loading();
  getNotificaciones();
  getOrdenesPendientesP();
  getOrdenesC();
}

function getOrdenesPendientesP(){
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getOrdenesPendientesP",
    success:function(response){
      response = JSON.parse(response.trim());
      if (response.length>0) {
        $("#NumberOrden").addClass('badge-danger').removeClass('badge-light');
        $("#NumberOrden").html(response[0]["Numero"]);
      }else {
        $("#NumberOrden").addClass('badge-light').removeClass('badge-danger');
      }
      getOrdenesPendientes();
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function OrdenesPendientes(){
  $("#modalPendienteP").modal('toggle');
}

function OrdenesCanceladas(){
  $("#modalCanceladas").modal('toggle');
}
function OrdenesAnticipoModal(){
  $("#modalAnticipo").modal("toggle");
}
function OrdenesAnticipo(){
  var datasend = {
    op:"getOrdenesAnticipo"
  }
  var tableAnti = $('#tableAnti').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY CLIENTES POR MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR"
    },
    "columnDefs": [{
      "className": "dt-center", "targets": "_all"
    }],
    "order": [],
    "bSort": false,
    "bPaginate":false,
    "bFilter": false,
    "bInfo":false,

    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/DentLab/App.php",
      "data":datasend,
      "success" : function(response){
        tableAnti.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tableAnti.fnAddData([
            response[i]["Serie"].toUpperCase(),
            response[i]["Monto"].toUpperCase(),
            response[i]["Anticipo"].toUpperCase(),
            `<button type="button" class="btn btnEtiqueta" onclick="getDatosPagoAnticipo('${response[i]["IdOrden"]}')"><i class="far fa-clipboard"></i></button>`
          ]);
        }
      },
      "complete" : function(){
          $.unblockUI();
        }
    }
  });
}

function getOrdenesAnt(){
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getCantidadOrdenesAnt",
    success:function(response){
      response = JSON.parse(response.trim());
      if (response.length>0) {
        $("#NumberAnticipo").addClass('badge-danger').removeClass('badge-light');
        $("#NumberAnticipo").html(response[0]["numero"]);
      }else {
        $("#NumberAnticipo").addClass('badge-light').removeClass('badge-danger');
      }
      OrdenesAnticipo();
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}


function getOrdenesPendientes(){
  var datasend = {
    op:"getOrdenesPendientes"
  }
  var tableOrdenesP = $('#tableOrdenesP').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR"
    },
    "columnDefs": [{
      "className": "dt-center", "targets": "_all"
    }],
    "order": [],
    "bSort": false,
    "bPaginate":false,
    "bFilter": false,
    "bInfo":false,

    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/DentLab/App.php",
      "data":datasend,
      "success" : function(response){
        tableOrdenesP.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tableOrdenesP.fnAddData([
            response[i]["Serie"],
            "Dr. "+response[i]["Doctor"].toUpperCase(),
            response[i]["Paciente"].toUpperCase(),
            `<button type="button" class="btn btnEtiqueta" onclick="getPermisosAutorizaOrdenPendientePago('${response[i]["Serie"]}',
            '${response[i]["idLab_Ordenes_Estado"]}','${response[i]["Con_scan"]}')"><i class="fad fa-redo"></i></button>`
          ]);
        }
      },
      "complete" : function(){
          $.unblockUI();
        }
    }
  });
}
function getOrdenesCanceladas(){
  var datasend = {
    op:"getOrdenesCanceladas"
  }
  var tableCancel = $('#tableCancel').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR"
    },
    "columnDefs": [{
      "className": "dt-center", "targets": "_all"
    }],
    "order": [],
    "bSort": false,
    "bPaginate":false,
    "bFilter": false,
    "bInfo":false,

    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/DentLab/App.php",
      "data":datasend,
      "success" : function(response){
        tableCancel.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          tableCancel.fnAddData([
            response[i]["Serie"],
            response[i]["Nombre"].toUpperCase(),
            response[i]['ObservacionesLaboratororio'] != null ? response[i]["ObservacionesLaboratororio"].toUpperCase() : "NO HAY COMENTARIO"
          ]);
        }
      },
      "complete" : function(){
          $.unblockUI();
        }
    }
  });
}

function Reload(){
  var tableOrdenesP = $('#tableOrdenesP').dataTable();
  tableOrdenesP.api().ajax.reload();
}

function ChangeStatus(orden,orden_est_id,con_scan){
  Swal.fire({
    title: '¿Desea cambiar la orden <b>'+orden+'</b> a pagada?',
    text: 'Una vez realizado no se podra revertir el cambio',
    icon: 'question',
    allowOutsideClick: false,
    allowEscapeKey : false,
    showCancelButton: true,
    confirmButtonColor: '#40C1CA',
    cancelButtonColor: '#858585',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      var datasend = {
        op:"UpdateFlujoInicial",
        orden_estado_id:orden_est_id,
        con_scan:con_scan
      }
      $.ajax({
        type:"POST",
        url:"Backend/DentLab/App.php",
        data:datasend,
        success:function(data){
          var flujo = "";
          if (con_scan == 1) {
            flujo = "Reservado";
          }else {
            flujo = "Diseño";
          }
          if (data == "1") {
            toastr.success("Orden "+orden+" en flujo "+flujo);
            Reload();
          }else {
            toastr.warning("La orden "+orden+" no pudo pasar a flujo","WARNING");
          }
        },error:function(e){
          toastr.error(e.responseText,"ERROR 500");
        },complete:function(){
          GetOrdenesEscaneoT();
          GetOrdenesDiseñoT();
          GetOrdenesFabricacionT();
          GetOrdenesEntregaT();
          getCantidadOrdenesLab(1);
          getNotificaciones();
        }
      })
      }
  });
}

function GetOrdenesEscaneoT(){
  $("#tableScanR").empty();
    $("#tableScanR").load("TableEscaneo.php");
}

function GetOrdenesDiseñoT(){
  $("#tableDesign").empty();
    $("#tableDesign").load("TableDiseno.php");
}

function GetOrdenesFabricacionT(){
  $("#tableFactory").empty();
    $("#tableFactory").load("TableFabricacion.php");
}

function GetOrdenesEntregaT(){
  $("#tableDelivery").empty();
    $("#tableDelivery").load("TableEntrega.php");
}

function GetOrdenesT(NoPagina){
  let Buscador = $("#nptBuscar").val();
  $("#tableOrdenesGral").empty();
    $("#tableOrdenesGral").load(`TableOrdenes.php?Pagina=${NoPagina}&Orden=${Buscador}`);
  }

function showTime(){
  myDate = new Date();
  dia = myDate.getDate();
  mes = myDate.getMonth() + 1;
  año = myDate.getFullYear();
  hours = myDate.getHours();
  minutes = myDate.getMinutes();
  seconds = myDate.getSeconds();
  if (hours < 10) hours = 0 + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  myDate.setDate(myDate.getDate());
  var optionsI = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  $("#HoraActual").text(myDate.toLocaleDateString("es-ES", optionsI)+" / "+hours+ ":" +minutes+ ":" +seconds);
  setTimeout("showTime()", 1000);
}

function Busqueda(){
   const TablaRenglon = document.getElementById('tableOrdenes');
   const TextoBusqueda = document.getElementById('nptBuscar').value.toLowerCase();
   let total = 0;
   for (let i = 1; i < TablaRenglon.rows.length; i++) {

       let found = false;
       const cellsOfRow = TablaRenglon.rows[i].getElementsByTagName('td');
       for (let j = 0; j < cellsOfRow.length && !found; j++) {
           const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
           if (TextoBusqueda.length == 0 || compareWith.indexOf(TextoBusqueda) > -1) {
               found = true;
               total++;
           }
       }
       if (found) {
           TablaRenglon.rows[i].style.display = '';
       } else {
           TablaRenglon.rows[i].style.display = 'none';
       }
   }
 }

 function getNotificaciones(){
   $.ajax({
     type:"POST",
     url:"Backend/DentLab/App.php",
     data:"op=getOrdenNotificaciones",
     success:function(response){
       response = JSON.parse(response.trim());
       for (var i = 0; i < response.length; i++) {
         toastr.success(`Nueva orden ${response[i]["Serie"]} en estado de ${response[i]["Estado"]}`);
         $.ajax({
           type:"POST",
           url:"Backend/DentLab/App.php",
           data:"op=UpdateBanderaNotificacion&id_Orden="+response[i]["Ordenes_trabajo_id"]
         })
       }
     },error:function(e){
       toastr.error(e.responseText,"ERROR 500");
     }
   })
 }

 function getOrdenesC(){
   $.ajax({
     type:"POST",
     url:"Backend/DentLab/App.php",
     data:"op=getOrdenesBan",
     success:function(response){
       response = JSON.parse(response.trim());
       if (response.length>0) {
         $("#NumberOrdenCanceladas").addClass('badge-danger').removeClass('badge-light');
         $("#NumberOrdenCanceladas").html(response[0]["cantidad"]);
       }else {
         $("#NumberOrdenCanceladas").addClass('badge-light').removeClass('badge-danger');
       }
       getOrdenesCanceladas();
     },error:function(e){
       toastr.error(e.responseText,"ERROR 500");
     }
   })
 }

 function getDatosPagoAnticipo(ordenes_trabajo_id){
   var datasend = {
     op:"getDatosPagoAnticipo",
     Ordenes_trabajo_id:ordenes_trabajo_id
   }
   $.ajax({
     type: "POST",
     url: "Backend/DentLab/App.php",
     data: datasend,
     success:function(response){
       response = JSON.parse(response.trim());
       if (response.length>0) {
         getMetodosPago();
         $("#modalAnticipo").modal("hide");
         $("#modalPagoAnticipo").modal("toggle");
         var serie = response[0]["Serie"];
         var monto = response[0]["Monto"];
         var sumaAnticipo = response[0]["SumaAnticipo"];
         var restante = response[0]["Restante"];
         $("#divDatosPagoAnt").html(`
           <div class='row'>
           <div class='col-12 col-lg-12 text-center'>
             <span style='font-size:20px;'>Pago Total: $ ${monto}</span><br><br>
           </div>
            <div class='col-12 col-lg-6 text-center'>
              <span style='font-size:20px;'>Pagado: $ ${sumaAnticipo}</span>
            </div>
            <div class='col-12 col-lg-6 text-center'>
              <span style='font-size:20px;'>Restante: $ ${restante}</span><br><br>
            </div>
            <div class='col-12 col-lg-12'>
              <div class='row'>
                <div class='col-12 col-lg-6 text-center'>
                  <span style='font-size:20px;'>Ingresar Pago</span><br><br>
                  <input class ='form-control' id='txtAsigPago' min='1' max='${restante}' type='number'></input>
                </div>
                <div class='col-12 col-lg-6 text-center'>
                  <span style='font-size:20px;'>Metodo de Pago</span><br><br>
                  <select class='form-control' id='slcMethod'></select>
                </div>
              </div>
            </div>
            <div class='col-12 col-lg-4 offset-lg-4'>
              <br>
              <button type="button" class="btn btn-outline-primary" onclick='registrarPagoOrdenAn(${ordenes_trabajo_id})'>Ingresar Pago</button>
            </div>
            <input class ='form-control' id='txtCheckRestante' type='number' value='${restante}' style='display:none;'></input>
           </div>
           `);
       }
     }
   })
 }

 function registrarPagoOrdenAn(ordenes_trabajo_id){
   var idMetodoPago = $("#slcMethod").val();
   var monto = $("#txtAsigPago").val();
   var restante = $("#txtCheckRestante").val();
   if (monto == "") {
     toastr.info("Ingrese la cantidad","ALERTA");
     return false;
   }
   if (idMetodoPago == "") {
     toastr.info("Ingrese un metodo de pago","ALERTA");
     return false;
   }
   if (monto <= restante ) {
     var datasend = {
       op:"AgregarPagoAnticipo",
       Ordenes_trabajo_id:ordenes_trabajo_id,
       Monto:monto,
       MetodoPago:idMetodoPago
     }
     $.ajax({
       type: "POST",
       url:"Backend/DentLab/App.php",
       data: datasend,
       success:function(response){
         if (response == "1") {
           toastr.success("Pago realizado","PAGO REALIZADO");
           setTimeout(function () {
             location.reload();
           }, 1000);
         }else {
           toastr.info("Pago no realizado","ERROR AL ASIGNAR EL PAGO");
           setTimeout(function () {
             location.reload();
           }, 1000);
         }
       },
       error:function(e){
         toastr.error(e.responseText,"ERROR 500");
       }
     })
   }else {
     toastr.info("No es posible ingresar esta cantidad.","ALERTA");
   }
 }

 function getMetodosPago(){
   $("#slcMethod").html("");
   $.ajax({
     type:"POST",
     url:"Backend/DentLab/App.php",
     data:"op=getMetodosPago",
     success:function(response){
       response = JSON.parse(response.trim());
       $("#slcMethod").append(`<option value="">Selecciona un metodo de pago</option>`);
       for (var i = 0; i < response.length; i++) {
         $("#slcMethod").append(`<option value="${response[i]["id_Metodos_Pago"]}">${response[i]["Descripcion"]}</option>`);
       }
     },error:function(e){
       toastr.error(e.responseText,"ERROR 500");
     }
   })
 }

 async function getPermisosAutorizaOrdenPendientePago (orden,orden_est_id,con_scan) {
    let datos = await {
        op: "getPermisosAutorizaOrdenPendientePago"
    }
    let respuesta = [];
    try {
        respuesta = await $.ajax({
            type: "post",
            url: "Backend/DentLab/App.php",
            data: datos,
        });
    } catch (error) {
        console.log(error);
    } finally {
        if (respuesta == 1) {
            ChangeStatus(orden,orden_est_id,con_scan);
        }else {
            Alerta("info",respuesta);
        }
    }
}
