<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
	$idPerfil = $_COOKIE["id_perfil"] ?? "";
  $idOrdenTrabajo = base64_decode($_GET["OT"] ?? "");
  $locationBefore = base64_decode($_GET["LB"] ?? "");
	//
	// require_once("Backend/DentLab/DentLab.php");
	// $DentLab =  new DentLab();
	// $Dentlab =
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<!-- CSS -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
	<!-- Default theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
	<!-- Semantic UI theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
	<!-- Bootstrap theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
	<link href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" rel="stylesheet"/>
	<title>Dent Clinica Dental | Orden trabajo </title>
	<style media="screen">
		.upload_drops{
			margin: 20px;
			padding: 20px;
			cursor: pointer;
			height:auto;
			overflow:hidden;
			border: 2px dashed #9FA3A6;
			line-height: 20px;
			text-align: center;
			color: #9FA3A6;
		}
		.upload_drops.drop{
			border-color: #2BA4FF;
			color: #2BA4FF;
		}
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <div class="contenedoresMenuIndexOT">
           <div class="row">
             <div class="col-12 col-lg-12 text-lg-right">
               <button type="button" class="btn btn-info" name="button" onclick="window.location.href='<?php echo $locationBefore; ?>'"> <i class="fa fa-arrow-left"></i> Regresar</button>
             </div>
           </div>
         </div>
         <br>
         <input type="hidden" name="profile" id="profile" value="<?php echo $idPerfil; ?>">
         <input type="hidden" name="OT" id="OT" value="<?php echo $idOrdenTrabajo; ?>">
         <input type="hidden" name="idloe" id="idloe" value="">
         <input type="hidden" name="Flujo" id="Flujo" value="">
				 <input type="hidden" id="FlujoOrden" value="">

         <div class="contenedoresNav">
					 <div class="panel with-nav-tabs panel-default">
            <div class="panel-heading">
		           <ul class="nav nav-tabs">
		              <li class="navActive" id="liO" style="display:none;" onclick="activeOrNot(this.id,'aOT','liP','liH','liA','liV')"><a id="aOT" href="#tabOT" data-toggle="tab"> <div>Orden de trabajo<strong id="divot"></strong></div> </a></li>
		              <li class="navUnActive" id="liP" style="display:none;" onclick="activeOrNot(this.id,'aP','liO','liH','liA','liV')"><a id="aP" href="#tabPago" data-toggle="tab"><div >Pago</div> </a></li>
		              <li class="navUnActive" id="liH" style="display:none;" onclick="activeOrNot(this.id,'aHO','liO','liP','liA','liV')"><a id="aHO" href="#tabHistorial" data-toggle="tab"> <div >Historial y Operaciones</div> </a></li>
		              <li class="navUnActive" id="liA" style="display:none;" onclick="activeOrNot(this.id,'aAr','liO','liP','liH','liV')"><a id="aAr" href="#tabArchivos" data-toggle="tab"><div >Archivos</div> </a></li>
		              <!-- <li class="navUnActive" id="liV" style="display:none;" onclick="activeOrNot(this.id,'aV','liO','liP','liH','liA')"><a id="aV" href="#tabVisita" data-toggle="tab"> <div >Vista</div></a></li> -->
		            </ul>
						</div>
						<div class="panel-body">
                <div class="tab-content">
									<div class="tab-pane active" id="tabOT" style="padding:15px; color:black;">
										<div class="row">
					            <div class="col-12 col-lg-6">
												<div class="row">
													<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
							                <div class="span">
							                   Escaneo
							                </div>
							                <br>
							                <div class="row" style="padding:10px;">
							                  <div class="col-12 col-lg-9">
							                    <label>Doctor </label>
							                    <input type="text" class="form-control" name="nptDoctor" id="nptDoctor" value="">
							                  </div>
							                  <div class="col-12 col-lg-3">
																	<label id=textIntExt></label><br>
																	<label class='switch' >
												            <input type='checkbox' id='chkExtInt'>
												            <span class='slider round'></span>
												          </label>
							                  </div>
							                  <div class="col-12 col-lg-12" style="margin-top:13px">
							                    <label>Paciente </label>
							                    <input type="text" class="form-control" name="nptPaciente" id="nptPaciente" value="">
							                  </div>
							                </div>
															<div class="row" id="divConModelo" style="padding:10px;display:none;">
																<div class="col-12 col-lg-12">
																	<label>Con modelo <label class='switch' onclick="">
																		<input type='checkbox' id='chkConModelo'>
																		<span class='slider round'></span>
																	</label></label>
																</div>
																<div class="col-12 col-lg-12">
																	<input type="text" class="form-control text-center" name="nptTipoConM" id="nptTipoConM" value="">
																</div>
															</div>
															<div id="divConScan"  style="padding:10px;display:none;">
																<div class="row">
																	<div class="col-12 col-lg-4">
																		<label>Inicio Escaneo</label>
																		<input type="text" class="form-control" name="nptInicio" id="nptInicio" value="">
																	</div>
																	<div class="col-12 col-lg-4">
																		<label>Fin Escaneo</label>
																		<input type="text" class="form-control" name="nptFin" id="nptFin" value="">
																	</div>
																	<div class="col-12 col-lg-4">
																		<label>Escaneo Confirmado</label>
																		<input type="text" class="form-control" name="nptConfirm" id="nptConfirm" value="">
																	</div>
																</div>
																<div class="row" style="padding:10px">
																	<div class="col-12 col-lg-9" style="margin-top:10px" id="divEscaneador">
																		<label>Escaneador asignado</label>
																		<input type="text" class="form-control" name="nptEscaneador" id="nptEscaneador" value="">
																	</div>
																	<div class="col-12 col-lg-3" style="margin-top:16px" id="divAsignar">
																		<br>
																		<button type="button" class="btn btn-outline-info w-100" name="button" onclick="AbrirModalAgenda();">Asignar</button>
																	</div>
																	<div class="col-12 col-lg-12" style="margin-top:16px" id="divAsignar">
																		<label>Observaciones escaneador</label>
																		<textarea class="form-control" name="txtObsEsc" id="txtObsEsc" rows="2" cols="80" placeholder="No se insertaron Observaciones"></textarea>
																	</div>
																</div>
															</div>
															<div class="row" style="padding:10px">
																<div class="col-12 col-lg-6">
																	<label>Libero a Prod</label>
																	<input type="text" class="form-control" disabled name="nptNombreLib" id="nptNombreLib" value="">
																</div>
																<div class="col-12 col-lg-6">
																	<label>Fecha a Prod</label>
																	<input type="text" class="form-control" disabled name="nptFechaLib" id="nptFechaLib" value="">
																</div>
															</div>
									          </div>
													</div>
													<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
															<div class="span">
																Discos utilizados en la orden.
														 	</div>
															<div class="row">
																<div class="col-12 col-lg-12">
																	<div class="table-responsive" style="text-align: center">
																		<table class="table table-hover table-sm" id="tableAsignaDiscosPrincipal">
																			<thead>
																				<tr>
																					<th>NoDisco</th>
																					<th>Cantidad</th>
																				</tr>
																			</thead>
																		</table>
																	</div>
																</div>
															</div>
														 	<br>
														</div>
													</div>
												</div>
					            </div>
					            <div class="col-12 col-lg-6">
												<div class="contenedoresNav text-center">
					                <div class="span">
					                   Orden de Trabajo
					                </div>
					                <br>

					                <div class="row" style="padding-left: 10px;padding-right: 10px;">
					                  <div class="col-12 col-lg-12 text-center">
					                    <label>Metodo de pago</label>
															<input type="text" class="form-control text-center" name="MetodoPago" id="MetodoPago" value="">
															<br>
					                  </div>
					                  <div class="col-12 col-lg-4 text-center">
					                    <label>Fecha Entrega Solicitada</label>
															<input type="date" class="form-control" name="nptDateSol" id="nptDateSol" value="">
					                  </div>
					                  <div class="col-12 col-lg-8 text-center">
					                    <label>Colorimetro</label>
															<input type="text" class="form-control" name="nptColorimetro" id="nptColorimetro" value="">
					                  </div>
														<div class="col s12 text-center" id="cardComentarioOrdenColorimetro" style="display:none;">
															<hr>
															<label>Comentario asigna colorimetro</label>
															<textarea id="txComentarioOrdenColorimetro" disabled class="form-control"></textarea>
														</div>
					                </div>
													<br>
													<div class="row text-center" style="padding-left: 10px;padding-right: 10px;">
														<div class="col-6 col-lg-2">
															<label>Color</label><br>
															<label class='switch' onclick="">
										            <input type='checkbox' id='chkColor'>
										            <span class='slider round'></span>
										          </label>
														</div>
														<div class="col-6 col-lg-2">
															<label>Mordida</label><br>
															<label class='switch' onclick="">
										            <input type='checkbox' id='chkMord'>
										            <span class='slider round'></span>
										          </label>
														</div>
														<div class="col-6 col-lg-2">
															<label>Muñon</label><br>
															<label class='switch' onclick="">
										            <input type='checkbox' id='chkMuñ'>
										            <span class='slider round'></span>
										          </label>
														</div>
														<div class="col-6 col-lg-3">
															<label>Aditamento</label><br>
															<label class='switch' onclick="">
										            <input type='checkbox' id='chkAdit'>
										            <span class='slider round'></span>
										          </label>
														</div>
														<div class="col-6 col-lg-3">
															<label>Linea Sellado</label><br>
															<label class='switch' onclick="">
										            <input type='checkbox' id='chkLs'>
										            <span class='slider round'></span>
										          </label>
														</div>
													</div>
													<br>
													<div class="row" style="padding-left: 10px;padding-right: 10px;">
														<div class="col-12 col-lg-2">
															<label>Unidades</label>
															<input type="text" class="form-control" name="nptUnidades" id="nptUnidades" value="">
														</div>
														<div class="col-12 col-lg-10">
															<label>Producto</label>
															<input type="text" class="form-control" name="nptProd" id="nptProd" value="">
														</div>
													</div>
													<div class="row" style="padding:10px;">
														<div class="col-12 col-lg-12">
															<label>Observaciones</label>
															<textarea name="txtObservaciones" id="txtObservaciones" class="form-control" rows="3" cols="80" placeholder="No hay observaciones del doctor"></textarea>
														</div>
														<div class="col-12 col-lg-12" style="margin-top:16px" id="divAsignar">
															<label>Observaciones laboratorio</label>
															<textarea class="form-control" name="txtObsLab" id="txtObsLab" rows="2" cols="80" placeholder="Aún no se insertan comentarios" onkeyup="updateObservacionLaboratorio('')"></textarea>
														</div>
													</div>
					              </div>
					            </div>
					          </div>
										<div class="row text-center">
											<div class="col-12 col-lg-12" style="margin-top:10px;">
												<div class="contenedoresNav">
													<div class="span">
														Paquetes usados
													</div>
													<div class="row" style="padding:10px;">
														<div class="col-12 col-lg-12" id="divPaquetes" style="margin-top:15px">

														</div>
													</div>
												</div>
											</div>
											<div class="col-12 col-lg-12" style="margin-top:10px;">
												<div class="contenedoresNav">
													<div class="span">
														 Detalle del pedido
													</div>
													<div class="row">
														<div class="col-12 col-lg-12">
															<div style="padding:10px;display:none;" class="table-responsive" id="divTabla">
																<table id="tableDetalle" class="table table-hover table-sm text-center">
																	<thead>
																		<th>Producto</th>
																		<th>Cantidad</th>
																		<th>Precio</th>
																		<th>Anticipo</th>
																		<th>Plazo</th>
																		<th>Subtotal</th>
																		<th>Subtotal Ant</th>
																	</thead>
																	<tbody>

																	</tbody>
																	<thead>
																		<th colspan="5"></th>
																		<th id="Subtotal"></th>
																		<th id="SubtotalAnt"></th>
																	</thead>
																</table>
															</div>
															<div class="row" style="padding:10px;display:none" id="divmensajeDs">
																<div class="col-12 col-lg-12" id="divmensaje" style="margin-top:15px">

																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="row text-center">
											<div class="col-12 col-lg-12" style="margin-top:10px;">
												<div class="contenedoresNav">
													<div class="span">
														 Odontograma
													</div>
													<br>
													<h6>Tipo de diente</h6>
													<div class="row" style="padding:10px;">

														<div class="col-12 col-lg-3 offset-lg-3 text-center">
															<div style="background-color:#69CEBE;color:white;font-size:18px;border-radius:5px;padding:3px;text-align:center;">
																<labeL>PILAR</label>
															</div>
															<br>
														</div>
														<div class="col-12 col-lg-3 text-center">
															<div style="background-color:#F4D77A;color:white;font-size:18px;border-radius:5px;padding:3px;text-align:center;">
																<label>PÓNTICO</label>
															</div>
															<br>
														</div>
														<div class="col-12 col-lg-12">
															<div class="" id="divIncludeOrdenes" style="border:2px solid #50a4cf; border-radius:15px; ">

															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
			            </div>
			            <div class="tab-pane fade" id="tabPago" style="padding:15px; color:black;">
										<div class="contenedoresNav text-center">
											<div class="span">
												<div class="row">
													<div class="col-6 offset-3 col-lg-6">
														<i class="fa fa-money-check-alt"></i> Pagos
													</div>
													<div class="col-3 col-lg-3 text-right">
														<button type="button" class="btn btnEtiqueta" onclick="AgregarPagos()">
															<i class="fal fa-plus"></i>
														</button>
													</div>
												</div>
											</div>
											<br>
											<div class="table-responsive">
												<table class="table table-hover text-center" id="tablePago">
													<thead>
															<th>Folio de pago</th>
															<th>Metodo de pago</th>
															<th>Monto</th>
															<th>Fecha de pago</th>
															<th>Usuario</th>
													</thead>
												</table>
											</div>
										</div>
			            </div>
			            <div class="tab-pane fade" id="tabHistorial" style="padding:15px; color:black;">
										<div class="row">
											<div class="col-12 col-lg-6">
												<div class="row">
													<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
															<div class="span">
															 <i class="fa fa-tools"></i> Operaciones
															</div>
															<br>
															<div class="row" id="divAgregar" style="display:none; padding:10px;">
																<div class="col-12 col-lg-12">
																	<h6>¿Quieres agregar guia? <label class='switch'>
												            <input type='checkbox' id='chkAddG'>
												            <span class='slider round'></span>
												          </label></h6>
																</div>
																<div class="col-12 col-lg-12">
																	<textarea name="txtObs" id="txtObs" class="form-control" rows="4" cols="80" placeholder="Agregar comentarios (Opcional)"></textarea>
																</div>
															</div>
															<br>
															<div class="row">
																<div class="col-12 col-lg-12 text-center">
																	<input type="hidden" name="nptEstadoFuturo" id="nptEstadoFuturo">
																	<input type="hidden" name="nptEstadoGralFuturo" id="nptEstadoGralFuturo">
																	<input type="hidden" name="nptEstadoFuturoFlujo" id="nptEstadoFuturoFlujo">
																	<button type="button" class="btn btn-info" name="btnLiberar" id="btnLiberar" onclick="Liberar()"></button>
																</div>
															</div>
															<br>
															<div class="row">
																<div class="col-12 col-lg-12 text-center">
																	<input type="hidden" name="nptEstadoFuturo">
																	<div class="row" style="display:none;" id="divComp">
																		<div class='col-md-12'>
																			<svg id='codOT'>

																			</svg>
																		</div>
																	</div>
																	<button type="button" class="btn btn-outline-info w-100" id="btnEtiqueta" onclick="Etiqueta()" ><i class="fal fa-barcode-read"></i> Etiqueta</button>
																</div>
															</div>
														</div>
													</div>
													<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
															<div class="row">
																<div class="col-12 col-lg-12">
																	<div class="span">
																	 <i class="fa fa-tools"></i> Asignar Discos
																	</div>
																</div>
																<div class="col-2 offset-col-10 col-lg-2 offset-lg-10" style="position:absolute;">
																	<button type="button" class="btnAsignarGris" onclick="getDatosDiscosOrden()" style="margin-top:.5vh"><span><i class="fa fa-plus"></i></span></button>
																</div>
															</div>
															<br>
															<div class="table-responsive" style="text-align: center">
																<table class="table table-hover table-sm" id="tableAsignaDiscos">
																	<thead>
																		<tr>
																			<th>NoDisco</th>
																			<th>Cantidad</th>
																		</tr>
																	</thead>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-12 col-lg-4" style="display:none">
												<div class="contenedoresNav text-center">
													<div class="span" id="divTituloH">
														<div class="span">
														 <i class="fad fa-tools"></i> Operaciones
														</div>
														<br>
													</div>
													<br>
													<div class="table-responsive">
														<table class="table table-hover table-sm" id="tableFabricacion">
															<thead>
																<th>Proceso</th>
																<th>Alias</th>
																<th>Inicio</th>
																<th>Fin</th>
																<th>Minutos</th>
																<th>Unidades</th>
															</thead>
														</table>
													</div>
												</div>
											</div>
											<div class="col-12 col-lg-6">
												<div class="contenedoresIndex text-center">
													<div class="span">
													 <i class="fa fa-history"></i> Historial
													</div>
													<br>
													<div class="table-responsive" style="height: 33vh;">
														<table class="table table-hover table-sm" id="tableHistorial">
															<thead>
																<th>Macroestatus</th>
																<!-- <th>Estatus</th> -->
																<th>Fecha</th>
																<th>Usuario</th>
															</thead>
															<tbody id="tbHistorial"></tbody>
														</table>
													</div>
													<div class="row">
														<div class="col-12 col-lg-12">
															<button type="button" class="btn btn-outline-danger w-100" onclick="VerifyProfile()" id="btnCancelar"><i class="fa fa-ban"></i> Cancelar orden</button>
														</div>
													</div>
												</div>
											</div>
										</div>
			            </div>
			            <div class="tab-pane fade" id="tabArchivos" style="padding:15px; color:black;">
										<div class="contenedoresNav text-center">
											<div class="span">
												<i class="fas fa-folder"></i> Archivo
											</div>
											<br>
											<form action="Backend/DentLab/App.php" method="post" id="formInsertFile">
												<div style="display:none;" id="divArchivo" style="padding:20px;">
													<div class="upload_drops" id="dropzones">
							              <br>
														<input type="hidden" name="nptOrdenid" value="<?php echo $idOrdenTrabajo; ?>">
														<input type="hidden" name="nptNombreFile" id="nptNombreFile" value="">
														<input type="file" class="form-control" name="nptFile" onchange="AgregarArchivo()" id="nptFile" style="display:none;" accept=".zip,.rar,.7zip,.jpg,image/jpeg,image/x-png">
														<div onclick="clickNpt();">
															<h6><i class="fa fa-cloud-upload" style="color:lightgray;"></i> Da un click para agregar el archivo</h6>
															<br>
														</div>
							              <p></p>
							              <br>
							              <div class="form-group-row">
							                <div id="ImagenesDrop" class="col-lg-12">
							                </div>
							              </div>
							            </div>
													<br>
													<div class="row">
														<div class="col-12 col-lg-12 text-center">
															<button type="button" class="btn btn-outline-info" name="btnGFile" id="btnGFile" onclick="InsertArchivo()">Cargar archivo</button>
														</div>
													</div>
												</div>
											</form>
											<br>
											<div class="table-responsive" style="display:none;" id="divTablaArchivo">
												<table class="table-hover table" id="tableArchivos">
													<thead>
														<th>Nombre</th>
														<th>Descargar</th>
													</thead>
												</table>
											</div>
										</div>
										<br>
										<div class="contenedoresNav text-center" id="divArchivosAlinea" style="display:none;">
											<div class="span">
												<i class="fas fa-folder"></i> Archivos Alinia
											</div>
											<br>
											<div class="table-responsive">
												<table class="table table-hover" id="tableArchivosAlinia">
													<thead>
														<th>Requisito</th>
														<th>Archivo</th>
														<th></th>
													</thead>
												</table>
											</div>
										</div>
			            </div>
			            <!-- <div class="tab-pane fade" id="tabVista">
			            </div> -->
								</div>
						</div>
				 	</div>
         </div>

					<div class="modal fade" id="ModalAgendar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
	 				 	<div class="modal-dialog modal-dialog-centered modal-sm">
	 					 <div class="modal-content ">
	 						 <div class=" text-center">
	 							 <br>
	 							 <h4 class="modal-title" style="color:black;">Asignar escaneador</h4>
	 							 <hr>
	 						 </div>
	 						 <div class="modal-body ">
	 							 <form id="FormAgendar" method="post" action="Backend/DentLab/App.php">
	 								 <div class="form-group">
	 									 <input type="text" class="form-control" id="op" name="op"  style="display:none;" value="AgendarOrden">
	 									 <input type="text" class="form-control" id="idCliente" name="idCliente" style="display:none;">
	 									 <div class="row">
	 										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
												 <select class="form-control select2 text-center" name="slcEscaneador" id="slcEscaneador">
													 <option value="" selected disabled>Selecciona un escaneador</option>
												 </select>
	 										 </div>
	 									 </div>
	 									 <br>
	 								 </div>
	 							 </form>
	 						 </div>
	 						 <div class="modal-footer">
	 							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
	 							 <button type="button" class="btn btn-info" id="btnguardar" onclick="AgendarOrden()">Agendar</button>
	 						 </div>
	 					 </div>
	 				 </div>
	 				</div>
					<div class="modal fade" id="modalAcceso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
	 				 	<div class="modal-dialog modal-dialog-centered modal-sm">
	 					 <div class="modal-content ">
	 						 <div class=" text-center">
	 							 <br>
	 							 <h4 class="modal-title" style="color:black;">Acceso administrador</h4>
	 							 <hr>
	 						 </div>
	 						 <div class="modal-body ">
 								 <div class="form-group">
 									 <div class="row">
 										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
											 <h6>Usuario</h6>
											 <input type="text" class="form-control" id="user" name="user" value="" style="border:none;border-bottom:1px solid lightgray;text-align:center;">
 										 </div>
 										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
											 <h6>Contraseña</h6>
											 <input type="password" class="form-control" id="pwd" name="pwd" value="" style="border:none;border-bottom:1px solid lightgray;text-align:center;">
 										 </div>
 									 </div>
 									 <br>
 								 </div>
	 						 </div>
	 						 <div class="modal-footer">
	 							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
	 							 <button type="button" class="btn btn-info" id="btnguardar" onclick="Autenticar()">Autenticar</button>
	 						 </div>
	 					 </div>
	 				 </div>
	 				</div>
					<div class="modal fade" id="modalComentarioCancelacion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
	 				 	<div class="modal-dialog modal-dialog-centered modal-sm">
	 					 <div class="modal-content ">
	 						 <div class=" text-center">
	 							 <br>
	 							 <h4 class="modal-title" style="color:black;">Motivo de cancelación</h4>
	 							 <hr>
	 						 </div>
	 						 <div class="modal-body ">
 								 <div class="form-group">
 									 <div class="row">
 										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
											 <textarea name="txtCancelar" id="txtCancelar" class="form-control" rows="4" cols="80" placeholder="Agregue alguna razón de cancelación (Opcional)"></textarea>
 										 </div>
 									 </div>
 									 <br>
 								 </div>
	 						 </div>
	 						 <div class="modal-footer">
	 							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Regresar</button>
	 							 <button type="button" class="btn btn-info" onclick="Cancelar()">Cancelar orden</button>
	 						 </div>
	 					 </div>
	 				 </div>
	 				</div>
					<div class="modal fade" id="ModalGuia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
					 <div class="modal-dialog modal-dialog-centered modal-sm">
						<div class="modal-content ">
							<div class=" text-center">
								<br>
								<h4 class="modal-title" style="color:black;">Asignar guía de envío</h4>
								<hr>
							</div>
							<div class="modal-body ">
								<form id="FormGuia" method="post" action="Backend/DentLab/App.php">
									<div class="form-group">
										<div class="row">
											<div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
												<input type="text" class="form-control text-center" name="nptNoG" id="nptNoG" placeholder="Digite el numero de guía">
											</div>
											<div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
												<select class="form-control select2 text-center" name="slcPaqueteria" id="slcPaqueteria">
													<option value="" selected disabled>Selecciona una paqueteria</option>
												</select>
											</div>
										</div>
										<br>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
								<button type="button" class="btn btn-info" id="btnguardar" onclick="liberarModal()">Liberar a entrega</button>
							</div>
						</div>
					</div>
					</div>
					<div class="modal fade" id="ModalPago" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
					 <div class="modal-dialog modal-dialog-centered modal-sm">
						<div class="modal-content ">
							<div class=" text-center">
								<br>
								<h4 class="modal-title" style="color:black;">Agregar pago</h4>
								<hr>
							</div>
							<div class="modal-body ">
								<form id="FormPago" method="post" action="Backend/DentLab/App.php">
									<div class="form-group">
										<div class="row">
											<div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
												<select class="form-control select2 text-center" name="slcMethod" id="slcMethod">
													<option value="" selected disabled>Selecciona un metodo de pago</option>
												</select>
											</div>
											<div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
												<h6>Cantidad</h6>
												<input type="number" class="form-control" name="nptMonto" id="nptMonto" value="" placeholder="Digita la cantidad" step=".01">
											</div>
										</div>
										<br>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
								<button type="button" class="btn btn-info" id="btnguardar" onclick="Pagar()">Registrar Pago</button>
							</div>
						</div>
					</div>
					</div>
					<div style="display:none;">
						<div class="row" id="divDiscosActivosDisp" style="padding:3vh">
							<div class="col-12 col-lg-12">
								<div class="row" style="background-color:#000">
									<div class="col-6 col-lg-6" style="text-align:center">
										<h3 id="NoOrdenAsignDiscos" style="color:white"></h3>
									</div>
									<div class="col-6 col-lg-6" style="text-align:center">
										<h3 id="CantPiezasOrdenH3" style="color:white"></h3>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-8" style="padding:2vh;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; text-align:center">
								<h4>Discos Activos</h4>
								<div class="col-12 col-lg-4">
							  	<select class="form-control" id="slctMarca" name="slctMarca" onchange="getDiscosActivosDentLab()">
										<option value=""> Listado de Marcas </option>
							  	</select>
						    </div>
								<div class="col-12 col-lg-4">
								 <select class="form-control" name="slctColores" id="slctColores" onchange="getDiscosActivosDentLab()">
									 <option value=""> Listado de Colores </option>
								 </select>
	              </div>
								<div class="col-12 col-lg-4">
									<select class="form-control" name="txtLongitud2"  id="txtLongitud2" onchange="getDiscosActivosDentLab()">
									 <option value="">SELECCIONE TAMAÑO </option>
									 <option value="14">14mm</option>
									 <option value="15">15mm</option>
									 <option value="16">16mm</option>
									 <option value="17">17mm</option>
									 <option value="18">18mm</option>
									 <option value="19">19mm</option>
									 <option value="20">20mm</option>
									 <option value="22">22mm</option>
									 <option value="25">25mm</option>
									 <option value="30">30mm</option>
								 </select>
								</div>
								<div class="table-responsive" style="height:50vh;overflow-y:scroll;margin-top:10vh">
									<table class="table table-hover text-center" id="tableDiscosActivos" >
										<thead>
											<tr>
												<th>No Disco</th>
												<th>Piezas Disponibles</th>
												<th>Colorimetro</th>
												<th>Marca</th>
												<th>Tamaño</th>
												<th>Seleccionar Cantidad</th>
												<th>Asignar a Orden</th>
											</tr>
										</thead>
										<tbody ></tbody>
									</table>
								</div>
							</div>
							<div class="col-12 col-lg-4" style="padding:2vh;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
								<div class="row">
									<div class="col-12 col-lg-12" id="CantPiezasDiscoAsignados">
									</div>
								</div>
								<div class="table-responsive">
									<table class="table table-hover text-center" id="tableDiscosAsignadosOrdenModal">
										<thead>
											<tr>
												<th>NoDisco</th>
												<th>Cantidad</th>
												<th>Actualizar</th>
												<th>Eliminar</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>
					</div>
        </div>
      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script src="vendors/barcode/JsBarcode.all.min.js"></script>
		<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
		<script type="text/javascript" src="scripts/OrdentTrabajo.js">

		</script>
  </body>
</html>
