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
         <?php
         $idRepresentante = $_GET["idRepresentante"] ?? "";
         $Nombre = $_GET["Nombre"] ?? "";

          ?>

         <ol class="breadcrumb">
           <li> <a class="titulo"> Listado de Empresas para el representante  <?php echo $Nombre ?> </a> </li>
         </ol>

         <div class="contenedores ">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <a onclick="window.location.href='RepresentantesVenta.php'"><button type="button" class="btn btn-outline-success" >Regresar</button></a>
             </div>
           </div>
        </div>
         <br><br>
         <div class="contenedores">
           <div class="Table-responsive">
           <table id="nombre" class="table text-center table-hover" style="color:black;">
             <thead>
               <tr>
                 <th>Empresa</th>
                 <th>Telefono</th>
                 <th>Dirección</th>


               </tr>
             </thead>
             <tbody>

               <?php
                  require_once ("Backend/RepresentantesVenta/AdmRepresentantesVenta.php");
                  $AdmRepresentantesVenta = new AdmRepresentantesVenta();
                  $ListEmpresaRepresentante= $AdmRepresentantesVenta->getRepresentanteEmpresa($idRepresentante);
                  for($i = 0; $i < sizeof($ListEmpresaRepresentante); $i++){

                  $EmpresasUsuarios = $ListEmpresaRepresentante[$i]["EmpresasUsuarios"];
                  $Empresa = $ListEmpresaRepresentante[$i]["Empresa"];
                  $Telefono = $ListEmpresaRepresentante[$i]["Telefono"];
                  $Direccion = $ListEmpresaRepresentante[$i]["Direccion"];


                  echo "
                    <tr>
                    <td>$Empresa</td>
                    <td>$Telefono</td>
                    <td>$Direccion</td>



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
