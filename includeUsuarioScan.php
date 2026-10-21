<!-- <?php
$idOrden = $_GET["idOrden"] ?? "";

require_once("Backend/Ordenes/Ordenes.php");
$Ordenes = new Ordenes();
$Usuario = $Ordenes->getUsuarioAsignadoOrden($idOrden);
for ($i=0; $i <sizeof($Usuario) ; $i++) {
  $idLab_sys_usuario2 = $Usuario[$i]["idLab_sys_usuario"];
}
 ?>
 <select class="selectpicker" data-live-search="true" name="slctUsuarioEscan" style="margin-top:45px;" required>
  <option value="">Lista de Usuarios</option>
  <?php
    require_once("Backend/Usuarios/Usuarios.php");
    $Usuarios = new Usuarios();
    $ListU = $Usuarios->getUsuariosEscaneador();
    for ($i=0; $i <sizeof($ListU) ; $i++) {
      $idLab_sys_usuario = $ListU[$i]["idLab_sys_usuario"];
      $Nombre = $ListU[$i]["Nombre"];

      if ($idLab_sys_usuario == $idLab_sys_usuario2) {
        $slcted = "selected";
      }
      echo "
        <option value='$idLab_sys_usuario' $slcted>$Nombre</option>
      ";
    }
     ?>
 </select> -->
