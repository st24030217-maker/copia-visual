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
	<title>Dent Clinica Dental | Representantes de Venta</title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <ol class="breadcrumb">
           <li> <a class="titulo"> Representantes de Venta </a> </li>
         </ol>


         <div class="contenedores">
           <div class="Table-responsive">
           <table id="nombre" class="table text-center table-hover" style="color:black;">
             <thead>
               <tr>
                 <th>Usuario</th>
                 <th>Nombre</th>
                 <th>Correo</th>
                 <th>Ver Detalles</th>


               </tr>
             </thead>
             <tbody>

               <?php
                  require_once ("Backend/RepresentantesVenta/AdmRepresentantesVenta.php");
                  $AdmRepresentantesVenta = new AdmRepresentantesVenta();
                  $ListRepresentantes= $AdmRepresentantesVenta->getRepresentantes();
                  for($i = 0; $i < sizeof($ListRepresentantes); $i++){

                  $id_sys_usuario = $ListRepresentantes[$i]["id_sys_usuario"];
                  $usuario = $ListRepresentantes[$i]["usuario"];
                  $Nombre = $ListRepresentantes[$i]["Nombre"];
                  $Correo = $ListRepresentantes[$i]["Correo"];


                  echo "
                    <tr>
                    <td>$usuario</td>
                    <td>$Nombre</td>
                    <td>$Correo</td>

                    <td class='text-center'>
  										<a class='btn btnIconoEdit'  onclick='detailRepresentante(\"$id_sys_usuario\",\"$Nombre\");' data-toggle='tooltip' title='Ver Detalles'>
  										<i class='fa fa-info fa-2x'></i></td>

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
    <script type="text/javascript">
    function detailRepresentante(id_sys_usuario,Nombre){
      if (id_sys_usuario != "") {
        window.location.href=`DetalleRepresentantes.php?idRepresentante=${id_sys_usuario}&Nombre=${Nombre}`;
      }
    }
    </script>
  </body>
</html>
