<select class="form-control" name="selectEquipos" id="selectEquipos">
  <option value="" selected disabled>Seleccione Equipo</option>
  <?php
    require_once("Backend/Equipos/AdmEquipos.php");
    $AdmEquipos = new AdmEquipos();
    $ListEquipos = $AdmEquipos->getEquipos();
    for ($i=0; $i <sizeof($ListEquipos) ; $i++) {
      $idEquipos = $ListEquipos[$i]["idEquipos"];
      $Descripcion = $ListEquipos[$i]["Descripcion"];

      echo "
      <option value='$idEquipos'>$Descripcion</option>
      ";
     }

   ?>
</select>
