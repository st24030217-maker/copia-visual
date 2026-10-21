<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>

<body class="nav-md">
	<div class="container body" >
		<?php include("menus.php");?>
			<div class="right_col" role="main">
			 <!-- CONTENIDO PAGINA -->
			 <div class="content-wrapper">
				 <section class="featured">
					 <div class="content">
						<div class="form-group row">
										 <div class="col-md-3" style="border-right: 2px groove #212121;height:700px;overflow:scroll;">

											 <!-- inicio accordion -->
											 <div class="panel-group" >
												 <div class="panel panel-default">
													 <div class="btn btn-info" style="width:100%; border-radius:5px;">
														 <h6 class="panel-title  text-center" >
															 <a data-toggle="collapse" href="#collapse1" style="color:#FFFFFF">Sliders Principales  <i class='fa fa-angle-down'></i></a>
														 </h4>
													 </div>
													 <div id="collapse1" class="panel-collaps collapse show" style="padding:5px;">
													 <!-- imagenes sliders principal -->
														 <form id="FormGral" action="Backend/BanersApp/App.php" method="post" enctype="multipart/form-data">
															 <input type="text" name="op" id="op" value="addSliderPrincipalApp" style="display:none">
															 <div class="row" style="text-align:center">
																 <div class="col-12 text-center">
																 	<h5>Redirección del Slider</h5>
																 </div>
																 <div class="col-md-12">
																	 <label>URL</label>
																	 <input class="form-control" type="url" name="inURL" id="inURL" placeholder="Ej: https://dent.com" style="width:100%;" required>
																 </div>
																 <div class="col-md-12">
																	 <br>
																	 <label>Titulo Slider</label>
																	 <input class="form-control" type="text" name="mensaje" id="mensaje" placeholder="Mensaje" required>
																 </div>
																 <div class="col-md-12">
																	 <br>
																	 <label>Descripcion Slider</label>
																	 <textarea id="desc" class="form-control" name="desc" rows="2" cols="80" required></textarea>
																 </div>
																 <div class="col-md-12">
																	 <br>
																	 <label>Seleccione el color</label>
																		<div id="cp2" class="input-group colorpicker-component">
																			<input id="colorhex" name="colorhex" type="text" value="#000" maxlength="4"class="form-control" required>
																			<span class="input-group-addon"><i></i></span>
																		</div>
																 </div>
															 </div>
															 <br><br>
															 <div class="row" style="text-align:center">
																 <div class="col-md-12">
																	 <h7 style="color:red">*Tamaño de imagen recomendado: </h7>
																	 <input class="form-control" accept="image/jpg,image/png,image/jpeg" type="file" name="gral" id="gral" required>
																 </div>
															 </div>
															 <br>
															 <div class="col-md-12 text-center" >
																 <button style="border-radius:9px;" type="submit" onclick="registraSliderPrincipal('')"class="btn btn-success btn-flat RegistraBannerGeneral" id="btnGuardaBannerGral">Registrar banners generales</button>
															 </div>
														 </form>
														<br>
														<hr>
														 <div class="row contenedores">
														 <?php
														 	require_once("Backend/BanersApp/AdmBanersApp.php");
															$AdmBanersApp = new AdmBanersApp();
															$NombreArchivoList = $AdmBanersApp->selectIdArchivoBanner();
															for ($i=0; $i <sizeof($NombreArchivoList) ; $i++) {
																$idSlidersPrincipal = $NombreArchivoList[$i]["idSlidersPrincipal"];
																$banner = $NombreArchivoList[$i]["banner"];
																$descripcion = $NombreArchivoList[$i]["descripcion"];
																$status = $NombreArchivoList[$i]["status"];

																if ($status == "1") {
																			$varstatus = "Autorizado";
																			$varcheck = "fa fa-times";
																			$colortext = "color:green;";
																			$coloricon = "color:red;";
																			$varauoturizar = "No Autorizar";

																}	else {
																			$varstatus = "No Autorizado";
																			$varcheck = "fa fa-check";
																			$colortext = "color:red;";
																			$coloricon = "color:green;";
																			$varauoturizar = "Autorizar";
																}


															echo "
															<div  id='Id$idSlidersPrincipal' class='col-12 col-lg-12'>
																<div class='col-3 col-lg-3 text-center'>
																	<img src='Archivos/imagenBaners/$banner' style='height:40px; border-radius:30px;'>
																</div>
																<div class='col-5 col-lg-5 text-center' style='$colortext';>
																	<h7>$varstatus</h7>
																</div>
																<div class='col-2 col-lg-2 text-center'>
																	<a class='' style='$coloricon'; onclick='ActualizarStatus(\"$status\",\"$idSlidersPrincipal\");' data-toggle='tooltip' title='$varauoturizar'>
																	<i class='$varcheck fa-2x'></i></a>
																</div>
																<div class='col-2 col-lg-2 text-center'>
																	<a class='' style='color:#641E16;'; onclick='deleteBanenrfunction(\"$idSlidersPrincipal\");' data-toggle='tooltip' title='Eliminar'>
																	<i class='fa fa-trash-o fa-2x'></i></a>
																</div>
																<div class='column col-12 col-lg-12'>
																	<hr>
																</div>

															</div>
															";
															}
														  ?>

														 </div>
														 <div class="row">
															 <div class="col-md-12" id="divImagenesPreview">

															 </div>
														 </div>
													 <!-- end imagenes sliders principal -->
													 </div>
												 </div>
												 <hr>
											 </div>
											 <!-- end -->
											 <!-- inicio accordion -->
											 <div class="panel-group" >
												 <div class="panel panel-default">
													 <div class="btn btn-info" style="width:100%; border-radius:5px;">
														 <h6 class="panel-title" >
															 <a data-toggle="collapse" href="#collapse2" style="color:#fff">Imagenes Categorias <i class='fa fa-angle-down'></i></a>
														 </h4>
													 </div>
													 <div id="collapse2" class="panel-collapse collapse show" style="padding:5px;">
													 <!-- imagenes sliders principal -->
													 <form id="FormCategorias" action="Backend/Categorias/App.php" method="post" enctype="multipart/form-data">
														 <input type="text" name="op" id="op" value="addImagenCategoria" style="display:none">
														 <div class="row" style="text-align:center">
															 <div class="col-12 col-lg-12">
																 <h5>Imagenes Categorias</h5>
																 <br>
																 <div class="col-12 col-lg-12">
																	 <span>Selecciona la categoria</span>
																	 <select class="form-control" name="slctCategorias" id="slctCategorias" onchange="onchangeimgcat(this.value)" required>
																		 <option value="" selected disabled>Categorias</option>
																		 <?php
																		 	require_once("Backend/Categorias/Categorias.php");
																			$NCategorias = new Categorias();
																			$ListCategorias = $NCategorias->getSelectCategorias();
																			for ($i=0; $i <sizeof($ListCategorias) ; $i++) {
																				$idCategoriasS = $ListCategorias[$i]["idCategorias"];
																				$DescripcionS = $ListCategorias[$i]["Descripcion"];
																				echo "
																				<option value='$idCategoriasS'>$DescripcionS</option>
																				";
																			}
																		  ?>
																	 </select>
																	 <br>

																 </div>
																 <br><br>
																<div class="row" style="text-align:center">
																	<div class="col-md-12">
																		 <h7 style="color:red">*Tamaño de imagen recomendado: </h7>
																		<input class="form-control" accept="image/jpg,image/png,image/jpeg" type="file" name="nptFileCat" id="nptFileCat" required>
																	</div>
																</div>
																<br>


																<div class="col-12">
																	<div class="col-md-12 text-center">
																		<button style="border-radius:9px;" onclick="addImageCategoriafunction()" class="btn btn-success btn-flat RegistraBannerGeneral" >Registrar banners Categorias</button>
																	</div>
																	<br><br>
																	<hr>
																</div>
																 <div id="divImgCat">

																</div>
															 </div>

														 </div>



													 </form>
													 <div class="row">
														 <div class="col-md-12" id="divImagenesFamilia">
														 </div>
													 </div>
													 <!-- end imagenes sliders principal -->
													 </div>
												 </div>
											 </div>
											 <!-- end -->

											 </div>
											 <div class="col-md-9" >
												 <iframe id="framePagina"  width="100%" height="700"></iframe>
											 </div>
										 </div>
									 </div>
								 </section>
							 </div>


						 </div>
						 <div id="divProceso" class="modal">
					    <div class="modal-dialog">
					      <div class="modal-content" style="background-color:#212121;border-radius:15px;">
					        <div class="modal-body" style="text-align:center">
					          <h3 id='tituloProceso' style="color:#fff;">Actualizando</h3>
					          <div class="progress progress-striped active">
					            <div class="progress-bar progress-bar-success" style="width: 100%"></div>
					          </div>
					        </div>
					      </div>
					    </div>
					  </div>

	<?php include("footer.php"); ?>
	</div>
</div>
<?php include("scripts.php"); ?>
    <script type="text/javascript">
    // $(document).ready(function(){
    //   $('#cp2').colorpicker();
    //   EnProceso();
    //   LoadImagenesPreview();
    //   EnProceso();
    //   LoadImagenesFamilias();
    //   EnProceso();
    //   LoadImagenesTendencias();
    //   EnProceso();
    //   LoadImagenHistoria();
    // })

    // function cargarPreview(){
    //   $("#preview").load("preview.php");
    // }

		function registraSliderPrincipal(){
			if (document.getElementById("FormGral").checkValidity()){
				event.preventDefault();
				var form = $("#FormGral")[0];
				var data = new FormData(form);

				$.ajax({
					type:"POST",
					url:"Backend/BanersApp/App.php",
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

		function ActualizarStatus(status,idSlidersPrincipal){
				if (status == 0) {
					var status1 ="1";
				}else {
					status1 = "0";
				}
				$.ajax({
				type:"POST",
				url:"Backend/BanersApp/App.php",
				data:"op=updateStatus"+
				"&status="+status1+"&idSlidersPrincipal="+idSlidersPrincipal,
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

	function deleteBanenrfunction(idSlidersPrincipal){

			$.ajax({
			type:"POST",
			url:"Backend/BanersApp/App.php",
			data:"op=deleteBaner"+
			"&idSlidersPrincipal="+idSlidersPrincipal,
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


function addImageCategoriafunction(){
	if (document.getElementById("FormCategorias").checkValidity()){
		event.preventDefault();
		var form = $("#FormCategorias")[0];
		var data = new FormData(form);


		$.ajax({
			type:"POST",
			url:"Backend/Categorias/App.php",
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



function onchangeimgcat(idCat){

	$("#divImgCat").load(`includeImagenCategoria.php?idCat=${idCat}`);

}

function deleteImgCategoriafunction(idCategorias){
	Swal.fire({
	title: 'Si prosigue se modificara la imagen de la categoria, ¿Desea continuar?',
	showDenyButton: true,
	confirmButtonText: 'Continuar',
	denyButtonText: 'Salir',
	showCancelButton: true,
}).then((result) => {
	/* Read more about isConfirmed, isDenied below */
	if (result.isConfirmed) {
		$.ajax({
		type:"POST",
		url:"Backend/Categorias/App.php",
		data:"op=deleteImgCategoria"+
		"&idCategorias="+idCategorias,
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
 else if (result.isDenied) {
	window.location.reload();

	return false;

}
})

}

    // $("#btnGuardaBannerGral").click(function (event) {
    //   if (document.getElementById("FormGral").checkValidity()) {
    //     event.preventDefault();
    //     if (confirm("¿Seguro que desea registrar el banner?")) {
    //       $("#tituloProceso").html("Registrando Imagen...");
    //       EnProceso();
		//
    //       var form = $('#FormGral')[0];
    //       var DataPosicion = new FormData(form);
		//
    //       DataPosicion.append("op","guardarSliderPrincipal");
    //       $.ajax({
    //         url: "backend/Layout/App.php",
    //         type: "POST",
    //         enctype: 'multipart/form-data',
    //         data: DataPosicion,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         timeout: 600000,
    //         success : function(text){
    //           text = text.trim();
    //           if (text == "1") {
    //             LoadImagenesPreview();
    //           }
    //           else {
    //             alert("Error en el registro del banner");
    //             ProcesoTerminado();
    //           }
    //         },
    //         error : function(e){
    //           alert(e.responseText);
    //           ProcesoTerminado();
    //         }
    //       }).done(function() {
    //         $("#gral").val(null);
		//
    //       });
    //     }
    //   }
    // });
    // $("#btnFamilias").click(function (event) {
    //   if (document.getElementById("FormFamilias").checkValidity()) {
    //     event.preventDefault();
    //     if (confirm("¿Seguro que desea registrar el banner de la familia?")) {
    //       $("#tituloProceso").html("Registrando Imagen...");
    //       EnProceso();
		//
    //       var form = $('#FormFamilias')[0];
    //       var DataPosicion = new FormData(form);
		//
    //       DataPosicion.append("op","guardarBannerFamilia");
    //       $.ajax({
    //         url: "backend/Layout/App.php",
    //         type: "POST",
    //         enctype: 'multipart/form-data',
    //         data: DataPosicion,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         timeout: 600000,
    //         success : function(text){
    //           text = text.trim();
    //           if (text == "1") {
    //             LoadImagenesFamilias();
    //           }
    //           else {
    //             alert("Error en el registro del banner");
    //             ProcesoTerminado();
    //           }
    //         },
    //         error : function(e){
    //           alert(e.responseText);
    //           ProcesoTerminado();
    //         }
    //       }).done(function() {
    //         $("#gral").val(null);
		//
    //       });
    //     }
    //   }
    // });
    // $("#btnTendencias").click(function (event) {
    //   if (document.getElementById("FormTendencias").checkValidity()) {
    //     event.preventDefault();
    //     if (confirm("¿Seguro que desea registrar el banner de Tendencia?")) {
    //       $("#tituloProceso").html("Registrando Imagen...");
    //       EnProceso();
		//
    //       var form = $('#FormTendencias')[0];
    //       var DataPosicion = new FormData(form);
		//
    //       DataPosicion.append("op","guardarBannerTendencia");
    //       $.ajax({
    //         url: "backend/Layout/App.php",
    //         type: "POST",
    //         enctype: 'multipart/form-data',
    //         data: DataPosicion,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         timeout: 600000,
    //         success : function(text){
    //           text = text.trim();
    //           if (text == "1") {
    //             LoadImagenesTendencias();
    //           }
    //           else {
    //             alert("Error en el registro del banner");
    //             ProcesoTerminado();
    //           }
    //         },
    //         error : function(e){
    //           alert(e.responseText);
    //           ProcesoTerminado();
    //         }
    //       }).done(function() {
    //         $("#gral").val(null);
		//
    //       });
    //     }
    //   }
    // });

    // function EliminaImagen(idSlider,banner){
    //   if (confirm("¿Seguro que deseas eliminar la imagen?")) {
    //     $("#tituloProceso").html("Eliminando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=EliminaImagenPreview"+
    //       "&idSlider="+idSlider+
    //       "&banner="+banner,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesPreview();
    //         }else{
    //           alert("error al eliminar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }
    // function EliminaImagenFamilia(idSlider,banner){
    //   if (confirm("¿Seguro que deseas eliminar la imagen?")) {
    //     $("#tituloProceso").html("Eliminando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=EliminaImagenFamilia"+
    //       "&idSlider="+idSlider+
    //       "&banner="+banner,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesFamilias();
    //         }else{
    //           alert("error al eliminar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }
    // function EliminaImagenTendencia(idSlider,banner){
    //   if (confirm("¿Seguro que deseas eliminar la imagen?")) {
    //     $("#tituloProceso").html("Eliminando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=EliminaImagenTendencia"+
    //       "&idSlider="+idSlider+
    //       "&banner="+banner,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesFamilias();
    //         }else{
    //           alert("error al eliminar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }
    // function EliminaImgHistoria(){
    //   if (confirm("¿Seguro que deseas eliminar la imagen?")) {
    //     $("#tituloProceso").html("Eliminando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=EliminaImgHistoria",
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenHistoria();
    //         }else{
    //           alert("error al eliminar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }

    // function AutorizarSlider(idSlider,status){
    //   if (status != "1") {
    //     status = "1";
    //   }else{
    //     status = "0";
    //   }
    //   if (confirm("¿Seguro que deseas cambiar el status la imagen?")) {
    //     $("#tituloProceso").html("Autorizando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=autorizarPreview"+
    //       "&idSlider="+idSlider+
    //       "&status="+status,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesPreview();
    //         }else{
    //           alert("error al autorizar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }

    // function AutorizarSliderFamilia(idSlider){
    //   if (confirm("¿Seguro que deseas autorizar el banner?")) {
    //     $("#tituloProceso").html("Autorizando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=AutorizarSliderFamilia"+
    //       "&idSlider="+idSlider,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesFamilias();
    //         }else{
    //           alert("error al autorizar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }
		//
    // function AutorizarSliderTendencia(idSlider){
    //   if (confirm("¿Seguro que deseas autorizar el banner?")) {
    //     $("#tituloProceso").html("Autorizando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=AutorizarSliderTendencia"+
    //       "&idSlider="+idSlider,
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenesTendencias();
    //         }else{
    //           alert("error al autorizar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }

    // function EnProceso(){
    //   $("#divProceso").modal({ backdrop: 'static', keyboard: false });
    // }
		//
    // function ProcesoTerminado(){
    //   $("#divProceso").modal('hide');
    // }
		//
    // function LoadImagenesPreview(){
		//
    //   $("#divImagenesPreview").load("imagenespreview.php");
    //   var framePreview = document.getElementById('framePagina');
    //   framePreview.src = "preview.php";
    //   setTimeout(function () {
    //     ProcesoTerminado();
    //   }, 2000);
    // }
		//
    // function LoadImagenesFamilias(){
		//
    //   $("div#divImagenesFamilia").load("imagenesFamiliapreview.php");
    //   var framePreview = document.getElementById('framePagina');
    //   framePreview.src = "preview.php";
    //   setTimeout(function () {
    //     ProcesoTerminado();
    //   }, 2000);
		//
    // }
		//
    // function LoadImagenesTendencias(){
    //   $("div#divImagenesTendencia").load("imagenesTendenciapreview.php");
    //   var framePreview = document.getElementById('framePagina');
    //   framePreview.src = "preview.php";
    //   setTimeout(function () {
    //     ProcesoTerminado();
    //   }, 2000);
		//
    // }
    // function LoadImagenHistoria(){
    //   $("div#divImagenHistoria").load("imagenesHistoriapreview.php");
    //   var framePreview = document.getElementById('framePagina');
    //   framePreview.src = "preview.php";
    //   setTimeout(function () {
    //     ProcesoTerminado();
    //   }, 2000);
    // }

    // $("#btnHistoria").click(function (event) {
    //   if (document.getElementById("FormHistoria").checkValidity()) {
    //     event.preventDefault();
    //     if (confirm("¿Seguro que desea registrar la imagen?")) {
    //       $("#tituloProceso").html("Registrando Imagen...");
    //       EnProceso();
		//
    //       var form = $('#FormHistoria')[0];
    //       var DataPosicion = new FormData(form);
		//
    //       DataPosicion.append("op","guardarImagenHistoria");
    //       $.ajax({
    //         url: "backend/Layout/App.php",
    //         type: "POST",
    //         enctype: 'multipart/form-data',
    //         data: DataPosicion,
    //         cache: false,
    //         processData: false,
    //         contentType: false,
    //         timeout: 600000,
    //         success : function(text){
    //           text = text.trim();
    //           if (text == "1") {
    //             LoadImagenHistoria();
    //           }
    //           else {
    //             alert("Error en el registro del banner");
    //             ProcesoTerminado();
    //           }
    //         },
    //         error : function(e){
    //           alert(e.responseText);
    //           ProcesoTerminado();
    //         }
    //       }).done(function() {
    //         $("#gral").val(null);
		//
    //       });
    //     }
    //   }
    // });
		//
    // function AutorizarImgHistoria(){
    //   if (confirm("¿Seguro que deseas autorizar la imagen?")) {
    //     $("#tituloProceso").html("Autorizando...");
    //     EnProceso();
    //     $.ajax({
    //       type: "POST",
    //       url: "backend/Layout/App.php",
    //       data: "op=AutorizarImgHistoria",
    //       success:function(data){
    //         data = data.trim();
    //         if (data == "1") {
    //           LoadImagenHistoria();
    //         }else{
    //           alert("error al autorizar la imagen");
    //           ProcesoTerminado();
    //         }
    //       },
    //       error:function(e){
    //         alert(e.responseText);
    //         ProcesoTerminado();
    //       }
    //     }).done(function() {
		//
    //     });
    //   }
    // }

    </script>
  </body>
</html>
