<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Productos/Productos.php");
$Prod = new Productos();
$Iva = $Prod->getConfiguracionIva();


$IdProd = $_GET["IdProd"] ?? "";
$IdOrdenTemp = $_GET["IdOrdenTemp"] ?? "";
$idVendedor = $_GET["idVendedor"] ?? "";
$IdDoctor = $_GET["IdDoctor"] ?? "";
// $Productos = new Productos();
// $Iva = $Productos->getConfiguracionIva();
// $CostoProductoIva = ($Precio_Base / 100) * $Iva;

require_once("Backend/Ordenes/Ordenes.php");
$COrdenes2 = new Ordenes();
$OTDetalle = $COrdenes2->getOrdenTemporalDetalle($IdOrdenTemp);
for ($i=0; $i < sizeof($OTDetalle) ; $i++) {
  $IdPaci = $OTDetalle[$i]["Paciente_id"];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<link href="librerias/select2/dist/css/select2.min.css" rel="stylesheet" />
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
    <style media="screen">

    div::-webkit-scrollbar {
    width: 5px;
    height: 8px;           /* width of the entire scrollbar */
    }

    div::-webkit-scrollbar-track {
    background: transparent;
    border: 0.5px solid #E3E3E3;
    border-radius:7px;     /* color of the tracking area */
    }

    div::-webkit-scrollbar-thumb {
    background-color: #50A4CF;    /* color of the scroll thumb */
    border-radius: 20px;        /* creates padding around scroll thumb */
    }
  </style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
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



         <input type="text" id="cantidadReq" value=""  style="display:none;">
         <input type="text" id="cantidadArchivosOrd" value=""  style="display:none;">
         <input type="text" id="IdVendedor" value="<?php echo $idVendedor ?>" style="display:none;">
				 <input type="hidden" id="CostoPorUnidad" value="">

				 <input type="text" id="IdReq1" value="" style="display:none;">
				 <input type="text" id="IdReq2" value="" style="display:none;">
				 <input type="text" id="IdReq3" value="" style="display:none;">
				 <input type="text" id="IdReq4" value="" style="display:none;">
				 <input type="text" id="IdReq5" value="" style="display:none;">
				 <input type="text" id="IdReq6" value="" style="display:none;">
				 <input type="text" id="IdReq7" value="" style="display:none;">
				 <input type="text" id="IdReq8" value="" style="display:none;">
				 <input type="text" id="IdReq9" value="" style="display:none;">


         <div class="row">
           <div class="col-12 col-lg-8 offset-lg-2">
              <div class="contenedores">
                <form class="" action="Backend/Ordenes/App.php" method="post" id="FormUpdateOrden">
                  <input type="hidden" name="idOrdenTemp" id="idOrdenTemp" value="<?php echo $IdOrdenTemp ?>"  style="display:none;">
                  <input type="hidden" name="idDoctor" id="idDoctor" value="<?php echo $IdDoctor ?>" style="display:none;">
                  <input type="hidden" name="op" value="insertaDatosOrdenTemp" style="display:none;">
                  <div class="row">
                    <div class="col-12 col-lg-12 text-center">
                      <h5>SELECCION DE PACIENTE</h5>
                      <br>
                    </div>
                    <div class="col-12 col-lg-12">
                      <div class="row">
                        <div class="col-10 col-lg-10">
                          <select class="js-example-basic-single" style="width: 100%;" name="slctPacientes" id="slctPacientes" onchange="insertaPacientefunction(this.value)" style="width:100% !important;">
                             <option value="" selected disabled> Selecciona Paciente </option>
                             <?php
                             require_once("Backend/Pacientes/Pacientes.php");
                             $Pacientes = new Pacientes();
                             $ListPacientesxD = $Pacientes->getPacientesXDoctor($IdDoctor);
                             for ($i=0; $i <sizeof($ListPacientesxD) ; $i++) {
                               $Paciente_IdD = $ListPacientesxD[$i]["Paciente_Id"];
                               $NombreD = $ListPacientesxD[$i]["Nombre"];
                               $ApellidosD = $ListPacientesxD[$i]["Apellidos"];

                               $slct = "";
                               if ($Paciente_IdD == $IdPaci) {
                                 $slct = "selected";
                               }
                               echo "
                               <option value='$Paciente_IdD' $slct> $NombreD $ApellidosD </option>

                               ";
                             }
                              ?>
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
                </form>
              </div>
           </div>
         </div>
         <br><br>
         <div class="row">
           <div class="col-12 col-lg-8 offset-lg-2">
               <div class="contenedores">
                 <div class="row">
                   <div class="col-12 col-lg-12">
                     <div class="row">
                       <div class="col-6 col-lg-6">
                         <h4 style="margin-left:15px;">Requisitos</h4>
                       </div>
                       <div class="col-6 col-lg-6">
                         <h4 style="margin-left:45px;">Status</h4>
                         <br><br>
                       </div>
                       <div class="" id="divincludeArchivosRequ">

                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           </div>
         </div>
         <br><br><br>
				 <div class="row">
					 <div class="col-12 col-lg-8 offset-lg-2">
 						<div class="contenedores">
 							<div class="content">
 								<form class="" action="Backend/Ordenes/App.php" method="post" id="FormUpdateOrdenAlinia">
 									<input type="text" name="idOrdenTempAl" value="<?php echo $IdOrdenTemp ?>" style="display:none;">
 									<input type="text" name="op" value="insertaDatosOrdenTempAlinia" style="display:none;">
 								<div class="row">
 									<div class="col-12 col-lg-12 text-center">
 										<h5>OBSERVACIONES</h5>
 										<textarea type="textarea" name="txtObservaciones" class="form-control" onblur="insertaDatosOrdenTempfunction('')"><?php echo $Observaciones ?></textarea>
										<!-- <textarea type="textarea" name="txtObservaciones" class="form-control" onblur="insertaDatosOrdenTempfunction('')"><?php echo $Observaciones ?></textarea> -->
									</div>
 								</div>
 							</form>
 							</div>
 						</div>
 					</div>
				 </div>
				 <br>
				 <div class="row">
					 <div class="col-12 col-lg-8 offset-lg-2">
  					 <div class="contenedores">
  						 <div class="row">
  							 <div class="col-8 col-lg-8">
									 <span>Metodos de Pago</span><br>
  								 <select class="form-control" name="slctMetodoPago" id="slctMetodoPago" required onchange="MetodosPagoOn(this.value)">
  									 <?php
  									 require_once("Backend/Configuracion/Configuracion.php");
  									 $Configuracion = new Configuracion();
  									 $ListMetodosPago = $Configuracion->getMetodoPago();
  									 for ($i=0; $i < sizeof($ListMetodosPago) ; $i++) {
  										 $id_Metodos_Pago = $ListMetodosPago[$i]["id_Metodos_Pago"];
  										 $Metodo = $ListMetodosPago[$i]["Metodo"];
											 if ($id_Metodos_Pago == "8" || $id_Metodos_Pago == "9" || $id_Metodos_Pago == "2" || $id_Metodos_Pago == "7") {
											 	continue;
											 }
  										 echo "
  										 <option value='$id_Metodos_Pago'>$Metodo</option>
  										 ";
  									 }
  										?>
  								 </select>
  							 </div>
								 <div class="col-4 col-lg-4" >
								 	<span>Cantidad de Piezas</span><br>
									<input type="number" id="cantidadPiezas" class="form-control" value="1" min="1" required style="text-align: center" onchange="updateCostoTotal(this.value)">
								 </div>
  						 </div>
  					 </div>
  				 </div>
				 </div>
				 <br>
         <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
            <div class="contenedores">
              <div class="row">
                  <div class="col-5 col-lg-5 text-right">
                    <h4>Pagar</h4>
                  </div>
                  <div class="col-5 col-lg-5">
                    <h4 id="precioTotal"></h4>
                  </div>
              </div>
            </div>
          </div>
          </div>
					<br><br>
					<div class="col-12 col-lg-4 offset-lg-4 text-center" >
						<br>
						<button type="button" class="btn btn-success" style="cursor:pointer;" onclick="generarOrdenAlinia('')">Generar Orden</button>
					</div>
					<br><br><br>

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
										 <input type="hidden" class="form-control" id="IdDoct" name="IdDoct" >
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
					<!-- Aqui va el Segundo Label  -->

							 </div>
							 <div class="modal-footer">
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="btnguardar" onclick="Doctorfunction('')">Guardar</button>
							 </div>
							 </form>
						 </div>
					 </div>
					</div>
					<br><br>
        </div>

      <?php include("footer.php"); ?>
      </div>
    </div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
		<?php include("scripts.php"); ?>
		<script src="scripts/OrdenesAlinia.js" charset="utf-8"></script>
  </body>
</html>
