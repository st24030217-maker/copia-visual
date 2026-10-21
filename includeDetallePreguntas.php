<?php
  $idCuestionarios = $_GET["idCuestionarios"] ?? "";
 ?>

 <div class="row">
   <?php
    require_once("Backend/Cuestionarios/Cuestionarios.php");
    $Cuest = new Cuestionarios();
    $ListPregu = $Cuest->getPreguntasCuestionario($idCuestionarios);
    for ($i=0; $i < sizeof($ListPregu) ; $i++) {
      $idCuestionarioDetalle = $ListPregu[$i]["idCuestionarioDetalle"];
      $Pregunta = $ListPregu[$i]["Pregunta"];
      $Numerico = $ListPregu[$i]["Numerico"];
      $ValorInicial = $ListPregu[$i]["ValorInicial"];
      $ValorFinal = $ListPregu[$i]["ValorFinal"];
      $Booleano = $ListPregu[$i]["Booleano"];

      if ($Numerico == "1") {
        $numChecked = "checked";
      }else {
        $numChecked = "";
      }

      if ($Booleano == "1") {
        $boolChecked = "checked";
        $MostrarInput = "display:none;";
      }else {
        $boolChecked = "";
        $MostrarInput = "";
      }
      echo "
        <div class='col-12 col-lg-12'>
           <input type='text'  class='form-control' id='idPreg$idCuestionarioDetalle'style='display:none;'>
           <h6>Pregunta:</h6>
           <input type='text' id='Pregunta$idCuestionarioDetalle' class='form-control' value='$Pregunta'>
        </div>
        <div class='col-1 col-lg-1'>
           <label for='recipient-name' class='col-form-label'>Booleano:</label>
           <input id='inpCheckB$idCuestionarioDetalle' name=inpCheckB$idCuestionarioDetalle' value='$Booleano' style='display:none;'>
           <input type='checkbox' class='form-control' id='checkB$idCuestionarioDetalle' name='checkB$idCuestionarioDetalle' onclick='updateCheckBoolInclude(\"$idCuestionarioDetalle\")' $boolChecked>
         </div>
         <div class='col-1 col-lg-1'>
          <label for='recipient-name' class='col-form-label'>Numerico:</label>
          <input id='inpCheckN$idCuestionarioDetalle' name='inpCheckN$idCuestionarioDetalle' value='$Numerico' style='display:none;'>
          <input type='checkbox' class='form-control' id='checkN$idCuestionarioDetalle' name='checkN$idCuestionarioDetalle' value='' onclick='updateCheckNumlInclude(\"$idCuestionarioDetalle\")' $numChecked>
        </div>
        <div class='col-3 col-lg-3'  id='divValorIni$idCuestionarioDetalle'>
          <label for='recipient-name' id='lblVIni$idCuestionarioDetalle' class='col-form-label' style='$MostrarInput'>Valor Inicial:</label>
          <input type='number' class='form-control' id='txtValorIn$idCuestionarioDetalle' name='txtValorIn$idCuestionarioDetalle' min='0' value='$ValorInicial' style='$MostrarInput'>
        </div>
        <div class='col-3 col-lg-3'  id='divVF$idCuestionarioDetalle'>
          <label for='recipient-name' id='lblVF$idCuestionarioDetalle' class='col-form-label' style='$MostrarInput'>Valor Final:</label>
          <input type='number' class='form-control' id='txtValorF$idCuestionarioDetalle' name='txtValorF$idCuestionarioDetalle' min='1' value='$ValorFinal' style='$MostrarInput'>
        </div>
        <div class='col-2 col-lg-2'>
          <button type='button' name='button' class='btn btnUpdate' onclick='updatePreguntasCuestionario(\"$idCuestionarioDetalle\")' style='margin-top:35px;'>
            <i class='fa fa-pencil'></i>
          </button>
        </div>
        <div class='col-2 col-lg-2'>
          <button type='button' name='button' class='btn btnQuitarTemporal' onclick='deletePreguntaCuestionario(\"$idCuestionarioDetalle\")' style='margin-top:35px;'>
            <i class='fa fa-trash-o '></i>
          </button>
        </div>
        <div class=''>
          <br>
        </div>


      ";
    }
    ?>
 </div>
