<?php
  $idOrden = $_GET["idOrden"] ?? "";
  $Iva = floatval($_GET["Iva"] ?? 0);

  require_once("Backend/Ordenes/Ordenes.php");
  $CantidadTotalPiezas = new Ordenes();
  $CantPOrden= floatval($CantidadTotalPiezas->getCantPiezasTotalPaquetes($idOrden) ?? 0);

  require_once("Backend/ProductosApp/AdmProductosApp.php");
  $Pre = new AdmProductosApp();
  $PrecioP = $Pre->getPrecioProducto($idOrden);
  $Precio_Base = floatval($PrecioP[0]["Precio_Base"] ?? 0);
  for ($i=0; $i <sizeof($PrecioP) ; $i++) {
    $Precio_Base = floatval($PrecioP[$i]["Precio_Base"] ?? 0);
  }
  $PrecioIva = ($Precio_Base / 100 )*$Iva;
  require_once("Backend/Ordenes/Ordenes.php");
  $Ord = new Ordenes();
  $ConScann = $Ord->getConScannOrdenT($idOrden);
  $Ord2 = new Ordenes();
  $ConModelo = $Ord2->getConModeloOrdenT($idOrden);
 ?>

 <div class="container">
   <div class="row scrollable">
     <span>Superior</span>
     <div class="col-12" style='margin-top:10px;padding:5px; overflow:auto;display:flex;'>
       <?php
       require_once("Backend/Odontograma/Odontograma.php");
       $Odontograma = new Odontograma();
       $Dientes = $Odontograma->getDientes();

       $precioTotal = 0;
       $cantidadDientes = 0;
       $Monto = 0;
       $precioT = 0;
       $PrecioDescuentoPaq = ($Precio_Base * $CantPOrden);
       $PrecioPieza = $Precio_Base;
       if (sizeof($Dientes)>0) {
         for ($i=0; $i < sizeof($Dientes) ; $i++) {
           $idDientesImagen = $Dientes[$i]["idDientesImagen"];
           $Diente = $Dientes[$i]["Diente"];
           $Imagen = $Dientes[$i]["Imagen"];
           $Tipo = $Dientes[$i]["Tipo"];

           $Odontograma2 = new Odontograma();
           $DientesAct = $Odontograma2->getDientesActivoOdontograma($idOrden,$idDientesImagen);

           $PrecioDescuentoPaq = ($Precio_Base * $CantPOrden);
           // $PrecioPieza = ($Precio_Base + $PrecioIva);
           $PrecioPieza = ($Precio_Base);

           // $PrecioDescuentoPaq = (($Precio_Base + $PrecioIva )* $CantPOrden);
           $Odontograma4 = new Odontograma();
           $TipoDienteCons = $Odontograma4->getTipoDienteOrdenDetalle($idOrden,$idDientesImagen);
           if (sizeof($TipoDienteCons) > "0") {
             for ($j=0; $j < sizeof($TipoDienteCons) ; $j++) {
               $TipoDiente = $TipoDienteCons[$j]["TipoDiente"];
               if ($TipoDiente == "Pilares") {
                 $ColorBtn = "background:#48C9B0;";
               }elseif ($TipoDiente == "Ponticos") {
                 $ColorBtn = "background:#F5B041;";
               }
             }
           }else {
             $ColorBtn = "background:white;";
           }
             if ($DientesAct == "0") {
               $Activo = "0";
             }
             else {
               $precioTotal += $Precio_Base;
               $cantidadDientes += 1;
               $Activo = "1";
             }
             $varDiente = substr("$Diente",1);
           if ($Tipo == "Superior") {
             echo "
             <div class='row'>
               <div class='col-12 text-center' >
                 <div style='border:0.5px solid #fff;border-radius:7px;padding:10px; margin-left:8px; $ColorBtn' onclick='EditarOrdenDetalle(\"$idOrden\",\"$idDientesImagen\",\"$Activo\")'>
                   <img src='Archivos/imagenDientes/$Imagen' width='50' height='50'>
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

           $Odontograma3 = new Odontograma();
           $DientesAct = $Odontograma3->getDientesActivoOdontogramaInf($idOrden,$idDientesImagen);

           $Odontograma4 = new Odontograma();
           $TipoDienteCons = $Odontograma4->getTipoDienteOrdenDetalle($idOrden,$idDientesImagen);
           if (sizeof($TipoDienteCons) > "0") {
             for ($j=0; $j < sizeof($TipoDienteCons) ; $j++) {
               $TipoDiente = $TipoDienteCons[$j]["TipoDiente"];
               if ($TipoDiente == "Pilares") {
                 $ColorBtn = "background:#48C9B0;";
               }elseif ($TipoDiente == "Ponticos") {
                 $ColorBtn = "background:#F5B041;";
               }
             }
           }else {
             $ColorBtn = "background:white;";
           }

             if ($DientesAct == "0") {
               $Activo = "0";
             }
             else {
               $precioTotal += $Precio_Base;
               $cantidadDientes += 1;
               $Activo = "1";
             }
             $varDiente = substr("$Diente",1);

           if ($Tipo == "Inferior") {
             echo "
             <div class='row'>
               <div class='col-12 text-center' >
                 <div style='border:0.5px solid #fff;border-radius:7px;padding:10px; margin-left:8px; $ColorBtn' onclick='EditarOrdenDetalleInf(\"$idOrden\",\"$idDientesImagen\",\"$Activo\")'>
                   <img src='Archivos/imagenDientes/$Imagen' width='50' height='50'>
                   <span style='color:black !important;'>$varDiente</span>
                 </div>
               </div>
             </div>
             ";
           }
         }
         $precioTotalConIva = ($precioTotal + ($PrecioIva * $cantidadDientes));

         if ($ConScann == "1") {
           $precioScann = number_format("300",2);
           if ($CantPOrden > "0") {
             $Monto = $Monto + $precioTotal - 300;
             $precioTotal = ($precioTotal -$PrecioDescuentoPaq);
           }else {
             $Monto = $Monto + $precioTotal;
             $precioTotal = ($precioTotal -$PrecioDescuentoPaq)+ 300;
           }
           $precioT = ($precioT + $precioTotal);
           $MontoSinFormato = $precioTotal;
           $precioTotal = number_format($precioTotal,2);
         }else {
           $precioScann = number_format("0",2);
           $precioTotal = ($precioTotal -$PrecioDescuentoPaq);
           $Monto = $Monto + $precioTotal;
           $MontoSinFormato = $precioTotal;

           $precioT = ($precioT + $precioTotal - 300);
           $precioTotal = number_format($precioTotal,2);
         }


        echo "
        <script type='text/javascript'>
        if ($Monto =='0') {
          $('#divGenerarOrden').fadeIn();
          $('#divMandarACheckOut').fadeOut();
        }else if ($Monto > '0') {
          $('#divGenerarOrden').fadeOut();
          $('#divMandarACheckOut').fadeIn();
        }
          $('#txtMontoSinIva').val($MontoSinFormato);
          $('#precioTotal').text('$ $precioTotal');
          $('#txtPrecioTotal').val($Monto);
          $('#txtPrecioUnidad').val($PrecioPieza);
          $('#txtPrecioT').val($precioT);
          $('#spanCantidadD').text($cantidadDientes);
          $('#txtCantidadPiezas').val($cantidadDientes);

          $('#inpValorPiezasOrden').val($CantPOrden);
          $('#spanCantidadScan').text('$ $precioScann');
          $('#inpConScann').val($ConScann);
          $('#inpConModelo').val($ConModelo);
        </script>
        ";
       }
        ?>
     </div>
   </div>

 </div>
