<?php
include("Categorias.php");

$op = $_POST["op"] ?? "";
$Categorias = new Categorias();

if ($op == "getCategorias") {
  echo trim ($Categorias->getCategorias());
}
 ?>
