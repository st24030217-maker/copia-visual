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
  <body class="nav-md" >
    <div class="container body">
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
				 <section>
					<ol class="breadcrumb">
						<li> <a class="titulo"> Seguimiento de Discos </a> </li>
					</ol>
				 </section>


          <div class="contenedores">
            <div class="row">
              <div class="col-12 col-lg-12 text-right">
                <button type="button" class="btn btn-outline-success" onclick="seguimientoDiscosfunction('')"> <i class='fa fa-plus'></i> Nuevo Seguimiento</button>
              </div>
            </div>
         </div>
         <br>

				 <div class="contenedores">
					 <div class="Table-responsive">
					 <table id="nombre" class="table text-center table-hover" style="color:black;">
						 <thead>
							 <tr>
								 <th>NoDisco</th>
								 <th>Color</th>
								 <th>Grosor</th>
								 <th>Modulo</th>
								 <th>Actualizar</th>
							 </tr>
						 </thead>
						 <tbody>

							 <?php
									require_once ("Backend/SeguimientoDiscos/AdmSeguimientoDiscos.php");
									$AdmSeguimientoDiscos = new AdmSeguimientoDiscos();
									$ListSegDiscos= $AdmSeguimientoDiscos->getSeguimientosDiscos();
									for($i = 0; $i < sizeof($ListSegDiscos); $i++){

									$NoOrden = $ListSegDiscos[$i]["NoOrden"];
									$NoDisco = $ListSegDiscos[$i]["NoDisco"];
									$Color = $ListSegDiscos[$i]["Color"];
									$Grosor = $ListSegDiscos[$i]["Grosor"];
									$Modulo = $ListSegDiscos[$i]["Modulo"];

									echo "
										<tr>
										<td>$NoDisco</td>
										<td>$Color</td>
										<td>$Grosor</td>
										<td>$Modulo</td>

										<td class='text-center'>
											<button class='btn btnIconoEdit'  onclick='seguimientoDiscosfunction(\"$NoOrden\");' data-toggle='tooltip' title='Editar Seguimiento'>
											<i class='fa fa-pencil-square'></i>
											</button>

										</tr>
									";
								}
								?>
						 </tbody>
					 </table>
					</div>
				 </div>


				          <!-- modal -->
				         <div class="modal fade" id="ModalSegDiscos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				          <div class="modal-dialog ">
				            <div class="modal-content ">
				              <div class="modal-header ">
				                <h5 class="modal-title" id='TituloModal'></h5>
				                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				                  <span aria-hidden="true">&times;</span>
				                </button>
				              </div>
				              <div class="modal-body ">
				                <form id="formInserta" method="post" action="Backend/SeguimientoDiscos/App.php">
				                  <div class="form-group">
				                    <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
				                    <input type="text" class="form-control" id="IdSegD" name="IdSegD" style="display:none;">
				                    <div class="row">
				                      <div class="col-6 col-lg-6 text-center">
				                        <label for="recipient-name" class="col-form-label">NoDisco:</label>
				                        <input type="number" class="form-control" id="txtNoDisco" name="txtNoDisco" min="0" required>
				                      </div>
															<div class="col-6 col-lg-6 text-center">
																<label for="recipient-name" class="col-form-label">Color:</label>
																<input type="text" class="form-control" id="txtColor" name="txtColor"  required>
															</div>
															<div class="col-6 col-lg-6 text-center">
																<label for="recipient-name" class="col-form-label">Grosor:</label>
																<input type="text" class="form-control" id="txtGrosor" name="txtGrosor"  required>
															</div>
															<div class="col-6 col-lg-6 text-center">
																<label for="recipient-name" class="col-form-label">Modulo:</label>
																<input type="text" class="form-control" id="txtModulo" name="txtModulo"  required>
															</div>
				                    </div>

				                  </div>
				         <!-- Aqui va el Segundo Label  -->

				              </div>
				              <br><br>
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
		$(document).ready(function(){
			$('#nombre').DataTable({
	      lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
	      ordering: false,
	      "bPaginate": false,
	      responsive: false,
	      "bInfo" : false,
	      "oLanguage": {
	      "sSearch": "Buscar"
	    }
	    });
		});
		function seguimientoDiscosfunction(NoOrden)
		{

			if (NoOrden != "") {
				$("#TituloModal").text("Actualizar Tipo Recordatorio");
				$("#IdSegD").val(NoOrden);
				$("#btnguardar").text("Actualizar");
				$("#op").val("updateSeguimientoDiscos");
				$.ajax({
					type:"POST",
					url:"Backend/SeguimientoDiscos/App.php",
					data:"op=getSeguimientoDiscosDetalle"+
					"&NoOrden="+NoOrden,
					success:function(response){
						response=JSON.parse(response.trim());
						$("#txtNoDisco").val(response.NoDisco);
						$("#txtColor").val(response.Color);
						$("#txtGrosor").val(response.Grosor);
						$("#txtModulo").val(response.Modulo);


					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}else {
		 $("#TituloModal").text("Agregar Tipo de Recordatorio");
		 $("#txtNoDisco").val("");
		 $("#txtColor").val("");
		 $("#txtGrosor").val("");
		 $("#txtModulo").val("");


		 $("#btnguardar").text("Guardar");
		 $("#IdSegD").val("");
		 $("#op").val("addSeguimientoDiscos");
	 }
	 $("#ModalSegDiscos").modal("toggle");
 }

 $("#btnguardar").click(function(event){
	 if (document.getElementById("formInserta").checkValidity()) {
		 event.preventDefault();
		 var form= $("#formInserta")[0];
		 var data = new FormData(form);
		 $.ajax({
			 type: "POST",
			 url: "Backend/SeguimientoDiscos/App.php",
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
				 $("#ModalSegDiscos").modal("hide");
			 },
			 error:function(e){
				 alert(e.responseText);
			 }
		 });
	 }else{
		 Alerta("info","Faltan Datos por llenar");
	 }
 });
		</script>
  </body>
</html>
