<?php
unset($_COOKIE["perfil"]);
unset($_COOKIE["id_usuario"]);
unset($_COOKIE["usuario"]);
unset($_COOKIE["id_perfil"]);
unset($_COOKIE["sesion"]);

setcookie("perfil",null, -1, "/");
setcookie("id_usuario",null, -1, "/");
setcookie("usuario",null, -1, "/");
setcookie("id_perfil",null, -1, "/");
setcookie("sesion",null, -1, "/");



$opcion = $_GET["opcion"] ?? "";
require_once("Backend/Equipos/AdmEquipos.php");
$AdmEquipos = new AdmEquipos();
$AdmEquipos->deleteEquiposLista();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dent Clinica Dental | Login</title>

  <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
  <link href="../vendors/animate.css/animate.min.css" rel="stylesheet">
  <link href="../build/css/custom.min.css" rel="stylesheet">
  <link href="../vendors/toastr/toastr.min.css" rel="stylesheet">

  <style media="screen">
    .button-login{
      background-color: #84B4D4;
      padding: 10px;
      width: 100%;
      border-radius: 5px;
      color: #fff;
    }
    .button-login:hover{
      background-color: #6CADD8;
      color: #fff;
    }
  </style>
</head>
<body class="login">
  <input type="text" id="opcion" value="<?php echo $opcion; ?>" style="display:none;">
  <div>
    <a class="hiddenanchor" id="signup"></a>
    <a class="hiddenanchor" id="signin"></a>
    <div class="login_wrapper">
      <div class="animate form login_form">
        <section class="login_content">
          <form>
            <h1>Grupo Medico Dent</h1>
            <!-- <div>
              <input type="text" id="codigo" class="form-control" placeholder="Código del plantel" autofocus />
            </div> -->

            <div>

              <select id="usuario" class="form-control" name="">
                <option value="" selected>Selecciona un usuario</option>
                <?php
                  require_once("Backend/Usuarios/Usuarios.php");
                  $Usuarios = new Usuarios();
                  $ListUsuarios = $Usuarios->getUsuariosAppEquipos();

                  for ($i=0; $i < sizeof($ListUsuarios); $i++) {
                    $usuario = $ListUsuarios[$i]["usuario"];
                    $Nombre = $ListUsuarios[$i]["Nombre"];
                    echo "
                      <option value='$usuario'>$Nombre</option>
                    ";
                  }
                 ?>
              </select>
              <br>
              <!-- <input type="text" id="usuario" class="form-control" placeholder="Usuario" autofocus/> -->
            </div>
            <div>
              <input type="password" id="clave" class="form-control" placeholder="Clave" onkeypress="keyInicia()" />
            </div>
            <div>
              <a class="btn button-login" id="btnLogin" onclick="IniciaSesion()" style="color:#fff;font-size:18px;">Iniciar sesión</a>
              <!-- <a class="reset_pass" href="#">¿Olvidaste tu contraseña?</a> -->
            </div>

            <div class="clearfix"></div>
            <div class="separator">
              <div class="clearfix"></div>
              <div>
                <p>©<?php echo date("Y") ?> Todos los derechos reservados.</p>
                <a href="http://www.resosistemas.mx/" target="_blank">RESO Sistemas S.A. de C.V.</a>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>

  <?php include("scripts.php"); ?>
  <!-- <script type="text/javascript" src="scripts/login.js"></script> -->
  <script type="text/javascript">



    function keyInicia(){

    if (window.event.keyCode == 13) {

      IniciaSesion();
    }
  }



  function IniciaSesion(){
    var opcion = $("#opcion").val();
    var usuario = $("#usuario").val();
    var clave = $("#clave").val();
    if (usuario == "" || clave == "") {
      toastr.info("LLENE TODOS LOS CAMPOS","FALTAN DATOS");
      return false;
    }
    else {
      $.blockUI({ message: '<h4> REALIZANDO PETICIÓN...</h4>', css: { backgroundColor: null, color: '#fff', border: null } });
      var datasend = {
        op: "IniciaSesion",
        usuario: usuario,
        clave: clave
      };
      $.ajax({
        type: 'POST',
        url: 'Backend/Usuarios/App.php',
        data: datasend,
        success : function(response){
          response = response.trim();
          if (response == "1") {
            toastr.success(`BIENVENIDO(A): ${usuario}`,"ÉXITO");
            setTimeout(function(){
              // window.location.replace(`index.php?cookie=${usuario}&cpass=${clave}`);
              if (opcion == "1") {
                window.location.href='EquiposOb.php';
              }else if(opcion == "2"){
                window.location.href='EquiposRegr.php';
              }
            },250);
          }
          else {
            toastr.info("Verifique sus datos","ACCESOS INCORRECTOS");
          }
        },
        error : function(e){
          toastr.error(e.responseText, "ERROR 500");
        },
        complete : function(){
           $.unblockUI();
        }
      });
    }
  }

  <?php
  $id_usuariocookie = ($_COOKIE["id_usuario"] ?? "");
   ?>

  </script>



</body>
</html>
