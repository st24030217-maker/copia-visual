<?php
$Usuario = $_GET["Usuario"] ?? "";
require_once("Backend/Inventario/Inventario.php");
$Colorimetro = new Inventario();
$ListColores = $Colorimetro->getInventarioColorimetros();

$Inventario2 = new Inventario();
$ValorCodigoIni = $Inventario2->getCodigoDiscosInv();

$Inventario3 = new Inventario();
$ValorMaximoCodigoD = $Inventario3->getUltimoCodigoDiscosInv();
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>Discos Zirconio | Dent</title>
    <?php include("estilosDiscos.php"); ?>
    <style media="screen">
    body{
      background: rgb(9,100,121);
      background: linear-gradient(90deg, rgba(9,100,121,1) 24%, rgba(0,190,255,1) 100%);
    }
    </style>
    <title></title>
  </head>
  <body>
    <div class="container body">
      <form class="" action="Backend/Invetio/App.php" id="EntradaInv" method="post">
        <input type="text" name="op" value="EntradaDiscosInv" style="display:none;">
        <input type="number" name="txtValorCodigoIni" value="<?php echo $ValorCodigoIni ?>" style="display:none;">
        <input type="number" id='codigoUlt' name="txtValorMaximoCod" value="<?php if($ValorMaximoCodigoD == "0"){echo $ValorCodigoIni;}else{echo $ValorMaximoCodigoD;}?>" style="display:none;">
        <input type="text" name="txtIdUsuario" value="<?php echo $Usuario ?>" style="display:none;">
        <div class="row" style="margin-top:5vh;">
          <div class="col-12 col-lg-8 offset-lg-2 text-left">
            <button  onclick="window.location.href='Entrada.php'" type="button" class="btn btn-light" id="" name=""> <i class="fa fa-arrow-left" aria-hidden="true"></i> Regresar</button>
          </div>
          <div class="col-12 col-lg-4 offset-lg-4 text-center">
            <img src="Archivos/logoDentlab.png" alt="" style="width:50vh;">
          </div>
          <div class="col-12 col-lg-12 text-center">
            <h2 style="font-size:30px; color:white;"> Entrada de Discos </h2>
          </div>
          <div class="col-12 col-lg-4 offset-lg-4">
            <div class="contenedores">
              <div class="row">
                <div class="col-12 col-lg-6 text-center">
                  <br>
                  <span style="color:#212121">Seleccione una marca</span>
                  <br>
                  <select class="form-control" id="slctMarcas" name="slctMarcas" required>
                    <option value="" selected disabled> Listado de Marcas </option>
                    <?php
                    require_once("Backend/MarcasLaboratorios/MarcasLaboratorios.php");
                    $Marcas1 = new MarcasLaboratorios();
                    $ListMarcas = $Marcas1->getMarcasDisp();
                    for ($i=0; $i <sizeof($ListMarcas) ; $i++) {
                      $idMarcas = $ListMarcas[$i]["idMarcas"];
                      $Marca = $ListMarcas[$i]["Marca"];
                      echo "
                      <option value='$idMarcas'> $Marca </option>
                      ";
                    }
                     ?>
                  </select>
                  <br>
                </div>
                <div class="col-12 col-lg-6 text-center">
                  <br>
                  <span style="color:#212121">Seleccione un color</span>
                  <br>
                  <select class="form-control" id="slctColor" name="slctColor" required>
                    <option value=""selected disabled> Lista de colores </option>
                    <?php
                      for ($i=0; $i < sizeof($ListColores) ; $i++) {
                        $Tipos_Colorimetros_Color_Id = $ListColores[$i]["Tipos_Colorimetros_Color_Id"];
                        $Colorimetro = $ListColores[$i]["Colorimetro"];
                        echo "
                        <option value='$Tipos_Colorimetros_Color_Id'> $Colorimetro </option>
                        ";
                      }
                     ?>
                  </select>
                  <br>
                </div>
                <div class="col-12 col-lg-6 text-center">
                  <span style="color:#212121">Tamaño</span>
                  <br>
                  <select class="form-control" name="txtLongitud"  id="txtLongitud" required>
                    <option value="">SELECCIONE TAMAÑO </option>
                    <option value="14">14mm</option>
                    <option value="15">15mm</option>
                    <option value="16">16mm</option>
                    <option value="17">17mm</option>
                    <option value="18">18mm</option>
                    <option value="19">19mm</option>
                    <option value="20">20mm</option>
                    <option value="22">22mm</option>
                    <option value="25">25mm</option>
                    <option value="30">30mm</option>
                  </select>
                  <!-- <input type="text" name="txtLongitud"  id="txtLongitud" value="" class="form-control" required> -->
                  <br>
                </div>
                <div class="col-12 col-lg-6 text-center">
                  <span style="color:#212121">Cantidad</span>
                  <br>
                  <input type="number" name="txtCantidad" id="txtCantidad" class="form-control" value="1" min="1" required>
                  <br><br>
                </div>
                <div class="col-12 col-lg-6 offset-lg-3">
                  <button type="button" id="EntradaInvtbn" name="EntradaInvtbn" class="btn btn-outline-primary" onclick="realizarMovimiento('')">Realizar Movimiento</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>


    <div class="col-md-12" id="etiquetabar" style="display:none;">

    </div>



    <?php include("scripts.php"); ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="vendors/barcode/JsBarcode.all.min.js"></script>
    <script type="text/javascript">

       function realizarMovimiento(){
         if (document.getElementById("EntradaInv").checkValidity()) {
           event.preventDefault();
           var cantidadD = $("#txtCantidad").val();
           if (cantidadD == "0") {
             Alerta("warning","El valor de la cantidad debe ser mayor o igual a 1");
             return false;
           }
           var form = $("#EntradaInv")[0];
           var data = new FormData(form);
           let cantidad,codigo,marcaD,color,tamano;
           $.ajax({
             type: "POST",
             url:"Backend/Inventario/App.php",
             data:data,
             processData:false,
             contentType:false,
             cache: false,
             timeout:600000,
             success:function(data){
               if (data == "1") {
                 Alerta("success","Movimiento Realizado");
                 cantidad = $("#txtCantidad").val();
                 codigo = $("#codigoUlt").val();
                 marcaD = $("#slctMarcas option:selected").text();
                 color = $("#slctColor option:selected").text();
                 tamano = $("#txtLongitud option:selected").text();

               }else {
                 Alerta("success","Movimiento no Realizado");
                 setTimeout(function () { // el setTimeout sirve para actualizar los datos sin refrescar la pagina
                   location.reload();
                 }, 1500);
               }
             },
             error:function(e){
               console.log(`error: ${e.responseText}`);
             },
             complete: (ajaxResponse) => {
               $("#etiquetabar").load("Include_Codebar.php?cantidad="+cantidad);
              setTimeout(function () {
                PrintCodes(cantidad,codigo,marcaD,color,tamano);
              },400 * cantidad);
             }
           });
         }else {
           Alerta("info","Faltan Campos por llenar");
         }
       }

       function PrintCodes(cantidad,codigo,marcaD,color,tamano){
         console.log(cantidad);
         console.log(codigo);
         let ultimo = (parseInt(codigo) + parseInt(cantidad));
         $("#codigoUlt").val(ultimo);
         for (var i = 0; i < cantidad; i++) {
           codigo++;
           JsBarcode(`#codProducto${i}`, `${codigo}`, {
             format: "CODE128",
             width: 1.8,
             height: 15,
             fontSize: 15
           });
         }

         $("[name=txtCont]").append(`
           <div class='col-md-12' style='margin-top:10px'>
             <br>
             <span style='font-size:25px;'>${color} ${tamano}</span>
           </div>
           <div class='col-md-12'>
             <span style='font-size:25px;'>${marcaD}</span>
           </div>
           `);


         var frame1 = document.createElement('iframe');
         frame1.name = "frame1";
         frame1.style.position = "absolute";
         frame1.style.top = "1000000px";
         document.body.appendChild(frame1);
         var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
         frameDoc.document.open();
            var codigoBarras = $(`#etiquetabar`).html();
            frameDoc.document.write('<html><body style="text-align:center">');
            frameDoc.document.write('<style>'+
                                    '#lblProd, #lblVar, .divDesc{'+
                                      'font-size: 8.5;'+
                                      'font-family: monospace;'+
                                      'text-align: center;'+
                                      'margin-bottom: 0px;'+
                                    '}'+
                                    '</style>');
            frameDoc.document.write(codigoBarras);
            frameDoc.document.write('</body></html>');
         frameDoc.document.close();
         setTimeout(function () {
           window.frames["frame1"].focus();
           window.frames["frame1"].print();
           document.body.removeChild(frame1);
         }, 500);

         $("#slctMarcas").val("");
        $("#slctColor").val("");
        $("#txtLongitud").val("");
        $("#txtLongitud").val("");
        $("#txtCantidad").val("1");
         return false;
       }
    </script>
  </body>
</html>
