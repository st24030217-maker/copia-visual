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
               <button type="button" class="btn btn-info" name="button" onclick="window.location.href='DetalleDoctores.php'"> <i class="fa fa-arrow-left"></i> Regresar</button>
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
                        <div class="contenedoresNav text-center">
                          <div class="span">
                             Datos Generales
                          </div>
                          <br>
                          <div class="row" style="padding:10px;">
                            <div class="col-12 col-lg-12" style="margin-top:10px">
                              <h6>Nombre</h6>
                              <input type="text" class="form-control" name="nptNombre" id="nptNombre" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px">
                              <h6>Apellido Paterno</h6>
                              <input type="text" class="form-control" name="nptApellidoP" id="nptApellidoP" value=""disabled>
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px">
                              <h6>Apellido Materno</h6>
                              <input type="text" class="form-control" name="nptApellidoM" id="nptApellidoM" value=""disabled>
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px">
                              <h6>Email</h6>
                              <input type="text" class="form-control" name="nptEmail" id="nptEmail" value=""disabled>
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px">
                              <h6>Vendedor</h6>
                              <select class="form-control" name="slcVendedor" id="slcVendedor" disabled>

                              </select>
                            </div>
                            <div class="col-6 col-lg-6" style="margin-top:10px">
                              <h6>Activo</h6>
                              <label class='switch'>
										            <input type='checkbox' id='chkActivo' name="chkActivo"disabled>
										            <span class='slider round'></span>
										          </label>
                            </div>
                            <div class="col-6 col-lg-6" style="margin-top:10px">
                              <h6>Externo</h6>
                              <label class='switch'>
										            <input type='checkbox' id='chkExt' name="chkExt"disabled>
										            <span class='slider round'></span>
										          </label>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:10px">
                              <h6>Observacion</h6>
                              <textarea name="nptObservacion" id="nptObservacion" class="form-control" rows="4" cols="80" disabled></textarea>
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
                              <input type="text" class="form-control" name="nptClinica" id="nptClinica" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Telefono</h6>
                              <input type="number" class="form-control" name="nptTel" id="nptTel" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Celular</h6>
                              <input type="number" class="form-control" name="nptCel" id="nptCel" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:10px">
                              <h6>Dirección</h6>
                              <input type="text" class="form-control" name="nptDir" id="nptDir" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Contacto o Asistente</h6>
                              <input type="text" class="form-control" name="nptAsis" id="nptAsis" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Contacto Tel</h6>
                              <input type="text" class="form-control" name="nptTelSis" id="nptTelSis" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-4" style="margin-top:10px">
                              <h6>Contacto Mail</h6>
                              <input type="text" class="form-control" name="nptMailSis" id="nptMailSis" value="" disabled>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-facebook fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptF" id="nptF" value="" placeholder="Digite el usuario de Facebook (Opcional)" disabled>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-twitter fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptT" id="nptT" value="" placeholder="Digite el usuario de Twitter (Opcional)" disabled>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:12px"><br>
                              <div class="row">
                                <div class="col-3 col-lg-2">
                                  <i class="fab fa-instagram fa-3x"></i>
                                </div>
                                <div class="col-9 col-lg-10">
                                  <input type="text" style="border:none;border-bottom:1px solid lightgray" class="form-control" name="nptI" id="nptI" value="" placeholder="Digite el usuario de Instagram (Opcional)"disabled>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                              <table class="table table-hover" id="tablaOrdenesVend">
                                <thead>
                                  <th>Serie OT</th>
                                  <th>Entrega</th>
                                  <th>Estado</th>
                                  <th>Producto</th>
                                  <th>Paciente</th>
                                  <th>Piezas</th>
                                  <th>Pagado</th>
                                </thead>
                              </table>
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

														</div>
                          </div>
                          <br>
                          <div class="row" style="padding:10px;">
                            <div class="col-12 col-lg-12">
                              <table class="table table-hover" id="tablaPaquetesVend">
                                <thead>
                                  <th>Serie</th>
                                  <th>Paquete</th>
                                  <th>Piezas total</th>
                                  <th>Piezas solicitadas</th>
                                  <th>Disponibles</th>
                                  <th>Precio</th>
                                  <th>Registro</th>
                                  <th>Activado</th>
                                  <th>Terminado</th>
																	<th>Detalle de uso</th>
                                </thead>
                              </table>
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
                             <i class="fad fa-file-invoice-dollar"></i> Pagos Realizados
                          </div>
													<br>
													<div class="row" style="padding:10px;">
														<div class="col-12 col-lg-12 table-responsive">
															<table class="table table-hover" id="tablePagosDoctorVend">
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






        </div>
      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script src="vendors/barcode/JsBarcode.all.min.js"></script>
		<script type="text/javascript" src="scripts/Doctor.js">

		</script>
		<script type="text/javascript">
    $(document).ready(function(){
      getOrdenesTrabajoSolicitadasD();
      getpaquetesDrVend();
      GetPagosDoctoresVend();
    })
		 function abrirModalDoctPaq(){
			 $("#slctPaquete").val("");
			 $("#txtCantidad").val("");
			 $("#ModalPaqDoctor").modal("toggle");
		 }
     var tablaOrdenesVend = $('#tablaOrdenesVend').dataTable({
       "language": {
         "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
         "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
         "info": "PÁGINA _PAGE_ DE _PAGES_",
         "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
         "infoFiltered": "",
         "search": "BUSCAR"
       },
       "columnDefs": [{
         "className": "dt-center", "targets": "_all"
       }],
       "order": [],
       "bSort": false,
       "bPaginate":false,
       "bFilter": false,
       "bInfo":false,
     });
     function getOrdenesTrabajoSolicitadasD(){
       var idDoctor = $("#idDoc").val();
       var datasend = {
         op:"getOrdenesTrabajoSolicitadas",
         idDoctor:idDoctor
       }
       $.ajax({
         type:"POST",
         url:"Backend/DentLab/App.php",
         data:datasend,
         success:function(response){
           response = JSON.parse(response.trim());
           tablaOrdenesVend.fnClearTable();
           for (var i = 0; i < response.length; i++) {
             var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
             var Dbase64 = btoa(idDoctor);
             var LBbase64 = btoa("DetalleDoctor.php?d="+Dbase64);
             tablaOrdenesVend.fnAddData([
               response[i]["Serie"],
               response[i]["Fecha_entrega_solicitada"],
               response[i]["Estado"],
               response[i]["Producto"],
               response[i]["paciente"],
               response[i]["Piezas"],
               response[i]["Monto"],
             ])
           }
         },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
       })
     }

     function getpaquetesDrVend(){
       var idDoctor = $("#idDoc").val();
       var datasend = {
         op:"getpaquetesDr",
         idDoctor:idDoctor
       }
       var tablaPaquetes = $('#tablaPaquetesVend').dataTable({
         "language": {
           "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
           "zeroRecords": "NO HAY PAQUETES POR MOSTRAR",
           "info": "PÁGINA _PAGE_ DE _PAGES_",
           "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
           "infoFiltered": "",
           "search": "BUSCAR"
         },
         "columnDefs": [{
           "className": "dt-center", "targets": "_all"
         }],
         "order": [],
         "bSort": false,
         "bPaginate":false,
         "bFilter": false,
         "bInfo":false,

         "destroy":true,
         "ajax":{
           "type":"POST",
           "url":"Backend/DentLab/App.php",
           "data":datasend,
           "success" : function(response){
             if (response!=null) {
               tablaPaquetes.fnClearTable();
               for (var i = 0; i < response.length; i++) {
                 var prop = "";
                 if (response[i]["Terminado"] == 1) {
                   prop = "checked";
                 }
                 var OTbase64 = btoa(response[i]["Ordenes_trabajo_id"]);
                 tablaPaquetes.fnAddData([
                   response[i]["Serie"],
                   response[i]["paquete"],
                   response[i]["Pz_Total"],
                   response[i]["solicitadas"],
                   response[i]["CantidadDisponible"],
                   "$"+response[i]["Costo"],
                   response[i]["Registro"],
                   response[i]["Activado"] != null ? response[i]["Activado"] : "NO ASIGNADA",
                   `<label class='switch'>
                       <input type='checkbox' id='chkTerm${i}' ${prop} disabled>
                       <span class='slider round'></span>
                     </label>`,
                     `<button type='button' class='btn btn-outline-info btn-sm' onclick='DetalleUso("${response[i]["Doctores_paquete_id"]}")'><i class="fal fa-info-circle"></i></button>`
                 ])
               }
             }
           },
           "complete" : function(){
               $.unblockUI();
             }
         }
       });
     }

     var tablePagos = $('#tablePagosDoctorVend').dataTable({
       "language": {
         "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
         "zeroRecords": "NO HAY PAGOS POR MOSTRAR",
         "info": "PÁGINA _PAGE_ DE _PAGES_",
         "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
         "infoFiltered": "",
         "search": "BUSCAR"
       },
       "columnDefs": [{
         "className": "dt-center", "targets": "_all"
       }],
       "order": [],
       "bSort": false,
       "bPaginate":false,
       "bFilter": false,
       "bInfo":false,
     });


     function GetPagosDoctoresVend(){
       var idDoctor = $("#idDoc").val();
       var datasend = {
         op:"GetPagosDoctores",
         idDoctor:idDoctor
       }
       $.ajax({
         type:"POST",
         url:"Backend/DentLab/App.php",
         data:datasend,
         success:function(response){
           response = JSON.parse(response.trim());
           tablePagos.fnClearTable();
           for (var i = 0; i < response.length; i++) {
             tablePagos.fnAddData([
               response[i]["FolioPago"],
               response[i]["Fecha"],
               "Pago de orden: "+response[i]["Serie"],
               response[i]["Monto"]
             ]);
           }
         },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
       })
     }

		</script>
  </body>
</html>
