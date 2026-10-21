<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
?>
<?php
$id_usuario = ($_COOKIE["id_usuario"] ?? "");
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
           <li> <a class="titulo">  Nueva Empresa </a> </li>
         </ol>
        </section>

				<div class="contenedores">
					<div class="row">
					 <div class="col-12 col-lg-12 text-right">
						 <a onclick="window.location.href='ListaEmpresas.php'"><button class="btn btn-outline-success "  type="button" name="button">Regresar</button></a>
					 </div>
					</div>
				</div>
				<br><br>
      <form  id="formInsertaEmpresa" action="Backend/Empresas/App.php" method="post">
        <input type="text" class="form-control" id="op" name="op" value="addEmpresa" style="display:none;">
        <input type="text" name="inpIdUsuario" value="<?php echo $id_usuario ?>" style="display:none;">
        <div class="contenedores">

          <div class="row">
            <div class="col-7 col-lg-7">
              <label for="recipient-name" class="col-form-label">Nombre de la Empresa:</label>
              <input type="text" name="txtEmpresa" class="form-control" required>
            </div>

            <div class="col-3 col-lg-3">
              <label for="recipient-name" class="col-form-label">Telefono:</label>
              <input type="text" name="txtTelefono" class="form-control" onkeypress="return onlynumber(event)" required>
            </div>

						<div class="col-2 col-lg-2 ">
							<label for="recipient-name" class="col-form-label">Porcentaje:</label>
							<input type="number" name="txtPorcentaje" class="form-control" min="0" value="0"required>
						</div>

            <div class="col-10 col-lg-10">
              <label for="recipient-name" class="col-form-label">Dirección:</label>
              <input type="text" name="txtDireccion" class="form-control" required>
            </div>

						<div class="col-2 col-lg-2">
							<label for="recipient-name" class="col-form-label">Número de empleados:</label>
							<input type="number" name="txtNumEmpleados" class="form-control" min="0" value="1" required>
						</div>
        </div>
				<br>
        </div>
				<br>
					<div class="col-12 col-lg-12 text-right">
						<button type="button" class="btn btn-outline-success" onclick="addEmpresas('')">Agregar</button>
					</div>
        </form>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

        function addEmpresas(){
          if (document.getElementById("formInsertaEmpresa").checkValidity()){
      			event.preventDefault();
      			var form = $("#formInsertaEmpresa")[0];
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
					else {
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
    </script>
  </body>
</html>
