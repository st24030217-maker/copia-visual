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
            <li> <a class="titulo"> TIPOS DE CUESTIONARIOS </a> </li>
          </ol>
        </section>
        <div class="contenedores">
					<div class="row">
						<div class="col-12 col-lg-12 text-right">
							<button type="button" class="btn btn-outline-info" onclick="TipoCuestionariofunction('')"><i class="fa fa-plus"></i> Agregar tipo de Cuestionario</button>
						</div>
					</div>
			 </div>
			 <br><br>
       <div class="Table-responsive contenedores">
			 <table id="nombre" class="table text-center" style="color:black;">
			 	<thead>
			 		<tr>
			 			<th>Tipo de Cuestionario</th>
			 			<th>Status</th>
			 			<th>Actualizar</th>
			 			<th>Actualizar Status</th>


			 		</tr>
			 	</thead>
			 	<tbody>

			 		<?php
			 			 require_once ("Backend/Cuestionarios/Cuestionarios.php");
			 			 $Cuestionarios = new Cuestionarios();
			 			 $ListTipoCuestionario= $Cuestionarios->getTiposCuestionario();
			 			 for($i = 0; $i < sizeof($ListTipoCuestionario); $i++){

			 			 $idTiposCuestionario = $ListTipoCuestionario[$i]["IdTiposCuestionario"];
			 			 $Tipo = $ListTipoCuestionario[$i]["Tipo"];
			 			 $Status = $ListTipoCuestionario[$i]["Status"];

			 			 if ($Status =="1") {
			 				 $varstatus = "Activo";
			 			 }else {
			 				 $varstatus = "Inactivo";
			 			 }

			 			 echo "
			 				 <tr>
			 				 <td>$Tipo</td>
			 				 <td>$varstatus</td>

			 				 <td class='text-center'>
			 					 <button class='btn btnUpdate'  onclick='TipoCuestionariofunction(\"$idTiposCuestionario\");' title='Editar Tipo de Cuestionario'>
			 					 <i class='fa fa-pencil fa-1x'></i></button>

			 				 <td class='text-center'>
			 					 <button class='btn btnReload' onclick='updateStatus(\"$Status\",\"$idTiposCuestionario\");' title='Actualizar Status'>
			 					 <i class='fa fa-refresh fa-1x'></i></button>

			 				 </tr>
			 			 ";
			 		 }
			 		 ?>
			 	</tbody>
			 </table>
			 </div>

       <!-- modal -->
			 <div class="modal fade" id="ModalTipoCuestionario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id='TituloModal'></h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-center">
							<form id="formInserta" method="post" action="Backend/TipoCuestionario/App.php">
								<div class="form-group">
									<input type="text" class="form-control" id="op" name="op" value="UpdateTipoCuestionario" style="display:none;">
									<input type="text" class="form-control" id="IdTipoC" name="IdTipoC" style="display:none;">
									<h6>Tipo de Cuestionario:</h6>
									<input type="text" class="form-control" id="txtTipo" name="txtTipo" required style="text-align:center;">
								</div>
			 <!-- Aqui va el Segundo Label  -->

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							<button type="button" class="btn btn-info" id="btnguardar">Guardar</button>
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

    function TipoCuestionariofunction(idTiposCuestionario){
      if (idTiposCuestionario != "") {

        $("#TituloModal").text("Actualizar Tipo");
        $("#IdTipoC").val(idTiposCuestionario);
        $("#btnguardar").text("Actualizar");
        $("#op").val("UpdateTipoCuestionario");
        $.ajax({
          type:"POST",
          url:"Backend/Cuestionarios/App.php",
          data:"op=getDetalleTipoCuestionario"+
          "&idTiposCuestionario="+idTiposCuestionario,
          success:function(response){
            response=JSON.parse(response.trim());
            $("#txtTipo").val(response.Tipo);
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      } else {
        $("#TituloModal").text("Agregar Tipo");
        $("#txtTipo").val("");
        $("#btnguardar").text("Guardar");
        $("#IdTipoC").val("");
        $("#op").val("AddTipoCuestionario");

      }
      $("#ModalTipoCuestionario").modal("toggle");
    }
    $("#btnguardar").click(function(event){
      if (document.getElementById("formInserta").checkValidity()) {
       event.preventDefault();
       var form = $("#formInserta")[0];
       var data = new FormData(form);
        $.ajax({
          type:"POST",
          url:"Backend/Cuestionarios/App.php",
          data:data,
          processData:false,
          contentType:false,
          cache: false,
          timeout:600000,
          success:function(data){
            if (data=="1") {
             Alerta("success","¡Operación exitosa!");
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
            $("#ModalTipoCuestionario").modal("hide");
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      }
    });

    function updateStatus(Status,idTiposCuestionario){
      if (Status == 0) {
        var status1 ="1";
      }else {
        status1 = "0";
      }
      $.ajax({
      type:"POST",
      url:"Backend/Cuestionarios/App.php",
      data:"op=updateStatusTipoC"+
      "&Status="+status1+"&idTiposCuestionario="+idTiposCuestionario,
      success:function(data){
        if(data=="1"){
          Alerta("success","Operacion Exitosa");
          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
            location.reload();
          }, 1500);
        }else{
          Alerta("error","No se Realizo Correctamente");
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
    </script>
  </body>
</html>
