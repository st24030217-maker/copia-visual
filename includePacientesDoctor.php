<?php
$IdDoctor = $_GET["IdDoctor"] ?? "";
require_once("Backend/Pacientes/Pacientes.php");
$Pacientes = new Pacientes();
$ListPacientes = $Pacientes->getPacientesDoctor($IdDoctor);

if (sizeof($ListPacientes) > "0") {
  // code...
 ?>

 <div class="contenedores">
   <div class="table-responsive">
     <table id="tablePacientes" class="table text-center table-hover" style="color:black;">
       <thead>
         <th>Nombre del Paciente</th>
         <th>Doctor</th>
         <th>Status Paciente</th>
         <th>Actualizar Status</th>
       </thead>
       <tbody>
         <?php
         for ($i=0; $i < sizeof($ListPacientes) ; $i++) {
           $Paciente_Id = $ListPacientes[$i]["Paciente_Id"];
           $Doctor = $ListPacientes[$i]["Doctor"];
           $ApellidoMaterno = $ListPacientes[$i]["ApellidoMaterno"];
           $ApellidoPaterno = $ListPacientes[$i]["ApellidoPaterno"];
           $Nombre = $ListPacientes[$i]["Nombre"];
           $Apellidos = $ListPacientes[$i]["Apellidos"];
           $Status = $ListPacientes[$i]["Status"];
           if ($Status == "1") {
             $varStatus = "Activo";
             $prop = "checked";
           }else {
             $varStatus = "Inactivo";
             $prop = "";
           }
           echo "
           <tr>
             <td>$Nombre $Apellidos</td>
             <td>$Doctor $ApellidoMaterno $ApellidoPaterno</td>
             <td>$varStatus</td>
             <td>
             <label class='switch'>
                 <input type='checkbox' id='chkTerm{$Paciente_Id}' {$prop} onclick='updateStatusPaciente(\"$Paciente_Id\",\"$Status\")'>
                 <span class='slider round'></span>
             </label>
             </td>
          </tr>
           ";

         }
          ?>
       </tbody>
     </table>
   </div>
 </div>
 <?php
  }
  else {
    echo "
    <div class='contenedores'>
      <div class='row'>
        <div class='col-12 col-lg-12 text-center'>
          <span style='font-size:25px;'> No contiene pacientes </span>
        </div>
      </div>
    </div>
    ";
  }
  ?>
