<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$IdPaquete = $_GET["IdPaquete"] ?? "";
require_once("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
$Paquetes = new AdmProductos_Paquetes();
$DetallePaq = $Paquetes->getDetallePaqueteSeleccionado($IdPaquete);
for ($i=0; $i <sizeof($DetallePaq) ; $i++) {
  $Productos_Paquetes_Id = $DetallePaq[$i]["Productos_Paquetes_Id"];
  $Paquete = $DetallePaq[$i]["Paquete"];
  $Costo = $DetallePaq[$i]["Costo"];
  $Descripcion = $DetallePaq[$i]["Descripcion"];
  $Costo2 = number_format($Costo, 2)."\n";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
		<input type="hidden" id="CostoPaquete" value="<?php echo $Costo ?>">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content backtheme">
                <div class="modal-body">
                  <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
                <br>
                <div class="row text-center">
                  <div class="col-12">
                    <span style="color:#212121 !important;" id='tituloCargando'>Procesando...</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-12 text-center">
            <div class="row">
                <div class="col-12 col-lg-12 text-center" style="margin-top:5vh">
                  <span id=""><b>Metodos de Pago: </b></span>
                  <select onchange="changeMetodoPago(this.value)" class="form-control text-center" style="width: 100%;"   id="MetodoPago" name="MetodoPago"  style="background-color:#212121 !important; text-align:center" >
                  </select>
                </div>
              </div>
          </div>
          <div class="col-12 col-lg-12" id="formulariotrasferencia" style="display:none;">
            <div class="contenedores" style="height:35vh !important;cursor:pointer; margin-top:3vh">
              <div class="content">
                <div class="row">
                  <div class="col-12 col-lg-12">
                    <h4>Pago con Transferencia</h4>
                    <br>
                  </div>
                  <div class="col-12 col-lg-12">
                    <span>Pasos a seguir</span>
                  </div>
                  <div class="col-12 col-lg-12">
                    <span>1.Realiza la transferencia a alguna de las siguientes cuentas
                    <b>NOTA: Como referencia escribir el número de la orden una vez ya generada la misma, en caso de pagar escribir en referencia nombre del doctor  JOSÉ ANTONIO ALATORRE SERNA </b></span>
                    <br>
                    <span><b>- BANREGIO</b></span>
                    <br>
                    <span>No CTA 082014340013</span>
                    <br>
                    <span><b>- BBVA BANCOMER</b></span>
                    <br>
                    <span>No CTA 0106012973</span>
                    <br>
                    <span><b>TARJETA</b></span>
                    <br>
                    <span>4152 3131 9785 2283</span>
                    <br>
                    <span>3. Realizar el pago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-12" id="formularioRecoleccionEf" style="display:none;">
            <div class="contenedores" style="height:15vh !important;cursor:pointer; margin-top:3vh">
              <div class="content">
                <div class="row">
                  <div class="col-12 col-lg-12">
                    <h4>Recoleccion de efectivo</h4>
                    <br>
                  </div>
                  <div class="col-12 col-lg-12">
                    <span>Pasos a seguir</span>
                  </div>
                  <div class="col-12 col-lg-12">
                    <span>Nuestro equipo DENT recolectara el dinero completo de su pago en la dirección configurada en su perfil.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6" style="margin-top:3vh">
            <div class="contenedores" style="height:15vh !important;cursor:pointer; margin-top:3vh">
                <div class="content">
                  <div class="row">
                    <div class="col-12 col-lg-12 text-center" style="margin-top:1vh">
                      <h4>PAQUETE</h4>
											<hr>
                    </div>
                    <div class="col-12 col-lg-12 text-center">
                      <h5><?php echo $Paquete ?></h5>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-12 col-lg-6" style="margin-top:3vh">
            <div class="contenedores" style="cursor:pointer; margin-top:3vh">
                <div class="content">
                  <div class="row">
										<div class="col-12">
											<h3>Montos</h3>
										</div>
                    <div class="col-12">
                      <div class="row">
												<div class="col-12">
													<div class="row">
														<div class="col-6" style="text-align:center">
		                          <h5>Sub Total</h5>
		                        </div>
		                        <div class="col-6" style="text-align:center">
		                          <h5>$ <?php echo $Costo2 ?></h5>
		                        </div>
													</div>
													<hr>
												</div>
                        <div class="col-12">
                        	<div class="row">
														<div class="col-6">
		                          <h5>Anticipo</h5>
		                        </div>
		                        <div class="col-6 col-lg-4 offset-lg-1 text-center" style="text-align:center">
		                          <input type="text" name="PrecioPersonalizado" id="PrecioPersonalizado" value="<?php echo $Costo ?>" class="form-control" style="text-align:center" onkeyup="cantidadIngresadafunction()" onkeypress="return onlynumber(event)">
		                        </div>
                        	</div>
													<hr>
                        </div>
												<div class="col-12">
													<div class="row">
														<div class="col-6">
															<h5>IVA</h5>
														</div>
														<div class="col-6" style="text-align:center">
															<h5 id="textIva">$ 00.00</h5>
														</div>
													</div>
													<hr>
												</div>
                        <div class="col-12">
                        	<div class="row">
														<div class="col-6">
		                          <h5>Total</h5>
		                        </div>
		                        <div class="col-6" style="text-align:center">
		                          <h5 id="textTotal">$ <?php echo $Costo2 ?></h5>
		                        </div>
                        	</div>
                        </div>
                        <div class="col-12 col-lg-12" style="">
                          <h6>Pago Minimo: $ 1000.00 Minimo</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-4 offset-4 col-lg-4 offset-lg-4" style="text-align:center; margin-top:3vh">
            <button onclick="realizaPago()" class="btn btn-success btn-lg" id="RegistrarPago">Registrar Pago</button>
          </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script src="plugins/select2/dist/js/select2.js"></script>
    <script src="scripts/CheckOutPaquete.js?V=1.0" charset="utf-8"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  </body>
</html>
