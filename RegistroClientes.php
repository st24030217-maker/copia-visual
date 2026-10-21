<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idEmpresa = $_GET["empresa"] ?? "";
$NombreEmpresa = $_GET["Empresa"] ?? "";

require_once("Backend/Empresas/AdmEmpresas.php");
$AdmEmpresas = new AdmEmpresas();
$EmpreasasListN = $AdmEmpresas->getNombreEmpresa($idEmpresa);
for ($i=0; $i <sizeof($EmpreasasListN ) ; $i++) {
$Empresa = $EmpreasasListN[$i]["Empresa"];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos_public.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
	<style media="screen">
	.center-form{
		margin-top: 10vh;
	}
	</style>
</head>
<body>

		<div class="container ">

			<div class="row" style="margin:15px;">
				<div class="offset-lg-3 col-lg-6 col-12">
					<div class="center-form">
						<div class="row">
							<div class="col-12 text-center">
								<h1>Registro para la empresa <?php echo $Empresa?></h1>
							</div>
						</div>
						<div class="col-12">
							<hr style="background-color:#D3D3D3;">
						</div>
						<div class="col-12 text-center" id="load" style="display:none;">
							<div class="spinner-border text-secondary" role="status">
							  <span class="sr-only">Loading...</span>
							</div>
							<br>
							<br>
						</div>
						<div class="contenedores" id="contenedorRegistro">
							<span>Completa el registro</span>

							<form id="formInsertaCliente" action="Backend/EmpleadosEmpresa/App.php" method="post" class="">
								<input type="text" name="empresaId" value="<?php echo $idEmpresa;?>" style="display:none">
		            <input type="text" class="form-control" id="op" name="op" value="EmpleadoEmpresa" style="display:none;">
		                <div class="row" style="padding:10px;">
		                  <div class="col-12 col-lg-12">
		                    <input type="text" name="txtNombre" class="form-control" placeholder="Nombre Completo" required>
													<br>
											</div>
		                  <div class="col-12 col-lg-6">
		                    <input type="text" name="txtEmail" class="form-control" placeholder="Correo electrónico"required>
													<br>
											</div>
		                  <div class="col-12 col-lg-6">
		                    <input type="text" name="txtTelefono" class="form-control" placeholder="Número Teléfono" onkeypress="return onlynumber(event)" required>
		                    <br><br>
		                  </div>
											<div class="col-12 col-lg-12 text-center">
												<h6>Horario Preferido</h6>

											</div>
											<div class="col-6 col-lg-6">
												<select class="form-control" name="selectHorarioP" id="selectHorarioP" required onchange="onchangeSelectHorario(this.value);">
													<option value="" selected disabled>Horario Preferido</option>
													<option value="Por el día">Por el día</option>
													<option value="Por la noche">Por la noche</option>
												</select>
											</div>
											<div class="col-6 col-lg-6">
												<select class="form-control" name="selectHoraPreferida" id="selectHoraPreferida" onchange="onchangevalorHora(this.value);"required>
													<option value="" selected disabled>Hora Preferida</option>
													<option value="08:00 - 13:00">08:00 - 13:00</option>
													<option value="13:00 - 18:00">13:00 - 18:00</option>
													<option value="18:00 - 01:00">18:00 - 01:00</option>
													<option value="01:00 - 06:00">01:00 - 06:00</option>

												</select>
												<br>
											</div>
											<input type="text" name="inpHorarioP" id="inpHorarioP" value="" style="display:none">
											<input type="text" name="inpHorarioP2" id="inpHorarioP2" style="display:none">

		                  <div class="col-12 col-lg-12 text-center">
		                    <button type="button" class="btn btn-info" onclick="RegistroClientefunction('')">Agregar</button>
		                  </div>

		                </div>
		          </form>
						</div>

					</div>
				</div>
			</div>

		</div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

    function RegistroClientefunction(){
			var selectH = $("#selectHorarioP").val();
			if (selectH == "") {
				Alerta("warning","Debes de seleccionar un Horario");
				return false;
			}
      if (document.getElementById("formInsertaCliente").checkValidity()){
        event.preventDefault();
        var form = $("#formInsertaCliente")[0];
        var data = new FormData(form);

        $.ajax({
          type:"POST",
          url:"Backend/EmpleadosEmpresa/App.php",
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
      }
			else{
 			 Alerta("info","Faltan Datos por llenar");
 		 }
	  }

		function onlynumber(e) {
				 tecla = (document.all) ? e.keyCode : e.which;
				 if (tecla == 8) {
					 return true;
				 }
				 patron = /[-0-9]/;
				 tecla_final = String.fromCharCode(tecla);
				 return patron.test(tecla_final);
			 }

			 
			 <?php $valorHora = ($selectHorarioP ?? "") . ($selectHoraPreferida ?? ""); ?>
		var GlobalH = $("#inpHorarioP")+ $("inpHorarioP2");

		function onchangeSelectHorario(valor){
			$("#inpHorarioP").val(valor);
		}

		function onchangevalorHora(valorHora){
			var HorarioT = $("#inpHorarioP").val();
			var HorarioF = `${HorarioT}`+ "  " +valorHora;
			$("#inpHorarioP2").val(HorarioF);

		}


    </script>
  </body>
</html>
