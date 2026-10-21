<?php
if (!isset($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off' ){
  $redirect_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  header("Location: $redirect_url");
  exit();
}
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

    <section>
     <ol class="breadcrumb">
       <li><a class="titulo">Mensajes push</a></li>
     </ol>

   </section>


   <form id="FormPush" action="backend/MensajesPush/App.php" method="post">

    <div class="form-group row">
      <div class="col-md-12 contenedores">
        <div class="contenedoresNav text-center">
          <div class="span">
            <i class="fad fa-calendar-edit"></i> Datos Generales
          </div>
          <br>
          <div class="form-group row" style="padding:10px;">
            <div class="col-md-4">
              <input type="text" class="form-control" id="tituloMensaje" name="tituloMensaje" placeholder="Inserte titulo del mensaje aquí" required>
            </div>
            <div class="col-md-8">
              <input type="text" id="textoMensaje" name="textoMensaje" placeholder="Inserte cuerpo del mensaje aquí" required>
            </div>
          </div>
          <div class="form-group row" style="padding:10px;">
            <div class="col-lg-12">
              <h6>Con Fecha y Hora donde se recibira el mensaje</h6>
              <label class='switch' onclick="ChangeHora();">
                <input type='checkbox' id='checkHora'>
                <span class='slider round'></span>
              </label>
            </div>
            <div class="col-md-4 offset-lg-4">
              <div id="HorarioDate" class='input-group date' style="width:100%">
                <input type='text' class="form-control" id='DateHorario' name='DateHorario' style="width:100%;" placeholder="Agrega Fecha"/>
              </div>
            </div>

          </div>
          <div class="form-group row" style="padding:10px;">
            <div class="col-12 col-lg-12 ">
              <br>
              <button class="btn btn-outline-info text-center" type="button" name="btnEnviarPush" id="btnEnviarPush"><i class="fal fa-paper-plane"></i> Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contenedoresNav text-center">
      <div class="span">
        <i class="fad fa-user-md"></i> Usuarios
      </div>
      <br>
      <div class="Table-responsive" style="padding:10px;">
        <div class="row">
          <div class="col-12 col-lg-6 offset-lg-3">
            <div class='inner-addon right-addon'>
              <div id='Icono' class='icono-inp'>
                <i class="fa fa-search" style="color:#000000;"></i>
              </div>
            <input type="text" class="form-control text-center" id="nptBuscar" value="" placeholder="Ingrese un dato del doctor"  onkeyup="Busqueda();" style="border-radius:5px">
          </div>
        </div>
        </div>
        <br>
        <table id="ListadodeUsuariosDoctores" class="table text-center table-hover" style="color:black;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enviar a todos<br>
                <label class='switch'>
                  <input type='checkbox' id='checkTodos' onclick="checkAll()">
                  <span class='slider round'></span>
                </label>
              </th>
            </tr>
          </thead>

          <tbody>
            <?php
            require_once ("Backend/Push/PushTipos.php");
            $PushTipos = new PushTipos();
            $UsuariosT = $PushTipos->TablaUsuarios();
            for ($i=0; $i <sizeof($UsuariosT); $i++){
              $idDoctor = $UsuariosT[$i]["idDoctores"];
              $Nombre = $UsuariosT[$i]["doctor"];
              $Correo = $UsuariosT[$i]["Email"];
              $DispositivoDr = $UsuariosT[$i]["tokenOS"];

              echo "
              <tr>
              <td>$Nombre</td>
              <td>$Correo</td>
              <td class= 'text-center'>
                <label class='switch'>
                  <input type='checkbox' id='DateHorario$idDoctor' name='chkEnviar' value='$DispositivoDr'>
                  <span class='slider round'></span>
                </label>
              </td>
              </tr>
              ";

            }
            ?>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </form>
</div>
<?php include("footer.php"); ?>
</div>

<?php include("scripts.php"); ?>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css" rel="stylesheet" />

<!--//////////////////////////////////////////////////////////////////////////////////////////////////////-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.js" ></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.css"/>
<script type="text/javascript">
  $(document).ready(function(){
    ChangeHora();
    // changeDoctores();
    $("#textoMensaje").emojioneArea();
    $.datetimepicker.setLocale('es');
  });

  var ListadodeUsuariosDoctores = $('#ListadodeUsuariosDoctores').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY ORDENES POR MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR"
    },
    "columnDefs": [{
      "className": "dt-center", "targets": "_all"
    }],
    "order": [],
    "bSort": false,
    "bPaginate":false,
    "bFilter": false,
    "bInfo":false,
  });

  function Busqueda(){
     const TablaRenglon = document.getElementById('ListadodeUsuariosDoctores');
     const TextoBusqueda = document.getElementById('nptBuscar').value.toLowerCase();
     let total = 0;
     for (let i = 1; i < TablaRenglon.rows.length; i++) {

         let found = false;
         const cellsOfRow = TablaRenglon.rows[i].getElementsByTagName('td');
         for (let j = 0; j < cellsOfRow.length && !found; j++) {
             const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
             if (TextoBusqueda.length == 0 || compareWith.indexOf(TextoBusqueda) > -1) {
                 found = true;
                 total++;
             }
         }
         if (found) {
             TablaRenglon.rows[i].style.display = '';
         } else {
             TablaRenglon.rows[i].style.display = 'none';
         }
     }
   }

  function checkAll(){
    if (document.getElementById("checkTodos").checked) {
      $("[name='chkEnviar']").prop("checked", true);
    }
    else {
      $("[name='chkEnviar']").prop("checked", false);
    }
  }

  $(function() {
    $('#DateHorario').datetimepicker({
      daysOfWeekDisabled: [0, 6],
      todayHighlight: true,
      autoclose: true,
      format: 'Y-m-d H:i',
      minDate: new Date().getTime(),
      minTime: '07:00'
    });
  });

  var ArrTokens = [];

  $("#textoMensaje").emojioneArea({
    emojiPlaceholder: ":smile_cat:",
    searchPlaceholder: "Search",
    buttonTitle: "Use your TAB key to insert emoji faster",
    searchPosition: "bottom",
    pickerPosition: "bottom"
  });
  $("#tituloMensaje").emojioneArea({
    emojiPlaceholder: ":smile_cat:",
    searchPlaceholder: "Search",
    buttonTitle: "Use your TAB key to insert emoji faster",
    searchPosition: "bottom",
    pickerPosition: "bottom"
  });

  function ChangeHora(){
    if ($('#checkHora').is(':checked')){
      $("#DateHorario").prop("disabled",false);
    }else {
      $("#DateHorario").prop("disabled",true);
    }
  }

  $("#btnEnviarPush").click(function(event){
    if (document.getElementById("FormPush").checkValidity()) {
      event.preventDefault();
      AddArr();
      if (ArrTokens.length == 0) {
        toastr.info("No hay ningún cliente seleccionado","INFO");
      }else {
        $.blockUI({ message: `<h4 style="text-align:center">REALIZANDO PETICIÓN, POR FAVOR ESPERE...</h4>`, css: { backgroundColor: null, color: '#fff', border: null } });
        var form = $('#FormPush')[0];
        var data = new FormData(form);
        data.append("op","enviarPush");
        data.append("array",JSON.stringify(ArrTokens));
        $("#btnEnviarPush").prop("disabled",true);
        $.ajax({
          type: "POST",
          url: "Backend/Push/App.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
          success: function (data) {
            data = data.trim();
            if (data == "1") {
              toastr.success("Notificación enviada exitosamente","ÉXITO");
              setTimeout(function () {
                location.reload();
              }, 1500);
            }
            else {
              toastr.warning("Error al mandar notificaciones, revisalo de nuevo","WARNING");
            }
          },
          error: function (e) {
            toastr.error(e.responseText,"ERROR 500");
          },complete:function(){
            $.unblockUI();
            $("#btnEnviarPush").prop("disabled",false);
            LimpiarDatos();
          }
        });
      }
    }
  });
//Aqui

function AddArr(){
  $("input[name='chkEnviar']:checked").each(function () {
    ArrTokens.push(this.value);
  });
  console.log(ArrTokens);
}

function LimpiarDatos(){
  ArrTokens = [];
  console.log(ArrTokens);
}

</script>
</body>
</html>
