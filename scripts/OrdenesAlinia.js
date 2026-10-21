
$(document).ready(function(){
  includedivArchivosRequ();
	$('.js-example-basic-single').select2();
});
asignaDetalleOrdenAlinia();
getIvaJson();
function abrirMmodalNewPaciente(){
	var IdDoctor = $("#idDoctor").val();
	$("#IdDoct").val(IdDoctor);
	$("#ModalUsuarios").modal("toggle");
}
function Doctorfunction(){
			if (document.getElementById("formInsertaPaciente").checkValidity()){
				event.preventDefault();
				var form = $("#formInsertaPaciente")[0];
				var data = new FormData(form);
				inicioProgreso();

				$.ajax({
					type:"POST",
					url:"Backend/Pacientes/App.php",
					data:data,
					processData:false,
					contentType:false,
					cache: false,
					timeout:600000,
					success:function(data){
						if (data=="1") {
						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							 finProgreso();
							 location.reload();
						 }, 1500);
						}
						else{
							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								location.reload();
							}, 1500);
						}
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}else {
				Alerta("info","Faltan campos por llenar");
			}
		}
function generarOrdenAlinia(){
  let CantidadRequisitos = $("#cantidadReq").val();
  let CantidadRequisitosOrden = $("#cantidadArchivosOrd").val();
  let IdOrden = $("#idOrdenTemp").val();
  let IdPACIENTE = $("#slctPacientes").val();
  let IdVendedor = $("#IdVendedor").val();
	let Archivo1 = $("#IdReq1").val();
	let Archivo3 = $("#IdReq3").val();
	let IdMetodoPago = $("#slctMetodoPago").val();
  let CantidadPiezas = Number($("#cantidadPiezas").val());

  if (IdPACIENTE === null ) {
    Alerta("info","Seleccione un paciente");
    return false;
  }
  // if (CantidadRequisitosOrden < CantidadRequisitos) {
  //   Alerta("info","Faltan archivos por subir");
  //   return false;
  // }
	if (IdMetodoPago === null) {
		Alerta("info","Seleccione un metodo de pago");
		return false;
	}
	inicioProgreso();
  $.ajax({
    type: "POST",
    url: "Backend/Ordenes/App.php",
    data: "op=generarOrdenAlinia"+"&IdOrden="+IdOrden+"&IdVendedor="+IdVendedor+"&IdMetodoPago="+IdMetodoPago+"&CantidadPiezas="+CantidadPiezas,
    success: function(data){
      if (data == "1") {
        Alerta('success',"Orden Realizada");
        setTimeout(function () {
					Alerta("success","Orden realizada");
					finProgreso();
          window.location.href='Vendedor.php';
          // window.location.href='Successful.php';
        }, 1200);
      }else {
        Alerta("error",data);
        setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
          location.reload();
        }, 1500);
      }
      // finProgreso();
    },
    error:function(e){
      alert(e.responseText);
    }
  });
}

function insertaPacientefunction(IdPaciente){
  var idOrdenTem = $("#idOrdenTemp").val();
    $.ajax({
      type:"POST",
      url:"Backend/Ordenes/App.php",
      data:"op=ingresarPacienteOrden"+
      "&IdPaciente="+IdPaciente+"&idOrdenTem="+idOrdenTem,
      success: function(data){
        if(data!="0"){
          setTimeout(function () {
            location.reload();
          }, 1000);
        }else{
          Alerta("error","No se Realizo Correctamente");
          setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
            location.reload();
          }, 1500);
        }
      },
      error:function(e){
        alert(e.responseText);
      }
    });
}

function AbrirFile(){
  $("#inpfiles").click();
}

function AbrirArchivoReq(idReq){
  $("#inpArchivosOrdRequ"+idReq).click();
}

function SubirArchivoOrden(){
  if (document.getElementById("formSubirArchivo").checkValidity()){
    event.preventDefault();
    var form = $("#formSubirArchivo")[0];
    var data = new FormData(form);

    $.ajax({
      type:"POST",
      url:"Backend/Ordenes/App.php",
      data:data,
      processData:false,
      contentType:false,
      cache: false,
      timeout:600000,
      success:function(data){
        if (data=="1") {
         setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
           location.reload();
         }, 1500);
        }
        else{
          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
            location.reload();
          }, 1500);
        }
      },
      error:function(e){
        alert(e.responseText);
      }
    });
  }
}

function addArchivoRequisitosOT(idReq){
  if (document.getElementById("formInsertaArchivo"+idReq).checkValidity()){
    event.preventDefault();
		$("#IdReq"+idReq).val(idReq);
    var form = $("#formInsertaArchivo"+idReq)[0];
    var data = new FormData(form);
		inicioProgreso();
    $.ajax({
      type:"POST",
      url:"Backend/Ordenes/App.php",
      data:data,
      processData:false,
      contentType:false,
      cache: false,
      timeout:600000,
      success:function(data){
        if (data=="1") {
         Alerta("success","Actualizado Correctamente");
         setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
           includedivArchivosRequ();
					 finProgreso();

         }, 1500);
        }
        else{
          Alerta("error","No se Actualizo Correctamente");
          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
            includedivArchivosRequ();
          }, 1500);
        }
      },
      error:function(e){
        alert(e.responseText);
      }
    });
  }
  else {
    Alerta("info","Faltan Datos por llenar");
  }
}

function includedivArchivosRequ(){
  var idOrden = $("#idOrdenTemp").val();
  $("#divincludeArchivosRequ").load(`includeArchivosRequisitos.php?idOrden=${idOrden}`);
}

function inicioProgreso(){
	$("#staticBackdrop").modal("toggle");
}
function finProgreso(){
	$("#staticBackdrop").modal("hide");
}

function insertaDatosOrdenTempfunction(){
  if (document.getElementById("FormUpdateOrdenAlinia").checkValidity()){
  	event.preventDefault();
  	var form = $("#FormUpdateOrdenAlinia")[0];
  	var data = new FormData(form);

  	$.ajax({
  		type:"POST",
  		url:"Backend/Ordenes/App.php",
  		data:data,
  		processData:false,
  		contentType:false,
  		cache: false,
  		timeout:600000,
  		success:function(data){
  			if (data=="1") {

  			}
  			else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No Guardado',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
  					location.reload();
  				}, 1500);
  			}
  		},
  		error:function(e){
  			alert(e.responseText);
  		}
  	});
  }else {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Faltan campos obligatorios por llenar',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

let globalCostoProd = "0";
let globalIva = "";
async function getDescripcionProductoAlinia(){
  let ordenID = await Number($("#idOrdenTemp").val());
  let CantidadPiezas = await Number($("#cantidadPiezas").val());
  let datos = await {
    op : "getDescripcionProductoAlinia",
    Ordenes_trabajo_id: ordenID
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/ProductosApp/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    return respuesta;
  }
}

async function asignaDetalleOrdenAlinia () {
  let respuesta = await getDescripcionProductoAlinia();
  let costoProd = respuesta[0]["Precio_Base"];
  $("#CostoPorUnidad").val(respuesta[0]["Precio_Base"]);
  globalCostoProd = costoProd;
  let costoProdFormato = costoProd.toLocaleString("en",{
    style: "currency",
	  currency: "MXN"
  });
  $("#precioTotal").html(`$${costoProdFormato}`);
}

async function updateCostoTotal (val) {
  let TipoPago = $("#slctMetodoPago").val();
  let costoProducto = $("#CostoPorUnidad").val();

  if (TipoPago == "3") {
    MontoTotal = ((costoProducto * val)+(costoProducto * val*(globalIva / 100)));
    let costoProdFormato = MontoTotal.toLocaleString("en");
    $("#precioTotal").html(`$ ${costoProdFormato}`);
  }else {
    MontoTotal = (costoProducto * val);
    let costoProdFormato = MontoTotal.toLocaleString("en");
    $("#precioTotal").html(`$ ${costoProdFormato}`);
  }

}

async function getIvaJson() {
  let datos = await {
    op: "getIvaJson"
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Configuracion/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    globalIva = respuesta[0]["Valor"];
  }
}

async function MetodosPagoOn (metodo) {
  let costoProducto = $("#CostoPorUnidad").val();
  let CantidadPiezas = $("#cantidadPiezas").val();
  let MontoTotal = "";
  if (metodo == "3"){
    MontoTotal = ((costoProducto * CantidadPiezas)+(costoProducto * CantidadPiezas*(globalIva / 100)));
    let costoProdFormato = MontoTotal.toLocaleString("en");
    $("#precioTotal").html(`$ ${costoProdFormato}`);
  }else {
    MontoTotal = (costoProducto * CantidadPiezas);
    let costoProdFormato = MontoTotal.toLocaleString("en");
    $("#precioTotal").html(`$ ${costoProdFormato}`);
  }
}

function onlytextInp(event){
    var key = event.key;
    if (!isNaN(parseInt(key))) {
        event.preventDefault();
    }
}
