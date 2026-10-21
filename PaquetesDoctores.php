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
            <li> <a class="titulo"> Listado de paquetes </a> </li>
          </ol>
        </section>
				<div class="contenedoresMenuIndexOT" style="padding:10px;">
					<div class="row">
            <div class="col-9 col-lg-9">
            	<div class="row">
								<div class="col-6 col-lg-3 offset-lg-3">
		              <h6>Desde: </h6>
		              <input type="date" class="form-control text-center" id="nptFechaDesde" x-ref="atDate" @change="setDate" onchange="getPaquetes()">
		            </div>
		            <div class="col-6 col-lg-3">
		              <h6>Hasta: </h6>
		              <input type="date" class="form-control text-center" id="nptFechaHasta" x-ref="atDate" @change="setDate" onchange="getPaquetes()">
		            </div>
		            <div class="col-12 col-lg-12">
		              <br>
		              <h6>Mostrar terminados
		                </h6>
		                <label class='switch'>
		                  <input type='checkbox' id='chkTerminado' onchange="getPaquetes()">
		                  <span class='slider round'></span>
		                </label>
		            </div>
            	</div>
            </div>
						<div class="col-3 col-lg-3 text-center" id="SinPagarDiv" style="text-align:center;align-items: center; justify-content: center; height:auto;display: flex; cursor:pointer; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
							<div class="row">
								<div class="col-12 col-lg-12 text-center">
									<h6>Cantidad de Paquetes sin pagar</h6>
								</div>
								<div class="col-12 col-lg-12 text-center">
									<h5 id="CantidadPaquetesSinPagar"></h5>
								</div>
							</div>
						</div>
          </div>
				</div>
				<br>
				 <div class="contenedores" style="padding:10px;">
           <div class="row">
 						<div class="col-12 col-lg-12">
 							<div class='inner-addon right-addon'>
 	              <div id='Icono' class='icono-inp'>
 	                <i class="fa fa-search" style="color:#000000;"></i>
 	              </div>
 					 			<input type="text" class="form-control text-center" onkeyup="Busqueda();"  style="border-radius:5px" placeholder="Introduzca algún dato del doctor a buscar" name="nptBuscar" id="nptBuscar" value="">
 							</div>
 						</div>
 					</div>
          <br>
					 <div class="table-responsive">
             <table class="table table-hover" id="tablePaquetes">
               <thead>
                 <th class="">Serie</th>
                 <th class="">Doctor</th>
                 <th class="">Celular</th>
                 <th class="">Email</th>
                 <th class="">Vendedor</th>
                 <th class="">Paquete</th>
                 <th class="">Total</th>
                 <th class="">Solicitadas</th>
                 <th class="">Resto</th>
                 <th class="">Activado</th>
                 <th class=""></th>
               </thead>
             </table>
					 </div>
				 </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">
      var today = new Date();
      var last = new Date();
      last.setDate(last.getDate()-5);

      var yi = addZero(last.getFullYear());
      var mti = addZero(parseInt(last.getMonth()) + 1);
      var di = addZero(parseInt(last.getDate()));
      var currentFechaInicio = yi + "-" + mti + "-" + di;

      var yf = addZero(today.getFullYear());
      var mtf = addZero(parseInt(today.getMonth()) + 1);
      var df = addZero(today.getDate());
      var currentFechaFin = yf + "-" + mtf + "-" + df;

      $("#nptFechaDesde").val(currentFechaInicio);
      $("#nptFechaHasta").val(currentFechaFin);
    var tablePaquetes = $('#tablePaquetes').dataTable({
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
    });

		getPaquetes();

    function Busqueda(){
      const TablaRenglon = document.getElementById('tablePaquetes');
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

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

     function getPaquetes(){
       var FechaDesde = $("#nptFechaDesde").val();
       var FechaHasta = $("#nptFechaHasta").val();
       var Terminado = "";

       if ($("#chkTerminado").is(":checked")) {
         Terminado = "0";
       }else {
         Terminado = "1";
       }
       $.ajax({
         type:"POST",
         url:"Backend/DentLab/App.php",
         data:"op=getpaquetesDoctores&FechaDesde="+FechaDesde+"&FechaHasta="+FechaHasta+"&Terminado="+Terminado,
         success:function(response){
           response = JSON.parse(response.trim());
           tablePaquetes.fnClearTable();
           for (var i = 0; i < response.length; i++) {
						 var idDoctor = btoa(response[i]["IdDoctor"]);
             tablePaquetes.fnAddData([
               response[i]["Serie"],
							 `<a href="Doctor.php?d=${idDoctor}" style="color:#40C1CA">${response[i]["Doctor"]}</a>`,
               response[i]["Celular"],
               response[i]["Email"],
               response[i]['vendedor'] == null ? "NO ASIGNADO" : response[i]['vendedor'],
               response[i]["paquete"],
               response[i]["Pz_Total"],
               response[i]["solicitadas"],
               response[i]["CantidadDisponible"],
               response[i]['Activado'] == null ? "FECHA NO ASIGNADA" : response[i]['Activado'],
               response[i]["Terminado"]
             ]);
           }
         },error:function(e){
           toastr.error(e.responseText,"ERROR 500");
         }
       })
     }
		 CantPaquetesSinPagar();
		 function CantPaquetesSinPagar () {
			 datos = {
				 op: "CantPaquetesSinPagar"
			 }
			 $.ajax({
				 type: "post",
				 url: "Backend/Productos_Paquetes/App.php",
				 data: datos,
				 success:function(response){
					 response = JSON.parse(response.trim());
					 $("#CantidadPaquetesSinPagar").html(response[0]["PSinPagar"]);
				 },error:function(e){
					 alert(e.responseText);
				 }
			 });
		 }

		 $("#SinPagarDiv").click(function(){
			 window.location.href=`DeudoresPaquetes.php`;
		 });
		</script>
  </body>
</html>
