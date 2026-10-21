const url_m_Config= "Backend/Configuracion/App.php",
url_m_Ordenes = "Backend/Ordenes/App.php",
url_m_Colorimetro = "Backend/Colorimetro/App.php",
url_m_Paquetes = "Backend/Productos_Paquetes/App.php",
url_m_Notificaciones = "Backend/Notificaciones/App.php",
url_m_Doctores = "Backend/Doctores/App.php",
url_m_Inventario = "Backend/Inventario/App.php";

function Cargando() {
  $.blockUI({
    message: `
    <img src="Archivos/logoDent.png" alt="" srcset="" width="150px">
    <h4> REALIZANDO PETICIÓN, POR FAVOR ESPERE...</h4><br><div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
            <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
            </div><div class="circle-clipper right">
            <div class="circle"></div>
        </div>
    </div>
    </div>`,
    css: {
      backgroundColor: null,
      color: '#fff',
      border: null
    }
  });
}

function QuitarCargando() {
  $.unblockUI();
}

async function pAjaxAsync(url,datos,pcarga){
  let respuesta = "";
  if (pcarga == 1) {
    Cargando();
  }
  try {
    respuesta = await $.ajax({
      type: "post",
      url: url,
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (pcarga == 1) {
      QuitarCargando();
    }
    if (respuesta.Resultado) {
      if (respuesta.Siguiente) {
          if (!!respuesta.Msg) {
            toastr.success(respuesta.Msg)
          }
          return respuesta;
      } else {
        if (!!respuesta.Msg) {
          toastr.warning(respuesta.Msg)
        }
      }
    } else if (!respuesta.Resultado) {
      toastr.warning("¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!");
    }
  }
}

async function dialogConfirmSAlert(title,text = "",icon = "warning"){
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: `${title}`,
      text: `${text}`,
      icon: `${icon}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  })
}

async function dialogConfirmAlertify(title,text = ""){
  return new Promise((resolve, reject) => {
    alertify.confirm(`${title}`,`${text}`, async function(){
        resolve(true);
    	},async function(){
        resolve(false);
    	}).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
  })
}

async function openMMinNoMaximizable(header,div){
  if (!alertify[div]) {
    alertify[div] || alertify.dialog(`${div}`,function(){
      return {
          main:function(content){
              this.setContent(content);
          },
          build:function(){
              this.setHeader(header);
          },
          setup:function(){
              return {
                  focus:{
                      element:function(){
                          return this.elements.body.querySelector(this.get('selector'));
                      },
                      select:true
                  },
                  options:{
                      // basic:true,
                      maximizable:false,
                      padding:true,
                      startMaximized: false
                  }
              };
          },
          settings:{
              selector:undefined
          }
      };
    });
    }
    alertify[div]($(`#${div}`)[0]);
}


async function openMMinMaximizable(header,div){
  if (!alertify[div]) {
    alertify[div] || alertify.dialog(`${div}`,function(){
      return {
          main:function(content){
              this.setContent(content);
          },
          build:function(){
              this.setHeader(header);
          },
          setup:function(){
              return {
                  focus:{
                      element:function(){
                          return this.elements.body.querySelector(this.get('selector'));
                      },
                      select:true
                  },
                  options:{
                      // basic:true,
                      maximizable:true,
                      padding:true,
                      startMaximized: false
                  }
              };
          },
          settings:{
              selector:undefined
          }
      };
    });
    }
    alertify[div]($(`#${div}`)[0]);
}

async function openMMaxNoMinimizable(header,div){
  if (!alertify[div]) {
    alertify[div] || alertify.dialog(`${div}`,function(){
      return {
          main:function(content){
              this.setContent(content);
          },
          build:function(){
              this.setHeader(header);
          },
          setup:function(){
              return {
                  focus:{
                      element:function(){
                          return this.elements.body.querySelector(this.get('selector'));
                      },
                      select:true
                  },
                  options:{
                      // basic:true,
                      resizable: true,
                      width: 2000,
                      height: 300,
                      maximizable:false,
                      padding:true,
                      startMaximized: true
                  }
              };
          },
          settings:{
              selector:undefined
          }
      };
    });
    }
    alertify[div]($(`#${div}`)[0]);
}

async function openMMaxMinimizable(header,div){
  if (!alertify[div]) {
    alertify[div] || alertify.dialog(`${div}`,function(){
      return {
          main:function(content){
              this.setContent(content);
          },
          build:function(){
              this.setHeader(header);
          },
          setup:function(){
              return {
                  focus:{
                      element:function(){
                          return this.elements.body.querySelector(this.get('selector'));
                      },
                      select:true
                  },
                  options:{
                      // basic:true,
                      maximizable:true,
                      padding:true,
                      startMaximized: true
                  }
              };
          },
          settings:{
              selector:undefined
          }
      };
    });
    }
    alertify[div]($(`#${div}`)[0]);
}


function currencyFormatter(field, data, column) {
  // valueAccessor: currencyFormatter
  let num = Number(data[field]);
  const esFlotante = num % 1 !== 0;
  let numeroFormateado;
  if (esFlotante) {
    numeroFormateado = num.toLocaleString();
  } else {
    numeroFormateado = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "$" + numeroFormateado;
}

function currencyFormatterNum(num) {
  const esFlotante = num % 1 !== 0;
  let numeroFormateado;
  if (esFlotante) {
    numeroFormateado = num.toLocaleString();
  } else {
    numeroFormateado = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "$" + numeroFormateado;
}

function quitarEspaciosExtras(cadena) {
  return cadena.replace(/\s+/g, " ");
}

function obtenerFechaMayorMenor(arreglo, atributoFecha) {
  return arreglo.reduce(
    (result, current) => {
      const fechaActual = new Date(current[atributoFecha]);

      // Obtener la fecha menor
      if (!result.fechaMenor || fechaActual < result.fechaMenor) {
        result.fechaMenor = fechaActual;
      }

      // Obtener la fecha mayor
      if (!result.fechaMayor || fechaActual > result.fechaMayor) {
        result.fechaMayor = fechaActual;
      }

      return result;
    },
    { fechaMenor: null, fechaMayor: null }
  );
}

async function verifyInputs(dv) {
  console.log(dv);
  return new Promise((resolve, reject) => {
    const all = document.querySelectorAll(
      `#${dv} input, #${dv} select, #${dv} textarea`
    );
    let allTrue = true;
    if (all.length > 0) {
      all.forEach((input) => {
        if (input.required) {
          let alertaInp = document.querySelector(`p[for="${input.id}"]`);
          if (!input.value) {
            if (alertaInp) {
              alertaInp.style.display = "";
              alertaInp.style.color = "#CB4335";
              alertaInp.textContent = alertaInp.dataset.msg;
              allTrue = false;
            }
          } else {
            if (alertaInp) {
              alertaInp.textContent = "";
              alertaInp.style.display = "none";
            }
          }
        }
      });
    }
    if (allTrue) {
      resolve(true);
    } else {
      toastr.info("Faltan campos obligatorios por ingresar.");
      resolve(false);
    }
  });
}

function cleanVerifyInputs(dv) {
  const all = document.querySelectorAll(
    `#${dv} input, #${dv} select, #${dv} textarea`
  );
  if (all.length > 0) {
    all.forEach((input) => {
      if (!input.hasAttribute("data-noclean")) {
        input.value = "";
      }
      if (input.required) {
        let alertaInp = document.querySelector(`p[for="${input.id}"]`);
        if (alertaInp) {
          alertaInp.textContent = "";
          alertaInp.style.display = "none";
        }
      }
    });
  }
}

// Pantalla de carga ejecutiva para impresión de etiquetas térmicas CAD/CAM
window.dentShowExecutiveLabelLoading = function(data) {
  data = data || {};
  var serieOT = data.serie || data.Serie || '---';
  var docNombre = data.doctor || data.Doctor || 'Cargando doctor...';
  var pacNombre = data.paciente || data.Paciente || 'Cargando paciente...';
  var fEnt = data.entrega || data.Fecha_entrega_solicitada || '---';
  var celular = data.celular || data.Celular || '';
  var producto = data.producto || data.Producto || 'Cargando producto...';
  var piezas = data.unidades || data.Piezas || '1';
  var colorimetro = data.color || data.colorimetro || '---';

  var barcodeSvgHtml = '';
  if (typeof JsBarcode === 'function' && serieOT && serieOT !== '---') {
    try {
      var previewSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(previewSvg, serieOT, {
        format: 'CODE128',
        width: 2,
        height: 34,
        fontSize: 12,
        margin: 4,
        background: 'transparent',
        lineColor: '#0f172a'
      });
      barcodeSvgHtml = previewSvg.outerHTML;
    } catch(err) {
      console.warn('Error rendering preview barcode', err);
    }
  }
  if (!barcodeSvgHtml) {
    barcodeSvgHtml = '<div style="height:38px;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:11px;font-family:monospace;">[ CÓDIGO CODE128 • ' + serieOT + ' ]</div>';
  }

  var blockOverlay = document.getElementById('dentBlockUIOverlay');
  if (!blockOverlay) {
    blockOverlay = document.createElement('div');
    blockOverlay.id = 'dentBlockUIOverlay';
    document.body.appendChild(blockOverlay);
  }

  blockOverlay.style.cssText =
    'position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,0.58);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;opacity:1;transition:opacity 220ms ease;';

  blockOverlay.innerHTML = `
    <style>
      @keyframes dentScanLine {
        0% { top: 6%; opacity: 0.2; }
        50% { top: 88%; opacity: 0.95; }
        100% { top: 6%; opacity: 0.2; }
      }
      @keyframes dentProgressFill {
        0% { width: 10%; }
        35% { width: 48%; }
        70% { width: 84%; }
        100% { width: 100%; }
      }
      @keyframes dentCardPop {
        0% { opacity: 0; transform: translateY(12px) scale(0.96); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    </style>
    <div style="width:100%;max-width:410px;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;box-shadow:0 24px 48px -12px rgba(15,23,42,0.32);overflow:hidden;font-family:'Plus Jakarta Sans',system-ui,sans-serif;animation:dentCardPop 260ms cubic-bezier(0.22,1,0.36,1) forwards;text-align:left;">
      <div style="background:#0f172a;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="width:32px;height:32px;border-radius:10px;background:#334e68;display:inline-flex;align-items:center;justify-content:center;color:#f8fafc;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </span>
          <div>
            <div style="font-size:13px;font-weight:700;color:#f8fafc;letter-spacing:-0.01em;">Preparando Etiqueta</div>
            <div style="font-size:10.5px;color:#94a3b8;font-weight:500;">Formato térmico CAD/CAM • dentlab.mx</div>
          </div>
        </div>
        <span style="padding:4px 10px;border-radius:8px;background:#1e293b;border:1px solid #334155;color:#e2e8f0;font-family:monospace;font-size:11px;font-weight:700;">
          OT #${serieOT}
        </span>
      </div>

      <div style="padding:16px 18px;background:#f8fafc;">
        <div style="position:relative;background:#ffffff;border:1px dashed #cbd5e1;border-radius:14px;padding:14px 16px;box-shadow:0 2px 8px rgba(15,23,42,0.04);overflow:hidden;">
          <div style="position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#334e68,#2f6353,transparent);animation:dentScanLine 1.35s ease-in-out infinite;pointer-events:none;"></div>

          <div style="display:flex;align-items:center;justify-content:space-between;font-size:10px;color:#64748b;font-weight:600;border-bottom:1px solid #f1f5f9;padding-bottom:6px;margin-bottom:8px;">
            <span style="font-family:monospace;color:#0f172a;font-weight:700;">OT: ${serieOT}</span>
            <span style="text-transform:uppercase;letter-spacing:0.06em;color:#334e68;font-weight:700;">dentlab.mx</span>
            <span style="font-family:monospace;">Ent: ${fEnt}</span>
          </div>

          <div style="text-align:center;font-size:12.5px;font-weight:800;color:#0f172a;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${docNombre}
          </div>

          <div style="display:flex;justify-content:space-between;gap:8px;font-size:10.5px;color:#334155;margin-bottom:4px;">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><strong>Px:</strong> ${pacNombre}</span>
            <span style="font-family:monospace;color:#475569;flex-shrink:0;">${celular}</span>
          </div>

          <div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;color:#475569;background:#f1f5f9;padding:5px 8px;border-radius:8px;margin-bottom:8px;">
            <span style="font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${producto}</span>
            <span style="font-family:monospace;font-weight:700;color:#334e68;flex-shrink:0;">${piezas} u. • ${colorimetro}</span>
          </div>

          <div style="display:flex;justify-content:center;align-items:center;padding-top:2px;">
            ${barcodeSvgHtml}
          </div>
        </div>

        <div style="margin-top:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:600;color:#475569;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <span style="width:7px;height:7px;border-radius:9999px;background:#2f6353;display:inline-block;box-shadow:0 0 6px rgba(47,99,83,0.5);"></span>
              <span id="dentGlobalPrintStatus">Renderizando código CODE128...</span>
            </span>
            <span id="dentGlobalPrintPercent" style="font-family:monospace;font-size:10px;color:#334e68;font-weight:700;">25%</span>
          </div>
          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:9999px;overflow:hidden;">
            <div style="height:100%;background:linear-gradient(90deg,#334e68 0%,#2f6353 100%);border-radius:9999px;animation:dentProgressFill 2350ms cubic-bezier(0.2,0.8,0.2,1) forwards;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(function () {
    var s = document.getElementById('dentGlobalPrintStatus');
    var p = document.getElementById('dentGlobalPrintPercent');
    if (s) s.textContent = 'Validando formato térmico CAD/CAM...';
    if (p) p.textContent = '60%';
  }, 750);

  setTimeout(function () {
    var s = document.getElementById('dentGlobalPrintStatus');
    var p = document.getElementById('dentGlobalPrintPercent');
    if (s) s.textContent = 'Enviando a cola de impresión...';
    if (p) p.textContent = '88%';
  }, 1600);

  setTimeout(function () {
    var s = document.getElementById('dentGlobalPrintStatus');
    var p = document.getElementById('dentGlobalPrintPercent');
    if (s) s.textContent = '¡Listo! Abriendo cuadro de impresión...';
    if (p) p.textContent = '100%';
  }, 2250);
};

window.dentHideExecutiveLabelLoading = function() {
  var blockOverlay = document.getElementById('dentBlockUIOverlay');
  if (blockOverlay) {
    blockOverlay.style.opacity = '0';
    setTimeout(function() {
      if (blockOverlay && blockOverlay.parentNode) {
        blockOverlay.parentNode.removeChild(blockOverlay);
      }
    }, 220);
  }
};

