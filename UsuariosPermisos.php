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
            <li> <a class="titulo"> Listado de Perfiles </a> </li>
          </ol>
         </section>

				<br>
						<div class="contenedores">
							<div class="Table-responsive">
							<table id="nombre" class="table text-center table-hover" style="color:black;">
								<thead>
									<tr>
										<th>Perfil</th>
                    <th>Ver Permisos</th>
									</tr>
								</thead>
								<tbody>

									<?php
										 require_once ("Backend/Usuarios/Usuarios.php");
										 $Usuarios = new Usuarios();
										 $ListPerfiles= $Usuarios->getPerfiles();
										 for($i = 0; $i < sizeof($ListPerfiles); $i++){

										 $id_perfil = $ListPerfiles[$i]["id_perfil"];
										 $perfil = $ListPerfiles[$i]["perfil"];

										 echo "
											 <tr>
											 <td>$perfil</td>

											 <td class='text-center'>
												 <button class='btn btnIconoEdit'  onclick='verPermisos(\"$id_perfil\");' data-toggle='tooltip' title='Ver Permisos'>
												 <i class='fa fa-pencil-square'></i>
												 </button></td>
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
		$(document).ready(function(){

		});
    function verPermisos(idPerfil){
      var idPerfil2 = idPerfil;
      window.location.href=`Permisos.php?idPerfil=${idPerfil2}`;
    }
    </script>
  </body>
</html>
