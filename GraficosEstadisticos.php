<?php
include("verifica.php");
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Estadisticas/Estadisticas.php");
$Estadisticas1 = new Estadisticas();
$FechaActual = $Estadisticas1->getFechaActual();
$fechaInicio = date('Y-m-d',strtotime("$FechaActual"." - 1 week"));

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8"> -->
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->

	<link rel="icon" href="production/images/favicon.ico" type="image/ico">
	<link rel="stylesheet" href="docs/css/bootstrap.min.css">
	<link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="vendors/nprogress/nprogress.css" rel="stylesheet">
	<link href="vendors/iCheck/skins/flat/green.css" rel="stylesheet">
	<link href="vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
	<link href="vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet">
	<!-- <link href="vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet"> -->
	<link href="vendors/toastr/toastr.min.css" rel="stylesheet">
	<!-- <link href="build/css/custom.min.css" rel="stylesheet"> -->
	<!-- <link href="build/css/custom.css" rel="stylesheet"> -->
	<link href="src/scss/styles.scss" rel="stylesheet">
	<link rel="stylesheet" href="librerias/morris/morris.css">
	<title>Dent Clinica Dental | Inicio </title>
	<style media="screen">
	.chartBox {
	width: 600px;
	height: auto;
}
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >

        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
				 <div class="contenedores">
            <div class="row">
							<div class="col-4 col-lg-4 text-left">
								<a href="index.php"> <button type="button" class="btn btn-outline-info"><i class="fa fa-arrow-left"></i> Regresar </button></a>
							</div>
              <div class="col-12 col-lg-4 offset-lg-4">
                <div class="row">
                  <div class="col-6 col-lg-6">
                    <input type="date" id="fechaInicio" value="<?php echo $fechaInicio ?>" class="form-control" style="background-color:#0006C0; color:white; font-size:20px !important;" onchange="loadGraficos()">
                  </div>
                  <div class="col-6 col-lg-6">
                    <input type="date" id="fechaFin" value="<?php echo $FechaActual ?>" class="form-control" style="background-color:#0006C0; color:white;  font-size:20px !important;" onchange="loadGraficos()">
                  </div>
                  <!-- <div class="col-2 col-lg-2">
                    <input type="text" name="" value="" class="form-control" disabled>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
					<div id="divGraficos">

			 		</div>

					<div class="modal" tabindex="-1" role="dialog" id="modalOrdenesMerma">
					  <div class="modal-dialog modal-lg" role="document">
					    <div class="modal-content ">
					      <div class="modal-header">
					        <h5 class="modal-title">Ordenes con Merma</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body">
									<div class="table-responsive">
										<table id="tableOrdenesM"class="table table-hover" style="color:black">
											<thead>
												<tr style="font-size:15px;">
													<th>SERIE</th>
													<th>DOCTOR</th>
													<th>PRODUCTO</th>
													<th>COLORIMETRO</th>
													<th>ENTREGA SOLICITADA</th>
													<th>PIEZAS</th>
												</tr>
											</thead>
											<tbody style="font-size:17px;">

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
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

		<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js" integrity="sha512-R/QOHLpV1Ggq22vfDAWYOaMd5RopHrJNMxi8/lJu8Oihwi4Ho4BRFeiMiCefn9rasajKjnx9/fTQ/xkWnkDACg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="docs/js/jquery.min.js"></script>
		<script src="docs/js/bootstrap.min.js"></script>
		<script src="https://unpkg.com/datatables.net@1.11.3/js/jquery.dataTables.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"></script>

		</script>
		<script type="text/javascript">
		$(document).ready(function(){
		loadGraficos();
	});

	function loadGraficos(){
	  var fechaInicio = $("#fechaInicio").val();
	  var fechaFin = $("#fechaFin").val();
	  $("#divGraficos").load(`includeGraficos.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
	}

	function getOrdenesMerma(){
		$("#modalOrdenesMerma").modal("toggle");
		var fechaInicio  = $("#fechaInicio").val();
		var fechaFin = $("#fechaFin").val();
		var datasend = {
			op : "getOrdenesMerma",
			fechaInicio :fechaInicio,
			fechaFin : fechaFin
		}
		var tableOrdenesM = $("#tableOrdenesM").dataTable({
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

			"destroy":true,
			"ajax":{
				"type":"POST",
				"url":"Backend/Estadisticas/App.php",
				"data":datasend,
				"success" : function(response){
					tableOrdenesM.fnClearTable();
					for (var i = 0; i < response.length; i++) {
						tableOrdenesM.fnAddData([
							response[i]["Serie"],
							response[i]["Doctor"],
							response[i]["Producto"],
							response[i]["Colorimetro"],
							response[i]["Fecha_entrega_solicitada"],
							response[i]["Piezas"]
						]);
					}
				},
				"complete" : function(){
						$.unblockUI();
					}
			}
		});
	}
		</script>
  </body>
</html>
