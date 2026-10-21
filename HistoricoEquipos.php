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
		#downloadLink:hover{
			color:#fff;
		}
		#downloadLink{
			color:#1FC447;
			width: 100%;
		}
	</style>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
          <section>
          <ol class="breadcrumb">
            <li> <a class="titulo"> Histórico de Equipos </a> </li>
          </ol>
         </section>
         <br>
         <div class="contenedores">
           <div class="form-group row">
             <div class="offset-2 col-4">
               <label>Fecha de inicio</label>
               <div class='input-group date' id='dateFechaInicio' onchange="changeHistorico()">
                 <input type='text' class="form-control" id="FechaInicio" onchange="changeHistorico()" />
                 <span class="input-group-addon">
                   <i class='fa fa-calendar' style="margin-top:6px;"></i>
                 </span>
               </div>
             </div>
             <div class="col-4">
               <label>Fecha de término</label>
               <div class='input-group date' id='dateFechaFin' onchange="changeHistorico()">
                 <input type='text' class="form-control" id="FechaTermino" onchange="changeHistorico()" />
                 <span class="input-group-addon">
                   <i class='fa fa-calendar' style="margin-top:6px;"></i>
                   </span>
                 </span>
               </div>
             </div>
           </div>
         </div>
         <br>
				 <div class="row" id="load" style="display:none;">
				 	<div class="col-12 text-center">
						<div class="spinner-border text-secondary" role="status" >
	 					  <span class="sr-only">Loading...</span>
	 					</div>
						<br>
						<br>
						<h5>Cargando registros</h5>
				 	</div>
				 </div>
					<br>
					 <div id="divTablaHistorico">

           </div>


        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      $(document).ready(function(){
        $('#dateFechaInicio').datetimepicker({
         format: 'YYYY-MM-DD',
         useCurrent: false
       });
        $('#dateFechaFin').datetimepicker({
         format: 'YYYY-MM-DD'
       });

       SetFechasFiltros();
			 var globalFechaI = "";
			 var globalFechaF = "";


     });

     function SetFechasFiltros(){
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

       $("#FechaInicio").val(currentFechaInicio);
       $("#FechaTermino").val(currentFechaFin);
			 globalFechaI = currentFechaInicio;
			 globalFechaF = currentFechaFin;

       changeHistorico();
     }

     $("#dateFechaInicio").on("dp.change", function (e) {0
       changeHistorico();
       $('#dateFechaFin').data("DateTimePicker").minDate(e.date);
     });
     $("#dateFechaFin").on("dp.change", function (e) {
       changeHistorico();
       $('#dateFechaInicio').data("DateTimePicker").maxDate(e.date);
     });

     function addZero(i) {
       if (i < 10) {
         i = "0" + i;
       }
       return i;
     }

     function changeHistorico(){
			 $("#load").fadeIn();
      	setTimeout(function () {
					var fechaini = $("#FechaInicio").val();
					var fechafin = $("#FechaTermino").val();

					$("div#divTablaHistorico").load(`include_table_historico.php?fechaini=${fechaini}&fechafin=${fechafin}`);
      	}, 500);
     }

		 function exportF(elem) {
		   var table = document.getElementById("TableHistorico");
		   var html = table.outerHTML;
		   var url = 'data:application/vnd.ms-excel,' + escape(html);
		   elem.setAttribute("href", url);
		   elem.setAttribute("download", `Historico_${globalFechaI}-${globalFechaF}.xls`);
		   return false;
		 }
    </script>
  </body>
</html>
