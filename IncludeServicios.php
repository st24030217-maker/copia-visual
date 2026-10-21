<?php
$IdCategoria = $_GET["IdCategoria"] ?? "";
 ?>
   <select class="form-control" name="slectProducto" id="slectProducto" required>
     <option value="" selected disabled> Lista de servicios </option>
     <?php
     require_once("Backend/Productos/Productos.php");
      $Productos1 = new Productos();
      $ListProductos = $Productos1->getServicios($IdCategoria);
      for ($i=0; $i <sizeof($ListProductos) ; $i++) {
        $Producto_ID = $ListProductos[$i]["Producto_ID"];
        $Producto = $ListProductos[$i]["Producto"];
        echo "
        <option value='$Producto_ID'> $Producto </option>
        ";
      }
      ?>
   </select>
