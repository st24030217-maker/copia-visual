<?php
  $idOrden = $_GET["idOrden"] ?? "";
  require_once("Backend/Ordenes/Ordenes.php");
  $COrdenes3 = new Ordenes();
  $OTDetalle2 = $COrdenes3->getOrdenTemporalDetalle($idOrden);
  for ($i=0; $i < sizeof($OTDetalle2) ; $i++) {
    $Tipos_colorimetros_color_id = $OTDetalle2[$i]["Tipos_colorimetros_color_id"];
  }
 ?>

   <div class="row scrollable">
     <div class="col-12 col-lg-12 text-center">
       <h5> Colorimetro - VITA CLASSIC </h5>
     </div>
     <div class="col-12 text-center" style='margin-top:10px;padding:5px; overflow:auto;display:flex;'>
     <?php
     require_once("Backend/Colorimetro/Colorimetro.php");
     $Colorimetro = new Colorimetro();
     $Col = $Colorimetro->getColorimetroPorProductoOrden($idOrden);
     for ($i=0; $i < sizeof($Col) ; $i++) {
       $Tipos_Colorimetros_Color_Id = $Col[$i]["Tipos_Colorimetros_Color_Id"];
       $Tipos_Colorimetros_Marca_Id = $Col[$i]["Tipos_Colorimetros_Marca_Id"];
       $Colorimetro = $Col[$i]["Colorimetro"];
       $Equivalente = $Col[$i]["Equivalente"];
       $Color = $Col[$i]["Color"];
       $Color_F = $Col[$i]["Color_F"];
       $Imagen = $Col[$i]["Imagen"];


       $Colorimetro2 = new Colorimetro();
       $ColSelected = $Colorimetro2->getColorimetroSeleccionadoOrdenT($idOrden,$Tipos_Colorimetros_Color_Id);

       if ($ColSelected == "1") {
         $ColorBtn = "background:#81CBFF;";

       }else {
         $ColorBtn = "background:white;";
       }

       echo "
        <div class='row'>
        <div class='col-12 text-center' >
          <div style='border:0.5px solid #fff;border-radius:7px;padding:10px; margin-left:8px; $ColorBtn' id='$Tipos_Colorimetros_Color_Id' onclick='updateColorColorimetroOrdenT(\"$Tipos_Colorimetros_Color_Id\")'>
            <img src='Archivos/imagenColorimetro/$Imagen' width='50' height='50'>
            <span style='color:#212121 !important'>$Colorimetro</span>
          </div>
        </div>
        </div>
       ";
     }
      ?>
         </div>
   </div>

 <?php

echo "
<script type='text/javascript'>
  $('#inpIdColorimetro').val('$Tipos_colorimetros_color_id');
</script>
";
  ?>
