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
	<style media="screen">
		.contBlue {
			cursor:pointer;
			background-color: #34495E;
			color:white;
			padding: 8px;
			border-radius: 10px;
		}
</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Listado de Usuarios </a> </li>
          </ol>
         </section>
         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button type="button" class="btn btn-outline-success" onclick="usuariosfunction('')"> <i class='fa fa-plus'></i> Nuevo Usuario</button>
             </div>
           </div>
        </div>
				<br>
				<div class="contenedores">
					<div class="row">
						<div id="despListaVendedores" class="col-12 col-lg-12 contBlue text-center ">
							<h6 id="txtListVendedores">Mostrar Vendedores</h6>
						</div>
						<div class="col-12 col-lg-12">
							<div class="row" id="ContenidoVendedores" style="display:none;"></div>
						</div>
						<div class="col-12 col-lg-12t text-center" style="background-color: #34495E;color:white;padding: 8px;border-radius: 10px;">
							<h6>Listado de Usuarios</h6>
						</div>
						<div class="col-12 col-lg-12">
							<div class="table-responsive">
								<table id="nombre" class="table text-center table-hover" style="color:black;">
									<thead>
										<tr>
											<th>Usuario</th>
											<th>Nombre</th>
											<th>Correo</th>
											<th>Status</th>

											<th>Actualizar</th>
											<th>Actualizar Status</th>
										</tr>
									</thead>
									<tbody>

									<?php
										 require_once ("Backend/Usuarios/Usuarios.php");
										 $Usuarios = new Usuarios();
										 $ListUsuarios= $Usuarios->getUsuarios();
										 for($i = 0; $i < sizeof($ListUsuarios); $i++){

										 $id_sys_usuario = $ListUsuarios[$i]["id_sys_usuario"];
										 $usuario = $ListUsuarios[$i]["usuario"];
										 $Nombre = $ListUsuarios[$i]["Nombre"];
										 $Correo = $ListUsuarios[$i]["Correo"];
										 $Status = $ListUsuarios[$i]["estatus"];
										 $ApEquipos = $ListUsuarios[$i]["ApEquipos"];

										 if ($Status =="1") {
											 $varstatus = "Activo";
										 }else {
											 $varstatus = "Inactivo";
										 }


										 echo "
											 <tr>
											 <td>$usuario</td>
											 <td>$Nombre</td>
											 <td>$Correo</td>
											 <td>$varstatus</td>
											 <td class='text-center'>
												 <button class='btn btnIconoEdit'  onclick='usuariosfunction(\"$id_sys_usuario\");' data-toggle='tooltip' title='Editar Usuario'>
												 <i class='fa fa-pencil-square'></i>
												 </button></td>
											 <td class='text-center'>
												 <button class='btn btnIconoUpload' onclick='ActualizarStatus(\"$Status\",\"$id_sys_usuario\");' data-toggle='tooltip' title='Actualizar Status'>
													<i class='fa fa-refresh'></i>
												 </button></td>
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


               <!-- modal -->
        			 <div class="modal fade" id="ModalUsuarios" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        			 	<div class="modal-dialog ">
        			 		<div class="modal-content ">
        			 			<div class="modal-header ">
        			 				<h5 class="modal-title" id='TituloModal'></h5>
        			 				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        			 					<span aria-hidden="true">&times;</span>
        			 				</button>
        			 			</div>
        			 			<div class="modal-body ">
        			 				<form id="formInserta" method="post" action="Backend/Usuarios/App.php">
        			 					<div class="form-group">
        			 						<input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
        			 						<input type="text" class="form-control" id="IdUs" name="IdUs" style="display:none;">
                          <div class="row">
                            <div class="col-12 col-lg-12">
                              <label for="recipient-name" class="col-form-label">Liasta de Perfiles:</label>
                              <select class="form-control" name="selectPerfil" id="selectPerfil" required>
                                <option value="" selected disabled> Perfiles </option>
                                  <?php
                                    require_once("Backend/Usuarios/Usuarios.php");

                                    $Usuarios = new Usuarios();
                                    $ListPerfil = $Usuarios->getPerfiles();
                                    for ($i=0; $i < sizeof($ListPerfil) ; $i++){
                                      $id_perfil = $ListPerfil[$i]["id_perfil"];
                                      $perfil = $ListPerfil[$i]["perfil"];

                                      echo "
                                      <option value='$id_perfil'>$perfil</option>";

                                    }

                                  ?>
                              </select>
                            </div>
                            <div class="col-6 col-lg-6">
                              <label for="recipient-name" class="col-form-label">Usuario:</label>
                              <input type="text" class="form-control" id="txtUsuario" name="txtUsuario" required>
                            </div>
                            <div class="col-6 col-lg-6">
                              <label for="recipient-name" class="col-form-label">Password:</label>
                              <input type="password" class="form-control" id="txtPassword" name="txtPassword" required>
                            </div>

														<div class="col-6 col-lg-6">
															<label for="recipient-name" class="col-form-label">Nombre(s):</label>
															<input type="text" class="form-control" id="txtNombre" name="txtNombre" required>
														</div>
														<div class="col-6 col-lg-6">
															<label for="recipient-name" class="col-form-label">Email:</label>
															<input type="text" class="form-control" id="txtEmail" name="txtEmail">
															<br><br>
														</div>
														<div class="col-12 col-lg-12 text-center">
															<input type="text" name="inptObEqu"  id="inptObEqu" style="display:none;">
															<input type="checkbox" name="checkObEq"  id="checkObEq" onclick="clickCheckObEq()">
															<label for="recipient-name" class="col-form-label">App Equipos</label>
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



        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
		$(document).ready(function(){
			$('#nombre').DataTable({
				lengthMenu: [[50, 100, 500, -1], [50, 100, 500, "Todos los registros"]],
				ordering: false,
				"bPaginate": false,
				responsive: false,
				"bInfo" : false,
				"oLanguage": {
				"sSearch": "Buscar"
			}
			});
		});
		getLlistVendedores();
		const divContVendedores = document.getElementById('ContenidoVendedores');
		const textDiv = document.getElementById("txtListVendedores");

      function usuariosfunction(id_sys_usuario){
        if (id_sys_usuario != "") {
          $("#TituloModal").text("Actualizar Usuario");
          $("#IdUs").val(id_sys_usuario);
          $("#btnguardar").text("Actualizar");
          $("#op").val("UpdateUsuario");
          $.ajax({
            type:"POST",
            url:"Backend/Usuarios/App.php",
            data:"op=getDetalleUsuario"+
            "&id_sys_usuario="+id_sys_usuario,
            success:function(response){
              response=JSON.parse(response.trim());
              $("#txtUsuario").val(response.usuario);
              $("#txtPassword").val(response.pwd);
							$("#txtNombre").val(response.Nombre);
							$("#txtEmail").val(response.Correo);
              $("#selectPerfil").val(response.id_perfil);
							$("#inptObEqu").val(response.ApEquipos);
							if (response.ApEquipos == "1" ) {
								$("#checkObEq").prop("checked",true)
							}else {
								$("#checkObEq").prop("checked",false)

							}
            },
            error:function(e){
              alert(e.responseText);
            }
          });
        }else {
       $("#TituloModal").text("Agregar Usuario");
       $("#txtUsuario").val("");
       $("#txtPassword").val("");
       $("#selectPerfil").val("");
       $("#btnguardar").text("Guardar");
       $("#IdUs").val("");
       $("#op").val("addUsuario");
			 $("#checkObEq").prop("checked",false)
			 $("#txtNombre").val("");
			 $("#txtEmail").val("");


     }
     $("#ModalUsuarios").modal("toggle");
   }

   $("#btnguardar").click(function(event){
		 var idperfil = $("#selectPerfil").val();
		 if (idperfil == "") {
			 Alerta("warning","Debes de seleccionar un perfil");
			 return false;
		 }
     if (document.getElementById("formInserta").checkValidity()) {
       event.preventDefault();
       var form= $("#formInserta")[0];
       var data = new FormData(form);
       $.ajax({
         type: "POST",
         url: "Backend/Usuarios/App.php",
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

   function ActualizarStatus(Status,id_sys_usuario){
       if (Status == 0) {
         var status1 ="1";
       }else {
         status1 = "0";
       }
       $.ajax({
       type:"POST",
       url:"Backend/Usuarios/App.php",
       data:"op=updateStatus"+
       "&Status="+status1+"&id_sys_usuario="+id_sys_usuario,
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


	function clickCheckObEq(){
		if ($("#checkObEq").is(":checked")){
			$("#inptObEqu").val("1");

	}else {
		$("#inptObEqu").val("0");
		}
	}

	async function getLlistVendedores(){
		let datos = {
			op: "getLlistVendedores"
		};
		let respuesta = [];
		try {
			respuesta = await $.ajax({
				type: "post",
				url: "Backend/Usuarios/App.php",
				data: datos,
				dataType: "json",
			});
		} catch (e) {
			console.log();
		} finally {
			console.log(respuesta);
			let contenidoHTML = "";
			respuesta.forEach( datos => {
				contenidoHTML += `
					<div class="col-4 col-lg-2" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;padding:.5vh; cursor:pointer;">
						<p><h5>${datos.Nombre}</h5></p>
						<p><h6><b>Código: </b>${datos.CodigoVendedor}</h6></p>
					</div>
				`;
			});
			$("#ContenidoVendedores").html(contenidoHTML);
		}
	}

	$(document).on("click","#despListaVendedores",function(){
		if (divContVendedores.offsetParent === null) {
			textDiv.innerHTML = "Ocultar Vendedores";
			divContVendedores.style.display = "block";
		} else {
			textDiv.innerHTML = "Mostrar Vendedores";
			divContVendedores.style.display = "none";
		}
	});

    </script>
  </body>
</html>
