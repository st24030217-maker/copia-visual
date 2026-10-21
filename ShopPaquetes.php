<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}

$IdDoctor = $_GET["IdDoctor"] ?? "";

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" type="text/css" href="librerias/slick-1.8.1/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="librerias/slick-1.8.1/slick/slick-theme.css"/>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <input type="text" name="IdDoctor" id="IdDoctor" value="<?php echo $IdDoctor ?>" style="display:none;">
         <div class="row">
					 <div class="col-12 col-lg-12 text-center">
					 	<h4 style="font-size:25px;">Comprar paquete</h4>
					 </div>
					 <div class="col-12 col-lg-12" style="">
             <div class="row">
               <?php
               require_once("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
               $AdmProductos_Paquetes = new AdmProductos_Paquetes();
               $ListPaquetes = $AdmProductos_Paquetes->getPaquetesEnVenta();
               for ($i=0; $i < sizeof($ListPaquetes) ; $i++) {
                 $Productos_Paquetes_Id = $ListPaquetes[$i]["Productos_Paquetes_Id"];
                 $Paquete = $ListPaquetes[$i]["Paquete"];
                 $Costo = $ListPaquetes[$i]["Costo"];
                 $Descripcion = $ListPaquetes[$i]["Descripcion"];
                 $Costo2 = number_format($Costo, 2)."\n";

                 echo "
								 <div class='col-12 col-lg-4' style='height:auto; margin-top:1vh'>
                   <div class='contenedores'>
                     <div class='row'>
                       <div class='col-12 col-lg-12'>
                         <h2 style='padding: 15px;font-size:30px; color:#83bfdd'>Paquete: $Paquete</h2>
                         <br>
                       </div>
                       <div class='col-12 col-lg-12 text-center'>
                         <span style='font-size:30px;'>$Costo2</span>
                         <br><br>
                       </div>
                       <div class='col-10 col-lg-10 text-center offset-1 offset-lg-1'>
                         <span>$Descripcion</span>
                         <br><br>
                       </div>
                       <div class='col-12 col-lg-12 text-center'>
                         <a href='#' class='btn btn-info' onclick='ComprarPaquete(\"$Productos_Paquetes_Id\")'>Comprar Paquete</a>
                       </div>
                     </div>
                   </div>
                 </div>

                 ";
               }
                ?>
             </div>
           </div>
         </div>
				 <br><br>
				 <!-- <div class="row">
					<div class="col-12 col-lg-8 offset-lg-2">
						<div class="contenedores">
							<div class="row">
								<div class="col-12 col-lg-12">
									<select class="form-control" name="slctMetodoPago" id="slctMetodoPago" required>
										<option value="" selected disabled> Lista de metodos de pago </option>
										<?php
										require_once("Backend/Configuracion/Configuracion.php");
										$Configuracion = new Configuracion();
										$ListMetodosPago = $Configuracion->getMetodoPago();
										for ($i=0; $i < sizeof($ListMetodosPago) ; $i++) {
											$id_Metodos_Pago = $ListMetodosPago[$i]["id_Metodos_Pago"];
											$Metodo = $ListMetodosPago[$i]["Metodo"];
											if ($id_Metodos_Pago == "8" || $id_Metodos_Pago == "9") {
												continue;
											}
											echo "
											<option value='$id_Metodos_Pago'>$Metodo</option>
											";
										}
										 ?>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div> -->

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
    <script type="text/javascript" src="librerias/slick-1.8.1/slick/slick.min.js"></script>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
    $(document).ready(function(){
      resolucionIndex();
    });

		const myKeysValues = window.location.search;
		const urlParams = new URLSearchParams(myKeysValues);
		const Doctor = urlParams.get('IdDoctor');
    function resolucionIndex(){
      var globalResolucion = $(window).width();
      if (globalResolucion > 760) {
        $('.multiple-items').slick({
          infinite:true,
          slidesToShow: 3,
          slidesToScroll: 1
        });
      }else{
        $('.multiple-items').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
      }
    }

    function ComprarPaquete(PaqueteId){
      window.location.href=`CheckOutPaquete.php?IdPaquete=${PaqueteId}&Doctor=${Doctor}`;
    }

    </script>
  </body>
</html>
