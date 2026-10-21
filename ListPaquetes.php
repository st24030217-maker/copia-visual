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
            <li> <a class="titulo"> Listado de Paquetes </a> </li>
          </ol>
         </section>

         <div class="contenedores">
           <div class="row">
             <div class="col-12 col-lg-12 text-right">
              <a href="AddPaquetes.php"><button type="button" class="btn btn-outline-success"> <i class='fa fa-plus'></i> Nuevo Paquete</button></a>
             </div>
           </div>
        </div>

        <br>
            <div class="contenedores">
              <div class="Table-responsive">
              <table id="nombre" class="table text-center table-hover" style="color:black;">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nombre Corto</th>
										<th>Costo</th>
                    <th>Desde</th>
                    <th>Hasta</th>
										<th>Status</th>
                    <th>Actualizar</th>
										<th>Actualizar Status</th>
                  </tr>
                </thead>
                <tbody>

                  <?php
                     require_once ("Backend/Productos_Paquetes/AdmProductos_Paquetes.php");
                     $AdmProductos_Paquetes = new AdmProductos_Paquetes();
                     $ListPaquetes= $AdmProductos_Paquetes->getPaquetes();
                     for($i = 0; $i < sizeof($ListPaquetes); $i++){

                     $Productos_Paquetes_Id = $ListPaquetes[$i]["Productos_Paquetes_Id"];
                     $Paquete = $ListPaquetes[$i]["Paquete"];
                     $Paquete_Corto = $ListPaquetes[$i]["Paquete_Corto"];
										 $Costo = $ListPaquetes[$i]["Costo"];
                     $Desde = $ListPaquetes[$i]["Desde"];
                     $Hasta = $ListPaquetes[$i]["Hasta"];
										 $Activo = $ListPaquetes[$i]["Activo"];

										 if ($Activo == "1") {
										 	$varActivo = "Activado";
										}else {
											$varActivo = "Desactivado";
										}

                     echo "
                       <tr>
                       <td>$Paquete</td>
                       <td>$Paquete_Corto</td>
											 <td>$Costo</td>
                       <td>$Desde</td>
                       <td>$Hasta</td>
											 <td>$varActivo</td>
                       <td class='text-center'>
                         <button class='btn btnIconoEdit'  onclick='updatePaquetefunction(\"$Productos_Paquetes_Id\");' data-toggle='tooltip' title='Editar Paquete'>
                         <i class='fa fa-pencil-square'></i>
                         </button></td>
											 <td class='text-center'>
												 <button class='btn btnIconoChange' onclick='updateActivofunction(\"$Activo\",\"$Productos_Paquetes_Id\");' data-toggle='tooltip' title='Camiar Status'>
												 <i class='fa fa-pencil-square'></i>
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
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

      function updatePaquetefunction(Productos_Paquetes_Id){
        window.location.href=`UpdatePaquetesApp.php?Productos_Paquetes_Id=${Productos_Paquetes_Id}`;
      }

			function updateActivofunction(Activo,IdPaqu){
				if (Activo == 0) {
					var activo = "1";
				}else {
					activo = "0";
				}
				$.ajax({
					type:"POST",
					url:"Backend/Productos_Paquetes/App.php",
					data:"op=updateActivo"+
					"&Activo="+activo+"&Productos_Paquetes_Id="+IdPaqu,
					success: function(data){
						if(data=="1"){
							Alerta("success","Operacion exitosa");
							setTimeout(function () {
								location.reload();
							}, 1500);
						}else{
							Alerta("error","No se Realizo Correctamente");
							setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
								location.reload();
							}, 1500);
						}
					},
					error:function(e){
						alert(e.responseText);
					}
				});
			}
    </script>
  </body>
</html>
