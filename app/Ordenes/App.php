<?php
include("Ordenes.php");

$op = $_POST["op"] ?? "";
$Ordenes = new Ordenes();

if ($op == "addTemporal") {
  $DoctorId = $_POST["DoctorId"] ?? "";
  $Producto_id = $_POST["Producto_id"] ?? "";
  echo trim($Ordenes->addTemporal($DoctorId,$Producto_id));
}

if ($op == "añadirPacienteOrden") {
  $Paciente_Id = $_POST["IdPaciente"] ?? "";
  $Ordenes_Trabajo_Id = $_POST["Ordenes_Trabajo_Id"] ?? "";
  $Doctor_Id = $_POST["Doctor_Id"] ?? "";
  echo trim($Ordenes->añadirPacienteOrden($Paciente_Id,$Ordenes_Trabajo_Id,$Doctor_Id));
}

if ($op == "añadirObservacionesOrdenTemp") {
  $Observaciones = $_POST["txtObservaciones"] ?? "";
  $Ordenes_Trabajo_Id = $_POST["IdOrdT"] ?? "";
  $Doctor_Id = $_POST["IdD"] ?? "";
  echo trim($Ordenes->añadirObservacionesOrdenTemp($Observaciones,$Ordenes_Trabajo_Id,$Doctor_Id));
}

if ($op == "updateColorOrdenT") {
  $Aut_color = $_POST["Aut_color"] ?? "";
  $Ordenes_Trabajo_Id = $_POST["Ordenes_Trabajo_Id"] ?? "";
  $Doctor_Id = $_POST["Doctor_Id"] ?? "";
  echo trim($Ordenes->updateColorOrdenT($Aut_color,$Ordenes_Trabajo_Id,$Doctor_Id));
}
 ?>
