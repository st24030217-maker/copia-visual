<?php
$fecha = $_GET["fecha"] ?? "";
$idOrdenTemp = $_GET["idOrdenTemp"] ?? "";
$IdDoc4 = $_GET["IdDoc3"] ?? "";

require_once("Backend/Usuarios/Usuarios.php");
require_once("Backend/Organizacion/Organizacion.php");
$Organizacion1 = new Organizacion();
$Organizacion2 = new Organizacion();
$Usuarios2 = new Usuarios();
$IdCiudadOrgDoct = $Usuarios2->getCiudadOrganizacionDoctor($IdDoc4);

$ValorHora = $Organizacion1->getValHorarioOrganizacionCiudad($IdCiudadOrgDoct);

$HoraActual = $Organizacion2->getHoraActual();

$Usuarios = new Usuarios();
$cant = $Usuarios->getCantidadTotalEscaneadores();

$Organizacion2 = new Organizacion();
$DiaSemana = $Organizacion2->getDiaFecha($fecha);

$fechaActual = date('Y-m-d');
if ($DiaSemana == "Domingo") {
  // code...
}elseif ($DiaSemana == "Lunes") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("12:59"));
  $Interval = "4";
}elseif ($DiaSemana == "Martes") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("12:59"));
  $Interval = "6";
}else if ($DiaSemana == "Miercoles") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("12:59"));
  $Interval = "6";
}elseif ($DiaSemana == "Jueves") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("12:59"));
  $Interval = "6";
}elseif ($DiaSemana == "Viernes") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("12:59"));
}elseif ($DiaSemana == "Sabado") {
  $Valor24Hrs = date('H:i',strtotime("23:59"));
  $horarioIni = date('H:i',strtotime("19:59"));
  $Interval = "6";
}
 ?>
<?php
if ($DiaSemana != "Domingo"  && $fecha != $fechaActual) {
  // code...
 ?>
<table class="table  text-center rounded-sm shadow-l table-hover" >
  <head>
    <tr>
      <th scope="col" class="bg-dark-dark color-white">Hora</th>
      <th scope="col" class="bg-dark-dark color-white">Espacios</th>
    </tr>
  </head>
  <tbody>
    <?php

      $horarioMuestra = date('H:i',strtotime("09:00"));

      $HorasDia = ($Valor24Hrs  - $horarioIni) / $ValorHora;

      $tiempoHoras = $HorasDia;
      $numFecha = "0";
    for ($i=0; $i < $tiempoHoras ; $i++) {
      require_once("Backend/Ordenes/Ordenes.php");
      $Ordenes2 = new Ordenes();
      $HorasOc = $Ordenes2->getFechasEscaneadoresDisp($fecha,$horarioMuestra);
      $disabled = "";

      $aux = date('H:i',strtotime("$horarioMuestra"."+$ValorHora hour"));
      for ($j=0; $j <$horarioMuestra ; $j++) {
        if ($cant <= $HorasOc) {
          $disabled = "display:none;";
        }else {
          $disabled = "";
          if ($aux > "18:00") {
            $disabled = "display:none;";
          }
          if ($fechaActual == $fecha) {
            if ($HoraActual > $horarioMuestra ) {
              $disabled = "display:none;";
            }
          }
          if ($fecha < $fechaActual) {
            $disabled = "display:none;";
          }
        }
      }

      $numFecha ++;
      echo "
      <tr class='' style='$disabled height:50px;' >
          <th scope='row'>
            $horarioMuestra
          </th>
          <td>
            <input class='' style='font-size:20px !important;' type='radio' onclick='agendarOrdenEscan(\"$horarioMuestra\",\"$idOrdenTemp\",\"$Interval\")' name='checkAddAgenda' id='checkAddAgenda$numFecha' >
            <label for='checkAddAgenda$numFecha' class='' >Agendar</label>
          </td>
      </tr>";
      $horarioMuestra = date('H:i',strtotime("$horarioMuestra"."+$ValorHora hour"));
    }

     ?>
  </tbody>
</table>
<?php
}
else {
  echo "
  <div class='col-12 col-lg-12'>
      <div class='row'>
        <div class='col-12 col-lg-12 text-center'>
          <span style='font-size:15px;'> Dia no disponible </span>
        </div>
      </div>
  </div>
  ";
}
 ?>

<?php echo "
<script type='text/javascript'>
  $('#inpValorHoraOrg').val($ValorHora);
</script>
"; ?>
