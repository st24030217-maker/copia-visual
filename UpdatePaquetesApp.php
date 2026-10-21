<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$IdPaquete = $_GET["Productos_Paquetes_Id"] ?? "";
require_once("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
$AdmProductos_Paquetes = new AdmProductos_Paquetes();
$DetallePaquete = $AdmProductos_Paquetes->getDetallePaquete($IdPaquete);
for ($i=0; $i <sizeof($DetallePaquete) ; $i++) {
  $Paquete = $DetallePaquete[$i]["Paquete"];
  $Paquete_Corto = $DetallePaquete[$i]["Paquete_Corto"];
	$Otros_Cargos = $DetallePaquete[$i]["Otros_Cargos"];
  $Con_Cargo = $DetallePaquete[$i]["Con_Cargo"];
  $Sin_Cargo = $DetallePaquete[$i]["Sin_Cargo"];
	$Pz_Total = $DetallePaquete[$i]["Pz_Total"];
	$Costo = $DetallePaquete[$i]["Costo"];
  $Descuento = $DetallePaquete[$i]["Descuento"];
  $Descripcion = $DetallePaquete[$i]["Descripcion"];
  $Desde = $DetallePaquete[$i]["Desde"];
  $Hasta = $DetallePaquete[$i]["Hasta"];
	$Productos_Paquetes_Incluidos_Id = $DetallePaquete[$i]["Productos_Paquetes_Incluidos_Id"];
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
             <li><a class="titulo">Actualizar Paquete</a></li>
           </ol>
         </section>

         <form class="" id="formPaquetesP" action="Backend/Productos_Paquetes/App.php" method="post" class="padding:10px">
           <input type="text" name="op" id="op" value="updatePaqueteProductos" style="display:none">
           <input type="text" name="txtIdPaquete" id="txtIdPaquete" value="<?php echo $IdPaquete ?>" style='display:none'>
					 <br>
           <div class="contenedoresCuatro "style="padding:15px">
             <div class="row">
               <div class="col4 col-lg-4 text-center">
                 <h6>Paquete</h6>
                 <input type="text" name="txtPaquete" id="txtPaquete" class="form-control" placeholder="Nombre del Paquete"
                  value="<?php echo $Paquete ?>"required>
               </div>
               <div class="col-2 col-lg-2 text-center">
                 <h6>Paquete Corto</h6>
                 <input type="text" name="txtPaqueteC" id="txtPaqueteC" class="form-control" placeholder="Nombre Corto"
								 value="<?php echo $Paquete_Corto ?>"required>
               </div>
               <div class="col-4 col-lg-4">
                 <h6>Descripción</h6>
                 <input type="text" name="txtDescripcion" id="txtDescripcion" placeholder="Descripción" class="form-control"
								 value="<?php echo $Descripcion ?>"required>
               </div>
							 <div class="col-1 col-lg-1">
                 <h6>No Piezas</h6>
                 <input type="number" name="txtNoPiezas" id="txtNoPiezas" placeholder="No" class="form-control" required value="<?php echo $Pz_Total ?>">
               </div>
							 <div class="col-1 col-lg-1">
                 <h6>Costo</h6>
                 <input type="number" name="txtCosto" id="txtCosto" placeholder="Costo" class="form-control" required value="<?php echo $Costo ?>">
               </div>
             </div>
						 <br>
               <div class="row">
                 <div class="col-2 col-lg-2 text-center">
									 <?php
									 if ($Con_Cargo == "1") {
											$check = "checked";

									 }else {
									 		$display = "display:none";
									 }
									 echo "
									 <h6>Con cargo</h6>
									 <input type='text' name='inpConCargo' id='inpConCargo' value='$Con_Cargo'style='display:none' >
									 <input type='checkbox' name='checkConCargos' id='checkConCargos' class='form-control' onclick='clickConCargos()' $check>
									 ";
										?>

                  </div>
                  <div class="col-2 col-lg-2 text-center">
										<?php
										if ($Sin_Cargo == "1") {
											$check2 = "checked";
										}
										echo "
										<h6>Sin cargo</h6>
										<input type='text' name='inpSinCargo' id='inpSinCargo' value='$Sin_Cargo'style='display:none' >
										<input type='checkbox' name='checkSinCargos' id='checkSinCargos' class='form-control' onclick='clickSinCargos()' $check2>
										";
										 ?>

                  </div>
                  <div class="col-2 col-lg-2 text-center">
										<?php
										echo "
										<h6 id='lblOtrosCargos'style='$display''>Otros Cargos</h6>
										<input type='number' name='txtCargos' id='txtCargos' min='0'value='$Otros_Cargos' class='form-control' style='$display'required>
										";
										 ?>

                  </div>

                  <div class="col-2 col-lg-2">
                    <h6>Descuento</h6>
                    <input type="number" name="txtDescuento" id="txtDescuento" class="form-control" min="0"value="<?php echo $Descuento ?>" required>
                  </div>
                  <div class="col-2 col-lg-2">
                    <h6>Desde</h6>
                    <input type="date" name="inpDesde" id="inpDesde" class="form-control" required value="<?php echo $Desde ?>">
                  </div>
                  <div class="col-2 col-lg-2">
                    <h6>Hasta</h6>
                    <input type="date" name="inpHasta" id="inpHasta" class="form-control" required value="<?php echo $Hasta ?>">
										<br>
                  </div>
									<div class="col-12 col-lg-12">
										<hr>

									</div>
									<div class="col-12 col-lg-12 text-right">
										<button type="button" name="btnAddLista" id="btnAddLista" class="btn btn-outline-info" onclick="mostrarDivsListProductos()">Agregar a la lista</button>
										<button type="button" name="bntAceptar" id="btnAceptar" class="btn btn-outline-info" onclick="updatePaqueteProductos()">Aceptar Actualizacion</button>
									</div>
               </div>
             </div>

             <br>
             <div class="text-center" id="h3ProductosDisp"  style="display:none">
               <h5>Productos en disponibilidad</h5>
             </div>
             <br>
             <div class="contenedoresCuatro"id="divListProductos" style="display:none">
              <div class="row">
                <div class="col-8 col-lg-8">
                  <select class="form-control" name="slctProducto[]" id="slctProducto" >
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

				 <div class="col-12 col-lg-12 text-center contenedoresCuatro">
					<h5>Listado de Productos en el Paquete actual</h5>
					<div class="contenedores">
						<div class="table-responsive">
						<table id="nombre" class="table text-center table-hover" style="color:black;">
							<thead>
								<tr>
									<th>Producto</th>
									<th>Producto Corto</th>
									<th></th>
								</tr>
							</thead>
							<tbody>

								<?php
									 require_once ("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
									 $AdmProductos_Paquetes2 = new AdmProductos_Paquetes();
									 $ListPaquetes2= $AdmProductos_Paquetes2->getDetalleProductosXPaquete($IdPaquete);
									 for($i = 0; $i < sizeof($ListPaquetes2); $i++){
									 $Productos_Paquetes_Incluidos_Id = $ListPaquetes2[$i]["Productos_Paquetes_Incluidos_Id"];
									 $Producto2 = $ListPaquetes2[$i]["Producto"];
									 $Producto_Corto2 = $ListPaquetes2[$i]["Producto_Corto"];

									 echo "
										 <tr>
										 <td>$Producto2</td>
										 <td>$Producto_Corto2</td>


										 <td class='text-center'>
											 <button class='btn btnIconDelete'  onclick='eliminarProducto(\"$Productos_Paquetes_Incluidos_Id\");' data-toggle='tooltip' title='Eliminar Prducto'>
											 <i class='fa fa-trash fa-2x'></i>
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
				 <br>
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
              <select class='form-control' name='slctProducto[]' id='slctProducto${aux}' >
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

         function updatePaqueteProductos(){
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
								console.log(data);
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


				 function eliminarProducto(Productos_Paquetes_Incluidos_Id){
					 Swal.fire({
					 title: 'Si prosigue se eliminara el producto del paquete, ¿Desea continuar?',
					 showDenyButton: true,
					 confirmButtonText: 'Continuar',
					 denyButtonText: 'Salir',
					 showCancelButton: true,
					}).then((result) => {
					 /* Read more about isConfirmed, isDenied below */
					 if (result.isConfirmed) {
						 $.ajax({
						 type:"POST",
						 url:"Backend/Productos_Paquetes/App.php",
						 data:"op=elimiarProductoPaquete"+
						 "&Productos_Paquetes_Incluidos_Id="+Productos_Paquetes_Incluidos_Id,
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
				 } else if (result.isDenied) {
				 	window.location.reload();

				 	return false;

				 }
				 })

				 }

				 function mostrarDivsListProductos(){
					 document.getElementById("h3ProductosDisp").style.display = 'block';
					 document.getElementById("divListProductos").style.display = 'block';

				 }
    </script>
  </body>
</html>
