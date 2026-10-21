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
             <li><a class="titulo">Nuevo Paquete</a></li>
           </ol>
         </section>

         <form class="" id="formPaquetesP" action="Backend/Productos_Paquetes/App.php" method="post">
           <input type="text" name="op" id="op" value="addProductosPaquetes" style="display:none">
					 <br>
           <div class="contenedoresCuatro" style="padding:15px">
             <div class="row">
               <div class="col4 col-lg-4 text-center">
                 <h6>Paquete</h6>
                 <input type="text" name="txtPaquete" id="txtPaquete" class="form-control" placeholder="Nombre del Paquete"  required>
               </div>
               <div class="col-2 col-lg-2 text-center">
                 <h6>Paquete Corto</h6>
                 <input type="text" name="txtPaqueteC" id="txtPaqueteC" class="form-control" placeholder="Nombre Corto" required>
               </div>
               <div class="col-4 col-lg-4">
                 <h6>Descripción</h6>
                 <input type="text" name="txtDescripcion" id="txtDescripcion" placeholder="Descripción" class="form-control" required>
               </div>
							 <div class="col-1 col-lg-1">
                 <h6>No Piezas</h6>
                 <input type="number" name="txtNoPiezas" id="txtNoPiezas" placeholder="No" class="form-control" required>
               </div>
							 <div class="col-1 col-lg-1">
                 <h6>Costo</h6>
                 <input type="number" name="txtCosto" id="txtCosto" placeholder="Costo" class="form-control" required>
               </div>
             </div>
           <br>

               <div class="row">
                 <div class="col-2 col-lg-2 text-center">
                    <h6>Con cargo</h6>
                    <input type="text" name="inpConCargo" id="inpConCargo" value="0" style="display:none">
                    <input type="checkbox" name="checkConCargos" id="checkConCargos" class="form-control" onclick="clickConCargos()">
                  </div>
                  <div class="col-2 col-lg-2 text-center">
                    <h6>Sin cargo</h6>
                    <input type="text" name="inpSinCargo" id="inpSinCargo" value="1" style="display:none">
                    <input type="checkbox" name="checkSinCargos" id="checkSinCargos" class="form-control" onclick="clickSinCargos()" checked>
                  </div>
                  <div class="col-2 col-lg-2 text-center">
                    <h6 id="lblOtrosCargos"style="display:none">Otros Cargos</h6>
                    <input type="number" name="txtCargos" id="txtCargos" min="0"value="0" class="form-control" style="display:none" required>
                  </div>

                  <div class="col-2 col-lg-2">
                    <h6>Descuento</h6>
                    <input type="number" name="txtDescuento" id="txtDescuento" class="form-control" min="0"value="0" required>
                  </div>
                  <div class="col-2 col-lg-2">
                    <h6>Desde</h6>
                    <input type="date" name="inpDesde" id="inpDesde" class="form-control" required>
                  </div>
                  <div class="col-2 col-lg-2">
                    <h6>Hasta</h6>
                    <input type="date" name="inpHasta" id="inpHasta" class="form-control" required>
                  </div>
               </div>
             </div>

             <br>
             <div class="text-center">
               <h5>Productos en disponibilidad</h5>
             </div>
             <br>
             <div class="contenedoresCuatro">
              <div class="row">
                <div class="col-8 col-lg-8">
                  <select class="form-control" name="slctProducto[]" id="slctProducto" required>
                    <option value="" selected disabled> Lista de Productos </option>
                    <?php
                    require_once("Backend/ProductosApp/AdmProductosApp.php");
                    $AdmProductosApp = new AdmProductosApp();
                    $ListProductosApp = $AdmProductosApp->getListProductos();
                    for ($i=0; $i < sizeof($ListProductosApp) ; $i++) {
                      $Producto_ID = $ListProductosApp[$i]["Producto_ID"];
                      $Producto = $ListProductosApp[$i]["Producto"];
                      echo "
                      <option value='$Producto_ID'>$Producto</option>
                      ";
                    }
                     ?>
                  </select>
                </div>
                <div class="col-4 col-lg-4 text-right">
                  <button type="button" name="btnAddProducto" id="btnAddProducto" class="btn btn-outline-info" onclick="addProductosAppfunction()">Agregar Producto</button>
                </div>
              </div>
             </div>
             <hr>
             <div id="divAddProductos">

             </div>


         </form>
         <br>
         <div class="row">
           <div class="col-12 col-lg-4 offset-lg-4 text-center">
             <button type="button" name="bntAceptar" id="btnAceptar" class="btn btn-outline-info" onclick="addPaqueteProductos()" style="width:100%">Agregar Paquete</button>
           </div>
         </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      var aux = "0";
      function addProductosAppfunction(){
        aux++;
        $("#divAddProductos").append(`
          <div class='contenedoresCuatro'  id='${aux}'>
            <div class='row'>
            <div class='col-8 col-lg-8'>
              <select class='form-control' name='slctProducto[]' id='slctProducto${aux}' required>
                <option value='' selected disabled> Lista de Productos </option>
                <?php
                require_once("Backend/ProductosApp/AdmProductosApp.php");
                $AdmProductosApp2 = new AdmProductosApp();
                $ListProductosApp2 = $AdmProductosApp2->getListProductos();
                for ($i=0; $i < sizeof($ListProductosApp2) ; $i++) {
                  $Producto_ID2 = $ListProductosApp2[$i]['Producto_ID'];
                  $Producto2 = $ListProductosApp2[$i]['Producto'];
                  echo "
                  <option value='$Producto_ID2'>$Producto2</option>
                  ";
                }
                 ?>
              </select>
            </div>
            <div class="col-4 col-lg-4 text-right">
              <button type='button'  onclick="EliminarProductofunction('${aux}')" class='btn btn-outline-info' onclick=''>Eliminar Producto</button>
            </div>
          </div>
      </div>
        <hr id='hr${aux}'>
        `);
      }

      function EliminarProductofunction(id){
           $("#"+id).remove();
           $("#hr"+id).remove();
         }

         function addPaqueteProductos(){
           if (document.getElementById("formPaquetesP").checkValidity()){
       			event.preventDefault();
       			var form = $("#formPaquetesP")[0];
       			var data = new FormData(form);

       			$.ajax({
       				type:"POST",
       				url:"Backend/Productos_Paquetes/App.php",
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


         function clickConCargos(){
           if ($("#checkConCargos").is(":checked")){
             $("#inpConCargo").val("1");
             $("#inpSinCargo").val("0");
             document.getElementById("checkSinCargos").checked= false;
						 document.getElementById("txtCargos").style.display = 'block';
						 document.getElementById("lblOtrosCargos").style.display = 'block';
           }else {
             $("#inpConCargo").val("0");
             $("#inpSinCargo").val("1");
             document.getElementById("checkSinCargos").checked= true;
						 document.getElementById("txtCargos").style.display = 'none';
						document.getElementById("lblOtrosCargos").style.display = 'none';
           }
         }

         function clickSinCargos(){
           if ($("#checkSinCargos").is(":checked")){
             $("#inpConCargo").val("0");
             $("#inpSinCargo").val("1");
             document.getElementById("checkConCargos").checked= false;
						 document.getElementById("txtCargos").style.display = 'none';
						 document.getElementById("lblOtrosCargos").style.display = 'none';
						 $("#txtCargos").val("0");
           }else {
             $("#inpConCargo").val("1");
             $("#inpSinCargo").val("0");
             document.getElementById("checkConCargos").checked= true;
						 document.getElementById("txtCargos").style.display = 'block';
						 document.getElementById("lblOtrosCargos").style.display = 'block';
           }
         }
    </script>
  </body>
</html>
