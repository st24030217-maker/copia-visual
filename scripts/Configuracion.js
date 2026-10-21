$(document).ready(function () {
  divIncludeOrgCiudad();
});

let tableMSvc;
// let tableMActive = new Tabulator("#tCityActive",{
//    layout:"fitColumns",
//    placeholder:"Drag Rows Here",
//    data:[],
//    columns:[
//        {title:"Ciudad", field:"Ciudad"},
//        {title: "Estado", field: "Estado"},
//    ],
// });
listCityServices();
loadConfiguracion();

async function listCityServices(){
  let dataSend = {
    op: "listCityServices"
  };
  const ajaxResponse = await pAjaxAsync(url_m_Config, dataSend, 0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Data;
    console.log(dataResponse);
    tableMSvc = new Tabulator("#tCityDisp", {
      height:"70vh",
      data: dataResponse,
      layout: "fitColumns",
      groupStartOpen:false,
      // selectable:true,
      groupBy:"Estado",
      columns:[
        {title: "Activo", field: "CiudadActiva", width: 130, formatter:function(cell, formatterParams){
          let val = cell.getValue();
          let ch = "";
          if (val == 1) {
            ch = "checked";
          }
          return `<input type="checkbox" onclick="activeOrDisableCity('${cell.getData().CityId}')" ${ch}>`;
        }},
        {title: "Ciudad", field: "Ciudad"},
      ],
    });
    // tableMSvc.on("rowSelected", function(row){
    //   let value = row.getData();
    //   console.log(value.CityId);
    // });
    // tableMSvc.on("rowDeselected", function(row){
    //   let value = row.getData();
    //   console.log(value.CityId);
    // });
  }
}

async function activeOrDisableCity(val){
  const dataSend = {
    op: "activeOrDisableCity",
    oc: val
  };
  const ajaxResponse = await pAjaxAsync(url_m_Config,dataSend,1);
}

function abrirModalIva(IdIva, valor) {
  $("#op").val("updateIva");
  $("#txtIdIva").val(IdIva);
  $("#txtIva").val(valor);
  $("#UpdateIvaModal").modal("toggle");
}

function divIncludeOrgCiudad(IdEstadoOrg) {
  $("#divIncludeOrgCiudad").load(
    `include_Organizacion_Ciudad.php?IdEstadoOrg=${IdEstadoOrg}`
  );
}

function HorarioOrgEstadosfunction(IdHorarioConf) {
  if (IdHorarioConf != "") {
    // alert("Actualizar");
    $("#TituloModalH").text("Actualizar Horario");
    $("#txtIdConfH").val(IdHorarioConf);
    $("#btnguardarConf").text("Actualizar Horario");
    $("#op").val("updateHorarioOrganiozacionEstado");
    $.ajax({
      type: "POST",
      url: "Backend/Configuracion/App.php",
      data:
        "op=getDetalleHorarioOrganiozacionEstado" +
        "&IdHorarioConf=" +
        IdHorarioConf,
      success: function (response) {
        response = JSON.parse(response.trim());
        $("#slectEstadoOrg").val(response.Organizacion_Estados_Pais_Id);
        $("#txtValor").val(response.Valor);
        $("#slctOrgCiudad").val(response.Organizacion_Ciudades_Id);
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // alert("Agregar");
    $("#op").val("addHorarioOrganiozacionEstado");
    $("#TituloModalH").text("Agregar Horario");
    $("#txtIdConfH").val("");
    $("#btnguardarConf").text("Agregar");
    $("#slectEstadoOrg").val("");
    $("#slctOrgCiudad").val("");
    $("#txtValor").val("");
  }
  $("#ConfHorarioEst").modal("toggle");
}
$("#btnguardarConf").click(function (event) {
  if (document.getElementById("formInsertaHorario").checkValidity()) {
    event.preventDefault();
    var form = $("#formInsertaHorario")[0];
    var data = new FormData(form);
    $.ajax({
      type: "POST",
      url: "Backend/Configuracion/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {
        if (data == "1") {
          Alerta("success", "Actualizado Correctamente");
          setTimeout(function () {
            location.reload();
          }, 1500);
        } else {
          Alerta("error", "No se Actualizado Correctamente");
          setTimeout(function () {
            location.reload();
          }, 1500);
        }
        $("#ConfHorarioEst").modal("hide");
      },
      error: function (e) {
        alert(e.responseText);
      },
    }); //Ajax
  } else {
    Alerta("info", "Llene los campos Por Favor");
  }
});

function updateIva() {
  Swal.fire({
    title:
      "Si prosigue se modificaran todos los precios de los productos y servicios, ¿Desea continuar?",
    showDenyButton: true,
    confirmButtonText: "Continuar",
    denyButtonText: "Salir",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if (document.getElementById("formInsertaIva").checkValidity()) {
        event.preventDefault();
        var form = $("#formInsertaIva")[0];
        var data = new FormData(form);
        $.ajax({
          type: "POST",
          url: "Backend/Configuracion/App.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
          success: function (data) {
            if (data == "1") {
              Alerta("success", "Actualizado Correctamente");
              setTimeout(function () {
                // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                location.reload();
              }, 1500);
            } else {
              Alerta("error", "No se Actualizado Correctamente");
              setTimeout(function () {
                // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                location.reload();
              }, 1500);
            }
            $("#ModalUpdate").modal("hide");
          },
          error: function (e) {
            alert(e.responseText);
          },
        }); //Ajax
      } else {
        Alerta("info", "Llene los campos Por Favor");
      }
    } else if (result.isDenied) {
      window.location.reload();
      return false;
    }
  });
}

async function loadConfiguracion(){
  getConfDent();
}
async function getConfDent() {
  let datos = await {
    op: "getConfDent",
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Configuracion/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#txtCantidadPorDisco").val(respuesta[0]["PromedioCantidadPorDisco"]);
    $("#txtCantMinPaquetes").val(respuesta[0]["CantMinListVendPaquetes"]);
  }
}

async function updatePromedioDisco() {
  alertify.confirm(
    "Confirmación de acción.",
    "¿Desea confirmar los datos ingresados?",
    async function () {
      let nuevoValor = await Number($("#txtCantidadPorDisco").val());
      if (nuevoValor == "0" || nuevoValor == 0) {
        alertify.error("Por favor ingrese un valor.");
      } else {
        let respuesta = "";
        let datos = await {
          op: "updatePromedioDisco",
          PromedioCantidadPorDisco: nuevoValor,
        };
        try {
          respuesta = await $.ajax({
            type: "post",
            url: "Backend/Configuracion/App.php",
            data: datos,
          });
        } catch (error) {
          console.log(error);
        } finally {
          if (respuesta == "1") {
            alertify.success("Datos Actualizados");
          } else {
            alertify.error(respuesta);
          }
        }
      }
    },
    function () {
      alertify.error("Cancelado");
    }
  );
}

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

setInterval(function () {
  getMensajeVistoLineaEtica();
  getMsgSolicitudesVacacionesRecibidas();
  getMsgSolicitudesVacacionesRecibidasFinal();
}, 60000);

$(document).on("click","#btnAceptaCantMinPaquetes",function(){
  alertify.confirm(
    "Confirmación de acción.",
    "¿Desea confirmar los datos ingresados?",
    async function () {
      let val = Number($("#txtCantMinPaquetes").val());
      if (val == "0" || val == 0) {
        alertify.error("Por favor ingrese un valor.");
      } else {
        let datos = {
          op: "updateMinPiezasPaquetesListVend",
          CantMinListVendPaquetes: val
        };
        let respuesta;
        try {
          respuesta = await $.ajax({
            type: "post",
            url: "Backend/Configuracion/App.php",
            data: datos,
          });
        } catch (error) {
          console.log(error);
        } finally {
          if (respuesta == "1") {
            alertify.success("Datos Actualizados");
          } else {
            alertify.error(respuesta);
          }
        }
      }
    },
    function () {
      alertify.error("Cancelado");
    }
  );
});
