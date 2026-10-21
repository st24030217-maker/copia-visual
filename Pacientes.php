<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idDoctor = $_GET["idDoctor"] ?? "";
require_once("Backend/Pacientes/Pacientes.php");
$Pacientes = new Pacientes();
$ListPacientes = $Pacientes->getPacientesDoctor($idDoctor);

 ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus2.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
           <ol class="breadcrumb">
             <li> <a class="titulo"> Listado de Pacientes </a> </li>
           </ol>
        </section>
				<div class="contenedores">
					<div class="row">
						<div class="col-12 col-lg-12 text-right">
							<a href="ListadosDoctores.php"><button type="button" class="btn btnEtiqueta" style="color:white">Regresar</button></a>
						</div>
					</div>
				</div>
        <br>
				<?php
				if (sizeof($ListPacientes) > "0") {
					// code...
				 ?>
				<div class="contenedores">
					<div class="table-responsive">
						<table id="tablePacientes" class="table text-center table-hover" style="color:black;">
							<thead>
								<th>Nombre del Paciente</th>
								<th>Doctor</th>
								<th>Status Paciente</th>
								<th>Actualizar Status</th>
							</thead>
							<tbody>
								<?php
								for ($i=0; $i < sizeof($ListPacientes) ; $i++) {
									$Paciente_Id = $ListPacientes[$i]["Paciente_Id"];
									$Doctor = $ListPacientes[$i]["Doctor"];
									$ApellidoMaterno = $ListPacientes[$i]["ApellidoMaterno"];
									$ApellidoPaterno = $ListPacientes[$i]["ApellidoPaterno"];
									$Nombre = $ListPacientes[$i]["Nombre"];
									$Apellidos = $ListPacientes[$i]["Apellidos"];
									$Status = $ListPacientes[$i]["Status"];
									if ($Status == "1") {
										$varStatus = "Activo";
										$prop = "checked";
									}else {
										$varStatus = "Inactivo";
										$prop = "";
									}
									echo "
									<tr>
										<td>$Nombre $Apellidos</td>
										<td>$Doctor $ApellidoMaterno $ApellidoPaterno</td>
										<td>$varStatus</td>
										<td>
										<label class='switch'>
												<input type='checkbox' id='chkTerm{$Paciente_Id}' {$prop} onclick='updateStatusPaciente(\"$Paciente_Id\",\"$Status\")'>
												<span class='slider round'></span>
										</label>
										</td>
								 </tr>
									";

								}
								 ?>
							</tbody>
						</table>
					</div>
				</div>
				<?php
			}else {
				echo "
				<div class='contenedores'>
					<div class='row'>
						<div class='col-12 col-lg-12 text-center'>
							<span style='font-size:25px;'> No contiene pacientes </span>
						</div>
					</div>
				</div>
				";
			}
				 ?>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      $(document).ready(function(){
      });

			function updateStatusPaciente(IdPaciente,Status){
        if (Status == "1") {
          var varStatus = "0";
        }else {
          var varStatus = "1";
        }
        $.ajax({
          type : "POST",
          url: "Backend/Pacientes/App.php",
          data: "op=updateStatusPaciente"+
          "&IdPaciente="+IdPaciente+"&Status="+varStatus,
          success: function(data){
            if (data == "1") {
              setTimeout(function () {
                Alerta("success","Status del paciente actualizado")
              },500);
            }else {
              setTimeout(function () {
                Alerta("info",data)
              }, 500);
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
