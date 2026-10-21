<?php
$IdEstadoOrg = $_GET["IdEstadoOrg"] ?? "";
 ?>
     <select class="form-control" name="slctOrgCiudad" id="slctOrgCiudad" required>
       <option value="" selected disabled> Ciudad de la organización </option>
       <?php
       require_once("Backend/Configuracion/Configuracion.php");
       $Configuracion4 = new Configuracion();
       $ListOrgCiudad = $Configuracion4->getCiudadesOrganizacion($IdEstadoOrg);
       for ($i=0; $i < sizeof($ListOrgCiudad) ; $i++) {
         $Organizacion_Ciudades_Id = $ListOrgCiudad[$i]["Organizacion_Ciudades_Id"];
         $Ciudad = $ListOrgCiudad[$i]["Ciudad"];
         echo "
         <option value='$Organizacion_Ciudades_Id' $slcted> $Ciudad </option>
         ";
       }
        ?>
     </select>
