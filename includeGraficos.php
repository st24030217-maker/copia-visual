<?php
$fechaInicio = $_GET["fechaInicio"] ?? "";
$fechaFin = $_GET["fechaFin"] ?? "";
require_once("Backend/Estadisticas/Estadisticas.php");
$Es1 = new Estadisticas();
$CantidadOrdenes = $Es1->getOrdenesCreadas($fechaInicio,$fechaFin);
for ($i=0; $i < sizeof($CantidadOrdenes) ; $i++) {
  $OrdenesTotales = $CantidadOrdenes[$i]["Cantidad"];
  $OrdenesInternas = $CantidadOrdenes[$i]["Interno"];
  $OrdenesExternas = $CantidadOrdenes[$i]["Externo"];
}
$Es2 = new Estadisticas();
$PiezasProducidas = $Es2->getPiezasProducidas($fechaInicio,$fechaFin);
$Es3 = new Estadisticas();
$OrdenesMerma = $Es3->getCantidadMermaOrdenes($fechaInicio,$fechaFin);
$Es4 = new Estadisticas();
$DetalleZirconio= $Es4->UnidadesZirconio($fechaInicio,$fechaFin);
$ZirconoExterior = $DetalleZirconio[1]["Cantidad"];
$ZirconoInterior = $DetalleZirconio[0]["Cantidad"];
$Es5 = new Estadisticas();
$OrdenesTipoDoctor = $Es5->OrdenesTipoDoctor($fechaInicio,$fechaFin);
$OrdenesExterno = $OrdenesTipoDoctor[1]["Cantidad"];
$OrdenesInterno = $OrdenesTipoDoctor[0]["Cantidad"];
$OrdenesTotalDoctores = $OrdenesExterno + $OrdenesInterno;
$Es6 = new Estadisticas();
$EstadoOrden = $Es6->StatusProceso($fechaInicio,$fechaFin);
$StatusEntregado = $EstadoOrden[0]["Cantidad"];
$StatusLevantado = $EstadoOrden[1]["Cantidad"];
$StatusDiseño = $EstadoOrden[2]["Cantidad"];
$StatusFabricacion = $EstadoOrden[3]["Cantidad"];
$Es7 = new Estadisticas();
$VentasInternas = $Es7->VentasInternas($fechaInicio,$fechaFin);
$Es8 = new Estadisticas();
$PiezasXCategoria = $Es8->PiezasCategoria($fechaInicio,$fechaFin);
$PiezasAlinia = $PiezasXCategoria[0]["Cantidad"];
$PiezasGuia = $PiezasXCategoria[1]["Cantidad"];
$PiezasGuardas = $PiezasXCategoria[2]["Cantidad"];
$PiezasImp = $PiezasXCategoria[3]["Cantidad"];
$PiezasZirconio = $PiezasXCategoria[4]["Cantidad"];
$PiezasGraph = $PiezasXCategoria[5]["Cantidad"];

$Es9 = new Estadisticas();
$DiscosUtilizados = $Es9->DiscosUtilizados();
$Es10 = new Estadisticas();
$ProduccionPiezas = $Es10->PiezasPorSemana();
$ProduccionSemanaAct = $ProduccionPiezas[0]["Cantidad"];
$ProdFechaAct = $ProduccionPiezas[0]["Fecha"];
$ProduccionSemana1 = $ProduccionPiezas[1]["Cantidad"];
$ProdFecha1 = $ProduccionPiezas[1]["Fecha"];
$ProduccionSemana2 = $ProduccionPiezas[2]["Cantidad"];
$ProdFecha2 = $ProduccionPiezas[2]["Fecha"];
 ?>

 <div class="contenedores">
   <div class="row" style="padding:10px;">
     <div class="col-3 col-lg-3 text-center" style="background-color:#0006C0; color:white;">
       <span style="font-size:20px;">Ordenes Creadas</span>
       <div class="row">
         <div class="col-4 col-lg-4 text-center">
           <span style="font-size:13px;">Ordenes Totales</span>
           <h3><?php echo $OrdenesTotales ?></h3>
         </div>
         <div class="col-4 col-lg-4 text-center">
           <span style="font-size:13px;">Ordenes Internas</span>
           <h3><?php echo $OrdenesInternas ?></h3>
         </div>
         <div class="col-4 col-lg-4 text-center">
           <span style="font-size:13px;">Ordenes Externas</span>
           <h3><?php echo $OrdenesExternas ?></h3>
         </div>
       </div>
     </div>
     <div class="col-3 col-lg-3 text-center" style="background-color:#0006C0; color:white">
       <span style="font-size:20px;">Piezas Producidas</span>
       <h3><?php echo $PiezasProducidas ?></h3>
     </div>
     <div class="col-3 col-lg-3 text-center" style="background-color:#0006C0; color:white">
       <span style="font-size:20px;">Discos Utilizados</span>
       <h3><?php echo $DiscosUtilizados ?></h3>
     </div>
     <div class="col-2 col-lg-2 text-center" style="background-color:#0006C0; color:white">
       <span style="font-size:20px;">Merma</span>
       <h3><?php echo $OrdenesMerma ?></h3>
     </div>
     <div class="col-1 col-lg-1 text-center" style="background-color:#0006C0;">
       <a href="#" onclick="getOrdenesMerma()" class="btn btn-info" style="margin-top:8px;"><i class="fa fa-file-o fa-2x" style="color:white; margin-top:5px;"></i></i></a>
    </div>
   </div>
 </div>
 <br>
<div class="row">
  <div class="col-12 col-lg-4">
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12 text-center" style="background-color:#212121">
          <span style="color:white"><strong>Distribución de unidades de Zirconio</strong></span>
        </div>
        <?php
        if ($ZirconoExterior == "" && $ZirconoInterior == "") {
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='col-12 col-lg-12'>
            <div id='GraficaZirconio' style='height: 250px; width:50vh;'></div>
          </div>
          ";
        }
         ?>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-4 text-center">
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12" style="background-color:#212121">
          <span style="color:white"><strong>Piezas por tipo de doctor</strong></span>
        </div>
        <?php
        if ($OrdenesInterno == "" && $OrdenesExterno == "") {
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='col-4 col-lg-4' style='background-color:#33D0FF;'>
            <span style='color:black; font-size:17px;'>Internas:  $OrdenesInterno</span>
          </div>
          <div class='col-4 col-lg-4' style='background-color:#9A33FF;'>
            <span style='color:black; font-size:17px;'>Externas: $OrdenesExterno</span>
          </div>
          <div class='col-4 col-lg-4' style='background-color:#9CCC65;'>
            <span style='color:black; font-size:17px;'>Total: $OrdenesTotalDoctores</span>
          </div>
          <div class='col-12 col-lg-12'>
            <div id='OrdenesTipoDoctor' style='height: 250px; width:350px;'></div>
          </div>
          ";
        }
         ?>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-4 text-center">
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12" style="background-color:#212121">
          <span style="color:white"><strong>Ventas internas</strong></span>
        </div>
        <?php
        if ($VentasInternas == "0" || $VentasInternas == "") {
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='col-12 col-lg-12'>
            <div id='VentasInternas' style='height: 250px; width:35vh;'></div>
          </div>
          ";
        }
         ?>

      </div>
    </div>
  </div>

  <div class="col-12 col-lg-6 text-center">
    <br>
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12" style="background-color:#212121">
          <span style="color:white"><strong>Clasificación de estatus de procesos</strong></span>
        </div>
        <?php
        if ($StatusEntregado == "0" && $StatusLevantado == "0" && $StatusDiseño == "0" && $StatusFabricacion == "0") {
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='chartBox'>
            <br>
            <canvas id='OrdenesStatus'></canvas>
          </div>
          ";
        }
         ?>
      </div>
    </div>
  </div>


  <div class="col-12 col-lg-6 text-center">
    <br>
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12" style="background-color:#212121">
          <span style="color:white"><strong>Producción de Piezas por Semana</strong></span>
        </div>
        <?php
        if ($ProduccionSemanaAct == "0" && $ProduccionSemana1 == "0" && $ProduccionSemana2 == "0"){
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='chartBox'>
            <br>
            <canvas id='ProduccionPiezasSemana'></canvas>
          </div>
          ";
        }
         ?>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-6 offset-lg-3 text-center">
    <br>
    <div class="contenedores">
      <div class="row">
        <div class="col-12 col-lg-12" style="background-color:#212121">
          <span style="color:white"><strong>Piezas por Categoria</strong></span>
        </div>
        <?php
        if (($PiezasZirconio == "" || $PiezasZirconio == "0") && ($PiezasAlinia == "" || $PiezasAlinia == "0")){
          echo "
          <div class='col-12 col-lg-12 text-center'>
            <h4> Sin datos </h4>
          </div>
          ";
        }else {
          echo "
          <div class='chartBox'>
            <br>
            <canvas id='PiezasCategoria' style='height:100px !important;'></canvas>
          </div>
          ";
        }
         ?>
      </div>
    </div>
  </div>
</div>

<?php echo "
<script type='text/javascript'>
Morris.Bar({
  element: 'GraficaZirconio',
  data: [
    { y: 'ZIRCONIO', a: $ZirconoExterior, b: $ZirconoInterior },
  ],
  xkey: 'y',
  ykeys: ['a', 'b'],
  labels: ['EXTERNO', 'INTERNO'],
  barColors: [
    '#3F33FF',
    '#9033FF'
  ]
});
new Morris.Donut({
  element: 'OrdenesTipoDoctor',
  data: [
    {
      label: 'Piezas Internas',
      value: $OrdenesInterno
    },
    {
      label: 'Piezas Externas',
      value: $OrdenesExterno
    }
  ],
  colors: [
    '#33D0FF',
    '#9A33FF'
  ]
});


var ctx = document.getElementById('OrdenesStatus').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['ENTREGADO', 'LEVANTADO', 'DISEÑO', 'FABRICACIÓN'],
        datasets: [{
            data: [$StatusEntregado, $StatusLevantado, $StatusDiseño, $StatusFabricacion],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
            datalabels: {
              color: 'blue',
              anchor: 'end',
              align: 'top'
            }
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});


var ctx2 = document.getElementById('PiezasCategoria').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['ZIRCONIO','GUIA QUIRURGICA','GUARDAS','IMPRESION','ALINIA','GRAPHENO'],
        datasets: [{
            data: [$PiezasZirconio,$PiezasGuia,$PiezasGuardas,$PiezasImp,$PiezasAlinia,$PiezasGraph],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            datalabels: {
              color: 'blue',
              anchor: 'end',
              align: 'top'
            }
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});

new Morris.Bar({
  element: 'VentasInternas',
  data: [
    { y: 'VENTAS INTERNAS', a: $VentasInternas},
  ],
  xkey: 'y',
  ykeys: ['a'],
  labels: ['$', ''],
  barColors: [
    '#3F33FF'
  ],
  gridTextSize: 14
});

var ctx3 = document.getElementById('ProduccionPiezasSemana').getContext('2d');
var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['$ProdFecha2', '$ProdFecha1', '$ProdFechaAct'],
        datasets: [{
            data: [$ProduccionSemana2, $ProduccionSemana1,$ProduccionSemanaAct],
            backgroundColor: [
                'rgba(51, 97, 255 , 0.2)',
                'rgba(51, 97, 255 , 0.2)',
                'rgba(51, 97, 255 , 0.2)'

            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            datalabels: {
              color: 'blue',
              anchor: 'end',
              align: 'top'
            }
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});

</script>

"; ?>
