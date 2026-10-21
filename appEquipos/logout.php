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

echo '<meta http-equiv="refresh" content="0;url=login.php" />';
?>
