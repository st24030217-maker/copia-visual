<?php
$Estado = $_GET["estado"] ?? "";
$IdColor = $_GET["color"] ?? "";
$IdMarca = $_GET["marca"] ?? "";
$tamano = $_GET["tamano"] ?? "";
$FechaIni = $_GET["FechaIni"] ?? "";
$FechaFin = $_GET["FechaFin"] ?? "";
require_once("Backend/Inventario/Inventario.php");
$Inventario1 = new Inventario();
$ListInv = $Inventario1->getInventarioDiscos($Estado,$IdColor,$IdMarca,$tamano,$FechaIni,$FechaFin);

if (sizeof($ListInv)>0) {
  ?>
  <div class="table-responsive">
    <table id="TableDiscos" class="table text-center table-hover" style="color:black;" >
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Marca</th>
          <th>Colorimetro</th>
          <th>Tamaño</th>
          <th>Status</th>
          <th>Fecha Entrada</th>
          <th>Fecha Salida</th>
          <th>Fecha Finalizado</th>
          <th>Codigo Barras</th>
          <th>Piezas Utilizadas</th>
          <th>Piezas Restantes</th>
          <th>% Utilizado</th>
          <th>Ver Detalles</th>
        </tr>
      </thead>
      <tbody>
        <?php

        for ($i=0; $i < sizeof($ListInv) ; $i++) {
          $Marca = $ListInv[$i]["Marca"];
          $Colorimetro = $ListInv[$i]["Colorimetro"];
          $Status = $ListInv[$i]["Status"];
          $FechaEntrada = $ListInv[$i]["FechaEntrada"];
          $FechaSlida = $ListInv[$i]["FechaSlida"];
          $Codigo = $ListInv[$i]["Codigo"];
          $Tamaño = $ListInv[$i]["Tamaño"];
          $FechaFin = $ListInv[$i]["FechaFin"];
          $DiscosUsados = $ListInv[$i]["DiscosUsados"];
          $PorcentUtilizado = $ListInv[$i]["PorcentUtilizado"];
          $PorcentUtilizado = round($PorcentUtilizado,2);
          $PiezasRestantes = $ListInv[$i]["PiezasRestantes"];

          if ($Status == "2") {
            $varStatus = "Terminados";
          }elseif($Status == "1") {
            $varStatus = "Activos";
          }elseif($Status == "0") {
            $varStatus = "En Almacen";
          }
          if ($FechaFin == "") {
            $varFechaF = "Sin Finalizar";
          }else {
            $varFechaF = $FechaFin;
          }
          $txtTamano = "$Tamaño mm";
     /*      if ($PorcentUtilizado > 100) {
            $PorcentUtilizado = "100";
          } */
          if ($PiezasRestantes < 0) {
            $PiezasRestantes = "0";
          }
          echo "
          <tr>
           <td>$Codigo</td>
           <td>$Marca</td>
           <td>$Colorimetro</td>
           <td>$txtTamano</td>
           <td>$varStatus</td>
           <td>$FechaEntrada</td>
           <td>$FechaSlida</td>
           <td>$varFechaF</td>
           <td>
            <button type='button' class='btn btn-outline-info' onclick='modalCodigo(\"$Codigo\",\"$Marca\",\"$Colorimetro\",\"$txtTamano\");'>
             <i class='fa fa-barcode'></i><br>
             Codigo
            </button>
           </td>
           <td>$DiscosUsados</td>
           <td>$PiezasRestantes</td>
           <td>$PorcentUtilizado %</td>
           <td>
           <button type='button' class='btn btn-outline-info' onclick='getDetalleDiscos(\"$Codigo\",$DiscosUsados);'>
           <i class='fas fa-question'></i><br>
            </button>
           </td>
          </tr>
          ";
        }
         ?>

      </tbody>
    </table>
  </div>
  <?php
}else{
echo "
<div class='row'>
  <div class='col-12 text-center'>
    No hay resultados
  </div>
</div>
";
}
 ?>
