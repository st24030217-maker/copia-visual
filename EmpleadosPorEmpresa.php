<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idEmpresaPorEmpleado = $_GET["idEmpresasEmp"] ?? "";
require_once("Backend/Empresas/AdmEmpresas.php");
$AdmEmpresas = new AdmEmpresas();
$NombreEmp = $AdmEmpresas->getNombreEmpresa($idEmpresaPorEmpleado);
for ($i=0; $i <sizeof($NombreEmp) ; $i++) {
$Empresa = $NombreEmp[$i]["Empresa"];
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
						<li> <a class="titulo"> Listado de Empleados para la empresa <?php echo $Empresa ?> </a> </li>
					</ol>
				 </section>

         <div class="contenedores">
					 <div class="row">
						 <div class="col-12 col-lg-12 text-right">
               <a onclick="window.location.href='ListaEmpresas.php'"><button class="btn btn-outline-success "  type="button" name="button">Regresar</button></a>
						 </div>
					 </div>
		  	</div>
				<br>

							<?php
							require_once ("Backend/Empresas/AdmEmpresas.php");
					 	 $AdmEmpresas = new AdmEmpresas();
					 	 $ListEmpleadosEmpresa = $AdmEmpresas->getEmpleadosPorEmpresa($idEmpresaPorEmpleado);
						 if (sizeof($ListEmpleadosEmpresa)>0) {

							 ?>
							<div class="contenedores col-12 col-lg-12">
									<div class="Table-responsive">
									<table id="nombre" class="table text-center table-hover" style="color:black;">
										<thead>
											<tr>
												<th>Nombre</th>
												<th>Email</th>
												<th>Celular</th>


											</tr>
										</thead>
										<tbody>

											<?php

												 for($i = 0; $i < sizeof($ListEmpleadosEmpresa); $i++){

												 $idEmpleadoEmpresa = $ListEmpleadosEmpresa[$i]["idEmpleadoEmpresa"];
												 $Nombre = $ListEmpleadosEmpresa[$i]["Nombre"];
												 $Correo = $ListEmpleadosEmpresa[$i]["Correo"];
												 $Celular = $ListEmpleadosEmpresa[$i]["Celular"];

												 echo "
													 <tr>
													 <td>$Nombre</td>
													 <td>$Correo</td>
													 <td>$Celular</td>



													 </tr>
												 ";
											 }
											 ?>
										</tbody>
									</table>
								</div>
							</div>
							<?php
						}else {
							echo "
							<div class='contenedores'>
							<div class='row'>
						    <div class='col-12 text-center'>No contiene Empleados</div>
						  </div>
							</div>";
							}
							 ?>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
  </body>
</html>
