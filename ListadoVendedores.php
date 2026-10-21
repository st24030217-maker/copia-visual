<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Usuarios/Usuarios.php");

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
             <li> <a class="titulo"> Listado de Vendedores </a> </li>
           </ol>
         </section>

         <div class="contenedores">
           <div class="table-responsive">
             <table class="table text-center table-hover" style="color:black;">
							 <thead>
							 	<tr>
							 		<th>Vendedor</th>
									<th>Clientes Activos</th>
									<th>Paquetes Activos</th>
							 	</tr>
							 </thead>
							 <tbody>
							 	<?php
								require_once("Backend/Usuarios/Usuarios.php");
								$Usuarios =  new Usuarios();
								$ListVend = $Usuarios->getusuariosVendedor();
								for ($i=0; $i < sizeof($ListVend) ; $i++) {
									$id_sys_usuario = $ListVend[$i]["id_sys_usuario"];
									$Nombre = $ListVend[$i]["Nombre"];

									$Us = new Usuarios();
									$CantDoc = $Us->getDoctoresXVendActivo($id_sys_usuario);

									$Us2 = new Usuarios();
									$CantPaq = $Us2->PaquetesActivosVendedor($id_sys_usuario);
									echo "
									<tr>
										<td>$Nombre</td>
										<td>$CantDoc</td>
										<td>$CantPaq</td>
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
