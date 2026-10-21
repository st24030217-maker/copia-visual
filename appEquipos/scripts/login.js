


function IniciaSesion2(opcion){
  var usuario = $("#usuario").val();
  var clave = $("#clave").val();
  if (usuario == "" || clave == "") {
    toastr.info("LLENE TODOS LOS CAMPOS","FALTAN DATOS");
    return false;
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
            // window.location.replace(`index.php?cookie=${usuario}&cpass=${clave}`);
            if (opcion == "1") {
              window.location.href='EquiposOb.php';
            }else if(opcion == "2"){
              window.location.href='EquiposRegr.php';
            }
          },750);
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
