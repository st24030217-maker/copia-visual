<?php
if (!isset($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off' ) {
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
		.button-add{
			border: 1px solid #5AD387;
			background-color:transparent;
			border-radius: 10px;
			width:100%;
			margin-top:1vh;
		}

		.button-add:hover{
			background-color:#5AD387;
			color:#fff;
		}
	</style>
</head>
  <body class="nav-md" style="background: linear-gradient(15deg, rgba(0,0,0,1) 0%, rgba(37,44,54,1) 61%, rgba(47,48,52,1) 100%);">
    <div class="container body" >
			<div class="row">
				<div class="col-12 text-center" style="margin-top:5vh">
				 <!-- <h4>LOGO</h4> -->
				 <img src="Archivos/logoDebt2.png" alt="Logo" width="300vh">
				</div>
			</div>
        <div class="right_col" role="main" >

					<!-- <div class="row">
						<div class="col-4 col-lg-4">
							<a href="index.php">  <button class="fa fa-arrow-left" style="margin-top:10vh;font-size:30px;width:20%; border-radius:15px;"></button></a>
						</div>
					</div> -->
				<br>
          <form  id="formObtenerEquipos" action="Backend/Equipos/AdmEquipos.php" method="post" style="margin-top:5vh;">
            <input type="text" class="form-control" id="op" name="op" value="addListaEquiposUsu" style="display:none;">
              <div class="contenedores">
                <div class="row">
                  <div class="col-8 col-lg-8" >
										<div class="contenedores">
											<div id="divSelect">

											</div>
										</div>


                </div>
                <div class="col-4 col-lg-4">
                  <button type="button" id="btnAgregarEquipo" class="btn button-add"  onclick="addListaEquiposUsu('')">Agregar Equipo</button>
                </div>
            </div>
            <br>
            <div class="col-12 col-lg-12">
							<div id="divTablaEquipos">

							</div>
            </div>
						<br><br>
          </form>
					<hr>
					<div class="col-12 col-lg-12 text-center">
						<button type="button" id="btnAceptar" class="btn btn-outline-secondary btn-lg"  onclick="addLista('')" style="display:none;">Aceptar Lista</button>
					</div>
					<br><br>
        </div>
				<br>
				<br>

      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
		<?php
		$id_usuario = ($_COOKIE["id_usuario"] ?? "");
 		?>
			recargarSelect();
			// setTimeout(function () {
			// 	verificarDatos();
			// }, 500);
			function verificarDatos(){
				// var num = document.getElementById("tableEquiposTemp").table.rows.length;
					var num = $('#tableEquiposTemp tr').length;
					if (num > 1) {
						$("#btnAceptar").fadeIn();
					}else{
						$("#btnAceptar").fadeOut();
					}
			}
			function recargarSelect(){
				$("#divSelect").empty();
				$("#divTablaEquipos").empty();
				$("#divSelect").load('include_selectEquipos.php');
				$("#divTablaEquipos").load('include_tablaEquiposUsuario.php');
				setTimeout(function () {
					verificarDatos();
				}, 800);
			}

      function addListaEquiposUsu(){
        if (document.getElementById("formObtenerEquipos").checkValidity()){
          event.preventDefault();
					var idequipo = $("#selectEquipos").val();
					if (idequipo == null) {
						Alerta("info","Debes de seleccionar un equipo");
						return false;
					}
					$("#btnAgregarEquipo").prop("disabled",true);
          var form = $("#formObtenerEquipos")[0];
          var data = new FormData(form);

          $.ajax({
            type:"POST",
            url:"Backend/Equipos/App.php",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(data){
              if (data=="1") {
               Alerta("success","Actualizado Correctamente");
							 recargarSelect();
							 // setTimeout(function () {
							 // 	verificarDatos();
							 // }, 500);
								$("#btnAgregarEquipo").prop("disabled",false);
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
      }

			function deleteListaEquiposUsu(idEquiposUsuario){
				if (idEquiposUsuario != "") {
					$.ajax({
					type:"POST",
					url:"Backend/Equipos/App.php",
					data:"op=deleteListaEquipoUsu"+
					"&idEquiposUsuario="+idEquiposUsuario,
					success:function(data){
						if(data=="1"){
							Alerta("success","Operacion Exitosa");
							recargarSelect();
							// setTimeout(function () {
							//  verificarDatos();
							// }, 500);
						}else{
							Alerta("error","No se Realizo Correctamente");
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
		}

		function addLista(){
				var IDUsarioCOOKIE = '<?php echo $id_usuario ?>';
				$.ajax({
				type:"POST",
				url:"Backend/Equipos/App.php",
				data:"op=addEquiposUsuario"+
				"&IDUsarioCOOKIE="+IDUsarioCOOKIE,
				success:function(data){
					if(data=="1"){
						Alerta("success","Operacion Exitosa");
						setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							window.location.href='login.php?opcion=1';
						}, 1000);
						// window.location.href='logout.php';

					}else{
						Alerta("error","No se Realizo Correctamente");
						setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
							window.location.href='login.php?opcion=1';
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
