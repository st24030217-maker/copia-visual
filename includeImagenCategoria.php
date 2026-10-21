<?php
$idCategoriasImg = $_GET["idCat"] ?? "";
require_once("Backend/Categorias/Categorias.php");
$CategoriasImg = new Categorias();
 ?>


<div class="row contenedores">
<?php

$ListImgCategoria = $CategoriasImg->getImagenCategoria($idCategoriasImg);
 for ($i=0; $i <sizeof($ListImgCategoria) ; $i++) {
   $Imagen = $ListImgCategoria[$i]["Imagen"];
   if ($Imagen != "") {
     echo "
     <div  id='Id$idCategorias1' class='col-12 col-lg-12 text-center'>
     <div class''row>
     <div class='col-10 col-lg-10 text-center' id='divImgActual'>
     <h6>Imagen Actual</h6>
       <img src='Archivos/imagenCategorias/$Imagen' style='height:100px; width:100px; border-radius:10px;'>
     </div>

     <div class='col-2 col-lg-2 text-center'>
        <br>
        <br>

        <a class='' style='color:#641E16'; onclick='deleteImgCategoriafunction(\"$idCategoriasImg\");' data-toggle='tooltip' title='Eliminar Imagen'>
        <i class='fa fa-trash-o fa-3x'></i></a>
      </div>
     </div>

     </div>
     ";
   }else {
     echo "
     <div  id='Id$idCategorias1' class='col-12 col-lg-12'>
       <div class='col-12 col-lg-12 text-center'>
       <h6>No contiene Imagen</h6>
       </div>
     </div>
     ";

   }

 }
 ?>

</div>
