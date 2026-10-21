<?php
require_once ("Backend/Equipos/AdmEquipos.php");
$AdmEquipos = new AdmEquipos();
$ListEquiposUsuario = $AdmEquipos->getEquiposUsuario();

if (sizeof($ListEquiposUsuario)>0) {
  ?>
  <div class="Table-responsive">
   <table id="tableEquipos" class="table text-center" style="color:black;">
     <thead>
       <tr>
         <th>Equipos</th>
         <th>Fecha Salida de Equipo</th>
         <th>Entregar Equipo</th>
       </tr>
     </thead>
     <tbody>

       <?php

          for($i = 0; $i < sizeof($ListEquiposUsuario); $i++){
          $idEquiposUsuario = $ListEquiposUsuario[$i]["idEquiposUsuario"];
          $id_sys_usuario = $ListEquiposUsuario[$i]["id_sys_usuario"];
          $Descripcion = $ListEquiposUsuario[$i]["Descripcion"];
          $FechaTomado = $ListEquiposUsuario[$i]["fechaTomado"];



          echo "
            <tr>
            <td style='color:#021764'><strong>$Descripcion</strong></td>
            <td>$FechaTomado</td>


            <td class='text-center'>
              <a class='pointer-link' onclick='regresarEquipo(\"$idEquiposUsuario\");' data-toggle='tooltip' title='Entregar'>
              <i class='fa fa-arrow-down fa-2x'></i>

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
    <div class='col-12 text-center'>No cuentas con equipos por entregar por el momento</div>

  </div><br><br>";
}

?>
