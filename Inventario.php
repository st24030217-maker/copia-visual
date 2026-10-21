<?php
$Usuario = $_GET["Usuario"] ?? "";
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php include("estilos.php"); ?>
    <title></title>
  </head>
  <body style="background-color:#f7f7f7;">
    <div class="container body">
      <div class="right_col" role="main">
      <div class="row">
        <div class="col-12 col-lg-8 offset-lg-2" style="margin-top:5vh;">
          <section>
            <ol class="breadcrumb">
              <li> <a class="titulo"> Inventario </a> </li>
            </ol>
         </section>
        </div>
      </div>
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2 text-right contenedores">
           <button type="button" class="btn btn-outline-info" name="button" onclick="window.location.href='Entrada.php'">
             <i class="fa fa-arrow-left"></i> Regresar</button>
          </div>
        </div>
            <div class="col-12 col-lg-8 offset-lg-2 contenedores" style="margin-top:30px;">
              <div class="row">
                <div class="col-lg-12">
                  <div class="Table-responsive">
                    <table id="tablaInv" class="table text-center table-hover">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>SKU</th>
                          <th>Existencia</th>
                          <th>Entrada</th>
                          <th>Salida</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php
                         require_once("Backend/Inventario/Inventario.php");
                         $Inventario = new Inventario();
                         $Inv = $Inventario->getInventario();
                         for ($i=0; $i <sizeof($Inv) ; $i++) {
                           $idLab_Discos_Inv = $Inv[$i]["idLab_Discos_Inv"];
                           $Nombre_Producto = $Inv[$i]["Nombre_Producto"];
                           $SKU = $Inv[$i]["SKU"];
                           $Existencia = $Inv[$i]["Existencia"];
                           $IDDisco = $Inv[$i]["IDDisco"];
                           echo "
                           <tr>
                            <td>$Nombre_Producto</td>
                            <td>$SKU</td>
                            <td>$Existencia</td>
                            <td>
                              <button type='button' class='btn btn-success' onclick='abrirModalCantidad(\"$Usuario\",1,\"$Existencia\",\"$IDDisco\")'>Entrada</button>
                            </td>
                            <td>
                              <button type='button' class='btn btn-danger' onclick='abrirModalCantidad(\"$Usuario\",2,\"$Existencia\",\"$IDDisco\")'>Salida</button>
                            </td>

                           </tr>
                           ";
                         }
                          ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--MODAL-->
        <div class="modal fade" id="ModalCantidad" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title" id='TituloModal'></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="formInserta" method="post" action="Backend/Inventario/App.php">
                <div class="form-group">
                  <input type="text" class="form-control" id="op" name="op" value="MovimientosInventario" style="display:none;">
                  <input type="text" class="form-control" id="idUsuario" name="idUsuario" style="display:none;">
                  <input type="text" class="form-control" id="Accion" name="Accion" style="display:none;">
                  <input type="text" class="form-control" id="idProducto" name="idProducto"style="display:none;">
                  <!-- Aqui -->
                  <div class="row">
                    <div class="col-12 col-lg-12">
                      <span id="spanCodigo">Cddigo</span>
                      <br>
                      <input type="text" class="form-control" id="txtCodigo" name="txtCodigo" style="">
                      <br>
                    </div>
                    <div class="col-6 col-lg-6">
                     <input type="number" class="form-control" name="txtExistenciaAnt" id="txtExistenciaAnt" value="" required style="display:none;">
                    </div>
                    <div class="col-12 col-lg-12">
                      <span>Cantidad</span>
                      <br>
                      <input type="number" class="form-control" name="txtCantidad" id="txtCantidad" value="1" required min="1" >
                    </div>
                  </div>
       <!-- Aqui va el Segundo Label  -->
                  </div>
                </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" id="btnguardar" onclick="realizarMovimiento('')">Guardar Cambios</button>
            </div>
          </form>
       </div>
     </div>


    </div>

      </div>
    </div>
    <?php include("scripts.php"); ?>
    <script type="text/javascript">
       function abrirModalCantidad(idUsuario,accion,existencia,idDisco){
         if (accion == "1") {
           $("#TituloModal").text("Entrada");
           document.getElementById('txtCodigo').style.display = 'none';
           document.getElementById('spanCodigo').style.display = 'none';
           $('#txtCodigo').prop("required", false);

         }else if (accion == "2") {
           if (existencia == "0") {
             Alerta("info","No es posible sacar del inventario");
             return false;
           }else {
             document.getElementById('txtCodigo').style.display = 'block';
             document.getElementById('spanCodigo').style.display = 'block';
             $("#TituloModal").text("Salida");
             $('#txtCodigo').prop("required", true);
           }
         }
         $("#idUsuario").val(idUsuario);
         $("#idUsuario").val(idUsuario);
         $("#Accion").val(accion);
         $("#txtExistenciaAnt").val(existencia);
         $("#idProducto").val(idDisco);

         $("#ModalCantidad").modal("toggle");
       }

       function realizarMovimiento(){
         var ExistenciaActu = $("#txtExistenciaAnt").val();
         var Cantidad = $("#txtCantidad").val();

         // if (Cantidad > ExistenciaActu) {
         //   Alerta("info","Cantidad no aceptada");
         //   return false;
         // }
         if (document.getElementById("formInserta").checkValidity()) {
           event.preventDefault();
           var form = $("#formInserta")[0];
           var data = new FormData(form);
           $.ajax({
             type: "POST",
             url:"Backend/Inventario/App.php",
             data:data,
             processData:false,
             contentType:false,
             cache: false,
             timeout:600000,
             success:function(data){
               if (data == "1") {
                 Alerta("success","Movimiento Realizado");
                 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                   location.reload();
                 }, 1500);
               }else {
                 Alerta("success","Movimiento no Realizado");
                 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                   location.reload();
                 }, 1500);
               }
             }
           });
         }else {
           Alerta("info","Faltan Campos por llenar");
         }
       }
    </script>
  </body>
</html>
