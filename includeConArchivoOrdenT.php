<?php
$IdOrdenTemp= $_GET["IdOrden"] ?? "";
require_once("Backend/Ordenes/Ordenes.php");
$Ordenes1 = new Ordenes();
$ConArchivo = $Ordenes1->getNombreArchivoOrden($IdOrdenTemp);
$NameArchivo = $ConArchivo[0]["Archivo"];
$IdDoctorArc = $_GET["IdDoctor"] ?? "";
 ?>
 <div class="contenedores">

       <div class="row">
         <div class="col-12 text-center" >
           <h5>Archivo</h5>
           <!-- <span>Para poder enviar el modelo tienes que descargar e imprimir nuestra GUIA para que nos hagas llegar el modelo por medio de algun servicio de paqueteria</span> -->
           <br><br>
         </div>
         <div class="col-12 col-lg-4 offset-lg-4">
           <?php if ($NameArchivo != ""): ?>
             <div class="col-12 col-lg-12 text-center">
               <h4 style="color:green;">Archivo Actual : <?php echo $NameArchivo ?></h4>
             </div>
           <?php endif; ?>
           <?php if ($NameArchivo == ""): ?>
             <div class="col-12 col-lg-12 text-center">
               <h4 style="color:red;"> Archivo no subido </h4>
             </div>
           <?php endif; ?>
           <a href="#" class="btn btn-outline-info" id="btnSubirArchivo" onclick="AbrirFile();"> SUBIR ARCHIVO</a>
           <form class="" id="formSubirArchivo" action="Backend/Ordenes/App.php" method="post">
             <input type="text" name="txtIdOrdenTemp" value="<?php echo $IdOrdenTemp ?>" style="display:none;">
             <input type="text" name="op" id="op" value="insertarArchivo" style="display:none;">
             <input type="text" name="IdDoctorArchivo"  id="IdDoctorArchivo" value="<?php echo $IdDoctorArc ?>" style="display:none;">
             <input type="file" accept="image/jpeg,image/png,image/jpg,.docx,application/pdf,.zip" name="inpfiles" id="inpfiles" onchange="SubirArchivoOrden('')" style="display:none;">
           </form>
         </div>
       </div>
 </div>

 <?php echo "
 <script type='text/javascript'>
  $('#ArchivoOrden').text('$NameArchivo');
 </script>
 ";
  ?>
