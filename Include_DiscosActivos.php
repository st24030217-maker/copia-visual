<?php
$Estado = $_GET["estado"] ?? "";
$fechaInicio = $_GET["fechaInicio"] ?? "";
$fechaFin = $_GET["fechaFin"] ?? "";

require_once("Backend/Inventario/Inventario.php");
$Inventario1 = new Inventario();
$ListInv = $Inventario1->getInventarioDiscosFecha($Estado,$fechaInicio,$fechaFin);

require_once("Backend/Configuracion/Configuracion.php");
$Configuracion = new Configuracion();
$PiezasPorDisco = $Configuracion->getPiezasPorDisco();
$PiezasPorDisco = $PiezasPorDisco[0]["PromedioCantidadPorDisco"];
if (sizeof($ListInv)>0) {
?>
<div class="table-responsive">
  <table  class="table text-center table-hover" style="color:black;">
    <thead>
      <tr>
        <th>Código</th>
        <th>Marca</th>
        <th>Colorimetro</th>
        <th>Medida</th>
        <th>Status</th>
        <th>Fecha Salida</th>
        <th>Piezas Autorizadas (usadas)</th>
        <th>Porcentaje autorizado.</th>
        <th>Piezas restantes (Por autorizar) </th>
        <th></th>
        <th></th>
        <th></th>
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
        $idLab_Discos_Inventario = $ListInv[$i]["idLab_Discos_Inventario"];
        $Codigo = $ListInv[$i]["Codigo"];
        $Tamaño = $ListInv[$i]["Tamaño"];
        $Utilizadas = $ListInv[$i]["Utilizadas"];
        $PorcentUtilizado = ((100 / $PiezasPorDisco)* $Utilizadas);
        $Restante = ($PiezasPorDisco - $Utilizadas);

        if ($Status == "2") {
          $varStatus = "Terminados";
        }elseif($Status == "1") {
          $varStatus = "Activos";
        }elseif($Status == "0") {
          $varStatus = "En Almacen";
        }
        echo "
        <tr>
         <td>$Codigo</td>
         <td>$Marca</td>
         <td>$Colorimetro</td>
         <td>$Tamaño mm</td>
         <td>$varStatus</td>
         <td>$FechaSlida</td>
         <td>$Utilizadas</td>
         <td>% $PorcentUtilizado</td>
         <td>$Restante</td>
         <td class='text-center'>
           <a class='btn btnIconoEdit' id='$idLab_Discos_Inventario' onclick='DetalleDiscos(this.id)' data-toggle='tooltip' title='Ver Información'>
           <i class='fa fa-eye fa-2x'></i>
         </td>
         <td class='text-center'>
           <a class='btn btnIconoChange' id='$idLab_Discos_Inventario' onclick='ModalAsignar(this.id)' data-toggle='tooltip' title='Asignar Orden'>
           <i class='fa fa-file fa-2x'></i>
         </td>
         <td class='text-center'>
           <button class='btn btn-outline-dark' id='$idLab_Discos_Inventario' onclick='TerminarDisco(this.id,\"$Codigo\")' data-toggle='tooltip' title='Terminar'>
           <i class='fa fa-check' aria-hidden='true'></i>
           Terminar
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
}else {
  echo "
    <div class='row'>
      <div class='col-12 text-center'>
        No hay resultados
      </div>
    </div>
  ";
}
 ?>
