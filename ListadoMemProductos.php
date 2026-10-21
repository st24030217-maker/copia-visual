<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idMembre="";
$Tipo="";
if (isset($_POST["nptMem"])) {
  $idMembre=$_POST["nptMem"] ?? "";
  $Tipo=$_POST["nptTipo"] ?? "";
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
            <li><a class="titulo">LISTADO DE PRODUCTOS</a> </li>
          </ol>
         </section>
         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-6 offset-lg-3 text-center">
               <h6>Membresia: <label style="font-size:30px;"><?php echo $Tipo; ?></label> </h6>
             </div>
             <div class="col-12 col-lg-3 text-right">
               <button type="button" class="btn btn-outline-success" onclick="window.location.href='ConfigProductos.php'">
                 <i class="fa fa-arrow-left"></i>
                Regresar</button>
             </div>
           </div>
          </div>
          <br>
          <input type="text" name="nptId" id="nptId" value="<?php echo $idMembre; ?>" style="display:none;">
          <div class="contenedorDos table-responsive">
						<button type="button" class="btn btn-outline-success" name="btnAgregar" id="btnAgregar" onclick="AgregarCampo();"> <i class="fa fa-plus"></i> Agregar producto</button>
            <table class="table table-hover" id="tabla">
              <thead>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Puntos</th>
                <th></th>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/ListadoMemProductos.js"></script>
  </body>
</html>
