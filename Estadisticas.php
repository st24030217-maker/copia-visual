<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Estadisticas/Estadisticas.php");
$Estadisticas2 = new Estadisticas();
$CantidadOrdenes = $Estadisticas2->getNumeroTotalOrdenes();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li><a class="titulo"> Control de Laboratorio </a></li>
            </ol>
          </section>
          <div class="row">
            <div class="col-12 col-lg-2 offset-lg-10 text-center">
              <span style="font-size:15px;">Cantidad total de ordenes</span>
              <input type="text"  value="<?php echo $CantidadOrdenes ?>"class="form-control" disabled>
            </div>
          </div>
          <br>
          <div class="contenedores">
            <div class="table-responsive">
              <table class="table text-center table-hover" style="color:black;">
                <thead>
                  <tr>
                    <th>DOCTOR</th>
                    <th>CATEGORIA</th>
                    <th>PRODUCTO</th>
                    <th>PIEZAS</th>
                    <th>PACIENTE</th>
                    <th>REGISTRO</th>
                    <th>FECHE_ENTREGA_SOLICITADA</th>
                    <th>DIAS TRANSCURRIDOS</th>
                    <th>SERIE</th>
                    <th>TIPO DOCTOR</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                  require_once("Backend/Estadisticas/Estadisticas.php");
                  $Estadisticas = new Estadisticas();
                  $DatosControl = $Estadisticas->getControlLaboratorio();
                  for ($i=0; $i <sizeof($DatosControl); $i++) {
                    $Doctor = $DatosControl[$i]["Doctor"];
                    $ApellidoMaterno = $DatosControl[$i]["ApellidoMaterno"];
                    $ApellidoPaterno = $DatosControl[$i]["ApellidoPaterno"];
                    $Descripcion = $DatosControl[$i]["Descripcion"];
                    $Producto = $DatosControl[$i]["Producto"];
                    $Piezas = $DatosControl[$i]["Piezas"];
                    $Registro = $DatosControl[$i]["Registro"];
                    $Nombre = $DatosControl[$i]["Nombre"];
                    $Apellidos = $DatosControl[$i]["Apellidos"];
                    $Fecha_entrega_solicitada = $DatosControl[$i]["Fecha_entrega_solicitada"];
                    $Serie = $DatosControl[$i]["Serie"];
                    $Externo = $DatosControl[$i]["Externo"];
                    $DiasTranscurridos = $DatosControl[$i]["DiasTranscurridos"];


                    if ($Externo == "1") {
                      $varExterno = "Externo";
                    }
                    else {
                      $varExterno = "Interno";
                    }

                    if ($DiasTranscurridos < "0") {
                      $color = "red;";
                    }elseif ($DiasTranscurridos >= "0" && $DiasTranscurridos < "3") {
                      $color = "#E5F040;";
                    }else {
                      $color = "#53F040;";
                    }
                    echo "
                    <tr>
                      <td>$Doctor $ApellidoPaterno $ApellidoMaterno</td>
                      <td>$Descripcion</td>
                      <td>$Producto</td>
                      <td>$Piezas</td>
                      <td>$Nombre $Apellidos</td>
                      <td>$Registro</td>
                      <td>$Fecha_entrega_solicitada</td>
                      <td style='background-color:$color'>$DiasTranscurridos</td>
                      <td>$Serie</td>
                      <td>$varExterno</td>

                    </tr>
                    ";
                  }
                   ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
  </body>
</html>
