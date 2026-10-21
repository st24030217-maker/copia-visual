<?php
$fechaini = $_GET["fechaini"] ?? "";
$fechafin = $_GET["fechafin"] ?? "";

require_once("Backend/Equipos/AdmEquipos.php");
$Equipos = new AdmEquipos();

$resp = $Equipos->getEquiposHistorico($fechaini,$fechafin);

if (sizeof($resp)>0) {
  ?>
  <div class="contenedores">
    <div class="row">
      <div class="col-12" style="text-align:right">
        <!-- <a  class="btn btn-success"  style="border-radius:20px;" title="Exportar Excel">
          <i class="fa fa-file-excel-o"></i>
        </a> -->
        <div class="row">
          <div class="col-12 offset-lg-9 col-lg-3 text-right">
            <a id="downloadLink" type="button" class="btn btn-outline-success" onclick="exportF(this)">	<i class="fa fa-download"></i> Excel</a>

          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="Table-responsive">
    <table id="TableHistorico" class="table text-center table-hover" style="color:black;">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Descripción Equipo</th>
          <th>Fecha Salida Equipo</th>
          <th>Fecha Entrega Equipo</th>
          <th>Funciono el equipo</th>

        </tr>
      </thead>
      <tbody>

        <?php
           for($i = 0; $i < sizeof($resp); $i++){
             $Tomado = $resp[$i]["Tomado"];
             $Regresado = $resp[$i]["Regresado"];
             $usuario = $resp[$i]["usuario"];
             $Nombre = $resp[$i]["Nombre"];
             $Descripcion = $resp[$i]["Descripcion"];
             $Descripcion = $resp[$i]["Descripcion"];
             $Funciono = $resp[$i]["Funciono"];

             if ($Funciono = 1) {
               $varfunciono = "Funciono";
             }else {
               $varfunciono = "No Funciono";
             }

           echo "
             <tr>
             <td>$usuario</td>
             <td>$Descripcion</td>
             <td>$Tomado</td>
             <td>$Regresado</td>
             <td>$varfunciono</td>

             </tr>
           ";
         }
         ?>
      </tbody>
    </table>
    </div>
  </div>

  <?php
}else {
  echo "
  <div class='contenedores'>
  <div class='row'>
    <div class='col-12 text-center'>
      <h5>No hay registros</h5>
    </div>
  </div>
  </div>
  ";
}

 ?>

 <script type="text/javascript">
   $("#load").fadeOut();

   $('#TableHistorico').DataTable({
     lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
     ordering: false,
     "bPaginate": false,
     responsive: true,
     "bInfo" : false,
     "oLanguage": {
     "sSearch": "Buscar"
   }
   });
 </script>
