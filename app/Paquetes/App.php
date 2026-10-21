<?php

include("Paquetes.php");

$op = $_POST["op"] ?? "";
$Paquetes = new Paquetes();

if ($op == "getPaquetes") {
  echo trim($Paquetes->getPaquetes());
}

if ($op == "getProductosPaquetesIncluidos") {
  $Productos_Paquetes_Incluidos_Id = $_POST["Productos_Paquetes_Incluidos_Id"] ?? "";
  echo trim ($Paquetes->getProductosPaquetesIncluidos($Productos_Paquetes_Incluidos_Id));
}
 ?>
