<?php
if (!isset($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off' ) {
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
  <body class="nav-md" style="background: linear-gradient(15deg, rgba(0,0,0,1) 0%, rgba(37,44,54,1) 61%, rgba(47,48,52,1) 100%);">
    <div class="container body" >
        <div class="right_col" role="main">
         <div class="row">
					 <div class="col-12 text-center" style="margin-top:15vh">
					 	<!-- <h4>LOGO</h4> -->
						<img src="Archivos/logoDebt2.png" alt="Logo" height="400vh" width="800vh">
					 </div>
         	<div class="col-6 text-center">
         	<a onclick="window.location.href='EquiposOb.php'"><button class="btn btn-three btn-lg" style="padding:20px" type="button" name="button">OBTENER EQUIPOS</button></a>
         	</div>
         	<div class="col-6 text-center">
         	<a onclick="window.location.href='EquiposRegr.php'"><button class="btn btn-three btn-lg" style="padding:20px" type="button" name="button">ENTREGAR EQUIPO</button></a>
         	</div>
         </div>
        </div>
      </div>
    </div>
		<?php include("scripts.php"); ?>
  </body>
</html>
