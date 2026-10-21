<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}

  $idDoct = base64_decode($_GET["d"] ?? "");
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
	<title>Dent Clinica Dental | Ficha Doctor </title>
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
    input{
      text-align: center;
    }

		.btn-btnRegistrarPago {
		background-color: #6dbfe8;
		border-color: #60b2db;
		color:#FFFFFF;
		}
		.btn-btnRegistrarPago:hover,
		.btn-btnRegistrarPago:focus,
		.btn-btnRegistrarPago:active,
		.btn-btnRegistrarPago.active {
			background-color: #5dafd8;
			border-color: #4597c0;
			color:#FFFFFF;
		}
		.btn-btnRegistrarPago.disabled:hover,
		.btn-btnRegistrarPago.disabled:focus,
		.btn-btnRegistrarPago.disabled:active,
		.btn-btnRegistrarPago.disabled.active,
		.btn-btnRegistrarPago[disabled]:hover,
		.btn-btnRegistrarPago[disabled]:focus,
		.btn-btnRegistrarPago[disabled]:active,
		.btn-btnRegistrarPago[disabled].active,
		fieldset[disabled] .btn-btnRegistrarPago:hover,
		fieldset[disabled] .btn-btnRegistrarPago:focus,
		fieldset[disabled] .btn-btnRegistrarPago:active,
		fieldset[disabled] .btn-btnRegistrarPago.active {
			background-color: #6dbfe8;
			border-color: #60b2db;
			color:#FFFFFF;
		}
		.e-toolbar .e-toolbar-items.e-tbar-pos {
		    display: block;
		    height: 60px;
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
               <button type="button" class="btn btn-info" name="button" onclick="window.location.href='ListadosDoctores.php'"> <i class="fa fa-arrow-left"></i> Regresar</button>
             </div>
           </div>
         </div>
         <br>
         <input type="hidden" name="idDoc" id="idDoc" value="<?php echo $idDoct; ?>">
         <div class="contenedoresNav">
					 <div class="panel with-nav-tabs panel-default">
            <div class="panel-heading">
		           <ul class="nav nav-tabs">
		              <li class="navActive" id="liP" onclick="activeOrNot(this.id,'aP','liO','liH','liA','liV')"><a id="aP" href="#tabDatos" data-toggle="tab"><div >Datos</div> </a></li>
                  <li class="navUnActive" id="liO" onclick="activeOrNot(this.id,'aOT','liP','liH','liA','liV')"><a id="aOT" href="#tabOT" data-toggle="tab"> <div>Ordenes de trabajo<strong id="divot"></strong></div> </a></li>
		              <li class="navUnActive" id="liH" onclick="activeOrNot(this.id,'aHO','liO','liP','liA','liV')"><a id="aHO" href="#tabPaquetes" data-toggle="tab"> <div >Paquetes</div> </a></li>
		              <li class="navUnActive" id="liA" onclick="activeOrNot(this.id,'aAr','liO','liP','liH','liV')"><a id="aAr" href="#tabPagos" data-toggle="tab"><div >Pagos</div> </a></li>
		              <!-- <li class="navUnActive" id="liV" onclick="activeOrNot(this.id,'aVr','liO','liP','liH','liV')"><a id="aVr" href="#tabVisitas" data-toggle="tab"><div >Visitas</div> </a></li> -->
		            </ul>
						</div>
						<div class="panel-body">
                <div class="tab-content">
			            <div class="tab-pane active" id="tabDatos" style="padding:15px; color:black;">
                    <div class="row">
                      <div class="col-12 col-lg-6">
                      	<div class="row">
                      		<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
															<div class="span">
																 Datos Generales
															</div>
															<br>
															<div class="row" style="padding:10px;">
																<div class="col-12 col-lg-12" style="margin-top:10px">
																	<h6>Nombre</h6>
																	<input type="text" class="form-control" name="nptNombre" id="nptNombre" value="">
																</div>
																<div class="col-12 col-lg-6" style="margin-top:10px">
																	<h6>Apellido Paterno</h6>
																	<input type="text" class="form-control" name="nptApellidoP" id="nptApellidoP" value="">
																</div>
																<div class="col-12 col-lg-6" style="margin-top:10px">
																	<h6>Apellido Materno</h6>
																	<input type="text" class="form-control" name="nptApellidoM" id="nptApellidoM" value="">
																</div>
																<div class="col-12 col-lg-12" style="margin-top:10px">
																	<h6>Email</h6>
																	<input type="text" class="form-control" name="nptEmail" id="nptEmail" value="">
																</div>
																<div class="col-6 col-lg-6" style="margin-top:10px">
																	<h6>Activo</h6>
																	<label class='switch'>
																		<input type='checkbox' id='chkActivo' name="chkActivo">
																		<span class='slider round'></span>
																	</label>
																</div>
																<div class="col-6 col-lg-6" style="margin-top:10px">
																	<h6>Externo</h6>
																	<label class='switch'>
																		<input type='checkbox' id='chkExt' name="chkExt">
																		<span class='slider round'></span>
																	</label>
																</div>
																<div class="col-12 col-lg-12" style="margin-top:10px">
																	<h6>Observacion</h6>
																	<textarea name="nptObservacion" id="nptObservacion" class="form-control" rows="4" cols="80"></textarea>
																</div>
															</div>
														</div>
                      		</div>
													<div class="col-12 col-lg-12">
														<div class="contenedoresNav text-center">
															<div class="span">
																 Vendedor Asignado
															</div>
															<br>
															<div class="row">
																<div class="col-9 col-lg-9">
																	<select class="form-control" id="slctVendedor">
																		<option value="" disabled>Actualmente sin vendedor</option>
																		<option value="MA==">DentLab</option>
																	</select>
																</div>
																<div class="col-3 col-lg-3">
																	<button type="button"  class="btnAsignar" id="btnUpdateVendedor"><i class="fas fa-check"></i></button>
																</div>
															</div>
														</div>
													</div>
                      	</div>
                      </div>
                      <div class="col-12 col-lg-6">
                        <div class="contenedoresNav text-center">
                          <div class="span">
                             De contacto
                          </div>
                          <br>
                          <div class="row" style="padding:10px;">
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Clinica</h6>
                              <input type="text" class="form-control" name="nptClinica" id="nptClinica" value="">
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Telefono</h6>
                              <input type="number" class="form-control" name="nptTel" id="nptTel" value="">
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Celular</h6>
                              <input type="number" class="form-control" name="nptCel" id="nptCel" value="">
                            </div>
														<div class="col-6 col-lg-6">
														<h6>Colonia</h6>
														<input type="text" name="txtColonia" id="txtColonia" class="form-control" required>
													</div>
													<div class="col-6 col-lg-6">
														<h6>Calle</h6>
														<input type="text" name="txtCalle" id="txtCalle" class="form-control"required>
														<br>
													</div>
													<div class="col-4 col-lg-4">
														<h6>No° Ext</h6>
														<input type="number" name="txtNoExt" id="txtNoExt" class="form-control"required min="0">
													</div>
													<div class="col-4 col-lg-4">
														<h6>Codigo Postal</h6>
														<input type="number" name="txtCP" id="txtCP" class="form-control" required min="0" maxlength="6"><br>
													</div>
                            <div class="col-12 col-lg-4">
                              <h6>Contacto o Asistente</h6>
                              <input type="text" class="form-control" name="nptAsis" id="nptAsis" value="">
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Contacto Tel</h6>
                              <input type="text" class="form-control" name="nptTelSis" id="nptTelSis" value="">
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Contacto Mail</h6>
                              <input type="text" class="form-control" name="nptMailSis" id="nptMailSis" value="">
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-facebook fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptF" id="nptF" value="" placeholder="Digite el usuario de Facebook (Opcional)">
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-twitter fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptT" id="nptT" value="" placeholder="Digite el usuario de Twitter (Opcional)">
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-instagram fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptI" id="nptI" value="" placeholder="Digite el usuario de Instagram (Opcional)">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br><br>
                      <div class="col-12 col-lg-12 text-center" style="margin-top:10px;">
                        <button type="button" class="btn btn-outline-info" name="btnGuardarCambios" id="btnGuardarCambios" onclick="UpdateDatosGral()">Guardar cambios</button>
                      </div>
                    </div>
			            </div>
									<div class="tab-pane fade" id="tabOT" style="padding:15px; color:black;">
                    <div class="row">
                      <div class="col-12 col-lg-12">
                        <div class="contenedoresNav text-center">
                          <div class="span">
                             Ordenes de trabajo solicitadas
                          </div>
                          <br>
                          <div class="row" style="padding:10px;">
                            <div class="col-12 col-lg-12">
															<div id="t_orders"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
			            <div class="tab-pane fade" id="tabPaquetes" style="padding:15px; color:black;">
										<div class="row">
                      <div class="col-12 col-lg-12">
                        <div class="contenedoresNav text-center">
                          <div class="span">
														<div class="row">
															<div class="col-6 col-lg-6 text-right">
																<i class="fas fa-box-open"></i> Paquetes
															</div>
															<div class="col-6 col-lg-6" style="display:none;">
																<!-- <a href="#" class="btn btn-info" style="width:10%; float:right;" onclick="abrirModalDoctPaq()"><i class="fas fa-box-open"></i></a> -->
															</div>
														</div>
                          </div>
                          <br>
                          <div class="row" style="padding:10px;">
                            <div class="col-12 col-lg-12">
                              <div class="table-responsive">
																<table class="table table-hover" id="tablaPaquetes">
	                                <thead>
	                                  <th>Serie</th>
	                                  <th>Paquete</th>
	                                  <th>Piezas total</th>
	                                  <th>Piezas solicitadas</th>
	                                  <th>Disponibles</th>
	                                  <th>Precio</th>
																		<th>Pagado</th>
	                                  <th>Registro</th>
	                                  <th>Activado</th>
	                                  <th>Terminado</th>
																		<th>Detalle de uso</th>
																		<th>Actualizar Cantidad</th>
																		<th>Detalle de Pagos</th>
	                                </thead>
	                              </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
			            </div>
			            <div class="tab-pane fade" id="tabPagos" style="padding:15px; color:black;">
										<div class="row">
											<div class="col-12 col-lg-12">
												<div class="contenedoresNav text-center">
                          <div class="span">
                             <i class="fa fa-file-invoice-dollar"></i> Pagos Realizados
                          </div>
													<br>
													<div class="row" style="padding:10px;">
														<div class="col-12 col-lg-12 table-responsive">
															<table class="table table-hover" id="tablePagos">
																<thead>
																	<th>Folio</th>
																	<th>Fecha</th>
																	<th>Concepto</th>
																	<th>Monto</th>
																</thead>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
			            </div>
			            <div class="tab-pane fade" id="tabVisitas" style="padding:15px; color:black;display:none;">

			            </div>
								</div>
						</div>
				 	</div>
         </div>

					<div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
					 <div class="modal-dialog modal-dialog-centered modal-sm">
						<div class="modal-content ">
							<div class=" text-center">
								<br>
								<h4 class="modal-title" style="color:black;">Detalle de uso</h4>
								<hr>
							</div>
							<div class="modal-body ">
								<div class="form-group">
									<div class="row">
										<div class="col-12 col-lg-12 table-responsive" >
											<table class="table table-hover table-sm text-center" id="tablaDetalle">
												<thead>
													<th>OT</th>
													<th>Cantidad Usada</th>
												</thead>
											</table>
										</div>
									</div>
									<br>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
					</div>

					<div class="modal fade" id="ModalPaqDoctor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					 <div class="modal-dialog ">
						 <div class="modal-content ">
							 <div class="modal-header ">
								 <h5 class="modal-title" id='TituloModal'> Asignar Paquete </h5>
								 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
									 <span aria-hidden="true">&times;</span>
								 </button>
							 </div>
							 <div class="modal-body ">
								 <div class="form-group">
									 <div class="row">
									 		<div class="col-12 col-lg-12 text-center">
												<span> Paquete </span>
												<br>
									 			<select class="form-control" id="slctPaquete" onchange="asignaDatosPaqueteInp(this.value)">
									 				<option value="" selected disabled> Listado de Paquetes </option>
													<?php
													require_once("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
													$Paquetes = new AdmProductos_Paquetes();
													$ListPaquetes = $Paquetes->getPaquetesEnVenta();
													for ($i=0; $i < sizeof($ListPaquetes) ; $i++) {
														$Productos_Paquetes_Id = $ListPaquetes[$i]["Productos_Paquetes_Id"];
														$Paquete = $ListPaquetes[$i]["Paquete"];
														echo "
														<option value='$Productos_Paquetes_Id'> $Paquete  </option>
														";
													}
													 ?>
									 			</select>
									 		</div>
											<div class="col-6 col-lg-6 text-center" style="margin-top:2vh">
												<span> Saldo Restante </span>
												<br>
												<input type="number" id="txtSaldo" class="form-control" min="0">
											</div>
											<div class="col-6 col-lg-6 text-center" style="margin-top:2vh">
												<span> Cantidad de piezas disponibles </span>
												<br>
												<input type="number" id="txtCantidad" class="form-control" min="1" value="1">
											</div>
									 </div>
							 	 </div>
							 <div class="modal-footer">
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" onclick="InsertarPaqueteDoctor()">Guardar</button>
							 </div>
						 </div>
					 </div>
					</div>
				</div>
				<div class="modal" tabindex="-1" role="dialog" id="ModalUpdatePaq">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title">Actualizar Cantidad Paquete</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
								<div id="divCantPiezas">

								</div>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-primary" onclick="updateCantPaq()">Actualizar</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
				<div class="modal" tabindex="-1" role="dialog" id="DetallePagosPaquete">
								<div class="modal-dialog  modal-lg"  role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title">Detalle Pagos Paquete</h5>
											<button type="button" class="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-12 col-lg-12">
													<div class="table-responsive">
														<table class="table table-hover" id="tableDetallePagosPaquete" style="text-align:center;">
															<thead>
																<tr>
																	<th>SERIE PAGO</th>
																	<th>SERIE PAQUETE</th>
																	<th>PAGO</th>
																	<th>METODO</th>
																	<th>FECHA PAGO</th>
																	<th>STATUS</th>
																	<th>ACTUALIZAR STATUS</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
							<div class="modal" tabindex="-1" role="dialog" id="RealizaPagoPaquete" data-backdrop="static" data-keyboard="false">
												<div class="modal-dialog modal-lg" role="document">
													<div class="modal-content" style="height:90vh;">
														<div class="modal-header">
															<h5 id="tituloPagoPaquete" class="modal-title"></h5>
															<button type="button" class="close" data-dismiss="modal" aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<div class="modal-body">
															<div class="row" style="padding:3vh;">
																<div class="col-12 col-lg-12">
																	<div class="row"  style="box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;padding:2vh;">
																		<div class="col-12 col-lg-4 text-center">
																			<span id=""><b>Metodos de Pago: </b></span>
																			<select onchange="changeMetodoPago(this.value)" class="form-control text-center" style="width: 100%;" id="MetodoPago" name="MetodoPago">
																			<option value="0" disabled> Metodos de Pago </option>
																			<option value="3">Transferencia </option>
																			<option value="4">Recoleccion Efectivo</option>
																			</select>
																		</div>
																		<div class="col-12 col-lg-8" id="formulariotrasferencia" style="display:none;">
																			<div class="text-center" style="padding:2vh;max-height:20vh; cursor:pointer; overflow-y:scroll;overflow-x:hidden;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
																				<div class="content">
																					<div class="row">
																						<div class="col-12 col-lg-12">
																							<h4>Pago con Transferencia</h4>
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
																		<div class="col-12 col-lg-8" id="formularioRecoleccionEf" style="display:none;">
																			<div class="text-center" style="padding:2vh;max-height:20vh; cursor:pointer; overflow-y:scroll;overflow-x:hidden;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
																				<div class="content">
																					<div class="row">
																						<div class="col-12 col-lg-12">
																							<h4>Recoleccion de efectivo</h4>
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
																	</div>
																</div>
																<div class="col-12 col-lg-12" style="margin-top:3vh;">
																	<div class="row" style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;padding:2vh;">
																		<div class="col-3 col-lg-3">
									                    <div class="row">
									                      <div class="col-12 col-lg-12 text-center" style="margin-top:4vh;">
									                        <span><b>PAQUETE</b></span><br>
									                        <span id="NombrePaquete"></span>
									                      </div>
									                      <div class="col-12 col-lg-12 text-center" style="margin-top:4vh;margin-bottom:4vh">
									                        <span><b>Restante</b></span><br>
									                        <span id="Restante"></span>
									                      </div>
									                    </div>
																		</div>
																		<div class="col-5 col-lg-5" style="margin-top:4vh;">
								                      <div class="row">
								                      	<div class="col-12 col-lg-12">
																					<span id=""><b>Cantidad a Pagar: ($)</b></span>
									                         <input type="text" class="form-control validate-name" id="txtCantidadPagar" name="txtCantidadPagar" placeholder="Cantidad a Pagar" maxlength="15" min="1500" value="1500" onkeyup="cantidadIngresada()" onkeypress="return onlynumber(event)">
									                         <em>(Requerido)</em>
																					 <hr>
								                      	</div>
																				<div class="col-12 col-lg-12">
																					<div class="row">
																						<div class="col-6 col-lg-8">
																							<h6>Cantidad Ingresada:</h6>
																						</div>
																						<div class="col-6 col-lg-4">
																							<h6 id="cantidadIngresada">$ 00.00</h6>
																						</div>
																						<div class="col-6 col-lg-8">
																							<h6>Total a pagar:</h6>
																						</div>
																						<div class="col-6 col-lg-4">
																							<h6 id="totalPagartext">$ 00.00</h6>
																						</div>
																					</div>
																				</div>
								                      </div>
																		</div>
																		<div class="col-4 col-lg-4">
																			<div class="row" style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em; padding:2vh">
											                  <div class="col-12 col-lg-12 text-center">
											                    <h6><b>Historial de Pagos</b></h6>
											                  </div>
											                  <div class="row">
											                    <div class="col-6 col-lg-6 text-center">
											                      <span><b>Monto</b></span>
											                    </div>
											                    <div class="col-6 col-lg-6 text-center">
											                      <span><b>Status</b></span>
											                    </div>
											                    <div class="col-12 col-lg-12 text-center">
											                      <div id="ContenedorHistorial" class="row"></div>
											                    </div>
											                  </div>
											                  <hr>
																				<div class="col-12 col-lg-12 text-center">
																					<span><b>Saldo: $</b></span>
																					<span id="Saldo"></span>
																				</div>
											                </div>
																		</div>
																		<div class="col-4 offset-4 col-lg-4 offset-lg-4" style="text-align:center">
																			<button  onclick="realizaPago()" type="button" id="RegistrarPago" class="btn btn-btnRegistrarPago">Registrar Pago</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
														</div>
													</div>
												</div>
											</div>

        </div>
      <?php include("footer.php"); ?>
      </div>
<script type="text/x-jsrender" id="btnGoOrderTemplate">
	${btnGoOrderSF(data)}
</script>
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
        <script src="vendors/barcode/JsBarcode.all.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script type="text/javascript" src="scripts/Doctor.js?V=1.1"></script>
  </body>
</html>
