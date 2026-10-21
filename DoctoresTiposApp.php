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
            <li><a class="titulo"> Doctores Tipos App</a></li>
            </ol>
          </section>
          <div class="contenedores">
            <div class="row">
              <div class="col-lg-12 ">
                <button type="button" class="btn btn-outline-success float-right" onclick="DoctoresTiposfuncion('')">
                  <a class="fa fa-plus circle ps-3 " aria-hidden="true"></a>Agregar</button>
                </div>
              </div>
            </div>
            <br>

						<div class="contenedores">
            <div class="Table-responsive">
              <table id="DoctoresTiposApp" class="table text-center table-hover" style="color:black;">
                <thead>
                  <tr>

                    <th>Tipo</th>
                    <th>Tipo Abreviado</th>
                    <th>Orden</th>
                    <th>Activo</th>
                    <th>Color</th>
                    <th>Color F</th>
                    <th>Actualizar</th>
                    <th>Actualizar Status</th>

                  </tr>
                </thead>

                <tbody>
            <?php
            require_once ("Backend/Doctores/Doctores.php");
            $Doctores = new Doctores();
            $DoctoresTipo = $Doctores->GetTiposDoctores();
            for ($i=0; $i <sizeof($DoctoresTipo); $i++){
              $Doctores_Tipos_Id = $DoctoresTipo[$i]["Doctores_Tipos_Id"];
              $Tipo = $DoctoresTipo[$i]["Tipo"];
              $Tipo_Corto = $DoctoresTipo[$i]["Tipo_Corto"];
              $Orden = $DoctoresTipo[$i]["Orden"];
              $Activo = $DoctoresTipo[$i]["Activo"];
              $Color = $DoctoresTipo[$i]["Color"];
              $Color_F = $DoctoresTipo[$i]["Color_F"];
              //PRUEBA
              if ($Orden == "1") {
                $varStatus = "Activo";
              }else {
                $varStatus = "Inactivo";
              }
              if ($Activo =="1") {
                $varStatus1 = "Activo";
              }
              else {
                $varStatus1 = "Inactivo";
              }
              echo "
              <tr>

                <td>$Tipo</td>
                <td>$Tipo_Corto</td>
                <td>$varStatus</td>
                <td>$varStatus1</td>
                <td>$Color</td>
                <td>$Color_F</td>
                <td class= 'text-center'>
                <a class='btn btnIconoEdit' onclick='DoctoresTiposfuncion(\"$Doctores_Tipos_Id\");' data-toggle='tooltip' title='Actualizar'>
                <i class='fa fa-edit fa-2x'></i>
                </a>
                </td>

                <td class= 'text-center'>
                <a class= 'btn btnIconoChange' onclick='ActualizarStatusDoctoresTiposApp(\"$Activo\",\"$Doctores_Tipos_Id\");' data-toggle='tooltip' title='Actualizar Status'>
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
   			 				<h5 class="modal-title" id='TituloModal'>Actualizar Doctores Tipos</h5>
   			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
   			 					<span aria-hidden="true">&times;</span>
   			 				</button>
   			 			</div>
   			 			<div class="modal-body">
   			 				<form id="formInserta" method="post" action="Backend/Doctores/App.php">
   			 					<div class="form-group">
   			 						<input type="text" class="form-control" id="op" name="op" value="UpdateDoctoresTipos" style="display:none;">
   			 						<input type="text" class="form-control" id="nptidDocTipos" name="nptidDocTipos" style="display:none;">
										<!-- Aqui -->
   									<div class="row">
   										<div class="col-6 col-lg-6">
											<!-- Arriba -->
											<div class="text-center">
   											<label for="recipient-name" class="col-form-label">Tipo:</label>
   											<input type="text" class="form-control" id="npttipo" name="npttipo" required>
                        <!-- Aqui es el Cambios -->
   										</div>
										</div>
                      <div class="col-6 col-lg-6">
												<div class="text-center">
                        	<label for="recipient-name" class="col-form-label">Tipo Abreviado:</label>
                        <input type="text" class="form-control" id="npttipoC" name="npttipoC" required>
                      </div>
											</div>
                      <div class="col-6 col-lg-6">
												<div class="text-center">
                        	<label for="recipient-name" class="col-form-label">Color:</label>
                        <input type="text" class="form-control" id="nptColor" name="nptColor" required>
                      </div>
											</div>
                      <div class="col-6 col-lg-6">
												<div class="text-center">
                        	<label for="recipient-name" class="col-form-label">Color F:</label>
                        <input type="text" class="form-control" id="nptColorF" name="nptColorF" required>
                      </div>
											</div>
   			 <!-- Aqui va el Segundo Label  -->

		 		 						</div>

									</div>
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
			$('#DoctoresTiposApp').DataTable({
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
			function DoctoresTiposfuncion(Doctores_Tipos_Id)
			{
				if (Doctores_Tipos_Id != ""){

					$('#TituloModal').text("Actualizar Tipos Doctores");
					$('#nptidDocTipos').val(Doctores_Tipos_Id);
					$("#btnguardar").text("Actualizar");
					$("#op").val("UpdateDoctoresTipos");
					$.ajax({
						type:"POST",
						url:"Backend/Doctores/App.php",
						data: "op=GetDoctoresTipos"+
						"&IdDoctores="+Doctores_Tipos_Id,
						success:function(response){
							response=JSON.parse(response.trim());
							var DoctoresTipos = response[0]["Tipo"];
              var DoctoresTipos2 = response[0]["Tipo_Corto"];
              var DoctoresTipos3 = response[0]["Color"];
              var DoctoresTipos4 = response[0]["Color_F"];
							$("#npttipo").val(DoctoresTipos);
              $("#npttipoC").val(DoctoresTipos2);
              $("#nptColor").val(DoctoresTipos3);
              $("#nptColorF").val(DoctoresTipos4);

						},
						error:function(e){
							alert(e.responseText);
						}
					});
				}else {
					// alert("Agregar");
					$("#TituloModal").text("Agregar Tipos Doctores");
					$("#npttipo").val("");
          $("#npttipoC").val("");
          $("#nptColor").val("");
          $("#nptColorF").val("");
					$("#btnguardar").text("Agregar");
					$("#nptidDocTipos").val("");
					$("#op").val("AddDoctoresTipos");
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
            url:"Backend/Doctores/App.php",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(data){
              if (data=="1") {
                Alerta("success","Actualizado Correctamente");
                setTimeout(function () {
                  // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
              }else {
                Alerta("error","No se Actualizado Correctamente");
                setTimeout(function () {
                  // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
              }
              $("#ModalUpdate").modal("hide");
            },
            error:function(e){
              alert(e.responseText);
            }

          }); //Ajax
				}else {
					Alerta("info","Llene los campos Por Favor");

				}
      });

			// ActualizarStatus
			function ActualizarStatusDoctoresTiposApp(Activo,Doctores_Tipos_Id){
        if (Activo == 0){
          var activo1 ="1";
        }else {
          activo1 = "0";
        }
				$.ajax({
					type:"POST",
					url:"Backend/Doctores/App.php",
					data:"op=StatusDoctoresTipos"+
					"&Activo="+activo1+"&DoctoresTipo="+Doctores_Tipos_Id,
					success: function(data){
						if(data=="1"){
							Alerta("success","Operacion exitosa");
							setTimeout(function () {
								location.reload();
							}, 1500);
						}else{
							Alerta("error","No se Realizo Correctamente");
							setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
								location.reload();
							}, 1500);
            }
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}
			//Funcion de ActualizarStatus
			</script>
  </body>
</html>
