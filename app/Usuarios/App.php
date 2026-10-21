<?php
include("Usuarios.php");

$op = $_POST["op"] ?? "";
error_log($op);
$Usuarios = new Usuarios();

if ($op == "IniciaSesion") {
  $usuario = $_POST["usuario"] ?? "";
  $clave = $_POST["clave"] ?? "";
  echo trim($Usuarios->IniciaSesion($usuario,$clave));
}

if ($op == "getUsuariosAppEquipos") {
  echo trim($Usuarios->getUsuariosAppEquipos());
}

if ($op == "enviarEmailRecoverPass") {
  $Mail = $_POST["Mail"] ?? "";
  echo trim($Usuarios->enviarEmailRecoverPass($Mail));
}
?>
