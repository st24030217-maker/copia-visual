<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
$_SESSION = array();
if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(session_name(), '', time() - 42000,
    $params["path"], $params["domain"],
    $params["secure"], $params["httponly"]
  );
}
session_destroy();

unset($_COOKIE["perfil"]);
unset($_COOKIE["id_usuario"]);
unset($_COOKIE["usuario"]);
unset($_COOKIE["id_perfil"]);
unset($_COOKIE["sesion"]);
unset($_COOKIE["tipo_sesion"]);

$isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
$cookieOptions = [
  'expires' => time() - 3600,
  'path' => '/',
  'secure' => $isSecure,
  'httponly' => false,
  'samesite' => 'Lax'
];

setcookie("perfil", "", $cookieOptions);
setcookie("id_usuario", "", $cookieOptions);
setcookie("usuario", "", $cookieOptions);
setcookie("id_perfil", "", $cookieOptions);
setcookie("sesion", "", $cookieOptions);
setcookie("tipo_sesion", "", $cookieOptions);

echo '<meta http-equiv="refresh" content="0;url=login.php" />';
?>
