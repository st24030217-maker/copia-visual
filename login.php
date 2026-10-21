<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
$isAuth = (!empty($_SESSION["sesion"]) && $_SESSION["sesion"] === "activa")
  || (!empty($_COOKIE["sesion"]) && $_COOKIE["sesion"] === "activa");
if ($isAuth) {
  echo '<meta http-equiv="refresh" content="0;url=./" />';
  die();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dent Clinica Dental | Login</title>
  <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="vendors/nprogress/nprogress.css" rel="stylesheet">
  <link href="vendors/animate.css/animate.min.css" rel="stylesheet">
  <link href="build/css/custom.min.css" rel="stylesheet">
  <link href="vendors/toastr/toastr.min.css" rel="stylesheet">
</head>
<body class="login">
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
              <input type="text" id="usuario" class="form-control" placeholder="Usuario"/>
            </div>
            <div>
              <input type="password" id="clave" class="form-control" placeholder="Clave" onkeypress="keyInicia()" />
            </div>
            <div>
              <a class="btn btn-default" id="btnLogin" onclick="IniciaSesion()">Iniciar sesión</a>
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
  <script type="text/javascript" src="scripts/login.js"></script>
</body>
</html>
