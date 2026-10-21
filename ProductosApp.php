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
             <li> <a class="titulo"> Listado de Productos </a> </li>
           </ol>
         </section>

         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
               <button onclick="addProductosAppfunction('')" type="button" name="btnAgregar" id="btnAgregar" class="btn btn-outline-secondary"> Nuevo Producto</button>
             </div>
           </div>
         </div>
         <br>

         <div class="contenedores row">
           <div class="col-12 col-lg-l2">
            <div class="Table-responsive">
             <table id="ListEquiposApp" class="table text-center table-hover" style="color:black">
               <thead class="">
                 <tr>
                   <th>Categoria</th>
                   <th>Producto</th>
                   <th>Producto Corto</th>
                   <th>Descripcion</th>
                   <th>Precio Base</th>
                   <th>Activo</th>
                   <th>Editar Producto</th>
                   <th>Activar/Desactivar</th>
									 <th>Agregar Imagen</th>
                 </tr>
               </thead>
               <tbody>
                 <?php
                    require_once("Backend/ProductosApp/AdmProductosApp.php");
                    $AdmProductosApp = new AdmProductosApp();
                    $ListProductosApp = $AdmProductosApp->getProductosApp();
                    for ($i=0; $i <sizeof($ListProductosApp) ; $i++) {
                      $Producto_ID = $ListProductosApp[$i]["Producto_ID"];
                      $Categoria = $ListProductosApp[$i]["Categoria"];
                      $Producto = $ListProductosApp[$i]["Producto"];
                      $Producto_Corto = $ListProductosApp[$i]["Producto_Corto"];
                      $Precio_Base = $ListProductosApp[$i]["Precio_Base"];
                      $Descripcion = $ListProductosApp[$i]["Descripcion"];
                      $Activo = $ListProductosApp[$i]["Activo"];
                      $Imagen = $ListProductosApp[$i]["Imagen"];

											if ($Imagen != "") {
												$pathImage = "Archivos/imagenProductosApp/$Imagen";
											}else{
												$pathImage = "";
											}


                      if ($Activo == "1") {
                        $vActivo = "Activo";
                      }else {
                        $vActivo = "Inactivo";

                      }
                      echo "
                      <tr>
                        <td>$Categoria</td>
                        <td>$Producto</td>
                        <td>$Producto_Corto</td>
                        <td>$Descripcion</td>
                        <td>$Precio_Base</td>
                        <td>$vActivo</td>
                        <td>
                        <a class='btn btnIconoEdit'  onclick='addProductosAppfunction(\"$Producto_ID\");' data-toggle='tooltip' title='Editar Producto'>
                        <i class='fa fa-pencil-square fa-2x'></i>
                        </td>
                        <td>
                        <a class='btn btnIconoChange'  onclick='updateActivo(\"$Activo\",\"$Producto_ID\");' data-toggle='tooltip' title='Editar Activo'>
                        <i class='fa fa-pencil-square fa-2x'></i>
                        </td>

												<td class= 'text center'>
												<a class = 'btn btnIconViolet' onclick='abrirmodalimagen(\"$Producto_ID\",\"$pathImage\");' data-toggle='tooltip' title='Agregar Imagen'>
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
         </div>

         <!-- modal -->
        <div class="modal fade" id="ModalProductosApp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
           <div class="modal-content ">
             <div class="modal-header ">
               <h5 class="modal-title" id='TituloModal'></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body ">
               <form id="formInserta" method="post" action="Backend/ProductosApp/App.php">
                 <div class="form-group">
                   <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
                   <input type="text" class="form-control" id="idProdApp" name="idProdApp" style="display:none;">
                   <div class="row">
                     <div class="col-12 col-lg-12 text-center">
                       <h6>Categorias</h6>
                       <select class="form-control" name="selctCategorias" id="selctCategorias" required>
                         <option value="" selected disabled>Seleccione una categoria</option>
                         <?php
                         require_once("Backend/Categorias/Categorias.php");
                         $Categorias = new Categorias();
                         $ListCategorias = $Categorias->getCategoriasXProductosApp();
                         for ($i=0; $i <sizeof($ListCategorias) ; $i++) {
                           $idCategorias = $ListCategorias[$i]["idCategorias"];
                           $Descripcion = $ListCategorias[$i]["Descripcion"];

                           echo "
                           <option value='$idCategorias'> $Descripcion</option>

                           ";
                        }
                          ?>
                       </select>
                       <br>
                     </div>
                     <div class="col-8 col-lg-8 text-center">
                       <h6>Nombre</h6>
                       <input type="text" name="txtNombre" id="txtNombre" class="form-control" required>
                     </div>
                     <div class="col-4 col-lg-4 text-center">
                       <h6>Nombre Corto</h6>
                       <input type="text" name="txtNombreC" id="txtNombreC" class="form-control" required>
                       <br>
                     </div>
                     <div class="col-8 col-lg-8 text-center">
                       <h6>Descripcíon</h6>
                       <input type="text" name="txtDescripcion" id="txtDescripcion" class="form-control" required>
                     </div>
                     <div class="col-4 col-lg-4 text-center">
                       <h6>Precio</h6>
                       <input type="number" name="txtPrecio" id="txtPrecio" class="form-control" min="0" required>
                     </div>
                     <div class="col-12 text-center">
                        <hr>
                        <h5>Colorimetro Principal</h5>
                        <input type="checkbox" id="checkTypeColorP" name="checkTypeColorP" class="form-control">
                     </div>
										 <!-- El valor  -->

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

				<!-- Segundo modal  -->

         <div class="modal fade" id="ModalImagns" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog ">
	         <div class="modal-content ">
		         <div class="modal-header ">
			         <h5 class="modal-title" id='TituloModal'>Subir Imagen</h5>
			         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				         <span aria-hidden="true">&times;</span>
			         </button>
		         </div>
		         <div class="modal-body">
			         <form id="FormProductosApp" method="post" action="Backend/ProductosApp/App.php">
				         <div class="form-group">
					         <input type="text" class="form-control" id="op" name="op" value="AddImagenProducto" style="display:none;">
					         <!-- <input type="text" class="form-control" id="nptidmot" name="nptidmot" style="display:none;"> -->

					<!-- Aqui -->
					         <div class="row">
						         <div class="col-12 col-lg-12">
						<!-- Arriba -->
						         <div class="text-center">

							         <!-- <input type="text" class="form-control" id="nptmotivocanc" name="nptmotivocanc" required> -->
											<div class="row">
												<div class="col-12">
													<div id="imgProd">
														<img src="" alt="" id="imgProducto" width="100">
														<br><br>
														<h6>Imagen Actual</h6>
														<hr>
													</div>
													<br>
													<br>
													<h5 id="textoProd"></h5>
												</div>
											</div>
											<label for="recipient-name" class="col-form-label ">Subir Imagen:</label>
						         <input type="text" name="txtProducApp" id="txtProducApp" class="form-control" required style="display:none;">
										 <input type="file"class="form-control" name="nptfiles" value="BtnSubirFoto">
						         </div>
					         </div>

<!-- Aqui va el Segundo Label  -->

					         </div>
				         </div>
			         </div>
			         <br><br>
		         <div class="modal-footer">
			         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			         <button type="button" class="btn btn-primary" id="btnAgregarFoto" onclick="AddImagenProductofunction('')">Guardar Cambios</button>
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
      function addProductosAppfunction(Producto_ID){
        if (Producto_ID != "") {
          $("#TituloModal").text("Actualizar Producto");
          $("#idProdApp").val(Producto_ID);
          $("#btnguardar").text("Actualizar");
          $("#op").val("updateProductoApp");
          $.ajax({
            type:"POST",
            url:"Backend/ProductosApp/App.php",
            data:"op=getDetalleProductoApp"+
            "&Producto_ID="+Producto_ID,
            success:function(response){
              response=JSON.parse(response.trim());
              $("#selctCategorias").val(response.Productos_Categoria_Id);
              $("#txtNombre").val(response.Producto);
              $("#txtNombreC").val(response.Producto_Corto);
              $("#txtPrecio").val(response.Precio_Base);
              $("#txtDescripcion").val(response.Descripcion);
              $("#checkTypeColorP").prop("checked", response.GrupoPrincipalColorimetro == 1 ? true : false);
            },
            error:function(e){
              alert(e.responseText);
            }
          });
        }else {
       $("#TituloModal").text("Agregar Producto");
       $("#selctCategorias").val("");
       $("#txtNombre").val("");
       $("#txtNombreC").val("");
       $("#txtPrecio").val("");
       $("#txtDescripcion").val("");

       $("#btnguardar").text("Guardar");
       $("#idProdApp").val("");
       $("#checkTypeColorP").prop("checked", true);
       $("#op").val("addProductoApp");
     }
     $("#ModalProductosApp").modal("toggle");
   }

   $("#btnguardar").click(function(event){
     if (document.getElementById("formInserta").checkValidity()) {
       event.preventDefault();
       var form= $("#formInserta")[0];
       var data = new FormData(form);
       $.ajax({
         type: "POST",
         url: "Backend/ProductosApp/App.php",
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
           $("#ModalProductosApp").modal("hide");
         },
         error:function(e){
           alert(e.responseText);
         }
       });
     }else{
       Alerta("info","Faltan Datos por llenar");
     }
   });

   function updateActivo(Activo,Producto_ID){
     if (Activo == 0) {
       var Activo1 = "1";
     }else {
       Activo1 = "0";
     }
     $.ajax({
       type:"POST",
       url:"Backend/ProductosApp/App.php",
       data:"op=updateActivo"+
       "&Activo="+Activo1+"&Producto_ID="+Producto_ID,
       success: function(data){
         if(data=="1"){
           Alerta("success","Operacion exitosa");
           setTimeout(function () {
             location.reload();
           }, 1500);
         }else{
           Alerta("error","No se Realizo Correctamente");
           setTimeout(function () {
             location.reload();
           }, 1500);
         }
       },
       error:function(e){
         alert(e.responseText);
       }
     });
		  }
		 function abrirmodalimagen(Producto_ID,path){
			 if (path != "") {
			 	$('#imgProducto').attr("src", `${path}`);
				$("#textoProd").text("");
				$("#imgProd").fadeIn();
			}else{
				$("#imgProd").fadeOut();
				$("#textoProd").text("No contiene imagen el producto");

			}

			setTimeout(function () {
				$("#ModalImagns").modal("toggle");
				$('#txtProducApp').val(Producto_ID);
			}, 500);

		 }

		 function AddImagenProductofunction(){
			 if (document.getElementById("FormProductosApp").checkValidity()){
				 event.preventDefault();
				 var form = $("#FormProductosApp")[0];
				 var data = new FormData(form);


				 $.ajax({
					 type:"POST",
					 url:"Backend/ProductosApp/App.php",
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
