<?php
$ValorIni = $_GET["ValorIni"] ?? "";
$ValorFin = $_GET["ValorFin"] ?? "";

 ?>

  <div class="contenedores">
      <div class="Table-responsive table-hover">
      <table id="tablaOrders" class="table text-center table-hover" style="color:black;">
        <thead>
          <tr>
            <th> FOLIO </th>
            <th> Escan </th>
            <th>Doctor</th>
            <th>Paciente</th>
						<th>Producto</th>
            <th>Fecha de Compra</th>

						 <th></th>
          </tr>
        </thead>
        <tbody>
          <?php
           require_once("Backend/Ordenes/Ordenes.php");
           $Ordenes = new Ordenes();
           $ListOrdenes = $Ordenes->getListOrdenes($ValorIni,$ValorFin);
           for ($i=0; $i <sizeof($ListOrdenes) ; $i++) {
             $Ordenes_trabajo_id = $ListOrdenes[$i]["Ordenes_trabajo_id"];
             $Doctor = $ListOrdenes[$i]["Doctor"];
             $Producto = $ListOrdenes[$i]["Producto"];
             $Nombre = $ListOrdenes[$i]["Nombre"];
             $Apellidos = $ListOrdenes[$i]["Apellidos"];
             $Registro = $ListOrdenes[$i]["Registro"];
             $Usuario_id_escanea = $ListOrdenes[$i]["Usuario_id_escanea"];
             $Serie = $ListOrdenes[$i]["Serie"];
             $Con_scan = $ListOrdenes[$i]["Con_scan"];

             if ($Con_scan == "1") {
                $varScan = "Con Escan;";
             }else {
               $varScan = "Sin Escan;";
             }


             if ($Usuario_id_escanea == "") {
               $classBtn = "btn btnIconNoFile";
               $icon = "fa fa-user-plus";
             }
             else {
               $classBtn = "btn btnUpdate";
               $icon = "fa fa-user";

             }

             echo "
             <tr>
               <td> $Serie </td>
               <td> $varScan </td>
               <td>Dr. $Doctor</td>
               <td>$Nombre $Apellidos</td>
               <td>$Producto</td>
               <td>$Registro</td>
               <td>
                <button type='button' class='$classBtn' name='button' onclick='AbrirModalUsuarioEscan(\"$Ordenes_trabajo_id\")'>
                <i class= '$icon'></i>
                </button>

               </td>
             </tr>
             ";
           }
           ?>
        </tbody>
      </table>
    </div>
    </div>
