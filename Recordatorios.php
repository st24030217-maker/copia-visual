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
            <li> <a class="titulo"> Nuevo Recordatorio </a> </li>
          </ol>
         </section>

         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button type="button" class="btn btn-outline-success" onclick="Recordatoriosfunction('')"> <i class='fa fa-plus'></i> Nuevo Recordatorio</button>
             </div>
           </div>
        </div>
        <br>

         <div class="contenedores">
           <div class="Table-responsive">
           <table id="nombre" class="table text-center table-hover" style="color:black;">
             <thead>
               <tr>
                 <th>Usuario</th>
                 <th>Descripción</th>
                 <th>Fecha</th>
                 <th>Hora</th>
                 <th>Actualizar</th>



               </tr>
             </thead>
             <tbody>

               <?php
                  require_once ("Backend/Recordatorios/AdmRecordatorios.php");
                  $AdmRecordatorios = new AdmRecordatorios();
                  $ListRecordatorios= $AdmRecordatorios->getRecordatorios();
                  for($i = 0; $i < sizeof($ListRecordatorios); $i++){

                  $Descripcion = $ListRecordatorios[$i]["Descripcion"];
                  $idRecordatorios = $ListRecordatorios[$i]["idRecordatorios"];
                  $Fecha = $ListRecordatorios[$i]["Fecha"];
                  $Hora = $ListRecordatorios[$i]["Hora"];
                  $usuario = $ListRecordatorios[$i]["usuario"];

                  echo "
                    <tr>
                    <td>$usuario</td>
                    <td>$Descripcion</td>
                    <td>$Fecha</td>
                    <td>$Hora</td>

                    <td class='text-center'>
                      <button class='btn btnIconoEdit'  onclick='Recordatoriosfunction(\"$idRecordatorios\");' data-toggle='tooltip' title='Editar Recordatorio'>
                      <i class='fa fa-pencil-square'></i>
                      </button>

                    </tr>
                  ";
                }
                ?>
             </tbody>
           </table>
          </div>
         </div>

         <!-- modal -->
        <div class="modal fade" id="ModalRecordatorio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content ">
             <div class="modal-header ">
               <h5 class="modal-title" id='TituloModal'></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <form id="formInserta" method="post" action="Backend/Recordatorios/App.php">
                 <div class="form-group">
                   <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
                   <input type="text" class="form-control" id="IdR" name="IdR" style="display:none;">
                   <div class="row">
                       <div class="col-12 col-lg-12 text-center">
                         <h5> Descripción </h5>
                         <input type="text" name="txtMotivo" id="txtMotivo" class="form-control" required>
                         <br>
                       </div>
                       <div class="col-6 col-lg-6 text-center">
                         <h5> Usuario </h5>
                         <select class="form-control" name="slctUsuario" id="slctUsuario" required>
                           <option value="" selected disabled>Usuario</option>
                           <?php
                            require_once("Backend/Recordatorios/AdmRecordatorios.php");
                            $AdmRecordatorios = new AdmRecordatorios();
                            $ListUsuario = $AdmRecordatorios->getUsuario();
                            for ($i=0; $i < sizeof($ListUsuario) ; $i++) {
                              $id_sys_usuario = $ListUsuario[$i]["id_sys_usuario"];
                              $usuario = $ListUsuario[$i]["usuario"];
                              echo "
                              <option value='$id_sys_usuario'>$usuario</option>

                              ";
                            }
                            ?>
                         </select>
                       </div>

                       <div class="col-6 col-lg-6 text-center">
                         <h5>Tipo de Recordatorio</h5>
                         <select class="form-control" name="slctTipoR" id="slctTipoR" required>
                           <option value=""selected disabled>Tipo de Recordatorio</option>
                           <?php
                           require_once("Backend/Recordatorios/AdmRecordatorios.php");
                           $AdmRecordatorios = new AdmRecordatorios();
                           $ListTipoRec = $AdmRecordatorios->getTiposRecordatorios2();
                           for ($i=0; $i < sizeof($ListTipoRec) ; $i++) {
                             $idTipoRecordatorio = $ListTipoRec[$i]["idTipoRecordatorio"];
                             $Descripcion = $ListTipoRec[$i]["Descripcion"];
                             echo "
                             <option value='$idTipoRecordatorio'>$Descripcion</option>

                             ";
                           }
                            ?>
                         </select>
                         <br>
                       </div>
                       <div class="col-6 col-lg-6 text-center">
                         <h5>Fecha</h5>
                         <input type="date" name="txtFecha" id="txtFecha" class="form-control" required>
                       </div>
                       <div class="col-6 col-lg-6 text-center">
                         <h5>Hora</h5>
                         <input type="time" name="txtHora" id="txtHora" class="form-control" required>
                       </div>
                   </div>

                 </div>
        <!-- Aqui va el Segundo Label  -->

             </div>
             <br><br>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
               <button type="button" class="btn btn-primary" id="btnguardar">Guardar</button>
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
    <script type="text/javascript">

    function Recordatoriosfunction(idRecordatorios){
      if (idRecordatorios != "") {
              $("#TituloModal").text("Actualizar Recordatorio");
              $("#IdR").val(idRecordatorios);
              $("#btnguardar").text("Actualizar");
              $("#op").val("updateRecordatorio");
              $.ajax({
                type:"POST",
                url:"Backend/Recordatorios/App.php",
                data:"op=getRecordatorioDetalle"+
                "&idRecordatorios="+idRecordatorios,
                success:function(response){
                  response=JSON.parse(response.trim());
                  $("#txtMotivo").val(response.Descripcion);
                  $("#slctUsuario").val(response.id_sys_usuario);
                  $("#txtFecha").val(response.Fecha);
                  $("#txtHora").val(response.Hora);
                  $("#slctTipoR").val(response.idTipoRecordatorio);
                },
                error:function(e){
                  alert(e.responseText);
                }
              });
            }else {
           $("#TituloModal").text("Agregar Recordatorio");
           $("#txtMotivo").val("");
           $("#slctUsuario").val("");
           $("#txtFecha").val("");
           $("#txtHora").val("");
           $("#slctTipoR").val("");


           $("#btnguardar").text("Guardar");
           $("#IdR").val("");
           $("#op").val("addRecordatorio");
         }
         $("#ModalRecordatorio").modal("toggle");
       }

       $("#btnguardar").click(function(event){
         var idUsu = $("#slctUsuario").val();
         if (idUsu == "") {
          Alerta("warning","Debes de seleccionar un perfil");
          return false;
        }
         if (document.getElementById("formInserta").checkValidity()) {
           event.preventDefault();
           var form= $("#formInserta")[0];
           var data = new FormData(form);
           $.ajax({
             type: "POST",
             url: "Backend/Recordatorios/App.php",
             data: data,
             enctype: "multipart/form-data",
             processData:false,
             contentType:false,
             cache: false,
             timeout:600000,
             success:function(data){
               if (data=="1") {
                Alerta("success","Actualizado Correctamente");
                setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
               }
               else{
                 Alerta("error","No se Actualizo Correctamente");
                 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                   location.reload();
                 }, 1500);
               }
               $("#ModalRecordatorio").modal("hide");
             },
             error:function(e){
               alert(e.responseText);
             }
           });
         }else{
           Alerta("info","Faltan Datos por llenar");
         }
       });

    </script>
  </body>
</html>
