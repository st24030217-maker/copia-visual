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
          <div class="row">
            <div class="col-8 offset-2 col-lg-8 offset-lg-2 text-center">
              <img src="Archivos/logoDentlab.png" style="width:50vh;margin-top:5vh" alt="">
            </div>
            <div class="col-8 offset-2 col-lg-8 offset-lg-2 text-center" style="margin-top:5vh;">
                <span style="font-size:25px; color:white; font-size:35px;"> Usuarios </span>
            </div>
            <div class="col-8 offset-2 col-lg-2 offset-lg-5" style=" background-color:white;" >

            </div>
            <div class="col-8 offset-2 col-lg-8 offset-lg-2"style="margin-top:5vh">
              <div>
                <div class="row">
                  <?php
                  require_once("Backend/Usuarios/Usuarios.php");
                  $Usu = new Usuarios();
                  $ListUsuarios = $Usu->getUsuariosDiscosAlmacen();
                  for ($i=0; $i < sizeof($ListUsuarios) ; $i++) {
                    $idLab_Discos_UsuariosAlmacen = $ListUsuarios[$i]["idLab_Discos_UsuariosAlmacen"];
                    $Nombre = $ListUsuarios[$i]["Nombre"];
                    echo "
                      <div class='col-12 col-lg-3 text-center'>
                        <button type='button' style='font-size:5vh' class='btn btn-outline-light' onclick='irAInventario(\"$idLab_Discos_UsuariosAlmacen\")'>$Nombre</button>
                      </div>
                    ";
                  }
                   ?>
                </div>
              </div>
          </div>
        </div>
    </div>
    <?php include("scripts.php"); ?>
    <script type="text/javascript">
      function irAInventario(num){
        window.location.href=`DiscosInvEntrada.php?Usuario=${num}`;
      }
    </script>
  </body>
</html>
