<?php
  $idDisco = $_GET["idDisco"] ?? "";

  require_once("Backend/Inventario/Inventario.php");
  $Inventario = new Inventario();
  $DiscosDetalle = $Inventario->getDetalleDisco($idDisco);

if (sizeof($DiscosDetalle)>0) {
  ?>
  <div class="Table-responsive">
    <table  class="table text-center table-hover" style="color:black;">
      <thead>
        <tr>
          <th>Orden</th>
          <th>Fecha Asignado</th>
        </tr>
      </thead>
      <tbody>
        <?php
        for ($i=0; $i < sizeof($DiscosDetalle) ; $i++) {
          $IdOrden = $DiscosDetalle[$i]["Ordenes_trabajo_id"];
          $fecha = $DiscosDetalle[$i]["fecha"];
          echo "
          <tr>
           <td>$IdOrden</td>
           <td>$fecha</td>
          </tr>
          ";
        }
         ?>
      </tbody>
    </table>
  </div>
  <?php
}else {
  echo "

  <div class='row'>
  <div class='col-12 text-center'>
    <span>No se encontraron datos</span>
  </div>
  </div>
  ";
}
 ?>
