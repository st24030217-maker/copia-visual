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
					 <li> <a class="titulo"> CUESTIONARIOS </a> </li>
				 </ol>
				</section>
				<div class="contenedores">
			 	 <div class="row">
			 		 <div class="col-12 col-lg-12 text-right">
						 <a href="Preguntas.php"> <button type="button" class="btn btn-outline-info"><i class="fa fa-plus"></i> Nuevo Cuestionario</button></a>
			 		 </div>
			 	 </div>
			 </div>
			 <br><br>
				<div class="Table-responsive contenedores">
				 <table id="nombre" class="table text-center table-hover" style="color:black;">
					 <thead>
							 <th>Tipo</th>
							 <th>Descripcion</th>
							 <th>Fecha y Hora Inicio</th>
							 <th>Fecha y Hora Fin</th>
							 <th>Editar</th>
						 	 <th>Desactivar</th>
					 </thead>
					 <tbody>
						 <?php
						 		require_once ("Backend/Cuestionarios/Cuestionarios.php");
								$Cuestionarios = new Cuestionarios();
		 				  	$ListCuestionarios = $Cuestionarios->getCuestionarios();
		 					  for($i = 0; $i < sizeof($ListCuestionarios); $i++){

								$idCuestionarios = $ListCuestionarios[$i]["idCuestionarios"];
		 						$Tipo = $ListCuestionarios[$i]["Tipo"];
		 						$idTipo = $ListCuestionarios[$i]["idTipo"];
		 						$Descripcion = $ListCuestionarios[$i]["Descripcion"];
								$FechaInicio = $ListCuestionarios[$i]["FechaInicio"];
								$FechaFin = $ListCuestionarios[$i]["FechaFin"];
								$HorarioInicio = $ListCuestionarios[$i]["HoraInicio"];
								$HorarioFin = $ListCuestionarios[$i]["HoraFin"];
								// $BanderaTodos = $ListCuestionarios[$i]["BanderaTodos"];
								// $idSupervisor = $ListCuestionarios[$i]["idSupervisor"];

								$idtipoP = $ListCuestionarios[$i]["idTipoPeriodo"];
								$idPerioricidad = $ListCuestionarios[$i]["idPerioricidad"];
								$keywords = $ListCuestionarios[$i]["DiasRepetir"];

								if ($FechaInicio=="0000-00-00" ) {
									$FechaInicio = "INDEFINIDO";
								}else {
									$FechaInicio = $FechaInicio;
								}
								if ($FechaFin=="0000-00-00") {
									$FechaFin = "INDEFINIDO";
								}else {
									$FechaFin = $FechaFin;
								}
								if ($HorarioInicio == "00:00:00" ) {
									$HorarioInicio = "INDEFINIDO";
								}else {
									$HorarioInicio = $HorarioInicio;
								}
								if ($HorarioFin == "00:00:00") {
									$HorarioFin = "INDEFINIDO";
								}else {
									$HorarioFin = $HorarioFin;
								}

								echo "<tr>
										<td>$Tipo</td>
										<td>$Descripcion</td>
										<td>$FechaInicio / $HorarioInicio</td>
										<td>$FechaFin / $HorarioFin</td>
										<td>
                      <button type='button' name='button' class='btn btnUpdate' onclick='updateCuestionarioPreg(\"$idCuestionarios\")'>
												<i class='fa fa-pencil'></i>
											</button>
										</td>
										<td></td>
									</tr>";
							}
						  ?>
					 </tbody>
				 </table>
			 </div>
			 <br>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
		<script type="text/javascript">
			 function updateCuestionarioPreg(idCues){
				 alert(idCues);
				 window.location.href=`UpdateCuestionarioP.php?idCuestionarios=${idCues}`;
			 }
		</script>
  </body>
</html>
