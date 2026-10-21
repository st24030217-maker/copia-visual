<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$IdDoctor = $_GET["IdDoctor"] ?? "";
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
					<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
 					 <div class="modal-dialog">
 						 <div class="modal-content backtheme">
 							 <div class="modal-body">
 								 <div class="progress">
 								 <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
 							 </div>
 							 <br>
 							 <div class="row text-center">
 								 <div class="col-12">
 									 <span style="color:#212121 !important;" id='tituloCargando'>Procesando...</span>
 								 </div>
 							 </div>
 							 </div>
 						 </div>
 					 </div>
 				 </div>
					<section>
					 <ol class="breadcrumb">
						 <li><a class="titulo" id="tituloPagina"></a></li>
						 </ol>
					 </section>
          <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3">
              <div class="contenedores" style="margin-top:2vh;min-height;auto;max-height:30vh">
                <div class="row">
                  <div class="col-12 col-lg-12 text-center">
                    <h5>SELECCION DE PACIENTE</h5>
                    <br>
                  </div>
                  <div class="col-12 col-lg-12">
                    <div class="row">
                      <div class="col-10 col-lg-10">
                        <select class="js-example-basic-single" style="width: 100%;" name="slctPacientes" id="slctPacientes" onchange="insertaPacientefunction(this.value)" style="width:100% !important;">
                         </select>
                      </div>
                      <div class="col-2 col-lg-2" onclick="abrirMmodalNewPaciente('')">
                        <a href="#" data-menu="menu-newPaciente" >
                            <i class="fa fa-plus color-green-dark" style='margin-top:12px;'></i>
                            <span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 offset-lg-3">
              <div class="contenedores" style="margin-top:3vh;min-height:auto;max-height:30vh">
                <div class="row" >
                 <div class="col-12 col-lg-12"  style="padding:5vh">
                   <form class="" action="Backend/Ordenes/App.php" method="post" id="FormUpdateOrden">
                    <input type="hidden" name="op" value="insertaDatosOrdenTemp">
                    <div class="row">
                      <div class="col-12 col-lg-12 text-center">
                        <h5>OBSERVACIONES</h5>
                        <textarea type="textarea" name="txtObservaciones" id="txtObservaciones" class="form-control" onkeyup="insertaDatosOrdenTempfunction('')"></textarea>
                      </div>
                    </div>
                 </form>
                 </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 offset-lg-3" style="margin-top:3vh">
              <div class="contenedores">
                <div class="row">
                  <div class="col-12 col-lg-12">
                    <select class="form-control" name="slctMetodoPago" id="slctMetodoPago" required onchange="MetodosPagoOn(this.value)">
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 offset-lg-3" style="margin-top:2vh">
              <div class="contenedores">
                <div class="row">
                  <div class="col-5 col-lg-5 text-right">
                    <h4>Pagar</h4>
                  </div>
                  <div class="col-5 col-lg-5">
                    <h4 id="totalPagar"></h4>
                  </div>
                </div>
              </div>
							<div class="row">
								<div class="col-12 col-lg-4 offset-lg-4 text-center" >
									<br>
									<button type="button" class="btn btn-success" style="cursor:pointer;" onclick="generarOrdenGuarda('')">Generar Orden</button>
								</div>
							</div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="ModalUsuarios" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content ">
             <div class="modal-header ">
               <h5 class="modal-title" id='TituloModal'> Nuevo Paciente </h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body ">
               <form id="formInsertaPaciente" method="post" action="Backend/Pacientes/App.php">
                 <div class="form-group">
                   <input type="hidden" class="form-control" id="op" name="op" value="addPacientesXDoctor">
                   <input type="hidden" class="form-control" id="IdDoct" name="IdDoct" value="<?php echo $IdDoctor ?>" >
                   <div class="row">
                     <div class="col-12 col-lg-6 text-center">
                       <span>Nombre(s)</span>
                       <br>
                       <input type="text" name="txtNombre" id="txtNombre" class="form-control" required onkeydown="onlytextInp(event)">
                     </div>
                     <div class="col-12 col-lg-6 text-center">
                       <span>Apellidos</span>
                       <br>
                       <input type="text" name="txtApellidos"  id="txtApellidos" class="form-control" required onkeydown="onlytextInp(event)">
                       <br><br>
                     </div>
                     <div class="col-12 col-lg-6 text-center">
                       <span>Celular</span>
                       <br>
                       <input type="text" name="txtCelular"  id="txtCelular" class="form-control">
                     </div>
                     <div class="col-12 col-lg-6 text-center">
                       <span>Email</span>
                       <input type="email" name="txtEmail" id="txtEmail" class="form-control" >
                       <br>
                     </div>
                   </div>
                 </div>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
               <button type="button" class="btn btn-primary" id="btnguardar" onclick="Doctorfunction('')">Guardar</button>
             </div>
             </form>
           </div>
         </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <script src="scripts/OrdenGuardas.js" charset="utf-8"></script>
  </body>
</html>
