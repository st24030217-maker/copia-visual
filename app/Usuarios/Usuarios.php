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

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Usuarios extends Conexiones {

  function IniciaSesion($usuario,$clave){
    $query = "SELECT pe.perfil,sy.usuario,sy.pwd, sy.id_perfil,
    sy.id_perfil,sy.id_sys_usuario from sys_usuarios as sy
    inner join perfiles as pe on pe.id_perfil = sy.id_perfil
    where sy.usuario = :usuario and sy.pwd = :clave and sy.estatus = 1";

    $consulta = $this->ExecuteQueryWithParam($query, array(":usuario" => $usuario, ":clave" => $clave));
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
    /*TRAE LOS USUARIOS PARA EL INICIO DE SESION*/
    $q = "SELECT SysUs.id_sys_usuario, SysUs.usuario, SysUs.Nombre, IF(EqUs.idEquiposUsuario='' OR isnull(EqUs.idEquiposUsuario), 0, 1) as conPrestamo
    FROM sys_usuarios  AS SysUs
    LEFT JOIN EquiposUsuario as EqUs on EqUs.id_sys_usuario = SysUs.id_sys_usuario and EqUs.fechaRegresado is null or EqUs.fechaRegresado = ''
      where SysUs.ApEquipos = '1' ";
    $usuarios = $this->Select($q,array());
    return '{ "ListadoUsuarios": '.json_encode($usuarios)."}";
  }

  function enviarEmailRecoverPass($Mail){
    $q = "SELECT Usuario_Id, Mail FROM Lab_UsuariosApp WHERE Mail = '$Mail';";
    $cons = $this->Select($q, array());
    if (sizeof($cons) > "0") {
      $IDUsuairo = $cons[0]["Usuario_Id"];
      $vEmail = $cons[0]["Mail"];

      try {
        $contenidoMensaje="
        <html>
        <head>
            <meta charset='UTF-8'>
            <style media='screen'>
              label{
                font-family: FreeMono, monospace;
                font-size: 30px;
                color:#6a6a6a;
                font-weight: bold;
              }

              .buttonEnt{
                padding:15px;
                color: #212121;
                border: 2px solid #2EB7CC;
                border-radius:15px;
                background-color: #2EB7CC;
                color: #fff;
                cursor:pointer;
                font-size:18px;
                text-decoration:none;
              }

              .buttonSobre{
                padding:15px;
                color: #212121;
                border: 2px solid #2EB7CC;
                border-radius:15px;
                background-color: #212121;
                color: #fff;
                cursor:pointer;
                font-size:18px;
                text-decoration:none;
              }
            </style>
        </head>
        <body>
            <span> Recuperación de contraseña DentLab </span>
            <br><br>
            <a href='https://dentcontrol.com.mx/lab/changePassword.php?IdUsuario={$IDUsuairo}'>Por favor ingrese al siguiente link <a>
        </body>
        <html>

        ";

      require_once(__DIR__ . "/../../Backend/PHPMailer_N/src/Exception.php");
      require_once(__DIR__ . "/../../Backend/PHPMailer_N/src/PHPMailer.php");
      require_once(__DIR__ . "/../../Backend/PHPMailer_N/src/SMTP.php");
      $mail = new PHPMailer;
      $mail->isSendmail();

      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = 'mco28.prodns.mx';  // Specify main and backup SMTP servers
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = 'contacto@dentlab.mx';                 // SMTP username
      $mail->Password = 'D3ntL@bcto2022';                           // SMTP password
      $mail->SMTPSecure = 'none';                           // Enable TLS encryption, `ssl` also accepted
      $mail->Port = 587;
      $mail->IsHTML(true);
      $mail->setFrom('contacto@dentlab.mx', 'DentLab');
      $mail->addAddress($vEmail, 'Recuperar Contraseña');
      $mail->Subject = mb_convert_encoding((string)('Recuperación de contraseña DentLab'), 'ISO-8859-1', 'UTF-8');

      $mail->Body = $contenidoMensaje;
      if (!$mail->send())
      {
      }
      else
      {
      }
    } catch (\Exception $e) {

    }

    return "1";
  }else {

    return "0";
  }
}


}
?>
