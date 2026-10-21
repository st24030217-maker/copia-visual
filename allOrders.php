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
  <style media="screen">
  .e-toolbar .e-toolbar-items.e-tbar-pos {
      display: block;
      height: 60px;
  }
  </style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">

         <!-- CONTENIDO PAGINA -->
         <section>
           <ol class="breadcrumb">
             <li> <a class="titulo">Ordenes por Doctores</a> </li>
           </ol>
         </section>
         <div class="row">
           <div class="col-lg-12">
             <h6>Busque algún doctor para mostrar sus órdenes</h6>
             <select class="form-control" id="s_searchDoctor"></select>
           </div>
           <div class="col-lg-12">
             <div id="tableD"></div>
           </div>
         </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
    <script type="text/x-jsrender" id="btnGoOrderTemplate">
      ${btnGoOrderSF(data)}
    </script>
		<?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js" integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="scripts/Ordenes/allOrders.js" charset="utf-8"></script>
  </body>
</html>
