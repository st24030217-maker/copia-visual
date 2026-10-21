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
           <li> <a class="titulo"> Equipos en Préstamo </a> </li>
         </ol>
        </section>
				<?php
				require_once ("Backend/Equipos/AdmEquipos.php");
				$AdmEquipos = new AdmEquipos();
				$ListEquiposP = $AdmEquipos->getEquiposPrestamo();
				if (sizeof($ListEquiposP)>0) {

				 ?>
        <div class="col-12 col-lg-12 contenedores" >

          <div class="table-responsive">
          <table id="nombre" class="table text-center table-hover" style="color:black;">
            <thead>
              <tr>
                <th>Usuario </th>
                <th>Descripción Equipo</th>
								<th>Fecha Salida Equipo</th>

              </tr>
            </thead>
            <tbody>

              <?php

                 for($i = 0; $i < sizeof($ListEquiposP); $i++){

                 $usuario = $ListEquiposP[$i]["usuario"];
                 $Descripcion = $ListEquiposP[$i]["Descripcion"];
                 $fechaTomado = $ListEquiposP[$i]["fechaTomado"];

                 echo "
                   <tr>
                   <td>$usuario</td>
                   <td>$Descripcion</td>
                   <td>$fechaTomado</td>

                   </tr>
                 ";
               }
               ?>
            </tbody>
          </table>
        </div>
				<?php
			}else {
				echo "<div class='row'>
				<div class='col-12 text-center contenedores'>
				<h5>No hay Equipos en Prestamo</h5>
				</div>
				</div>";
			}

			?>
        </div>


        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
  </body>
</html>
