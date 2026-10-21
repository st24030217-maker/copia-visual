<?php
$IdDoctor = $_GET["IdDoctor"] ?? "";
$idOrden = $_GET["idOrden"] ?? "";
require_once("Backend/ProductosApp/AdmProductosApp.php");
$Pre = new AdmProductosApp();
$PrecioP2 = $Pre->getPrecioProducto($idOrden);
$Precio_B = $PrecioP2[0]["Precio_Base"];
require_once("Backend/Usuarios/Usuarios.php");
$Paquetes = new Usuarios();
$ListPaquetesD = $Paquetes->getPaquetesDisponiblesDoctor($IdDoctor,$idOrden);
 ?>
 <div class="row">
   <div class="col-12 col-lg-12">
           <div class="row">
             <div class="col-12 col-lg-12 text-center">
               <h4>Mis Paquetes</h4>
               <br>
             </div>
             <?php
             if (sizeof($ListPaquetesD)> "0" ) {
               // code...
              ?>
              <div class="col-2 col-lg-2" style='text-align:center'>
                  <span><b>FOLIO</b></span>
               </div>
               <div class="col-2 col-lg-2" style='text-align:center'>
                 <span><b>Paquete</b></span>
               </div>
               <div class="col-2 col-lg-2" style='text-align:center'>
                 <span><b>Disponible</b></span>
               </div>
               <div class="col-2 col-lg-2" style='text-align:center'>
                 <span><b>Disponible Pagadas</b></span>
               </div>
               <div class="col-4 col-lg-4" style='text-align:center'>
                 <span><b>Escoger Cantidad</b></span>
                 <br>
               </div>
               <!-- <div class="row"> -->


             <?php

             for ($i=0; $i <sizeof($ListPaquetesD) ; $i++) {
                $idLab_Paquetes_Doctor_Cantidad = $ListPaquetesD[$i]["idLab_Paquetes_Doctor_Cantidad"];
                $Paquete = $ListPaquetesD[$i]["Paquete"];
                $Serie = $ListPaquetesD[$i]["Serie"];
                $CantidadDisponible = $ListPaquetesD[$i]["CantidadDisponible"];
                $PiezasDispPagadasRedondeada = $ListPaquetesD[$i]["PiezasDispPagadasRedondeada"];
                $IdPaquetesDoctor = $ListPaquetesD[$i]["IdPaquetesDoctor"];

                require_once("Backend/Ordenes/Ordenes.php");
               $PaquetesCantidad = new Ordenes();
               $CantidadPiezasPaquete = new Ordenes();
               $CantidadPiezas = $PaquetesCantidad->getLab_Paquete_Orden($idOrden,$idLab_Paquetes_Doctor_Cantidad);
               $CAPaq = $CantidadPiezasPaquete->cantidadPiezasPaqueteOrden($idOrden,$idLab_Paquetes_Doctor_Cantidad);

                if ($CantidadPiezas != "0") {
                  $operacion = "0";
                }else {
                  $operacion = "1";
                }

                if ($CAPaq > "1") {
                  $operacion2 = "0";
                }else if($CAPaq == "1"){
                  $operacion2 = "1";
                }
                echo "
                <div class='col-2 col-lg-2' style='text-align:center'>
                  <span style='font-size:15px !important;'>$Serie</span>
                </div>
                <div class='col-2 col-lg-2' style='text-align:center'>
                  <span style='font-size:15px !important;'>$Paquete</span>
                </div>
                <div class='col-2 col-lg-2' style='text-align:center'>
                  <span style='font-size:15px !important;'>$CantidadDisponible</span>
                </div>
                <div class='col-2 col-lg-2' style='text-align:center'>
                  <span style='font-size:15px !important;'>$PiezasDispPagadasRedondeada</span>
                </div>
                <div class='col-4 col-lg-4 text-center' style=''>
                  <div class='row'>
                      <div class='col-12 col-lg-6 offset-lg-3'>
                          <a href='#' class='inpDisp' onclick='removeCantPaquete(\"$idLab_Paquetes_Doctor_Cantidad\",\"$CantidadDisponible\",\"$operacion2\",\"$idOrden\")'><i class='fa fa-minus color-red-dark'></i></a>
                          <input type='number' min='0' style='width:30%' value='$CAPaq' id='CantInp$idLab_Paquetes_Doctor_Cantidad' disabled>
                          <a href='#' class='inpDisp' onclick='addCantPaquete(\"$idLab_Paquetes_Doctor_Cantidad\",$PiezasDispPagadasRedondeada,\"$operacion\",\"$idOrden\")'><i class='fa fa-plus color-green-dark'></i></a>
                      </div>
                      <div class='clearfix'></div>
                  </div>
                </div>
                ";
              }
              ?>
           <!-- </div> -->
           <?php
           } else {
             echo "
             <div class='col-12 col-lg-12 text-center'>
              <span style='font-size:25px;'> No tiene paquetes disponibles </span>
             </div>
             ";
           }
            ?>
         </div>


     </div>


 </div>
