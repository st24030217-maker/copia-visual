getArchivosErroneos();
function getArchivosErroneos () {
  let datos = {
    op: "getArchivosErroneos"
  }
  $.ajax({
    type: "post",
    url: "Backend/Discos/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      console.log(response);
      let ArrayJSON = [];
      let ArrayXML = [];
      let NombresArchivoJSON = [];
      let NombresArchivoXML = [];
      let ContenidoJSONText = "";
      let ContenidoXMLText = "";
      let ContadorDivs = "0";
      response.map(DatosJSON => {
        DatosJSON.ArrayJSON.map(ArrJSON => {
          ArrayJSON.push(ArrJSON);
        });
      });
      response.map(DatosXML => {
        DatosXML.ArrayXML.map(ArrXML => {
          ArrayXML.push(ArrXML);
        });
      });
      console.log(ArrayXML);
      if (ArrayJSON.length > 0) {
        ContenidoJSONText += `
          <div class="row">
            <div class="col-12 col-lg-12" style="text-align:center">
              <h5>Archivos Fresadora No 1</h5>
            </div>
          </div>
        `;
      }
      if (ArrayXML.length > 0) {
        ContenidoXMLText += `
          <div class="row">
            <div class="col-12 col-lg-12" style="text-align:center; margin-top:5vh">
              <h5>Archivos Fresadora No 2</h5>
            </div>
          </div>
        `;
      }
      ArrayJSON.map(ArchivoJSON => {
        NombresArchivoJSON.push(ArchivoJSON.NombreArchivo);
      });
      ArrayXML.map(ArchivoXML => {
        NombresArchivoXML.push(ArchivoXML.NombreArchivo);
      });
      NombresArchivoJSON.map(NombreArchivoJSON => {
        ContadorDivs ++;
        ContenidoJSONText += `
        <div class="row"  style="style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; background-color:#F8F9F9">
          <div class="col-12 col-lg-12" style="text-align:center;background-color:#1C2833;cursor:pointer; border-radius:25px" onclick="mostrarDiv(${ContadorDivs})">
            <h6 style="color:white;">Archivo: ${NombreArchivoJSON}</h6>
          </div>
            <div class="row" id="div${ContadorDivs}" style="display:none;padding:3vh">
              <div class="col-5 col-lg-5" style="text-align:center;">
                <h6>REGISTRO</h6>
              </div>
              <div class="col-1 col-lg-1" style="text-align:center;">
                <h6>No Orden</h6>
              </div>
              <div class="col-1 col-lg-1" style="text-align:center;">
                <h6>No Disco</h6>
              </div>
              <div class="col-2 col-lg-2" style="text-align:center;">
                <h6>Cant Piezas</h6>
              </div>
              <div class="col-3 col-lg-3" style="text-align:center;">
                <h6>Estatus</h6>
              </div>
        `;
        let MensajeErrorOrden = "";
        let MensajeErrorDisco = "";
        let MensajeErrorPiezas = "";
        let ColorOrden = "";
        let ColorDisco = "";
        let ColorPiezas = "";
          ArrayJSON.map(ContenidoJSON => {
            if (ContenidoJSON.NombreArchivo == NombreArchivoJSON) {
              ContenidoJSON.RegistrosDisco.map(RegistrosD => {
                // if (RegistrosD.NoOrden == "" || isNaN(RegistrosD.NoOrden)) {
                //   MensajeErrorOrden = "Numero de orden no agregado"; ColorOrden="red";}else {
                //   MensajeErrorOrden = "Numero de Orden agregado correctamente"; ColorOrden="green";
                // }
                if (RegistrosD.NoDisco == "" || isNaN(RegistrosD.NoDisco) || RegistrosD.NoDisco == null || RegistrosD.NoOrden == "" || isNaN(RegistrosD.NoOrden)) {
                  MensajeErrorDisco = "Numero de Orden y/o numero de disco incorrectos"; ColorDisco="red";}else {
                  MensajeErrorDisco = "Numero de orden y disco agregado correctamente";ColorDisco="green";
                }
                if (RegistrosD.CantidadPieas == "" || isNaN(RegistrosD.CantidadPieas) || RegistrosD.CantidadPieas  < 1) {
                  MensajeErrorPiezas = "Registro de piezas incorrecto"; ColorPiezas="red";}else {
                  MensajeErrorPiezas = "Registro de piezas correctos";ColorPiezas="green";
                }
                ContenidoJSONText += `
                <div class="col-12 col-lg-12" >
                  <div class="row" style="margin-top:3vh;box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; padding:3vh">
                    <div class="col-5 col-lg-5">
                      <div class="row">
                        <div class="col-12 col-lg-12" style="text-align:center">
                          <span style="color:#17202A "><b>JobName:</b> ${RegistrosD.JobName}</span>
                          <hr>
                        </div>
                        <div class="col-12 col-lg-12" style="text-align:center">
                          <span style="color:#17202A "><b>Patient:</b> ${RegistrosD.Patient}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <span style="color:${ColorDisco}"><b>${RegistrosD.NoOrden} - ${RegistrosD.NoDisco}</b></span>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <span style="color:${ColorPiezas}"><b>${RegistrosD.CantidadPieas}</b></span>
                    </div>
                    <div class="col-3 col-lg-3" style="text-align:center">
                      <span style="color:${ColorDisco}"><b>${MensajeErrorDisco}</b></span>
                      <hr>
                      <span style="color:${ColorPiezas}"><b>${MensajeErrorPiezas}</b></span>
                    </div>
                  </div>
                </div>
                `;
              });
            }
          });
          ContenidoJSONText += `
              </div>
            </div>
            <hr>
          </div>
          `;
      });

      NombresArchivoXML.map(NombreArchivoXML => {
        ContadorDivs ++;
        ContenidoXMLText += `
        <div class="row"  style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; background-color:#F8F9F9 ">
            <div class="col-12 col-lg-12" style="text-align:center;background-color:#1C2833; border-radius:25px; cursor:pointer;" onclick="mostrarDiv(${ContadorDivs})">
              <h6 style="color:white;"><b>Archivo:</b> ${NombreArchivoXML}</h6>
            </div>
            <div class="row" id="div${ContadorDivs}" style="display:none;padding:3vh">
              <div class="col-5 col-lg-5" style="text-align:center;">
                <h6>REGISTRO</h6>
              </div>
              <div class="col-2 col-lg-2" style="text-align:center;">
                <h6>No Orden y No Disco</h6>
              </div>
              <div class="col-2 col-lg-2" style="text-align:center;">
                <h6>Cant Piezas</h6>
              </div>
              <div class="col-3 col-lg-3" style="text-align:center;">
                <h6>Estatus</h6>
              </div>
        `;
        let MensajeErrorOrden = "";
        let MensajeErrorDisco = "";
        let MensajeErrorPiezas = "";
        let ColorOrden = "";
        let ColorDisco = "";
        let ColorPiezas = "";
          ArrayXML.map(ContenidoXML => {
            if (ContenidoXML.NombreArchivo == NombreArchivoXML) {
              ContenidoXML.RegistrosDisco.map(RegistrosD => {
                // if (RegistrosD.NoOrden == "" || isNaN(RegistrosD.NoOrden)) {
                  // MensajeErrorOrden = "Numero de orden no agregado"; ColorOrden="red";}else {
                  // MensajeErrorOrden = "Numero de Orden agregado correctamente";  ColorOrden="green";
                // }
                if (RegistrosD.NoDisco == "" || isNaN(RegistrosD.NoDisco) || RegistrosD.NoDisco == null || RegistrosD.NoOrden == "" || isNaN(RegistrosD.NoOrden)) {
                  MensajeErrorDisco = "Numero de Orden y/o numero de disco incorrectos"; ColorDisco="red";}else {
                  MensajeErrorDisco = "Numero de orden y disco agregado correctamente";ColorDisco="green";
                }
                if (RegistrosD.CantidadPieas == "" || isNaN(RegistrosD.CantidadPieas) || RegistrosD.CantidadPieas  < 1) {
                  MensajeErrorPiezas = "Registro de piezas incorrecto"; ColorPiezas="red";}else {
                  MensajeErrorPiezas = "Registro de piezas correctos";ColorPiezas="green";
                }
                ContenidoXMLText += `
                <div class="col-12 col-lg-12" >
                  <div class="row" style="margin-top:3vh;box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; padding:3vh">
                    <div class="col-5 col-lg-5">
                      <div class="row">
                        <div class="col-12 col-lg-12" style="text-align:center">
                          <span style="color:#17202A "><b>JobName:</b> ${RegistrosD.JobName}</span>
                          <hr>
                        </div>
                        <div class="col-12 col-lg-12" style="text-align:center">
                          <span style="color:#17202A "><b>Patient:</b> ${RegistrosD.Patient}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <span style="color:${ColorDisco}"><b>${RegistrosD.NoOrden} - ${RegistrosD.NoDisco}</b></span>
                    </div>
                    <div class="col-2 col-lg-2" style="text-align:center">
                      <span style="color:${ColorPiezas}"><b>${RegistrosD.CantidadPieas}</b></span>
                    </div>
                    <div class="col-3 col-lg-3" style="text-align:center">
                      <span style="color:${ColorDisco}"><b>${MensajeErrorDisco}</b></span>
                      <hr>
                      <span style="color:${ColorPiezas}"><b>${MensajeErrorPiezas}</b></span>
                    </div>
                  </div>
                </div>
                `;
              });
            }
          });
        ContenidoXMLText += `
            </div>
          </div>
          <hr>
        </div>
        `;
      });
      $("#ContenidoRegistrosArchivosJSON").append(ContenidoJSONText);
      $("#ContenidoRegistrosArchivosXML").append(ContenidoXMLText);
    }
  });
}

function mostrarDiv(valor) {
  if ($("#div"+valor).is(':visible')) {
      $("#div"+valor).fadeOut();
  } else {
      $("#div"+valor).fadeIn();
  }
}
