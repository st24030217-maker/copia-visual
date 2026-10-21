<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Datos fiscales | Tintorerias MAX </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->

				 <section>
				 <ol class="breadcrumb">
					 <li> <a class="titulo"> CLIENTES FISCALES  </a> </li>
				 </ol>
				</section>

				<div class="contenedores">
			 	 <div class="row">
			 		 <div class="col-12 col-lg-12 text-right">
             <button type="button" class="btn btn-outline-info" id="btnFacturar" name="btnFacturar" onclick="window.location.href='ABCDatosFiscales.php';">
               <i class="fa fa-plus"></i> Agregar Datos fiscal
             </button>
			 		 </div>
			 	 </div>
			 </div>
       <br>
       <div class="contenedorDos Table-responsive">
         <table id="table" class="table table-hover text-center" style="width:100%;">
           <thead>
             <th>RFC</th>
             <th>Razón Social</th>
             <th>Colonia</th>
             <th>Estado</th>
             <th>Municipio</th>
             <th>Actualizar</th>
             <th>Eliminar</th>
           </thead>
         </table>
       </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/ClientesFiscales.js"></script>
  </body>
</html>
