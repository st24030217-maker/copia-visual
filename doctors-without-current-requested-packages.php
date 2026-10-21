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
	<title>Dent Control</title>
</head>
  <s class="nav-md">
    <div class="container body" >
	    <?php include("menus.php");?>
        <div class="right_col" role="main">
          <div class="row">
            <div class="col-lg-12">
                <div class="e-card">
                    <div class="e-card-title">Doctores sin paquetes actuales (3 meses de diferencia)</div>
                    <div class="e-card-content">
                        <div id="t_doctors"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
	<?php include("scripts.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="scripts/Doctores/doctors-without-current-requested-packages.js"></script>
  </body>
</html>
