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
						<li> <a class="titulo"> Cátalogo Equipos </a> </li>
					</ol>
				 </section>
				 <div class="contenedores">
					 <div class="row">
						 <div class="col-12 col-lg-12 text-right">
							 <button type="button" class="btn btn-outline-success" onclick="Equiposfunction('')">	<i class="fa fa-plus"></i> Nuevo Equipo</button>

						 </div>
					 </div>
		  	</div>
				<br>

				<?php
			require_once ("Backend/Equipos/AdmEquipos.php");
		 	 $AdmEquipos = new AdmEquipos();
		 	 $ListEquipos= $AdmEquipos->getEquipos();
			 if (sizeof($ListEquipos)>0) {

				 ?>

					<div class="contenedores" style="width:100%;">
						<div class="row">
						<div class="table-responsive">
		        <table id="TableListado" class="table text-center table-hover" style="color:black;">
		          <thead>
		            <tr>
		              <th>Descripción Equipo</th>
									<th>Código</th>
									<th>Status</th>
		              <th>Editar</th>
									<th>Actualizar Status</th>



		            </tr>
		          </thead>
		          <tbody>

		            <?php

		               for($i = 0; $i < sizeof($ListEquipos); $i++){

		               $idEquipos = $ListEquipos[$i]["idEquipos"];
		               $Descripcion = $ListEquipos[$i]["Descripcion"];
									 $Codigo = $ListEquipos[$i]["Codigo"];
									 $Status = $ListEquipos[$i]["Status"];

									 if ($Status == "1") {
									 		$varStatus = "Activo";

									 }else {
										 $varStatus = "Inactivo";
									 }
		               echo "
		                 <tr>
		                 <td>$Descripcion</td>
										 <td>$Codigo</td>
										 <td>$varStatus</td>


		                 <td class='text-center'>
		                   <button class='btn btnIconoEdit'  onclick='Equiposfunction(\"$idEquipos\");' data-toggle='tooltip' title='Editar Equipo'>
											 <i class='fa fa-pencil-square'></i>
											 </button></td>

											 <td class='text-center'>
												 <button class='btn btnIconoUpload'  onclick='ActualizarStatus(\"$Status\",\"$idEquipos\");' data-toggle='tooltip' title='Editar Status'>
												 <i class='fa fa-refresh'></i>
												 </button></td>
		                 </tr>
		               ";
		             }
		             ?>
		          </tbody>
		        </table>
		       </div>
					 <?php
				 }else {
					 echo "
					 <div class='col-12 text-center contenedores'>
					 <h5>No hay Equipos</h5>
					 </div>";
				 }

				 ?>
				 </div>
					</div>





       <!-- modal -->
			 <div class="modal fade" id="ModalEquipos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			 	<div class="modal-dialog ">
			 		<div class="modal-content ">
			 			<div class="modal-header ">
			 				<h5 class="modal-title" id='TituloModal'></h5>
			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			 					<span aria-hidden="true">&times;</span>
			 				</button>
			 			</div>
			 			<div class="modal-body ">
			 				<form id="formInserta" method="post" action="Backend/Equipos/App.php">
			 					<div class="form-group">
			 						<input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
			 						<input type="text" class="form-control" id="IdEq" name="IdEq" style="display:none;">
									<div class="row">
										<div class="col-8 col-lg-8">
											<label for="recipient-name" class="col-form-label">Descripcion:</label>
											<input type="text" class="form-control" id="txtDescripcion" name="txtDescripcion" required>
										</div>
										<div class="col-4 col-lg-4">
											<label for="recipient-name" class="col-form-label">Codigo:</label>
											<input type="text" class="form-control" id="txtCodigo" name="txtCodigo" required>
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
			$('#TableListado').DataTable({
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
    function Equiposfunction(idEquipos)
        {
          if (idEquipos != ""){
            $("#TituloModal").text("Actualizar Equipo");
            $("#IdEq").val(idEquipos);
            $("#btnguardar").text("Actualizar");
            $("#op").val("UpdateEquipos");
            $.ajax({
              type:"POST",
              url:"Backend/Equipos/App.php",
              data:"op=getDetalleEquipos"+
              "&idEquipos="+idEquipos,
              success:function(response){
                response=JSON.parse(response.trim());
                $("#txtDescripcion").val(response.Descripcion);
								$("#txtCodigo").val(response.Codigo);

              },
              error:function(e){
                alert(e.responseText);
              }
            });
          }else {
            $("#TituloModal").text("Agregar Equipo");
            $("#txtDescripcion").val("");
						$("#txtCodigo").val("");
            $("#btnguardar").text("Guardar");
            $("#IdEq").val("");
            $("#op").val("AddEquipos");

          }
          $("#ModalEquipos").modal("toggle");
        }
        $("#btnguardar").click(function(event){
          if (document.getElementById("formInserta").checkValidity()) {
           event.preventDefault();
           var form = $("#formInserta")[0];
           var data = new FormData(form);
            $.ajax({
              type:"POST",
              url:"Backend/Equipos/App.php",
              data:data,
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
                $("#ModalEquipos").modal("hide");
              },
              error:function(e){
                alert(e.responseText);
              }
            });
          } else {
          	Alerta("info","Llene todos los campos");
          }
        });


				function ActualizarStatus(Status,idEquipos){
						if (Status == 0) {
							var status1 ="1";
						}else {
							status1 = "0";
						}
						$.ajax({
						type:"POST",
						url:"Backend/Equipos/App.php",
						data:"op=updateStatus"+
						"&Status="+status1+"&idEquipos="+idEquipos,
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
