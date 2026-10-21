<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
$id_usuario = ($_COOKIE["id_usuario"] ?? "");
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
         <form class="" action="app/Ordenes/App.php" method="post">
         <div class="row" style="padding:15px;">
           <?php
           require_once("app/Productos/Productos.php");
           $Productos = new Productos();
           $ListProductos = $Productos->getProductosAppOrdenes();
           for ($i=0; $i <sizeof( $ListProductos) ; $i++) {
             $Producto_ID = $ListProductos[$i]["Producto_ID"];
             $Producto = $ListProductos[$i]["Producto"];
             $Producto_Corto = $ListProductos[$i]["Producto_Corto"];
             $Precio_Base = $ListProductos[$i]["Precio_Base"];
             $Descripcion = $ListProductos[$i]["Descripcion"];
             $Imagen = $ListProductos[$i]["Imagen"];

             echo "
             <div class='col-12 col-lg-6' id='$Producto_ID' style='padding:15px;'>
               <div class='row contenedoresCuatro' style='height:100%;'>
                <div class='col-9 col-lg-9'>
                  <h6> $Producto </h6>
                  <hr>
                </div>
                <div class='col-3 col-lg-3'>
                  <h6> $Producto_Corto </h6>
                  <hr>
                </div>

                <div class='col-9 col-lg-9'>
                  <h6> $Descripcion </h6>
                </div>
                <div class='col-3 col-lg-3'>
                  <h6> Precio: $Precio_Base </h6>
                </div>
                <div class='col-9 col-lg-9 text-center'>
                  <img src='Archivos/imagenProductosApp/$Imagen' alt='' style='height:100px'>
                </div>
                <div class='col-3 col-lg-3 text-right'>
                  <button type='button' class='btn btn-success' name='btnAddList$Producto_ID'
                  onclick='addListaTemporal(\"$Producto_ID\")'>Añadir al carro</button>
                </div>
               </div>
               <br>
             </div>
             ";
           }
            ?>
         </div>
       </form>

        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      function addListaTemporal(idProd){
        var idDoctor = '<?php echo $id_usuario ?>';

        $.ajax({
          type:"POST",
          url:"app/Ordenes/App.php",
          data:"op=addTemporal"+
          "&DoctorId="+idDoctor+"&Producto_id="+idProd,
          success: function(data){
            if(data=="1"){
              Alerta("success","Operacion exitosa");
              setTimeout(function () {
                window.location.href=`Ordenes.php?IdProd=${idProd}&IdDoctor=${idDoctor}`;
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
