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
	<title>Tintoreria MAX | Procesos </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->

         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Listado de Procesos </a> </li>
          </ol>
         </section>
				 <div class="contenedores">
				 	<div class="row">
				 		<div class="col-12 col-lg-12 text-right">
				 			<button type="button" class="btn btn-outline-secondary" onclick="Procesofunction('')">Nuevo Proceso</button>
				 		</div>
				 	</div>
				 </div>


				 				 <div class="Table-responsive">
				 				 <table id="nombre" class="table text-center" style="color:black;">
				 					 <thead>
				 						 <tr>
				 							 <th>Proceso</th>
				 							 <th>Descripcion</th>
				 							 <th>MaxPiezas</th>
											 <th>Status</th>
				 							 <th>Actualizar</th>
											 <th>Detalles</th>



				 						 </tr>
				 					 </thead>
				 					 <tbody>

				 						 <?php
				 						 		require_once ("Backend/Procesos/AdmProcesos.php");
				 								$Procesos = new AdmProcesos();
				 		 				  	$ListProcesos = $Procesos->getProcesos();
				 		 					  for($i = 0; $i < sizeof($ListProcesos); $i++){

				 								$ProcesoID = $ListProcesos[$i]["ProcesoID"];
				 		 						$Proceso = $ListProcesos[$i]["Proceso"];
				 		 						$Descripcion = $ListProcesos[$i]["Descripcion"];
				 								$MaxPiezas = $ListProcesos[$i]["MaxPiezas"];
												$Status = $ListProcesos[$i]["Status"];
												// $Imagen = $ListProcesos[$i]["Imagen"];

												if ($Status == 1) {
													$varstatus = "Activo";
	 										 	}else {
	 											 	$varstatus = "Inactivo";
	 										 	}

				 								echo "
				 									<tr>
				 									<td>$Proceso</td>
				 									<td>$Descripcion</td>
				 									<td>$MaxPiezas</td>
													<td>$varstatus</td>


				 									<td class='text-center'>
				 										<a class='pointer-link'  onclick='Procesofunction(\"$ProcesoID\");' data-toggle='tooltip' title='Editar Proceso'>
				 										<i class='fa fa-pencil-square fa-2x'></i>

														<td class='text-center'>
															<a class='pointer-link'  onclick='ActualizarStatus(\"$Status\",\"$ProcesoID\");' data-toggle='tooltip' title='Actualizar Status'>
															<i class='fa fa-refresh fa-2x'></i>


				 									</tr>
				 								";
				 							}
				 						  ?>
				 					 </tbody>
				 				 </table>
								 <br>
								 <br>
								 <br>

				 			 </div>

							 <!-- modal -->
							 <div class="modal fade" id="ModalProc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id='TituloModal'></h5>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<form id="formInserta" action="Backend/Procesos/App.php" method="post" enctype="multipart/form-data">
												<div class="form-group">
													<input type="text" class="form-control" id="op" name="op" value="UpdateProcn" style="display:none;">
													<input type="text" class="form-control" id="IdProc" name="IdProc" style="display:none;">
													<label for="recipient-name" class="col-form-label">Prcoceso:</label>
													<input type="text" class="form-control" id="txtProceso" name="txtProceso" required>
													<label for="recipient-name" class="col-form-label">Descripcion:</label>
													<input type="text" class="form-control" id="txtDescripcion" name="txtDescripcion" required>
													<label for="recipient-name" class="col-form-label">Maximo de Piezas:</label>
													<input type="number" class="form-control" id="txtMaxPiezas" name="txtMaxPiezas" required>
													<label for="recipient-name" class="col-form-label">Seleccione una Imagen:</label>
													<input type="file" class="form-control" id="inpImagen" name="inpImagen"  >

												</div>
							 <!-- Aqui va el Segundo Label  -->

										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
											<button type="button" class="btn btn-primary" id="btnguardar">Guardar</button>
										</div>
										</form>
									</div>
								</div>
							 </div>



        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">
			function Procesofunction(ProcesoID)
			{
				if (ProcesoID !="") {
					$("#TituloModal").text("Actualizar Proceso");
					$("#IdProc").val(ProcesoID);
					$("#btnguardar").text("Actualizar");
					$("#op").val("UpdateProceso");
					$.ajax({
						type:"POST",
						url:"Backend/Procesos/App.php",
						data:"op=getDetalleProceso"+
						"&ProcesoID="+ProcesoID,
						success:function(response){
							response=JSON.parse(response.trim());
							$("#txtProceso").val(response.Proceso);
							$("#txtDescripcion").val(response.Descripcion);
							$("#txtMaxPiezas").val(response.MaxPiezas);
							// $("#inpImagen").val(response.Imagen);
						},
						error:function(e){
							alert(e.responseText);
						}
					});
				} else {
					$("#TituloModal").text("Agregar Proceso");
					$("#txtProceso").val("");
					$("#txtDescripcion").val("");
					$("#txtMaxPiezas").val("");
					$("#inpImagen").val("");
					$("#btnguardar").text("Guardar");
					$("#IdProc").val("");
					$("#op").val("AddProceso");

				}
				$("#ModalProc").modal("toggle");
			}
		$("#btnguardar").click(function(event){
			if (document.getElementById("formInserta").checkValidity()) {
				event.preventDefault();
				var form= $("#formInserta")[0];
				var data = new FormData(form);
				$.ajax({
					type: "POST",
					url: "Backend/Procesos/App.php",
					data: data,
					enctype: "multipart/form-data",
					processData:false,
					contentType:false,
					cache: false,
					timeout:600000,
					success:function(data){
						if (data=="1") {
						 Alerta("success","Actualizado Correctamente");
						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							 location.reload();
						 }, 1500);
						}
						else{
							Alerta("error","No se Actualizo Correctamente");
							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								location.reload();
							}, 1500);
						}
						$("#ModalProc").modal("hide");
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}
		});

		function ActualizarStatus(Status,ProcesoID){
			alert("ActualizarStatus"+Status);
				if (Status == 0) {
					var status1 ="1";
				}else {
					status1 = "0";
				}
				$.ajax({
				type:"POST",
				url:"Backend/Procesos/App.php",
				data:"op=updateStatus"+
				"&Status="+status1+"&ProcesoID="+ProcesoID,
				success:function(data){
					if(data=="1"){
						Alerta("success","Operacion Exitosa");
						setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							location.reload();
						}, 1500);
					}else{
						Alerta("error","No se Realizo Correctamente");
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

		</script>
  </body>
</html>
