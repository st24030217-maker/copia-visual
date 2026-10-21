<?php
require_once ("Backend/Equipos/AdmEquipos.php");
$AdmEquipos = new AdmEquipos();
$ListEquiposTemp = $AdmEquipos->getEquiposTemp();

if (sizeof($ListEquiposTemp)>0) {
  ?>
  <div class="">

  </div>
  <div class="Table-responsive">
   <table id="tableEquiposTemp" class="table text-center" style="color:black;">
     <thead>
       <tr>
         <th>Equipos</th>
         <th>Eliminar de la Lista</th>
       </tr>
     </thead>
     <tbody>

       <?php

          for($i = 0; $i < sizeof($ListEquiposTemp); $i++){
          $idEquiposUsuario = $ListEquiposTemp[$i]["idEquiposUsuario"];
          $idUsuario = $ListEquiposTemp[$i]["idUsuario"];
          $Descripcion = $ListEquiposTemp[$i]["Descripcion"];

          echo "
            <tr>
            <td style='color:#021764'> <strong>$Descripcion</strong> </td>

            <td class='text-center'>
              <a class='pointer-link' onclick='deleteListaEquiposUsu(\"$idEquiposUsuario\");' data-toggle='tooltip' title='Eliminar de la Lista'>
              <i class='fa fa-trash fa-2x'></i>

            </tr>
          ";
        }
        ?>
     </tbody>
   </table>
  </div>
  <?php
}else {
  echo "<div class='row'>
    <div class='col-12 text-center'>No se ha agregado ningun Equipo</div>
  </div>";
}

?>
