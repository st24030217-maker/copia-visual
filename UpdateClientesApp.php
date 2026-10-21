<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idPa = $_GET["Paciente_Id"] ?? "";
require_once("Backend/ClientesApp/AdmClientesApp.php");
$AdmClientesApp = new AdmClientesApp();
$DatosClienteApp = $AdmClientesApp->getClienteApp($idPa);
for ($i=0; $i <sizeof($DatosClienteApp) ; $i++) {
$Nombre = $DatosClienteApp[$i]["Nombre"];
$Apellidos = $DatosClienteApp[$i]["Apellidos"];
$Sexo = $DatosClienteApp[$i]["Sexo"];
$Titulo = $DatosClienteApp[$i]["Titulo"];
$Dir_Calle = $DatosClienteApp[$i]["Dir_Calle"];
$Dir_Num = $DatosClienteApp[$i]["Dir_Num"];
$Dir_Colonia = $DatosClienteApp[$i]["Dir_Colonia"];
$Cell = $DatosClienteApp[$i]["Cell"];
$Telefono = $DatosClienteApp[$i]["Telefono"];
$Email = $DatosClienteApp[$i]["Email"];
$Fecha_Nac = $DatosClienteApp[$i]["Fecha_Nac"];
$Num_Expediente = $DatosClienteApp[$i]["Num_Expediente"];
$INE_Clave_Elector = $DatosClienteApp[$i]["INE_Clave_Elector"];
$Curp = $DatosClienteApp[$i]["Curp"];
$RFC = $DatosClienteApp[$i]["RFC"];

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
				 <form class="" action="Backend/ClientesApp/App.php" method="post" id="formAddClientesApp">
					 <input type="text" name="op" id="op" value="" style="display:none">
					 <section>
						<ol class="breadcrumb">
							<li> <a class="titulo"> Actualizar Paciente </a> </li>
						</ol>
					 </section>

					<div class="contenedores text-right">
					 	<a href="ListaClientes.php"><button type="button" class="btn btn-outline-success">Regresar</button></a>
					</div>
					<br>

  				 	<div class="contenedores">
  				 		<div class="row">
  				 			<div class="col-4 col-lg-4">
  				 				<h6>Nombre(s)</h6>
  								<input type="text" name="txtNombre" id="txtNombre" class="form-control" required value="<?php echo $Nombre ?>">
  				 			</div>
								<div class="col-4 col-lg-4">
									<h6>Apellidos</h6>
									<input type="text" name="txtApellidos" id="txtApellidos" class="form-control" required value="<?php echo $Apellidos ?>">
								</div>
								<div class="col-2 col-lg-2">
									<h6>Sexo</h6>
									<select class="form-control" name="selctSexo" id="selctSexo" required>
										<option value="" selected disabled> Seleccione el Sexo </option>
										<option value="M">M</option>
										<option value="F">F</option>
									</select>
									<br>
								</div>
								<div class="col-2 col-lg-2">
									<h6>Titulo</h6>
									<input type="text" name="txtTitulo" id="txtTitulo" class="form-control" required value="<?php echo $Titulo ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>Dirección</h6>
									<input type="text" name="txtDireccion" id="txtDireccion" class="form-control" required value="<?php echo $Dir_Calle ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>Colonia</h6>
									<input type="text" name="txtColonia" id="Colonia" class="form-control" required value="<?php echo $Dir_Colonia ?>">
								</div>
								<div class="col-2 col-lg-2">
									<h6>Numero</h6>
									<input type="number" name="txtNumero" id="txtNumero" class="form-control" required min="0" value="<?php echo $Dir_Num ?>">
								</div>
								<div class="col-2 col-lg-2">
									<h6>Fecha de Nacimiento</h6>
									<input type="date" name="txtFechaN" id="txtFechaN" class="form-control" required value="<?php echo $Fecha_Nac ?>">
									<br>
								</div>
								<div class="col-4 col-lg-4">
									<h6>Celular</h6>
									<input type="text" name="txtCelular" id="txtCelular" class="form-control" onkeypress="return onlynumber(event)" required value="<?php echo $Cell ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>Telefono</h6>
									<input type="text" name="txtTelefono" id="txtTelefono" class="form-control" onkeypress="return onlynumber(event)" required value="<?php echo $Telefono ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>Email</h6>
									<input type="text" name="txtEmail" id="txtEmail" class="form-control" required value="<?php echo $Email ?>">
									<br>
								</div>
								<div class="col-4 col-lg-4">
									<h6>No° Expediente</h6>
									<input type="number" name="txtNoExp" id="txtNoExp" class="form-control" min="0" required value="<?php echo $Num_Expediente ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>CURP</h6>
									<input type="text" name="txtCURP" id="txtCURP" class="form-control"required maxlength="16" value="<?php echo $Curp ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>RFC</h6>
									<input type="text" name="txtRFC" id="txtRFC" class="form-control" required value="<?php echo $RFC ?>">
									<br>
								</div>
								<div class="col-4 col-lg-4">
									<h6>INE</h6>
									<input type="text" name="txtIne" id="txtIne" class="form-control" required value="<?php echo $INE_Clave_Elector ?>">
								</div>
								<div class="col-4 col-lg-4">
									<h6>Foto</h6>
									<input type="file" name="inpFoto" id="inpFoto" class="form-control" required>
									<br>
								</div>
  				 		</div>
  				 	</div>
						<br>
						<div class="row">
							<div class="col-12 col-lg-12 text-center">
								<button type="button" id="btnAcpetar" class="btn btn-outline-secondary"  onclick="addClientesAppfunction('')">Agregar Paciente</button>
							</div>
						</div>
				 </form>


        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">

		function onlynumber(e) {
				 tecla = (document.all) ? e.keyCode : e.which;
				 if (tecla == 8) {
					 return true;
				 }
				 patron = /[-0-9]/;
				 tecla_final = String.fromCharCode(tecla);
				 return patron.test(tecla_final);
			 }

			 function addClientesAppfunction(){
				 if (document.getElementById("formAddClientesApp").checkValidity()){
 					event.preventDefault();
 					var form = $("#formAddClientesApp")[0];
 					var data = new FormData(form);

 					$.ajax({
 						type:"POST",
 						url:"Backend/ClientesApp/App.php",
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
 						},
 						error:function(e){
 							alert(e.responseText);
 						}
 					});
 				}else {
 					Alerta("info","Faltan Campos por llenar");
 				}
			}
		</script>
  </body>
</html>
