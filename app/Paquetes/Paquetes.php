<?php
if(file_exists("../Conexiones/Conexiones.php")){
  require_once("../Conexiones/Conexiones.php");
}
else{
  if(file_exists("./Conexiones/Conexiones.php")){
    require_once("./Conexiones/Conexiones.php");
  }
  else if(file_exists("../Conexiones/Conexiones.php")){
    require_once("../Conexiones/Conexiones.php");
  }
  else if(file_exists("../../Conexiones/Conexiones.php")){
    require_once("../../Conexiones/Conexiones.php");
  }
  else if(file_exists("././Backend/Conexiones/Conexiones.php")){
    require_once("././Backend/Conexiones/Conexiones.php");
  }
}

class Paquetes extends Conexiones{

  function getPaquetes(){
    $q = "SELECT * FROM Productos_Paquetes";
    $cons = $this->Select($q,array());
    return '{ "ListadoPaquetes": '.json_encode($cons)."}";
  }

  function getProductosPaquetesIncluidos($Productos_Paquetes_Incluidos_Id){
    $q = "SELECT * FROM Productos_Paquetes_Incluidos where Productos_Paquetes_Incluidos_Id = '$Productos_Paquetes_Incluidos_Id'";
    $cons = $this->Select($q,array());
    return '{ "ListadoPaquetesProductosInc": '.json_encode($cons)."}";
  }
}

 ?>
