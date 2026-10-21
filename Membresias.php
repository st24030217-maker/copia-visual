<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo">LISTADO DE MEMBRESIAS</a> </li>
          </ol>
         </section>
         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button type="button" class="btn btn-outline-success" onclick="AbrirModal('','','');">
                 <i class="fa fa-plus"></i>
                 Agregar membresia</button>
             </div>
           </div>
          </div>
          <br>
          <div class="contenedores">
            <div class="table-responsive">
              <table class="table table-hover" id="tabla">
                <thead>
                  <th>Tipo</th>
                  <th>Estatus</th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>

               <!-- modal -->
        			 <div class="modal fade" id="ModalMembresias" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        			 	<div class="modal-dialog ">
        			 		<div class="modal-content ">
        			 			<div class="modal-header text-center">
        			 				<h5 class="modal-title" id='TituloModal'></h5>
        			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        			 					<span aria-hidden="true">&times;</span>
        			 				</button>
        			 			</div>
        			 			<div class="modal-body ">
        			 				<form id="formInserta" method="post" action="Backend/Usuarios/App.php">
        			 					<div class="form-group">
        			 						<input type="text" class="form-control" id="op" name="op"  style="display:none;">
        			 						<input type="text" class="form-control" id="idMembresia" name="idMembresia" style="display:none;" >
        			 						<input type="text" class="form-control" id="status" name="status" style="display:none;" >
                          <div class="row">
                            <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
                              <h6>Nombre</h6>
                              <input type="text" class="form-control" name="Nombre" id="Nombre" placeholder="Descripción del Producto/Servicio" value="" style="text-align:center;">
                            </div>
                          </div>
													<br>
        			 					</div>
                      </form>
        			 			</div>
        			 			<div class="modal-footer">
        			 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        			 				<button type="button" class="btn btn-outline-success" id="btnguardar" onclick="Guardar()">Guardar</button>
        			 			</div>
        			 		</div>
        			 	</div>
        			 </div>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      $(document).ready(function(){
        GetListado();
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

      function GetListado(){
        var datasend={
          op:"getListadoMembresias"
        };
        $.ajax({
          type:"POST",
          url:"Backend/Clientes/App.php",
          data:datasend,
          success:function(response){
            response = JSON.parse(response.trim());
            tabla.fnClearTable();
            for (var i = 0; i < response.length; i++) {
              tabla.fnAddData([
                response[i]['Tipo'],
                response[i]['Estatus'] != 0 ? "Activa":  "Inactiva",
                `<button class='btn btnIconoEdit' title='Editar' style="color:white;font-weight:bold" onclick="Activa('${response[i]["idMembresias"]}','${response[i]["Tipo"]}','${response[i]["Estatus"]}');">
                  <i class="fa fa-pencil fa-1x"></i>
                </button>`,
                `<button class='btn btnIconoDrop' title='Baja' style="color:white;font-weight:bold" onclick="EliminarMem('${response[i]["idMembresias"]}')">
                  <i class="fa fa-times fa-1x"></i>
                </button>`
                ]);
            }
          },
          error : function(e){
            toastr.error(e.responseText, "ERROR 500");
          }
        });
      }
      function Activa(id_mem,Nombre,estatus){
        if (id_mem != "") {
          if (estatus=="0") {
            const inputOptions = {
              1: 'Activar',
              0: 'Mantener desactivada'
            };
            Swal.fire({
              title: 'La membresia esta desactivada, ¿Desea reactivarla?',
              input: 'radio',
              inputOptions: inputOptions,
              inputValidator: (value) => {
                if (value == "1") {
                  $("#status").val(value);
                  AbrirModal(id_mem,Nombre);
                }
              }
            });
          }
          else {
            AbrirModal(id_mem,Nombre);
          }
        }
      }

      function AbrirModal(id_mem,Nombre){
        if (id_mem != '') {
          $("#op").val("UpdateMembresia");
          $("#idMembresia").val(id_mem);
          $("#Nombre").val(Nombre);
          $("#TituloModal").text("Actualizar membresia");
        }else {
          $("#op").val("InsertMembresiaNueva");
          $("#idMembresia").val("");
          $("#Nombre").val("");
          $("#TituloModal").text("Agregar membresia");
        }
        $("#ModalMembresias").modal('toggle');
      }

      function Guardar(){
        var opcion = $("#op").val();
        var idMembresia = $("#idMembresia").val();
        var nom = $("#Nombre").val();
        var sta = $("#status").val();
        var datasend = "";
        if (opcion == "UpdateMembresia") {
          datasend = {
            op:opcion,
            tipo:nom,
            id_membresia:idMembresia,
            status:sta
          };
        }else {
          datasend = {
            op:opcion,
            tipo:nom
          };
        }
        $("#btnguardar").prop("disabled",true);
        $.ajax({
          type:"POST",
          url:"Backend/Clientes/App.php",
          data:datasend,
          success:function(data){
            if (data == "1") {
              Alerta("success","Operacion exitosa");
              setTimeout(function () {
                location.reload();
              }, 1500);
            }else {
              toastr.warning("Reintentalo de nuevo","Algo salio mal...");
              setTimeout(function () {
                location.reload();
              }, 1500);
            }
            $("#btnguardar").prop("disabled",false);
            $("#ModalMembresias").modal('hide');
          },error:function(e){
            toastr.error(e.responseText,"ERROR 500");
            $("#btnguardar").prop("disabled",false);
            $("#ModalMembresias").modal('hide');
          }
        });
      }

      function EliminarMem(id_mem){
        var datasend = {
          op:"UpdateStatusMembresia",
          id_membresia:id_mem
        };
        $.ajax({
          type:"POST",
          url:"Backend/Clientes/App.php",
          data:datasend,
          success:function(data){
            if (data == "1") {
              toastr.success("Membresia desactivada","Exito");
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
    </script>
  </body>
</html>
