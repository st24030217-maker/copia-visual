ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

$(document).ready(function(){
  getListVendedores();
  GetDatosDoctor();
  getOrdenesTrabajoSolicitadas();
  getpaquetesDr();
  GetPagosDoctores();
  getIvaConfig();
});
let tableOrders;
const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Doctor = urlParams.get('d');
const url_from = urlParams.get('from');

let globalPaquete = "";
function activeOrNot(id,a,li2,li3,li4,li5){
  $("#"+li2).removeClass('navActive').addClass('navUnActive');
  $("#"+li3).removeClass('navActive').addClass('navUnActive');
  $("#"+li4).removeClass('navActive').addClass('navUnActive');
  // $("#"+li5).removeClass('navActive').addClass('navUnActive');
  if (document.getElementById(a).classList.contains("active")) {
    $("#"+id).removeClass('navActive');
    $("#"+id).addClass('navUnActive');
  }else {
    $("#"+id).removeClass('navUnActive');
    $("#"+id).addClass('navActive');
  }
}
function abrirModalDetallePagosPaquete (valor) {
  globalPaquete = valor
  $("#DetallePagosPaquete").modal("toggle");
  setTimeout(function () {
    getDetallePagosPaquete();
  }, 500);
}
function GetDatosDoctor(){
  var idDoctor = $("#idDoc").val();
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=GetDatosDoctor&idDoctor="+idDoctor,
    success:function(response){
      response = JSON.parse(response.trim());
      console.log(response);
      $("#nptNombre").val(response[0]["Doctor"]);
      $("#nptApellidoP").val(response[0]["ApellidoPaterno"]);
      $("#nptApellidoM").val(response[0]["ApellidoMaterno"]);
      $("#nptEmail").val(response[0]["Email"]);
      response[0]['Activo'] == "1" ? $("#chkActivo").prop("checked",true) : $("#chkActivo").prop("checked",false);
      response[0]['Externo'] == "1" ? $("#chkExt").prop("checked",true) : $("#chkExt").prop("checked",false);
      $("#nptObservacion").val(response[0]["Observacion"]);

      $("#nptClinica").val(response[0]["Clinica"]);
      $("#nptF").val(response[0]["Red_Facebook"]);
      $("#nptT").val(response[0]["Red_Twitter"]);
      $("#nptI").val(response[0]["Red_Instagram"]);
      $("#nptTel").val(response[0]["Celular"]);
      $("#nptCel").val(response[0]["Telefono"]);
      $("#nptDir").val(response[0]["Direccion"]);
      $("#nptAsis").val(response[0]["Contacto"]);
      $("#nptTelSis").val(response[0]["Contacto_Tel"]);
      $("#nptMailSis").val(response[0]["Contacto_Mail"]);
      $("#txtColonia").val(response[0]["Colonia"]);
      $("#txtCalle").val(response[0]["Calle"]);
      $("#txtNoExt").val(response[0]["Num_Ext"]);
      $("#txtCP").val(response[0]["Codigo_Postal"]);
      $("#slctVendedor").val(response[0]["Vendedor_Id"]);

      // getVendedores(response[0]["Vendedor_Id"]);
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function getVendedores(id_vendedor){
  $("#slcVendedor").html("");
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getVendedores",
    success:function(response){
      response = JSON.parse(response.trim());
      $("#slcVendedor").append(`<option value = "" selected disabled>Selecciona un vendedor</option>`)
      var prop = "";
      for (var i = 0; i < response.length; i++) {
        if (response[i]["id_sys_usuario"] == id_vendedor) {
          prop = "selected";
        }
       $("#slcVendedor").append(`<option value = "${response[i]["id_sys_usuario"]}" ${prop}>${response[i]["Nombre"]}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function UpdateDatosGral(){
  var activo = "";
  var extern = "";
  if ($("#chkActivo").is(":checked")) {
    activo = "1";
  }else {
    activo = "0";
  }
  if ($("#chkExt").is(":checked")) {
    extern = "TRUE";
  }else {
    extern = "FALSE";
  }

  var  idDoctor = $("#idDoc").val();
  var  Email = $("#nptEmail").val();
  var  Clinica = $("#nptClinica").val();
  var  Observacion = $("#nptObservacion").val();
  var  Telefono = $("#nptTel").val();
  var  Doctor  = $("#nptNombre").val();
  var  ApellidoPaterno = $("#nptApellidoP").val();
  var  ApellidoMaterno = $("#nptApellidoM").val();
  var  Direccion = $("#nptDir").val();
  var  Contacto = $("#nptAsis").val();
  var  Contacto_Tel = $("#nptTelSis").val();
  var  Contacto_Mail = $("#nptMailSis").val();
  var  Red_Facebook = $("#nptF").val();
  var  Red_Twitter = $("#nptT").val();
  var  Red_Instagram = $("#nptI").val();
  var  Celular = $("#nptCel").val();
  let Colonia = $("#txtColonia").val();
  let Calle = $("#txtCalle").val();
  let NoExt = $("#txtNoExt").val();
  let cp = $("#txtCP").val();
  var datasend = {
    op:"UpdateDatosGral",
    idDoctor:idDoctor,
    Email:Email,
    Clinica:Clinica,
    Observacion:Observacion,
    Activo:activo,
    Externo:extern,
    Telefono:Telefono,
    Doctor:Doctor,
    ApellidoPaterno:ApellidoPaterno,
    ApellidoMaterno:ApellidoMaterno,
    Contacto:Contacto,
    Contacto_Tel:Contacto_Tel,
    Contacto_Mail:Contacto_Mail,
    Red_Facebook:Red_Facebook,
    Red_Twitter:Red_Twitter,
    Red_Instagram:Red_Instagram,
    Celular:Celular,
    Colonia:Colonia,
    Calle:Calle,
    NoExt:NoExt,
    cp:cp
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Datos actualizados exitosamente","ÉXITO");
        setTimeout(function () {
          location.reload();
        }, 1500);
      }else {
        toastr.warning("Algo salio mal... reintentelo de nuevo","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function getOrdenesTrabajoSolicitadas(){
  var idDoctor = $("#idDoc").val();
  var datasend = {
    op:"getOrdenesTrabajoSolicitadas",
    idDoctor:idDoctor
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());

      if (tableOrders) {
        tableOrders.destroy();
      }
      var filter = {
       ui: {
         create: function (args) {
           var flValInput = ej.base.createElement('input', {
             className: 'flm-input',
           });
           args.target.appendChild(flValInput);
           var fieldName = args.column.field;
           var dropdownData = [...new Set(tableOrders.dataSource.map(item => item[fieldName]))];
           dropInstance = new ej.dropdowns.MultiSelect({
             dataSource: ordenarMixto(dropdownData),
             placeholder: 'Select a value',
             popupHeight: '200px',
             allowFiltering: true,
             mode: 'Delimiter',
           });
           dropInstance.appendTo(flValInput);
         },
         write: function (args) {
           var fieldName = args.column.field;
           var filteredValue = [];
           tableOrders.filterSettings.columns.forEach((item) => {
             if (item.field === fieldName && item.value) {
               filteredValue.push(item.value);
             }
           });
           if (filteredValue.length > 0) {
             dropInstance.value = filteredValue;
           }
         },
         read: function (args) {
           tableOrders.removeFilteredColsByField(args.column.field);
           args.fltrObj.filterByColumn(
             args.column.field,
             args.operator,
             dropInstance.value
           );
         },
       },
     };
      tableOrders = new ej.grids.Grid({
        allowFiltering: true,
        allowTextWrap: true,
        allowSorting: true,
        // enableInfiniteScrolling : true,
        filterSettings: { type: 'Menu' },
        height: '60vh',
        showColumnChooser: true,
        toolbar: ['Print', 'PdfExport', 'ExcelExport', 'ColumnChooser', 'Search'],
        allowPdfExport: true,
        allowExcelExport: true,
        dataSource: response,
        columns: [
          {field: "", headerText: "", template: "#btnGoOrderTemplate"},
          {field: "Serie", headerText: "Serie OT", filter: filter},
          {field: "FormaPago", headerText: "FORMA PAGO", filter: filter},
          {field: "Fecha_entrega_solicitada", headerText: "Entrega", filter: filter},
          {field: "Estado", headerText: "Estado", filter: filter},
          {field: "Producto", headerText: "Producto", filter: filter},
          {field: "paciente", headerText: "Paciente", filter: filter},
          {field: "Piezas", headerText: "Piezas", filter: filter},
          // {field: "Liberada_prod", headerText: "Lib Prod", filter: filter},
          {field: "Monto", headerText: "Pagado", filter: filter, valueAccessor: currencyFormatter},
        ],
        aggregates: [
          {
            columns: [
              {
                type: "Sum",
                field: "Monto",
                format: "C2",
                footerTemplate: "${Sum}",
              },
            ],
          },
        ],
      });
      tableOrders.appendTo('#t_orders');
      tableOrders.toolbarClick = function (args) {
        if (args["item"].id === "t_orders_pdfexport") {
          let exportProperties = {
            fileName: "OrdenesDoctor.pdf",
          };
          tableOrders.pdfExport(exportProperties);
        } else if (args["item"].id === "t_orders_excelexport") {
          let exportProperties = {
            fileName: "OrdenesDoctor.xlsx",
          };
          tableOrders.excelExport(exportProperties);
        }
      };
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

window.btnGoOrderSF = (e) => {
  var idDoctor = $("#idDoc").val();
  var OTbase64 = btoa(e.Ordenes_trabajo_id);
  var Dbase64 = btoa(idDoctor);
  var LBbase64 = btoa("Doctor.php?d="+Dbase64);
  let div = document.createElement('div');
  let btn = `<button class="btn btnEtiqueta" type="button" onclick="window.location.href='OrdenTrabajo.php?OT=${OTbase64}&LB=${LBbase64}'"><i class="fa fa-tooth fa-2x"></i></button>`;
  $(div).append(btn);
  return div.outerHTML;
}

function ordenarMixto(arreglo) {
  arreglo = arreglo.map(item => {
    return !isNaN(item) && typeof item === 'string' ? Number(item) : item;
  });
  arreglo.sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return (typeof a === 'number') ? -1 : 1;
  });
  return arreglo;
}

function currencyFormatter(field, data, column) {
  // valueAccessor: currencyFormatter
  let num = Number(data[field]);
  const esFlotante = num % 1 !== 0;
  let numeroFormateado;
  if (esFlotante) {
    // Primero, formateamos el número a dos decimales
    numeroFormateado = num.toFixed(2);
    // Luego, agregamos las comas como separadores de miles
    numeroFormateado = numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    // En el caso de que sea un número entero, también formateamos a dos decimales
    numeroFormateado = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return "$" + numeroFormateado;
}

async function openModalUpdPaq(idPaq){
  let ajaxR = await pAjaxAsync("Backend/DentLab/App.php", {
    op: "getConfigChangeAvailablePartsPackages"
  }, 1);
  if (ajaxR != undefined) {
    $.ajax({
      type: "POST",
      url: "Backend/DentLab/App.php",
      data: "op=getCantidadPiezasPaqAct"+
      "&IdPaquetesDoctor="+idPaq,
      success:function(response){
        var cant = response;
        if (cant > "0") {
          $("#ModalUpdatePaq").modal("toggle");
          for (var i = 0; i < response.length; i++) {
            var cantPiez = response[i]["CantidadDisponible"];
            $("#divCantPiezas").html(`
              <input type="text" id="IdPaqSelected" value="${idPaq}" style="display:none;">
              <div class="row">
                <div class="col-6 col-lg-6">
                  <span>Cantidad Actual</span><br>
                  <input type="number" id="txtCantAct" readonly class="form-control" value="${cant}">
                </div>
                <div class="col-6 col-lg-6">
                  <span>Cantidad Nueva</span><br>
                  <input type="number" id="txtCantNew" class="form-control" value="1" min="1">
                </div>
              </div>
              `);
          }
        }else if (cant == "0"){
          toastr.warning("  modificar la cantidad de este paquete","WARNING");
          }else {
            toastr.warning(response,"WARNING");
          }
        },
        error:function(e){
          toastr.error(e.responseText,"ERROR 500");
        }

    });
  }
}

async function updateCantPaq() {
  let idPaquete = $("#IdPaqSelected").val();
  let valOld = Number($("#txtCantAct").val());
  let valNew = Number($("#txtCantNew").val());

  const result = await Swal.fire({
    title: 'Si actualiza los datos del paquete ya no podrá asignarle más cantidad ¿Desea aceptar?',
    showDenyButton: true,
    confirmButtonText: 'Aceptar',
    denyButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    if (valNew >= valOld) {
      toastr.info("No es posible asignar esta cantidad", "Alerta");
      return false;
    }

    let ajaxR = await pAjaxAsync("Backend/DentLab/App.php", {
      op: "restarCantPiezasPaq",
      idPaquete: idPaquete,
      valNew: valNew
    });

    if (ajaxR !== undefined) {
      $("#ModalUpdatePaq").modal("hide");
      getpaquetesDr();
    }
  } else if (result.isDenied) {
    Swal.fire('Sin cambios', '', 'info');
  }
}

function getpaquetesDr(){
  var idDoctor = $("#idDoc").val();
  var datasend = {
    op:"getpaquetesDr",
    idDoctor:idDoctor
  }
  var tablaPaquetes = $('#tablaPaquetes').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY PAQUETES POR MOSTRAR",
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
    "bFilter": true,
    "bInfo":false,

    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/DentLab/App.php",
      "data":datasend,
      "success" : function(response){
        if (response!=null) {
          tablaPaquetes.fnClearTable();
          let textPagado = "";
          for (var i = 0; i < response.length; i++) {
            let paqueteb64 = btoa(response[i]["Doctores_paquete_id"]);
            var prop = "";
            if (response[i]["Terminado"] == 1) {
              prop = "checked";
            }
            if (response[i]['Pagado'] == 1) {
              textPagado = `<span style="color:green">Si</span>`;
            }else{
              textPagado = `<span style="color:red;cursor:pointer;" onclick="openModalPagoPaquete('${paqueteb64}')">Pago no terminado</span>`;
              // textPagado = `<button class="btn btn-info" style="cursor:pointer;" onclick="CambiarEstatusPaquete('${response[i]["Doctores_paquete_id"]}')">Activar</button>`;

            }
            var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
            tablaPaquetes.fnAddData([
              response[i]["Serie"],
              response[i]["paquete"],
              response[i]["Pz_Total"],
              response[i]["solicitadas"],
              response[i]["CantidadDisponible"],
              "$"+response[i]["Costo"],
              textPagado,
              response[i]["Registro"],
              response[i]["Activado"] != null ? response[i]["Activado"] : "NO ASIGNADA",
              `<label class='switch'>
                  <input type='checkbox' id='chkTerm${i}' ${prop} disabled>
                  <span class='slider round'></span>
                </label>`,
                `<button type='button' class='btn btn-outline-info btn-sm' onclick='DetalleUso("${response[i]["idLab_Paquetes_Doctor_Cantidad"]}")'><i class="fa fa-info-circle"></i></button>`,
                `<button type='button' class='btn btn-outline-info btn-sm' onclick='openModalUpdPaq("${response[i]["Doctores_paquete_id"]}")'><i class="fa fa-pencil-square-o"></i></button>`,
                `<button type='button' class='btn btn-outline-info btn-sm' onclick='getPermisosAutorizaPagoPaquete("${response[i]["Doctores_paquete_id"]}")'><i class="fas fa-info"></i></button>`
            ])
          }
        }
      },
      "complete" : function(){
          $.unblockUI();
        }
    }
  });
}

function Reload(){
  var tablaPaquetes = $('#tablaPaquetes').dataTable();
  tablaPaquetes.api().ajax.reload();
}

function CambiarEstatusPaquete(Doctores_paquete_id){
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=UpdatePaquetePago&Doctores_paquete_id="+Doctores_paquete_id,
    success:function(data){
      if (data == "1") {
        toastr.success("Paquete pagado","ÉXITO");
        Reload();
      }else {
        toastr.warning("Algo salio mal... reintentelo de nuevo","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

var tablaDetalle = $('#tablaDetalle').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY DETALLE POR MOSTRAR",
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
});

function DetalleUso(Doctores_paquete_id){
  var datasend = {
    op:"getDetallePaqueteUsado",
    Doctores_paquete_id:Doctores_paquete_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      tablaDetalle.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tablaDetalle.fnAddData([
          response[i]["Serie"],
          response[i]["Cantidad"]
        ]);
      }
      $("#modalDetalle").modal('toggle');
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

var tablePagos = $('#tablePagos').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY PAGOS POR MOSTRAR",
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
});

function GetPagosDoctores(){
  var idDoctor = $("#idDoc").val();
  var datasend = {
    op:"GetPagosDoctores",
    idDoctor:idDoctor
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      tablePagos.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tablePagos.fnAddData([
          response[i]["FolioPago"],
          response[i]["Fecha"],
          "Pago de orden: "+response[i]["Serie"],
          response[i]["Monto"]
        ]);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}


function getDetallePagosPaquete () {
  let datos = {
    op: "getDetallePagosPaquete",
    Doctores_paquete_id: globalPaquete
  }
  var tableDetallePagosPaquete = $('#tableDetallePagosPaquete').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY REGISTROS POR MOSTRAR",
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
      "data":datos,
      "success" : function(response){
        if (response!=null) {
          tableDetallePagosPaquete.fnClearTable();
          let mensajeActivo = "";
          let icono = "";
          let habilitado = "";
          let colorIcon = "";
          for (var i = 0; i < response.length; i++) {
            if (response[i]["Activo"] == 0) {
              mensajeActivo = "Inactivo";
              icono = '<i class="fas fa-undo-alt"></i>';
              habilitado = "";
              colorIcon = "color:blue";
            }else {
              mensajeActivo = "Activo";
              icono = '<i class="far fa-heart"></i>';
              habilitado = "disabled";
              colorIcon = "color:green";
            }
            var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
            tableDetallePagosPaquete.fnAddData([
              response[i]["Serie"],
              response[i]["SeriePaquete"],
              `$${response[i]["Pago"]}`,
              response[i]["Descripcion"],
              response[i]["FechaPago"],
              mensajeActivo,
              `<button type='button' style="${colorIcon}" class='btn btn-outline-info btn-sm' onclick='updateActivoPagoPaquete("${response[i]["idLab_PagosPaqueteAnticipos"]}" ${habilitado})'>${icono}</button>`
            ])
          }
        }
      },
      "complete" : function(){
          $.unblockUI();
        }
    }
  });
}

function updateActivoPagoPaquete (valor) {
  Swal.fire({
  title: 'Si autoriza el pago no podrá regresar los cambios ¿Desea aceptar?',
  showDenyButton: true,
  confirmButtonText: 'Aceptar',
  denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      let datos = {
        op: "autorizarPagoPaquete",
        nidLab_PagosPaqueteAnticipos: valor
      }
      $.ajax({
        type: "post",
        url: "Backend/DentLab/App.php",
        data: datos,
        success:function (response) {
          if (response == 1) {
            Alerta("success","Pago Autorizado");
            setTimeout(function () {
              getpaquetesDr();
              getDetallePagosPaquete();
            }, 500);
          }else {
            Alerta("info","Error, Intente de nuevo");
          }
        },error:function (e) {
          alert(e.responseText);
        }
      });
    }else if (result.isDenied) {
    Swal.fire('Sin cambios', '', 'info')
  }
  })
}

let glbPaquete = "";
function openModalPagoPaquete (val){
  glbPaquete = val;
  $("#MetodoPago").val("");
  $("#formulariotrasferencia").fadeOut();
  $("#formularioRecoleccionEf").fadeOut();
  getDetallePagoRestantePaquete(val);
  getHistorialPagoPaquete(val);
  setTimeout(function () {
    $("#RealizaPagoPaquete").modal("toggle");
  }, 750);
}

async function changeMetodoPago(metodo){
  MetodoPagoGlobal = metodo;
  tkenGlobal = "";

if (metodo == "3") {
    await cantidadIngresada();
    $("#formulariotrasferencia").fadeIn();
    $("#formularioRecoleccionEf").fadeOut();
  }
  else if (metodo == "4") {
    await cantidadIngresada();
    $("#formulariotrasferencia").fadeOut();
    $("#formularioRecoleccionEf").fadeIn();
  }
}



let MetodoPagoGlobal = "";
function getDetallePagoRestantePaquete (paquete) {
  datos = {
    op: "getDetallePagoRestantePaquete",
    Doctores_paquete_id: paquete
  },
  $.ajax({
    type: "post",
    url: "Backend/DentLab/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#tituloPagoPaquete").html(`${response[i]["Serie"]}`);
        $("#NombrePaquete").html(`${response[i]["Paquete"]}`);
        $("#Saldo").html(`${response[i]["Saldo"]}`);
        $("#Restante").html(`${response[i]["Restante"]}`);
      }
      $("#txtCantidadPagar").val(0);
    },error:function(e){
      alert(e.responseText);
    }
  });
}

function getHistorialPagoPaquete(val) {
  $("#ContenedorHistorial").html("");
  datos = {
    op: "getHistorialPagoPaquete",
    Doctores_paquete_id: val
  }
  $.ajax({
    type: "post",
    url: "Backend/DentLab/App.php",
    data: datos,
    success:function(response){
      let ActivoText = "";
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        if (response[i]["Activo"] == 1) {
          ActivoText = "Autorizado";
        }else {
          ActivoText = "Sin Autorizar";
        }
        $("#ContenedorHistorial").append(`
          <div class="col-6 col-lg-6" style="text-align:center">
            <span>$ ${response[i]["Pago"]}</span>
          </div>
          <div class="col-6 col-lg-6" style="text-align:center">
            <span>${ActivoText}</span>
          </div>
          `);
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

function realizaPago () {
    Swal.fire({
    title: '¿Desea realizar el pago?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Realizar Pago'
  }).then((result) => {
    if (result.isConfirmed) {
    $.blockUI({
      message:  '<h1>Espere por favor.</h1>',
      centerY: 0,
      css: { top: '10px', left: '', right: '10px' }
    });
    $("#RealizaPagoPaquete").modal("hide");

      let Pago = Number($("#txtCantidadPagar").val());
      let MetodoPago = Number($("#MetodoPago").val());

      let  Ntarjeta = "";
      let  Mes = "";
      let  Ano = "";
      let  NombreT = "";
      let  ApellidoP = "";
      let ApellidoM = "";
      let  Code = "";

      if (MetodoPagoGlobal == "2") {
         Ntarjeta = $("#Ntarjeta").val();
         Mes = $("#Mes").val();
         Ano = $("#Ano").val();
         NombreT = $("#NombreT").val();
         ApellidoP = $("#ApellidoP").val();
         ApellidoM = $("#ApellidoM").val();
         Code = $("#Code").val();

        if (Ntarjeta == "" || Mes=="" || Ano == "" || NombreT == "" || ApellidoP == "" || ApellidoM == "" || Code == "") {
          Alerta("info","Ingrese todos los campos de la tarjeta");
          return false;
        }
      }else {
         Ntarjeta = "";
         Mes = "";
         Ano = "";
         NombreT = "";
         ApellidoP = "";
         ApellidoM = "";
         Code = "";
      }
      datos = {
        op: "realizaPagoPaquete",
        Paquete: glbPaquete,
        Pago: Pago,
        MetodoPago: MetodoPago,
        Tarjeta:Ntarjeta,
        mes:Mes,
        ano:Ano,
        nombre:NombreT,
        apellidop:ApellidoP,
        apellidom:ApellidoM,
        code:Code,
      }
      $.ajax({
        type: "post",
        url: "Backend/DentLab/App.php",
        data: datos,
        success:function (response) {
          if (response == "1") {
            Alerta("success","Pago Realizao");
            MetodoPagoGlobal = "";
            setTimeout(function () {
              getpaquetesDr();
            }, 1000);
            setTimeout($.unblockUI, 1000);
          }else if (response == "0") {
            Alerta("info","Algo salio mal, intente de nuevo");
            setTimeout($.unblockUI, 1000);
          }else {
            Alerta("info",response);
            setTimeout($.unblockUI, 1000);
          }
        }
      });
    }
  })
}


function abrirModalDoctPaq(){
  $("#slctPaquete").val("");
  $("#txtCantidad").val("");
  $("#txtSaldo").val("");
  $("#ModalPaqDoctor").modal("toggle");
}

function InsertarPaqueteDoctor(){
 let id = $("#idDoc").val();
 let cantidadP = Number($("#txtCantidad").val());
 let idPaquete = Number($("#slctPaquete").val());
 let Saldo = Number($("#txtSaldo").val());
 if (idPaquete === null) {
   Alerta("info","Seleccione un paquete");
   return false;
 }
 if (Saldo == "") {
   Alerta("info","Ingrese el Saldo restante");
 }
 if (cantidadP == "") {
   Alerta("info","Seleccione una cantidad");
   return false;
 }
 let datasend = {
   op:"AgregarPaqueteDoctor",
   idDoctor:id,
   idPaquete:idPaquete,
   cantidadRestante:cantidadP,
   Saldo:Saldo
 }
 $.ajax({
   type:"POST",
   url:"Backend/DentLab/App.php",
   data:datasend,
   success:function(response){
       if (response == "1") {
         toastr.success("Paquete asignado","ÉXITO");
         setTimeout(function () {
           $("#ModalPaqDoctor").modal("hide");
           getpaquetesDr();
         }, 1500);
       }else if (response != 1 && response != 0){
         toastr.info(response);
       }else {
         toastr.warning(response,"WARNING");
       }
     },error:function(e){
       toastr.error(e.responseText,"ERROR 500");
     }
   })
 }

async function asignaDatosPaqueteInp (paquete) {
  const respuesta = await getDatosPaqueteSelected(paquete);
  $("#txtSaldo").val(respuesta[0]["Costo"]);
  $("#txtCantidad").val(respuesta[0]["Pz_Total"]);
}

async function getDatosPaqueteSelected (val) {
  let datos = await {
    op: "getDatosPaquete",
    Productos_Paquetes_Id: val
  }
  let respuesta = [];
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
    return respuesta;
  }
}

async function getPermisosAutorizaPagoPaquete (valor) {
    let datos = await {
        op: "getPermisosAutorizaPagoPaquete"
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
            abrirModalDetallePagosPaquete(valor);
        }else {
            Alerta("info",respuesta);
        }
    }
}
let GlobalIva = 0;

async function cantidadIngresada () {
  let CantidadIngresada = Number($("#txtCantidadPagar").val());
  let CantidadIngresadaFormato = CantidadIngresada.toFixed(2);
  $("#cantidadIngresada").html(`$ ${CantidadIngresadaFormato}`);
  let TotalPagarConIva = (CantidadIngresada + (CantidadIngresada * (GlobalIva / 100)));
  let TotalPagarConIvaFormato = TotalPagarConIva.toFixed(2);
  if (MetodoPagoGlobal == "3") {
    $("#totalPagartext").html(`$ ${TotalPagarConIvaFormato}`);
  } else {
    $("#totalPagartext").html(`$ ${CantidadIngresadaFormato}`);
  }
}

async function getIvaConfig () {
  let datos = await {
    op: "getIvaJson"
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "POST",
      url: "Backend/Configuracion/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    GlobalIva = respuesta[0]["Valor"]
  }
}

function onlynumber(e) {
   tecla = (document.all) ? e.keyCode : e.which;
   if (tecla == 8) {
     return true;
   }
   patron = /[-0-9]/;
   tecla_final = String.fromCharCode(tecla);
   return patron.test(tecla_final);
 }

 async function getListVendedores(){
   let datos = {
     op: "getVendedores"
   };
   let respuesta = [];
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
     console.log(respuesta);
     if (respuesta.length > 0) {
       let htmlAdd = "";
       respuesta.forEach( datos => {
         htmlAdd += `
            <option value="${datos.id_sys_usuario}"> ${datos.Nombre} </option>
         `;
       });
       $("#slctVendedor").append(htmlAdd);
     }
   }
 }

 $(document).on("click","#btnUpdateVendedor",async function(){
   let valVendedor = $("#slctVendedor").val();
   console.log(valVendedor);
   if (valVendedor == "" || valVendedor === undefined || valVendedor === null) {
     alertify.warning("Sin vendedor seleccionado");
   } else {
      	alertify.confirm(`Confirmación de acción`,`¿Desea confirmar el vendedor seleccionado?`, async function(){
          let datos = {
            op: "asignaVendedorDoctor",
            Vendedor_Id: valVendedor,
            idDoctores: Doctor
          };
          let respuesta = "";
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
            if (respuesta = "1") {
              alertify.success("Vendedor Asignado");
            } else {
              alertify.error("ERROR!");
            }
          }
      	},async function(){
      		alertify.error("Cancelado");
      	}).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
      }
 });

 function goBack() {
    if (url_from == "Ordenes") {
      window.location.href = "ListOrdenes.php";
    } else {
      window.location.href = `Doctor.php?d=${Doctor}`;
    }
  }
