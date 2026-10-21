<?php
include("Salida.php");

$op = $_POST["op"] ?? "";
$Salida = new Salida();

if ($op == "getUsuariosLabAlmacen") {
  echo trim($Salida->getUsuariosLabAlmacen());
}
// if ($op == "SalidaDisco") {
//   $codigo = $_POST["codigo"] ?? "";
//   $idusuario = $_POST["idusuario"] ?? "";
//   echo trim($Salida->SalidaDisco($codigo,$idusuario));
// }
if ($op == "SalidaDisco") {
  $codigo = $_POST["codigo"] ?? "";
  $idusuario = $_POST["idusuario"] ?? "";
  $tipo_salida = isset($_POST["tipo_salida"]) ? $_POST["tipo_salida"] : 0;
  echo trim($Salida->SalidaDisco($codigo,$idusuario,$tipo_salida));
}
if ($op == "getMotivosSalida") {
  echo trim($Salida->getMotivosSalida());
}
if ($op == "getInfoDisco") {
  $codigo = $_POST["codigo"] ?? "";
  echo trim($Salida->getInfoDisco($codigo));
}
if ($op == "DevolucionDisco") {
  $codigo = $_POST["codigo"] ?? "";
  echo trim($Salida->DevolucionDisco($codigo));
}
if ($op == "RevisaInventario") {
  $codigo = $_POST["codigo"] ?? "";
  echo trim($Salida->RevisaInventario($codigo));
}
if ($op == "GetInventario") {
  echo trim($Salida->GetInventario());
}

if ($op == "getCantidadDiscosPorEstatus") {
  $idColorimetroColor = $_POST["idColorimetroColor"] ?? "";
  $idMarca = $_POST["idMarca"] ?? "";
  $Tamano = $_POST["Tamano"] ?? "";
  echo trim($Salida->getCantidadDiscosPorEstatus($idColorimetroColor, $idMarca, $Tamano));
}

if ($op == "getInventarioColorimetros") {
  echo trim($Salida->getInventarioColorimetros());
}

if ($op == "getMarcasDiscos") {
  echo trim($Salida->getMarcasDiscos());
}
?>
