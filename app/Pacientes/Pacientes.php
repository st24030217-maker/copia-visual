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

class Pacientes extends Conexiones {

  function getPacientes(){
    $q = "SELECT * FROM Pacientes_App";
    $cons = $this->Select($q,array());
    return '{ "ListadoPacientes": '.json_encode($cons)."}";
  }

  function getPacientesXDoctor($Doctor_Id){
    $q = "SELECT PacD.Pacientes_Doctor_Id,PacD.Paciente_Id,PacAp.Nombre,PacAp.Apellidos  FROM Pacientes_Doctores as PacD inner join Pacientes_App as PacAp on
    PacAp.Paciente_Id = PacD.Paciente_Id
    WHERE Doctor_Id = '$Doctor_Id';
";
    $cons = $this->Select($q,array());
    return '{ "ListadoPacientesDoctor": '.json_encode($cons)."}";

  }

  function addPacientesXDoctor($Nombre,$Apellidos,$Sexo,$Titulo,$Dir_Calle,$Dir_Num,$Dir_Colonia,$Cell,$Telefono,$Email,
  $Fecha_Nac,$Num_Expediente,$INE_Clave_Elector,$Curp,$RFC,$Doctor_Id,$Folio){
    $q="CALL spAddPacienteXDoctor ('$Nombre','$Apellidos','$Sexo','$Titulo','$Dir_Calle','$Dir_Num','$Dir_Colonia','$Cell',
    '$Telefono','$Email','$Fecha_Nac','$Num_Expediente','$INE_Clave_Elector','$Curp','$RFC','$Doctor_Id',$Folio)";
    $resp = $this->Procedure($q);
    return "1";
  }

  function getFotoPaciente($Paciente_Id){
    $q= "SELECT Foto FROM Pacientes_App WHERE Paciente_Id  = '$Paciente_Id'";
    $cons = $this->Select($q,array());
    return '{ "GetFoto": '.json_encode($cons)."}";
  }

  function updateFotoClienteApp($Foto,$Paciente_Id){
    $q= "UPDATE Pacientes_App SET Foto = '$Foto' WHERE Paciente_Id  = '$Paciente_Id'";
    $this->ExecuteQuery($q,array());
    return "1";
  }

}
 ?>
