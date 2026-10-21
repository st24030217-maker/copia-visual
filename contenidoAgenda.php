<?php
$fecha = $_GET["fecha"] ?? "";
$dateDia = date('Y-m-d',strtotime($fecha));
$idOrdenTemp = $_GET["idOrdenTemp"] ?? "";
$IdDoc2 = $_GET["IdDoc1"] ?? "";
 ?>
<div class="row">
  <div class="col-12 col-lg-12">
    <h2>Horarios Disponibles</h2>
  </div>
  <div class="col-12 col-lg-4 offset-lg-4">
      <input id="fechaconf" type="text" name="" value="<?php echo $fecha; ?>" style="display:none;">
      <input type="text" name="IdOrdenT" id="IdOrdenT" value="<?php echo $idOrdenTemp ?>" style="display:none;">
      <input type="text" name="IdDoc3" id="IdDoc2" value="<?php echo $IdDoc2 ?>" style="display:none;">
  </div>
  </div>
</div>
<div class="col-12 col-lg-12"  style="overflow-y: scroll !important; overflow-x: hidden !important;">
  <div id="horarios_config">
</div>


</div>

<script type="text/javascript">
changeHorario()
function changeHorario(){
  $("#horarios_config").empty();
  var tipo = $("#selecHorario").val();
  var fecha = $("#fechaconf").val();
  var idOrdenTemp = $("#IdOrdenT").val();
  var IdDoc2 = $("#IdDoc2").val();
  $("#horarios_config").load(`horarios_config.php?&fecha=${fecha}&idOrdenTemp=${idOrdenTemp}&IdDoc3=${IdDoc2}`);
}
</script>
