<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Cuestionarios | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->

				 <section>
				 <ol class="breadcrumb">
					 <li> <a class="titulo"> FACTURACIÓN </a> </li>
				 </ol>
				</section>

				<div class="contenedores">
			 	 <div class="row">
           <div class="col-6 col-lg-3">
             <select class="select2 form-control" name="slcNotas" id="slcNotas">
               <option value="">- SELECCIONE UNA NOTA -</option>

             </select>
           </div>
           <div class="col-6 col-lg-3">
             <select class="select2 form-control" name="slcCFDI" id="slcCFDI">
               <option value="">- SELECCIONE EL USO DE CFDi -</option>

             </select>
           </div>
           <div class="col-6 col-lg-3">
             <select class="select2 form-control" name="slcDatosF" id="slcDatosF">
               <option value="">- SELECCIONE UN DATO FISCAL -</option>

             </select>
           </div>
			 		 <div class="col-12 col-lg-3">
             <button type="button" class="btn btn-outline-info" id="btnFacturar" name="btnFacturar">
               <i class="fa fa-file-text-o"></i> Facturar
             </button>
			 		 </div>
			 	 </div>
			 </div>
       <br>
       <div class="contenedorDos Table-responsive">
         <table>

         </table>
       </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/Facturas.js"></script>
  </body>
</html>
