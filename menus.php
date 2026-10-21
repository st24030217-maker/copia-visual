<?php


$id_perfil = $_COOKIE["id_perfil"] ?? "";
require_once("Backend/Usuarios/Usuarios.php");
$Usuarios = new Usuarios();
$ListaMenuPadre = $Usuarios->MenuPadre();
$Usuarios2 = new Usuarios();
$ConfPermiso = $Usuarios2->getPermisosPerfilConf($id_perfil);
require_once("Backend/Configuracion/Configuracion.php");
$Configuracion = new Configuracion();
$VerConfiguracionPermiso = $Configuracion->verMenuConfiguracion();
?>
<div class="main_container">
  <div class="col-md-3 left_col">
    <div class="left_col scroll-view">
      <div class="navbar nav_title" style="border: 0;">
        <a href="./" class="site_title"> <span><?php echo ucfirst(strtolower($_COOKIE["perfil"] ?? "")); ?></span></a>
      </div>
      <div class="clearfix"></div>
      <div class="profile clearfix">
        <div class="profile_pic">
          <img src="Archivos/DentLabLogo.jpeg" alt="..." class="img-circle profile_img" >
        </div>
        <div class="profile_info">
          <span>Bienvenido(a):</span>
          <h2 id="nombreUser"><?php echo $_COOKIE["usuario"] ?? ""; ?></h2>
        </div>
      </div>
      <br />
      <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
          <h3><?php echo $_COOKIE["nombrePlantel"] ?? "";?></h3>
          <ul class="nav side-menu">
            <li>
              <a href="./"><i class="fa fa-home"></i> Inicio </a>
            </li>
            <?php
            for ($i=0; $i < sizeof($ListaMenuPadre); $i++) {
              $id_menuPadre = $ListaMenuPadre[$i]["id_menu"];
              $DescripcionPadre = $ListaMenuPadre[$i]["Descripcion"];
              $URLPadre = $ListaMenuPadre[$i]["URL"];
              $ArgumentosPadre = $ListaMenuPadre[$i]["Argumentos"];

              $Usuarios = new Usuarios();
              $ListaMenuHijo = $Usuarios->MenuHijo($id_menuPadre);
              $menuHijo = "";

              if (sizeof($ListaMenuHijo) == 0) {
                echo "
                <li>
                <a href='$URLPadre'><i class='$ArgumentosPadre'></i> $DescripcionPadre </a>
                </li>
                ";
              }
              else {
                $menuHijo .= "
                <li>
                <a><i class='$ArgumentosPadre'></i> $DescripcionPadre <span class='fa fa-chevron-down'></span></a>
                <ul class='nav child_menu'>
                ";

                for ($y=0; $y < sizeof($ListaMenuHijo); $y++) {
                  $id_menuHijo = $ListaMenuHijo[$y]["id_menu"];
                  $DescripcionHijo = $ListaMenuHijo[$y]["Descripcion"];
                  $URLHijo = $ListaMenuHijo[$y]["URL"];
                  $ArgumentosHijo = $ListaMenuHijo[$y]["Argumentos"];

                  $Hijo = new Usuarios();
                  $HijoDelHijo = $Hijo->MenuHijoDelHijo($id_menuHijo);
                  $menuHijoHijo = "";
                  if (sizeof($HijoDelHijo) == 0) {
                    $menuHijo .= "<li><a href='$URLHijo'><i class='$ArgumentosHijo'></i>$DescripcionHijo</a></li>";
                  }else{
                    $menuHijo .= "<li>
                    <a> <i class='$ArgumentosHijo'></i> $DescripcionHijo <span class='fa fa-chevron-down'></span></a>
                    <ul class='nav child_menu'>";

                    for ($j=0; $j < sizeof($HijoDelHijo) ; $j++) {

                      $id_menuNieto = $HijoDelHijo[$j]["id_menu"];
                      $DescripcionNieto = $HijoDelHijo[$j]["Descripcion"];
                      $URLNieto = $HijoDelHijo[$j]["URL"];
                      $ArgumentosNieto = $HijoDelHijo[$j]["Argumentos"];

                      $menuHijo .= "<li><a href='$URLNieto'>$DescripcionNieto</a></li>";
                    }
                    $menuHijo .= "
                    </ul>
                    </li>
                    ";

                  }

                }
                $menuHijo .= "
                </ul>
                </li>
                ";
              }
              echo $menuHijo;
            }
            ?>
          </ul>
        </div>
      </div>
      <div class="sidebar-footer hidden-small">
        <a data-toggle="tooltip" data-placement="top" title="Configuraciones">
          <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Pantalla completa" id="btnToggleFullScreen" onclick="toggleFullScreen(document.documentElement)">
          <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Lock">
          <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Cerrar sesión" href="logout.php">
          <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </div>


  <div class="top_nav">
    <div class="nav_menu">
      <div class="nav toggle">
        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
      </div>
      <nav class="nav navbar-nav">
        <ul class="navbar-right">
          <?php if ($VerConfiguracionPermiso == "1" || $ConfPermiso == "1"): ?>
          <li class="nav-item dropdown open" style="padding-left: 15px;">
            <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-gears fa-2px" style="color:#fff;"></i>
            </a>
            <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
              <!-- <a class="dropdown-item"  href="penalizacion.php"><i class="fa fa-exclamation-circle pull-right" style="color:orange;"></i>Establecer Penalización</a> -->
              <!-- <a class="dropdown-item"  href="Usuarios.php"><i class="fa fa-exclamation-circle pull-right" style="color:#C3006D ;"></i>Usuarios</a> -->
<!--                  <a class="dropdown-item"  href="ConfigPuntos.php"><i class="fa fa-money pull-right" style="color:#163764 ;"></i>Configuracion de puntos</a>
              <a class="dropdown-item"  href="Membresias.php"><i class="fa fa-credit-card pull-right" style="color:#00B913 ;"></i>Membresias</a>
              <a class="dropdown-item"  href="Clientes.php"><i class="fa fa-users pull-right" style="color:#DE0040 ;"></i>Clientes</a> -->
              <a class="dropdown-item"  href="UsuariosPermisos.php"><i class="fa fa-users pull-right" style="color:#DE0040 ;"></i>Permisos</a>
              <a class="dropdown-item"  href="Configuracion.php"><i class="fa fa-users pull-right" style="color:#DE0040 ;"></i>Configuracion</a>

              <!-- <a class="dropdown-item"  href="MotivosCancelacion.php"><i class="fa fa-slack pull-right" style="color:#FFDC00 ;"></i>MotivosCancelacion</a> -->
              <!-- <a class="dropdown-item"  href="TiposRecordatorio.php"><i class="fa fa-cog pull-right" style="color:#00F2C1 ;"></i>Tipos de Recordatorio</a> -->
              <!-- <a class="dropdown-item"  href="SeguimientoDiscos.php"><i class="fa fa-eye pull-right" style="color:#001CF2 ;"></i>Seguimiento de Discos</a> -->
              <!-- <a class="dropdown-item"  href="BanersApp.php"><i class="fa fa-columns pull-right" style="color:#00B34D ;"></i>BanersApp</a> -->
              <!-- <a class="dropdown-item"  href="TiposPush.php"><i class="fa fa-cog pull-right" style="color:#663300;"></i>TiposPush</a> -->
              <!-- <a class="dropdown-item"  href="MarcasLab.php"><i class="fa fa-maxcdn pull-right" style="color:#660033;"></i>Marcas de Laboratorios</a> -->
              <!-- <a class="dropdown-item"  href="DoctoresTiposApp.php"><i class="fa fa-cog pull-right" style="color:#00695C;"></i>Doctores Tipos</a> -->
              <!-- <a class="dropdown-item"  href="CategoriasT.php"><i class="fa fa-list-ol pull-right" style="color:#9575CD;"></i>Categorias</a> -->
              <!-- <a class="dropdown-item"  href="MensajesPush.php"><i class="fa fa-comments-o pull-right" style="color:#D84315;"></i>MensajesPush</a> -->
              <!-- <a class="dropdown-item"  href="ProductosApp.php"><i class="fa fa-genderless pull-right" style="color:#43919B;"></i>ProductosApp</a> -->



            </div>
          </li>
        <?php endif; ?>

        <?php if ($id_perfil == 12) { ?>
          <li role="presentation" class="nav-item dropdown open">
              <a href="javascript:;" class="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-comment" style="color:#fff;"></i>
                <span class="badge bg-green" id="cantNotifications"></span>
              </a>
              <ul id="content_notifications" class="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 17px, 0px);">

              </ul>
            </li>
        <?php } ?>
        </ul>
      </nav>
    </div>
  </div>
</div>
