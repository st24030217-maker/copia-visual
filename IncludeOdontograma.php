<?php
  $idOrden = $_GET["idOrden"] ?? "";
?>
<style media="screen">
  div::-webkit-scrollbar {
  width: 5px;
  height: 8px;           /* width of the entire scrollbar */
  }

  div::-webkit-scrollbar-track {
  background: transparent;
  border: 0.5px solid #E3E3E3;
  border-radius:7px;     /* color of the tracking area */
  }

  div::-webkit-scrollbar-thumb {
  background-color: #50A4CF;    /* color of the scroll thumb */
  border-radius: 20px;        /* creates padding around scroll thumb */
  }
</style>

<div class="row scrollable" style="padding:10px;">
  <label >Superior</label>
  <div class="col-12" style='margin-top:10px;padding:5px; overflow:auto;display:flex;'>
    <?php
    require_once("Backend/DentLab/DentLab.php");
    $Odontograma = new DentLab();
    $Dientes = $Odontograma->getDientes();

    if (sizeof($Dientes)>0) {
      for ($i=0; $i < sizeof($Dientes) ; $i++) {
        $idDientesImagen = $Dientes[$i]["idDientesImagen"];
        $Diente = $Dientes[$i]["Diente"];
        $Imagen = $Dientes[$i]["Imagen"];
        $Tipo = $Dientes[$i]["Tipo"];

        $Odontograma4 = new DentLab();
        $TipoDienteCons = $Odontograma4->getTipoDienteOrdenDetalle($idOrden,$idDientesImagen);
        if (sizeof($TipoDienteCons) > "0") {
          for ($j=0; $j < sizeof($TipoDienteCons) ; $j++) {
            $TipoDiente = $TipoDienteCons[$j]["TipoDiente"];
            if ($TipoDiente == "Pilares") {
              $ColorBtn = "background:#69CEBE;";
            }elseif ($TipoDiente == "Ponticos") {
              $ColorBtn = "background:#F4D77A;";
            }
          }
        }
        else {
          $ColorBtn = "background:white;";
        }
          $varDiente = substr("$Diente",1);
        if ($Tipo == "Superior") {
          echo "
          <div class='row'>
            <div class='col-12 text-center' >
              <div style='border:0.5px solid #fff;border-radius:7px;padding:10px; margin-left:8px; $ColorBtn'>
                <img src='archivos/imagenDientes/$Imagen' width='50' height='50'>
                <span style='color:black !important;'>$varDiente</span>
              </div>
            </div>
          </div>
          ";
        }
      }
    }
    ?>
  </div>
  <br><br>
  <br><br>
  <span>Inferior</span>
  <div class="col-12" style='margin-top:10px;padding:5px; overflow:auto;display:flex;'>
    <?php
    if (sizeof($Dientes)>0) {

      ;
      for ($i=0; $i < sizeof($Dientes) ; $i++) {
        $idDientesImagen = $Dientes[$i]["idDientesImagen"];
        $Diente = $Dientes[$i]["Diente"];
        $Imagen = $Dientes[$i]["Imagen"];
        $Tipo = $Dientes[$i]["Tipo"];

        $Odontograma3 = new DentLab();
        $DientesAct = $Odontograma3->getDientesActivoOdontogramaInf($idOrden,$idDientesImagen);

        $Odontograma4 = new DentLab();
        $TipoDienteCons = $Odontograma4->getTipoDienteOrdenDetalle($idOrden,$idDientesImagen);
        if (sizeof($TipoDienteCons) > "0") {
          for ($j=0; $j < sizeof($TipoDienteCons) ; $j++) {
            $TipoDiente = $TipoDienteCons[$j]["TipoDiente"];
            if ($TipoDiente == "Pilares") {
              $ColorBtn = "background:#69CEBE;";
            }elseif ($TipoDiente == "Ponticos") {
              $ColorBtn = "background:#F4D77A;";
            }
          }
        }else {
          $ColorBtn = "background:white;";
        }
          $varDiente = substr("$Diente",1);

        if ($Tipo == "Inferior") {
          echo "
          <div class='row'>
            <div class='col-12 text-center' >
              <div style='border:0.5px solid #fff;border-radius:7px;padding:10px; margin-left:8px; $ColorBtn' >
                <img src='archivos/imagenDientes/$Imagen' width='50' height='50'>
                <span style='color:black !important;'>$varDiente</span>
              </div>
            </div>
          </div>
          ";
        }
      }
    }
     ?>
  </div>
</div>
