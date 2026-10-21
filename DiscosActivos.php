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
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
           <ol class="breadcrumb">
             <li> <a class="titulo"> Discos Activos </a> </li>
           </ol>
         </section>
         <div class="contenedores">
           <div class="row">
						 <div class="col-12 col-lg-4">
						 	<input type="date" class="form-control"  id="FechaInicio" onchange="onchangeFiltro();">
						 </div>
						 <div class="col-12 col-lg-4">
						 	<input type="date" class="form-control" id="FechaTermino" onchange="onchangeFiltro();">
						 </div>
						 <div class="col-6 col-lg-4">
						 	<span style="font-size:20px">Discos Activos</span><br>
							<span id="DiscosActivos" style="font-size:25px"></span>
						 </div>
           </div>
         </div>
				 <hr>
         <div class="e-card">
         	<div class="e-card-content">
						<div class="col-s12" style="margin-top: 15px;">
							<div id="tableDisk"></div>
						</div>
         	</div>
         </div>
        </div>

				<div class="modal fade" id="modalInfo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog ">
					<div class="modal-content ">
						<div class="modal-header ">
							<h5 class="modal-title" id='TituloModal'>Ordenes Asignadas al Disco</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="row">
							<div class="col-12">
								<div id="includeInfo">

								</div>
							</div>
							</div>
						</div>
					<div class="modal-footer">
				</div>
			 </div>
		 </div>
		</div>

		<div class="modal fade" id="modalAsignar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog ">
				<div class="modal-content ">
					<div class="modal-header ">
							<h5 class="modal-title" id='TituloModal'>Asignar Orden</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
					 </div>
						<div class="modal-body">
							<div class="row">
							<div class="col-12">
								<input id="NumOrden" type="text" class="form-control" value="" placeholder="No. Orden">
							</div>
							<div class="col-12">
								<br>
								<button type="button" class="btn btn-success w-100" name="button" onclick="AsignaOrden()">Asignar</button>
							</div>
							</div>
						</div>
					<div class="modal-footer">
				</div>
			 </div>
		 </div>
		</div>

      <?php include("footer.php"); ?>
      </div>
    </div>
		<script type="text/x-jsrender" id="viewDetailTemplate">
			${viewDetailSF(data)}
		</script>
		<script type="text/x-jsrender" id="btnAddToOrderTemplate">
			${btnAddToOrderSF(data)}
		</script>
		<script type="text/x-jsrender" id="btnEndDiskTemplate">
			${btnEndDiskSF(data)}
		</script>
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
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="scripts/Discos/DiscosActivos.js" charset="utf-8"></script>
  </body>
</html>
