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
           <li> <a class="titulo"> Lista de Empresas </a> </li>
         </ol>
        </section>
				<div class="contenedores ">
					<div class="row">
						<div class="col-12 col-lg-12 text-right">
							<a onclick="window.location.href='NewEmpresa.php'"><button type="button" class="btn btn-outline-success" >  <i class='fa fa-plus'></i> Nueva Empresa</button></a>
						</div>
					</div>
			 </div>
			 <br>


			 <div class="contenedores col-12 col-lg-12">
           <div class="Table-responsive">
           <table id="tablaEmp" class="table text-center table-hover" style="color:black;">
             <thead>
               <tr>
                 <th>Nombre de la Empresa </th>
                 <th>Dirección</th>
 								 <th>Telefono</th>
                 <th>Porcentaje de Descuento</th>
								 <th>Numero de Empleados</th>
								 <th>Ver Empleados</th>
                 <th>Editar Empresa</th>
								 <th>Compartir Link</th>


               </tr>
             </thead>
             <tbody>

               <?php
                  require_once ("Backend/Empresas/AdmEmpresas.php");
                  $AdmEmpresas = new AdmEmpresas();
                  $ListEmpresas = $AdmEmpresas->getEmpresas();
                  for($i = 0; $i < sizeof($ListEmpresas); $i++){

                  $idEmpresas = $ListEmpresas[$i]["idEmpresas"];
                  $Empresa = $ListEmpresas[$i]["Empresa"];
 								  $Telefono = $ListEmpresas[$i]["Telefono"];
                  $Direccion = $ListEmpresas[$i]["Direccion"];
                  $Porcentaje = $ListEmpresas[$i]["Porcentaje"];
									$NumeroEmpleados = $ListEmpresas[$i]["NumeroEmpleados"];
                  echo "
									<tr>
									<td>$Empresa</td>
									<td>$Direccion</td>
									<td>$Telefono</td>
									<td>$Porcentaje</td>
									<td>$NumeroEmpleados</td>


									<td class='text-center'>
										<a class='btn btnIconoEdit'  onclick='detalleEmpleados(\"$idEmpresas\");' data-toggle='tooltip' title='Ver Empleados'>
										<i class='fa fa-eye fa-2x'></i></td>

									<td class='text-center'>
										<a class='btn btnIconoEdit'  onclick='updateEmpresa(\"$idEmpresas\");' data-toggle='tooltip' title='Editar Empresa'>
										<i class='fa fa-pencil-square fa-2x'></i></td>


									<td class='text-center'>
										<a class='btn btnIconoUpload'  onclick='compartirLink(\"$idEmpresas\",\"$Empresa\");' data-toggle='tooltip' title='Compartir Link de Registro para Empleados'>
										<i class='fa fa-share-alt fa-2x'></i></td>
									</tr>
                  ";
                }
                ?>
             </tbody>
           </table>
         </div>
         </div>

				 <!-- modal -->
				<div class="modal fade" id="ModalCompartir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				 <div class="modal-dialog ">
					 <div class="modal-content ">
						 <div class="modal-header ">
							 <h5 class="modal-title" id='TituloModal'> Compartir link de registro por medio de...</h5>
							 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
								 <span aria-hidden="true">&times;</span>
							 </button>
						 </div>
						 <div class="modal-body ">
							 <form id="formCompartir" method="post" action="">
								 <div class="form-group">
									 <input type="text" name="ValIdE" id="ValIdE" value="" style="display:none">
									 <div class="row">
										 <div class="col-6 col-lg-6 text-center">
 											<button type="button" class="btn btn-success" id="btnWhats" name="btnWhats" style="width : 200px;" onclick="enviarWhatsSala('')"><i class='fa fa-whatsapp fa-2x'></i>
 												Whatsapp
 											</button>
 										</div>
 										<div class="col-6 col-lg-6 text-center">
 											<button type="button" class="btn btn-secondary" id="btnCorreo" name="btnCorreo" style="width : 200px;" onclick="abrirModalCorreo('')"><i class='fa fa-envelope-o fa-2x'></i>
 											 Email</button>
											 <br><br>
 										</div>

										<div class="col-12 col-lg-12 text-center">
											<h7 id="linkText"></h7>
 										</div>
									 </div>

								 </div>
				<!-- Aqui va el Segundo Label  -->

						 </div>

						 </form>
					 </div>
				 </div>
				</div>

				<!-- modal 2-->
			 <div class="modal fade" id="ModalCompartirCorreo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog ">
					<div class="modal-content ">
						<div class="modal-header ">
							<h5 class="modal-title" id='TituloModalCorreo'> Inserte el correo </h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body ">
							<form id="formCompartirCorreo" method="post" action="">
								<div class="form-group">
									<input type="text" class="form-control" id="ValIdE2" name="ValIdE2" style="display:none">
									<input type="text" class="form-control" id="op" name="op"  value="enviarACorreo" style="display:none;">
									<div class="col-12 col-lg-12">
										<label for="recipient-name" class="col-form-label"> Email </label>
										<input type="text" name="txtEmail" id="txtEmail"   class="form-control" required>
									</div>

								</div>

			 <!-- Aqui va el Segundo Label  -->

						</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" id="btnguardar" onclick="enviarCorreosSala('')">Guardar</button>

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
			$('#tablaEmp').DataTable({
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
		function updateEmpresa(idEmpresas){
			if (idEmpresas != "") {
				window.location.href=`UpdateEmpresa.php?idEmpresas=${idEmpresas}`;
			}
		}

		function detalleEmpleados(idEmpresas){
			if (idEmpresas != "") {
				window.location.href=`EmpleadosPorEmpresa.php?idEmpresasEmp=${idEmpresas}`;
			}
		}

		function compartirLink(idEmpresas){

				$("#ValIdE").val(idEmpresas);
				$("#linkText").html(`https://dent.resosistemas.mx/RegistroClientes.php?empresa=${idEmpresas}`);
				$("#ModalCompartir").modal("toggle");
		}
		function abrirModalCorreo(){
			var idEmp = $("#ValIdE").val();
				$("#ValIdE2").val(idEmp);
				$("#ModalCompartirCorreo").modal("toggle");

		}

		function enviarWhatsSala(){
		var idEmp = $("#ValIdE").val();
    var url = `https://dent.resosistemas.mx/RegistroClientes.php?empresa=${idEmp}`;
    window.open(`https://api.whatsapp.com/send?text= Ve al link ${url}`);
  }

	function enviarCorreosSala(){
			if (document.getElementById("formCompartirCorreo").checkValidity()){
				event.preventDefault();
				var form = $("#formCompartirCorreo")[0];
				var data = new FormData(form);

				$.ajax({
					type:"POST",
					url:"Backend/Empresas/App.php",
					data:data,
					processData:false,
					contentType:false,
					cache: false,
					timeout:600000,
					success:function(data){
						if (data=="1") {
						 Alerta("success","Registrado Correctamente");
						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							 location.reload();
						 }, 1500);
						}
						else{
							Alerta("error","No Registrado");
							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								location.reload();
							}, 1500);
						}
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			} else {
				Alerta("info","Ingrese su correo");
			}
		}




		</script>
  </body>
</html>
