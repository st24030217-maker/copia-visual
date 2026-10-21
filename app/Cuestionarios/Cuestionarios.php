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

class Cuestionarios extends Conexiones{
  function addRespuestaCuest($IdCuestionario,$IdUsuario,$Latitud,$Longitud,$idCuestionarioDetalle,$Valor){
    try {
      $q = "CALL spInsertaRespuestaCuestionario('$IdCuestionario','$IdUsuario','$Latitud','$Longitud','$idCuestionarioDetalle','$Valor');";
            $this->Procedure($q);
        return "1";
    } catch (\Exception $e) {
        return "0";
    }
  }

  function getPreguntasCuestionario($idCuestionarios){
    $q = "SELECT CUD.idCuestionarioDetalle,CUD.idCuestionarios,CUD.Pregunta,CUD.Numerico,CUD.ValorInicial,CUD.ValorFinal,CUD.Booleano,CUD.Respuesta
          FROM Cuestionarios as CU INNER JOIN Cuestionario_Detalle as  CUD ON CU.idCuestionarios = CUD.idCuestionarios
          where CUD.idCuestionarios = '$idCuestionarios' order by idCuestionarioDetalle asc ;";
          $cons = $this->Select($q,array());
          return '{ "ListPreguntasCuestionario": '.json_encode($cons)."}";
  }


  function getCuestionarios(){
    $q = "SELECT * FROM Cuestionarios;";
    $cons = $this->Select($q,array());
    return '{ "ListCuestionarios": '.json_encode($cons)."}";
  }
}
 ?>
