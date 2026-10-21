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
</head>
  <body class="nav-md" style="background: linear-gradient(15deg, rgba(0,0,0,1) 0%, rgba(37,44,54,1) 61%, rgba(47,48,52,1) 100%);">
    <div class="container body" >
			<div class="row">
				<div class="col-12 text-center" style="margin-top:5vh">
				 <!-- <h4>LOGO</h4> -->
				 <img src="Archivos/logoDebt2.png" alt="Logo" width="300vh">
				</div>
			</div>
        <div class="right_col" role="main">
					<!-- <div class="row">
						<div class="col-4 col-lg-4">
							<a href="index.php">  <button class="fa fa-arrow-left" style="margin-top:10vh;font-size:30px;width:20%; border-radius:15px;"></button></a>
						</div>
					</div> -->

          <form  id="formObtenerEquipos" action="Backend/Equipos/AdmEquipos.php" method="post" style="margin-top:5vh;">
            <input type="text" class="form-control" id="op" name="op" value="" style="display:none;">
              <div class="contenedores">
	            <div class="col-12 col-lg-12">
								<br><br>
	              <div id="divTablaEquiposUsuario">

	              </div>
	            </div>
          </form>
					<hr>
					<div class="col-12 col-lg-12 text-center">
						<button type="button" id="btnAceptar" class="btn btn-outline-secondary btn-lg"  onclick="window.location.href='login.php?opcion=2'">Aceptar</button>
					</div>
					<br>
        </div>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

    <?php
    $id_usuario = ($_COOKIE["id_usuario"] ?? "");
    ?>


    recargarSelect();

    setTimeout(function () {
      verificarDatos();
    }, 1000);

    function verificarDatos(){
      var num = $('#tableEquipos tr').length;
      if (num > 1) {
        // $("#btnAceptar").fadeIn();
      }else{
        // $("#btnAceptar").fadeOut();
      }
    }

    function recargarSelect(){
      // $("#divSelect").empty();
      $("#divTablaEquiposUsuario").empty();
      // $("#divSelect").load('include_selectEquipos.php');
      $("#divTablaEquiposUsuario").load('include_tablaUsuariosEquipos.php');
    }

    function regresarEquipo(idEquiposUsuario){
      var IDUsuarioCOOKIE = '<?php echo $id_usuario ?>';
      $.ajax({
      type:"POST",
      url:"Backend/Equipos/App.php",
      data:"op=regresarEquipo"+
      "&IDUsuarioCOOKIE="+IDUsuarioCOOKIE+"&idEquiposUsuario="+idEquiposUsuario,
      success:function(data){
        if(data=="1"){
          Alerta("success","Operacion Exitosa");
          setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
            location.reload();
          }, 1500);
					// window.location.href='logout.php';

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
    </script>
  </body>
</html>
