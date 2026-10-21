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
            <div class="col-12 col-lg-6">
              <select class="form-control" id="slctVendedor" onchange="GetDoctores()">
              </select>
            </div>
						<div class="col-12 col-lg-6">
							<div class='inner-addon right-addon'>
	              <div id='Icono' class='icono-inp'>
	                <i class="fa fa-search" style="color:#000000;"></i>
	              </div>
					 			<input type="text" class="form-control text-center" onkeyup="Busqueda();"  style="border-radius:5px" placeholder="Introduzca algún dato del doctor a buscar" name="nptBuscar" id="nptBuscar" value="">
							</div>
						</div>
						<!-- <div class="col-12 col-lg-3 text-lg-right">
							<button type="button" class="btn btn-outline-info" name="button" onclick="window.location.href='newDoctorVendedor.php?IdVendedor=0'"> <i class="fa fa-plus"></i> Nuevo doctor</button>
						</div> -->
					</div>
				</div>
				<br>
				 <div class="contenedores" style="padding:10px;">
					 <div class="table-responsive">
             <table class="table table-hover" id="tableDoctores">
               <thead>
                 <th class="">Doctor</th>
                 <th class="">Celular</th>
                 <th class="">Mail</th>
                 <th class="">Vendedor</th>
                 <th class="">Nota</th>
                 <th>Ver Ordenes</th>
                 <th>Ver Paquetes Activos</th>
               </thead>
             </table>
					 </div>
				 </div>

         <div class="modal" tabindex="-1" role="dialog" id="ModalOrdenes">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Listado de Ordenes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="table-responsive">
                 <table class="table text-center table-hover" style="color:black;" id="tableOrdenesC">
                  <thead>
                   <tr>
                     <th>SERIE</th>
                     <th>PRODUCTO</th>
                     <th>COLORIMETRO</th>
                     <th>CANT PIEZAS</th>
                     <th>ENTREGA SOLICITADA</th>
                   </tr>
                  </thead>
                 </table>
               </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" tabindex="-1" role="dialog" id="ModalPaquetes">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Listado de Paquetes</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="table-responsive">
               <table class="table text-center table-hover" style="color:black;" id="tablePaquetesC">
                <thead>
                 <tr>
                   <th>SERIE</th>
                   <th>PAQUETE</th>
                   <th>CANTIDAD</th>
                   <th>DISPONIBLE</th>
                 </tr>
                </thead>
               </table>
             </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
       </div>

        </div>

      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">
    $(document).ready(function(){
      getVendedores();
    })
    var tableDoctores = $('#tableDoctores').dataTable({
      "language": {
        "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
        "zeroRecords": "NO HAY DOCTORES POR MOSTRAR",
        "info": "PÁGINA _PAGE_ DE _PAGES_",
        "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
        "infoFiltered": "",
        "search": "BUSCAR"
      },
      "columnDefs": [{
        "className": "dt-center", "targets": "_all"
      }],
      "order": [],
      "bSort": false,
      "bPaginate":false,
      "bFilter": false,
      "bInfo":false,
    });

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
       var IdVend = $("#slctVendedor").val();
       $.ajax({
         type:"POST",
         url:"Backend/DentLab/App.php",
         data:"op=getDoctoresVend"+
         "&IdVend="+IdVend,
         success:function(response){
           response = JSON.parse(response.trim());
           tableDoctores.fnClearTable();
           for (var i = 0; i < response.length; i++) {
						 var idDoctor = btoa(response[i]["idDoctores"]);
						 var propAct = "";
						 var propExt = "";
						 if (response[i]["Activo"] == 1) {
						 		propAct = "checked";
						 }

						 if (response[i]["Externo"] == 1) {
						 		propExt = "checked";
						 }

             tableDoctores.fnAddData([
							 `<a href="DetalleDoctor.php?d=${idDoctor}" style="color:#40C1CA">${response[i]["Nombre"]}</a>`,
               response[i]["Celular"],
               response[i]["Email"],
							 response[i]['Vendedor'],
							 response[i]['Notas'] == "" ? "SIN NOTA" : response[i]['Notas'],
               `<button type="button" class="btn btnEtiqueta" onclick="getOrdenesClienteVend('${response[i]["idDoctores"]}')"><i class="far fa-clipboard"></i></button>`,
               `<button type="button" class="btn btnEtiqueta" onclick="getPaquetesClienteVend('${response[i]["idDoctores"]}')"><i class="fas fa-shopping-bag"></i></button>`
               ]);
           }
         },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
       })
     }

		 function irAPacientes(idDoctor){
			 window.location.href=`Pacientes.php?idDoctor=${idDoctor}`;
		 }
		 function getVendedores(){
			 $("#slctVendedor").html("");
			 $.ajax({
				 type:"POST",
				 url:"Backend/DentLab/App.php",
				 data:"op=getVendedores",
				 success:function(response){
					 response = JSON.parse(response.trim());
					 $("#slctVendedor").append(`<option value = "null" selected>Selecciona un vendedor</option>`)
					 for (var i = 0; i < response.length; i++) {
					 	$("#slctVendedor").append(`<option value = "${response[i]["id_sys_usuario"]}">${response[i]["Nombre"]}</option>`);
					 }
				 },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
			 })
		 }

     function getOrdenesClienteVend(Doctor_id){
       $("#ModalOrdenes").modal("toggle");
       var datasend = {
         op:"getOrdenesDoctorVend",
         Doctor_id:Doctor_id
       }
       var tableOrdenesC = $('#tableOrdenesC').dataTable({
         "language": {
           "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
           "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
           "info": "PÁGINA _PAGE_ DE _PAGES_",
           "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
           "infoFiltered": "",
           "search": "BUSCAR"
         },
         "columnDefs": [{
           "className": "dt-center", "targets": "_all"
         }],
         "order": [],
         "bSort": false,
         "bPaginate":false,
         "bFilter": false,
         "bInfo":false,

         "destroy":true,
         "ajax":{
           "type":"POST",
           "url":"Backend/Ordenes/App.php",
           "data":datasend,
           "success" : function(response){
             tableOrdenesC.fnClearTable();
             for (var i = 0; i < response.length; i++) {
               tableOrdenesC.fnAddData([
                 response[i]["Serie"].toUpperCase(),
                 response[i]["Producto"].toUpperCase(),
                 response[i]["Colorimetro"].toUpperCase(),
                 response[i]["Piezas"].toUpperCase(),
                 response[i]["Fecha_entrega_solicitada"].toUpperCase(),
               ]);
             }
           },
           "complete" : function(){
               $.unblockUI();
             }
         }
       });
     }

     function getPaquetesClienteVend(IdDoctor){
       $("#ModalPaquetes").modal("toggle");
       var datasend = {
         op:"getPaquetesDispDoctorVend",
         IdDoctor:IdDoctor
       }
       var tablePaquetesC = $('#tablePaquetesC').dataTable({
         "language": {
           "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
           "zeroRecords": "NO HAY PAQUETES POR MOSTRAR",
           "info": "PÁGINA _PAGE_ DE _PAGES_",
           "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
           "infoFiltered": "",
           "search": "BUSCAR"
         },
         "columnDefs": [{
           "className": "dt-center", "targets": "_all"
         }],
         "order": [],
         "bSort": false,
         "bPaginate":false,
         "bFilter": false,
         "bInfo":false,

         "destroy":true,
         "ajax":{
           "type":"POST",
           "url":"Backend/Productos_Paquetes/App.php",
           "data":datasend,
           "success" : function(response){
             tablePaquetesC.fnClearTable();
             for (var i = 0; i < response.length; i++) {
               tablePaquetesC.fnAddData([
                 response[i]["Serie"].toUpperCase(),
                 response[i]["Paquete"].toUpperCase(),
                 response[i]["CantidadPaquete"].toUpperCase(),
                 response[i]["CantidadDisponible"].toUpperCase()
               ]);
             }
           },
           "complete" : function(){
               $.unblockUI();
             }
         }
       });
     }

		</script>
  </body>
</html>
