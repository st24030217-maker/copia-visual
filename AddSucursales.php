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
	<title>Tintoreria MAX | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->

         <form id="formInsertaSucursal" method="post" action="Backend/Sucursales/App.php">
           <input type="text" class="form-control" id="op" name="op" value="AddSucursal" style="display:none;">
           <div class="contenedores">
             <div class="row">
               <div class="col-12 col-lg-12">
                 <h4 class="h4">Sucursal</h4>
                 <input type="text" class="form-control" id="txtSucursal" name="txtSucursal" placeholder="Nombre de la Sucursal">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> Estados </label>
                  <select class="form-control" name="selectEstado" id="selectEstado" onchange="onchangeEstados(this.value)">
                    <option value="0"> Estados </option>
                      <?php
                        require_once("Backend/Sucursales/AdmSucursales.php");
                        $AdmSucursales = new AdmSucursales();
                        $ListEstados = $AdmSucursales->getEstados();

                        for ($i=0; $i <sizeof($ListEstados) ; $i++) {
                          $idEstado = $ListEstados[$i]["id"];
                          $nombreEstado = $ListEstados[$i]["nombre"];
                          echo "
                          <option value='$idEstado'>$nombreEstado</option>";
                        }
                       ?>
                  </select>
               </div>
               <div class="col-3 col-lg-3" id="contenidoMunicipios">

               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> No. Exterior </label>
                 <input type="number" name="txtNoExterior" class="form-control" placeholder="Numero Exterior">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> No. Interior </label>
                 <input type="number" name="txtNoInterior" class="form-control" placeholder="Numero Interior">
               </div>
               <div class="col-9 col-lg-9">
                 <label for="recipient-name" class="col-form-label"> Dirección </label>
                 <input type="text" name="txtDireccion" class="form-control" placeholder="Dirección">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> Codigo Postal </label>
                 <input type="text" name="txtCP" class="form-control" placeholder="Codigo Postal">
                 <br>
               </div>
             </div>
             <h4 class="h4">Datos fiscales</h4>
             <hr>
             <div class="row">
               <div class="col-6 col-lg-6">
                 <label for="recipient-name" class="col-form-label"> Dirección </label>
                 <input type="text" name="txtDireccionF" class="form-control" placeholder="Dirección">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> Estados </label>
                  <select class="form-control" name="selectEstadoF" id="selectEstadoF" onchange="onchangeEstados2(this.value)">
                    <option value="0"> Estados </option>
                      <?php
                        require_once("Backend/Sucursales/AdmSucursales.php");
                        $AdmSucursales = new AdmSucursales();
                        $ListEstados = $AdmSucursales->getEstados();

                        for ($i=0; $i <sizeof($ListEstados) ; $i++) {
                          $idEstado2 = $ListEstados[$i]["id"];
                          $nombreEstado = $ListEstados[$i]["nombre"];
                          echo "
                          <option value='$idEstado2'>$nombreEstado</option>";
                        }
                       ?>
                  </select>
               </div>
               <div class="col-3 col-lg-3" id="contenidoMunicipios2">

               </div>
               <div class="col-6" col-lg-6>
                 <label for="recipient-name" class="col-form-label">  Razón Social </label>
                 <input type="text" name="txtRazonSocial" class="form-control" placeholder="Razón Social">
               </div>
               <div class="col-6 col-lg-6">
                 <label for="recipient-name" class="col-form-label"> Régimen Fiscal </label>
                 <select class="form-control" name="selectRegFiscal" id="selectRegFiscal">
                   <option value="0"> Aqui va algo </option>
                   <?php
                      require_once("Backend/Sucursales/AdmSucursales.php");
                      $AdmSucursales = new AdmSucursales();

                    ?>
                 </select>
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> No. Exterior </label>
                 <input type="number" name="txtNoExteriorF" class="form-control" placeholder="Numero Exterior">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> No. Interior </label>
                 <input type="number" name="txtNoInteriorF" class="form-control" placeholder="Numero Interior">
               </div>
               <div class="col-3 col-lg-3">
                 <label for="recipient-name" class="col-form-label"> RFC </label>
                 <input type="text" name="txtRFC" class="form-control" placeholder="RFC">
               </div> <div class="col-3 col-lg-3">
                  <label for="recipient-name" class="col-form-label"> Codigo Postal </label>
                  <input type="text" name="txtCPF" class="form-control" placeholder="Codigo Postal">
              </div>
							<div class="col-6 col-lg-6">
								<label for="recipient-name" class="col-form-label"> Correo Fiscal </label>
								<input type="text" name="txtCorreoFiscal" class="form-control" placeholder="Correo Fiscal">
							</div>
						
							<!-- <div class="col-4 col-lg-4">
								<label for="recipient-name" class="col-form-label">  	Archivo .cer </label>
									<div class="input-group mb-3">
						  			<div class="input-group-prepend">
						    			<span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
						  			</div>
						  			<div class="custom-file">
						    			<input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
						    			<label class="custom-file-label" for="inputGroupFile01">Choose file</label>
						  			</div>
									</div>
							</div>
							<div class="col-4 col-lg-4">
								<label for="recipient-name" class="col-form-label"> Archivo .key </label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="inputgF">Upload</span>
										</div>
										<div class="custom-file">
											<input type="file" class="custom-file-input" id="inputgF" aria-describedby="inputGroupFileAddon01">
											<label class="custom-file-label" for="inputgF">Choose file</label>
										</div>
									</div>
							</div>
							<div class="col-4 col-lg-4">
								<label for="recipient-name" class="col-form-label"> Password Key </label>
								<input type="password" name="txtpass" class="form-control">
							</div> -->
							<div class="col-12 col-lg-12 text-center">
								<button type="button" class="btnIconoAgregar" onclick="AddSucursalfunction('')">Agregar</button>
							</div>
             </div>
         </div>
       </form>
        </div>

      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">

			onchangeEstados();
			function onchangeEstados(idEst){
				$("#contenidoMunicipios").load(`includeMunicipios.php?idEstado=${idEst}`);
			}
			onchangeEstados2();
			function onchangeEstados2(idEst2){
				$("#contenidoMunicipios2").load(`includeMunicipiosDos.php?idEstado2=${idEst2}`);
			}

			function AddSucursalfunction(){
				if (document.getElementById("formInsertaSucursal").checkValidity()){
					event.preventDefault();
					var form = $("#formInsertaSucursal")[0];
					var data = new FormData(form);

					$.ajax({
						type:"POST",
						url:"Backend/Sucursales/App.php",
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
				}
			}
		</script>
  </body>
</html>
