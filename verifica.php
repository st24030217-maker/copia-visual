<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$hasSession = (!empty($_SESSION["sesion"]) && $_SESSION["sesion"] === "activa")
  || (!empty($_COOKIE["sesion"]) && $_COOKIE["sesion"] === "activa");

if (!$hasSession) {
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
}

if (isset($_COOKIE["tipo_sesion"]) && $_COOKIE["tipo_sesion"] !== "1") {
  echo '<meta http-equiv="refresh" content="0;url=logout.php">';
  die();
}
?>
