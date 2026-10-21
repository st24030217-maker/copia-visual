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
               <a onclick="window.location.href='Empleados.php'"><button class="btn btn-outline-success "  type="button" name="button">Regresar</button></a>
						 </div>
					 </div>
		  	</div>
				<br>
          <form id="formEmpleado"  action="Backend/Empresasl/App.php" method="post">
            <input type="text" class="form-control" id="op" name="op" value="updateVino" style="display:none;">

						<?php
						require_once ("Backend/Empresas/AdmEmpresas.php");
						$AdmEmpresas = new AdmEmpresas();
						$ListEmpleadosEmpresa = $AdmEmpresas->getEmpleadosPorEmpresa2($idEmpresaPorEmpleado);
						if (sizeof($ListEmpleadosEmpresa)) {
							// code...

						?>
            <div class="contenedores col-12 col-lg-12">
                <div class="Table-responsive">
                <table id="nombre" class="table text-center table-hover" style="color:black;">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Celular</th>
                      <th>Asistió</th>

                    </tr>
                  </thead>
                  <tbody>

                    <?php

                       for($i = 0; $i < sizeof($ListEmpleadosEmpresa); $i++){

                       $idEmpleadoEmpresa = $ListEmpleadosEmpresa[$i]["idEmpleadoEmpresa"];
                       $Nombre = $ListEmpleadosEmpresa[$i]["Nombre"];
                       $Correo = $ListEmpleadosEmpresa[$i]["Correo"];
                       $Celular = $ListEmpleadosEmpresa[$i]["Celular"];
                       $VinoEmpleado = $ListEmpleadosEmpresa[$i]["VinoEmpleado"];

                       if ($VinoEmpleado == "1") {
                         $ch = "checked";
                       }else {
                         $ch = "";
                       }

											 if ($VinoEmpleado == "1") {
												 $ch2 = "disabled";
											 }else {
												 $ch2 = "";
											 }

                       echo "
                         <tr>
                         <td>$Nombre</td>
                         <td>$Correo</td>
                         <td>$Celular</td>


                         <td> <input type='checkbox' id='checkVino$idEmpleadoEmpresa' class ='form-control' onclick='updateVinoEmpleado(\"$idEmpleadoEmpresa\",\"$VinoEmpleado\");'
												 $ch> </td>


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
						</div>";					}
						 ?>
          </form>


        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
    $(document).ready(function(){
    });



      function updateVinoEmpleado(idEmpleadoEmpresa,VinoEmpleado){
								Swal.fire({
				  title: 'Si prosigue se modificaran los datos del Empleado, ¿Desea continuar?',
				  showDenyButton: true,
				  confirmButtonText: 'Continuar',
				  denyButtonText: 'Salir',
				}).then((result) => {
				  /* Read more about isConfirmed, isDenied below */
				  if (result.isConfirmed) {
						if (VinoEmpleado == 0) {
							var vino1 ="1";
						}else {
							vino1 = "0";
						}
						$.ajax({
						type:"POST",
						url:"Backend/Empresas/App.php",
						data:"op=updateVino"+
						"&VinoEmpleado="+vino1+"&idEmpleadoEmpresa="+idEmpleadoEmpresa,
						success:function(data){
							if(data=="1"){
								Alerta("success","Operacion Exitosa");
								setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
									location.reload();
								}, 1500);
							}else{
								Alerta("error","No se Realizo Correctamente");
								setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
									location.reload();
								}, 1500);
							}
				 },
					error:function(e){
					 alert(e.responseText);

						}
					});
				  } else if (result.isDenied) {
						window.location.reload();

						return false;

				  }
				})

      }

    </script>
  </body>
</html>
