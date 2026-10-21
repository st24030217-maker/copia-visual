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
           <li> <a class="titulo"> Listado de Dientes </a> </li>
         </ol>
        </section>
        <!-- <div class="contenedores ">
          <div class="row">
            <div class="col-12 col-lg-12 text-right">
              <button type="button" class="btn btn-outline-success" onclick="dientefunction('')"><i class='fa fa-plus'></i> Agregar Diente</button>
            </div>
          </div>
       </div> -->
       <br>
        <div class="contenedores">
            <div class="Table-responsive">
            <table id="tablaDientes" class="table text-center table-hover" style="color:black;">
              <thead>
                <tr>
                  <th>Diente</th>
                  <th>Agregar Imagen</th>
                </tr>
              </thead>
              <tbody>

                <?php
                   require_once ("Backend/DientesImagen/DientesImagen.php");
                   $DientesImagen = new DientesImagen();
                   $ListDientes = $DientesImagen->getDientesImagen();
                   for($i = 0; $i < sizeof($ListDientes); $i++){

                   $idDientesImagen = $ListDientes[$i]["idDientesImagen"];
                   $Diente = $ListDientes[$i]["Diente"];
                   $Imagen = $ListDientes[$i]["Imagen"];

                   if ($Imagen != "") {
                      $pathImage = "Archivos/imagenDientes/$Imagen";
                    }else{
                      $pathImage = "";
                    }

                   echo "
                     <tr>
                     <td>$Diente</td>
                     <td class= 'text center'>
                       <a class = 'btn btnIconViolet' onclick='abrirmodalimagen(\"$idDientesImagen\",\"$pathImage\");' data-toggle='tooltip' title='Agregar Imagen'>
                       <i class='fa fa-picture-o fa-2x'></i>
                       </td>

											</tr>
                   ";
                 }
                 ?>
              </tbody>
            </table>
          </div>
          </div>

          <!-- modal -->
          <div class="modal fade" id="ModalDiente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div class="modal-dialog ">
             <div class="modal-content ">
               <div class="modal-header ">
                 <h5 class="modal-title" id='TituloModal'></h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div class="modal-body ">
                 <form id="formInserta" method="post" action="Backend/DientesImagen/App.php">
                   <div class="form-group">
                     <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
                     <input type="text" class="form-control" id="IdDent" name="IdDent" style="display:none;">

                     <div class="row">
                       <div class="col-12 col-lg-12">
                         <h5>Diente</h5>
                         <input type="text" name="txtDiente" id="txtDiente" class="form-control" required>
                       </div>
                     </div>
                   </div>
          <!-- Aqui va el Segundo Label  -->

               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                 <button type="button" class="btn btn-primary" id="btnguardar">Guardar</button>
               </div>
               </form>
             </div>
           </div>
          </div>

          <!-- modal -->
          <div class="modal fade" id="ModalDienteImg" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div class="modal-dialog ">
             <div class="modal-content ">
               <div class="modal-header ">
                 <h5 class="modal-title" id='TituloModal'></h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div class="modal-body ">
                 <form id="formInsertaImg" method="post" action="Backend/DientesImagen/App.php">
                   <div class="form-group">
                     <input type="text" class="form-control" id="op" name="op" value="AddImgDiente" style="display:none;">
                     <input type="text" class="form-control" id="IdDent" name="IdDent" style="display:none;">

                     <div class="row">
                       <div class="col-12 col-lg-12 text-center">
                         <div id="imgDent">
                           <img src="" alt="" id="imgProducto" width="100">
                           <br><br>
                           <h6>Imagen Actual</h6>
                           <hr>
                         </div>
                         <br>
                         <h5 id="textoDent"></h5>
                       </div>
                        <label for="recipient-name" class="col-form-label ">Subir Imagen:</label>
     						        <input type="text" name="txtImgID" id="txtImgID" class="form-control" required style="display:none;">
     									  <input type="file"class="form-control" name="nptfiles" value="BtnSubirFoto">
                     </div>
                   </div>
          <!-- Aqui va el Segundo Label  -->

               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                 <button type="button" class="btn btn-primary" id="btnGuardarImg" onclick="addImgDientefunction('')">Guardar</button>
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
    function dientefunction(idDientesImagen){
      if (idDientesImagen != "") {
        $("#TituloModal").text("Actualizar Diente");
        $("#IdDent").val(idDientesImagen);
        $("#btnguardar").text("Actualizar");
        $("#op").val("updateDiente");
        $.ajax({
          type:"POST",
          url:"Backend/DientesImagen/App.php",
          data:"op=getDienteDetalle"+
          "&idDientesImagen="+idDientesImagen,
          success:function(response){
            response=JSON.parse(response.trim());
            $("#txtDiente").val(response.Diente);
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      }else {
     $("#TituloModal").text("Agregar Diente");
     $("#txtDiente").val("");
     $("#btnguardar").text("Guardar");
     $("#IdDent").val("");
     $("#op").val("addDiente");
   }
   $("#ModalDiente").modal("toggle");
 }

 $("#btnguardar").click(function(event){
   if (document.getElementById("formInserta").checkValidity()) {
     event.preventDefault();
     var form= $("#formInserta")[0];
     var data = new FormData(form);
     $.ajax({
       type: "POST",
       url: "Backend/DientesImagen/App.php",
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
         $("#ModalUsuarios").modal("hide");
       },
       error:function(e){
         alert(e.responseText);
       }
     });
   }else{
     Alerta("info","Faltan Datos por llenar");
   }
 });

 function abrirmodalimagen(DienteID,path){
   if (path != "") {
    $('#imgProducto').attr("src", `${path}`);
    $("#textoDent").text("");
    $("#imgDent").fadeIn();
  }else{
    $("#imgDent").fadeOut();
    $("#textoDent").text("El diente no contiene Imagen");
  }
  setTimeout(function () {
    $("#ModalDienteImg").modal("toggle");
    $('#txtImgID').val(DienteID);
  }, 500);
 }

 function addImgDientefunction(){
   if (document.getElementById("formInsertaImg").checkValidity()){
     event.preventDefault();
     var form = $("#formInsertaImg")[0];
     var data = new FormData(form);
     $.ajax({
       type:"POST",
       url:"Backend/DientesImagen/App.php",
       data:data,
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
       },
       error:function(e){
         alert(e.responseText);
       }
     });
   }
   else {
     Alerta("info","Faltan Datos por llenar");
   }
 }

    </script>
  </body>
</html>
