ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let conf_principal = {
  listDisk: undefined
}

$(document).ready(function(){
  SetFechasFiltros();
  getDiscosActivosFecha();
})

function onchangeFiltro(){
  // $("#divIncludeTablaInventarioDiscos").empty();
  // var fechaini = $("#FechaInicio").val();
  // var fechafin = $("#FechaTermino").val();
  // $("#divIncludeTablaInventarioDiscos").load(`Include_DiscosActivos.php?estado=1&fechaInicio=${fechaini}&fechaFin=${fechafin}`);
  getInventarioDiscosFechaJS();
}

function SetFechasFiltros(){
  var today = new Date();
  var last = new Date();
  last.setDate(last.getDate()-5);

  var yi = addZero(last.getFullYear());
  var mti = addZero(parseInt(last.getMonth()) + 1);
  var di = addZero(parseInt(last.getDate()));
  var currentFechaInicio = yi + "-" + mti + "-" + di;

  var yf = addZero(today.getFullYear());
  var mtf = addZero(parseInt(today.getMonth()) + 1);
  var df = addZero(today.getDate());
  var currentFechaFin = yf + "-" + mtf + "-" + df;

  $("#FechaInicio").val(currentFechaInicio);
  $("#FechaTermino").val(currentFechaFin);

  onchangeFiltro();
  getInventarioDiscosFechaJS();
}

const getInventarioDiscosFechaJS = async () => {
  let dataS = {
    op: "getInventarioDiscosFechaJS",
    estado: 1,
    fechaInicio: $("#FechaInicio").val(),
    fechaFin: $("#FechaTermino").val(),
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    printInventarioDiscosFechaJS(ajaxR.Data);
  }
}

const printInventarioDiscosFechaJS = (data) => {
  if (conf_principal.listDisk) {
    // conf_principal.listDisk.destroy();
    conf_principal.listDisk.dataSource = data,
    conf_principal.listDisk.refresh();
    return;
  }
  conf_principal.listDisk = new ej.grids.Grid({
    dataSource: data,
    height: "60vh",
    allowFiltering: true,
    filterSettings: { type:'Menu' },
    // allowPaging: true,
    allowTextWrap: true,
    toolbar: ['Search'],
    // pageSettings: { pageSize: 7 },
    columns: [
      { field: "Codigo", headerText: "Código", textAlign: "Center", width: 100, allowFiltering: false},
      { field: "Marca", headerText: "Marca", textAlign: "Center", width: 100, filter: { type : 'CheckBox' }},
      { field: "Colorimetro", headerText: "Colorimetro", textAlign: "Center", width: 120, filter: { type : 'CheckBox' }},
      { field: "Tamaño", headerText: "Medida", textAlign: "Center", width: 100, allowFiltering: false},
      // { field: "StatusT", headerText: "Status", textAlign: "Center", width: 100,},
      { field: "FechaSlida", headerText: "Fecha Salida", textAlign: "Center", width: 100, allowFiltering: false},
      { field: "Utilizadas", headerText: "Autorizadas (usadas)", textAlign: "Center", width: 130, allowFiltering: false},
      { field: "PorcentUtilizado", headerText: "Porcentaje autorizado", textAlign: "Center", width: 150, template: "#porcentDiskTemplate", allowFiltering: false},
      { field: "Restantes", headerText: "Restantes (por autorizar)", textAlign: "Center", width: 130, allowFiltering: false},
      // { field: "", headerText: "", width: 80, template: "#viewDetailTemplate"},
      // { field: "", headerText: "", width: "100", template: "#btnAddToOrderTemplate"},
      { field: "", headerText: "", width: 130, template: "#btnEndDiskTemplate"},
    ]
  });
  conf_principal.listDisk.appendTo("#tableDisk");
}

window.viewDetailSF = (e) => {
  let dv = document.createElement('div');
  let btn = `<button class='btn-actionBlue' onclick="DetalleDiscos('${e.idLab_Discos_Inventario}')">
            <i class='fa fa-eye'></i></button>`;
  $(dv).append(btn);
  return dv.outerHTML;
}
window.btnAddToOrderSF = (e) => {
  let dv = document.createElement('div');
  let btn = `<button class='btn-actionGreen' onclick="ModalAsignar('${e.idLab_Discos_Inventario}')">
            <i class='fa fa-file'></i></button>`;
  $(dv).append(btn);
  return dv.outerHTML;
}
window.btnEndDiskSF = (e) => {
  let dv = document.createElement('div');
  let btn = `<button class="btn-actionRed" onclick="TerminarDisco('${e.idLab_Discos_Inventario}','${e.Codigo}')">
    <i class='fa fa-check' aria-hidden='true'></i>
    Terminar
  </button>`;
  $(dv).append(btn);
  return dv.outerHTML;
}
window.porcentDiskSF = (e) => {
  // Crea el contenedor para la gráfica y agrégalo al DOM
  let dv = document.createElement('div');
  let card = `<div id="graphPorcent-${e.idLab_Discos_Inventario}"></div>`;
  dv.innerHTML = card;
  document.body.appendChild(dv); // Asegúrate de agregar el div al DOM

  // Llama a la función para crear la gráfica
  setTimeout(function () {
    printGraphGoals(`graphPorcent-${e.idLab_Discos_Inventario}`, e.PorcentUtilizado);
  }, 0);
  // Devuelve el HTML del div creado
  return dv.outerHTML;
}

function printGraphGoals(graphPorcentDisk, valuePorcent) {
  // Inicializa la gráfica
  var circulargauge = new ej.circulargauge.CircularGauge({
    height: "150px",
    halfRadialFill: true, // Oculta la mitad no visible
    axes: [{
      startAngle: 270,
      endAngle: 90,
      ranges: [
        { start: 0, end: 12.5, endWidth: 25, startWidth: 15, color: '#fa4442' },
        { start: 12.5, end: 25, endWidth: 35, startWidth: 25, color: '#fc8b41' },
        { start: 25, end: 37.5, endWidth: 45, startWidth: 35, color: '#fbb643' },
        { start: 37.5, end: 50, endWidth: 55, startWidth: 45, color: '#f9d544' },
        { start: 50, end: 62.5, endWidth: 65, startWidth: 55, color: '#dfdc3d' },
        { start: 62.5, end: 75, endWidth: 75, startWidth: 65, color: '#b3e03b' },
        { start: 75, end: 87.5, endWidth: 85, startWidth: 75, color: '#7cb430' },
        { start: 87.5, end: 100, endWidth: 95, startWidth: 85, color: '#2fb332' },
      ],
      pointers: [{
        value: Number(valuePorcent).toFixed(2),
        // cap: {
        //   radius: 15,
        //   color: 'blue',
        //   border: { color: '#007DD1', width: 5 }
        // },
        // needleTail: { length: '22%', color: '#0b3146' },
        // color: '#0b3146',
        // pointerWidth: 25
      }],
      annotations: [{
        content: '#annotation-template',
        angle: 180,
        radius: '60%',
        zIndex: '1',
      }],
    }]
  }, `#${graphPorcentDisk}`);

  // Espera a que el gráfico esté completamente renderizado
  // setTimeout(() => {
  //   let dvSvg = document.querySelector(`#${graphPorcentDisk} svg`);
  //   if (dvSvg) {
  //     dvSvg.classList.add('graphGoals');
  //   }
  // }, 0); // Timeout para permitir la renderización completa del gráfico
}


function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function DetalleDiscos(idDisco){
  $("#modalInfo").modal("toggle");
  $("#includeInfo").load(`Include_DetalleDisco.php?idDisco=${idDisco}`);

}
var GlobalDisco = "";
function ModalAsignar(idDisco){
  GlobalDisco = idDisco;
  $("#NumOrden").val("");
  $("#modalAsignar").modal("toggle");
}

async function AsignaOrden(){
  let dataS = {
    op: "AsignarOrden",
    orden: $("#NumOrden").val(),
    disco: GlobalDisco,
  }
  if ($("#NumOrden").val() == "") {
    Alerta("info","Debes de llenar el Campo de Número de Orden");
    return false;
  }

  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    // setTimeout(function () {
    //   location.reload();
    // }, 1500);
    GlobalDisco = "";
    $("#NumOrden").val("");
    $("#modalAsignar").modal("close");
  }
}

async function TerminarDisco(id,Codigo){
  let title = `Seguro que quieres terminar el Disco ${Codigo}?`;
  let dial = await dialogConfirmSAlert(title);
  if (dial) {
    let dataS = {
      op: "TerminarDisco",
      disco: id,
    }
    let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
    if (ajaxR !== undefined) {
      // location.reload();
      getDiscosActivosFecha();
      getInventarioDiscosFechaJS();
    }
  }
}

async function getDiscosActivosFecha(){
  let dataS = {
    op: "getDiscosActivosFecha",
    FechaInicio: $("#FechaInicio").val(),
    FechaTermino: $("#FechaTermino").val(),
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    $("#DiscosActivos").html(ajaxR.Data.Activos);
  }
}
