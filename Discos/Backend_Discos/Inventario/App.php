<?php
include("Inventario.php");

$op = $_POST["op"] ?? "";
$Inventario = new Inventario();

if ($op == "MovimientosInventario") {
  $Accion = $_POST["Accion"] ?? "";
  $Cantidad = $_POST["txtCantidad"] ?? "";
  $IdUsuario = $_POST["idUsuario"] ?? "";
  $IDDisco = $_POST["idProducto"] ?? "";
  $ExistenciaAnt = $_POST["txtExistenciaAnt"] ?? "";
  echo trim($Inventario->MovimientosInventario($Accion,$Cantidad,$IdUsuario,$IDDisco,$ExistenciaAnt));
}
 ?>
