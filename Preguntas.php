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
             <li> <a class="titulo"> NUEVO CUESTIONARIO </a> </li>
           </ol>
        </section>

        <div class="contenedores">
         <div class="row">
           <div class="col-12 col-lg-12 text-right">
             <a href="Cuestionarios.php"> <button type="button" class="btn btn-info"><i class="fa fa-arrow-left"></i> Regresar</button></a>
           </div>
         </div>
       </div>
       <br><br>

       <form id="formInsertaCuestionario" action="" method="post">
         <input type="text" class="form-control" id="op" name="op" value="AddCuestionario" style="display:none;">
				 <input type="text" class="form-control" id="idCuest" name="idCuest" value="" style="display:none;">
         <input type="text" class="form-control" id="idP" name="idP" value="" style="display:none;">
         <div class="contenedoresCuatro">
           <div class="row">
             <div class="col-6 col-lg-4">
               <label for="recipient-name" class="col-form-label">Seleccione el tipo de Cuestionario:</label>
               <select class="form-control" id="tipoCuestionario" name="tipoCuestionario" required onchange="selectTip(this.value)">
								  <option value=""  disabled selected > -- Seleccione una opción -- </option>
									 <?php
										 require_once("Backend/Cuestionarios/Cuestionarios.php");

										 $Cuestionarios = new Cuestionarios();
										 $ListTipoCuestionario = $Cuestionarios->getTiposCuestionarioActivo();
										 for ($i=0; $i < sizeof($ListTipoCuestionario) ; $i++){
											 $idTiposCuestionario = $ListTipoCuestionario[$i]["IdTiposCuestionario"];
											 $Tipo = $ListTipoCuestionario[$i]["Tipo"];

											 // $select="";
											 // if ($idTiposCuestionario==$idTipo) {
												//  $select="selected";
											 // }
											 echo "
											 <option value='$idTiposCuestionario'>$Tipo</option>";

										 }
									 ?>
							  </select>
             </div>
             <div class="col-6 col-lg-8">
               <label for="recipient-name" class="col-form-label">Descripción</label>
               <input type="text" name="txtDescripcion" id="txtDescripcion" class="form-control" value="">
               <br>
             </div>
             <div class="col-12 col-lg-12 ">
							<div class="col-2 col-lg-2">
								<input type="checkbox" class="form-check-input " id="checkIndefinido" name="checkIndefinido" onclick='clickCheckIndefinido()'>
				   			<label class="form-check-label" for="exampleCheck1">Indefinido</label>
                <hr>
							</div>
						 </div>
             <div class="col-3 col-lg-3 text-center">
               <label for="recipient-name" class="col-form-label">Fecha de Inicio:</label>
               <input type="date"  class="form-control" id="txtFechaInicio" name="txtFechaInicio">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Fecha de Fin:</label>
              <input type="date"  class="form-control" id="txtFechaFin" name="txtFechaFin">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Hora de Inicio:</label>
              <input type="time"  class="form-control" id="txtHoraInicio" name="txtHoraInicio">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Hora de Fin:</label>
              <input type="time"  class="form-control" id="txtHoraFin" name="txtHoraFin">
              <br>
             </div>
           </div>
         </div>
         <br>
         <div class="contenedoresCuatro">
           <div class="row">
             <div class="col-12 col-lg-12">
               <!-- <input type="text"  class="form-control" id="idPregunta" name="idPregunta" style="display:none;"> -->
								<h6>Pregunta:</h6>
								<input type="text"  class="form-control" id="txtPregunta" name="txtPregunta[]" required>
             </div>
             <div class="col-1 col-lg-1">
			          <label for="recipient-name" class="col-form-label">Booleano:</label>
								<input id='inpCheckBool' name="inpCheckBool[]" value='0' style="display:none;">
								<input type="checkbox" class="form-control" id="checkBool" name="checkBool" value="" onclick='clickCheckbool2()'>
			        </div>
              <div class="col-1 col-lg-1">
								<label for="recipient-name" class="col-form-label">Numerico:</label>
								<input id='inpCheckNumerico'name="inpCheckNumerico[]" value='0' style="display:none;">
								<br>
								<input type="checkbox" class="form-control" id="checkNumerico" name="checkNumerico" value="" onclick='clickCheckNumerico2()'>
							</div>
              <div class="col-3 col-lg-3"  id="divValorI">
                <label for="recipient-name" id="lblVInicial" class="col-form-label">Valor Inicial:</label>
                <input type="number" class="form-control" id="txtValorInicial" name="txtValorInicial[]" min="0">
              </div>
              <div class="col-3 col-lg-3"  id="divValorF">
                <label for="recipient-name" id="lblVFinal" class="col-form-label">Valor Final:</label>
                <input type="number" class="form-control" id="txtValorFinal" name="txtValorFinal[]" min="1">
              </div>
              <div class="col-4 col-lg-4">
                 <button type="button" class="btn btn-outline-info" onclick="NuevaPreguntafunction('')" style="margin-top:35px;"><i class="fa fa-plus"></i> Nueva Pregunta</button>
              </div>
           </div>
					 <hr style="height:1px;border:none;color:#333;background-color:#333;">
           <div id='addPreguntas'>

          </div>
           <br><br>
					<div class="row">
						<div class="col-12 col-lg-12 text-center">
							<button type="button" id="btnAgregarCuestionario" class="btn btn-info"  onclick="AddCuestionariofunction('')">Agregar Cuestionario</button>
						</div>
					</div>
         </div>
       </form>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

    var aux = "0";
    function NuevaPreguntafunction(){
     aux++;
     $("#addPreguntas").append(`
       <div class="row" id='${aux}'>
         <div class="col-12 col-lg-12">
            <h6>Pregunta:</h6>
            <input type="text"  class="form-control" id="txtPregunta" name="txtPregunta[]" required>
         </div>
         <div class="col-1 col-lg-1">
            <label for="recipient-name" class="col-form-label">Booleano:</label>
            <input id='inpCheckBool${aux}' name="inpCheckBool[]" value='0' style='display:none;'>
            <input type="checkbox" class="form-control" id="checkBool${aux}" name="checkBool" value="" onclick='clickCheckbool(${aux})'>
          </div>
          <div class="col-1 col-lg-1">
            <label for="recipient-name" class="col-form-label">Numerico:</label>
            <input id='inpCheckNumerico${aux}'name="inpCheckNumerico[]" value='0' style='display:none;'>
            <br>
            <input type="checkbox" class="form-control" id='checkNumerico${aux}'' name="checkNumerico" value="" onclick='clickCheckNumerico(${aux})'>
          </div>
          <div class="col-3 col-lg-3"  id="divValorI${aux}">
            <label for="recipient-name" id='lblVInicial${aux}' class="col-form-label">Valor Inicial:</label>
            <input type="number" class="form-control" id='txtValorInicial${aux}' name="txtValorInicial[]" min="0">
          </div>
          <div class="col-3 col-lg-3"  id="divValorF${aux}">
            <label for="recipient-name" id='lblVFinal${aux}' class="col-form-label">Valor Final:</label>
            <input type="number" class="form-control" id='txtValorFinal${aux}' name="txtValorFinal[]" min="1">
          </div>
          <div class="col-4 col-lg-4 text-center">
  					<button type="button" class="btn btn-outline-danger" onclick="EliminarPreguntafunction('${aux}')"style='margin-top:35px;'>
  						<i class='fa fa-minus'></i> Eliminar Pregunta
            </button>
              <br>
					</div>
						<br>
          <br>
      </div>
      <hr id='hr${aux}' style='height:1px;border:none;color:#333;background-color:#333;'>
     `);
   }

   function EliminarPreguntafunction(id){
       $("#"+id).remove();
       $("#hr"+id).remove();
     }

     function clickCheckbool(id){
				if ($("#checkBool"+id).is(":checked")) {
					$("#inpCheckBool"+id).val("1");
					$("#inpCheckNumerico"+id).val("0");

					document.getElementById("txtValorFinal"+id).style.display = 'none';
					document.getElementById("txtValorInicial"+id).style.display = 'none';
					document.getElementById("divValorI"+id).style.display = 'none';
					document.getElementById("divValorF"+id).style.display = 'none';
					document.getElementById("lblVFinal"+id).style.display = 'none';
					document.getElementById("lblVInicial"+id).style.display = 'none';
					document.getElementById("checkNumerico"+id).checked= false;
				}else{
					$("#inpCheckBool"+id).val("0");
					document.getElementById("txtValorFinal"+id).style.display = 'block';
					document.getElementById("txtValorInicial"+id).style.display = 'block';
					document.getElementById("lblVFinal"+id).style.display = 'block';
					document.getElementById("lblVInicial"+id).style.display = 'block';
				}
			}

	 function clickCheckbool2(){
			if ($("#checkBool").is(":checked")) {
				$("#inpCheckBool").val("1");
				$("#inpCheckNumerico").val("0");

				document.getElementById('txtValorFinal').style.display = 'none';
				document.getElementById('txtValorInicial').style.display = 'none';
				document.getElementById('divValorI').style.display = 'none';
				document.getElementById('divValorF').style.display = 'none';
				document.getElementById('lblVFinal').style.display = 'none';
				document.getElementById('lblVInicial').style.display = 'none';
				document.getElementById("checkNumerico").checked= false;
				// $("#cont"+id).fadeOut();

			}else{
				alert("El checkbox no está seleccionado");
				$("#inpCheckBool").val("0");

				document.getElementById('txtValorFinal').style.display = 'block';
				document.getElementById('txtValorInicial').style.display = 'block';
				document.getElementById('lblVFinal').style.display = 'block';
				document.getElementById('lblVInicial').style.display = 'block';
			}
		}

	 function clickCheckNumerico(id){
			if ($("#checkNumerico"+id).is(":checked")){
				$("#inpCheckNumerico"+id).val("1");
				$("#inpCheckBool"+id).val("0");

				document.getElementById("txtValorFinal"+id).style.display = 'block';
				document.getElementById("txtValorInicial"+id).style.display = 'block';
				document.getElementById("divValorI"+id).style.display = 'block';
				document.getElementById("divValorF"+id).style.display = 'block';
				document.getElementById("lblVFinal"+id).style.display = 'block';
				document.getElementById("lblVInicial"+id).style.display = 'block';
				document.getElementById("checkBool"+id).checked= false;
			}else {
				$("#inpCheckNumerico"+id).val("0");
			}
		}

	 function clickCheckNumerico2(){
			if ($("#checkNumerico").is(":checked")){
				$("#inpCheckNumerico").val("1");
				$("#inpCheckBool").val("0");

				document.getElementById("txtValorFinal").style.display = 'block';
				document.getElementById("txtValorInicial").style.display = 'block';
				document.getElementById("divValorI").style.display = 'block';
				document.getElementById("divValorF").style.display = 'block';
				document.getElementById("lblVFinal").style.display = 'block';
				document.getElementById("lblVInicial").style.display = 'block';
				document.getElementById("checkBool").checked= false;
			}else {
				$("#inpCheckNumerico").val("0");
				}
		}


	function clickCheckIndefinido(){
		var FechaInicio = document.getElementById('txtFechaInicio');
		var FechaFin = document.getElementById('txtFechaFin');
		var HoraInicio = document.getElementById('txtHoraInicio');
		var HoraFin = document.getElementById('txtHoraFin');
		if ($("#checkIndefinido").is(":checked")){
			$("#inpIndefinido").val("1");
			$("#txtFechaInicio").val(null);
			$("#txtFechaFin").val(null);
			$("#txtHoraInicio").val(null);
			$("#txtHoraFin").val(null);

			FechaInicio.disabled  = true;
			FechaFin.disabled  = true;
			HoraInicio.disabled  = true;
			HoraFin.disabled  = true;

		}else {
				$("#inpIndefinido").val("0");
				FechaInicio.disabled = false;
				FechaFin.disabled  = false;
				HoraInicio.disabled  = false;
				HoraFin.disabled  = false;
		}
	}

  function AddCuestionariofunction(){
		if (document.getElementById("formInsertaCuestionario").checkValidity()){
			event.preventDefault();
			var form = $("#formInsertaCuestionario")[0];
			var data = new FormData(form);

			$.ajax({
				type:"POST",
				url:"Backend/Cuestionarios/App.php",
				data:data,
				processData:false,
				contentType:false,
				cache: false,
				timeout:600000,
				success:function(data){
					if (data=="1") {
					 Alerta("success","Actualizado Correctamente");
					 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
						 location.reload();
					 }, 1500);
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

  function selectTip(val){
    alert(val);
  }

    </script>
  </body>
</html>
