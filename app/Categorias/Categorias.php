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

class Categorias extends Conexiones {
  function getCategorias(){
    $q = "SELECT * FROM Categorias WHERE Status = 1;";
    $cons = $this->Select($q,array());
    return '{ "ListadoCategorias": '.json_encode($cons)."}";
  }
}
 ?>
