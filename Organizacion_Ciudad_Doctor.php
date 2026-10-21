<?php
  $IdEstadoOrg = $_GET["IdEstadoOrg"] ?? "";
 ?>
 <select class="form-control" name="slctOrgCiudad" id="slctOrgCiudad" required>
   <option value="" selected disabled> Ciudad de la organización </option>
   <?php
   require_once("Backend/Organizacion/Organizacion.php");
   $Organizacion2 = new Organizacion();
   $ListOrgCiudad = $Organizacion2->getOrganizacionCiudad($IdEstadoOrg);
   for ($i=0; $i < sizeof($ListOrgCiudad) ; $i++) {
     $Organizacion_Ciudades_Id = $ListOrgCiudad[$i]["Organizacion_Ciudades_Id"];
     $Ciudad = $ListOrgCiudad[$i]["Ciudad"];

     if ($IdCiudadOrg == $Organizacion_Ciudades_Id) {
       $slcted = "selected";
     }else {
       $slcted = "";
     }
     echo "
     <option value='$Organizacion_Ciudades_Id' $slcted> $Ciudad </option>
     ";
   }
    ?>
 </select>
