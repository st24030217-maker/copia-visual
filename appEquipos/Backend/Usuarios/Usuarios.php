<?php
if(file_exists("../Conexiones/Conexiones.php")){
  require_once("../Conexiones/Conexiones.php");
}
else{
  if(file_exists("./Conexiones/Conexiones.php")){
    require_once("./Conexiones/Conexiones.php");
  }
  else if(file_exists("../Conexiones/Conexiones.php")){
    require_once("../Conexiones/Conexiones.php");
  }
  else if(file_exists("../../Conexiones/Conexiones.php")){
    require_once("../../Conexiones/Conexiones.php");
  }
  else if(file_exists("././Backend/Conexiones/Conexiones.php")){
    require_once("././Backend/Conexiones/Conexiones.php");
  }
}

class Usuarios extends Conexiones {

  function IniciaSesion($usuario,$clave){
    $query = "SELECT pe.perfil,sy.usuario,sy.pwd, sy.id_perfil,
    sy.id_perfil,sy.id_sys_usuario from sys_usuarios as sy
    inner join perfiles as pe on pe.id_perfil = sy.id_perfil
    where sy.usuario = '$usuario' and sy.pwd = '$clave' and sy.estatus = 1";

    $consulta = $this->Select($query);
    if (sizeof($consulta) > 0) {
      setcookie("perfil",$consulta[0]["perfil"], time() + (86400*30), "/");
      setcookie("id_usuario",$consulta[0]["id_sys_usuario"], time() + (86400*30), "/");
      setcookie("usuario",$consulta[0]["usuario"], time() + (86400*30), "/");
      setcookie("id_perfil",$consulta[0]["id_perfil"], time() + (86400*30), "/");
      setcookie("sesion","activa", time() + (86400*30), "/");
      return "1";
    }
    else {
      return "0";
    }
  }

  function getUsuariosAppEquipos(){
    $q = "SELECT usuario, Nombre from sys_usuarios where ApEquipos = '1'";
    return $this->Select($q,array());
  }

}
?>
