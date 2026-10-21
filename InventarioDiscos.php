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
	<!-- CSS -->
	<link rel="stylesheet" href="vendors/alertify/css/alertify.min.css" />
	<!-- Default theme -->
	<link rel="stylesheet" href="vendors/alertify/css/themes/default.min.css" />
	<!-- Semantic UI theme -->
	<link rel="stylesheet" href="alertify/css/themes/semantic.min.css" />
	<!-- Bootstrap theme -->
	<link rel="stylesheet" href="vendors/alertify/css/themes/bootstrap.min.css" />
	<link href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" rel="stylesheet"/>

	<title>Dent Clinica Dental | Inicio </title>
	<style media="screen">
		.search-container {
			display: flex;
			align-items: center;
			border-radius: 5px;
			overflow: hidden;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			background-color: #fff;
		}

		.search-input {
			border: 1px solid #ccc;
			border-radius: 5px 0 0 5px;
			padding: 10px;
			font-size: 16px;
			flex: 1;
			outline: none;
			transition: border-color 0.3s;
		}

		.search-input:focus {
			border-color: #007bff;
		}

		#downloadLink:hover{
		color:#fff;
		}
		#downloadLink{
			color:#1FC447;
			width: 100%;
		}
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">

         <!-- CONTENIDO PAGINA -->
         <section>
           <ol class="breadcrumb">
             <li> <a class="titulo"> Inventario de Discos </a> </li>
           </ol>
         </section>
				 <div class="row">
					 <div class="col-12 offset-lg-8 col-lg-4 text-right">
						 <button type="button" class="btn btn-outline-info" onclick="getPermisosVerDiscosTerminados()"> <i class="fa fa-list"></i> Discos Terminados</button>
					 </div>
				 </div>
				 <div class="contenedores">
				 	<div class="row">
						<div class="col-12 col-lg-12">
							<div class="row">
								<div class="col-12 col-lg-12">
									<div class="table-responsive">
										<table class="table table-hover">
											<thead class="thead-dark">
												<tr>
													<th colspan="12">Datos Globales.</th>
												</tr>
												<thead>
													<tr>
														<th>Cantidad de Discos Registrados.</th>
														<th>Cantidad de Piezas Global.</th>
														<th>Cantidad de Piezas Utilizadas Global.</th>
														<th>Cantidad de Piezas restantes Global.</th>
														<th>% Utilizado</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td id="CantidadDiscosReg"></td>
														<td id="PiezasTotalGlobal"></td>
														<td id="PiezasGlobalUtilizadas"></td>
														<td id="GlobalRestante"></td>
														<td id="PorcentUtilizado"></td>
													</tr>
												</tbody>
											</thead>
										</table>
									</div>
									<div class="table-responsive">
										<table class="table table-hover">
											<thead class="thead-dark">
												<tr>
													<th colspan="12">Datos de discos por filtro.</th>
												</tr>
											</thead>
											<thead class="">
												<tr>
													<th>Discos Activos</th>
													<th>Discos Vendidos</th>
													<th>Discos Usados</th>
													<th>Discos en Almacen</th>
													<th>Discos Terminados</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td id="DiscosActivos"></td>
													<td id="DiscosVendidos"></td>
													<td id="DiscosUsados"></td>
													<td id="DiscosAlmacen"></td>
													<td id="DiscosTerminados"></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="col-12 col-lg-12">
									<div class="row" id="card_filterDateEnd">
										<div class="col-12">
											<div class="row">
												<div class="col-12 col-lg-12">
													<h6>Rango de Fechas: Discos Terminados</h6>
												</div>
												<div class="col-4 col-lg-6">
													<span>Rango de Fecha Inicial</span>
													<input type="date" id="InpFechaInicial" class="form-control">
												</div>
												<div class="col-4 col-lg-6">
													<span>Rango de Fecha Final</span>
													<input type="date" id="InpFechaFinal" class="form-control">
												</div>
											</div>
											<hr>
										</div>
									</div>
			         				<div class="card shadow-sm">
    <div class="card-body">
        <div class="row g-3 align-items-end">
            <div class="col-12 col-lg-9">
				<div class="row">
					<div class="col-12 col-md-6 col-lg-3">
						<label for="sel_status" class="form-label small fw-bold">Estatus</label>
						<select id="sel_status" class="form-control"></select>
					</div>
					<!-- <div class="col-12 col-md-6 col-lg-3" id="card_filteReasonsLeaving" style="display: none;">
						<label for="sel_reasonLeaving" class="form-label small fw-bold">Razón de Salida</label>
						<select id="sel_reasonLeaving" class="form-control"></select>
					</div> -->
					<div class="col-12 col-md-4 col-lg-3">
						<label for="sel_brands" class="form-label small fw-bold">Marca</label>
						<select id="sel_brands" class="form-control"></select>
					</div>
					<div class="col-12 col-md-4 col-lg-3">
						<label for="sel_colors" class="form-label small fw-bold">Color</label>
						<select id="sel_colors" class="form-control"></select>
					</div>
					<div class="col-12 col-md-4 col-lg-3">
						<label for="sel_size" class="form-label small fw-bold">Tamaño</label>
						<select id="sel_size" class="form-control"></select>
					</div>
				</div>
			</div>

            <div class="col-12 col-lg-3">
				<div class="d-flex gap-2">

					<button type="button" class="btn btn-primary w-100" id="btn_filter">
						<i class="fas fa-filter me-2"></i> Filtrar
					</button>

					<button type="button" class="btn btn-outline-danger w-100" id="btn_deletefilter">
						<i class="fas fa-trash-alt me-2"></i> Limpiar
					</button>

					<a id="downloadLink" class="btn btn-outline-success d-flex align-items-center justify-content-center px-3">
						<i class="fas fa-file-excel"></i>
					</a>

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
         <hr>
         <div class="contenedores">
					 <div class="row">

					 	<div class="col-12 col-lg-12">
							<div class="e-card">
								<div class="e-card-header">
									<div class="e-card-header-caption">
										<div class="e-card-header-title">
											BUSCADOR
										</div>
									</div>
								</div>
								<div class="e-card-content">
									<div class="search-container">
										<input id="searchTerm" type="text" class="search-input" placeholder="Ingrese un número del disco a buscar..." style="width:100%;text-align:center"> </input>
									</div>
								</div>
							</div>
							<hr>
					 	</div>
					 </div>
           <!-- <div id="divIncludeTablaInventarioDiscos">

           </div> -->
					 <div id="tableIntentary"></div>
					 <div id="pagination"></div>
         </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>

		<div class="col-md-12" id="etiquetabar" style="display:none;">
			<div id='container' style='page-break-before: always'>
			<div name='txtCont'>
			</div>
			<div class='col-md-12'>
				<svg id='codProducto'>

				</svg>
			</div>
			</div>
    </div>
		<div  id="ModalDetalleDiscos" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLongTitle">Detalle de Uso</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
                <div class="row">
                    <div class="col-12 col-lg-12" style="text.align:center">
                        <h5 id="h5DiscosUtilizados"></h5>
                    </div>
                </div>
						<div class="table-response">
							<table class="table table-hover text-center" id="TableDetalleDiscos">
								<thead>
									<th>Disco</th>
									<th>Orden</th>
									<th>Cantidad</th>
								</thead>
								<tbody>

								</tbody>
							</table>
						</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div style="display:none;">
			<div class="row" id="ContenidoDiscosTerminados">
				<div class="col-12 col-lg-12">
					<div class="row" style="padding:2vh;margin-top:3vh;box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
						<div class="col-12 col-lg-4">
							<select class="form-control" id="slctMarcaM" name="slctMarcaM" onchange="getDiscosTerminados()">
								<option value=""> Listado de Marcas </option>
							</select>
						</div>
						<div class="col-12 col-lg-4">
						 <select class="form-control" name="slctColoresM" id="slctColoresM" onchange="getDiscosTerminados()">
							 <option value=""> Listado de Colores </option>
						 </select>
						</div>
						<div class="col-12 col-lg-4">
							<select class="form-control" name="txtLong"  id="txtLong" onchange="getDiscosTerminados()">
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
						 </select>
						</div>
					</div>
				</div>
				<div class="table-responsive" style="padding:2vh;margin-top:3vh;box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
					<table class="table table-hover table-sm" id="tableDiscosTerminados" style="text-align: center;height:80vh;overflow-y:scroll;">
						<thead class="thead-dark" style="position:sticky">
							<tr>
								<th>Codigo</th>
								<th>Marca</th>
								<th>Colorimetro</th>
								<th>Tamaño</th>
								<th>Fecha Finalizado</th>
								<th>Piezas Utilizadas</th>
								<th>Piezas Restantes</th>
								<th>% Utilizado</th>
								<th>Activar Disco</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
		<script type="text/x-jsrender" id="porcentDiskTemplate">
			${porcentDiskSF(data)}
		</script>
		<script id="annotation-template" type="text/x-template">
			<div id='templateWrap'>
				<div class='des'>
					<!-- <h5 style="color:#324248">Avance</h5> -->
					<h4 style="color:#324248"><b>${pointers[0].currentValue}%</b></h4>
				</div>
			</div>
		</script>
		<script type="text/x-jsrender" id="btn_barCodeTemplate">
			${btn_barCodeSF(data)}
		</script>
		<script type="text/x-jsrender" id="btn_viewDetailTemplate">
			${btn_viewDetaillSF(data)}
		</script>
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
		<script src='librerias/pagination.js'></script>";
		<script src="vendors/barcode/JsBarcode.all.min.js"></script>
		<script src="vendors/alertify/alertify.min.js"></script>
		<script src="scripts/Discos/InventarioDiscos.js" charset="utf-8"></script>
  </body>
</html>
