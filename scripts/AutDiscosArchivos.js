getDatosTemporalArchivosDiscos();
function getDatosTemporalArchivosDiscos () {
  datos = {
    op: "getDatosTemporalArchivosDiscos"
  }
  $.ajax({
    type: "post",
    url: "Backend/Discos/App.php",
    data: datos,
    success:function (response) {
      $("#ContenidoAutDiscos").html("");
      response = JSON.parse(response.trim());
      let contenido = "";
      let contador = "0";
      console.log(response);
      response.map(Registros => {
        Registros.ArchivosUnicos.map(NameArchivo => {
          contador ++;
          contenido += `
          <form id="formInserta${contador}">
          <input type="hidden" value="AutorizaDatosArchivo" name="op"></input>
          <input type="hidden" value="${NameArchivo.UrlArchivo}" name="UrlArchivo"></input>
          <input type="hidden" value="${NameArchivo.TipoArchivo}" name="TipoArchivo"></input>
            <div class="row" style="margin-top:3vh;margin-button:2vh;background-color:#FDFEFE;padding:2vh;min-height:auto; max-height:70vh; overflow-y:scroll;box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;border-radius:15px">
              <div class="col-12 col-lg-12 " id="archivotext${contador}" style="text-align:center;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius:15px;">
                <h5 >${NameArchivo.Archivo}</h5>
              </div>
              <div class="col-12 col-lg-12" style="margin-top:2vh">
                <div class="row">
                  <div class="col-4 col-lg-4" style="text-align:center">
                    <h6>Registros</h6>
                  </div>
                  <div class="col-2 col-lg-2" style="text-align:center">
                    <h6>No Orden</h6>
                  </div>
                  <div class="col-2 col-lg-2" style="text-align:center">
                    <h6>No Disco</h6>
                  </div>
                  <div class="col-2 col-lg-2" style="text-align:center">
                    <h6>Cant Piezas</h6>
                  </div>
                  <div class="col-2 col-lg-2" style="text-align:center">
                    <button type="button" class="btn btn-info" onclick="autorizaDatosArchivo(${contador})">Autorizar</button>
                  </div>

          `;
          let colorRegistroOrden = "";
          let colorRegistroPiezas = "";
          let colorRegistroDisco = "";
          let verifica = false;
          Registros.RegistrosDiscoTemp.map(RegistroDisco => {
            if (RegistroDisco.Archivo == NameArchivo.Archivo) {
              if (RegistroDisco.Orden == "" || RegistroDisco.Orden < "1") {
                colorRegistroOrden = "border:3px solid red;"
              }else {
                colorRegistroOrden = ""
              }
              if (RegistroDisco.Disco == "" || RegistroDisco.Disco < "1" ) {
                colorRegistroDisco = "border:3px solid red;"
              }else {
                colorRegistroDisco = ""
              }
              if (RegistroDisco.Piezas < 1) {
                colorRegistroPiezas = "border:3px solid red;"
              }else {
                colorRegistroPiezas = ""
              }
              if (verifica === false) {
                if ((RegistroDisco.Orden == "" || RegistroDisco.Orden < "1") || (RegistroDisco.Disco == "" || RegistroDisco.Disco < "1") || RegistroDisco.Piezas < 1) {
                  $("#archivotext"+contador).removeClass("ArchivoBueno").addClass("ArchivoMalo");
                verifica = true;
                }
              }


              contenido += `
              <div class="col-12 col-lg-12" style="margin-top:1vh;">
                  <input type="hidden" value="${RegistroDisco.idLab_Discos_Ordenes_ArchivosTemporal}" name="idRegistro[]" required></input>
                  <div class="row">
                    <div class="col-4 col-lg-4" style="text-align:center">
                      <span>${RegistroDisco.Job}</span><br>
                      <span>${RegistroDisco.Patient}</span>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <input type="number" name="NoOrden[]" style="${colorRegistroOrden}" class="form-control" value="${RegistroDisco.Orden}" onchange="UpdateDatoRegistro(this.value,${RegistroDisco.idLab_Discos_Ordenes_ArchivosTemporal},1)" required></input>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <input type="number" name="NoDisco[]" style="${colorRegistroDisco}" class="form-control" value="${RegistroDisco.Disco}" onchange="UpdateDatoRegistro(this.value,${RegistroDisco.idLab_Discos_Ordenes_ArchivosTemporal},2)" required></input>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <input type="number" name="CantPiezas[]" style="${colorRegistroPiezas}" class="form-control" value="${RegistroDisco.Piezas}" onchange="UpdateDatoRegistro(this.value,${RegistroDisco.idLab_Discos_Ordenes_ArchivosTemporal},3)" required></input>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                    </div>
                  </div>
                <hr>
              </div>
              `;
            }
          });
          contenido += `
                </div>
              </div>
            </div>
          </form>`
        })
      });
      $("#ContenidoAutDiscos").append(contenido);
    },error:function(e){
      alert(e.responseText);
    }
  });
}

function autorizaDatosArchivo (valor) {
  Swal.fire({
    title: 'Autorizar Datos',
    text: "¿Está usted seguro de autorizar los datos del archivo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Autorizar'
  }).then((result) => {
    if (result.isConfirmed) {
      if (document.getElementById("formInserta"+valor).checkValidity()){
        event.preventDefault();
        var form = $("#formInserta"+valor)[0];
        var data = new FormData(form);

        $.ajax({
          type:"POST",
          url:"Backend/Discos/App.php",
          data:data,
          processData:false,
          contentType:false,
          cache: false,
          timeout:600000,
          success:function(data){
            if (data=="1") {
              Alerta("success","Archivo Autorizado");
              setTimeout(function () {
                getDatosTemporalArchivosDiscos();
              }, 1000);
            }
            else{
              Alerta("info","Archivo no Autorizado");
            }
          },
          error:function(e){
            alert(e.responseText);
          }
        });
      }else {
        Alerta("info","Faltan datos por agregar");
      }
    }
  })
}

function UpdateDatoRegistro (valor,registro,tipo) {
  datos = {
    op: "updateRegistroArchivo",
    valor: valor,
    registro: registro,
    tipo: tipo
  }
  $.ajax({
    type:"post",
    url:"Backend/Discos/App.php",
    data: datos,
    success:function (response){

    },error:function(e){
      alert(e.responseText);
    }
  });
}
