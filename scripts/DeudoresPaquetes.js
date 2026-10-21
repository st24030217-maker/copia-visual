getDoctoresDeudores();
getDetallePaquetesSinPagar();
CantPaquetesSinPagar();
CantidadPDoctoresSinPagar();
function getDoctoresDeudores () {
  datos = {
    op: "getDoctoresDeudores"
  }
  var TableDoctoresD = $('#TableDoctoresD').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY DOCTORES POR MOSTRAR",
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
      "url":"Backend/Productos_Paquetes/App.php",
      "data":datos,
      "success" : function(response){
        if (response!=null) {
          TableDoctoresD.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            TableDoctoresD.fnAddData([
              response[i]["Doctor"],
              `<button type='button' class='btn btn-outline-info btn-sm' onclick='getPaquetesDoctor("${response[i]["idDoctores"]}")'><i class="fa fa-pencil-square-o"></i></button>`
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
function getDetallePaquetesSinPagar () {
  datos = {
    op: "getDetallePaquetesSinPagar"
  }
  var TablePaquetesD = $('#TablePaquetesD').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY DOCTORES POR MOSTRAR",
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
      "url":"Backend/Productos_Paquetes/App.php",
      "data":datos,
      "success" : function(response){
        if (response!=null) {
          TablePaquetesD.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            TablePaquetesD.fnAddData([
              response[i]["Doctor"],
              response[i]["Paquete"],
              response[i]["Serie"],
              response[i]["Saldo"],
              `<button type='button' class='btn btn-outline-info btn-sm' onclick='getHistorialPagoPaquete("${response[i]["Doctores_paquete_id"]}")'><i class="fa fa-pencil-square-o"></i></button>`
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

function getPaquetesDoctor (valor) {
  datos = {
    op: "getPaquetesSinPagarDoctor",
    idDoctores: valor
  }
  let TablePaquetesDoctorSinP = $('#TablePaquetesDoctorSinP').dataTable({
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
    "bFilter": false,
    "bInfo":false,

    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Productos_Paquetes/App.php",
      "data":datos,
      "success" : function(response){
        if (response!=null) {
          $("#TituloModalPaquetesDoctor").html(`Paquetes del Doctor: ${response[0]["Doctor"]}`);
          $("#ModalPaquetesDoctor").modal("toggle");
          TablePaquetesDoctorSinP.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            TablePaquetesDoctorSinP.fnAddData([
              response[i]["Paquete"],
              response[i]["Serie"],
              response[i]["Saldo"],
              response[i]["Pagado"]
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

  function getHistorialPagoPaquete (valor) {
    datos = {
      op: "getHistorialPagoPaquete",
      Doctores_paquete_id: valor
    }
    let TablePagosPaquete = $('#TablePagosPaquete').dataTable({
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
      "bFilter": false,
      "bInfo":false,

      "destroy":true,
      "ajax":{
        "type":"POST",
        "url":"Backend/Productos_Paquetes/App.php",
        "data":datos,
        "success" : function(response){
          if (response!=null) {
            $("#TituloPagosPaquete").html(`Historial de Pagos: Paquete ${response[0]["Serie"]}`);
            $("#ModalPaquetesPagos").modal("toggle");
            TablePagosPaquete.fnClearTable();
            for (var i = 0; i < response.length; i++) {
              TablePagosPaquete.fnAddData([
                response[i]["Paquete"],
                response[i]["Serie"],
                response[i]["Pago"],
                response[i]["Activo"]
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

  function CantPaquetesSinPagar () {
    datos = {
      op: "CantPaquetesSinPagar"
    }
    $.ajax({
      type: "post",
      url: "Backend/Productos_Paquetes/App.php",
      data: datos,
      success:function(response){
        response = JSON.parse(response.trim());
        $("#CantidadPaquetesSinPagar").html(response[0]["PSinPagar"]);
      },error:function(e){
        alert(e.responseText);
      }
    });
  }

  function CantidadPDoctoresSinPagar () {
    datos = {
      op: "CantidadPDoctoresSinPagar"
    }
    $.ajax({
      type: "post",
      url: "Backend/Productos_Paquetes/App.php",
      data: datos,
      success:function(response){
        response = JSON.parse(response.trim());
        $("#CantidadPDoctoresSinPagar").html(response[0]["PSinPagar"]);
      },error:function(e){
        alert(e.responseText);
      }
    });
  }
