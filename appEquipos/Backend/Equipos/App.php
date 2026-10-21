<?php
include("AdmEquipos.php");

$op = $_POST["op"] ?? "";
error_log($op);
$AdmEquipos = new AdmEquipos();

if ($op == "addListaEquiposUsu") {
  $idEquipos = $_POST["selectEquipos"] ?? "";
  echo trim($AdmEquipos->addListaEquiposUsu($idEquipos));
}

if ($op == "deleteListaEquipoUsu") {
  $idEquiposUsuario = $_POST["idEquiposUsuario"] ?? "";
  echo trim($AdmEquipos->deleteListaEquipoUsu($idEquiposUsuario));
}

if ($op == "addEquiposUsuario") {
  $IDUsarioCOOKIE = $_POST["IDUsarioCOOKIE"] ?? "";
  echo trim($AdmEquipos->addEquiposUsuario($IDUsarioCOOKIE));
}

if ($op == "regresarEquipo") {
  $idEquiposUsuario = $_POST["idEquiposUsuario"] ?? "";
  $IDUsuarioCOOKIE = $_POST["IDUsuarioCOOKIE"] ?? "";
  echo trim($AdmEquipos->regresarEquipo($IDUsuarioCOOKIE,$idEquiposUsuario));
}
 ?>
