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
           <li> <a class="titulo"> Empleados </a> </li>
         </ol>
        </section>

			 <br>
			 <div class="contenedores col-12 col-lg-12">
           <div class="Table-responsive">
           <table id="tablaEmp" class="table text-center table-hover" style="color:black;">
             <thead>
               <tr>
                 <th>Nombre de la Empresa </th>
                 <th>Dirección</th>
 								 <th>Telefono</th>
								 <th>Numero de Empleados</th>
								 <th>Ver Empleados</th>
               </tr>
             </thead>
             <tbody>

               <?php
                  require_once ("Backend/Empresas/AdmEmpresas.php");
                  $AdmEmpresas = new AdmEmpresas();
                  $ListEmpresas = $AdmEmpresas->getEmpresas();
                  for($i = 0; $i < sizeof($ListEmpresas); $i++){

                  $idEmpresas = $ListEmpresas[$i]["idEmpresas"];
                  $Empresa = $ListEmpresas[$i]["Empresa"];
 								  $Telefono = $ListEmpresas[$i]["Telefono"];
                  $Direccion = $ListEmpresas[$i]["Direccion"];
                  $Porcentaje = $ListEmpresas[$i]["Porcentaje"];
									$NumeroEmpleados = $ListEmpresas[$i]["NumeroEmpleados"];
                  echo "
                    <tr>
                    <td>$Empresa</td>
                    <td>$Direccion</td>
 									  <td>$Telefono</td>
										<td>$NumeroEmpleados</td>


										<td class='text-center'>
											<a class='btn btnIconoEdit'  onclick='detalleEmpleados(\"$idEmpresas\");' data-toggle='tooltip' title='Ver Empleados'>
											<i class='fa fa-eye fa-2x'></i></td>

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

    function detalleEmpleados(idEmpresas){
      if (idEmpresas != "") {
        window.location.href=`EmpleadosPorEmpresaVino.php?idEmpresasEmp=${idEmpresas}`;
      }
    }
    </script>
  </body>
</html>
