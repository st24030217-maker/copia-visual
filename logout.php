<?php
unset($_COOKIE["perfil"]);
unset($_COOKIE["id_usuario"]);
unset($_COOKIE["usuario"]);
unset($_COOKIE["id_perfil"]);
unset($_COOKIE["sesion"]);
unset($_COOKIE["tipo_sesion"]);

setcookie("perfil", "", -1, "/");
setcookie("id_usuario", "", -1, "/");
setcookie("usuario", "", -1, "/");
setcookie("id_perfil", "", -1, "/");
setcookie("sesion", "", -1, "/");
setcookie("tipo_sesion", "", -1, "/");

echo '<script>try{localStorage.removeItem("cv_sesion");localStorage.removeItem("cv_usuario");localStorage.removeItem("cv_perfil");}catch(e){}</script>';
echo '<meta http-equiv="refresh" content="0;url=login.php" />';
?>
