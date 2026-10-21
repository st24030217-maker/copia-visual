<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Productos/Productos.php");
$Prod = new Productos();
$Iva = $Prod->getConfiguracionIva();


$IdProd = $_GET["IdProd"] ?? "";
$IdOrdenTemp = $_GET["IdOrdenTemp"] ?? "";
$idVendedor = $_GET["idVendedor"] ?? "";
$IdDoctor = $_GET["IdDoctor"] ?? "";
if ($IdProd == "5") {
  // code...
  $MostrarTipoDiente = "display:none;";
}else {
  $MostrarTipoDiente = "";
}
require_once("Backend/Ordenes/Ordenes.php");
$COrdenes2 = new Ordenes();
$OTDetalle = $COrdenes2->getOrdenTemporalDetalle($IdOrdenTemp);
for ($i=0; $i < sizeof($OTDetalle) ; $i++) {
  $IdPaci = $OTDetalle[$i]["Paciente_id"];
  $Aut_colorD = $OTDetalle[$i]["Aut_color"];
  $Observaciones = $OTDetalle[$i]["Observaciones"];
  $Con_scan = $OTDetalle[$i]["Con_scan"];
  $Archivo = $OTDetalle[$i]["Archivo"];
  $ConModelo = $OTDetalle[$i]["ConModelo"];


  if ($Con_scan == "1") {
    $ConScanCh = "checked";
    $CostoExtraScan = "300";
    $MostrarCS = "display:block;";
  }
  else {
    $ConScanCh = "";
    $CostoExtraScan = "0";
    $MostrarCS = "display:none;";

  }
  if ($Archivo == "") {
    $ConArchivoCH = "";
    $MostArch ="display:none;";
  }
  else {
    $ConArchivoCH = "checked";
    $MostArch ="display:block;";

  }

  if ($ConModelo == "0") {
    $ConModeloCH = "";
    $MostConModelo ="display:none;";
  }
  else {
    $ConModeloCH = "checked";
    $MostConModelo ="display:block;";
  }
}

$COrdenes3 = new Ordenes();
$CantidadDientes = $COrdenes3->cantidadDientesOrdenT($IdOrdenTemp);
for ($i=0; $i <sizeof($CantidadDientes) ; $i++) {
  $CantidadD = $CantidadDientes[$i]["CantidadDientes"];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<link href="librerias/select2/dist/css/select2.min.css" rel="stylesheet" />
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
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

		@media only screen and (max-width: 600px) {
		  .ImagenOdontograma{
		    width: 200px !important;
		    margin-left: 8vh !important;
		  }
		  .TipoDientes{
		    font-size:20px !important;
		    margin-top: 0px;
		  }
		  .TipoDiente2{
		    font-size:20px !important;
		    margin-top: 0vh;
		  }
		}

		.ImagenOdontograma{
		  width: 200px;
		  margin-left: 40vh;
		}
		.TipoDientes{
		  font-size:20px !important;
		  margin-top: 35vh;
		}
		.TipoDiente2{
		  font-size:20px !important;
		  margin-top: 0vh;
		}
  </style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
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


         <input type="hidden" name="IdOrdenT" id="IdOrdenT" value="<?php echo $IdOrdenTemp ?>" style="display:none;">
         <input type="hidden" name="inpConScann" value="" id="inpConScann" style="display:none;">
         <input type="hidden" name="inpConModelo" value="" id="inpConModelo" style="display:none;">
         <input type="hidden" name="txtIva" id="txtIva" value="<?php echo $Iva ?>" >
         <input type="hidden" name="inpIdColorimetro" id="inpIdColorimetro" value="" style="display:none;">
         <input type="hidden" name="inpValorHoraOrg" id="inpValorHoraOrg" value="" style="display:none;">
         <input type="hidden" name="txtPrecioT" id="txtPrecioT" value=""  >
				 <input type="hidden" name="IdDoctor" id="IdDoctor" value="<?php echo $IdDoctor ?>" style="display:none;">
				 <input type="hidden" name="IdVendedor" id="IdVendedor"value="<?php echo $idVendedor ?>" style="display:none;">
         <span id="ArchivoOrden"style="display:none;"></span>

         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-center">
               <h5>Odontograma</h5>
               <br>
             </div>
               <div class="col-12 col-lg-6">
                 <br>
                 <img src="Archivos/imagenDientes/arcada.png" class="ImagenOdontograma">
                 <br><br>
               </div>
               <div class="col-12 col-lg-6  text-left" >
                 <h5 class="TipoDientes">Tipo</h5>
                 <input class='form-check-input TipoDiente2' type='radio' onclick="" name='checkTipos' id='checkPilares' checked>
                 <label for='checkPilares' class='form-check-label TipoDiente2' style="color:#48C9B0;"> <b>Pilares</b> </label>
                 <br>
                 <input class='form-check-input TipoDiente2'  type='radio' onclick="" name='checkTipos' id='checkPanticos'  style="<?php echo $MostrarTipoDiente ?>">
                 <label for='checkPanticos' class='form-check-label TipoDiente2' style="color:#F5B041; <?php echo $MostrarTipoDiente ?>"> <b>Ponticos</b> </label>
                 <br><br>
               </div>
               <div class="col-12 col-lg-12" style="padding:30px;">
                 <div class="container">
                   <div class="" id="divIncludeOrdenes" style="border-radius:15px; ">

                   </div>
                 </div>
               </div>
           </div>
         </div>
				 <br><br>
				 <div class="contenedores">
					 <div class=" col-12 col-lg-6">
						 <div class="row">
						 	<div class="col-12 col-lg-12 text-center">
						 	 <h5>SELECCION DE PACIENTE</h5>
						 	 <br>
						 	</div>
						 	<div class="col-12 col-lg-12">
						 	 <div class="row">
						 		 <div class="col-10 col-lg-8">
						 			 <select class="js-example-basic-single" style="width: 100%;"   id="slctPacientes" name="slctPacientes" onchange="insertaPacientefunction(this.value)" style="background-color:#212121 !important;">
						 				 <option value="" selected disabled > Lista de Pacientes </option>
						 			 <?php
						 			 require_once("Backend/Pacientes/Pacientes.php");
						 			 $Pacientes = new Pacientes();
						 			 $ListPacientesxD = $Pacientes->getPacientesXDoctor($IdDoctor);
						 			 for ($i=0; $i <sizeof($ListPacientesxD) ; $i++) {
						 				 $Paciente_IdD = $ListPacientesxD[$i]["Paciente_Id"];
						 				 $NombreD = $ListPacientesxD[$i]["Nombre"];
						 				 $ApellidosD = $ListPacientesxD[$i]["Apellidos"];

						 				 $slct = "";
						 				 if ($Paciente_IdD == $IdPaci) {
						 					 $slct = "selected";
						 				 }
						 				 echo "
						 				 <option value='$Paciente_IdD' $slct> $NombreD $ApellidosD </option>

						 				 ";
						 			 }
						 				?>
						 		 </select>
						 		 </div>
						 		 <div class="col-2 col-lg-4" onclick="abrirMmodalNewPaciente('')">
						 			 <i class="fa fa-plus color-green-dark" style='margin-top:12px;'></i>
						 		 </div>
						 	 </div>
						 	</div>
						 </div>
					 </div>
				 </div>

				 <div class="contenedores">
					 <div class="row">
						 <div class="col-12 col-lg-12">
  						 <div class="row">
   							<div class="col-12 col-lg-12" id="includeColorimetro">

   					 	 </div>
   					 	</div>
  					 </div>
					 </div>
				 </div>
				 <br><br>
				 <div class="contenedores">
					 <div class="row">
					 	<div class="col-12 col-lg-12">
							<form class="" action="Backend/Ordenes/App.php" method="post" id="FormUpdateOrden">
	 						 <input type="text" name="idOrdenTemp" value="<?php echo $IdOrdenTemp ?>" style="display:none;">
	 						 <input type="text" name="idDoctor" value="<?php echo $IdDoctor ?>" style="display:none;">
	 						 <input type="text" name="op" value="insertaDatosOrdenTemp" style="display:none;">
	 						 <div class="row">
	 							 <div class="col-12 col-lg-12 text-center">
	 								 <h5>OBSERVACIONES</h5>
	 								 <textarea type="textarea" name="txtObservaciones" class="form-control" onkeyup="insertaDatosOrdenTempfunction('')"><?php echo $Observaciones; ?></textarea>
	 							 </div>
	 						 </div>
	 				 	</form>
					 	</div>
					 </div>
				 </div>
				 <br><br>

				 <div class="contenedores">
					 <div class="row">
					 	<div class="col-12 col-lg-12">
							<div class="row">
								<div class="col-12 text-center">
									<h5>Modo</h5>
									<br><br>
								</div>
								<div class="col-12 col-lg-4">
									<div class="row">
										<div class="col-6 col-lg-6 col-offset-3 offset-lg-3">
													<input class="form-check-input" type="checkbox" id="chCScan" name="chCScan" <?php echo $ConScanCh ?> onclick="checkConScan('')">
													<label class="form-check-label" for="chCScan">Escaneo</label>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-4">
									<div class="row">
										<div class="col-6 col-lg-6 col-offset-3 offset-lg-3">
													<input class="form-check-input" type="checkbox" id="chCModelo" name="chCModelo" <?php echo $ConModeloCH ?> onclick="checkCModelo('')">
													<label class="form-check-label" for="chCModelo">Modelo</label>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-4">
									<div class="row">
										<div class="col-6 col-lg-6 col-offset-3 offset-lg-3">
													<input class="form-check-input" type="checkbox" id="chCArchivo" name="chCArchivo" <?php echo $ConArchivoCH ?> onclick="checkCArchivo('')" >
													<label class="form-check-label" for="chCArchivo">Archivo</label>
										</div>
									</div>
								</div>
							</div>
					 	</div>
					 </div>
				 </div>
				 <br><br>
				 <div class="row" id="divDatosFecha" style="<?php echo $MostrarCS ?>">
					 <div class="col-12 col-lg-12">
						 <div class="card card-style">
							 <div class="content">
							 <div class="row">
								 <div class="col-12 col-lg-12 text-center">
									 <span style="font-size:25px;"><b>Fecha y Hora de escaneo :</b></span>
									 <br>

									 <span id="textFecha" style="font-size:25px;"></span>
									 <span>               -              </span>
									 <span id="textHora" style="font-size:25px;"></span>
								 </div>
							 </div>

							 </div>
						 </div>
					 </div>
				 </div>
				 <br><br>
				 <div class="contenedores" id="divModelo" style="<?php echo $MostConModelo ?>">
					 <div class="row">
						 <div class="col-12 col-lg-12 ">
 	            <div class="card card-style">
 	              <div class="content">
 	                <div class="row">
 	                  <div class="col-12 text-center" >
											<h5>Modelo</h5>
											<span>Envíanos tu modelo a la siguiente dirección
													 <b>DENTLAB DENTAL Dirección: Av Hidalgo 3125, Nuevo Torreón, 27060 Torreón, Coahuila. México</b>
													 </span>
											<br><br>
 	                  </div>
 	                </div>
 	              </div>
 	            </div>
 	          </div>
					 </div>
				 </div>
				 <div class="row">
					 <div class="col-12 col-lg-12" id="divArchivo" style="<?php echo $MostArch ?>">

					 </div>
				 </div>
				 <br>
				 <input type="text" id="inpValorPiezasOrden" value="" style="display:none;">
				 <div class="row">
					 <div class="col-12 col-lg-12" >
  					 <div class="contenedores" id="divIncludePaquetesDoctorPiezas">

  					 </div>
  				 </div>
				 </div>

				 <br><br>
				 <div class="col-12 col-lg-6 offset-lg-6">
					 <div class="contenedores">
						 <div class="row">
							 <div class="col-12 col-lg-12">
								 <select class="form-control" name="slctMetodoPago" id="slctMetodoPago" required onchange="MetodosPagoFunc(this.value)">
									 <option value="" selected disabled> Lista de metodos de pago </option>
									 <?php
									 require_once("Backend/Configuracion/Configuracion.php");
									 $Configuracion = new Configuracion();
									 $ListMetodosPago = $Configuracion->getMetodoPago();
									 for ($i=0; $i < sizeof($ListMetodosPago) ; $i++) {
										 $id_Metodos_Pago = $ListMetodosPago[$i]["id_Metodos_Pago"];
										 $Metodo = $ListMetodosPago[$i]["Metodo"];
										 if ($id_Metodos_Pago != "2" && $id_Metodos_Pago != "7") {
  										 echo "
  										 <option value='$id_Metodos_Pago'>$Metodo</option>
  										 ";
										 }
									 }
										?>
								 </select>
							 </div>
						 </div>
					 </div>
				 </div>
				 <br><br>
				 <div class="col-12 col-lg-6">
				 	<div class="contenedores">
				 		<div class="row">
				 			<div class="col-12 col-lg-12">
								<span>¿Desea comprar más paquetes?</span>
				 			</div>
							<div class="col-12 col-lg-12 text-center">
								<a href='#' class='btn btn-info' onclick="irAComprarPaquetes('')">Comprar Paquete</a>
							</div>
				 		</div>
				 	</div>
				 </div>
				 		<div class="col-12 col-lg-6" style="cursor:pointer;">
							<div class="contenedores">
								<div class="row">
									<div class="col-12 col-lg-12  text-center">
										<div class="row">
											<div class="col-12 col-lg-12 text-center">
												 <div class="row">
													 <div class="col-6 col-lg-7 offset-lg-1">
														 <span>Numero de unidades:</span>
													 </div>
													 <div class="col-6 col-lg-3 text-left">
														 <span id="spanCantidadD"></span>
														 <input type="text" id="txtCantidadPiezas" value="" style="display:none;">
													 </div>
												 </div>
											</div>
											<div class="col-12 col-lg-12 text-center" id="divConEscaneo" style="<?php echo $MostrarCS ?>">
												 <div class="row">
													 <div class="col-6 col-lg-7 offset-lg-1">
														 <span>Precio con Escaneo:</span>
													 </div>
													 <div class="col-6 col-lg-3 text-left">
														 <span id="spanCantidadScan"></span>
													 </div>

												 </div>
											</div>
											<div class="col-12 col-lg-12 text-center">
												<h5>Total a pagar: </h5><h5 id="precioTotal"></h5>
												<input type="hidden" name="txtPrecioTotal" id="txtPrecioTotal" value="">
												<input type="hidden" name="" id="txtPrecioUnidad" value="">
												<input type="hidden" id="txtMontoSinIva" value="">
											</div>
											<hr>
										</div>
									</div>
								</div>
							</div>
				 		</div>

							<div class="col-12 col-lg-4 offset-lg-4 text-center" >
								<br><br>
								<button type="button" class="btn btn-success" style="cursor:pointer;" onclick="generarOrden('')">Generar Orden</button>
							</div>


				 <br><br><br><br><br><br><br>				 <br><br><br><br><br><br><br>


				 <div class="modal fade" id="ModalUsuarios" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog ">
						<div class="modal-content ">
							<div class="modal-header ">
								<h5 class="modal-title" id='TituloModal'> Nuevo Paciente </h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body ">
								<form id="formInsertaPaciente" method="post" action="Backend/Pacientes/App.php">
									<div class="form-group">
										<input type="text" class="form-control" id="op" name="op" value="addPacientesXDoctor" style="display:none;">
										<input type="text" class="form-control" id="IdDoct" name="IdDoct" style="display:none;">
										<div class="row">
											<div class="col-12 col-lg-6 text-center">
												<span>Nombre(s)</span>
												<br>
												<input type="text" name="txtNombre" id="txtNombre" class="form-control" required onkeydown="onlytextInp(event)">
											</div>
											<div class="col-12 col-lg-6 text-center">
												<span>Apellidos</span>
												<br>
												<input type="text" name="txtApellidos"  id="txtApellidos" class="form-control" required onkeydown="onlytextInp(event)">
												<br><br>
											</div>
											<div class="col-12 col-lg-6 text-center">
												<span>Celular</span>
												<br>
												<input type="text" name="txtCelular"  id="txtCelular" class="form-control" >
											</div>
											<div class="col-12 col-lg-6 text-center">
												<span>Email</span>
												<input type="email" name="txtEmail" id="txtEmail" class="form-control" >
												<br>
											</div>
										</div>
									</div>
				 <!-- Aqui va el Segundo Label  -->

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-primary" id="btnguardar" onclick="Doctorfunction('')">Guardar</button>
							</div>
							</form>
						</div>
					</div>
				 </div>


				 <div class="modal fade" id="ModalAgenda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  style="overflow-y:scroll;">
					<div class="modal-dialog  modal-lg">
						<div class="modal-content ">
							<div class="modal-header ">
								<h5 class="modal-title" id='TituloModal'> Seleccionar Fecha </h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<!-- <form id="formInserta" method="post" action="Backend/Usuarios/App.php"> -->
									<div class="form-group">
										<div class="row" id="divEscaneo"  style="<?php echo $MostrarCS ?>">
											<div class="col-12 col-lg-12 ">
												<div class="card card-style">
													<div class="content">
														<div class="row">
															<input type="date" name="fechaOrdenScan" id="fechaOrdenScan" value=""  style="display:none;">
															<input type="time" name="HoraOrdenScan" id="HoraOrdenScan" value="" style="display:none;">
															<input type="text" name="Interval" id="Interval" value="" style="display:none;">
															<div class="col-12 text-center" >
																<h5>Escaneo</h5>
															</div>
															<div class="row">
																<div class="col-12 col-lg-12 text-center" >
																	<div id="calendar" style="background-color:#212121;border-radius:15px; margin-left:30px;"></div>
																	<br>
																</div>
																<div class="col-12 col-lg-12 text-center" style="margin-left:15px">
																	<div id="horariosDisponibles">

																	</div>
																</div>
															</div>
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cerrarModalAgenda('')">Cerrar</button>
							</div>
							<!-- </form> -->
						</div>
					</div>
				 </div>


        </div>

      <?php include("footer.php"); ?>
      </div>
    </div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<?php include("scripts.php"); ?>
		<script src="librerias/evocalendar/evo-calendar/js/evo-calendar.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        var idOrden = '<?php echo $IdOrdenTemp ?>';
        $("#divIncludeOrdenes").load(`include_orden.php?idOrden=${idOrden}`);
        $("#includeColorimetro").load(`include_colorimetro.php?idOrden=${idOrden}`);
			  IncludePaquetesDoctorPiezas();
			  divIncludeConArchivoT();
			   $('#calendar').evoCalendar({
			       theme: 'Midnight Blue',
			       language: 'es',
			       eventDisplayDefault: false,
			       sidebarDisplayDefault:false,
			       eventListToggler:false,
			       format: 'yyyy-mm-dd'
			   })
			   getHorariosDisponibles();

			   $('#calendar').on('selectDate', function(event, newDate, oldDate) {
			     getHorariosDisponibles();
			      // window.location = "#tab-group-2";
			      $('html, body').animate({
			      scrollTop: $("#contenidoAgenda").offset().top
			    }, 1500);
			   });
				 $('.js-example-basic-single').select2();
			});

			function abrirMmodalNewPaciente(){
				var IdDoctor = $("#IdDoctor").val();
				$("#IdDoct").val(IdDoctor);
				$("#ModalUsuarios").modal("toggle");
			}
			function irAComprarPaquetes(){
				var IdDoctor = $("#IdDoctor").val();
				window.location.href=`ShopPaquetes.php?IdDoctor=${IdDoctor}`;
			}


			function verifyNewOrder() {
			  return new Promise(async (resolve, reject) => {
			    let id_Orden = $("#IdOrdenT").val();
			    let _ValorHoraOrg = $("#inpValorHoraOrg").val();
			    let _FechaOrdenScan = $("#fechaOrdenScan").val();
			    let _HoraOrdenScan = $("#HoraOrdenScan").val();
			    let _CantidadDientesSel = $("#spanCantidadD").text();
			    let _IdPACIENTE = $("#slctPacientes").val();
			    let idColorimetro = $("#inpIdColorimetro").val();
			    let _IdVendedor = $("#IdVendedor").val();
			    let _IdMetodoPago = Number($("#slctMetodoPago").val());
			    let _CantidadDientes = $("#spanCantidadD").text();
			    let _CantidadPiezasPaquete = $("#inpValorPiezasOrden").val();

			    if (_IdPACIENTE === null || _IdPACIENTE == "") {
			      Alerta("info", "Seleccione un paciente");
			      return reject(false);
			    }

			    if (idColorimetro == "" || idColorimetro === null) {
			      Alerta("info", "Seleccione un colorimetro");
			      return reject(false);
			    }

			    if (_CantidadDientesSel == "0") {
			      Alerta("info", "Seleccione mínimo un diente");
			      return reject(false);
			    }
			    if ($("#chCScan").is(":checked")) {
			      if (_HoraOrdenScan == "") {
			        Alerta("info", "Seleccione una fecha con hora para el escaneo");
			        return reject(false);
			      } else {
			        const resultDates = await checkDateAvailableForScanning(_HoraOrdenScan, _FechaOrdenScan);
			        if (!resultDates) {
			          Alerta("info", "La fecha y hora seleccionada para el escaneo ya no se encuentra disponible");
			          return reject(false);
			        }
			      }
			    }
			    if ((_CantidadDientes == _CantidadPiezasPaquete) && (_IdMetodoPago != "6" && _IdMetodoPago != "10")) {
			      $("#slctMetodoPago").removeAttr("required");
			      _IdMetodoPago = "0";
			      if (_IdMetodoPago == "") {
			        Alerta("info", "Seleccione un método de pago");
			        return reject(false);
			      }
			    } else {
			      $('#slctMetodoPago').prop("required", true);
			      if (_IdMetodoPago == "") {
			        Alerta("info", "Seleccione un método de pago");
			        return reject(false);
			      }
			    }

			    if (_IdMetodoPago == "9" && _FechaOrdenScan != "") {
			      Alerta("info", "No se puede seleccionar una orden con Escan con el método de pago Producción");
			      return reject(false);
			    }

			    if ($("#chCArchivo").is(":checked")) {
			      var _NombreArchivoOrden = $("#ArchivoOrden").text();
			      if (_NombreArchivoOrden == "") {
			        Alerta("info", "Ingrese un archivo");
			        return reject(false);
			      }
			    }

			    // Si llegamos aquí, todas las validaciones fueron exitosas
			    resolve(true);
			  });
			}

			async function checkDateAvailableForScanning(_HoraOrdenScan, _FechaOrdenScan){
			  try {
			    Cargando();
			    let dataSend = {
			      op: "checkDateAvailableForScanning",
			      _HoraOrdenScan: _HoraOrdenScan,
			      _FechaOrdenScan: _FechaOrdenScan
			    };
			    const response = await $.ajax({
			      type: "POST",
			      url: "Backend/Ordenes/App.php",
			      data: dataSend
			    });
			    QuitarCargando();
			    if (response) {
			      return true;
			     } else {
			       Alerta("info", "La fecha y hora seleccionara para el escaneo ya no se encuentra disponible");
			       return false;
			     }
			  } catch (e) {
			    console.error(error);
			    QuitarCargando();
			  }
			}

			async function generarOrden(){
			  const resultVerify = await verifyNewOrder();
			  if (resultVerify) {
			    Cargando();
			    let id_Orden = $("#IdOrdenT").val();
			    let _FechaOrdenScan = $("#fechaOrdenScan").val();
			    let _HoraOrdenScan = $("#HoraOrdenScan").val();
			    let _ValorHoraOrg = $("#inpValorHoraOrg").val();
			    let _IdVendedor = $("#IdVendedor").val();
			    let _IdMetodoPago = Number($("#slctMetodoPago").val());
			    const dataSend = {
			      op: "generarOrden",
			      IdOrden: id_Orden,
			      FechaOrdenScan: _FechaOrdenScan,
			      HoraOrdenScan: _HoraOrdenScan,
			      ValorHoraOrg: _ValorHoraOrg,
			      IdVendedor: _IdVendedor,
			      IdMetodoPago: _IdMetodoPago
			    };
			    $.ajax({
			      type: "POST",
			      url: "Backend/Ordenes/App.php",
			      data: dataSend,
			      success: function(data){
			        if (data == "1") {
			          Alerta('success',"Orden Realizada");
			          setTimeout(function () {
			            window.location.href='Vendedor.php';
			            // window.location.href='Successful.php';
			          }, 1200);
			        }else {
			          Alerta("info",data);
			          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
			            location.reload();
			          }, 3000);
			        }
			        QuitarCargando();
			      },
			      error:function(e){
			        alert(e.responseText);
			        QuitarCargando();
			      }
			    });
			  }
			}

			function getHorariosDisponibles(){
			  var idOrdenTemp = $("#IdOrdenT").val();
			  var fecha =  $("#calendar").evoCalendar('getActiveDate');
			  var idEstado = $("#slctEstados").val();
			  var idCiudad = $("#slctOrgCiudad").val();
				var IdDoc = $("#IdDoctor").val();
			  $("#horariosDisponibles").load(`contenidoAgenda.php?fecha=${fecha}&idOrdenTemp=${idOrdenTemp}&IdDoc1=${IdDoc}`);
			}

			function Doctorfunction(){
						if (document.getElementById("formInsertaPaciente").checkValidity()){
							event.preventDefault();
							var form = $("#formInsertaPaciente")[0];
							var data = new FormData(form);
			        Cargando();

							$.ajax({
								type:"POST",
								url:"Backend/Pacientes/App.php",
								data:data,
								processData:false,
								contentType:false,
								cache: false,
								timeout:600000,
								success:function(data){
									console.log(data);
									if (data=="1") {
									 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
			               QuitarCargando();
										 location.reload();
									 }, 1500);
									}
									else{
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
			        Alerta("info","Faltan campos por llenar");
			      }
					}
			    function agendarOrdenEscan(horario,idOrden,Interval){
			      var fecha =  $("#calendar").evoCalendar('getActiveDate');
			      $("#Interval").val(Interval);
			      $("#fechaOrdenScan").val(fecha);
			      $("#HoraOrdenScan").val(horario);
						$("#textFecha").text(fecha);
						$("#textHora").text(horario);
			    }

			    function insertaDatosOrdenTempfunction(){
			    			if (document.getElementById("FormUpdateOrden").checkValidity()){
			    				event.preventDefault();
			    				var form = $("#FormUpdateOrden")[0];
			    				var data = new FormData(form);

			    				$.ajax({
			    					type:"POST",
			    					url:"Backend/Ordenes/App.php",
			    					data:data,
			    					processData:false,
			    					contentType:false,
			    					cache: false,
			    					timeout:600000,
			    					success:function(data){
			    						if (data=="1") {

			    						}
			    						else{
			                  Swal.fire({
			                    position: 'top-end',
			                    icon: 'error',
			                    title: 'No Guardado',
			                    showConfirmButton: false,
			                    timer: 1500
			                  });
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
			            Swal.fire({
			              position: 'top-end',
			              icon: 'info',
			              title: 'Faltan campos obligatorios por llenar',
			              showConfirmButton: false,
			              timer: 1500
			            });
			          }
			    		}

			        function MandarACarrito(){
			          window.location.href=`Carrito.php`;
			        }
			        function MandarAIndex(){
			          window.location.href=`index.php`;
			        }

			        function MandarAPerfil(){
			          window.location.href=`Perfil.php`;
			        }

			        function EditarOrdenDetalle(IdOrden,IdDiente,Activo){
			          // var cD = '<?php //echo //$CantidadD ?>';
			          // var PrecioP = '<?php //echo $Precio_Base ?>';
			          // var PrecioT = (cD*PrecioP);
			          // $("#spanCantidadD").text(cD);
			          // $("#precioTotal").text(PrecioT);

			          if ($("#checkPilares").is(":checked")) {
			            var TipoDiente = "1";
			          }else {
			            var TipoDiente = "2";
			          }
			          var CantidadDientes = $("#spanCantidadD").text();
			          var CantidadPiezasPaquete = $("#inpValorPiezasOrden").val();
			          var precioTotalTemp = $("#txtPrecioTotal").val();
			          var precioUnidad = $("#txtPrecioUnidad").val();
			          var cantidadPiezas = $('#txtCantidadPiezas').val();
			          var idOrden = '<?php echo $IdOrdenTemp ?>';
			          if (Activo == "1") {
			            if (CantidadDientes == CantidadPiezasPaquete) {
			              Alerta("info","No puede elimiar un diente con la cantidad de piezas de paquetes seleccionados");
			              return false;
			            }else {
			              var operacion = "borrarDienteOrdenDetalle";
			              var PrecioT = (parseFloat(precioTotalTemp) - parseFloat(precioUnidad));
			              var CantPi = (parseFloat(cantidadPiezas) - parseFloat("1"));
			            }
			          }else {
			            var operacion = "agregarDienteOrdenDetalleTempSup";
			            var PrecioT = (parseFloat(precioTotalTemp) + parseFloat(precioUnidad));
			            var CantPi = (parseFloat(cantidadPiezas) + parseFloat("1"));

			          }
			          Cargando();

			            $.ajax({
			              type:"POST",
			              url:"Backend/Ordenes/App.php",
			              data:"op="+operacion+
			              "&IdOrden="+IdOrden+"&IdDiente="+IdDiente+"&precioTotalTemp="+PrecioT+"&cantidadPiezas="+CantPi+"&TipoDiente="+TipoDiente,
			              success: function(data){
			                if(data!="0"){
			                    setTimeout(function () {
														// updatePrecio();
					                  divOrdenesfunction();
			                      QuitarCargando();
			                    }, 500);
			                }else{
			                  Alerta("error","No se Realizo Correctamente");
			                  setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                    location.reload();
			                  }, 1500);
			                }
			              },
			              error:function(e){
			                alert(e.responseText);
			              }
			            });

			        }

							function MetodosPagoFunc(MetdodoPago){
							if (MetdodoPago == "8") {
									$("#precioTotal").text("$ 0.00");
								}else if (MetdodoPago == "9") {
									let CantPiezas = $("#txtCantidadPiezas").val();
									let monto = (700 * CantPiezas);
									$("#precioTotal").text("$" + monto + ".00");
								}else if (MetdodoPago == "3") {
									let Iva = Number($("#txtIva").val());
									let MontoAcumulado = Number($("#txtMontoSinIva").val());
				 					let MontoConIva = (MontoAcumulado + (MontoAcumulado * (Iva / 100)));
									const formatter = new Intl.NumberFormat('es-PE', {
									  style: 'decimal',
									  minimumFractionDigits: 2,
									  maximumFractionDigits: 2
									});
									let MontoFormato = formatter.format(MontoConIva);
									$("#precioTotal").text("$ "+MontoFormato);
								}else if (MetdodoPago !="8" && MetdodoPago !="9" && MetdodoPago != "3") {
									divOrdenesfunction();
								}
							}

			        function EditarOrdenDetalleInf(IdOrden,IdDiente, Activo){
			          if ($("#checkPilares").is(":checked")) {
			            var TipoDiente = "1";
			          }else {
			            var TipoDiente = "2";
			          }
			          var CantidadDientes = $("#spanCantidadD").text();
			          var CantidadPiezasPaquete = $("#inpValorPiezasOrden").val();
			          var precioTotalTemp = $("#txtPrecioTotal").val();
			          var precioUnidad = $("#txtPrecioUnidad").val();
			          var cantidadPiezas = $('#txtCantidadPiezas').val();

			          var idOrden = '<?php echo $IdOrdenTemp ?>';

			            if (Activo == "1") {
			              if (CantidadDientes == CantidadPiezasPaquete) {
			                Alerta("info","No puede elimiar un diente con la cantidad de piezas de paquetes seleccionados");
			                return false;
			              }else {
			                var operacion = "borrarDienteOrdenDetalle";
			                var PrecioT = (parseFloat(precioTotalTemp) - parseFloat(precioUnidad));
			                var CantPi = (parseFloat(cantidadPiezas) - parseFloat("1"));
			              }
			            }else {
			              var operacion = "agregarDienteOrdenDetalleTempInf";
			              var PrecioT = (parseFloat(precioTotalTemp) + parseFloat(precioUnidad));
			              var CantPi = (parseFloat(cantidadPiezas) + parseFloat("1"));

			            }
			            Cargando();

			            $.ajax({
			              type:"POST",
			              url:"Backend/Ordenes/App.php",
			              data:"op="+operacion+
			              "&IdOrden="+IdOrden+"&IdDiente="+IdDiente+"&precioTotalTemp="+PrecioT+"&cantidadPiezas="+CantPi+"&TipoDiente="+TipoDiente,
			              success: function(data){
			                if(data!="0"){
			                setTimeout(function () {
												// updatePrecio();
			                  divOrdenesfunction();
			                    QuitarCargando();
			                  }, 500);
			                }else{
			                  Alerta("error","No se Realizo Correctamente");
			                  setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                    location.reload();
			                  }, 1500);
			                }
			              },
			              error:function(e){
			                alert(e.responseText);
			              }
			            });
			        }

			        function insertaPacientefunction(IdPaciente){
			          var idOrdenTem = '<?php echo $IdOrdenTemp ?>';
			            $.ajax({
			              type:"POST",
			              url:"Backend/Ordenes/App.php",
			              data:"op=ingresarPacienteOrden"+
			              "&IdPaciente="+IdPaciente+"&idOrdenTem="+idOrdenTem,
			              success: function(data){
											console.log(data);
			                if(data!="0"){

			                }else{
			                  Alerta("error","No se Realizo Correctamente");
			                  setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                    location.reload();
			                  }, 1500);
			                }
			              },
			              error:function(e){
			                alert(e.responseText);
			              }
			            });
			        }

			        function insertaColorfunction(IdColor){
			          var idOrdenTem = '<?php echo $IdOrdenTemp ?>';

			            $.ajax({
			              type:"POST",
			              url:"Backend/Ordenes/App.php",
			              data:"op=updateOrdenTempColor"+
			              "&idOrdenTem="+idOrdenTem+"&IdColor="+IdColor,
			              success: function(data){
			                if(data!="0"){

			                }else{
			                  Alerta("error","No se Realizo Correctamente");
			                  setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                    location.reload();
			                  }, 1500);
			                }
			              },
			              error:function(e){
			                alert(e.responseText);
			              }
			            });
			        }
			        function divOrdenesfunction(){
			          var idOrden = '<?php echo $IdOrdenTemp ?>';
			          var Iva = $("#txtIva").val();
			          $("#divIncludeOrdenes").load(`include_orden.php?idOrden=${idOrden}&Iva=${Iva}`);
			        }

			      function modoClick(modo){
			        if (modo == "1") {
			          $("#divModelo").fadeOut();
			          $("#divArchivo").fadeOut();
								$("#divDatosFecha").fadeIn();
								$("#ModalAgenda").modal("toggle");

			          window.scrollTo(0, document.body.scrollHeight);
			        }else if (modo == "2") {
								$("#divEscaneo").fadeOut();
								$("#divArchivo").fadeOut();
								$("#divModelo").fadeIn();
								$("#divDatosFecha").fadeOut();
			          window.scrollTo(0, document.body.scrollHeight);
			        } else if (modo == "3") {
								$("#divModelo").fadeOut();
			          $("#divEscaneo").fadeOut();
			          $("#divArchivo").fadeIn();
			          $("#divDatosFecha").fadeOut();
			        }
			      }


			      // function Cargando(){
			      //   $("#staticBackdrop").modal("toggle");
			      // }
			      // function QuitarCargando(){
			      //   $("#staticBackdrop").modal("hide");
			      // }

			      function ImrpimirGuia(){
			          Cargando();


			          setTimeout(function () {
			            var frame1 = document.createElement('iframe');
			            frame1.name = "frame1";
			            frame1.style.position = "absolute";
			            frame1.style.top = "-1000000px";
			            document.body.appendChild(frame1);
			            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
			            frameDoc.document.open();
			            frameDoc.document.write(`

			              <html lang="en" dir="ltr">
			                <head>
			                  <meta charset="utf-8">
			                  <title></title>
			                  <style media="screen">

			                  </style>
			                </head>
			                <body>

			                <div class="row" style="background-image: url('https://dentlab.resosistemas.mx/control/archivos/DentLogo.png') center center/cover no-repeat content-box;">
			                    <div class="col-12 col-lg-12" style="border: 2px solid #000;">
			                      <div class="row">
			                        <div class="col-6 col-lg-6">
			                          <div class="row">
			                            <div class="col-12 col-lg-12">
			                              <h2 style="margin-left:15px; font-size:35px; color:black;">FECHA:</h2>
			                              <br>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <span style="margin-left:15px; font-size:25px; color:black;"><b>Origen</b></span>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <span style="margin-left:15px;font-size:20px; color:black;">Remitente: </span>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <span style="margin-left:15px;font-size:20px; color:black;">Dirección: </span>
			                              <br><br><br>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <FONT FACE="courier new"<span style="margin-left:15px;font-size:25px; color:black;"><b>Destino</b></span></FONT>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <span style="margin-left:15px;font-size:20px; color:black;">Destinatario: </span>
			                            </div>
			                            <div class="col-12 col-lg-12">
			                              <span style="margin-left:15px;font-size:20px; color:black;">Dirección: </span>
			                              <br><br><br>
			                            </div>
			                          </div>
			                        </div>

			                      </div>
			                    </div>
			                  </div>
			                </body>
			              </html>
			`);
			            frameDoc.document.close();
			            setTimeout(function () {
			              QuitarCargando();
			              window.frames["frame1"].focus();
			              window.frames["frame1"].print();
			            }, 500);
			            setTimeout(function () {
			              document.body.removeChild(frame1);
			            }, 6000);
			            return false;
			          }, 2000);
			      }

			      function divcolorimetrofunction(){
			        var idOrden = '<?php echo $IdOrdenTemp ?>';
			        $("#includeColorimetro").load(`include_colorimetro.php?idOrden=${idOrden}`);
			      }

			      function updateColorColorimetroOrdenT(Tipos_Colorimetros_Color_Id){
							var IdOrden = $("#IdOrdenT").val();
							Cargando();
			        $.ajax({
			          type:"POST",
			          url:"Backend/Colorimetro/App.php",
			          data:"op=updateColorOdontogramaTemp"+
			          "&idOrdenTem="+IdOrden+"&Tipos_Colorimetros_Color_Id="+Tipos_Colorimetros_Color_Id,
			          success: function(data){
			            if(data!="0"){
										setTimeout(function () {
											$("#includeColorimetro").load(`include_colorimetro.php?idOrden=${IdOrden}`);
											QuitarCargando();
			              }, 500);
			            }else{
			              Alerta("error","No se Realizo Correctamente");
			              setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                location.reload();
			              }, 1500);
			            }
			          },
			          error:function(e){
			            alert(e.responseText);
			          }
			        });
			      }

			      function checkConScan(){
							$("#divModelo").fadeOut();
			        $("#divArchivo").fadeOut();
			        $("#divDatosFecha").fadeIn();
			        var PiezasSlctPaquetes = $("#inpValorPiezasOrden").val();
			        var precioTotalTemp = $("#txtPrecioTotal").val();
			        var idOrden = '<?php echo $IdOrdenTemp ?>';
			        var ConScann = $("#inpConScann").val();

			        if (ConScann == "1") {
			          var ConSc = "0";
			          var PrecioT = (parseFloat(precioTotalTemp) - parseFloat("300"));
			          $("#divEscaneo").fadeOut();
			          document.getElementById("divConEscaneo").style.display = 'none';
    						document.getElementById("divDatosFecha").style.display = 'none';
			        }
			        else {
			          var ConSc = "1";
			          var PrecioT = (parseFloat(precioTotalTemp) + parseFloat("300"));
			          $("#divEscaneo").fadeIn();
			          document.getElementById("divConEscaneo").style.display = 'block';
								document.getElementById("divDatosFecha").style.display = 'block';
			        }
							if (ConSc == "1") {
								$("#ModalAgenda").modal("toggle");
							}
			        $("#chCArchivo").prop("checked",false);
			        $("#chCModelo").prop("checked",false);
							Cargando();
			        $.ajax({
			          type:"POST",
			          url:"Backend/Ordenes/App.php",
			          data:"op=updateConScanOrdenT"+
			          "&idOrden="+idOrden+"&ConScann="+ConSc+"&precioTotalTemp="+PrecioT,
			          success: function(data){
			            if(data!="0"){
			              setTimeout(function () {
			                divOrdenesfunction();
			                divIncludeConArchivoT();
											QuitarCargando();
			              }, 500);
			            }else{
			              Alerta("error","No se Realizo Correctamente");
			              setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                location.reload();
			              }, 1500);
			            }
			          },
			          error:function(e){
			            alert(e.responseText);
			          }
			        });
			      }


						async function SubirArchivoOrden(){
						 if (document.getElementById("formSubirArchivo").checkValidity()){
								event.preventDefault();
								let respuesta = "";
								let form = $("#formSubirArchivo")[0];
								let data = new FormData(form);
								Cargando();
								try {
									respuesta = await $.ajax({
										type:"POST",
										url:"Backend/Ordenes/App.php",
										data:data,
										processData:false,
										contentType:false,
										cache: false,
										timeout:600000,
									});
								} catch (e) {
									console.log(e);
								} finally {
									console.log(respuesta);
									if(respuesta == "1") {
										setTimeout(function () {
											QuitarCargando();
										}, 1000);
										divIncludeConArchivoT();
									} else {
										Alerta("info","Archivo no válido ");
										setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
											location.reload();
										}, 1500);
									}
								}
							}
						}
			        // function SubirArchivoOrden(){
			        // 			if (document.getElementById("formSubirArchivo").checkValidity()){
			        // 				event.preventDefault();
			        // 				var form = $("#formSubirArchivo")[0];
			        // 				var data = new FormData(form);
							// 				Cargando();
			        // 				$.ajax({
			        // 					type:"POST",
			        // 					url:"Backend/Ordenes/App.php",
			        // 					data:data,
			        // 					processData:false,
			        // 					contentType:false,
			        // 					cache: false,
			        // 					timeout:600000,
			        // 					success:function(data){
							// 						QuitarCargando();
			        // 						if (data =="1") {
			        // 						 divIncludeConArchivoT();
			        // 						}
			        // 						else{
			        // 							setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
			        // 								location.reload();
			        // 							}, 1500);
			        // 						}
			        // 					},
			        // 					error:function(e){
			        // 						alert(e.responseText);
			        // 					}
			        // 				});
			        // 			}
			        // 		}

			            function AbrirFile(){
			              $("#inpfiles").click();
			            }
			            function checkCArchivo(){
										document.getElementById("divDatosFecha").style.display = 'none';
			              document.getElementById("divEscaneo").style.display = 'none';
			              $("#fechaOrdenScan").val("");
			              $("#HoraOrdenScan").val("");

			              var IdOrden = $("#IdOrdenT").val();
			              if ($("#chCArchivo").is(":checked")) {
			                  $("#divArchivo").fadeIn();
			                  $("#divModelo").fadeOut();
			                  $("#chCScan").prop("checked",false)
			                  $("#chCModelo").prop("checked",false)

			              }else {
			                $("#divArchivo").fadeOut();
			              }
										Cargando();

			              $.ajax({
			                type:"POST",
			                url:"Backend/Ordenes/App.php",
			                data:"op=updateConScanArchivo"+
			                "&IdOrden="+IdOrden,
			                success: function(data){
			                  if(data!="0"){
			                      setTimeout(function () {
			                        divOrdenesfunction();
															QuitarCargando();

			                      }, 500);
			                  }else{
			                    Alerta("error","No se Realizo Correctamente");
			                    setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                      location.reload();
			                    }, 1500);
			                  }
			                },
			                error:function(e){
			                  alert(e.responseText);
			                }
			              });

			            }



			            function checkCModelo(){
			              document.getElementById("divConEscaneo").style.display = 'none';
										document.getElementById("divDatosFecha").style.display = 'none';
			              $("#fechaOrdenScan").val("");
			              $("#HoraOrdenScan").val("");
			              var IdOrden = $("#IdOrdenT").val();
			              var ConModelo = $("#inpConModelo").val();

			              if (ConModelo == "0") {
			                var varConModelo = "1";
			              }else {
			                var varConModelo = "0";
			              }
			              if ($("#chCModelo").is(":checked")) {
			                $("#divModelo").fadeIn();
			                $("#divArchivo").fadeOut();
			                $("#divEscaneo").fadeOut();
			                $("#chCArchivo").prop("checked",false)
			                $("#chCScan").prop("checked",false)

			              }else {
			                $("#divModelo").fadeOut();
			              }
										Cargando();

			              $.ajax({
			                type:"POST",
			                url:"Backend/Ordenes/App.php",
			                data:"op=updateConModeloOrdenT"+
			                "&idOrden="+IdOrden+"&ConModelo="+varConModelo,
			                success: function(data){
			                  if(data!="0"){
			                    setTimeout(function () {
			                      divOrdenesfunction();
			                      divIncludeConArchivoT();
														QuitarCargando();

			                    }, 500);
			                  }else{
			                    Alerta("error","No se Realizo Correctamente");
			                    setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                      location.reload();
			                    }, 1500);
			                  }
			                },
			                error:function(e){
			                  alert(e.responseText);
			                }
			              });
			            }

			            function addCantPaquete(id,disp,ope,idOrden){
			              var precioUnidad = $("#txtPrecioUnidad").val();
			              var CantidadDientes = $("#spanCantidadD").text();
			              var CantidadPiezasPaquete = $("#inpValorPiezasOrden").val();
			              var Monto2 = $("#txtPrecioTotal").val();
			              var valor = $("#CantInp"+id).val();
			              var TotalPresio = $("#precioTotal").text();
			              if (CantidadDientes == CantidadPiezasPaquete) {
			                Alerta("info","No puedes utilizar mas piezas de los paquetes");
			              }else {
			                if (valor < disp ) {
			              var ValorT =parseFloat(valor) + parseFloat(1);
			              $("#CantInp"+id).val(ValorT);

			              if (ope == "1") {
			                var varOperacion = "insertDataTableLabPOrden";
			              }else if (ope == "0") {
			                var varOperacion = "sumDataTableLabPOrden";
			              }
			              var Monto = (parseFloat(Monto2) - parseFloat(precioUnidad));

			              Cargando();

			              $.ajax({
			                type:"POST",
			                url:"Backend/Ordenes/App.php",
			                data:"op="+varOperacion+
			                "&idOrden="+idOrden+"&IdPaqueteOrden="+id+"&Monto="+Monto,
			                success: function(data){
			                  if(data!="0"){
			                    setTimeout(function () {
			                      IncludePaquetesDoctorPiezas();
			                      divOrdenesfunction();
			                      QuitarCargando();

			                    }, 500);
			                  }else{
			                    Alerta("error","No se Realizo Correctamente");
			                    setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                      location.reload();
			                    }, 1500);
			                  }
			                },
			                error:function(e){
			                  alert(e.responseText);
			                }
			              });
			            }else {
			              Alerta("info","Maximo Alcanzado");

			            }
			              }

			            }


			            function removeCantPaquete(id,disp,ope,idOrden){
			              var valor = $("#CantInp"+id).val();
			              var precioUnidad = $("#txtPrecioUnidad").val();

			              if (valor > 0) {
			                var ValorT =parseFloat(valor) - parseFloat(1);
			                $("#CantInp"+id).val(ValorT);

			                if (ope == "1") {
			                  var varOperacion = "deleteDataTableLabOrden";
			                }else if (ope == "0") {
			                  var varOperacion = "menosDataTableLabOrden";
			                }
			                var Monto2 = $("#txtPrecioTotal").val();
			                var Monto = (parseFloat(Monto2) + parseFloat(precioUnidad));

			                Cargando();

			                $.ajax({
			                  type:"POST",
			                  url:"Backend/Ordenes/App.php",
			                  data:"op="+varOperacion+
			                  "&idOrden="+idOrden+"&IdPaqueteOrden="+id+"&Monto="+Monto,
			                  success: function(data){
			                    if(data!="0"){
			                      setTimeout(function () {
			                        IncludePaquetesDoctorPiezas();
			                        divOrdenesfunction();
			                        QuitarCargando();
			                      }, 500);
			                    }else{
			                      Alerta("error","No se Realizo Correctamente");
			                      setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
			                        location.reload();
			                      }, 1500);
			                    }
			                  },
			                  error:function(e){
			                    alert(e.responseText);
			                  }
			                });
			              }else {
			                Alerta("info","No puedes seleccionar menos de 0");

			              }
			            }


			            function IncludePaquetesDoctorPiezas(){
			              var idOrden = '<?php echo $IdOrdenTemp ?>';
										var IdDoc = $("#IdDoctor").val();
			              $("#divIncludePaquetesDoctorPiezas").load(`includePaquetesDoctorPiezas.php?idOrden=${idOrden}&IdDoctor=${IdDoc}`);
			            }

          function divIncludeConArchivoT(){
            var IdOrden = $("#IdOrdenT").val();
						var IdDoctor = $("#IdDoctor").val();
            $("#divArchivo").load(`includeConArchivoOrdenT.php?IdOrden=${IdOrden}&IdOrden=${IdOrden}&IdDoctor=${IdDoctor}`);
          }

					function Cargando() {
					  $.blockUI({
					    message: `
					    <img src="assets/logoK.png" alt="" srcset="" width="150px">
					    <h4> REALIZANDO PETICIÓN, POR FAVOR ESPERE...</h4><br><div class="preloader-wrapper big active">
					    <div class="spinner-layer spinner-blue-only">
					        <div class="circle-clipper left">
					            <div class="circle"></div>
					            </div><div class="gap-patch">
					            <div class="circle"></div>
					            </div><div class="circle-clipper right">
					            <div class="circle"></div>
					        </div>
					    </div>
					    </div>`,
					    css: {
					      backgroundColor: null,
					      color: '#fff',
					      border: null
					    }
					  });
					}

					function QuitarCargando() {
					  $.unblockUI();
					}

					function onlytextInp(event){
					    var key = event.key;
					    if (!isNaN(parseInt(key))) {
					        event.preventDefault();
					    }
					}
    </script>
  </body>
</html>
