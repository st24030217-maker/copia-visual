<?php
if(file_exists("../Conexiones_Discos/Conexiones.php")){
  require_once("../Conexiones_Discos/Conexiones.php");
}else {
  if (file_exists("./Conexiones_Discos/Conexiones.php")) {
    require_once("./Conexiones_Discos/Conexiones.php");
  }
  else if(file_exists("../Conexiones_Discos/Conexiones.php")){
    require_once("../Conexiones_Discos/Conexiones.php");
    }
  else if(file_exists("../../Conexiones_Discos/Conexiones.php")){
    require_once("../../Conexiones_Discos/Conexiones.php");
    }
  else if(file_exists("././Backend_Discos/Conexiones_Discos/Conexiones.php")){
    require_once("././Backend_Discos/Conexiones_Discos/Conexiones.php");
    }
}

class Inventario extends Conexiones{
  function getInventario(){
    $q = "SELECT LDI.idLab_Discos_Inv,LDI.IDDisco,LD.Nombre_Producto,LD.SKU,LDI.Existencia FROM Lab_Discos_Inv AS LDI INNER JOIN Lab_Discos AS LD ON LDI.IDDisco = LD.idLab_Discos
    WHERE LD.Status = 1;";
    $con = $this->Select($q,array());
    return $con;
  }

  function MovimientosInventario($Accion,$Cantidad,$IdUsuario,$IDDisco,$ExistenciaAnt){
    error_log("/////////");
    error_log("$Accion");
    error_log("$Cantidad");
    error_log("$IdUsuario");
    error_log("$IDDisco");
    error_log("$ExistenciaAnt");

    $q = "CALL spMovimientosDiscos(?,?,?,?,?);";
    error_log($q);
    $this->ExecuteQuery($q,array($Accion,$Cantidad,$IdUsuario,$IDDisco,$ExistenciaAnt));
    return "1";
  }
}
 ?>
