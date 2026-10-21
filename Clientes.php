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
            <li> <a class="titulo">LISTADO DE CLIENTES</a> </li>
          </ol>
         </section>
         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button type="button" class="btn btn-outline-success" onclick="AbrirModal('','','','','','');">
                 <i class="fa fa-plus"></i>
                 Nuevo Cliente</button>
             </div>
           </div>
          </div>
          <br>
          <div class="contenedores">
            <div class="table-responsive">
              <table class="table table-hover" id="tabla">
                <thead>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>Tipo de membresia</th>
                  <th>Estatus</th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>

               <!-- modal -->
        			 <div class="modal fade" id="ModalCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        			 	<div class="modal-dialog ">
        			 		<div class="modal-content ">
        			 			<div class="modal-header text-center">
        			 				<h5 class="modal-title" id='TituloModal'></h5>
        			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        			 					<span aria-hidden="true">&times;</span>
        			 				</button>
        			 			</div>
        			 			<div class="modal-body ">
        			 				<form id="formInserta" method="post" action="Backend/Usuarios/App.php">
        			 					<div class="form-group">
        			 						<input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
        			 						<input type="text" class="form-control" id="IdCliente" name="IdCliente" style="display:none;">
        			 						<input type="text" class="form-control" id="IdClienteMembresia" name="IdClienteMembresia" style="display:none;">
        			 						<input type="text" class="form-control" id="estatus" name="estatus" style="display:none;">
                          <div class="row">
                            <div class="col-12 col-lg-12" style="margin-top:10px;text-align:center;">
                              <h6>Nombre(s)</h6>
                              <input type="text" class="form-control" name="Nombre" id="Nombre" placeholder="Nombres del cliente" value="">
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
                              <h6>Apellido Paterno</h6>
                              <input type="text" class="form-control" name="ApellidoP" id="ApellidoP" placeholder="Apellido paterno del cliente" value="">
                            </div>
                            <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
                              <h6>Apellido Materno</h6>
                              <input type="text" class="form-control" name="ApellidoM" id="ApellidoM" placeholder="Apellido materno del cliente" value="">
                            </div>
                            <div class="col-6 col-lg-6" style="margin-top:10px;text-align:center;">
                              <h6>Correo electronico</h6>
                              <input type="text" class="form-control" name="Correo" id="Correo" placeholder="Correo electronico" value="">
                            </div>
                            <div class="col-6 col-lg-6" style="margin-top:10px;text-align:center;">
                              <h6>Telefono</h6>
                              <input type="number" class="form-control" name="Telefono" id="Telefono" placeholder="Telefono" value="">
                            </div>
                            <div class="col-12 col-lg-12" style="margin-top:10px;text-align:center; display:none;" id="divMembresia">
                              <h6>Tipo Membresia</h6>
                              <select class="select2" name="slcMembresias" id="slcMembresias" style="font-size:18px;">
                              </select>
                            </div>
                          </div>
													<br>
        			 					</div>
                      </form>
        			 			</div>
        			 			<div class="modal-footer">
        			 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        			 				<button type="button" class="btn btn-outline-success" id="btnguardar">Guardar</button>
        			 			</div>
        			 		</div>
        			 	</div>
        			 </div>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript" src="scripts/ListadoClientes.js"></script>
  </body>
</html>
