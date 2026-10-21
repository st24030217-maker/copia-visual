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
  <style media="screen">
  .inner-addon {
    position: relative;
  }
  .inner-addon .icono-inp {
    position: absolute;
    padding: 3px;
  }
  .right-addon .icono-inp {
    right: 0px;
  }
  .right-addon input {
    padding-right: 30px;
  }
  .inner-addon2 {
    position: relative;
  }
  .inner-addon2 .icono-inp2 {
    position: absolute;
    padding: 10px;
  }
  .left-addon .icono-inp2 {
    left: 0px;
  }
  .left-addon input {
    padding-left: 30px;
  }
  </style>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
         <!-- CONTENIDO PAGINA -->
         <section>
          <ol class="breadcrumb">
            <li> <a class="titulo">CONFIGURACIÓN DE PUNTOS</a> </li>
          </ol>
         </section>
         <div class="contenedores">
           <br>
           <div class="row" >
             <div class="col-12 col-lg-4 offset-lg-4 text-center" style="margin-top:40px;">
               <div class='inner-addon2 left-addon'>
                 <div id='Icono' class='icono-inp2'>
                   <i class="fa fa-dollar" style="color:#000000;"></i>
                 </div>
                 <input type="number" class="form-control"  style="border-radius:10px;text-align:center;" placeholder="Escriba el valor en pesos del punto"
                  name="nptValor" id="nptValor" value="">
               </div>
             </div>
             <br><br>
             <div class="col-12 col-lg-12 text-center" style="margin-top:50px;">
               <button type="button" class="btn btn-outline-success" id="btnGuardar">
                 Guardar cambio</button>
             </div>
           </div>
           <br>
          </div>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">
      $(document).ready(function(){
        GetValor();
      });

      function GetValor(){
        var datasend = {
          op:"GetValor"
        };
        $.ajax({
          type:"POST",
          url:"Backend/Clientes/App.php",
          data:datasend,
          success:function(response){
            response = JSON.parse(response.trim());
            $("#nptValor").val(response[0]["ValorPesos"]);
          },error:function(e){
            toastr.error(e.responseText,"ERROR 500");
          }
        });
      }

      $("#btnGuardar").click(function(event){
        var pesos = $("#nptValor").val();
        var datasend = {
          op:"UpdateValor",
          valor:pesos
        };
        Swal.fire({
          text: 'Estas seguro de realizar el cambio?',
          title: "El valor de 1 punto quedara a $"+pesos,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#9BCC4E',
          cancelButtonColor: '#898D91',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
              type:"POST",
              url:"Backend/Clientes/App.php",
              data:datasend,
              success:function(data){
                if (data ==  "1") {
                  Alerta("success","Valor modificado");
                  setTimeout(function () {
                    location.reload();
                  }, 1500);
                }
                else {
                  toastr.warning("Reintente de nuevo","Algo salio mal...");
                }
              },error:function(e){
                toastr.error(e.responseText,"ERROR 500");
              }
            });
          }
        });
      });
    </script>
  </body>
</html>
