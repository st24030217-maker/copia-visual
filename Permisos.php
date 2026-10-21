<?php
$isLocalhost = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost:') === 0 || strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1:') === 0;
if (!$isLocalhost && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == 'off')) {
	$redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	header("Location: $redirect_url");
	exit();
}
require_once("Backend/Usuarios/Usuarios.php");
$Usuarios1 = new Usuarios();
$idPerfil = $_GET["idPerfil"] ?? "";

?>
<!DOCTYPE html>
<html lang="en">
<head>

  <?php include("estilos.php"); ?>
	<title>Dent Clinica Dental | Inicio </title>
</head>
  <body class="nav-md">
    <div class="container body" >
			<?php include("menus.php");?>
        <div class="right_col" role="main">
          <input type="text" id="txtIdPerfil" value="<?php echo $idPerfil ?>" style="display:none;">
          <div class="row" >
            <?php
            $ListMenuPadre = $Usuarios1->getMenuPadre();
            $ContenidoMenuP = "";
            $MenuPadre = "";
            for ($i=0; $i < sizeof($ListMenuPadre) ; $i++) {
              $id_menu = $ListMenuPadre[$i]["id_menu"];
              $Descripcion = $ListMenuPadre[$i]["Descripcion"];
              $Usuarios4 = new Usuarios();
              $PermisoActivo1 = $Usuarios4->getPerfilesPermisos($idPerfil,$id_menu);
              if ($PermisoActivo1 == "1") {
                $checked1 = "checked";
              }else {
                $checked1 = "";
              }
              echo "
                <div class='col-12 offset-lg-2  col-lg-8 text-center'>

									<div class='row'>
                    <div class='col-12 col-lg-12' style='background-color:#D5D5D5; border-radius:20px 20px 0px 0px;padding:20px;margin-top:10px;border:1px #9A9A9A solid;'>
                    <label for=checkIDPadre$id_menu'' style='color:#212121; font-size:20px;font-weight:bold;'> $Descripcion</label>
                    <input type='checkbox' name='checkIDPadre' id='checkIDPadre$id_menu' onclick='asignarPermiso(\"$id_menu\");' $checked1>
                    </div>
                  </div>
                </div>
                ";
                $Usuarios2 = new Usuarios();
                $ListMenuHijo = $Usuarios2->getMenuHijo($id_menu);
                for ($j=0; $j < sizeof($ListMenuHijo) ; $j++) {
                $id_menuH = $ListMenuHijo[$j]["id_menu"];
                $DescripcionH = $ListMenuHijo[$j]["Descripcion"];

                $Usuarios5 = new Usuarios();
                $PermisoActivo2 = $Usuarios5->getPerfilesPermisos($idPerfil,$id_menuH);

                if ($PermisoActivo2 == "1") {
                  $checked2 = "checked";
                }else {
                  $checked2 = "";
                }
                echo "
                <div class='col-12 offset-lg-2  col-lg-8 text-center' style='background-color:#696969; padding:15px;'>
                  <div class='row'>
                    <div class='col-12 col-lg-12 text-center' style='color:#fff;'>
                      <label for='checkIDHijo$id_menuH' style='color:#fff; font-size:15px; font-weight:bold;'> $DescripcionH</label>
                      <input type='checkbox' name='checkIDHijo' id='checkIDHijo$id_menuH' onclick='asignarPermiso(\"$id_menuH\");' $checked2>
                    </div>
                  </div>
                  <br><br>
                </div>
                ";

                $Usuarios3 = new Usuarios();
                $ListMenuNieto = $Usuarios3->getMenuNieto($id_menuH);

                  echo "
                  <div class='col-12 offset-lg-2  col-lg-8 text-center' style='background-color:#292929;padding:15px; box-shadow: 5px 10px 18px #888888;'>
                    <div class='row'>

											";
											for ($k=0; $k < sizeof($ListMenuNieto) ; $k++) {
												$id_menuN= $ListMenuNieto[$k]["id_menu"];
												$DescripcionN = $ListMenuNieto[$k]["Descripcion"];
												$Usuarios6 = new Usuarios();
												$PermisoActivo3 = $Usuarios6->getPerfilesPermisos($idPerfil,$id_menuN);
												if ($PermisoActivo3 == "1") {
													$checked3 = "checked";
												}else {
													$checked3 = "";
												}
												echo "
												<div class='col-12 col-lg-3 text-center' >
													<label for='checkIDNieto$id_menuN' style='color:#fff;''> $DescripcionN </label>
													<input type='checkbox' name='checkIDNieto' id='checkIDNieto$id_menuN'  onclick='asignarPermiso(\"$id_menuN\");' $checked3>
												</div>
												";
												}
											echo"

                    </div>
                    <br><br>
                  </div>
                  ";

                }
              }
             ?>
          </div>
					<br><br><br>
        </div>
      <?php include("footer.php"); ?>
      </div>
    </div>
		<?php include("scripts.php"); ?>
    <script type="text/javascript">

      function asignarPermiso(idMenu){
        var idPerfil = $("#txtIdPerfil").val();
        $.ajax({
          type: "POST",
          url: "Backend/Usuarios/App.php",
          data: "op=gestionPermisosPerfil"+
          "&id_perfil="+idPerfil+"&id_menu="+idMenu,
          success:function(response){
            if (response == "1") {
              location.reload();
            }else {
              location.reload();
            }
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      }

    </script>
  </body>
</html>
