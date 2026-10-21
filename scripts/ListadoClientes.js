$(document).ready(function(){
  getClientes();
  getMembresias();
});

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
});

function getMembresias(){
    $("#slcMembresias").html("");
  var datasend = {
    op:"getMembresias"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Clientes/App.php",
    data:datasend,
    success:function(response){
      response = JSON.parse(response.trim());
      $("#slcMembresias").append(`<option value=""> -- SELECCIONE UNA MEMBRESIA --</option>`);
      for (var i = 0; i < response.length; i++) {
        $("#slcMembresias").append(`<option value="${response[i]["idMembresias"]}">${response[i]["Tipo"].toUpperCase()}</option>`);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

function getClientes(){
  var datasent={
    op:"getClientes"
  };
  $.ajax({
    type:"POST",
    url:"Backend/Clientes/App.php",
    data:datasent,
    success:function(response){
      response = JSON.parse(response.trim());
      tabla.fnClearTable();
      for (var i = 0; i < response.length; i++) {
        tabla.fnAddData([
          response[i]['Nombre'],
          response[i]['Correo'],
          response[i]['Telefono'],
          response[i]['Tipo'] == "" ? "No tiene membresia": response[i]['Tipo'] == null ? "No se asigno membresia":response[i]['Tipo'],
          response[i]['status'] != 0 ? "Activo":  "Inactivo",
          `<button class='btn btnIconoEdit' title='Editar' style="color:white;font-weight:bold" onclick="Activar('${response[i]["idCliente"]}','${response[i]["Nombres"]}',
            '${response[i]["ApellidoP"]}','${response[i]["ApellidoM"]}','${response[i]["Correo"]}','${response[i]["Telefono"]}','${response[i]["idMembresias"]}',
            '${response[i]["idClienteMembresia"]}','${response[i]["status"]}');">
            <i class="fa fa-pencil fa-1x"></i>
          </button>`,
          `<button class='btn btnIconoDrop' title='Baja' style="color:white;font-weight:bold" onclick="EliminarCliente('${response[i]["idCliente"]}')">
            <i class="fa fa-user-times fa-1x"></i>
          </button>`
          ]);
      }
    },
    error : function(e){
      toastr.error(e.responseText, "ERROR 500");
    }
  });
}

function AbrirModal(id_cliente,nombre,aP,aM,correo,cel,mem,id,value){
  if (id_cliente != '') {
    $("#TituloModal").text("Actualizar cliente");
    $("#op").val("UpdateCliente");
    $("#IdCliente").val(id_cliente);
    $("#Nombre").val(nombre);
    $("#ApellidoP").val(aP);
    $("#ApellidoM").val(aM);
    $("#Correo").val(correo);
    $("#Telefono").val(cel);
    $("#IdClienteMembresia").val(id);
    $("#estatus").val(value);
    if (mem != '') {
      $("#slcMembresias").val(mem);
      $("#slcMembresias").prop("selected","selected").change();
    }else {
      $("#slcMembresias").val('');
      $("#slcMembresias").prop("selected","selected").change();
    }
    document.getElementById('divMembresia').style.display = 'block';
  }
  else {
    $("#TituloModal").text("Registrar cliente");
    $("#op").val("InsertCliente");
    $("#IdCliente").val("");
    $("#Nombre").val("");
    $("#ApellidoP").val("");
    $("#ApellidoM").val("");
    $("#Correo").val("");
    $("#Telefono").val("");
    $("#IdClienteMembresia").val("");
    $("#estatus").val("");
    document.getElementById('divMembresia').style.display = 'none';
  }
  $("#ModalCliente").modal('toggle');
}

function EliminarCliente(id_cliente){
  var datasend = {
    op:"UpdateStatusCliente",
    id_cliente:id_cliente
  };
  $.ajax({
    type:"POST",
    url:"Backend/Clientes/App.php",
    data:datasend,
    success:function(data){
      if (data == "1") {
        toastr.success("Usuario desactivado","Exito");
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
      else {
        toastr.warning("Vuelve a intentarlo","Algo salio mal...");
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  });
}

$("#btnguardar").click(function(event){
  if (document.getElementById("formInserta").checkValidity()) {
    event.preventDefault();
    var form =$("#formInserta")[0];
    var data =new FormData(form);
    $("#btnGuardar").prop("disabled",true);
    $.ajax({
      type:"POST",
      url:"Backend/Clientes/App.php",
      data:data,
      processData:false,
      contentType:false,
      cache:false,
      timeout:600000,
      success:function(data){
        if (data == "1") {
          var opcion= $("#op").val();
          if (opcion == "InsertCliente") {
            InsertMembresia();
          }
          else {
            Alerta("success","Se ha actualizado el cliente");
            setTimeout(function () {
              location.reload();
            }, 1500);
          }
        }
        else {
          Alerta("warning","¡Algo salio mal, reintentalo!");
        }
        $("#ModalCliente").modal('hide');
      },error:function(e){
        $("#btnGuardar").prop("disabled",false);
        $("#ModalCliente").modal('hide');
        toastr.error(e.responseText,"ERROR 500");
      }
    });
  }
});

function InsertMembresia(){
  Swal.fire({
    icon: 'question',
    title: '¿Se agregara una membresia al cliente?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Sí',
    confirmButtonColor: '#6EB146',
    denyButtonText: `No`,
    denyButtonColor: '#ADAFAC',
  }).then((result) => {
    if (result.isConfirmed) {
      var arr=[];
      $.ajax({
        type:"POST",
        url:"Backend/Clientes/App.php",
        data:"op=getMembresias",
        success:function(response){
          response = JSON.parse(response.trim());
          for (var i = 0; i < response.length; i++) {
            arr.push({id: response[i]["idMembresias"],tipo: response[i]["Tipo"]});
          }
          var option={};
          $.map(arr,function(o){
            option[o.id]=o.tipo;
          });
          Swal.fire({
            title: 'Selecciona una membresia',
            input: 'select',
            inputOptions: option,
            inputPlaceholder: '-- Membresias disponibles --',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            confirmButtonColor: '#6EB146',
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value != '') {
                  Swal.fire({
                    title: 'Digita el codigo del reverso de la tarjeta',
                    input: 'text',
                    showCancelButton: true,
                    inputValidator: (codigo) => {
                      if (codigo != '') {
                        $.ajax({
                          type:"POST",
                          url:"Backend/Clientes/App.php",
                          data:"op=InsertMembresia&idMembresia="+value+"&codigo="+codigo,
                          success:function(data){
                            if (data == "1") {
                              Alerta("success","Cliente guardado exitosamente");
                              setTimeout(function () {
                                location.reload();
                              }, 1500);
                            }else {
                              toastr.warning("reintenta de nuevo","Algo salio mal...");
                            }
                          },error:function(e){
                            toastr.error(e.responseText,"ERROR 500");
                          }
                        });
                      }
                    }
                  });
                } else {
                  resolve('Selecciona una membresia para poder guardar el proceso');
                }
              })
            }
          });
        }
      });
    } else if (result.isDenied) {
      Alerta("success","Cliente sin membresia guardado exitosamente");
      setTimeout(function () {
        location.reload();
      }, 1500);
    }
  })
}

function Activar(id_cliente,nombre,aP,aM,correo,cel,mem,id,estatus){
  if (id_cliente != "") {
    if (estatus=="0") {
      const inputOptions = {
        1: 'Activarlo',
        0: 'Mantener desactivado'
      };
      Swal.fire({
        title: 'El cliente esta desactivado, ¿Desea reactivarlo?',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (value == "1") {
            AbrirModal(id_cliente,nombre,aP,aM,correo,cel,mem,id,value);
          }
        }
      });
    }
    else {
      AbrirModal(id_cliente,nombre,aP,aM,correo,cel,mem,id);
    }
  }
}
