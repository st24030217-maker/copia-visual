$(document).ready(function(){
  getEstados();
  getMunicipios();
  var opcion = $("#op").val();
  var idDato = $("#id_dato").val();
  if (opcion == "UpdateDatosFiscales") {
    var datasend = {
      op:"GetDatos",
      idDato:idDato
    };
    $.ajax({
      type:"POST",
      url:"Backend/Facturacion/App.php",
      data:datasend,
      success:function(response){
        response = JSON.parse(response.trim());
        if (response != null) {
          $("#nptRFC").val(response[0]["RFC"]);
          $("#nptRazon").val(response[0]["razonsocial"]);
          $("#nptCorreo").val(response[0]["correo"]);
          $("#nptCalle").val(response[0]["calle"]);
          $("#nptExterior").val(response[0]["noext"]);
          $("#nptInterior").val(response[0]["noint"]);
          $("#nptCodigo").val(response[0]["codigopostal"]);
          $("#nptColonia").val(response[0]["colonia"]);

          $("#slcEstado").val(response[0]["idestado"]);
          $("#slcEstado").prop("selected","selected").change();
          setTimeout(function () {
            $("#slcMunicipio").val(response[0]["idmunicipio"]);
            $("#slcMunicipio").prop("selected","selected").change();
          }, 500);
        }
        else {
          toastr.warning("No hay datos por rellenar","Advertencia");
        }
      },
      error:function(e){
        toastr.error(e.responseText,"ERROR 500");
      }
    });
  }
});

function getEstados(){
  var datasend={
    op:"getEstados"
  };
  $("#slcEstado").append(`<option value="">- SELECCIONE UN ESTADO -</option>`);
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slcEstado").append(`<option value="${response[i]['id']}">${response[i]['nombre'].toUpperCase()}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

$("#slcEstado").on('change',function(){
  getMunicipios();
});

function getMunicipios(){
  $("#slcMunicipio").html("");
  var idEstado = $("#slcEstado").val();
  var datasend = {
    op: "getMunicipios",
    idEstado:idEstado
  };
  $("#slcMunicipio").append(`<option value="">- SELECCIONE UN MUNICIPIO -</option>`);
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slcMunicipio").append(`<option value="${response[i]['id']}">${response[i]['nombre'].toUpperCase()}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

$("#btnGuardar").click(function(event){
  var form =$("#frmDatos")[0];
  var data =new FormData(form);
  if ($("#op").val() != "UpdateEstatusDato") {
    $("#btnGuardar").prop("disabled",true);
  }
  $.ajax({
    type:"POST",
    url:"Backend/Facturacion/App.php",
    data:data,
    processData:false,
    contentType:false,
    cache:false,
    timeout:600000,
    success:function(data){
      if (data == "1") {
        Alerta("success","¡Operación exítosa!");
        setTimeout(function () {
          window.location.href="ClientesFiscales.php";
        }, 1500);
      }
      else {
        toastr.warning("No se pudo completar la petición","Algo salio mal");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
})
