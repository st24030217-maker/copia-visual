<?php
include("Pacientes.php");

$op = $_POST["op"] ?? "";
$Pacientes = new Pacientes();

if ($op == "addPacientesXDoctor") {
  $Nombre  = $_POST["$Nombre"] ?? "";
  $Apellidos = $_POST["$Apellidos"] ?? "";
  $Sexo = $_POST["$Sexo"] ?? "";
  $Titulo = $_POST["$Titulo"] ?? "";
  $Dir_Calle = $_POST["$Dir_Calle"] ?? "";
  $Dir_Num = $_POST["$Dir_Num"] ?? "";
  $Dir_Colonia = $_POST["$Dir_Colonia"] ?? "";
  $Cell = $_POST["$Cell"] ?? "";
  $Telefono = $_POST["$Telefono"] ?? "";
  $Email = $_POST["$Email"] ?? "";
  $Fecha_Nac = $_POST["$Fecha_Nac"] ?? "";
  $Num_Expediente = $_POST["$Num_Expediente"] ?? "";
  $INE_Clave_Elector = $_POST["$INE_Clave_Elector"] ?? "";
  $Curp = $_POST["$Curp"] ?? "";
  $RFC = $_POST["$RFC"] ?? "";
  $Doctor_Id = $_POST["$Doctor_Id"] ?? "";
  $Folio = $_POST["$Folio"] ?? "";

  $resp = $Pacientes->addPacientesXDoctor($Nombre,$Apellidos,$Sexo,$Titulo,$Dir_Calle,$Dir_Num,$Dir_Colonia,$Cell,$Telefono,$Email,
  $Fecha_Nac,$Num_Expediente,$INE_Clave_Elector,$Curp,$RFC,$Doctor_Id,$Folio);

  $IDPaciente = $resp[0]["IDPaciente"];

  try {
    $carpeta = "../../Archivos/imagenPacientes/";
    if (isset($_FILES['inpFoto']['name'])&& $_FILES['inpFoto']['name'] != '') {
      $namefile = $_FILES['inpFoto']['name'];
      $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));

      $extValida = array("png","jpeg","jpg");
      if (in_array($ext,$extValida)) {
        $path = $carpeta.$IDPaciente.".$ext";
        $nameArchivo =$IDPaciente.".$ext";

        if (move_uploaded_file($_FILES['inpFoto']['tmp_name'],$path)) {
          $NombreArchivo = $namefile;
          $Pacientes->updateFotoClienteApp($nameArchivo,$IDPaciente);
        }
      }
    }
  } catch (\Exception $e) {
    error_log("$e");
  }
  echo "1";
}

if ($op == "getPacientes") {
  echo trim($Pacientes->getPacientes());
}

if ($op == "getPacientesXDoctor") {
  $Doctor_Id = $_POST["Doctor_Id"] ?? "";
  echo trim($Pacientes->getPacientesXDoctor($Doctor_Id));
}

if ($op == "getFotoPaciente") {
  $Paciente_Id = $_POST["Paciente_Id"] ?? "";
  echo trim($Pacientes->getFotoPaciente());
}

 ?>
