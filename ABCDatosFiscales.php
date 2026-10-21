<?php
$op = "InsertDatosFiscales";
$id = "";
if (isset($_POST["nptIdDato"])) {
  $op = "UpdateDatosFiscales";
  $id = $_POST["nptIdDato"] ?? "";
}
 ?><!DOCTYPE html>
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
             <button type="button" class="btn btn-info" id="btnReturn" name="btnReturn" onclick="window.location.href='ClientesFiscales.php'">
               <i class="fa fa-arrow-left"></i> Regresar
             </button>
  		 		 </div>
  		 	  </div>
  		   </div>
         <br>
         <div class="contenedorDos">
           <form name="frmDatos" id="frmDatos" action="Backend/Facturacion/App.php" method="post">
             <input type="text" name="op" id="op" value="<?php echo $op; ?>" style="display:none;">
             <input type="text" name="id_dato" id="id_dato" value="<?php echo $id; ?>" style="display:none;">
             <h2 style="font-size:30px;">Datos fiscales</h2>
             <br>
             <div class="row">
               <div class="col-6 col-lg-4" style="margin-top:5px;">
                 <label>RFC</label>
                 <input class="form-control" type="text" name="nptRFC" id="nptRFC" placeholder="RFC del cliente fiscal" onkeyup="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()">
               </div>
               <div class="col-6 col-lg-4" style="margin-top:5px;">
                 <label>RAZÓN SOCIAL</label>
                 <input class="form-control" type="text" name="nptRazon" id="nptRazon" placeholder="Razón social"  onkeyup="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()" required>
               </div>
               <div class="col-12 col-lg-4" style="margin-top:5px;">
                 <label>CALLE</label>
                 <input class="form-control" type="text" name="nptCalle" id="nptCalle" placeholder="Calle" required>
               </div>
             </div>
             <br>
             <div class="row">
               <div class="col-6 col-lg-4" style="margin-top:5px;">
                 <label>N° EXTERIOR</label>
                 <input class="form-control" type="number" name="nptExterior" id="nptExterior" placeholder="Número exterior" required>
               </div>
               <div class="col-6 col-lg-4" style="margin-top:5px;">
                 <label>N° INTERIOR</label>
                 <input class="form-control" type="number" name="nptInterior" id="nptInterior" placeholder="Número interior" >
               </div>
               <div class="col-12 col-lg-4" style="margin-top:5px;">
                 <label>CÓDIGO POSTAL</label>
                 <input class="form-control" type="number" name="nptCodigo" id="nptCodigo" placeholder="Código postal" required>
               </div>
             </div>
             <br>
             <div class="row">
               <div class="col-6 col-lg-6" style="margin-top:5px;">
                 <label>CORREO</label>
                 <input class="form-control" type="text" name="nptCorreo" id="nptCorreo" placeholder="Correo" required>
               </div>
               <div class="col-6 col-lg-6" style="margin-top:5px;">
                 <label>COLONIA</label>
                 <input class="form-control" type="text" name="nptColonia" id="nptColonia" placeholder="Colonia" required>
               </div>
             </div>
             <br>
             <div class="row">
               <div class="col-12 col-lg-6" style="margin-top:5px;">
                 <label>ESTADO</label>
                 <select class="form-control select2" name="slcEstado" id="slcEstado">
                 </select>
               </div>
               <div class="col-12 col-lg-6" style="margin-top:5px;">
                 <label>CIUDAD</label>
                 <select class="form-control select2" name="slcMunicipio" id="slcMunicipio">
                 </select>
               </div>
             </div>
           </form>
           <br><br>
         </div>
         <div class="text-center">
           <button type="button" class="btn btn-outline-info" name="btnGuardar" id="btnGuardar">Guardar</button>
         </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/ABCDatosFiscales.js"></script>
  </body>
</html>
