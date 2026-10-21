<?php
$filtro = $_GET["filtro"] ?? "";
require_once("backend/Push/PushTipos.php");
$PushTipos = new PushTipos();
$ListadoDoctores = $PushTipos->GetDoctoresToks($filtro);
 ?>
 <table id="tableDoctores" class="table table-bordered table-responsive table-striped text-center" style="color:black;">
   <thead>
     <tr>
       <th>Todos <br><input type='checkbox' id='cbox' onclick="seleccionarTodos();"></th>
       <th>Doctores</th>
     </tr>
   </thead>
   <tbody>
     <?php
     for($i = 0; $i < sizeof($ListadoDoctores); $i++){

       $idUsuario = $ListadoDoctores[$i]["idUsuario"];
       $Titulo = $ListadoDoctores[$i]["Titulo"];
       $Mensaje = $ListadoDoctores[$i]["Mensaje"];
       // $idMensajePush = $ListadoDoctores[$i]["idMensajePush"];
       $TokenID= $ListadoDoctores[$i]["TokenID"];
       $txtcheck = "<input type='checkbox' name='cboxDoctores' value='$TokenID'>";
       echo "
       <tr>
         <td>$txtcheck</td>
         <td>$Titulo $Mensaje</td>
       </tr>
       ";
     }
     ?>
   </tbody>
 </table>
 <script type="text/javascript">
   $("#cargando").fadeOut(200);
   $(document).ready(function(){
     var table = $('#tableDoctores').DataTable({
       "lengthMenu": [[-1, 3, 5, 10, 100, 500, 1000], ["Todos los registros", 3, 5, 10, 100, 500, 1000]],
       "ordering": false,
       "responsive":true
     });
   });
 </script>
