<?php
include("AdmEquipos.php");

$op = $_POST["op"] ?? "";
error_log($op);
$AdmEquipos = new AdmEquipos();

if ($op == "addListaEquiposUsu") {
  $idEquipos = $_POST["selectEquipos"] ?? "";
  $idUsuario = $_POST["idUsuario"] ?? "";
  echo trim($AdmEquipos->addListaEquiposUsu($idUsuario,$idEquipos));
}

if ($op == "deleteListaEquipoUsu") {
  $idEquiposUsuario = $_POST["idEquiposUsuario"] ?? "";
  $idUsuario = $_POST["idUsuario"] ?? "";
  echo trim($AdmEquipos->deleteListaEquipoUsu($idUsuario,$idEquiposUsuario));
}

if ($op == "addEquiposUsuario") {
  $idUsuario = $_POST["idUsuario"] ?? "";
  echo trim($AdmEquipos->addEquiposUsuario($idUsuario));
}

if ($op == "regresarEquipo") {
  error_log("$op");
  $idEquiposUsuario = $_POST["idEquiposUsuario"] ?? "";
  $idUsuario = $_POST["idUsuario"] ?? "";
  $funciono = $_POST["funciono"] ?? "";
  echo trim($AdmEquipos->regresarEquipo($idUsuario,$idEquiposUsuario,$funciono));
}
if ($op == "getEquiposTemp") {
  $idUsuario = $_POST["idUsuario"] ?? "";
  echo trim($AdmEquipos->getEquiposTemp($idUsuario));
}

if ($op== "getEquiposUsuario") {
  $idUsuario = $_POST["idUsuario"] ?? "";
  echo trim($AdmEquipos->getEquiposUsuario($idUsuario));
}

if ($op == "deleteEquiposLista") {
  echo trim($AdmEquipos->deleteEquiposLista());
}

if ($op == "getEquipos") {
  echo trim($AdmEquipos->getEquipos());
}

if ($op == "getEquiposPrestamo") {
  echo trim($AdmEquipos->getEquiposPrestamo());
}
 ?>
