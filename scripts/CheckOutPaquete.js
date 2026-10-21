const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const paqueteB64 = urlParams.get('IdPaquete');
const doctor = urlParams.get('Doctor');

let MetodoPagoGlobal = "";
getMetodoPagoPaquete();
getIvaJson();
function getMetodoPagoPaquete() {
  $("#MetodoPago").html("");
  datos = {
    op: "getMetodoPagoPaquete"
  }
  $.ajax({
    type: "post",
    url: "Backend/Productos_Paquetes/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      $("#MetodoPago").append(`
        <option value="0"> Metodos de Pago </option>
        `);
      for (var i = 0; i < response.length; i++) {
        $("#MetodoPago").append(`
          <option value="${response[i]["id_Metodos_Pago"]}">${response[i]["Metodo"]}</option>
          `);
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

let globalIva = "";

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

async function changeMetodoPago(metodo){
  MetodoPagoGlobal = metodo;
  tkenGlobal = "";
  let MontoTotal = "";
  let CIVa = Number(globalIva);
  let CostoPaquete = Number($("#CostoPaquete").val());
  let CostoIVA = (CostoPaquete * (CIVa / 100));
  let IVAFormato = CostoIVA.toLocaleString("en");
   if (metodo == "3") {
     $("#PrecioPersonalizado").val(CostoPaquete);
     await cantidadIngresadafunction();
    $("#formulariotrasferencia").fadeIn();
    $("#formularioRecoleccionEf").fadeOut();
  }
  else if (metodo == "4") {
    $("#PrecioPersonalizado").val(CostoPaquete);
    await cantidadIngresadafunction();
    $("#formulariotrasferencia").fadeOut();
    $("#formularioRecoleccionEf").fadeIn();
  }else {
    $("#formulariotrasferencia").fadeOut();
    $("#formularioRecoleccionEf").fadeOut();
  }
}

async function cantidadIngresadafunction () {
  let CantidadIngresada = Number($("#PrecioPersonalizado").val());
  //$("#cantidadIngresada").html(`$ ${CantidadIngresada}`);
  let CantIngresada = CantidadIngresada.toFixed(2);
  let TotalPagarConIva = (CantidadIngresada + (CantidadIngresada * (globalIva / 100))).toFixed(2);
  let TotalIva = (CantidadIngresada * (globalIva / 100)).toFixed(2);
  if (MetodoPagoGlobal == "2" || MetodoPagoGlobal == "3") {
    $("#textTotal").html(`$ ${TotalPagarConIva}`);
    $("#textIva").html(`$ ${TotalIva}`);
  } else {
    $("#textTotal").html(`$ ${CantIngresada}`);
    $("#textIva").html("$ 0.00");
  }
}


// Definimos la variable de control fuera de la función para rastrear el estado
let procesandoPago = false;

function realizaPago() {
    // 1. Validamos si ya hay un proceso en curso
    if (procesandoPago) return;

    const $boton = $("#RegistrarPago");
    const Pago = Number($("#PrecioPersonalizado").val());
    const MetodoPago = Number($("#MetodoPago").val());

    // 2. Bloqueamos la entrada inmediatamente
    procesandoPago = true;
    $boton.prop("disabled", true).text("Procesando..."); // Feedback visual

    $.blockUI({
        message: '<h1>Espere por favor...</h1>',
        centerY: 0,
        css: { top: '10px', left: '', right: '10px' }
    });

    const datos = {
        op: "realizaPagoPaquete",
        Paquete: paqueteB64,
        Pago: Pago,
        MetodoPago: MetodoPago,
        doctor: doctor
    };

    $.ajax({
        type: "post",
        url: "Backend/Productos_Paquetes/App.php",
        data: datos,
        success: function (response) {
            if (response == "1") {
                Alerta("success", "Pago Realizado");
                setTimeout(() => {
                    window.location.href = `index.php`;
                }, 1500);
            } else {
                // Si falla, liberamos el botón para que el usuario pueda intentar corregir
                Alerta("info", response == "0" ? "Algo salio mal, intente de nuevo" : response);
                resetEstadoPago();
            }
        },
        error: function () {
            Alerta("error", "Error de conexión con el servidor");
            resetEstadoPago();
        }
    });
}

// Función auxiliar para desbloquear el botón si algo falla
function resetEstadoPago() {
    procesandoPago = false;
    $("#RegistrarPago").prop("disabled", false).text("Registrar Pago");
    $.unblockUI();
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
