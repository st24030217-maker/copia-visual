<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$IdProd = $_GET["IdProd"] ?? "";
$IdDoctor = $_GET["IdDoctor"] ?? "";
$IdOrdenTemp = "10";
$CantidadDientes = 0;
require_once("app/Odontograma/Odontograma.php");
$Odontograma = new Odontograma();
$DetalleOdontogramaTemp = $Odontograma->getOdontogramaTemporal($IdOrdenTemp,$IdDoctor);
for ($i=0; $i <sizeof($DetalleOdontogramaTemp) ; $i++) {
	$D11 = $DetalleOdontogramaTemp[$i]["D11"];
	$D12 = $DetalleOdontogramaTemp[$i]["D12"];
	$D13 = $DetalleOdontogramaTemp[$i]["D13"];
	$D14 = $DetalleOdontogramaTemp[$i]["D14"];
	$D15 = $DetalleOdontogramaTemp[$i]["D15"];
	$D16 = $DetalleOdontogramaTemp[$i]["D16"];
	$D17 = $DetalleOdontogramaTemp[$i]["D17"];
	$D18 = $DetalleOdontogramaTemp[$i]["D18"];
	$D21 = $DetalleOdontogramaTemp[$i]["D21"];
	$D22 = $DetalleOdontogramaTemp[$i]["D22"];
	$D23 = $DetalleOdontogramaTemp[$i]["D23"];
	$D24 = $DetalleOdontogramaTemp[$i]["D24"];
	$D25 = $DetalleOdontogramaTemp[$i]["D25"];
	$D26 = $DetalleOdontogramaTemp[$i]["D26"];
	$D27 = $DetalleOdontogramaTemp[$i]["D27"];
	$D28 = $DetalleOdontogramaTemp[$i]["D28"];
	$D31 = $DetalleOdontogramaTemp[$i]["D31"];
	$D32 = $DetalleOdontogramaTemp[$i]["D32"];
	$D33 = $DetalleOdontogramaTemp[$i]["D33"];
	$D34 = $DetalleOdontogramaTemp[$i]["D34"];
	$D35 = $DetalleOdontogramaTemp[$i]["D35"];
	$D36 = $DetalleOdontogramaTemp[$i]["D36"];
	$D37 = $DetalleOdontogramaTemp[$i]["D37"];
	$D38 = $DetalleOdontogramaTemp[$i]["D38"];
	$D41 = $DetalleOdontogramaTemp[$i]["D41"];
	$D42 = $DetalleOdontogramaTemp[$i]["D42"];
	$D43 = $DetalleOdontogramaTemp[$i]["D43"];
	$D44 = $DetalleOdontogramaTemp[$i]["D44"];
	$D45 = $DetalleOdontogramaTemp[$i]["D45"];
	$D46 = $DetalleOdontogramaTemp[$i]["D46"];
	$D47 = $DetalleOdontogramaTemp[$i]["D47"];
	$D48 = $DetalleOdontogramaTemp[$i]["D48"];
	$D51 = $DetalleOdontogramaTemp[$i]["D51"];
	$D52 = $DetalleOdontogramaTemp[$i]["D52"];
	$D53 = $DetalleOdontogramaTemp[$i]["D53"];
	$D54 = $DetalleOdontogramaTemp[$i]["D54"];
	$D55 = $DetalleOdontogramaTemp[$i]["D55"];
	$D61 = $DetalleOdontogramaTemp[$i]["D61"];
	$D62 = $DetalleOdontogramaTemp[$i]["D62"];
	$D63 = $DetalleOdontogramaTemp[$i]["D63"];
	$D64 = $DetalleOdontogramaTemp[$i]["D64"];
	$D65 = $DetalleOdontogramaTemp[$i]["D65"];
	$D71 = $DetalleOdontogramaTemp[$i]["D71"];
	$D72 = $DetalleOdontogramaTemp[$i]["D72"];
	$D73 = $DetalleOdontogramaTemp[$i]["D73"];
	$D74 = $DetalleOdontogramaTemp[$i]["D74"];
	$D75 = $DetalleOdontogramaTemp[$i]["D75"];
	$D81 = $DetalleOdontogramaTemp[$i]["D81"];
	$D82 = $DetalleOdontogramaTemp[$i]["D82"];
	$D83 = $DetalleOdontogramaTemp[$i]["D83"];
	$D84 = $DetalleOdontogramaTemp[$i]["D84"];
	$D85 = $DetalleOdontogramaTemp[$i]["D85"];

	$CantidadDientes = $D11+$D12+$D13+$D14+$D15+$D16+$D17+$D18+$D21+$D22+$D23+$D24+$D25+$D26+$D27+$D28+$D31+$D32+$D33
	+ $D34+$D35+$D36+$D37+$D38+$D41+$D42+$D43+$D44+$D45+$D46+$D47+$D48+$D51+$D52+$D53+$D54+$D55+$D61+$D62+$D63+$D64+$D65+$D71
	+$D72+$D73+$D74+$D75+$D81+$D82+$D83+$D84+$D85;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
				 <input type="text" name="" value="<?php echo $IdDoctor  ?>">

				 <form class="" action="app/Ordenes/App.php" method="post" id="formColor">
					 <input type="text" name="op" value="updateColorOrdenT" style="display:none;">
					 <input type="text" name="IdD" value="<?php echo $IdDoctor ?>" style="display:none;">
					 <input type="text" name="IdOrdT" value="<?php echo $IdOrdenTemp ?>" style="display:none;">

					 <div class="col-3 col-lg-3">
						 <select class="form-control" name="slctcolor" id="slctcolor" required>
							 <option value="" selected disabled>Lista de Colores</option>
							 <?php
							 require_once("app/Ordenes/Ordenes.php");
							 $OrdenesC = new Ordenes();
							 $ListColores = $OrdenesC->getColores();
							 for ($i=0; $i < sizeof($ListColores) ; $i++) {
								 $idColores = $ListColores[$i]["idColores"];
								 $Color = $ListColores[$i]["Color"];
								 echo "
								 <option value='$idColores'>$Color</option>
								 ";
							 }
								?>
						 </select>
						 <button type="button" name="btnColors" class="" onclick="updateColorOrdenT('')">Siguiente</button>
					 </div>
				 </form>

				 <form class="" action="app/Ordenes/App.php" method="post">

         	<div class="row contenedores" >
           <div class="col-7 col-lg-7 contenedoresCuatro">
             <div class="row">
               <div class="col-3 col-lg-3">
								 <h5>Numero de Dientes</h5>
								 <input type="text" name="" value="<?php echo $CantidadDientes ?>" class="form-control" disabled>
               </div>
							 <div class="col-3 col-lg-3">
							 	<select class="form-control" name="slctPacientes" onchange="updateOrdenTempOdonto(this.value)">
							 		<option value="" selected disabled> Pacientes </option>
									<?php
									require_once("app/Pacientes/Pacientes.php");
									$Pacientes = new Pacientes();
									$ListPacientesxD = $Pacientes->getPacientesXDoctor($IdDoctor);
									for ($i=0; $i <sizeof($ListPacientesxD) ; $i++) {
										$Paciente_IdD = $ListPacientesxD[$i]["Paciente_Id"];
										$NombreD = $ListPacientesxD[$i]["Nombre"];
										$ApellidosD = $ListPacientesxD[$i]["Apellidos"];
										echo "
										<option value='$Paciente_IdD'> $NombreD $ApellidosD </option>

										";
									}
									 ?>
							 	</select>
							 </div>
							 <div class="col-3 col-lg-3">
							 	<button type="button" name="newPac"id="newPac" class="btn btnIconAgregarP" onclick="newPacientemodalfunction('')">Nuevo Paciente</button>
							 </div>
             </div>
           </div>

           <div class="col-4 col-lg-4 contenedoresCuatro offset-lg-1">
              <div class="Table-responsive">
                <table id="Ttemporal" class="table text-center table-hover" style="color:black;">
                  <thead>
                    <tr>
                      <th>idProducto</th>
                      <th>Piezas</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
              <?php
              require_once("app/Ordenes/Ordenes.php");
              $OrdenesT = new Ordenes();
              $ListadoPedidoTemp = $OrdenesT->getOrdenTemporal($IdDoctor,$IdProd);
              for ($i=0; $i <sizeof($ListadoPedidoTemp) ; $i++) {
                $Producto_id = $ListadoPedidoTemp[$i]["Producto_id"];
                $Piezas = $ListadoPedidoTemp[$i]["Piezas"];
                $Monto = $ListadoPedidoTemp[$i]["Monto"];
                echo "
                <td>$Producto_id </td>
                <td>$Piezas</td>
                <td>$Monto</td>

                ";
              }
               ?>
                 </tbody>
               </table>
              </div>
          </div>



				</form>
				<div class="row contenedoresCuatro"  style="margin-top:25px">
				<form class="" action="app/Ordenes/App.php" id="formObservaciones" method="post">
					<input type="text" name="op" value="añadirObservacionesOrdenTemp" style="display:none;">
					<input type="text" name="IdD" value="<?php echo $IdDoctor ?>" style="display:none;">
					<input type="text" name="IdOrdT" value="<?php echo $IdOrdenTemp ?>" style="display:none;">

						<div class="col-7 col-lg-7 ">
							<input type="text" name="txtObservaciones" id="txtObservaciones"  class="form-control" placeholder="Observaciones">
						</div>
						<div class="col-5 col-lg-5">
							<button type="button" name="btnGuardarObserv" id="btnGuardarObserv" class="btn btnIconAgregarP" onclick="añadirObservaciones('')">Siguiente</button>
						</div>
				</form>
			</div>


				<form class="" action="app/Odontograma/Odontograma.php" method="post" id="formUpdateOdontogramaTemp">
					<input type="text" name="op" value="updateOdontogramaTemporal" style="display:none">
					<input type="text" name="idDoctor" id="idDoctor" value="<?php echo $IdDoctor ?>" style="display:none">
					<input type="text" name="idOrdenTemp" id="idOrdenTemp" value="<?php echo $IdOrdenTemp ?>" style="display:none">
					<div class="col-12 col-lg-12 contenedoresCuatro" style="margin-top:30px">
            <div class="col-1 col-lg-1">
							<?php
							if ($D11 == "0") {
								$varclass11 = "btnIconEliminar";
							}
							else {
								$varclass11 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD11" id="txtD11" value="<?php echo $D11 ?>" style="display:none;">
              <button type="button" name="btnD11" id="btnD11" class="btn <?php echo $varclass11 ?>" onclick="updateOdontogramafunction(this)">D11</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D12 == "0") {
								$varclass12 = "btnIconEliminar";
							}
							else {
								$varclass12 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD12" id="txtD12" value="<?php echo $D12 ?>" style="display:none;">
              <button type="button" name="btnD12" id="btnD12" class="btn <?php echo $varclass12 ?>" onclick="updateOdontogramafunction(this)">D12</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D13 == "0") {
								$varclass13 = "btnIconEliminar";
							}
							else {
								$varclass13 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD13" id="txtD13" value="<?php echo $D13 ?>"style="display:none;">
              <button type="button" name="btnD13" id="btnD13" class="btn <?php echo $varclass13 ?>" onclick="updateOdontogramafunction(this)">D13</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D14 == "0") {
								$varclass14 = "btnIconEliminar";
							}
							else {
								$varclass14 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD14" id="txtD14" value="<?php echo $D14 ?>"style="display:none;">
              <button type="button" name="btnD14" id="btnD14" class="btn <?php echo $varclass14 ?>" onclick="updateOdontogramafunction(this)">D14</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D15 == "0") {
								$varclass15 = "btnIconEliminar";
							}
							else {
								$varclass15 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD15" id="txtD15" value="<?php echo $D15 ?>"style="display:none;">
              <button type="button" name="btnD15" id="btnD15" class="btn <?php echo $varclass15 ?>" onclick="updateOdontogramafunction(this)">D15</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D16 == "0") {
								$varclass16 = "btnIconEliminar";
							}
							else {
								$varclass16 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD16" id="txtD16" value="<?php echo $D16 ?>"style="display:none;">
              <button type="button" name="btnD16" id="btnD16" class="btn <?php echo $varclass16 ?>" onclick="updateOdontogramafunction(this)">D16</button>
            </div>
            <div class="col-1 col-lg-1"><?php
						if ($D17 == "0") {
							$varclass17 = "btnIconEliminar";
						}
						else {
							$varclass17 = "btnIconAgregarP";
						}
						 ?>
              <input type="text" name="txtD17" id="txtD17" value="<?php echo $D17 ?>"style="display:none;">
              <button type="button" name="btnD17" id="btnD17" class="btn <?php echo $varclass17 ?>" onclick="updateOdontogramafunction(this)">D17</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D18 == "0") {
								$varclass18 = "btnIconEliminar";
							}
							else {
								$varclass18 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD18" id="txtD18" value="<?php echo $D18 ?>"style="display:none;">
              <button type="button" name="btnD18" id="btnD18" class="btn <?php echo $varclass18 ?>" onclick="updateOdontogramafunction(this)">D18</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D21 == "0") {
								$varclass21 = "btnIconEliminar";
							}
							else {
								$varclass21 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD21" id="txtD21" value="<?php echo $D21 ?>"style="display:none;">
              <button type="button" name="btnD21" id="btnD21" class="btn <?php echo $varclass21 ?>" onclick="updateOdontogramafunction(this)">D21</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D22 == "0") {
								$varclass22 = "btnIconEliminar";
							}
							else {
								$varclass22 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD22" id="txtD22" value="<?php echo $D22 ?>"style="display:none;">
              <button type="button" name="btnD22" id="btnD22" class="btn <?php echo $varclass22 ?>" onclick="updateOdontogramafunction(this)">D22</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D23 == "0") {
								$varclass23 = "btnIconEliminar";
							}
							else {
								$varclass23 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD23" id="txtD23" value="<?php echo $D23 ?>"style="display:none;">
              <button type="button" name="btnD23" id="btnD23" class="btn <?php echo $varclass23 ?>" onclick="updateOdontogramafunction(this)">D23</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D24 == "0") {
								$varclass24 = "btnIconEliminar";
							}
							else {
								$varclass24 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD24" id="txtD24" value="<?php echo $D24 ?>"style="display:none;">
              <button type="button" name="btnD24" id="btnD24" class="btn <?php echo $varclass24 ?>" onclick="updateOdontogramafunction(this)">D24</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D25== "0") {
								$varclass25 = "btnIconEliminar";
							}
							else {
								$varclass25 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD25" id="txtD25" value="<?php echo $D25 ?>"style="display:none;">
              <button type="button" name="btnD25" id="btnD25" class="btn <?php echo $varclass25 ?>" onclick="updateOdontogramafunction(this)">D25</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D26== "0") {
								$varclass26 = "btnIconEliminar";
							}
							else {
								$varclass26 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD26" id="txtD26" value="<?php echo $D26 ?>"style="display:none;">
              <button type="button" name="btnD26" id="btnD26" class="btn <?php echo $varclass26 ?>" onclick="updateOdontogramafunction(this)">D26</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D27== "0") {
								$varclass27 = "btnIconEliminar";
							}
							else {
								$varclass27 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD27" id="txtD27" value="<?php echo $D27 ?>"style="display:none;">
              <button type="button" name="btnD27" id="btnD27" class="btn <?php echo $varclass27 ?>" onclick="updateOdontogramafunction(this)">D27</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D28== "0") {
								$varclass28 = "btnIconEliminar";
							}
							else {
								$varclass28 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD28" id="txtD28" value="<?php echo $D28 ?>"style="display:none;">
              <button type="button" name="btnD28" id="btnD28" class="btn <?php echo $varclass28 ?>" onclick="updateOdontogramafunction(this)">D28</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D31== "0") {
								$varclass31 = "btnIconEliminar";
							}
							else {
								$varclass31 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD31" id="txtD31" value="<?php echo $D31 ?>"style="display:none;">
              <button type="button" name="btnD31" id="btnD31" class="btn <?php echo $varclass31 ?>" onclick="updateOdontogramafunction(this)">D31</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D32 == "0") {
								$varclass32 = "btnIconEliminar";
							}
							else {
								$varclass32 = "btnIconAgregarP";
							}
							 ?>
							<input type="text" name="txtD32" id="txtD32" value="<?php echo $D32 ?>"style="display:none;">
              <button type="button" name="btnD32" id="btnD32" class="btn <?php echo $varclass32 ?>" onclick="updateOdontogramafunction(this)">D32</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D33 == "0") {
								$varclass33 = "btnIconEliminar";
							}
							else {
								$varclass33 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD33" id="txtD33" value="<?php echo $D33 ?>"style="display:none;">
              <button type="button" name="btnD33" id="btnD33" class="btn <?php echo $varclass33 ?>" onclick="updateOdontogramafunction(this)">D33</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D34 == "0") {
								$varclass34 = "btnIconEliminar";
							}
							else {
								$varclass34 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD34" id="txtD34" value="<?php echo $D34 ?>"style="display:none;">
              <button type="button" name="btnD34" id="btnD34" class="btn <?php echo $varclass34 ?>" onclick="updateOdontogramafunction(this)">D34</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D35 == "0") {
								$varclass35 = "btnIconEliminar";
							}
							else {
								$varclass35 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD35" id="txtD35" value="<?php echo $D35 ?>"style="display:none;">
              <button type="button" name="btnD35" id="btnD35" class="btn <?php echo $varclass35 ?>" onclick="updateOdontogramafunction(this)">D35</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D36 == "0") {
								$varclass36 = "btnIconEliminar";
							}
							else {
								$varclass36 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD36" id="txtD36" value="<?php echo $D36 ?>"style="display:none;">
              <button type="button" name="btnD36" id="btnD36" class="btn <?php echo $varclass36 ?>" onclick="updateOdontogramafunction(this)">D36</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D37 == "0") {
								$varclass37 = "btnIconEliminar";
							}
							else {
								$varclass37 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD37" id="txtD37" value="<?php echo $D37 ?>"style="display:none;">
              <button type="button" name="btnD37" id="btnD37" class="btn <?php echo $varclass37 ?>" onclick="updateOdontogramafunction(this)">D37</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D38 == "0") {
								$varclass38 = "btnIconEliminar";
							}
							else {
								$varclass38 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD38" id="txtD38" value="<?php echo $D38 ?>"style="display:none;">
              <button type="button" name="btnD38" id="btnD38" class="btn <?php echo $varclass38 ?>" onclick="updateOdontogramafunction(this)">D38</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D41 == "0") {
								$varclass41 = "btnIconEliminar";
							}
							else {
								$varclass41 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD41" id="txtD41" value="<?php echo $D41 ?>"style="display:none;">
              <button type="button" name="btnD41" id="btnD41" class="btn <?php echo $varclass41 ?>" onclick="updateOdontogramafunction(this)">D41</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D42 == "0") {
								$varclass42 = "btnIconEliminar";
							}
							else {
								$varclass42 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD42" id="txtD42" value="<?php echo $D42 ?>"style="display:none;">
              <button type="button" name="btnD42" id="btnD42" class="btn <?php echo $varclass42 ?>" onclick="updateOdontogramafunction(this)">D42</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D43 == "0") {
								$varclass43 = "btnIconEliminar";
							}
							else {
								$varclass43 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD43" id="txtD43" value="<?php echo $D43 ?>"style="display:none;">
              <button type="button" name="btnD43" id="btnD43" class="btn <?php echo $varclass43 ?>" onclick="updateOdontogramafunction(this)">D43</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D44 == "0") {
								$varclass44 = "btnIconEliminar";
							}
							else {
								$varclass44 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD44" id="txtD44" value="<?php echo $D44 ?>"style="display:none;">
              <button type="button" name="btnD44" id="btnD44" class="btn <?php echo $varclass44 ?>" onclick="updateOdontogramafunction(this)">D44</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D45 == "0") {
								$varclass45 = "btnIconEliminar";
							}
							else {
								$varclass45 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD45" id="txtD45" value="<?php echo $D45 ?>"style="display:none;">
              <button type="button" name="btnD45" id="btnD45" class="btn <?php echo $varclass45 ?>" onclick="updateOdontogramafunction(this)">D45</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D46 == "0") {
								$varclass46 = "btnIconEliminar";
							}
							else {
								$varclass46 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD46" id="txtD46" value="<?php echo $D46 ?>"style="display:none;">
              <button type="button" name="btnD46" id="btnD46" class="btn <?php echo $varclass46 ?>" onclick="updateOdontogramafunction(this)">D46</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D47 == "0") {
								$varclass47 = "btnIconEliminar";
							}
							else {
								$varclass47 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD47" id="txtD47" value="<?php echo $D47 ?>"style="display:none;">
              <button type="button" name="btnD47" id="btnD47" class="btn <?php echo $varclass47 ?>" onclick="updateOdontogramafunction(this)">D47</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D48 == "0") {
								$varclass48 = "btnIconEliminar";
							}
							else {
								$varclass48 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD48" id="txtD48" value="<?php echo $D48 ?>"style="display:none;">
              <button type="button" name="btnD48" id="btnD48" class="btn <?php echo $varclass48 ?>" onclick="updateOdontogramafunction(this)">D48</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D51 == "0") {
								$varclass51 = "btnIconEliminar";
							}
							else {
								$varclass51 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD51" id="txtD51" value="<?php echo $D51 ?>"style="display:none;">
              <button type="button" name="btnD51" id="btnD51" class="btn <?php echo $varclass51 ?>" onclick="updateOdontogramafunction(this)">D51</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D52 == "0") {
								$varclass52 = "btnIconEliminar";
							}
							else {
								$varclass52 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD52" id="txtD52" value="<?php echo $D52 ?>"style="display:none;">
              <button type="button" name="btnD52" id="btnD52" class="btn <?php echo $varclass52 ?>" onclick="updateOdontogramafunction(this)">D52</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D53 == "0") {
								$varclass53 = "btnIconEliminar";
							}
							else {
								$varclass53 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD53" id="txtD53" value="<?php echo $D53 ?>"style="display:none;">
              <button type="button" name="btnD53" id="btnD53" class="btn <?php echo $varclass53 ?>" onclick="updateOdontogramafunction(this)">D53</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D54 == "0") {
								$varclass54 = "btnIconEliminar";
							}
							else {
								$varclass54 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD54" id="txtD54" value="<?php echo $D54 ?>"style="display:none;">
              <button type="button" name="btnD54" id="btnD54" class="btn <?php echo $varclass54 ?>" onclick="updateOdontogramafunction(this)">D54</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D55 == "0") {
								$varclass55 = "btnIconEliminar";
							}
							else {
								$varclass55 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD55" id="txtD55" value="<?php echo $D55 ?>"style="display:none;">
              <button type="button" name="btnD55" id="btnD55" class="btn <?php echo $varclass55 ?>" onclick="updateOdontogramafunction(this)">D55</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D61 == "0") {
								$varclass61 = "btnIconEliminar";
							}
							else {
								$varclass61 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD61" id="txtD61" value="<?php echo $D61 ?>"style="display:none;">
              <button type="button" name="btnD61" id="btnD61" class="btn <?php echo $varclass61 ?>" onclick="updateOdontogramafunction(this)">D61</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D62 == "0") {
								$varclass62 = "btnIconEliminar";
							}
							else {
								$varclass62 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD62" id="txtD62" value="<?php echo $D62 ?>"style="display:none;">
              <button type="button" name="btnD62" id="btnD62" class="btn <?php echo $varclass62 ?>" onclick="updateOdontogramafunction(this)">D62</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D63 == "0") {
								$varclass63 = "btnIconEliminar";
							}
							else {
								$varclass63 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD63" id="txtD63" value="<?php echo $D63 ?>"style="display:none;">
              <button type="button" name="btnD63" id="btnD63" class="btn <?php echo $varclass63 ?>" onclick="updateOdontogramafunction(this)">D63</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D64 == "0") {
								$varclass64 = "btnIconEliminar";
							}
							else {
								$varclass64 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD64" id="txtD64" value="<?php echo $D64 ?>"style="display:none;">
              <button type="button" name="btnD64" id="btnD64" class="btn <?php echo $varclass64 ?>"onclick="updateOdontogramafunction(this)">D64</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D65 == "0") {
								$varclass65 = "btnIconEliminar";
							}
							else {
								$varclass65 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD65" id="txtD65" value="<?php echo $D65 ?>"style="display:none;">
              <button type="button" name="btnD65" id="btnD65" class="btn <?php echo $varclass65 ?>" onclick="updateOdontogramafunction(this)">D65</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D71 == "0") {
								$varclass71 = "btnIconEliminar";
							}
							else {
								$varclass71 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD71" id="txtD71" value="<?php echo $D71 ?>"style="display:none;">
              <button type="button" name="btnD71" id="btnD71" class="btn <?php echo $varclass71 ?>" onclick="updateOdontogramafunction(this)">D71</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D72 == "0") {
								$varclass72 = "btnIconEliminar";
							}
							else {
								$varclass72 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD72" id="txtD72" value="<?php echo $D72 ?>"style="display:none;">
              <button type="button" name="btnD72" id="btnD72" class="btn <?php echo $varclass72 ?>" onclick="updateOdontogramafunction(this)">D72</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D73 == "0") {
								$varclass73 = "btnIconEliminar";
							}
							else {
								$varclass73 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD73" id="txtD73" value="<?php echo $D73 ?>"style="display:none;">
              <button type="button" name="btnD73" id="btnD73" class="btn <?php echo $varclass73 ?>" onclick="updateOdontogramafunction(this)">D73</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D74 == "0") {
								$varclass74 = "btnIconEliminar";
							}
							else {
								$varclass74 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD74" id="txtD74" value="<?php echo $D74 ?>"style="display:none;">
              <button type="button" name="btnD74" id="btnD74" class="btn <?php echo $varclass74 ?>" onclick="updateOdontogramafunction(this)">D74</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D75 == "0") {
								$varclass75 = "btnIconEliminar";
							}
							else {
								$varclass75 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD75" id="txtD75" value="<?php echo $D75 ?>"style="display:none;">
              <button type="button" name="btnD75" id="btnD75" class="btn <?php echo $varclass75 ?>" onclick="updateOdontogramafunction(this)">D75</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D81 == "0") {
								$varclass81 = "btnIconEliminar";
							}
							else {
								$varclass81 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD81" id="txtD81" value="<?php echo $D81 ?>"style="display:none;">
              <button type="button" name="btnD81" id="btnD81" class="btn <?php echo $varclass81 ?>" onclick="updateOdontogramafunction(this)">D81</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D82 == "0") {
								$varclass82 = "btnIconEliminar";
							}
							else {
								$varclass82 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD82" id="txtD82" value="<?php echo $D82 ?>"style="display:none;">
              <button type="button" name="btnD82" id="btnD82" class="btn <?php echo $varclass82 ?>" onclick="updateOdontogramafunction(this)">D82</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D83 == "0") {
								$varclass83 = "btnIconEliminar";
							}
							else {
								$varclass83 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD83" id="txtD83" value="<?php echo $D83 ?>"style="display:none;">
              <button type="button" name="btnD83" id="btnD83" class="btn <?php echo $varclass83 ?>" onclick="updateOdontogramafunction(this)">D83</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D84 == "0") {
								$varclass84 = "btnIconEliminar";
							}
							else {
								$varclass84 = "btnIconAgregarP";
							}
							 ?>
              <input type="text" name="txtD84" id="txtD84" value="<?php echo $D84 ?>"style="display:none;">
              <button type="button" name="btnD84" id="btnD84" class="btn <?php echo $varclass84?>" onclick="updateOdontogramafunction(this)">D84</button>
            </div>
            <div class="col-1 col-lg-1">
							<?php
							if ($D85 == "0") {
								$varclass85 = "btnIconEliminar";
							}
							else {
								$varclass85 = "btnIconAgregarP";
							}
							?>
							<input type="text" name="txtD85" id="txtD85" value="<?php echo $D85 ?>" style="display:none">
							<button type='button' name='btnD85' id='btnD85' class='btn <?php echo $varclass85 ?>' onclick='newPacientemodalfunction(this)'>D85</button>

            </div>
          </div>
				</form>
         </div>


				 <!-- modal -->
				 <div class="modal fade" id="ModalPacientes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog  modal-lg">
						<div class="modal-content ">
							<div class="modal-header ">
								<h5 class="modal-title" id='TituloModal'> Nuevo Paciente</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body ">
								<form id="formInsertaPaciente" method="post" action="app/Pacientes/App.php">
									<div class="form-group">
										<input type="text" class="form-control" id="op" name="op" value="addPacientesXDoctor" style="display:none;">
										<input type="text" class="form-control" id="IdDoct" name="IdDoct" >

										<div class="row">
											<div class="col-4 col-lg-4">
												<h6>Nombre(s)</h6>
												<input type="text" name="txtNombre" id="txtNombre" class="form-control" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Apellidos</h6>
												<input type="text" name="txtApellidos" id="txtApellidos" class="form-control" required>
											</div>
											<div class="col-2 col-lg-2">
												<h6>Sexo</h6>
												<select class="form-control" name="selctSexo" id="selctSexo" required>
													<option value="" selected disabled> Seleccione el Sexo </option>
													<option value="M">M</option>
													<option value="F">F</option>
												</select>
												<br>
											</div>
											<div class="col-2 col-lg-2">
												<h6>Titulo</h6>
												<input type="text" name="txtTitulo" id="txtTitulo" class="form-control" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Dirección</h6>
												<input type="text" name="txtDireccion" id="txtDireccion" class="form-control" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Colonia</h6>
												<input type="text" name="txtColonia" id="txtColonia" class="form-control" required>
											</div>
											<div class="col-2 col-lg-2">
												<h6>Numero</h6>
												<input type="number" name="txtNumero" id="txtNumero" class="form-control" required min="0">
											</div>
											<div class="col-2 col-lg-2">
												<h6>Fecha de Nacimiento</h6>
												<input type="date" name="txtFechaN" id="txtFechaN" class="form-control" required>
												<br>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Celular</h6>
												<input type="text" name="txtCelular" id="txtCelular" class="form-control" onkeypress="return onlynumber(event)" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Telefono</h6>
												<input type="text" name="txtTelefono" id="txtTelefono" class="form-control" onkeypress="return onlynumber(event)" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Email</h6>
												<input type="text" name="txtEmail" id="txtEmail" class="form-control" required>
												<br>
											</div>
											<div class="col-4 col-lg-4">
												<h6>No° Expediente</h6>
												<input type="number" name="txtNoExp" id="txtNoExp" class="form-control" min="0" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>CURP</h6>
												<input type="text" name="txtCURP" id="txtCURP" class="form-control"required maxlength="16">
											</div>
											<div class="col-4 col-lg-4">
												<h6>RFC</h6>
												<input type="text" name="txtRFC" id="txtRFC" class="form-control" required>
												<br>
											</div>
											<div class="col-4 col-lg-4">
												<h6>INE</h6>
												<input type="text" name="txtIne" id="txtIne" class="form-control" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Foto</h6>
												<input type="file" name="inpFoto" id="inpFoto" class="form-control" required>
											</div>
											<div class="col-4 col-lg-4">
												<h6>Folio</h6>
												<input type="number" name="txtFolio" id="txtFolio" value="" class="form-control" required min="0">
												<br>
											</div>
										</div>
									</div>
				 <!-- Aqui va el Segundo Label  -->

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-primary" id="btnguardar" onclick="newPacienteDoctorfunction('')">Guardar</button>
							</div>
							</form>
						</div>
					</div>
				 </div>



        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">



		function updateOdontogramafunction(comp){
		  let id = comp.id;
			alert(id);
			var valorID = $(comp).text();
			var valor = $("#txt"+valorID).val();
			if (valor == "0") {
				$("#txt"+valorID).val("1");
				document.getElementById(id).classList.remove('btnIconEliminar');
				document.getElementById(id).classList.add('btnIconAgregarP');
			} else {
				$("#txt"+valorID).val("0");
				document.getElementById(id).classList.remove('btnIconAgregarP');
				document.getElementById(id).classList.add('btnIconEliminar');
			}

			if (document.getElementById("formUpdateOdontogramaTemp").checkValidity()){
				event.preventDefault();
				var form = $("#formUpdateOdontogramaTemp")[0];
				var data = new FormData(form);

				$.ajax({
					type:"POST",
					url:"app/Odontograma/App.php",
					data:data,
					processData:false,
					contentType:false,
					cache: false,
					timeout:600000,
					success:function(data){
						if (data=="1") {
						 Alerta("success","Actualizado Correctamente");
						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							 location.reload();
						 }, 1500);
						}
						else{
							Alerta("error","No se Actualizo Correctamente");
							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								location.reload();
							}, 1500);
						}
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}
		}

		function newPacientemodalfunction(){
			var IdDoctor = '<?php echo $IdDoctor?>';
			$("#IdDoct").val(IdDoctor);
			$("#ModalPacientes").modal("toggle");
		}


		function newPacienteDoctorfunction(){
			if (document.getElementById("formInsertaPaciente").checkValidity()){
				event.preventDefault();
				var form = $("#formInsertaPaciente")[0];
				var data = new FormData(form);

				$.ajax({
					type:"POST",
					url:"app/Pacientes/App.php",
					data:data,
					processData:false,
					contentType:false,
					cache: false,
					timeout:600000,
					success:function(data){
						if (data=="1") {
						 Alerta("success","Actualizado Correctamente");
						 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							 location.reload();
						 }, 1500);
						}
						else{
							Alerta("error","No se Actualizo Correctamente");
							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								location.reload();
							}, 1500);
						}
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}else {
				Alerta("info","Faltan Campos por llenar");
			}
		}

		function onlynumber(e) {
				 tecla = (document.all) ? e.keyCode : e.which;
				 if (tecla == 8) {
					 return true;
				 }
				 patron = /[-0-9]/;
				 tecla_final = String.fromCharCode(tecla);
				 return patron.test(tecla_final);
			 }

			 function updateOrdenTempOdonto(IdPaciente){
			 			var IdDoct = '<?php echo $IdDoctor ?>';
			 			var Ordenes_Trabajo_Id = '<?php echo $IdOrdenTemp ?>';
			 			$.ajax({
			 			type:"POST",
			 			url:"app/Ordenes/App.php",
			 			data:"op=añadirPacienteOrden"+
			 			"&Doctor_Id="+IdDoct+"&Ordenes_Trabajo_Id="+Ordenes_Trabajo_Id+"&IdPaciente="+IdPaciente,
			 			success:function(data){
			 				if(data=="1"){
			 					Alerta("success","Operacion Exitosa");
			 					setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
			 						location.reload();
			 					}, 1500);
			 				}else{
			 					Alerta("error","No se Realizo Correctamente");
			 					setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
			 						location.reload();
			 					}, 1500);
			 				}
			 	 },
			 		error:function(e){
			 		 alert(e.responseText);
			 			}
			 		});
			 		}


			function añadirObservaciones(){
				if (document.getElementById("formObservaciones").checkValidity()){
					event.preventDefault();
					var form = $("#formObservaciones")[0];
					var data = new FormData(form);

					$.ajax({
						type:"POST",
						url:"app/Ordenes/App.php",
						data:data,
						processData:false,
						contentType:false,
						cache: false,
						timeout:600000,
						success:function(data){
							if (data=="1") {
							 Alerta("success","Actualizado Correctamente");
							 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								 location.reload();
							 }, 1500);
							}
							else{
								Alerta("error","No se Actualizo Correctamente");
								setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
									location.reload();
								}, 1500);
							}
						},
						error:function(e){
							alert(e.responseText);
						}
					});
				}
			}

			function añadirColorOrdenT(){
				if (document.getElementById("formColor").checkValidity()){
					event.preventDefault();
					var form = $("#formColor")[0];
					var data = new FormData(form);

					$.ajax({
						type:"POST",
						url:"app/Ordenes/App.php",
						data:data,
						processData:false,
						contentType:false,
						cache: false,
						timeout:600000,
						success:function(data){
							if (data=="1") {
							 Alerta("success","Actualizado Correctamente");
							 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
								 location.reload();
							 }, 1500);
							}
							else{
								Alerta("error","No se Actualizo Correctamente");
								setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
									location.reload();
								}, 1500);
							}
						},
						error:function(e){
							alert(e.responseText);
						}
					});
				}
			}


    </script>
  </body>
</html>
