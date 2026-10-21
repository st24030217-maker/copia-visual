<?php
include("Productos.php");

$op = $_POST["op"] ?? "";
$Productos = new Productos();

if ($op == "getProductos") {
  echo trim($Productos->getProductos());
}

if ($op == "getProductosXCategoria") {
  $Productos_Categoria_Id = $_POST["Productos_Categoria_Id"] ?? "";
  echo trim($Productos->getProductosXCategoria($Productos_Categoria_Id));

}
 ?>
