$(document).ready(function(){
  var id_Odn = $("#OT").val();
  $("#divIncludeOrdenes").load("IncludeOdontograma.php?idOrden="+id_Odn);
  OrdenTrabajo();
  setTimeout(function () {
    getPagos();
  }, 500);
  setTimeout(function () {
    HistorialOperaciones();
  }, 500);
  setTimeout(function () {
    Archivos();
  }, 500);
  setTimeout(function () {
    getDiscosAsignadosOrden();
  }, 500)
  getMarcasDentLab();
  getColorimetroDentLab();
  getEscaneadores();
});

// var globalCatgeoria = 0;
var globalDoctor = 0;
let globalNoOrden = 0;
let cantPiezasOrden = 0;
function OrdenTrabajo(){
  var orden_id = $("#OT").val();
  var datasend={
    op:"getOrdenTrabajo",
    idOrdenTrabajo:orden_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      let MetodoPagoTexto = "";
      if (response[0]["Descripcion"] == "" || response[0]["Descripcion"] == "null" || response[0]["Descripcion"] === null) {
        MetodoPagoTexto="Pagado Con paquetes";
      }else {
        MetodoPagoTexto=`${response[0]["Descripcion"]}`;
      }
      if (response.length >= 1) {
        if (response[0]["OrdenLigaColorimetro"] != null) {
          $("#cardComentarioOrdenColorimetro").fadeIn();
          $("#txComentarioOrdenColorimetro").val(`El colorímetro ${response[0]["colorimetro"]} se ha insertado debido a que se seleccionó la orden ${response[0]["OrdenLigaColorimetro"]}`);
        }
        // getEstadoFuturo(response[0]["idLab_Estado"]);
        getEstadoFuturo(response[0]["idLab_SubEstado"]);
        display(response[0]["idLab_SubEstado"]);
        if (response[0]["idCategorias"] == 3) {
          document.getElementById('divArchivosAlinea').style.display = 'block';
          ArchivosAlinia();
        }else {
          document.getElementById('divArchivosAlinea').style.display = 'none';
        }
        $("#idloe").val(response[0]["idLab_Ordenes_Estado"]);
        $("#divot").text(" #" +response[0]["Serie"]);
        globalNoOrden = response[0]["Serie"];
        globalDoctor = response[0]["Doctor_id"];
        $("#nptDoctor").val(response[0]["Doctor"]);
        $("#MetodoPago").val(MetodoPagoTexto);
        $("#nptPaciente").val(response[0]["Paciente"]);
        $("#nptEscaneador").val(response[0]["Nombre"]);
        $("#nptNombreLib").val(response[0]["NombreLib"]);
        $("#nptFechaLib").val(response[0]["Liberada_prod"]);
        $("#nptDateSol").val(response[0]["Fecha_entrega_solicitada"]);
        $("#nptColorimetro").val(response[0]["colorimetro"]);
        $("#nptInicio").val(response[0]["Agenda_inicio"]);
        $("#FlujoOrden").val(response[0]["Flujo"]);
        $("#nptFin").val(response[0]["Agenda_fin"]);
        $("#nptConfirm").val(response[0]["Fecha_confirmada"]);
        $("#txtObsEsc").val(response[0]["ObservacionesEscaneador"]);
        $("#txtObsLab").val(response[0]["ObservacionesLaboratororio"]);
        response[0]['Externo'] == "1" ? $("#chkExtInt").prop("checked",true) : $("#chkExtInt").prop("checked",false);
        response[0]['Externo'] == "1" ? $("#textIntExt").text("Externo") : $("#textIntExt").text("Interno");
        response[0]['Aut_color'] == "1" ? $("#chkColor").prop("checked",true) : $("#chkColor").prop("checked",false);
        response[0]['Aut_mordida'] == "1" ? $("#chkMord").prop("checked",true) : $("#chkMord").prop("checked",false);
        response[0]['Aut_munon'] == "1" ? $("#chkMuñ").prop("checked",true) : $("#chkMuñ").prop("checked",false);
        response[0]['Aut_adit'] == "1" ? $("#chkAdit").prop("checked",true) : $("#chkAdit").prop("checked",false);
        response[0]['Uid'] == "1" ? $("#chkLs").prop("checked",true) : $("#chkLs").prop("checked",false);
        $("#nptUnidades").val(response[0]["Piezas"]);
        cantPiezasOrden = response[0]["Piezas"];
        $("#nptProd").val(response[0]["Producto"]);
        $("#txtObservaciones").text(response[0]["Observaciones"]);
        $("#Flujo").val(response[0]["Estado"]);
        if (response[0]["Estado"] == "Diseño") {
          $("#divTituloH").html("<i class='fas fa-tooth'></i> "+response[0]["Estado"])
        }else if (response[0]["Estado"] == "Fabricación") {
          $("#divTituloH").html("<i class='fad fa-cubes'></i> "+response[0]["Estado"])
        }else{
          $("#divTituloH").html("<i class='fas fa-tooth'></i> Fabricación")
        }

        if (response[0]["Archivo"] == null || response[0]["Archivo"] == "") {
          document.getElementById('divArchivo').style.display = "block";
          document.getElementById('divTablaArchivo').style.display = "none";
        }else {
          document.getElementById('divArchivo').style.display = "block";
          document.getElementById('divTablaArchivo').style.display = "block";
        }

        if (response[0]["Con_scan"] == "1" || response[0]["Con_scan"] != "0") {
          $("#chkConModelo").prop("checked",false);
          document.getElementById('divConModelo').style.display = "none";
          document.getElementById('divConScan').style.display = "block";
        }else {
          if (response[0]["ModoModelo"] != "0" || response[0]["Con_scan"] != "" || response[0]["Con_scan"] != null) {
            $("#chkConModelo").prop("checked",true);
            document.getElementById('divConModelo').style.display = "block";
            document.getElementById('divConScan').style.display = "none";
            response[0]['ModoModelo'] == "1" ? $("#nptTipoConM").val("Pasar a recolectar modelo") : $("#nptTipoConM").val("Se enviará el modelo");
          }
          else {
            $("#chkConModelo").prop("checked",false);
            document.getElementById('divConModelo').style.display = "none";
            document.getElementById('divConScan').style.display = "none";
          }
        }

        if (response[0]["Con_scan"] == 0) {
          document.getElementById('divAsignar').style.display = "none";
          $("#divEscaneador").attr('class','col-12 col-lg-12');
        }else {
          if (response[0]["Usuario_id_escanea"] != null) {
              document.getElementById('divAsignar').style.display = "none";
              $("#divEscaneador").attr('class','col-12 col-lg-12');
          }else {
            document.getElementById('divAsignar').style.display = "block";
            $("#divEscaneador").attr('class','col-12 col-lg-9');
            $("#divAsignar").attr('class','col-12 col-lg-3');
          }
        }
        // let contHTMLDiscosU = "";
        // if (response[0]["DiscosEnOrden"] < 1) {
        //   contHTMLDiscosU = `
        //     <div class='col-12 col-lg-12'  style='text-align:center'>
        //       <span>${response[0]["DiscosUtilizados"]}</span>
        //     </div>
        //   `;
        // } else {
        //   let ArrDiscosUtilizados = response[0]["DiscosUtilizados"].split(':');
        //   console.log(ArrDiscosUtilizados);
        //   contHTMLDiscosU = `
        //    <div class='col-6 col-lg-6' style='text-align:center'>
        //       <h6><b>No Disco:</b> ${ArrDiscosUtilizados[0]}</h6>
        //    </div>
        //    <div class='col-6 col-lg-6' style='text-align:center'>
        //       <h6><b>Piezas:</b> ${ArrDiscosUtilizados[1]}</h6>
        //    </div>
        //   `;
        // }
        // $("#contDiscosUtilizados").append(contHTMLDiscosU);
        ImprimirPaquetesUsados();
        getDetalleOrden();
        Deshabilita();
        // getDiscosUtilizadosOrden();

      }else {
        toastr.warning("No hay información acerca de esta orden","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function ImprimirPaquetesUsados(){
  var orden_id = $("#OT").val();
  var datasend={
    op:"getOrdenTrabajoPaquetes",
    idOrden:orden_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      if (response.length >= 1) {
        for (var i = 0; i < response.length; i++) {
          $("#divPaquetes").append(`
            <div class="row"><div class="col-12 col-lg-12">
              <label>Paquete ${i+1}</label>
              <input type="text" class="form-control" disabled name="nptPaquete" id="nptPaquete" value="Paquete ${response[i]["Paquete"]}, Folio ${response[i]["Serie"]}">
              <br>
            </div></div>`);
        }
      }else {
        $("#divPaquetes").append(`
          <div class="row"><div class="col-12 col-lg-12" style="text-align:center;">
            <h5>No hay paquetes usados en esta orden</h5>
          </div></div>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

var tableDetalle = $('#tableDetalle').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY DETALLES DE LA ORDEN POR MOSTRAR",
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

function getDetalleOrden(){
  var orden_id = $("#OT").val();
  var datasend={
    op:"getDetalleOrden",
    idOrden:orden_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      if (response.length >= 1) {
        document.getElementById('divTabla').style.display = "block";
        document.getElementById('divmensajeDs').style.display = "none";
        tableDetalle.fnClearTable();
        var subt = 0;
        var subtA = 0;
        for (var i = 0; i < response.length; i++) {
          tableDetalle.fnAddData([
            response[i]["Producto"],
            response[i]["Cant"],
            "$"+response[i]["Precio"],
            "$"+response[i]["Anticipo"],
            response[i]["Plazo"],
            "$"+response[i]["Subtotal"],
            "$"+response[i]["Subtotal_Anticipo"]
          ]);
          subt += parseFloat(response[i]["Subtotal"]);
          subtA += parseFloat(response[i]["Subtotal_Anticipo"]);
        }
        $("#Subtotal").text("$"+subt.toFixed(2));
        $("#SubtotalAnt").text("$"+subtA.toFixed(2));
      }
      else {
        document.getElementById('divTabla').style.display = "none";
        document.getElementById('divmensajeDs').style.display = "block";
        $("#divmensaje").append(`
          <div class="row"><div class="col-12 col-lg-12" style="text-align:center;">
            <h5>No hay detalle en esta orden</h5>
          </div></div>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function Deshabilita(){
  let ordenFlujo = $("#FlujoOrden").val();
  $("#nptDoctor").prop("disabled",true);
  $("#MetodoPago").prop("disabled",true);
  $("#nptPaciente").prop("disabled",true);
  $("#nptEscaneador").prop("disabled",true);
  $("#nptDateSol").prop("disabled",true);
  $("#nptColorimetro").prop("disabled",true);
  $("#chkColor").prop("disabled",true);
  $("#chkExtInt").prop("disabled",true);
  $("#nptInicio").prop("disabled",true);
  $("#nptFin").prop("disabled",true);
  $("#txtObsEsc").prop("disabled",true);
  if (ordenFlujo == "4" || ordenFlujo == "5") {
    $("#txtObsLab").prop("disabled",false);
  }else {
    $("#txtObsLab").prop("disabled",true);
  }
  $("#nptConfirm").prop("disabled",true);
  $("#chkMord").prop("disabled",true);
  $("#chkMuñ").prop("disabled",true);
  $("#chkAdit").prop("disabled",true);
  $("#chkLs").prop("disabled",true);
  $("#chkConModelo").prop("disabled",true);
  $("#nptTipoConM").prop("disabled",true);
  $("#nptUnidades").prop("disabled",true);
  $("#nptProd").prop("disabled",true);
  $("#nptPaquete").prop("disabled",true);
  $("#txtObservaciones").prop("disabled",true);
}

function getpaqueterias(){
  $("#slcPaqueteria").html("");
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getpaqueterias",
    success:function(response){
      response = JSON.parse(response.trim());
      $("#slcPaqueteria").append("<option value='' selected disabled>Seleccione una paqueteria</option>")
      for (var i = 0; i < response.length; i++) {
        $("#slcPaqueteria").append(`<option value="${response[i]["idLab_paqueteria"]}">${response[i]["Paqueteria"]}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function AbrirModalAgenda(){
  $("#ModalAgendar").modal('toggle');
}

function getEscaneadores(){
  $("#slcEscaneador").html("");
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getEscaneadores",
    success:function(response){
      response = JSON.parse(response.trim());
      $("#slcEscaneador").append("<option value='' selected disabled>Selecciona un escaneador</option>")
      for (var i = 0; i < response.length; i++) {
        $("#slcEscaneador").append(`<option value="${response[i]["id_sys_usuario"]}">${response[i]["Nombre"]}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function AgendarOrden(){
  var orden_id = $("#OT").val();
  var escaneador_id = $("#slcEscaneador").val();
  var nombreEsc = $("#slcEscaneador option:selected").text();
  var serieOrden = $("#divot").text();
  var datasend = {
    op:"AgendarOrden",
    idOrdenTrabajo:orden_id,
    id_escaneador:escaneador_id
  };
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Escaneador "+nombreEsc+" asignado a la orden "+serieOrden,"ÉXITO");
        setTimeout(function () {
          location.reload();
        }, 1500);
      }else {
        toastr.warning("Algo salio mal... Reintentalo de nuevo","WARNING");
      }
      $("#ModalAgendar").modal('hide');
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function activeOrNot(id,a,li2,li3,li4,li5){

  $("#"+li2).removeClass('navActive').addClass('navUnActive');
  $("#"+li3).removeClass('navActive').addClass('navUnActive');
  $("#"+li4).removeClass('navActive').addClass('navUnActive');
  $("#"+li5).removeClass('navActive').addClass('navUnActive');
  if (document.getElementById(a).classList.contains("active")) {
    $("#"+id).removeClass('navActive');
    $("#"+id).addClass('navUnActive');
  }else {
    $("#"+id).removeClass('navUnActive');
    $("#"+id).addClass('navActive');
  }
}

var tablePago = $('#tablePago').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY PAGOS REGISTRADOS POR MOSTRAR",
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

var tableFabricacion = $('#tableFabricacion').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY PROCESOS POR MOSTRAR",
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

var tableArchivos = $('#tableArchivos').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY ARCHIVOS POR MOSTRAR",
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

var tableArchivosAlinia = $('#tableArchivosAlinia').dataTable({
  "language": {
    "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    "zeroRecords": "NO HAY ARCHIVOS POR MOSTRAR",
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

function display(subestado){
  if (subestado <= 2) {
    document.getElementById('liO').style.display = "block";
    document.getElementById('liP').style.display = "none";
    document.getElementById('liH').style.display = "none";
    document.getElementById('liA').style.display = "none";
    // document.getElementById('liV').style.display = "block";
  }else {
    document.getElementById('liO').style.display = "block";
    document.getElementById('liP').style.display = "block";
    document.getElementById('liH').style.display = "block";
    document.getElementById('liA').style.display = "block";
    // document.getElementById('liV').style.display = "block";
  }
}

function getEstadoFuturo(estado){
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getEstadoFuturo&idEstado="+estado,
    success:function(response){
      response = JSON.parse(response.trim());
      $("#nptEstadoFuturo").val(response[0]["idLab_SubEstado"]);
      $("#nptEstadoGralFuturo").val(response[0]["idLab_Estado"]);
      var compl = "";
      if (response[0]["idLab_SubEstado"] == 7) {
        document.getElementById('divAgregar').style.display = 'block';
      }else {
        document.getElementById('divAgregar').style.display = 'none';
      }

      if (response[0]["idLab_SubEstado"] < 7) {
        compl = "Liberar a "+response[0]["Estado"];
      }else {
        if (response[0]["idLab_SubEstado"] == 7) {
          compl = "Liberar a entregado";
        }else {
          compl = "Orden entregada";
          $("#btnLiberar").prop("disabled",true);
          $("#btnCancelar").prop("disabled",true);
        }
      }
      $("#btnLiberar").text(compl);
      $("#nptEstadoFuturoFlujo").val(response[0]["Estado"]);
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function HistorialOperaciones(){
  var orden_id = $("#OT").val();
  var idLab_Ordenes_Estado = $("#idloe").val();
  var datasend = {
    op:"getHistorialOrden",
    id_orden:orden_id,
    idLab_Ordenes_Estado:idLab_Ordenes_Estado
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    dataType:"json",
    success:function(response){
      const dataR = response.Data;
      console.log(dataR)
      if (dataR.length > 0) {
        $("#tbHistorial").append(dataR);
      }
      var tableHistorial = $('#tableHistorial').dataTable({
        "language": {
          "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
          "zeroRecords": "NO HAY HISTORIAL POR MOSTRAR",
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
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function Liberar(){
  var subestado = $("#nptEstadoFuturo").val();
  if (subestado == 7 && $("#chkAddG").is(":checked")) {
    $("#ModalGuia").modal('toggle');
    getpaqueterias();
  }
  else {
    var Flujo = $("#nptEstadoFuturoFlujo").val();
    var idFlujo = $("#nptEstadoFuturo").val();
    var idFlujoGRAL = $("#nptEstadoGralFuturo").val();
    var obs = $("#txtObs").val();
    if (idFlujo == "2") {
      var idSub = "4";
    }
    else if (idFlujo == "3") {
      var idSub = "5";
    }
    else if (idFlujo == "4") {
      var idSub = "6";
    }
    var idLab_Ordenes_Estado = $("#idloe").val();
    var orden_id = $("#OT").val();
    Swal.fire({
      title: '¿Seguro de liberar la orden a '+Flujo+'?',
      text: 'Una vez liberada la orden no se podra hacer cambios',
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
          op:"UpdateEstatusOrden",
          Flujo:idFlujo,
          FlujoGral:idFlujoGRAL,
          idOrden:orden_id,
          idLab_Ordenes_Estado:idLab_Ordenes_Estado,
          noGuia:"",
          paq:"",
          obsLab:obs
        }
        $.ajax({
          type:"POST",
          url:"Backend/DentLab/App.php",
          data:datasend,
          success:function(data){
            if (data == "1") {
              toastr.success("Orden liberada a "+Flujo+" correctamente","OK");
              setTimeout(function () {
                location.reload();
              }, 1500);
            }else if(data !="") {
              toastr.info(data);
            } else {
              toastr.warning("Algo salio mal... Intentalo de nuevo","WARNING");
            }
          },error:function(e){
            toastr.error(e.responseText, "ERROR 500");
          }
        })
      }
      });
  }
}

function liberarModal(){
  var Flujo = $("#nptEstadoFuturoFlujo").val();
  var idFlujo = $("#nptEstadoFuturo").val();
  var idFlujoGRAL = $("#nptEstadoGralFuturo").val();
  var noGuia = $("#nptNoG").val();
  var paq = $("#slcPaqueteria").val();
  var obs = $("#txtObs").val();
  if (idFlujo == "2") {
    var idSub = "4";
  }
  else if (idFlujo == "3") {
    var idSub = "5";
  }
  else if (idFlujo == "4") {
    var idSub = "6";
  }
  var idLab_Ordenes_Estado = $("#idloe").val();
  var orden_id = $("#OT").val();
  var datasend = {
    op:"UpdateEstatusOrden",
    Flujo:idFlujo,
    FlujoGral:idFlujoGRAL,
    idOrden:orden_id,
    idLab_Ordenes_Estado:idLab_Ordenes_Estado,
    noGuia:noGuia,
    paq:paq,
    obsLab:obs
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Orden liberada a "+Flujo+" correctamente","OK");
        setTimeout(function () {
          location.reload();
        }, 1500);
      }else {
        toastr.warning("Algo salio mal... Intentalo de nuevo","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText, "ERROR 500");
    }
  })
}

function VerifyProfile(){
  var profile = $("#profile").val();
  if (profile != 12) {
    toastr.warning("Para cancelar la orden necesitas acceso del administrador de laboratorio.","WARNING");
    $("#user").val("");
    $("#pwd").val("");
    setTimeout(function () {
      $("#modalAcceso").modal('toggle');
    }, 1500);
  }
  else {
    $("#modalComentarioCancelacion").modal('toggle');
  }
}

function Autenticar(){
  var user = $("#user").val();
  var pwd = $("#pwd").val();
  var datasend = {
    op:"VerifyUser",
    user:user,
    pwd:pwd
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Autenticación exitosa","OK");
        $("#modalAcceso").modal('hide');
        setTimeout(function () {
          // Cancelar();
          abrirModalCancelar();
        }, 1000);
      }else if (data == "0") {
        toastr.warning("El usuario no existe, verifica los datos","WARNING");
      }else {
        toastr.warning("Algo salio mal... Intentalo de nuevo","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText, "ERROR 500");
    }
  })

}

function abrirModalCancelar(){
  $("#modalComentarioCancelacion").modal('toggle');
}

function Cancelar(){
  var orden = $("#divot").text();
  var idOrden = $("#OT").val();
  var estado = $("#Flujo").val();
  var motivo = $("#txtCancelar").val();
  Swal.fire({
    title: '¿Seguro de cancelar la orden '+orden+'?',
    text: 'Una vez cancelada la orden no se podra hacer cambios',
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
        op:"CancelarOrden",
        id_orden:idOrden,
        motivoC:motivo
      }
      $.ajax({
        type:"POST",
        url:"Backend/DentLab/App.php",
        data:datasend,
        success:function(data){
          if (data == "1") {
            $("#modalComentarioCancelacion").modal('hide');
            toastr.success("Orden cancelada "+orden+" correctamente","OK");
            setTimeout(function () {
              window.location.href = "index.php";
            }, 1500);
          }else if (data == "0") {
            toastr.info("Orden "+orden +" en estado de "+estado+" no puede ser cancelada","OK");
          }
          else {
            toastr.warning("Algo salio mal... Intentalo de nuevo","WARNING");
          }
        },error:function(e){
          toastr.error(e.responseText, "ERROR 500");
        }
      });
      }
   });
}

function Codbar(serie){
  JsBarcode(`#codOT`, serie, {
    format: "CODE128",
    width: 2.5,
    height: 15,
    fontSize: 12,
    displayValue: false
  });
}

function Etiqueta(){
  var orden_id = $("#OT").val();
  $("#btnEtiqueta").prop("disabled",true);
  if (window.dentShowExecutiveLabelLoading) {
    window.dentShowExecutiveLabelLoading({ serie: orden_id });
  } else {
    $.blockUI({ message: `<h4 style="text-align:center">GENERANDO ETIQUETA, POR FAVOR ESPERE...</h4>`, css: { backgroundColor: null, color: '#fff', border: null } });
  }
  var id_alumno=$("#slcAlumnos").val();
  var datasend={
    op:"getOrdenTrabajo",
    idOrdenTrabajo:orden_id
  }
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response=JSON.parse(response.trim());
      var d = response[0] || {};
      if (window.dentShowExecutiveLabelLoading) {
        window.dentShowExecutiveLabelLoading({
          serie: d["Serie"] || orden_id,
          doctor: d["Doctor"],
          paciente: d["Paciente"],
          fechaEntrega: d["Fecha_entrega_solicitada"],
          celular: d["Celular"],
          producto: d["Producto"],
          piezas: d["Piezas"],
          color: d["colorimetro"],
          observaciones: d["Observaciones"]
        });
      }
      Codbar(response[0]["Serie"]);
      var frame1 = document.getElementById('dentThermalPrintFrame');
      if (!frame1) {
        frame1 = document.createElement('iframe');
        frame1.id = 'dentThermalPrintFrame';
        frame1.name = 'dentThermalPrintFrame';
        frame1.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;opacity:0.001;pointer-events:none;z-index:-999;border:none;';
        document.body.appendChild(frame1);
      }

      var styleContainer = 'style="overflow: hidden;width: 100%;height: auto; text-align:center;margin:0;padding:0"';
      var codeBar = $("#divComp").html();
      var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write(`<!DOCTYPE html>
                              <html>
                                <head>
                                  <meta charset="utf-8">
                                  <style>
                                    @page { size: auto; margin: 0mm; }
                                    @media print { html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; } }
                                    body { font-family: Arial, sans-serif; size: 10px; text-align: center; margin: 0; padding: 2px 4px; }
                                    table { width: 100%; border-collapse: collapse; }
                                    svg { display: block; margin: 2px auto 0 auto; max-width: 100%; height: auto; }
                                  </style>
                                </head>
                                <body>
                                <div ${styleContainer}>
                                  <div style="overflow:hidden;">
                                    <table style='width:100%;'>
                                          <td style='text-align:left;width:30%;font-size:12px;'>OT: ${response[0]["Serie"]}</td>
                                          <td style='text-align:center;font-weight:bold;font-size:9px'>dentlab.mx</td>
                                          <td style='text-align:right;width:50%;font-size:10px;'>F. Ent: ${response[0]["Fecha_entrega_solicitada"]}</td>
                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:center;width:100%;font-size:13px;margin-top:0 !important;margin-bottom:0 !important;'><strong>${response[0]["Doctor"]}</strong></td>
                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:left;width:100%;font-size:9px'>Dirección: <strong>${response[0]["Direccion"]}</strong></td>
                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:left;width:100%;font-size:13px'>Px: <strong>${response[0]["Paciente"]}</strong></td>

                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:left;width:60%;font-size:9px'>Prod: <strong>${response[0]["Producto"]}</strong></td>
                                        <td style='text-align:right;width:40%;font-size:9px'>Tel: <strong>${response[0]["Celular"]}</strong></td>
                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:left;width:30%;font-size:9px'>Unid: <strong>${response[0]["Piezas"]}</strong></td>
                                        <td style='text-align:left;width:70%;font-size:9px'>Color: <strong>${response[0]["colorimetro"]}</strong></td>
                                    </table>
                                    <table style='width:100%;'>
                                        <td style='text-align:left;width:100%;font-size:9px'>Obs: <strong>${response[0]["Observaciones"]}</strong></td>
                                    </table>`);
      frameDoc.document.write(codeBar);
      frameDoc.document.write(`</div>
              </div>
             </body>
           </html>`);
      frameDoc.document.close();
      setTimeout(function () {
        if (frame1.contentWindow) {
          frame1.contentWindow.focus();
          frame1.contentWindow.print();
        }
        $("#btnEtiqueta").prop("disabled",false);
      }, 2500);

      setTimeout(function () {
        if (window.dentHideExecutiveLabelLoading) {
          window.dentHideExecutiveLabelLoading();
        }
        $.unblockUI();
      }, 2750);

      return false;
    },error:function(e){
      $("#btnEtiqueta").prop("disabled",false);
      if (window.dentHideExecutiveLabelLoading) {
        window.dentHideExecutiveLabelLoading();
      }
      $.unblockUI();
      toastr.error(e.responseText, "ERROR 500");
    }
  });
}

function clickNpt(){
  $("#nptFile").click();
}

(function(){
  "use strict";
  var dropZone = $('#dropzones')[0];
  var startUpload = function(files){
    var tipo;
    tipo = files[0]["type"];
    if (tipo=="application/x-zip-compressed") {
        $("#ImagenesDrop").append(`<div class="col-lg-12 text-center">
                                  <img class="im" id="preview" width="85" height="85" title = "${files[0]["name"]}" src="docs/images/zipIcon.png">
                                  <a id="btn" class="quitar" onclick="RemoverArchivo();"
                                    data-toggle="tooltip" title="Quitar archivo">
                                    <i class="fa fa-times fa-lg"></i>
                                  </a><br>
                                  <label style="color:black;">${files[0]["name"]}</label>
                                </div>`);
    }
    else if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg") {
        $("#ImagenesDrop").append(`<div class="col-lg-12 text-center">
                                  <img class="im" id="preview" width="85vh" height="100vh" title = "${files[0]["name"]}" src="docs/images/image.png">
                                  <a id="btn" class="quitar" onclick="RemoverArchivo();"
                                    data-toggle="tooltip" title="Quitar archivo">
                                    <i class="fa fa-times fa-lg"></i>
                                  </a><br>
                                  <label style="color:black;">${files[0]["name"]}</label>
                                </div>`);
    }
    else{
        toastr.info("El archivo "+files[0]["name"]+" no es valido, verifique el tipo de archivo y reintenlo de nuevo.","INFO");
        $("#nptFile").val("");
        $("#ImagenesDrop").empty();
    }
  };

  var standardUpload = $("#nptFile");
  standardUpload.change(function(e){
    var standardFiles = $("#nptFile").prop('files');
    startUpload(standardFiles);
  });
  // dropZone.ondrop = function(e){
  //   e.preventDefault();
  //   this.className = 'upload_drops';
  //   startUpload(e.dataTransfer.files);
  // };
  // dropZone.ondragover = function(){
  //   $("#ImagenesDrop").empty();
  //   this.className = 'upload_drops drop';
  //   return false;
  // };
  // dropZone.ondragleave = function(){
  //   this.className = 'upload_drops';
  // };
}());

function ver(files,cont){
  var reader = new FileReader();
  reader.onload = function(){
    $("#preview"+cont).attr("src",reader.result);
  }
  reader.readAsDataURL(files);
}

function RemoverArchivo(archivo){
  $("#nptFile").val("");
  $("#ImagenesDrop").empty();
}

function Archivos(){
  var orden_id = $("#OT").val();
  var datasend = {
    op:"getArchivoOrden",
    id_orden:orden_id
  };
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      tableArchivos.fnClearTable();
      for (var i = 0; i < response.length; i++) {
          $("#nptNombreFile").val(response[0]["Archivo"]);
          var urlDent = ""
          if (response[i]["tipo"] == 1) {
            urlDent = "https://dentcontrol.com.mx/archivos/ArchivosOrdenes/"+globalDoctor+"/"+response[i]["Archivo"];
          }else if (response[i]["tipo"] == 2){
            urlDent = "ArchivosOrdenes/"+globalDoctor+"/"+response[i]["Archivo"];
          }
          tableArchivos.fnAddData([
            response[i]["Archivo"],
            `<a target="_blank" type="button" class="btn btnEtiqueta" href="${urlDent}">
            <i class="fal fa-cloud-download-alt"></i></a>`
          ]);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function ArchivosAlinia(){
  var orden_id = $("#OT").val();
  var datasend = {
    op:"getArchivoAlinea",
    id_orden:orden_id
  };
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      tableArchivosAlinia.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tableArchivosAlinia.fnAddData([
          response[i]["Requisito"],
          response[i]["Archivo"],
          `<a  type="button" class="btn btnEtiqueta" href="https://dentcontrol.com.mx/lab/archivos/ArchivosRequisitos/${globalDoctor}/${response[i]["Archivo"]}">
          <i class="far fa-eye"></i></a>`
        ]);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function InsertArchivo(){
  if (document.getElementById("formInsertFile").checkValidity()) {
    event.preventDefault();
    var form = $("#formInsertFile")[0];
    var data =new FormData(form);
    data.append("op","UploadFile");
    data.append("doctor",globalDoctor);
    $("#btnGFile").prop("disabled",true);
    $.ajax({
      type: "POST",
      url: "Backend/DentLab/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data){
        if (data=="1") {
          toastr.success("Archivo subido exitosamente","OK");
          setTimeout(function(){
            location.reload()
          },1500);
        }
        else {
          toastr.warning("Algo paso al intentar subir el archivo, intentalo de nuevo.","WARNING");
        }
        $("#btnGFile").prop("disabled",false);
      },
      error: function(e){
        $("#btnGFile").prop("disabled",false);
        toastr.error(e.responseText,"ERROR 500");
      }
    });
  }
}

function getPagos(){
  var orden_id = $("#OT").val();
  var datasend = {
    op:"getPagos",
    idOrdenTrabajo:orden_id
  };
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      tablePago.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tablePago.fnAddData([
          response[0]["FolioPago"],
          response[0]["Descripcion"],
          response[0]["Monto"],
          response[0]["Fecha"],
          response[0]["Nombre"]
        ]);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function AgregarPagos(){
  getMetodosPago();
  $("#ModalPago").modal('toggle');
}

function getMetodosPago(){
  $("#slcMethod").html("");
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getMetodosPago",
    success:function(response){
      response = JSON.parse(response.trim());
      $("#slcMethod").append(`<option value="" selected disabled>Selecciona un metodo de pago</option>`);
      for (var i = 0; i < response.length; i++) {
        $("#slcMethod").append(`<option value="${response[i]["id_Metodos_Pago"]}">${response[i]["Descripcion"]}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}

function Pagar(){
  var orden_id = $("#OT").val();
  var metodo = $("#slcMethod").val();
  var monto = $("#nptMonto").val();
  if (metodo != "" && monto != "") {
    var datasend = {
      op:"AgregarPago",
      orden_id:orden_id,
      Metodo:metodo,
      Monto:monto
    };
    $.ajax({
      type:"POST",
      url:"Backend/DentLab/App.php",
      data:datasend,
      success:function(data){
        if (data == "1") {
          toastr.success("Pago registrado correctamente","ÉXITO");
          setTimeout(function () {
            location.reload();
          }, 1500);
        }else {
          toastr.warning("Algo salio mal... Reintentalo de nuevo.","WARNING");
        }
      },error:function(e){
        toastr.error(e.responseText,"ERROR 500");
      }
    })

  }
  else {
    toastr.info("Asegurate de llenar todos los datos","INFO");
  }
}

function updateObservacionLaboratorio(){
  let orden_id = $("#OT").val();
  let observacion = $("#txtObsLab").val();

  $.ajax({
    type: "POST",
    url: "Backend/DentLab/App.php",
    data: "op=updateObservacionLaboratorio"+"&orden_id="+orden_id+"&observacion="+observacion,
    success:function(response){
      if (response == "1") {

      }else if (response == "0") {
        toastr.warning("Algo salio mal... Reintentalo de nuevo.","WARNING");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}


let tableAsignaDiscos = $("#tableAsignaDiscos").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY DISCOS AGREGADOS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: false,
  bPaginate: false,
  bFilter: false,
  bInfo: false,
});
let tableDiscosAsignadosOrdenModal = $("#tableDiscosAsignadosOrdenModal").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY DISCOS AGREGADOS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: false,
  bPaginate: false,
  bFilter: false,
  bInfo: false,
});


let tableAsignaDiscosPrincipal = $("#tableAsignaDiscosPrincipal").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY DISCOS AGREGADOS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: false,
  bPaginate: false,
  bFilter: false,
  bInfo: false,
});


async function getDiscosAsignadosOrden () {
  let orden_id = await $("#OT").val();
  let datos = await {
    op: "getDiscosAsignadosOrden",
    Orden: globalNoOrden
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
    tableAsignaDiscos.fnClearTable();
    tableAsignaDiscosPrincipal.fnClearTable();
    respuesta.forEach(registros => {
      tableAsignaDiscos.fnAddData([
        registros.Disco,
        registros.Piezas
        ])
    });
    respuesta.forEach(registros => {
      tableAsignaDiscosPrincipal.fnAddData([
        registros.Disco,
        registros.Piezas
        ])
    });
  }
}

async function getDiscosAsignadosOrdenDentLab() {
  let orden_id = await $("#OT").val();
  let datos = await {
    op: "getDiscosAsignadosOrdenDentLab",
    Orden: globalNoOrden
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
    let cantidadPiezasDiscos = 0;
    tableDiscosAsignadosOrdenModal.fnClearTable();
    respuesta.forEach(registros => {
      cantidadPiezasDiscos = cantidadPiezasDiscos + Number(registros.Piezas);
      tableDiscosAsignadosOrdenModal.fnAddData([
        registros.Disco,
        `<div class="row">
          <div class="col-12 col-lg-12">
            <input type="number" class="form-control" style="text-align:center"  value="${registros.Piezas}" id="inpActualizaCantDiscos${registros.idLab_Discos_Ordenes_Archivos}"></input>
          </div>
        </div>`,
        `<div class="row">
           <div class="col-12 col-lg-6 offset-lg-3">
             <button class="btnAsignar" onclick="updateCantidadPiezasDisco(${registros.idLab_Discos_Ordenes_Archivos})"><i class="fa fa-pen-square"></i></button>
           </div>
         </div>`,
         `<div class="row">
            <div class="col-12 col-lg-6 offset-lg-3">
              <button class="btnEliminarDisco" onclick="eliminarPiezasDisco(${registros.idLab_Discos_Ordenes_Archivos})"><i class="fa fa-trash-alt"></i></button>
            </div>
          </div>`
        ])
    });
    $("#CantPiezasDiscoAsignados").html(`
        <div class="col-12 col-lg-12" style="text-align:center">
          <h6>Cantidad de piezas de discos asignados a la orden: <b>${cantidadPiezasDiscos}</b></h6>
        </div>
      `);
  }
}

async function eliminarPiezasDisco (val) {
  let datos = await {
    op: "deleteDiscosOrden",
    idLab_Discos_Ordenes_Archivos: val
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/DentLab/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      await getDiscosActivosDentLab();
      await getDiscosAsignadosOrdenDentLab();
      await getDiscosAsignadosOrden();
      toastr.success("Piezas Eliminadas");
    } else {
      toastr.warning("ERROR!");
    }
  }
}

async function updateCantidadPiezasDisco (val) {
  let CantPiezasDisco = Number($("#inpActualizaCantDiscos"+val).val());
  let datos = await {
    op: "updateCantidadPiezasDisco",
    Orden: globalNoOrden,
    idLab_Discos_Ordenes_Archivos: val,
    Cantidad: CantPiezasDisco
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/DentLab/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      await getDiscosActivosDentLab();
      await getDiscosAsignadosOrdenDentLab();
      await getDiscosAsignadosOrden();
      toastr.success("Cantidad Actualizada");
    } else {
      toastr.warning(respuesta);
      getDiscosAsignadosOrdenDentLab();
    }
  }
}

async function getDatosDiscosOrden () {
  $("#NoOrdenAsignDiscos").html(`No Orden: # ${globalNoOrden}`);
  $("#CantPiezasOrdenH3").html(`Cantidad de piezas en la orden: ${cantPiezasOrden}`);
  await getDiscosActivosDentLab();
  await getDiscosAsignadosOrdenDentLab();

  let header = `<span><i class="fal fa-plus-hexagon"></i> Asignación de disco para la Orden # ${globalNoOrden}</span>`;
  openModalM('divDiscosActivosDisp',header);
}

async function openModalM(div,header){
  if (!alertify.ModalMAX) {
  alertify.ModalMAX || alertify.dialog('ModalMAX',function(){
    return {
        main:function(content){
            this.setContent(content);
        },
        build:function(){
            this.setHeader(header);
        },
        setup:function(){
            return {
                focus:{
                    element:function(){
                        return this.elements.body.querySelector(this.get('selector'));
                    },
                    select:true
                },
                options:{
                    maximizable:false,
                    padding:true,
                    startMaximized: true
                }
            };
        },
        settings:{
            selector:undefined
        }
    };
  });
}
alertify.ModalMAX ($(`#${div}`)[0]);
}


  let tableDiscosActivos = $("#tableDiscosActivos").dataTable({
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY DISCOS AGREGADOS POR MOSTRAR",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR  ",
    },
    columnDefs: [
      {
        className: "dt-center",
        targets: "_all",
      },
    ],
    order: [],
    bSort: true,
    bPaginate: false,
    bFilter: true,
    bInfo: true,
  });
async function getDiscosActivosDentLab(){
  let idMarca = $("#slctMarca").val();
  let idColorimetroColor = $("#slctColores").val();
  let Tamano = $("#txtLongitud2").val();
  let datos = await {
    op: "getDiscosActivosDentLab",
    idMarca: idMarca,
    idColorimetroColor: idColorimetroColor,
    Tamano: Tamano
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
     tableDiscosActivos.fnClearTable();
     respuesta.forEach(registros => {
       tableDiscosActivos.fnAddData([
         registros.Codigo,
         registros.Restantes,
         registros.Colorimetro,
         registros.Marca,
         registros.Tamaño,
         `<div class="row">
            <div class="col-12 col-lg-12">
              <input type="number" value="0" id="inpNoDisco${registros.Codigo}" class="form-control" style="text-align:center" onkeypress="return onlynumber(event)" min="0"></input>
            </div>
          </div>`,
         `<div class="row">
            <div class="col-12 col-lg-6 offset-lg-3">
              <button class="btnAsignar" onclick="asignarDiscoOrden(${registros.Codigo})"><i class="fa fa-arrow-right"></i></button>
            </div>
          </div>`
       ]);
     });
  }
}

async function asignarDiscoOrden (NoDisco) {
  let CantidadPiezas = await Number($("#inpNoDisco"+NoDisco).val());
  let datos = await {
    op: "asignarDiscoOrdenDentLab",
    Orden: globalNoOrden,
    Cantidad: CantidadPiezas,
    NoDisco: NoDisco
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/DentLab/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      await getDiscosActivosDentLab();
      await getDiscosAsignadosOrdenDentLab();
      await getDiscosAsignadosOrden();
      // await getDiscosUtilizadosOrden();
      toastr.success("Disco Asignado");
    } else {
      toastr.warning(respuesta);
    }
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

async function getMarcasDentLab() {
  let datos = await {
    op: "getMarcasDentLab"
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
    respuesta.forEach( registros => {
      $("#slctMarca").append(`
        <option value="${registros.idMarcas}">${registros.Marca}</option>
        `);
    });
  }
}

async function getColorimetroDentLab() {
  let datos = await {
    op: "getColorimetroDentLab"
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
    respuesta.forEach( registros => {
      $("#slctColores").append(`
        <option value="${registros.Tipos_Colorimetros_Color_Id}">${registros.Colorimetro}</option>
        `);
    });
  }
}

// async function getDiscosUtilizadosOrden(){
//   let datos = {
//     op: "getDiscosUtilizadosOrden",
//     Orden: globalNoOrden
//   }
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/DentLab/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log(respuesta);
//     let contHTMLDiscosU = "";
//     if (respuesta.length > 0) {
//       respuesta.forEach( datos => {
//          contHTMLDiscosU += `
//            <div class='col-6 col-lg-6' style='text-align:center'>
//               <h6><b>No Disco:</b> ${datos.Disco}</h6>
//            </div>
//            <div class='col-6 col-lg-6' style='text-align:center'>
//               <h6><b>Piezas:</b> ${datos.Piezas}</h6>
//            </div>
//           `;
//       });
//     } else {
//       contHTMLDiscosU = `<div class='col-12'>
//         <h6><b>Sin discos utilizados</b></h6>
//       </div>`;
//     }
//     $("#contDiscosUtilizados").html(contHTMLDiscosU);
//   }
// }
