function keyInicia(){
  if (window.event.keyCode == 13) {
    IniciaSesion();
  }
}

function IniciaSesion(){
  var usuario = $("#usuario").val();
  var clave = $("#clave").val();
  if (usuario == "" || clave == "") {
    toastr.info("LLENE TODOS LOS CAMPOS","FALTAN DATOS");
  }
  else {
    $.blockUI({ message: '<h4> REALIZANDO PETICIÓN...</h4>', css: { backgroundColor: null, color: '#fff', border: null } });
    var datasend = {
      op: "IniciaSesion",
      usuario: usuario,
      clave: clave
    };
    $.ajax({
      type: 'POST',
      url: 'Backend/Usuarios/App.php',
      data: datasend,
      success : function(response){
        response = response.trim();
        if (response == "1") {
          toastr.success(`BIENVENIDO(A): ${usuario}`,"ÉXITO");
          setTimeout(function(){
            window.location.href = "./";
          }, 600);
        }
        else {
          toastr.info("Verifique sus datos","ACCESOS INCORRECTOS");
        }
      },
      error : function(e){
        toastr.error(e.responseText, "ERROR 500");
      },
      complete : function(){
         $.unblockUI();
      }
    });
  }
}
