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

class Ordenes extends Conexiones{
  function getOrdenTemporal($DoctorId,$Producto_id){
    $q = "SELECT * FROM Temporal_Ordenes_trabajo where Doctor_id = '$DoctorId' AND Producto_id = '$Producto_id'";
    $cons = $this->Select($q,array());
    return $cons;
  }

  function addTemporal($Paciente_id,$Producto_id){
    $q = "CALL spOrdenTemporal('$Paciente_id','$Producto_id')";
    $this->Procedure($q);
    return "1";
  }

  // function updateTemporal($Tipos_colorimetros_color_id,$Piezas){
  //   $q = "UPDATE Temporal_Ordenes_trabajo SET Tipos_colorimetros_color_id = '$Tipos_colorimetros_color_id',
  //    Piezas = '$Piezas'";
  //   $this->ExecuteQuery($q,array());
  //   return "1";
  // }
  function añadirPacienteOrden($Paciente_Id,$Ordenes_Trabajo_Id,$Doctor_Id){
    error_log($Paciente_Id);
    $q = "UPDATE Temporal_Odontograma SET Paciente_Id = '$Paciente_Id' WHERE Ordenes_Trabajo_Id = '$Ordenes_Trabajo_Id'
    AND Doctor_Id = '$Doctor_Id';";
    $this->ExecuteQuery($q,array());

    $Ordenes2 = new Conexiones();
    $query = "UPDATE Temporal_Ordenes_trabajo SET Paciente_id = '$Paciente_Id' WHERE Ordenes_trabajo_id = '$Ordenes_Trabajo_Id'
    AND Doctor_id = '$Doctor_Id'";
    $Ordenes2->ExecuteQuery($query,array());

    return "1";
  }

  function añadirObservacionesOrdenTemp($Observaciones,$Ordenes_Trabajo_Id,$Doctor_Id){
    $q = "UPDATE Temporal_Ordenes_trabajo SET Observaciones = '$Observaciones' WHERE Ordenes_trabajo_id = '$Ordenes_Trabajo_Id'
    AND Doctor_id = '$Doctor_Id'";
    $this->ExecuteQuery($q,array());
    return "1";
  }

  function getColores(){
    $q = "SELECT * FROM Colores WHERE Status = 1";
    $cons = $this->Select($q,array());
    return $cons;
  }

  function updateColorOrdenT($Aut_color,$Ordenes_Trabajo_Id,$Doctor_Id){
    $q = "UPDATE Temporal_Ordenes_trabajo SET Aut_color = '$Aut_color' WHERE Ordenes_trabajo_id = '$Ordenes_Trabajo_Id'
    AND Doctor_id = '$Doctor_Id'";
    $this->ExecuteQuery($q,array());
    return "1";
  }
}
 ?>
