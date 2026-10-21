<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$idCuestionarios = $_GET["idCuestionarios"] ?? "";
require_once("Backend/Cuestionarios/Cuestionarios.php");
$Cuestionarios2 = new Cuestionarios();
$DetalleCu = $Cuestionarios2->getDetalleCuestionario($idCuestionarios);
for ($i=0; $i < sizeof($DetalleCu) ; $i++) {
  $TipoC = $DetalleCu[$i]["Tipo"];
  $DescripcionC = $DetalleCu[$i]["Descripcion"];
  $FechaInicioC = $DetalleCu[$i]["FechaInicio"];
  $FechaFinC = $DetalleCu[$i]["FechaFin"];
  $HoraInicioC = $DetalleCu[$i]["HoraInicio"];
  $HoraFinC = $DetalleCu[$i]["HoraFin"];


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
             <li> <a class="titulo"> ACTUALIZAR CUESTIONARIO </a> </li>
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


         <div class="contenedoresCuatro">
           <form class=""id="formUpdateDetallesCuest" action="Backend/Cuestionarios/App.php" method="post">
             <input type="text" name="op" id="op" value="updateDetallesCuestionario" style="display:none;">
             <input type="text" name="idCuest"  id="idCuest" value="<?php echo $idCuestionarios ?>" style="display:none;">
           <div class="row">
             <div class="col-6 col-lg-4">
               <label for="recipient-name" class="col-form-label">Seleccione el tipo de Cuestionario:</label>
               <select class="form-control" id="tipoCuestionario" name="tipoCuestionario" required >
								  <option value=""  disabled selected > -- Seleccione una opción -- </option>
									 <?php
										 require_once("Backend/Cuestionarios/Cuestionarios.php");

										 $Cuestionarios = new Cuestionarios();
										 $ListTipoCuestionario = $Cuestionarios->getTiposCuestionarioActivo();
										 for ($i=0; $i < sizeof($ListTipoCuestionario) ; $i++){
											 $idTiposCuestionario = $ListTipoCuestionario[$i]["IdTiposCuestionario"];
											 $Tipo = $ListTipoCuestionario[$i]["Tipo"];

											 $select="";
											 if ($TipoC==$idTiposCuestionario) {
												 $select="selected";
											 }
											 echo "
											 <option value='$idTiposCuestionario'$select>$Tipo</option>";

										 }
									 ?>
							  </select>
             </div>
             <div class="col-6 col-lg-8">
               <label for="recipient-name" class="col-form-label">Descripción</label>
               <input type="text" name="txtDescripcion" id="txtDescripcion" class="form-control" value="<?php echo $DescripcionC ?>">
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
               <input type="date"  class="form-control" id="txtFechaInicio" name="txtFechaInicio" value="<?php echo $FechaInicioC ?>">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Fecha de Fin:</label>
              <input type="date"  class="form-control" id="txtFechaFin" name="txtFechaFin" value="<?php echo $FechaFinC ?>">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Hora de Inicio:</label>
              <input type="time"  class="form-control" id="txtHoraInicio" name="txtHoraInicio" value="<?php echo $HoraInicioC ?>">
             </div>
             <div class="col-3 col-lg-3 text-center">
              <label for="recipient-name" class="col-form-label">Hora de Fin:</label>
              <input type="time"  class="form-control" id="txtHoraFin" name="txtHoraFin" value="<?php echo $HoraFinC ?>">
              <br>
             </div>
             <div class="col-12 col-lg-12 text-center">
 							<button type="button" id="btnAceptarDetalles" class="btn btn-info"  onclick="updateDetallesCuest('')"> Aceptar Detalles </button>
 						</div>
           </div>
         </form>

         </div>
         <br>
         <div class="contenedoresCuatro">
           <div id="divIncludeDetallePreguntasC">

           </div>
           <form id="formInsertaPreguntas" action="Backend/Cuestionarios/App.php" method="post">
             <input type="text" class="form-control" id="op" name="op" value="updateAddPreguntaCuestionario" style="display:none;">
             <input type="text" name="txtIdCuestionario" id="txtIdCuestionario" value="<?php echo $idCuestionarios ?>" style="display:none;">
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
							<button type="button" id="btnAgregarCuestionario" class="btn btn-info"  onclick="newPreguntas('')"> Aceptar Preguntas </button>
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
    $(document).ready(function(){
      var IdC = '<?php echo $idCuestionarios ?>';
      $("#divIncludeDetallePreguntasC").load(`includeDetallePreguntas.php?idCuestionarios=${IdC}`);
    });



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


  function includeDetallePreguntas(){
      var IdC = '<?php echo $idCuestionarios ?>';
      $("#divIncludeDetallePreguntasC").load(`includeDetallePreguntas.php?idCuestionarios=${IdC}`);
  }

  function updateCheckBoolInclude(idP){
    if ($("#checkB"+idP).is(":checked")) {
      $("#inpCheckB"+idP).val("1");
      $("#inpCheckN"+idP).val("0");

      document.getElementById("txtValorF"+idP).style.display = 'none';
      document.getElementById("txtValorIn"+idP).style.display = 'none';
      document.getElementById("divValorIni"+idP).style.display = 'none';
      document.getElementById("divVF"+idP).style.display = 'none';
      document.getElementById("lblVF"+idP).style.display = 'none';
      document.getElementById("lblVIni"+idP).style.display = 'none';
      document.getElementById("checkN"+idP).checked= false;
      $("#txtValorIn"+idP).val("0")
      $("#txtValorF"+idP).val("0")

    }else{
      $("#inpCheckB"+idP).val("0");
      document.getElementById("txtValorF"+idP).style.display = 'block';
      document.getElementById("txtValorIn"+idP).style.display = 'block';
      document.getElementById("txtValorIn"+idP).val = 'block';
      document.getElementById("divValorIni"+idP).style.display = 'block';
      document.getElementById("divVF"+idP).style.display = 'block';
      document.getElementById("lblVF"+idP).style.display = 'block';
      document.getElementById("lblVIni"+idP).style.display = 'block';
    }
  }


  function updateCheckNumlInclude(idP){
    if ($("#checkN"+idP).is(":checked")) {
      $("#inpCheckB"+idP).val("0");
      $("#inpCheckN"+idP).val("1");
      document.getElementById("txtValorF"+idP).style.display = 'block';
      document.getElementById("txtValorIn"+idP).style.display = 'block';
      document.getElementById("divValorIni"+idP).style.display = 'block';
      document.getElementById("divVF"+idP).style.display = 'block';
      document.getElementById("lblVF"+idP).style.display = 'block';
      document.getElementById("lblVIni"+idP).style.display = 'block';
      document.getElementById("checkB"+idP).checked= false;

    }else{
      $("#inpCheckN"+idP).val("0");
      document.getElementById("txtValorF"+idP).style.display = 'none';
      document.getElementById("txtValorIn"+idP).style.display = 'none';
      document.getElementById("divValorIni"+idP).style.display = 'none';
      document.getElementById("divVF"+idP).style.display = 'none';
      document.getElementById("lblVF"+idP).style.display = 'none';
      document.getElementById("lblVIni"+idP).style.display = 'none';
    }
  }

  function updatePreguntasCuestionario(idPreg){
    var varBooleano = $("#inpCheckB"+idPreg).val();
    var varNum = $("#inpCheckN"+idPreg).val();
    var varVFinal = $("#txtValorF"+idPreg).val();
    var varVIni = $("#txtValorIn"+idPreg).val();
    var varPregunta = $("#Pregunta"+idPreg).val();

		Swal.fire({
			title: '¿Desea editar la pregunta?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Guardar',
			denyButtonText: `No Guardar`,
		}).then((result) => {
	/* Read more about isConfirmed, isDenied below */
	if (result.isConfirmed) {
    $.ajax({
      type:"POST",
      url:"Backend/Cuestionarios/App.php",
      data:"op=updatePreguntasCuestionario"+
      "&varBooleano="+varBooleano+"&varNum="+varNum+"&varVFinal="+varVFinal+"&varVIni="+varVIni+"&varIdPreg="+idPreg+"&varPregunta="+varPregunta,
      success: function(data){
        if(data!="0"){
          Alerta("success","Pregunta Actualizada");
          setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
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
	}else if (result.isDenied) {
		Swal.fire('Procedimiento cancelado', '', 'info')
	}
}
)
  }

  function deletePreguntaCuestionario(idPreg){
		Swal.fire({
  title: '¿Desea elminiar la pregunta?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Guardar',
  denyButtonText: `No Guardar`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    $.ajax({
      type:"POST",
      url:"Backend/Cuestionarios/App.php",
      data:"op=deletePreguntaCuestionario"+
      "&varIdPreg="+idPreg,
      success: function(data){
        if(data!="0"){
          Alerta("success","Pregunta Eliminada");
          setTimeout(function () { // el set sirve para actualizar sin necesidad de recargar
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
	}else if (result.isDenied) {
    Swal.fire('Procedimiento cancelado', '', 'info')
  }
})
  }


  function newPreguntas(){
      if (document.getElementById("formInsertaPreguntas").checkValidity()){
        event.preventDefault();
        var form = $("#formInsertaPreguntas")[0];
        var data = new FormData(form);

				Swal.fire({
					title: '¿Desea agregar nuevas preguntas al cuestionario?',
					showDenyButton: true,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					denyButtonText: `No Guardar`,
				}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
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
             Alerta("success","Registrado Correctamente");
             setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
               location.reload();
             }, 1500);
            }
            else{
              Alerta("error","No Registrado");
              setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                location.reload();
              }, 1500);
            }
          },
          error:function(e){
            alert(e.responseText);
          }
        });
			}else if (result.isDenied) {
						Swal.fire('Procedimiento cancelado', '', 'info')
					}
				}
				)
      } else {
        Alerta("info","Faltan Campos por llenar");
      }
    }

    function updateDetallesCuest(){
        if (document.getElementById("formUpdateDetallesCuest").checkValidity()){
          event.preventDefault();
          var form = $("#formUpdateDetallesCuest")[0];
          var data = new FormData(form);

					Swal.fire({
						title: '¿Desea editar los detalles del cuestionario?',
						showDenyButton: true,
						showCancelButton: true,
						confirmButtonText: 'Guardar',
						denyButtonText: `No Guardar`,
					}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
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
               Alerta("success","Registrado Correctamente");
               setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                 location.reload();
               }, 1500);
              }
              else{
                Alerta("error","No Registrado");
                setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                  location.reload();
                }, 1500);
              }
            },
            error:function(e){
              alert(e.responseText);
            }
          });
				}else if (result.isDenied) {
					    Swal.fire('Procedimiento cancelado', '', 'info')
					  }
					}
					)
        } else {
          Alerta("info","Faltan campospor llenar");
        }
      }
    </script>
  </body>
</html>
