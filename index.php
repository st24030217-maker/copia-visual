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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css"/>
	<style media="screen">

	.row-green {
		color: #fff !important;
		animation: parpadeo-verde 1s ease-in-out infinite alternate;
	}

	/* Definición de la animación en verde */
	@keyframes parpadeo-verde {
		from {
			background-color: #008000; /* Verde intenso */
		}
		to {
			background-color: #66cc66; /* Verde más claro */
		}
	}

	.row-green a {
		color: #ccffcc !important; /* verde claro que resalta sobre fondo verde */
	}

	.row-yellow {
		color: #fff !important;
		animation: parpadeo 1s ease-in-out infinite alternate;
	}

	/* Definición de la animación en rojo */
	@keyframes parpadeo {
		from {
			background-color: #ff0000; /* Rojo intenso */
		}
		to {
			background-color: #ff6666; /* Rojo más claro */
		}
	}

	.row-yellow a {
		color: #ffff66 !important; /* amarillo resalta mucho sobre rojo */
	}
	div::-webkit-scrollbar {
	width: 5px;
	height: 8px;           /* width of the entire scrollbar */
	}

	div::-webkit-scrollbar-track {
	background: transparent;
	/* border: 0.5px solid #40C1CA; */
	border-radius:7px;     /* color of the tracking area */
	}

	div::-webkit-scrollbar-thumb {
	background-color: #B6B6B6;    /* color of the scroll thumb */
	border-radius: 20px;        /* creates padding around scroll thumb */
	}
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
				 <input type="hidden" name="id_perfil" id="id_perfil" value="<?php echo $_COOKIE["id_perfil"] ?? ""; ?>">
				 <?php if (($_COOKIE["id_perfil"] ?? "") == "12" || ($_COOKIE["id_perfil"] ?? "") == "4"): ?>
					 <div class="contenedoresMenuIndex">
						 <div class="row">
						 	<div class="col-12 text-center col-lg-2 text-lg-left">
						 		<button type="button" class="btn btn-info w-100" name="button"  onclick="window.location.href='Calendario.php'"><i class="fas fa-calendar"></i> Calendario</button>
						 	</div>
						 	<!-- <div class="col-12 text-center col-lg-2 text-lg-left">
						 		<button type="button" class="btn btn-info w-100" name="button"><i class="fas fa-tooth"></i> Orden de trabajo</button>
						 	</div> -->
							<div class="col-12 text-center col-lg-3 text-lg-right">
								<button type="button" class="btn btn-info w-100" name="btn" onclick="OrdenesCanceladas();">
									<i class="fa fa-ban"></i> Ordenes canceladas
									<span class="badge badge-light" id="NumberOrdenCanceladas"></span>
								</button>
						 	</div>
							<div class="col-12 text-center col-lg-3 text-lg-right">
								<button type="button" class="btn btn-info w-100" name="button" onclick="OrdenesPendientes();">
									 <i class='fa fa-bell'></i> Ordenes Pendientes de pago
									<span class="badge badge-light" id="NumberOrden"></span>
								</button>
						 	</div>
						 	<div class="col-12 text-center col-lg-2 text-lg-left">
								<div class="row">
									<div class="col-12 col-lg-12">
								 		<label id="HoraActual" style="color:lightgray;"></label>
									</div>
								</div>
						 	</div>
							<div class="col-12 text-center col-lg-2 text-lg-right">
								<button type="button" class="btn btn-info" name="button" onclick="refresh()"><i class="fa fa-sync"></i></button>
						 		<button type="button" class="btn btn-info" name="button" onclick="window.location.href='Vendedor.php'"><i class="fal fa-plus"></i></button>
						 	</div>
						 </div>
					 </div>
					 <br>
					 <div class="row">
  				 	<div class="col-12 col-lg-3">
							<div class="contenedoresIndex">
								<div class="span">
									<i class="fa fa-video-camera"></i> Escaneo
								</div>
								<br>
								<div class="row">
									<div class="col-12 col-lg-12 text-center" id="spinner" style="display:none;margin-top:10vh;">
										<div class="spinner-border text-info" role="status" >
										  <h6 class="sr-only">Loading...</h6>
										</div>
										<br>
										<label>Actualizando</label>
									</div>
								</div>
								<div class="table-responsive" id="tableScanR" style="height: 40vh;">

								</div>
							</div>
  				 	</div>
  				 	<div class="col-12 col-lg-3">
							<div class="contenedoresIndex">
								<div class="span">
									<i class="fa fa-desktop"></i> Diseño
								</div>
								<br>
								<div class="row">
									<div class="col-12 col-lg-12 text-center" id="spinner2" style="display:none;margin-top:10vh;">
										<div class="spinner-border text-info" role="status" >
										  <h6 class="sr-only">Loading...</h6>
										</div>
										<br>
										<label>Actualizando</label>
									</div>
								</div>
								<div class="table-responsive" id="tableDesign" style="height: 40vh;">

								</div>
							</div>
  				 	</div>
  				 	<div class="col-12 col-lg-3">
							<div class="contenedoresIndex">
								<div class="span">
									<i class="fas fa-tooth"></i> Fabricación
								</div>
								<br>
								<div class="row">
									<div class="col-12 col-lg-12 text-center" id="spinner3" style="display:none;margin-top:10vh;">
										<div class="spinner-border text-info" role="status" >
										  <h6 class="sr-only">Loading...</h6>
										</div>
										<br>
										<label>Actualizando</label>
									</div>
								</div>
								<div class="table-responsive" id="tableFactory" style="height: 40vh;">

								</div>
							</div>
  				 	</div>
  				 	<div class="col-12 col-lg-3">
							<div class="contenedoresIndex">
								<div class="span">
									<i class="fa fa-truck fa-flip-horizontal"></i> Entrega
								</div>
								<br>
								<div class="row">
									<div class="col-12 col-lg-12 text-center" id="spinner4" style="display:none;margin-top:10vh;">
										<div class="spinner-border text-info" role="status" >
										  <h6 class="sr-only">Loading...</h6>
										</div>
										<br>
										<label>Actualizando</label>
									</div>
								</div>
								<div class="table-responsive" id="tableDelivery" style="height: 40vh;">

								</div>
							</div>
  				 	</div>
  				 </div>
					 <br>
					 <div class="contenedoresIndex" style="padding:10px;">
						 <div class="row">
							<div class="col-10 col-lg-10 offset-lg-1">
								<input  type="text" class="form-control text-center" style="border-radius:5px" placeholder="Introduzca un dato exacto de la orden a buscar" name="nptBuscar" id="nptBuscar" value="">
							</div>
							<div class="col-1 col-lg-1">
								<button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
							</div>
						</div>
						 <!-- <div class="row">
						 	<div class="col-12 col-lg-6 offset-lg-3">
								<div class='inner-addon right-addon'>
		              <div id='Icono' class='icono-inp'>
		                <i class="fa fa-search" style="color:#000000;"></i>
		              </div>
						 			<input type="text" class="form-control text-center" onkeyup="Busqueda();"  style="border-radius:5px" placeholder="Introduzca algún dato de la orden a buscar" name="nptBuscar" id="nptBuscar" value="">
								</div>
							</div>
						 </div> -->
						 <div class="row">
							 <div class="col-12 col-lg-12 text-center" id="spinner5" style="display:none;margin-top:15vh;">
								 <div class="spinner-border text-info" role="status" >
									 <h6 class="sr-only">Loading...</h6>
								 </div>
								 <br>
								 <label>Actualizando</label>
							 </div>
						 </div>
						 <section>
							 	<div id="data-container"></div>
			 			 		<div id="pagination-container" class="paginationjs-theme-blue" style="width:100%"></div>
						 </section>
						 <div class="table-responsive" id="tableOrdenesGral" style="height: 43vh;">

						 </div>
					 </div>

					 <div class="modal fade" id="modalCanceladas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	 				 	<div class="modal-dialog  modal-md">
	 					 <div class="modal-content ">
							 <div class=" text-center">
	 							 <br>
								 <div class="row">
								 	<div class="col-8 col-lg-8 offset-2">
								 		<h4 class="modal-title" style="color:black;">Ordenes canceladas</h4>
								 	</div>
								 	<div class="col-2 col-lg-2">
										<button type="button" class="close" data-dismiss="modal">
	 			              <span >&times;</span>
	 			           </button>
								 	</div>
								 </div>
	 						 </div>
	 						 <div class="modal-body ">
	 								 <div class="form-group">
	 									 <div class="table-responsive">
											 <table class="table table-hover text-center" id="tableCancel">
  	 									 	<thead>
													<th>Orden</th>
  	 									 		<th>Responsable</th>
  	 									 		<th>Comentario</th>
  	 									 	</thead>
  	 									 </table>
	 									 </div>
	 								 </div>
	 						 </div>
	 					 </div>
	 				 </div>
	 				</div>
					<div class="modal fade" id="modalPendienteP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	 				 	<div class="modal-dialog  modal-md">
	 					 <div class="modal-content ">
							 <div class=" text-center">
	 							 <br>
								 <div class="row">
								 	<div class="col-8 col-lg-8 offset-2">
								 		<h4 class="modal-title" style="color:black;">Ordenes pendientes de pago</h4>
								 	</div>
								 	<div class="col-2 col-lg-2">
										<button type="button" class="close" data-dismiss="modal">
	 			              <span >&times;</span>
	 			           </button>
								 	</div>
								 </div>
	 						 </div>
	 						 <div class="modal-body ">
	 							 <form id="FormAgendar" method="post" action="Backend/DentLab/App.php">
	 								 <div class="form-group">
	 									 <div class="table-responsive">
											 <table class="table table-hover text-center" id="tableOrdenesP">
  	 									 	<thead>
													<th>Orden</th>
  	 									 		<th>Doctor</th>
  	 									 		<th>Paciente</th>
  	 									 		<th></th>
  	 									 	</thead>
  	 									 </table>
	 									 </div>
	 								 </div>
	 							 </form>
	 						 </div>
	 					 </div>
	 				 </div>
	 				</div>
				 <?php endif; ?>
				 <?php
					if (($_COOKIE["id_perfil"] ?? "") == "10") {
					    ?>
							<section>
		            <ol class="breadcrumb">
		              <li> <a class="titulo"> Listado de paquetes activos por doctor </a> </li>
		            </ol>
		         	</section>
							<div class="row">
								<div class="e-card">
									<div class="e-card-header">
										<div class="e-card-header-caption">
											<div class="e-card-header-title">
 												Listado de paquetes disponibles por doctor
											</div>
										</div>
										<hr>
									</div>
									<div class="e-card-header-content">
										<div id="tPackagesDoctors"></div>
									</div>
								</div>
							</div>
					    <?php
					}
					?>
        </div>
      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<?php
			if (($_COOKIE["id_perfil"] ?? "") == "12" || ($_COOKIE["id_perfil"] ?? "") == "4") {
				echo "
				<script type='text/javascript' src='scripts/Index.js?V=1.0'></script>
				<script src='librerias/pagination.js'></script>";
			} elseif (($_COOKIE["id_perfil"] ?? "") == "10") {
				echo "
				<script type='text/javascript' src='scripts/Index/paquetes.js'></script>";
			}
		 ?>
  </body>
</html>
