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
           <ol class="breadcrub">
             <li><a class="titulo">Tipos Push</a></li>
           </ol>
         </section>
         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button type="button" class="btn btn-outline-success float-right" onclick="TiposPushFuncion('')">
                 <a class="fa fa-plus circle ps-3" aria-hidden="true"></a>Agregar</button>
               </div>
        </div>
      </div>
      <br>

			<div class="contenedores">
      <div class="Table-responsive">
        <table id ="TiposPush" class="table text-center table-hover" style="color:black;">
          <thead>
            <tr>
              <th>Tipos Push</th>
							<th>Status</th>
							<th>Actualizar</th>
							<th>Actualizar Status</th>
            </tr>
          </thead>
          <tbody>
        <?php
            require_once ("Backend/Push/PushTipos.php");
            $PushTipos = new PushTipos();
            $TiposPush = $PushTipos->GetPush();
            for ($i=0; $i <sizeof($TiposPush); $i++){
              $idTiposPush = $TiposPush[$i]["idTiposPush"];
              $Tipo = $TiposPush[$i]["Tipo"];
              $Status = $TiposPush[$i]["Status"];
              if ($Status=="1") {
                $varStatus = "Activo";
              }
              else{
                $varStatus = "Inactivo";
              }
							echo "
              <tr>
                <td>$Tipo</td>
                <td>$varStatus</td>
                <td class= 'text-center'>
                <a class= 'btn btnIconoEdit' onclick='TiposPushFuncion(\"$idTiposPush\");' data-toggle='tooltip' title='Actualizar'>
                <i class= 'fa fa-edit fa-2x'></i>
                </a>
                </td>

                <td class= 'text-center'>
                <a class= 'btn btnIconoChange' onclick='ActualizaTiposPush(\"$Status\",\"$idTiposPush\");' data-toggle='tooltip' title='Actualizar Status'>
                <i class= 'fa fa-refresh fa-2x'></i>
                </a>
                </td>
                </tr>
                ";
            }
             ?>
           </tbody>
         </table>
       </div>
		 </div>
       <!--MODAL-->
       <div class="modal fade" id="ModalUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog ">
         <div class="modal-content ">
           <div class="modal-header ">
             <h5 class="modal-title" id='TituloModal'>Actualizar Tipos Push</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <form id="formInserta" method="post" action="Backend/Push/App.php">
               <div class="form-group">
                 <input type="text" class="form-control" id="op" name="op" value="UpdateTiposPush" style="display:none;">
                 <input type="text" class="form-control" id="nptidtipo" name="nptidtipo" style="display:none;">
                 <!-- Aqui -->
                 <div class="row">
                   <div class="col-12 col-lg-12">
                   <!-- Arriba -->
									 <div class="text-center">
                     <label for="recipient-name" class="col-form-label">Tipos Push:</label>
                     <input type="text" class="form-control" id="nptTipopu" name="nptTipopu" required>
                   </div>
								 </div>
							 </div>
						 </div>

      <!-- Aqui va el Segundo Label  -->
             </div>

						 <br><br>

           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
             <button type="button" class="btn btn-primary" id="btnguardar">Guardar Cambios</button>
           </div>
         </form>
      </div>
    </div>
   </div>
 </div>
	<?php include("footer.php"); ?>
	</div>
	
	<?php include("scripts.php"); ?>
	<script type ="text/javascript">
	$(document).ready(function(){
		$('#TiposPush').DataTable({
			lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
			ordering: false,
			"bPaginate": false,
			responsive: false,
			"bInfo" : false,
			"oLanguage" : {
				"sSearch" : "Buscar"
			}
		});
	});

    function TiposPushFuncion(idTiposPush)
		{
      if (idTiposPush != ""){
				$("#TituloModal").text("Actualizar Tipos Push");
				$("#nptidtipo").val(idTiposPush);
				$("#btnguardar").text("Actualizar");
				$("#op").val("UpdateTiposPush");
				$.ajax({
					type:"POST",
					url:"Backend/Push/App.php",
					data:"op=GetTiposPush"+
					"&idTiposPush="+idTiposPush,
					success:function(response){
						response=JSON.parse(response.trim());
						var Tipo = response[0]["Tipo"];
						$("#nptTipopu").val(Tipo);
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}else {
		 $("#TituloModal").text("Agregar Tipos Push");
		 $("#nptTipopu").val("");
		 $("#btnguardar").text("Agregar");
		 $("#nptidtipo").val("");
		 $("#op").val("AddTiposPush");
	 }
	 $("#ModalUpdate").modal("toggle");
 }

 $("#btnguardar").click(function(event){
	 if (document.getElementById("formInserta").checkValidity()) {
		 event.preventDefault();
		 var form = $("#formInserta")[0];
		 var data = new FormData(form);
		 $.ajax({
			 type:"POST",
			 url:"Backend/Push/App.php",
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
				 $("#ModalUpdate").modal("hide");
			 },
			 error:function(e){
				 alert(e.responseText);
			 }
		 });
	 }else{
		 Alerta("info","Faltan Datos por llenar");
	 }
 });
 //Actualizar Status
	function ActualizaTiposPush(Status,idTiposPush){
		if (Status == 0) {
			var stutus = "1";
		}else {
			stutus = "0";
		}
		$.ajax({
			type:"POST",
			url:"Backend/Push/App.php",
			data:"op=StatusActualizaTiposPush"+
			"&Status="+stutus+"&Tipo="+idTiposPush,
			success: function(data){
				if (data=="1") {
					Alerta("success","Operacion exitosa");
					setTimeout(function () {
						location.reload();
					}, 1500);
				}else {
					Alerta("error", "Nose Realizo Correctamente");
					setTimeout(function(){
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
