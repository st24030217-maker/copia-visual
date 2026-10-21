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
            <li> <a class="titulo"> Motivos de Cancelacion</a> </li>
            </ol>
          </section>
          <div class="contenedores">
            <div class="row">
              <div class=" col-12 col-lg-12 text-right">
                <button type="button" class="btn btn-outline-success float-right" onclick="MotivosCancelacionfuncion('')">
                  <a class="fa fa-plus circle ps-3 " aria-hidden="true"></a>Agregar</button>
                </div>
              </div>
            </div>
            <br>

						<div class="contenedores">
            <div class="Table-responsive">
              <table id="MotivosCancelacion" class="table text-center table-hover" style="color:black;">
                <thead>
                  <tr>
                    <th>Motivos de Cancelacion</th>
                    <th>Status</th>
                    <th>Actualizar</th>
                    <th>Actualizar Status</th>
                  </tr>
                </thead>

                <tbody>
            <?php
            require_once ("Backend/Configuracion/Configuracion.php");
            $Configuracion = new Configuracion();
            $MotivoCancelacion = $Configuracion->GetMotivos();
            for ($i=0; $i <sizeof($MotivoCancelacion); $i++){
              $idMotivosCancelacion = $MotivoCancelacion[$i]["idMotivosCancelacion"];
              $Motivo = $MotivoCancelacion[$i]["Motivo"];
              $Status = $MotivoCancelacion[$i]["Status"];

              if($Status=="1"){
                $varStatus = "Activo";
              }
              else{
                $varStatus = "Inactivo";
              }
              echo "
              <tr>
                <td>$Motivo</td>
                <td>$varStatus</td>
                <td class= 'text-center'>
                <a class='btn btnIconoEdit' onclick='MotivosCancelacionfuncion(\"$idMotivosCancelacion\");' data-toggle='tooltip' title='Actualizar'>
                <i class='fa fa-edit fa-2x'></i>
                </a>
                </td>

                <td class= 'text-center'>
                <a class= 'btn btnIconoChange' onclick='ActualizarStatusMotivo(\"$Status\",\"$idMotivosCancelacion\");' data-toggle='tooltip' title='Actualizar Status'>
                <i class= 'fa fa-refresh fa-2x'></i>
                </a>
                </td>
              </tr>
              ";

            }
             ?>
           </tbody>
         </table>
        </div>
			</div>
          <!--MODAL-->
          <div class="modal fade" id="ModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   			 	<div class="modal-dialog ">
   			 		<div class="modal-content ">
   			 			<div class="modal-header ">
   			 				<h5 class="modal-title" id='TituloModal'>Actualizar Motivos Cancelacion</h5>
   			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
   			 					<span aria-hidden="true">&times;</span>
   			 				</button>
   			 			</div>
   			 			<div class="modal-body">
   			 				<form id="formInserta" method="post" action="Backend/Configuracion/App.php">
   			 					<div class="form-group">
   			 						<input type="text" class="form-control" id="op" name="op" value="UpdateMotivos" style="display:none;">
   			 						<input type="text" class="form-control" id="nptidmot" name="nptidmot" style="display:none;">

										<!-- Aqui -->
   									<div class="row">
   										<div class="col-12 col-lg-12">
											<!-- Arriba -->
											<div class="text-center">
   											<label for="recipient-name" class="col-form-label ">Motivo de Cancelacion:</label>
   											<input type="text" class="form-control" id="nptmotivocanc" name="nptmotivocanc" required>
   										</div>
										</div>

   			 <!-- Aqui va el Segundo Label  -->

		 		 						</div>
									</div>
								</div>
								<br><br>
   			 			<div class="modal-footer">
   			 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
   			 				<button type="button" class="btn btn-primary" id="btnguardar">Guardar Cambios</button>
   			 			</div>
   			 		</form>
   			 </div>
       </div>
			</div>
		</div>
      <?php include("footer.php"); ?>
      </div>

			<!-- probablemnete orto div -->
		<?php include("scripts.php"); ?>
		<script type ="text/javascript">
		$(document).ready(function(){
			$('#MotivosCancelacion').DataTable({
				lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
				ordering: false,
				"bPaginate": false,
				responsive: false,
				"bInfo" : false,
				"oLanguage" : {
					"sSearch" : "Buscar"
				}
			});
		});
			function MotivosCancelacionfuncion(idMotivosCancelacion)
			{
				if (idMotivosCancelacion != ""){
				  // alert("Actualizar");
					$('#TituloModal').text("Actualizar Motivo de Cancelacion");
					$('#nptidmot').val(idMotivosCancelacion);
					$("#btnguardar").text("Actualizar");
					$("#op").val("UpdateMotivos");
					$.ajax({
						type:"POST",
						url:"Backend/Configuracion/App.php",
						data: "op=GetMotivoDetalle"+
						"&idMotivoActualiza="+idMotivosCancelacion,
						success:function(response){
							response=JSON.parse(response.trim());
							// var motivo = response[0]["Motivo"];
							$("#nptmotivocanc").val(response.Motivo);
							// $("#nptmotivocanc").val(response.Motivo);
						},
						error:function(e){
							alert(e.responseText);
						}
					});
				}else {
					// alert("Agregar");
					$("#TituloModal").text("Agregar Motivo de Cancelacion");
					$("#nptmotivocanc").val("");
					$("#btnguardar").text("Agregar");
					$("#nptidmot").val("");
					$("#op").val("AddMotivos");
				}
				$("#ModalUpdate").modal("toggle");
			}
			$("#btnguardar").click(function(event){
        if (document.getElementById("formInserta").checkValidity()) {
          event.preventDefault();
          var form = $("#formInserta")[0];
          var data = new FormData(form);
          $.ajax({
            type:"POST",
            url:"Backend/Configuracion/App.php",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(data){
              if (data=="1") {
                Alerta("success","Actualizado Correctamente");
                setTimeout(function () {
                  // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
              }else {
                Alerta("error","No se Actualizado Correctamente");
                setTimeout(function () {
                  // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
              }
              $("#ModalUpdate").modal("hide");
            },
            error:function(e){
              alert(e.responseText);
            }

          }); //Ajax
				}else {
					Alerta("info","Llene los campos Por Favor");
					// Es para que mostrar mensaje de advertencia de llenar los campos info
				}
      });

			// ActualizarStatus
			function ActualizarStatusMotivo(Status,idMotivosCancelacion){
				// alert("ActualizarStatusMotivo"+Status);
				if (Status == 0) {
					var stutus = "1";
				}else {
					stutus = "0";
				}
				$.ajax({
					type:"POST",
					url:"Backend/Configuracion/App.php",
					data:"op=StatusActualizaMotivo"+
					"&Status="+stutus+"&idMotivosCancelacion="+idMotivosCancelacion,
					success: function(data){
						if(data=="1"){
							Alerta("success","Operacion exitosa");
							setTimeout(function () {
								location.reload();
							}, 1500);
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
			//Funcion de ActualizarStatus
			</script>
  </body>
</html>
