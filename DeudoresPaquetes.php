<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
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
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
					<section>
					 <ol class="breadcrumb">
						 <li> <a class="titulo"> Paquetes sin pago completado </a> </li>
					 </ol>
				 </section>
          <div class="row">
            <div class="col-6 col-lg-6"  style="max-height: 80vh; overflow-y:scroll;text-align:cente;margin-top:4vh">
              <div class="contenedores">
								<h5>Doctores con Adeudos</h5>
								<h5 id="CantidadPDoctoresSinPagar"></h5>
                <div class="row">
                  <div class="table-responsive">
										<table id="TableDoctoresD" class="table table-hover">
	                    <thead>
	                      <tr>
	                        <th>DOCTOR</th>
	                        <th>VER DETALLE</th>
	                      </tr>
	                    </thead>
	                  </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-6" style="max-height: 80vh; overflow-y:scroll;text-align:cente;margin-top:4vh">
              <div class="contenedores">
								<h5>Paquetes Sin Pagar</h5>
								<h5 id="CantidadPaquetesSinPagar"></h5>
                <div class="row">
                  <div class="table-responsive">
										<table id="TablePaquetesD" class="table table-hover">
	                    <thead>
	                      <tr>
	                        <th>DOCTOR</th>
	                        <th>PAQUETE</th>
													<th>SERIE PAQUETE</th>
	                        <th>SALDO</th>
	                        <th>VER DETALLES</th>
	                      </tr>
	                    </thead>
	                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

				<div class="modal fade" id="ModalPaquetesDoctor" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
				  <div class="modal-dialog modal-dialog-centered" role="document">
				    <div class="modal-content" >
				      <div class="modal-header">
				        <h6 class="modal-title" id="TituloModalPaquetesDoctor"></h6>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body" style="max-height: 70vh; overflow-y:scroll">
								<div class="contenedores">
	                <div class="row">
	                  <div class="table-responsive">
											<table id="TablePaquetesDoctorSinP" class="table table-hover">
		                    <thead>
		                      <tr>
		                        <th>PAQUETE</th>
														<th>SERIE PAQUETE</th>
		                        <th>SALDO</th>
														<th>TOTAL PAGADO</th>
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
				<div class="modal fade" id="ModalPaquetesPagos" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content" >
							<div class="modal-header">
								<h6 class="modal-title" id="TituloPagosPaquete"></h6>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body" style="max-height: 70vh; overflow-y:scroll">
								<div class="contenedores">
									<div class="row">
										<div class="table-responsive">
											<table id="TablePagosPaquete" class="table table-hover">
												<thead>
													<tr>
														<th>PAQUETE</th>
														<th>SERIE PAGO</th>
														<th>MONTO</th>
														<th>SATUS PAGO</th>
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
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script src="scripts/DeudoresPaquetes.js" charset="utf-8"></script>
  </body>
</html>
