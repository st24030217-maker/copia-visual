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
	<style media="screen">
  .inner-addon {
    position: relative;
  }
  .inner-addon .icono-inp {
    position: absolute;
    padding: 10px;
  }
  .right-addon .icono-inp {
    right: 0px;
  }
  .right-addon input {
    padding-right: 30px;
  }
  .chevron:after {
    font-family: "Glyphicons Halflings";
    content: "\e113";
    float: center;
    margin-left: 5px;
    color:#546781;
  }
  .chevron.collapsed:after {
    content: "\e114";
    float: center;
    margin-left: 5px;
    color:#546781;
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
            <li> <a class="titulo">REALIZAR VENTA</a> </li>
          </ol>
         </section>
          <div class="contenedorDos">
						<div class="row">
							<div class="col-12 col-lg-10 offset-lg-1">
								<select id="slcClientes" class="form-control select2" onchange="getInformacion()" style="text-align:center;">
									<option>-- SELECCIONE UN CLIENTE --</option>

								</select>
							</div>
						</div>
          </div>
					<br>
					<div class="contenedorDos">
						<h4>Informacion del cliente:</h4>
						<div class="row">
							<div class="col-12 col-lg-8 text-left">
								<h5 id="Nom"></h5>
								<h5 id="Mem"></h5>
								<h5 id="Correo"></h5>
								<h5 id="Tele"></h5>
								<input type="text" id="nptIdMem" name="nptIdMem" style="display:none;">
							</div>
							<div class="col-12 col-lg-4 text-right" id="divButto" style="display:none;">
								<h5 id="Punt"></h5>
								<button type="button" class="btn btn-outline-success" onclick="AbrirModal()"><i class="fa fa-mouse-pointer"></i> Cargar Productos</button>
							</div>
						</div>
					</div>
					<br>
					<div class="contenedorDos" style="display:none;" id="compT">
						<div id="divtablaTemporal">
							<div class="row contenedorDos table-responsive" style="width: 100%; height: 60vh; overflow-y: scroll;">
							 <div class="col-12 col-lg-8 offset-lg-2">
								 <table class="table table-borderless" id="tablaTemporal" style="font-size:18px;">
									<thead >
										<th>Descripción</th>
										<th class="text-left">Precio</th>
										<th></th>
									</thead>
									<tbody class="text-left">

									</tbody>
								</table>
							 </div>
						 </div>
						 <button type="button" class="btn btn-success" onclick="getVentaTemporal();">Finalizar compra</button>
						</div>
						<div id="Finaliza">
							<div id="divProductos">

							</div>
							<br>
							<div id="FormaPago" style="display:none;">
								<h4>Formas de pago</h4>
							  <div class="row">
							  	<div class="col-12 col-lg-9 offset-lg-2">
										<div id="Formas">

										</div>
							  	</div>
							  </div>
								<input type="text" name="nptFormaP" id="nptFormaP" style="display:none;">
								<button type="button" class="btn btn-success" onclick="Atras();">Regresar</button>
								<button type="button" class="btn btn-success">Pagar</button>
							</div>
						</div>
						<br>
					</div>
					<br><br>
        </div>
				<div class="modal fade" id="ModalProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
				 <div class="modal-dialog modal-lg">
					 <div class="modal-content ">
						 <div class=" text-center">
							 <br>
							 <h4 class="modal-title" id='TituloModal'>Selección de productos</h4>
							 <hr>
						 </div>
						 <div class="modal-body ">
							 <form id="formInserta" method="post" action="Backend/Ventas/App.php">
								 <div class="form-group">
									 <input type="text" class="form-control" id="op" name="op"  style="display:none;" value="InsertVentTemp">
									 <input type="text" class="form-control" id="idCliente" name="idCliente" style="display:none;" >
									 <input type="text" class="form-control" id="idMembresia" name="idMembresia" style="display:none;" >
									 <div class="row">
										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
											 <div class="contenedorDos table-responsive" style="width: 100%; height: 60vh; overflow-y: scroll;">
							 					<table class="table table-hover" id="tablaProductos">
							 						<thead>
							 							<th>Descripción</th>
							 							<th>Tipo</th>
							 							<th>Precio</th>
							 							<th></th>
							 						</thead>
							 						<tbody>

							 						</tbody>
							 					</table>
							 				</div>
										 </div>
									 </div>
									 <br>
								 </div>
							 </form>
						 </div>
						 <div class="modal-footer">
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar compra</button>
							 <button type="button" class="btn btn-outline-success" id="btnguardar" onclick="GetTemporal();">Ver cesta</button>
						 </div>
					 </div>
				 </div>
				</div>

      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/RealizarVentas.js"></script>
  </body>
</html>
