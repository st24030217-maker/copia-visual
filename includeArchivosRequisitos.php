<?php
$IdOrdenTemp = $_GET["idOrden"] ?? "";

require_once("Backend/RequisitosAlinia/RequisitosAlinia.php");
$Requisitos2 = new RequisitosAlinia();
$CantidadRequisitos = $Requisitos2->getCantidadRequisitos();

require_once("Backend/Ordenes/Ordenes.php");
$Ord = new Ordenes();
$CantidadArchivosOrden =$Ord->getCantidadRequisitosOrden($IdOrdenTemp);
 ?>

 <div class="row">
   <?php
   $Requisitos = new RequisitosAlinia();
   $ListRequisitos = $Requisitos->getRequisitosAlinea();
   $num = "0";
   for ($i=0; $i <sizeof($ListRequisitos) ; $i++) {
     $idRequisitosAlinia = $ListRequisitos[$i]["idRequisitosAlinia"];
     $Requisito = $ListRequisitos[$i]["Requisito"];
     $num++;

     require_once("Backend/Ordenes/Ordenes.php");
     $Ordenes = new Ordenes();
     $ListReqOrden = $Ordenes->getRequisitosOrdenTemp($IdOrdenTemp,$idRequisitosAlinia);
     if ($ListReqOrden == "1") {
       $RequisitoOrden = "Archivo Subido";
       $check = "checked";
       $valor = "1";
       $operacion = "updateArchivoRequOrdenT";
       $color = "color:green !important";
       $icon = "<i class='far fa-thumbs-up' style='color:green;'></i>";
     }else {
       $RequisitoOrden = "Sin Archivo";
       $check = "";
       $valor = "0";
       $operacion = "addArchivoRequisitosOrdenT";
       $color = "color:red !important";
       $icon = "";

     }

     echo "
      <div class='col-6 col-lg-6 text-center'  style='height:40px;'>
        <span style='margin-left:15px;'><b>$num.-</b> $Requisito</span>
      </div>
      <div class='col-6 col-lg-6 text-center'>
        <div class='row'  style='height:20px;'>
          <div class='col-6 col-lg-6 text-left'>
            <span style='$color'>$RequisitoOrden </span>
            $icon
          </div>
          <div class='col-6 col-lg-6 text-left'>
            <form class='' action='Backend/Ordenes/App.php' method='post' id='formInsertaArchivo$idRequisitosAlinia'>
            <input type='text' name='op' value='$operacion' style='display:none;'>
            <input type='text' name='txtIdReq' value='$idRequisitosAlinia' style='display:none;'>
            <input type='text' name='txtIdOrdenT' value='$IdOrdenTemp' style='display:none;'>
              <input type='file' style='display:none;' accept='image/jpeg,image/png,image/jpg,.docx,application/pdf,.zip' name='inpArchivosOrdRequ' id='inpArchivosOrdRequ$idRequisitosAlinia' onchange='addArchivoRequisitosOT(\"$idRequisitosAlinia\")'>
              <a href='#' style='width:75% !important; font-size:9px !important;' class='btn btn-outline-danger' onclick='AbrirArchivoReq(\"$idRequisitosAlinia\");'> <i class='far fa-file-alt fa-2x' style=''></i></a>
            </form>
          </div>
        </div>
      </div>

     ";
   }
    ?>

</div>
<?php
echo "
<script type='text/javascript'>
$('#cantidadReq').val('$CantidadRequisitos');
$('#cantidadArchivosOrd').val('$CantidadArchivosOrden');
</script>
";
 ?>
