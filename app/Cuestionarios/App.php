<?php
include("Cuestionarios.php");

$op = $_POST["op"] ?? "";
$Cuestionarios = new Cuestionarios();

if ($op == "addRespuestaCuest") {
  $IdCuestionario = $_POST["IdCuestionario"] ?? "";
  $IdUsuario = $_POST["IdUsuario"] ?? "";
  $Latitud = $_POST["Latitud"] ?? "";
  $Longitud = $_POST["Longitud"] ?? "";
  $idCuestionarioDetalle = $_POST["IdPregunta"] ?? "";
  $Valor = $_POST["Valor"] ?? "";
  echo trim($Cuestionarios->addRespuestaCuest($IdCuestionario,$IdUsuario,$Latitud,$Longitud,$idCuestionarioDetalle,$Valor));
}

if ($op == "getPreguntasCuestionario") {
  $idCuestionarios = $_POST["idCuestionarios"] ?? "";
  echo trim($Cuestionarios->getPreguntasCuestionario($idCuestionarios));
}

if ($op == "getCuestionarios") {
  echo trim($Cuestionarios->getCuestionarios());
}
?>
