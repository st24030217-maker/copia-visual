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
	<!-- CSS -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
	<!-- Default theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
	<!-- Semantic UI theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
	<!-- Bootstrap theme -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Nuevo Doctor </a> </li>
          </ol>
         </section>

        <form class="" id="formRegistro" action="Backend/Usuarios/App.php" method="post">
          <input type="text" name="op" value="newDoctorVendedor" style="display:none;">
          <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <a href="Vendedor.php"> <button type="button" class="btn btn-outline-info"><i class="fa fa-arrow-left"></i> Regresar </button></a>
             </div>
           </div>
         </div>
         <br>
         <div class="row">
          <div class="col-12 col-lg-6 offset-lg-3">
            <div class="contenedores">
              <div class="row">
                <div class="col-12 col-lg-12 text-center">
                  <span> Email </span>
                  <br>
                  <input type="email" name="txtEmail" id="txtEmail" value="" class="form-control">
                  <br>
                </div>
                <div class="col-12 col-lg-12 text-center">
                  <span> Nombre del Doctor </span>
                  <br>
                  <input type="text" name="txtDoctor" id="txtDoctor" value="" class="form-control">
                  <br>
                </div>
								<div class="col-12 col-lg-6 text-center" id="divApellidoP">
                  <span> Apellido Paterno </span>
                  <br>
                  <input type="text" name="txtApellidoP" id="txtApellidoP" value="" class="form-control">
                  <br>
                </div>
                <div class="col-12 col-lg-6 text-center" id="divApellidoM">
                  <span> Apellido Materno </span>
                  <br>
                  <input type="text" name="txtApellidoM" id="txtApellidoM" value="" class="form-control">
                  <br>
                </div>
								<div class="col-6 col-lg-6">
									<span>Colonia</span><br>
									<input type="text" name="txtColonia" id="txtColonia" class="form-control" required>
								</div>
								<div class="col-6 col-lg-6">
									<span>Calle</span><br>
									<input type="text" name="txtCalle" id="txtCalle" class="form-control"required>
									<br>
								</div>
								<div class="col-4 col-lg-4">
									<span>No° Ext</span><br>
									<input type="number" name="txtNoExt" id="txtNoExt" class="form-control"required min="0">
								</div>
								<div class="col-4 col-lg-4">
									<span>No° Int</span><br>
									<input type="text" name="txtNoInt" id="txtNoInt" class="form-control" min="0">
								</div>
								<div class="col-4 col-lg-4">
									<span>Codigo Postal</span><br>
									<input type="number" name="txtCP" id="txtCP" class="form-control" required min="0" maxlength="6"><br>
								</div>
                <div class="col-12 col-lg-6 text-center">
                  <span> Estado </span>
                  <br>
                  <select class="form-control" name="slctEstado" id="slctEstado" onchange="loadIncludeOrgCiudades(this.value)" required>
                    <option value="" selected disabled> Lista de Estados </option>
                    <?php
                    require_once("Backend/Organizacion/Organizacion.php");
                    $Organizacion1 = new Organizacion();
                    $ListEstados = $Organizacion1->getOrganizacionEstadoPaisNewCuenta();
                    for ($i=0; $i <sizeof($ListEstados) ; $i++) {
                      $Organizacion_Estados_Pais_Id = $ListEstados[$i]["Organizacion_Estados_Pais_Id"];
                      $Estado = $ListEstados[$i]["Estado"];

                      echo "
                        <option value='$Organizacion_Estados_Pais_Id'> $Estado </option>
                      ";
                    }
                     ?>
                  </select>
                  <br>
                </div>
                <div class="col-12 col-lg-6 text-center">
                  <span> Ciudad </span>
                  <div id="divIncludeOrgCiudad">

                  </div>
                </div>
								<div class="col-12 col-lg-6 text-center">
                  <span> Numero de celular </span>
                  <br>
                  <input type="text" name="txtCelular" id="txtCelular" class="form-control" value="" required onkeypress="return onlynumber(event)" required>
									<br>
                </div>
								<div class="col-12 col-lg-6">
									<span> Vendedor </span>
									<select class="form-control" id="slctVendedor" name="slctVendedor">
										<option value="" disabled>Actualmente sin vendedor</option>
										<option value="MA==">DentLab</option>
									</select>
								</div>
								<div class="col-6 col-lg-6">
									<span>¿El doctor es externo?</span><br>
									<label class='switch'>
										<input type='checkbox' id='chkExterno' name="chkExterno">
										<span class='slider round'></span>
									</label>
								</div>
								<div class="col-6 col-lg-6">
									<span>¿Es empresa?</span><br>
									<label class='switch'>
										<input type='checkbox' id='checkEmpresa' name="checkEmpresa" onclick="checkEmpr('')">
										<span class='slider round'></span>
									</label>
								</div>

                <div class="col-12 col-lg-12 text-center">
                  <br><br>
                  <a href="#"> <button type="button" class="btn btn-outline-info" onclick="RegistrarUsuarioDoc('')"><i class="fa fa-plus"></i> Registrar </button></a>
                </div>
              </div>
            </div>
          </div>
         </div>
        </form>



        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
		<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
      loadIncludeOrgCiudades();
			getListVendedores();
    });
		const gblTipoDoctor = document.getElementById('chkExterno');
		const gblEsEmpresa = document.getElementById('checkEmpresa');
    function loadIncludeOrgCiudades(IdEstado){
      $("#divIncludeOrgCiudad").load(`Organizacion_Ciudad_Doctor.php?IdEstadoOrg=${IdEstado}`);
    }

    function onlynumber(e) {
         tecla = (document.all) ? e.keyCode : e.which;
         if (tecla == 8) {
           return true;
         }
         patron = /[-0-9]/;
         tecla_final = String.fromCharCode(tecla);
         return patron.test(tecla_final);
       }

			 function checkEmpr(){
				 if ($("#checkEmpresa").is(":checked")){
					 document.getElementById("divApellidoP").style.display = 'none';
					 document.getElementById("divApellidoM").style.display = 'none';
				}else {
					document.getElementById("divApellidoP").style.display = 'block';
					document.getElementById("divApellidoM").style.display = 'block';
				}
			 }

			 async function getNameCiudad(val){
				 let datos = {
					 op: "getNameCiudad",
					 Organizacion_Ciudades_Id: val
				 };
				 let respuesta = [];
				 try {
					respuesta = await $.ajax({
						type: "post",
						url: "Backend/Configuracion/App.php",
						data: datos,
						dataType: "json",
					});
				 } catch (e) {
					console.log(e);
				 } finally {
					return respuesta;
				 }
			 }

			 async function getNameVendedor(val){
				 let datos = {
					 op: "getNameVendedorSelected",
					 id_sys_usuario: val
				 };
				 let respuesta = "";
				 try {
					respuesta = await $.ajax({
						type: "post",
						url: "Backend/Usuarios/App.php",
						data: datos,
						dataType: "json",
					});
				 } catch (e) {
					console.log(e);
				 } finally {
					return respuesta;
				 }
			 }

			 async function RegistrarUsuarioDoc(){
         if (document.getElementById("formRegistro").checkValidity()){
           event.preventDefault();
					 let Email = $("#txtEmail").val();
					 let Doctor = $("#txtDoctor").val();
					 let ApellidoP = $("#divApellidoP").val();
					 let ApellidoM = $("#txtApellidoM").val();
					 let Calle = $("#txtCalle").val();
					 let NoExt = $("#txtNoExt").val();
					 let NoInt = $("#txtNoInt").val();
					 let CP = $("#txtCP").val();
					 let OrgCiudad = $("#slctOrgCiudad").val();
					 let Celular = $("#txtCelular").val();
					 let Vendedor = $("#slctVendedor").val();
					 let esEmpresa = "";
					 let tipoDoctor = "";
					 if(gblTipoDoctor.checked){
						 tipoDoctor = "Externo";
					 } else {
						 tipoDoctor = "Interno";
					 };
					 if (gblEsEmpresa.checked) {
						 esEmpresa = "Es empresa";
					 } else {
							 esEmpresa = "No es empresa";
					 }
					 let Colonia = $("#txtColonia").val();
					 let NameVendedor = await getNameVendedor(Vendedor);
					 let respuestaEstadoC = await getNameCiudad(OrgCiudad);

					 console.log(respuestaEstadoC);
					 console.log(NameVendedor);

					 let contenido = `
					 		<div class="row">
								<div class="col-12 col-lg-12 text-center">
									<p><b>Nombre Doctor:</b> ${ApellidoP} ${ApellidoM} ${Doctor}</p>
									<p><b>E-mail:</b> ${Email}</p>
									<p><b>Celular:</b> ${Celular}</p>
									<p><b>Vendedor seleccionado:</b> ${NameVendedor[0].Nombre}</p>
									<p><b>Colonia:</b> ${Colonia}, <b>Calle:</b> ${Calle}, <b>No Int:</b> ${NoInt}, <b>No Ext:</b> ${NoExt}</p>
									<p><b>Estado:</b> ${respuestaEstadoC[0].Estado}, <b>Ciudad:</b> ${respuestaEstadoC[0].Ciudad}</p>
									<p><b>Tipo Doctor:</b> ${tipoDoctor}, <b>Empresa:</b> ${esEmpresa}</p>
								</div>
							</div>
					 `;
					 alertify.confirm(`¿Desea agregar el doctor con los siguientes datos?`,`${contenido}`, async function(){
 					 var form = $("#formRegistro")[0];
            var data = new FormData(form);
 					 var externo = "";
 					 if ($("#chkExterno").is(":checked")) {
 					 		externo = "1";
 					 }else {
 					 		externo = "0";
 					 }
 					 if ($("#checkEmpresa").is(":checked")) {
 						 empresa = "1";
 					}else {
 						 empresa = "0";
 					}
 					 data.append("externo",externo);
 					 data.append("empresa",empresa);

            $.ajax({
              type:"POST",
              url:"Backend/Usuarios/App.php",
              data:data,
              processData:false,
              contentType:false,
              cache: false,
              timeout:600000,
              success:function(data){
                if (data=="1") {
                  Alerta("success","Cuenta registrada");
                 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                   window.location.href=`Vendedor.php`;
                 }, 1500);
                }
                else{
                  Alerta("info",data);
                  setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  }, 1500);
                }
              },
              error:function(e){
                alert(e.responseText);
              }
            });
					 },async function(){
						 return "0";
					 }).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
         }
         else {
           Alerta("info","Ingrese todos los campos");
         }
       }

			 async function getListVendedores(){
			   let datos = {
			     op: "getVendedores"
			   };
			   let respuesta = [];
			   try {
			     respuesta = await $.ajax({
			       type: "post",
			       url: "Backend/DentLab/App.php",
			       data: datos,
			       dataType: "json",
			     });
			   } catch (e) {
			     console.log(e);
			   } finally {
			     console.log(respuesta);
			     if (respuesta.length > 0) {
			       let htmlAdd = "";
			       respuesta.forEach( datos => {
			         htmlAdd += `
			            <option value="${datos.id_sys_usuario}"> ${datos.Nombre} </option>
			         `;
			       });
			       $("#slctVendedor").append(htmlAdd);
			     }
			   }
			 }
    </script>
  </body>
</html>
