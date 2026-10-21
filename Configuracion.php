<?php
if (!isset($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off') {
    $redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header("Location: $redirect_url");
    exit();
}
require_once("Backend/Configuracion/Configuracion.php");

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include("estilos.php"); ?>
    <link href="librerias/tabulator/dist/css/tabulator.min.css" rel="stylesheet">
    <link href="librerias/tabulator/dist/css/tabulator_materialize.min.css" rel="stylesheet">
    <script type="text/javascript" src="librerias/tabulator/dist/js/tabulator.min.js"></script>
    <title>Dent Clinica Dental | Inicio </title>
</head>

<body class="nav-md">
    <div class="container body">
        <?php include("menus.php"); ?>
        <div class="right_col" role="main">
            <!-- CONTENIDO PAGINA -->

            <section>
                <ol class="breadcrumb">
                    <li><a class="titulo"> Configuración </a></li>
                </ol>
            </section>
            <div class="container">
                <div class="row" id="contenidoConfiguracion" style="padding:2vh">
                </div>
                <div class="row">
                  <div class="col-12 col-lg-4">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-content">
                            <div class="row">
                              <div class="col-12">
                                <h6 style="margin-top:2vh; margin-left:2vh; margin-right:2vh;"><b>Nota:</b> En este apartado se activan y desactivan los municipios en las que los doctores pueden tener cobertura,</h6>
                                <div id="tCityDisp"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-8">
                    <div class="row">
                      <div class="col-12 col-lg-6">
                        <div class="card" style="height:20vh;padding:2vh;">
                          <div class="row">
                              <div class="col-10 col-lg-10" style="text-align:center">
                                  <h5><b>Promedio de Unidades por Disco</b></h5>
                              </div>
                              <div class="col-2 col-lg-2" style="text-align:center">
                                  <button type="button" class="btnConfiguracion" id="btnAceptaPromedioUnidadesDisco" onclick="updatePromedioDisco()"><i class="fa-light fa-circle-check"></i></button>
                              </div>
                              <div class="col-12 col-lg-12" style="text-align:center; color: #212121;
                              position:absolute;
                              left:0px;
                              right:0px;
                              bottom:0px;
                              height:10vh;
                              ">
                                  <div class="row">
                                      <div class="col-12 col-lg-12">
                                         <h6><b>Cantidad</b></h6>
                                      </div>
                                      <div class="col-12 col-lg-4 offset-lg-4">
                                        <input class="form-control" id="txtCantidadPorDisco"  onkeypress="return onlynumber(event)" style="text-align:center;width:100%;"></input>
                                     </div>
                                 </div>
                             </div>
                          </div>
                        </div>
                      </div>
                     <div class="col-12 col-lg-6" >
                       <div class="card" style="height:20vh;padding:2vh;">
                         <div class="row">
                           <div class="col-10 col-lg-10" style="text-align:center">
                               <h5><b>Doctores Paquetes: Cantidad Minima</b></h5>
                           </div>
                           <div class="col-2 col-lg-2" style="text-align:center">
                               <button type="button" class="btnConfiguracion" id="btnAceptaCantMinPaquetes"><i class="fa-light fa-circle-check"></i></button>
                           </div>
                           <div class="col-12 col-lg-12" style="text-align:center; color: #212121;
                           position:absolute;
                           left:0px;
                           right:0px;
                           bottom:0px;
                           height:10vh;
                           ">
                               <div class="row">
                                   <div class="col-12 col-lg-12">
                                      <h6><b>Cantidad</b></h6>
                                   </div>
                                   <div class="col-12 col-lg-4 offset-lg-4">
                                     <input class="form-control" id="txtCantMinPaquetes"  onkeypress="return onlynumber(event)" style="text-align:center;width:100%;"></input>
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
            <div class="modal fade" id="ConfHorarioEst" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content ">
                        <div class="modal-header ">
                            <h5 class="modal-title" id='TituloModalH'> </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="formInsertaHorario" method="post" action="Backend/Configuracion/App.php">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="op" name="op" value=""
                                        style="display:none;">
                                    <input type="text" class="form-control" id="txtIdConfH" name="txtIdConfH"
                                        style="display:none;">
                                    <!-- Aqui -->
                                    <div class="row">
                                        <div class="col-12 col-lg-6">
                                            <select class="form-control" name="slectEstadoOrg" id="slectEstadoOrg"
                                                required onchange="divIncludeOrgCiudad(this.value)">
                                                <option value="" selected disabled> Lista de Estados </option>
                                                <?php
                                                $Configuracio3 = new Configuracion();
                                                $ListEstadosOrg = $Configuracio3->getEstadosOrganizacion();
                                                for ($i = 0; $i < sizeof($ListEstadosOrg); $i++) {
                                                    $Organizacion_Estados_Pais_Id = $ListEstadosOrg[$i]["Organizacion_Estados_Pais_Id"];
                                                    $Estado = $ListEstadosOrg[$i]["Estado"];
                                                    echo "
														<option value='$Organizacion_Estados_Pais_Id'> $Estado </option>
														";
                                                }
                                                ?>
                                            </select>
                                        </div>
                                        <div class="col-12 col-lg-6" id="divIncludeOrgCiudad">

                                        </div>
                                        <div class="col-12 col-lg-12">
                                            <br>
                                            <input type="number" name="txtValor" id="txtValor" value="1" min="1" max="3"
                                                class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="btnguardarConf">Guardar Cambios</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--MODAL-->
            <div class="modal fade" id="UpdateIvaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content ">
                        <div class="modal-header ">
                            <h5 class="modal-title" id='TituloModal'>Actualizar Iva</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="formInsertaIva" method="post" action="Backend/Configuracion/App.php">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="op" name="op" value="updateIva">
                                    <input type="text" class="form-control" id="txtIdIva" name="txtIdIva"
                                        style="display:none;">
                                    <!-- Aqui -->
                                    <div class="row">
                                        <div class="col-12 col-lg-12 text-center">
                                            <input type="text" class="form-control" id="txtIva" name="txtIva" required>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="btnguardar" onclick="updateIva()">Guardar
                                Cambios</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <?php include("footer.php"); ?>
    </div>
    </div>
    <?php include("scripts.php"); ?>
    <script src="scripts/Configuracion.js"></script>

</html>
