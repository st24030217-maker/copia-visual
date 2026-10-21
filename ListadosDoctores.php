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

	.e-toolbar .e-toolbar-items.e-tbar-pos {
	    display: block;
	    height: 60px;
	}
	div::-webkit-scrollbar {
	width: 5px;
	height: 8px;           /* width of the entire scrollbar */
	}

	div::-webkit-scrollbar-track {
	background: transparent;
	/* border: 0.5px solid #40C1CA; */
	border-radius:7px;     /* color of the tracking area */
	}

	div::-webkit-scrollbar-thumb {
	background-color: #B6B6B6;    /* color of the scroll thumb */
	border-radius: 20px;        /* creates padding around scroll thumb */
	}
  .header{
    position:sticky;
    top: 0 ;
    background-color: black;
    color: white;
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
            <li> <a class="titulo"> Listado de doctores </a> </li>
          </ol>
        </section>
				<div class="contenedoresMenuIndexOT" style="padding:10px;">
					<div class="row">
						<!-- <div class="col-12 col-lg-6 offset-lg-3">
							<div class='inner-addon right-addon'>
	              <div id='Icono' class='icono-inp'>
	                <i class="fa fa-search" style="color:#000000;"></i>
	              </div>
					 			<input type="text" class="form-control text-center" onkeyup="Busqueda();"  style="border-radius:5px" placeholder="Introduzca algún dato del doctor a buscar" name="nptBuscar" id="nptBuscar" value="">
							</div>
						</div> -->
						<div class="col-12 col-lg-3 offset-lg-9">
							<button type="button" id="btn_exportEx" class="btn btn-success"><i class="fas fa-file-excel"></i> EXCEL EXTERNOS</button>
						</div>
						<!-- <div class="col-12 col-lg-3 text-lg-right">
							<button type="button" class="btn btn-outline-info" name="button" onclick="window.location.href='newDoctorVendedor.php?IdVendedor=0'"> <i class="fa fa-plus"></i> Nuevo doctor</button>
						</div> -->
					</div>
				</div>
				<br>
				 <div class="contenedores" style="padding:10px;">
					 <div id="tableSF"></div>
					 <!-- <div class="table-responsive">
             <table class="table table-hover" id="tableDoctores">
               <thead>
                 <th class="">Doctor</th>
                 <th class="">Celular</th>
                 <th class="">Mail</th>
                 <th class="">Vendedor</th>
                 <th class="">Nota</th>
                 <th class="">Clinica</th>
                 <th class="">Editar</th>
                 <th class="">Activo</th>
                 <th class="">Externo</th>
								 <th>Pacientes</th>
								 <th class="">Comprar Paquete</th>
               </thead>
             </table>
					 </div> -->
				 </div>
        </div>
				<div class="modal fade" id="ModalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-md">
					 <div class="modal-content ">
						 <div class=" text-center">
							 <br>
							 <h4 class="modal-title" style="color:black;" id="titleModal"></h4>
							 <hr>
						 </div>
						 <div class="modal-body ">
							 <form id="FormAgendar" method="post" action="Backend/DentLab/App.php">
								 <div class="form-group">
									 <input type="hidden" class="form-control" id="op" name="op">
									 <input type="hidden" class="form-control" id="idDoctor" name="idDoctor">
									 <div class="row">
										 <div class="col-12 col-lg-4" style="margin-top:10px;text-align:center;">
											 <h6>Nombre</h6>
											 <input type="text" class="form-control text-center" name="nptNombre" id="nptNombre" value="">
										 </div>
										 <div class="col-12 col-lg-4" style="margin-top:10px;text-align:center;">
											 <h6>Apellido Paterno</h6>
											 <input type="text" class="form-control text-center" name="nptAp" id="nptAp" value="">
										 </div>
										 <div class="col-12 col-lg-4" style="margin-top:10px;text-align:center;">
											 <h6>Apellido Materno</h6>
											 <input type="text" class="form-control text-center" name="nptAm" id="nptAm" value="">
										 </div>
										 <div class="col-12 col-lg-12" style="margin-top:20px;text-align:center;">
											 <h6>Vendedor</h6>
											 <select class="form-control text-center" name="slcVendedores" id="slcVendedores">

											 </select>
										 </div>
										 <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
											 <h6>Clinica</h6>
											 <input type="text" class="form-control text-center" name="nptClin" id="nptClin" value="">
										 </div>
										 <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
											 <h6>Mail</h6>
											 <input type="text" class="form-control text-center" name="nptMail" id="nptMail" value="" placeholder="@">
										 </div>
										 <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
											 <h6>Celular</h6>
											 <input type="number" class="form-control text-center" name="nptCel" id="nptCel" value="">
										 </div>
										 <div class="col-12 col-lg-6" style="margin-top:10px;text-align:center;">
											 <h6>Telefono</h6>
											 <input type="number" class="form-control text-center" name="nptTel" id="nptTel" value="">
										 </div>
										 <div class="col-12 col-lg-12" style="margin-top:10px;text-align:center;">
											 <h6>Nota</h6>
											 <textarea name="txtNota" class="form-control" rows="4" cols="80" id="txtNota"></textarea>
										 </div>

									 </div>
									 <br>
								 </div>
							 </form>
						 </div>
						 <div class="modal-footer">
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
							 <button type="button" class="btn btn-info" id="btnguardar" onclick="UpdateDoctor()">Guardar cambio</button>
						 </div>
					 </div>
				 </div>
				</div>
      <?php include("footer.php"); ?>
      </div>
			<script type="x/js-render" id="doctorTemplate">
				${doctorSF(data)}
			</script>
			<script type="x/js-render" id="noteTemplate">
				${noteSF(data)}
			</script>
			<script type="x/js-render" id="clinicNameTemplate">
				${clinicNameSF(data)}
			</script>
			<script type="x/js-render" id="btnEditTemplate">
				${btnEditSF(data)}
			</script>
			<script type="x/js-render" id="inpUpdateStatusTemplate">
				${inpUpdateStatusSF(data)}
			</script>
			<script type="x/js-render" id="inpExternalTemplate">
				${inpExternalSF(data)}
			</script>
			<script type="x/js-render" id="btnPatientsTemplate">
				${btnPatientsSF(data)}
			</script>
			<script type="x/js-render" id="btnAddBoxTemplate">
				${btnAddBoxSF(data)}
			</script>
		<?php include("scripts.php"); ?>
		<script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script>
		<script type="text/javascript">
		ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');
		let tableSF;
    // var tableDoctores = $('#tableDoctores').dataTable({
    //   "language": {
    //     "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    //     "zeroRecords": "NO HAY DOCTORES POR MOSTRAR",
    //     "info": "PÁGINA _PAGE_ DE _PAGES_",
    //     "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
    //     "infoFiltered": "",
    //     "search": "BUSCAR"
    //   },
    //   "columnDefs": [{
    //     "className": "dt-center", "targets": "_all"
    //   }],
    //   "order": [],
    //   "bSort": false,
    //   "bPaginate":false,
    //   "bFilter": false,
    //   "bInfo":false,
    // });

		GetDoctores();

    function Busqueda(){
      const TablaRenglon = document.getElementById('tableDoctores');
      const TextoBusqueda = document.getElementById('nptBuscar').value.toLowerCase();
      let total = 0;
      for (let i = 1; i < TablaRenglon.rows.length; i++) {
          let found = false;
          const cellsOfRow = TablaRenglon.rows[i].getElementsByTagName('td');
          for (let j = 0; j < cellsOfRow.length && !found; j++) {
              const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
               if (TextoBusqueda.length == 0 || compareWith.indexOf(TextoBusqueda) > -1) {
                   found = true;
                   total++;
               }
           }
           if (found) {
               TablaRenglon.rows[i].style.display = '';
           } else {
               TablaRenglon.rows[i].style.display = 'none';
           }
       }
    }

function GetDoctores(){
	$.ajax({
		type:"POST",
		url:"Backend/DentLab/App.php",
		data:"op=getDoctores",
		success:function(response){
			response = JSON.parse(response.trim());

			if (tableSF) {
				tableSF.destroy();
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
							 tableSF.dataSource
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
						 tableSF.filterSettings.columns.forEach((item) => {
							 if (item.field === fieldName && item.value) {
								 filteredValue.push(item.value);
							 }
						 });
						 if (filteredValue.length > 0) {
							 dropInstance.value = filteredValue;
						 }
					 },
					 read: function (args) {
						 tableSF.removeFilteredColsByField(args.column.field);
						 args.fltrObj.filterByColumn(
							 args.column.field,
							 args.operator,
							 dropInstance.value
						 );
					 },
				 },
			 };
			tableSF = new ej.grids.Grid({
				height: "65vh",
				dataSource: response,
				allowSorting: true,
				// enableVirtualization: true,
				allowFiltering: true,
				allowTextWrap: true,
				allowResizing: true,
				allowGrouping: true,
				showColumnChooser: true,
				toolbar: ['Print', 'PdfExport', 'ExcelExport', 'ColumnChooser','Search'],
				allowPdfExport: true,
				allowExcelExport: true,
				filterSettings: { type:'Menu' },
				columns: [
					{field: "Nombre", headerText: "DOCTOR", template: "#doctorTemplate", width: 100, filter: filter},
					{field: "Celular", headerText: "CELULAR", width: 100, filter: filter},
					{field: "Email", headerText: "MAIL", width: 100, filter: filter},
					{field: "Vendedor", headerText: "VENDEDOR", width: 100, filter: filter},
					{field: "GrupoVendedor", headerText: "GRUPO VENDEDOR", width: 100, filter: filter},
					{field: "Notas", headerText: "NOTA", template: "#noteTemplate", width: 70, filter: filter},
					{field: "Clinica", headerText: "CLINICA", template: "#clinicNameTemplate", width: 70, filter: filter},
					{field: "txExterno", headerText: "TIPO DOCTOR", width: 100, filter: filter},
					{field: "", headerText: "EDITAR", template: "#btnEditTemplate", width: 60, allowFiltering: false},
					{field: "", headerText: "ACTIVO", template: "#inpUpdateStatusTemplate", width: 60, allowFiltering: false},
					{field: "", headerText: "PACIENTES", template: "#btnPatientsTemplate", width: 60, allowFiltering: false},
					{field: "", headerText: "NUEVO PAQUETE", template: "#btnAddBoxTemplate", width: 60, allowFiltering: false},
				]
			});
			tableSF.appendTo("#tableSF");
			tableSF.toolbarClick = function(args){
			 if (args['item'].id === "tableSF_pdfexport") {
				 let exportProperties = {
						fileName:"ListadoDoctores.pdf"
				 };
				 tableSF.pdfExport(exportProperties);
			 } else if (args['item'].id === "tableSF_excelexport") {
				 let exportProperties = {
						fileName:"ListadoDoctores.xlsx"
				 };
				 tableSF.excelExport(exportProperties);
			 }
		 }
		},error:function(e){
			toastr.error(e.responseText,"ERROR 500");
		}
	})
}

// window.addEventListener('scroll', function () {
//     tableSF.refresh();
// });


window.doctorSF = (e) => {
	let div = document.createElement('div');
	let ele = `<a href="Doctor.php?d=${btoa(e.idDoctores)}" style="color:#40C1CA">${e.Nombre}</a>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.noteSF = (e) => {
	let div = document.createElement('div');
	let ele = `<span>${e.Notas == '' ? 'SIN NOTA': e.Notas}</span>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.clinicNameSF = (e) => {
	let div = document.createElement('div');
	let ele = `<span>${e.Clinica == '' ? 'NO ASIGNADA': e.Clinica}</span>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.btnEditSF = (e) => {
	let div = document.createElement('div');
	let ele = `<button type="button" class="btn btnEtiqueta" onclick="ModalEditar('${e.idDoctores}','${e.Nombre}','${e.Vendedor_Id}',
	'${e.Doctor}','${e.ApellidoPaterno}','${e.ApellidoMaterno}','${e.Clinica}',
	'${e.Email}','${e.Celular}','${e.Telefono}','${e.Notas}')"><i class="fa fa-user-edit"></i></button>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.inpUpdateStatusSF = (e) => {
	let div = document.createElement('div');
	let ele = `<label class='switch' onclick="">
			<input type='checkbox' ${e.Activo == 1 ? 'checked' : ''} onclick="actualizarStatusDoctor('${e.idDoctores}','${e.Activo}')">
			<span class='slider round'></span>
		</label>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.inpExternalSF = (e) => {
	let div = document.createElement('div');
	let ele = `<label class='switch' onclick="">
			<input type='checkbox' ${e.Externo == 1 ? 'checked' : ''} disabled>
			<span class='slider round'></span>
		</label>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.btnPatientsSF = (e) => {
	let div = document.createElement('div');
	let ele = `<button type="button" class="btn btnEtiqueta" onclick="irAPacientes('${e.idDoctores}')"><i class="fas fa-user-alt"></i></button>`;
	$(div).append(ele);
	return div.outerHTML;
}
window.btnAddBoxSF = (e) => {
	let div = document.createElement('div');
	let ele = `<button type="button" class="btn btnEtiqueta" onclick="IrComprarPaquete('${e.idDoctores}')"><i class="fab fa-shopify"></i></button>`;
	$(div).append(ele);
	return div.outerHTML;
}

		 $(document).on("click", "#btn_exportEx", async function(){
			 getDataDoctorsExportEx();
		 });

		 const getDataDoctorsExportEx = async  () => {
			 let ajaxR = await pAjaxAsync("Backend/Doctores/App.php", {
				 op: "getDataDoctorsExportEx"
			 });
			 if (!!ajaxR) {
				 exportarExcel(ajaxR.Data);
			 }
		 }
		 function exportarExcel(data) {
          // Reordenar las columnas (nombre, ciudad, edad) antes de convertir a sheet
          const dataOrdenada = ordenarColumnas(data);

          // Convertir el objeto en una hoja de trabajo (worksheet)
          const ws = XLSX.utils.json_to_sheet(dataOrdenada);

          // Crear un libro de trabajo (workbook)
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Datos');

          // Exportar el archivo Excel
          XLSX.writeFile(wb, 'DoctoresLaboratorio.xlsx');
      }

			function ordenarColumnas(data) {
					return data.map(item => ({
							Doctor: item.Doctor,
							Cell: item.Cell,
					}));
			}

		 function irAPacientes(idDoctor){
			 window.location.href=`Pacientes.php?idDoctor=${idDoctor}`;
		 }
		 function getVendedores(id_vendedor){
			 $("#slcVendedores").html("");
			 $.ajax({
				 type:"POST",
				 url:"Backend/DentLab/App.php",
				 data:"op=getVendedores",
				 success:function(response){
					 response = JSON.parse(response.trim());
					 $("#slcVendedores").append(`<option value = "" selected disabled>Selecciona un vendedor</option>`)
					 var prop = "";
					 for (var i = 0; i < response.length; i++) {
						 if (response[i]["id_sys_usuario"] == id_vendedor) {
						 	 prop = "selected";
						 }
					 	$("#slcVendedores").append(`<option value = "${response[i]["id_sys_usuario"]}" ${prop}>${response[i]["Nombre"]}</option>`);
					 }
				 },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
			 })
		 }

		 function ModalEditar(idDoctor,dr,id_vend,nombre,ApellidoP,ApellidoM,Clinica,Email,Celular,Telefono,Notas){
			 $("#titleModal").text(dr);
			 $("#op").val("UpdateDoctor");
			 $("#idDoctor").val(idDoctor);

			 $("#nptNombre").val(nombre);
			 $("#nptAp").val(ApellidoP);
			 $("#nptAm").val(ApellidoM);
			 $("#nptClin").val(Clinica);
			 getVendedores(id_vend)
			 $("#nptMail").val(Email);
			 $("#nptCel").val(Celular);
			 $("#nptTel").val(Telefono);
			 $("#txtNota").text(Notas);


			 $("#ModalEditar").modal('toggle');
		 }

		 function UpdateDoctor(){
			 var opcion  = $("#op").val();
			 var idDoctor  = $("#idDoctor").val();
			 var Doctor  = $("#nptNombre").val();
			 var ApellidoPaterno  = $("#nptAp").val();
			 var ApellidoMaterno  = $("#nptAm").val();
			 var Email  = $("#nptMail").val();
			 var Clinica  = $("#nptClin").val();
			 var Notas  = $("#txtNota").val();
			 var Telefono  = $("#nptTel").val();
			 var Celular = $("#nptCel").val();
			 var Vendedor_Id = $("#slcVendedores").val();
			 var datasend = {
				 op:opcion,
				 idDoctor:idDoctor,
				 Doctor:Doctor,
				 ApellidoPaterno:ApellidoPaterno,
				 ApellidoMaterno:ApellidoMaterno,
				 Email:Email,
				 Clinica:Clinica,
				 Notas:Notas,
				 Telefono:Telefono,
				 Celular:Celular,
				 Vendedor_Id:Vendedor_Id
			 }
			 $.ajax({
				 type:"POST",
				 url:"Backend/DentLab/App.php",
				 data:datasend,
				 success:function(data){
					 if (data == "1") {
					 		toastr.success("Petición exitosa","ÉXITO");
							setTimeout(function () {
								location.reload();
							}, 1500);
					 }else {
					 		toastr.warning("Algo salio mal... intentalo de nuevo","WARNING");
					 }
					  $("#ModalEditar").modal('hide');
				 },error:function(e){
					 toastr.error(e.responseText,"ERROR 500");
				 }
			 })
		 }

		 function actualizarStatusDoctor(IdDoctor,Activo){
			 if (Activo == "1") {
			 	var varActivo = "0";
			}else if (Activo == "0") {
				var varActivo = "1";
			}
				Swal.fire({
				  title: '¿Está usted seguro de que desea deshabilitar a este doctor?',
				  showDenyButton: true,
				  confirmButtonText: 'Deshabilitar doctor',
				  denyButtonText: `Cancelar`,
				}).then((result) => {
				  /* Read more about isConfirmed, isDenied below */
				  if (result.isConfirmed) {
						$.ajax({
							type: "POST",
							url : "Backend/DentLab/App.php",
							data: "op=updateStatusDoctor"+"&IdDoctor="+IdDoctor+"&varActivo="+varActivo,
							success:function(response){
								if (response == "1") {
									toastr.success("Petición exitosa","ÉXITO");
									setTimeout(function () {
										GetDoctores();
									}, 1500);
								}else {
									toastr.warning("Algo salio mal... intentalo de nuevo","WARNING");
								}
							},error:function(e){
								toastr.error(e.responseText,"ERROR 500");
							}
						});
				  } else if (result.isDenied) {
				    // Swal.fire('Changes are not saved', '', 'info')
						GetDoctores();
						return false;
				  }
				})
		 }

		 function IrComprarPaquete (valor) {
		 window.location.href=`ShopPaquetes.php?IdDoctor=${valor}`;
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
		</script>
  </body>
</html>
