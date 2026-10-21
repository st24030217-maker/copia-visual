<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Ordenes/Ordenes.php");
$Ord = new Ordenes();
$ListFechas = $Ord->getFechasOrdenMaxMin();
for ($i=0; $i <sizeof($ListFechas) ; $i++) {
  $FechaMin = $ListFechas[$i]["fechaMin"];
  $FechaMax = $ListFechas[$i]["fechaMax"];
}
$primerDiaAnioAnterior = date('Y-m-d', strtotime('first day of January last year'));
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="librerias/syncfusion/css/tailwind.css">
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
             <li> <a class="titulo">LISTADO DE ORDENES</a> </li>
           </ol>
         </section>

         <div class="contenedores">
           <div class="row">
            <div class="col-6 col-lg-6 text-center">
              <input type="date" id="txtFechaIni" value="<?php echo $primerDiaAnioAnterior ?>" class="form-control" onchange="getListOrdenesJS()">
            </div>
            <div class="col-6 col-lg-6 text-center">
              <input type="date" id="txtFechaFin" value="<?php echo $FechaMax ?>" class="form-control" onchange="getListOrdenesJS()">
            </div>
           </div>
         </div>
         <br>
				 <div class="contenedores">
					 <div id="tableOrders"></div>
				 </div>
         <!-- <div id="divIncludeListOrders"></div> -->

						 <!--MODAL-->
						 <div class="modal fade" id="modalEscan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						 <div class="modal-dialog ">
							 <div class="modal-content ">
								 <div class="modal-header ">
									 <h5 class="modal-title" id='TituloModal'>Otorgar Usuario a Orden</h5>
									 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										 <span aria-hidden="true">&times;</span>
									 </button>
								 </div>
								 <div class="modal-body">
									 <form id="formInserta" method="post" action="Backend/Ordenes/App.php">
										 <div class="form-group" style="height:30px;">
											 <input type="text" class="form-control" id="op" name="op" value="OtorgarUsuarioEscanOrden" style="display:none;">
											 <input type="text" class="form-control" id="npIdOrden" name="npIdOrden" style="display:none;">
											 <!-- Aqui -->
												 <div class="row">
													<div class="col-12 col-lg-12 text-center">
														<select class="selectpicker" data-live-search="true" name="slctUsuarioEscan" style="margin-top:45px;" required>
														 <option value="">Lista de Usuarios</option>
														 <?php
															 require_once("Backend/Usuarios/Usuarios.php");
															 $Usuarios = new Usuarios();
															 $ListU = $Usuarios->getUsuariosEscaneador();
															 for ($i=0; $i <sizeof($ListU) ; $i++) {
																 $id_sys_usuario = $ListU[$i]["id_sys_usuario"];
																 $Nombre = $ListU[$i]["Nombre"];
																 echo "
																	 <option value='$id_sys_usuario'>$Nombre</option>
																 ";
															 }
																?>
														</select>
													</div>
												 </div>

										 </div>
									 </div>
									 <br><br>
								 <div class="modal-footer">
									 <button type="button" class="btn btn btn-info" id="btnguardar" onclick="OtorgarOrden('')">Otorgar Orden</button>
								 </div>
							 </form>
						</div>
					</div>
				 </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<script type="text/x-jsrender" id="btnAddDoctorTemplate">
			${btnAddDoctorSF(data)}
		</script>
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
		<script type="text/x-jsrender" id="btnGoOrderTemplate">
			${btnGoOrderSF(data)}
		</script>
    <script type="text/javascript">
			ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

			let tableOrders;
			 getListOrdenesJS();
			 async function getListOrdenesJS(){
				 let dataSend = {
					 op: "getListOrdenesJS",
					 fechaIni: $("#txtFechaIni").val(),
					 fechaFin: $("#txtFechaFin").val()
				 };
				 let ajaxR = await pAjaxAsync(url_m_Ordenes, dataSend);
				 if(ajaxR !== undefined){
					 let dataR = ajaxR.Data;
					 console.log(dataR);
					 if (tableOrders) {
					 		tableOrders.destroy();
					 }
					 var filter = {
		 				 ui: {
		 					 create: function (args) {
		 						 var flValInput = ej.base.createElement('input', {
		 							 className: 'flm-input',
		 						 });
		 						 args.target.appendChild(flValInput);
		 						 var fieldName = args.column.field;
		 						 var dropdownData = [...new Set(
		 							 tableOrders.dataSource
		 								 .map(item => item[fieldName])
		 								 .filter(value => value !== null && value !== undefined && value !== '')
		 						 )];

		 						 dropInstance = new ej.dropdowns.MultiSelect({
		 							 dataSource: ordenarMixto(dropdownData),
		 							 placeholder: 'Select a value',
		 							 popupHeight: '200px',
		 							 allowFiltering: true,
		 							 mode: 'Delimiter',
		 						 });
		 						 dropInstance.appendTo(flValInput);
		 					 },
		 					 write: function (args) {
		 						 var fieldName = args.column.field;
		 						 var filteredValue = [];
		 						 tableOrders.filterSettings.columns.forEach((item) => {
		 							 if (item.field === fieldName && item.value) {
		 								 filteredValue.push(item.value);
		 							 }
		 						 });
		 						 if (filteredValue.length > 0) {
		 							 dropInstance.value = filteredValue;
		 						 }
		 					 },
		 					 read: function (args) {
		 						 tableOrders.removeFilteredColsByField(args.column.field);
		 						 args.fltrObj.filterByColumn(
		 							 args.column.field,
		 							 args.operator,
		 							 dropInstance.value
		 						 );
		 					 },
		 				 },
		 			 };
					 tableOrders = new ej.grids.Grid({
					     dataSource: dataR,
					     allowPaging: true,
					     allowFiltering: true,
					     filterSettings: { type: 'Menu' },
					     allowTextWrap: true,
					     toolbar: ['Search'],
					     columns: [
					         { field: "Serie", headerText: "FOLIO", width: 'auto', textAlign: 'Center', filter: filter },
									 {field: "FormaPago", headerText: "FORMA PAGO", width: 'auto', textAlign: 'Center', filter: filter},
					         { field: "Con_scan", headerText: "Escan", width: 'auto', textAlign: 'Center', filter: filter },
					         { field: "Doctor", headerText: "Doctor", width: 'auto', textAlign: 'Center', filter: filter },
					         { field: "TipoDoctor", headerText: "Tipo Doctor", width: 'auto', textAlign: 'Center', filter: filter },
					         { field: "Paciente", headerText: "Paciente", width: 'auto', textAlign: 'Center', filter: filter },
					         { field: "Producto", headerText: "Producto", width: 'auto', textAlign: 'Center', filter: filter },
					         { field: "Registro", headerText: "Fecha de Compra", width: 'auto', textAlign: 'Center', filter: filter },
									 {field: "", headerText: "", template: "#btnGoOrderTemplate"},
					         { field: "", headerText: "", width: 70, textAlign: 'Center', allowFiltering: false, template: "#btnAddDoctorTemplate" },
					     ],
					 });
					 tableOrders.appendTo("#tableOrders");

				 }
			 }

			 window.btnGoOrderSF = (e) => {
		   var idDoctor = e.Doctor_id;
		   var OTbase64 = btoa(e.Ordenes_trabajo_id);
		   var Dbase64 = btoa(idDoctor);
		   var LBbase64 = btoa("ListOrdenes.php");

		   let div = document.createElement('div');
		   let btn = `
		     <button class="btn btnEtiqueta" type="button"
		       onclick="window.location.href='OrdenTrabajo.php?OT=${OTbase64}&LB=${LBbase64}&from=Ordenes'">
		       <i class="fa fa-tooth fa-2x"></i>
		     </button>`;

		   $(div).append(btn);
		   return div.outerHTML;
		 }


			 window.btnAddDoctorSF = function(e){
				 let div = document.createElement("div");
				 let btn = `<button type="button" class="btn-actionBlue1" onclick="AbrirModalUsuarioEscan('${e.Ordenes_trabajo_id}')">
				 							<i class="fa fa-user-plus"></i>
				 						</button>`;
				 $(div).append(btn);
				 return div.outerHTML;
			 }

			 function ordenarMixto(arreglo) {
			 	arreglo = arreglo.map(item => {
			 		return !isNaN(item) && typeof item === 'string' ? Number(item) : item;
			 	});
			 	arreglo.sort((a, b) => {
			 		if (typeof a === 'number' && typeof b === 'number') {
			 			return a - b;
			 		}
			 		if (typeof a === 'string' && typeof b === 'string') {
			 			return a.localeCompare(b);
			 		}
			 		return (typeof a === 'number') ? -1 : 1;
			 	});
			 	return arreglo;
			 }
      // function includeListOrders(val){
      //   var VIni = $("#txtFechaIni").val();
      //   var VFin = val;
			//
      //   $("#divIncludeListOrders").load(`includeListOrdenes.php?ValorIni=${VIni}&ValorFin=${VFin}`);
      // }
			//
      // function includeListOrdersIni(val){
      //   var VIni = val;
      //   var VFin = $("#txtFechaFin").val();
			//
      //   $("#divIncludeListOrders").load(`includeListOrdenes.php?ValorIni=${VIni}&ValorFin=${VFin}`);
      // }

	// 		function buscarSelect(){
	// // creamos un variable que hace referencia al select
	// 		var select=document.getElementById("elementos");
	//
	// 		// obtenemos el valor a buscar
	// 		var buscar=document.getElementById("buscar").value;
	//
	// 		// recorremos todos los valores del select
	// 		for(var i=1;i<select.length;i++)
	// 		{
	// 			if(select.options[i].text==buscar)
	// 			{
	// 				// seleccionamos el valor que coincide
	// 				select.selectedIndex=i;
	// 			}
	// 		}
	// 	}

		function AbrirModalUsuarioEscan(idOrden){
			$("#npIdOrden").val(idOrden);
			$("#")
			$("#modalEscan").modal("toggle");
		}

		function OtorgarOrden(){
			if (document.getElementById("formInserta").checkValidity()){
				event.preventDefault();
				var form = $("#formInserta")[0];
				var data = new FormData(form);

				$.ajax({
					type:"POST",
					url:"Backend/Ordenes/App.php",
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
	// 	$('.selectpicker').selectpicker({
  //   style: 'btn-default'
  // });
    </script>
  </body>
</html>
