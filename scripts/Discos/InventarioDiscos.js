ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let content_principal = {
  tableInventary: undefined,
  statusDisk: document.getElementById('sel_status'),
  brandsDisk: document.getElementById('sel_brands'),
  sizeDisk: document.getElementById('sel_size'),
  colorsDisk: document.getElementById('sel_colors'),
  dateEndIni: document.getElementById('InpFechaInicial'),
  dateEndEnd: document.getElementById('InpFechaFinal'),
  searchInventory: document.getElementById('searchTerm'),
  // reasonsLeaving: document.getElementById('sel_reasonLeaving'),
  cantData: undefined,
  pagination: undefined,
  configTables: {
    cantRegisterPerPage: 30
  }
};

let counters = {
  tableInventary: {
    interval: 2000,
    timer: undefined
  }
};

loadInitialF();
async function loadInitialF(){
  loadConfInitialDiskInventory();
  getDiskInventaryFirst(0);
  $("#card_filterDateEnd").fadeOut();
}

async function loadConfInitialDiskInventory() {
  let dataS = {
    op: "loadConfInitialDiskInventory"
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS);
  console.log(ajaxR);
  if (ajaxR !== undefined) {
    printInitialConfig(ajaxR.Data);
  }
}

function printInitialConfig(data) {
  let cantStatus = data.status.length;
  let cantBrands = data.brands.length;
  let cantColors = data.colors.length;
  let cantSize = data.size.length;
  // let cantReasonsLeaving = data.reasonsLeaving.length;


  let contentStatus = "<option value=''> - TODOS LOS STATUS - </option>";
  let contentBrands = "<option value=''> - TODAS LAS MARCAS - </option>";
  let contentColors = "<option value=''> - TODOS LOS COLORES - </option>";
  let contentSize = "<option value=''> - TODOS LOS TAMAÑOS</option>";
  // let contentReasonsLeaving = "<option value=''> - TODOS LOS MOTIVOS - </option><option value='na'>Indefinido</option>";
  for (var i = 0; i < cantStatus; i++) {
    contentStatus += `<option value="${data.status[i].value}">${data.status[i].status}</option>`;
  }
  for (var i = 0; i < cantBrands; i++) {
    contentBrands += `<option value="${data.brands[i].idMarcas}">${data.brands[i].Marca}</option>`;
  }
  for (var i = 0; i < cantColors; i++) {
    contentColors += `<option value="${data.colors[i].Tipos_Colorimetros_Color_Id}">${data.colors[i].Colorimetro}</option>`;
  }
  for (var i = 0; i < cantSize; i++) {
    contentSize += `<option value="${data.size[i].idLab_DiscosTamanio}">${data.size[i].Disco}</option>`;
  }

  // for (let i = 0; i < cantReasonsLeaving; i++) {
  //   contentReasonsLeaving += `<option value="${data.reasonsLeaving[i].id}">${data.reasonsLeaving[i].descripcion}</option>`;
  // }

  content_principal.statusDisk.innerHTML = contentStatus;
  content_principal.brandsDisk.innerHTML = contentBrands;
  content_principal.colorsDisk.innerHTML = contentColors;
  content_principal.sizeDisk.innerHTML = contentSize;
  // content_principal.reasonsLeaving.innerHTML = contentReasonsLeaving;
}

content_principal.statusDisk.addEventListener('change', function(event) {
  if (event.target.value == 2) {
    $("#card_filterDateEnd").fadeIn();
  } else {
    $("#card_filterDateEnd").fadeOut();
    content_principal.dateEndIni.value = '';
    content_principal.dateEndEnd.value = '';
  }

  // if (event.target.value == 1) {
  //   $("#card_filteReasonsLeaving").fadeIn();
  // } else {
  //   $("#card_filteReasonsLeaving").fadeOut();
  // }
  // $("#sel_reasonLeaving").val("");
});

$(document).on("click", "#btn_filter", function(){
  getDiskInventaryFirst(0);
});
$(document).on("click", "#btn_deletefilter", function(){
  content_principal.statusDisk.value = '';
  content_principal.brandsDisk.value = '';
  content_principal.sizeDisk.value = '';
  content_principal.colorsDisk.value = '';
  content_principal.dateEndIni.value = '';
  content_principal.dateEndEnd.value = '';
  // content_principal.reasonsLeaving.value = '';
  $("#card_filterDateEnd").fadeOut();
  getDiskInventaryFirst(0);
});

content_principal.searchInventory.addEventListener('input', () => {
  clearTimeout(counters.tableInventary.timer);
  counters.tableInventary.timer = setTimeout(() => getDiskInventaryFirst(0), counters.tableInventary.interval);
});

content_principal.searchInventory.addEventListener('keydown', () => {
  clearTimeout(counters.tableInventary.timer);
});

async function getDiskInventaryFirst(page){
  let fechaInicial = $("#InpFechaInicial").val();
  let fechaFinal = $("#InpFechaFinal").val();
  let dataS = {
    op: "getDiskInventaryFirst",
    cantRegisters: content_principal.configTables.cantRegisterPerPage,
    page: page,
    filter: JSON.stringify({
      status: content_principal.statusDisk.value,
      brands: content_principal.brandsDisk.value,
      size: content_principal.sizeDisk.value,
      colors: content_principal.colorsDisk.value,
      dateEndIni: content_principal.dateEndIni.value,
      dateEndEnd: content_principal.dateEndEnd.value,
      // reasonLeaving: content_principal.reasonsLeaving.value
    }),
    search: content_principal.searchInventory.value.trim(),
  };
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    console.log(ajaxR);
    printDiskInventary(ajaxR.Data.Data, true);
    content_principal.cantData = ajaxR.Data.cantD.Cant;
    setTimeout(function () {
      printPager(ajaxR.Data.cantD.Cant);
    }, 0);
    CantidadDiscosEstatus();
  }
}

async function getDiskInventarySec(page){
  let dataS = {
    op: "getDiskInventarySec",
    cantRegisters: content_principal.configTables.cantRegisterPerPage,
    page: page,
    filter: JSON.stringify({
      status: content_principal.statusDisk.value,
      brands: content_principal.brandsDisk.value,
      size: content_principal.sizeDisk.value,
      colors: content_principal.colorsDisk.value,
      dateEndIni: content_principal.dateEndIni.value,
      dateEndEnd: content_principal.dateEndEnd.value,
      // reasonLeaving: content_principal.reasonsLeaving.value
    }),
    search: content_principal.searchInventory.value.trim(),
  };
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    printDiskInventary(ajaxR.Data, true);
  }
}

const printPager = (cantD, destroy = false) => {
  if (content_principal.pagination) {
    content_principal.pagination.destroy();
  }
  content_principal.pagination = new ej.grids.Pager({
      totalRecordsCount: cantD,
      pageSize: content_principal.configTables.cantRegisterPerPage,
      click: (args) => {
      getDiskInventarySec(args.currentPage);
    }
  });
  content_principal.pagination.appendTo('#pagination');
}


const printDiskInventary = (data, destroy = false) => {
  if (content_principal.tableInventary) {
    if (destroy) {
      content_principal.tableInventary.destroy();
    } else {
      content_principal.tableInventary.dataSource = data;
      content_principal.tableInventary.refresh();
      return;
    }
  }
  content_principal.tableInventary = new ej.grids.Grid({
    dataSource: data,
    height: "60vh",
    filterSettings: { type:'Menu' },
    // allowPaging: true,
    allowTextWrap: true,
    // toolbar: ['Search'],
    // pageSettings: { pageSize: 7 },
    columns: [
      {field: "Codigo", headerText: "Codigo", width: 100, textAlign: "Center", },
      {field: "Marca", headerText: "Marca", width: 100, textAlign: "Center", },
      {field: "Colorimetro", headerText: "Colorimetro	", width: 100, textAlign: "Center", },
      {field: "Tamaño", headerText: "Tamaño", width: 100, textAlign: "Center", },
      // {field: "MotivoSalida", headerText: "Motivo salida", width: 100, textAlign: "Center", },

      {field: "Status", headerText: "Status", width: 100, textAlign: "Center", },
      {field: "FechaEntrada", headerText: "Fecha Entrada", width: 100, textAlign: "Center", },
      {field: "FechaSalida", headerText: "Fecha Salida	", width: 100, textAlign: "Center", },
      {field: "FechaFin", headerText: "Fecha Finalizado", width: 100, textAlign: "Center", },
      {field: "", headerText: "Codigo Barras", width: 100, textAlign: "Center", template: "#btn_barCodeTemplate"},
      {field: "Utilizadas", headerText: "Piezas Utilizadas", width: 100, textAlign: "Center", },
      {field: "Restantes", headerText: "Piezas Restantes", width: 100, textAlign: "Center", },
      {field: "PorcentUtilizado", headerText: "% Utilizado", width: 170, textAlign: "Center", template: "#porcentDiskTemplate", allowFiltering: false},
      {field: "", headerText: "Detalles", width: 100, textAlign: "Center", template: "#btn_viewDetailTemplate"},
    ]
  });
  content_principal.tableInventary.appendTo("#tableIntentary");
}
window.btn_barCodeSF = (e) => {
  let dv = document.createElement('div');
  let btn = `<button type="button" class="btn btn-outline-info" onclick="modalCodigo('${e.Codigo}','${e.Marca}','${e.Colorimetro}','${e.Tamaño}')">
              <i class="fa fa-barcode"></i><br>
              Codigo
             </button>`;
  $(dv).append(btn);
  return dv.outerHTML;
}
window.btn_viewDetaillSF = (e) => {
  let dv = document.createElement('div');
  let btn = `<button type="button" class="btn btn-outline-info" onclick="getDetalleDiscos('${e.Codigo}', '${e.Utilizadas}');">
                <i class='fas fa-question'></i><br>
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
      printGraphPorcent(`graphPorcent-${e.idLab_Discos_Inventario}`, e.PorcentUtilizado);
    }, 1500);
    // Devuelve el HTML del div creado
    return dv.outerHTML;
  }

  function printGraphPorcent(graphPorcentDisk, valuePorcent) {
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
        }],
        annotations: [{
          content: '#annotation-template',
          angle: 180,
          radius: '60%',
          zIndex: '1',
        }],
      }]
    }, `#${graphPorcentDisk}`);
  }

// $(document).ready(function(){
//   onchangeFiltro();
//   // getDiskInventaryFirst();
//   //includeTablaIndentarioDiscos();
//   // CantidadDiscosEstatus();
//   $("#searchTerm").keyup(function(){
//    _this = this;
//    // Show only matching TR, hide rest of them
//    $.each($("#TableDiscos tbody tr"), function() {
//    if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
//    $(this).hide();
//    else
//    $(this).show();
//    });
//    });
// })
// // function includeTablaIndentarioDiscos(){
// //   $("#divIncludeTablaInventarioDiscos").load(`IncludeTablaInventarioDiscos.php`);
// // }
function getDetalleDiscos (Valor,Utilizadas) {
  let datos = {
    op: "getDetalleDiscoSelected",
    Disco: Valor
  }
  let TableDetalleDiscos = $('#TableDetalleDiscos').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Inventario/App.php",
      "data":datos,
      "success" : function(response){
              $("#h5DiscosUtilizados").html(`Discos Utilizados : ${Utilizadas}`);
        $("#ModalDetalleDiscos").modal("toggle");
        TableDetalleDiscos.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          TableDetalleDiscos.fnAddData([
            response[i]["Disco"],
            response[i]["Orden"],
            response[i]["Piezas"]
          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
}
// function onchangeFiltro(){
//   let fechaInicial = $("#InpFechaInicial").val();
//   let fechaFinal = $("#InpFechaFinal").val();
//   if ((fechaInicial !="" && fechaFinal !="") || (fechaInicial == "" && fechaFinal =="")) {
//     CantidadDiscosEstatus();
//     getDiskInventaryFirst();
//   }
// }
//
function modalCodigo(Codigo,Marca,Colorimetro,txtTamano){
  $("#codProducto").empty();
  $("[name=txtCont]").empty();
    JsBarcode(`#codProducto`, Codigo, {
      format: "CODE128",
      width: 1.8,
      height: 15,
      fontSize: 15
    });


  $("[name=txtCont]").append(`
    <div class='col-md-12' style='margin-top:10px'>
      <br>
      <span style='font-size:25px;'>${Colorimetro} ${txtTamano}</span>
    </div>
    <div class='col-md-12'>
      <span style='font-size:20px;'>${Marca}</span>
    </div>
    `);


  var frame1 = document.createElement('iframe');
  frame1.name = "frame1";
  frame1.style.position = "absolute";
  frame1.style.top = "1000000px";
  document.body.appendChild(frame1);
  var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
  frameDoc.document.open();
     var codigoBarras = $(`#etiquetabar`).html();
     frameDoc.document.write('<html><body style="text-align:center">');
     frameDoc.document.write('<style>'+
                             '#lblProd, #lblVar, .divDesc{'+
                               'font-size: 8.5;'+
                               'font-family: monospace;'+
                               'text-align: center;'+
                               'margin-bottom: 0px;'+
                             '}'+
                             '</style>');
     frameDoc.document.write(codigoBarras);
     frameDoc.document.write('</body></html>');
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    document.body.removeChild(frame1);
  }, 500);

  $("#slctMarcas").val("");
 $("#slctColor").val("");
 $("#txtLongitud").val("");
 $("#txtLongitud").val("");
 $("#txtCantidad").val("1");
  return false;
}

function CantidadDiscosEstatus(){
  let datos = {
    op: "getCantidadDiscosPorEstatus",
    idColorimetroColor: content_principal.colorsDisk.value,
    idMarca: content_principal.brandsDisk.value,
    Tamano: content_principal.sizeDisk.value,
  }
  $.ajax({
    type: "post",
    url: "Backend/Inventario/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#DiscosUsados").html(response[i]["Usados"]);
        
        
        $("#DiscosActivos").html(response[i]["Activos"]);
        $("#DiscosVendidos").html(response[i]["Vendidos"]);
        $("#DiscosAlmacen").html(response[i]["Almacen"]);
        $("#DiscosTerminados").html(response[i]["Termimnados"]);
        $("#DiscosSinUsar").html(response[i]["SinUtilizar"]);
        $("#GlobalRestante").html(response[i]["PiezasGlobalRestante"]);
        $("#CantidadDiscosReg").html(response[i]["CantidadDiscos"]);
        $("#PiezasTotalGlobal").html(response[i]["PiezasTotalGlobal"]);
        $("#PiezasGlobalUtilizadas").html(response[i]["PiezasGlobalUtilizadas"]);
        $("#PorcentUtilizado").html(response[i]["PorcentUtilizado"]);
      }
    },error:function(e){
      Alerta("error","Hubo un error intentalo más tarde");
    }
  });
}
//
// $("#DeleteFiltroFecha").click(function (){
//   $("#InpFechaInicial").val("");
//   $("#InpFechaFinal").val("");
//   setTimeout(function () {
//     includeTablaIndentarioDiscos();
//   }, 500);
// });
//
async function OpenModalDiscosTerminados (){

  $("#txtLong").val("");
  getMarcasDentLab();
  getColorimetroDentLab();
  getDiscosTerminados();
  openModalMAX('Listado de Discos Terminados','ContenidoDiscosTerminados');
}
//
// let tableDiscosTerminados = $("#tableDiscosTerminados").dataTable({
//   language: {
//     lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
//     zeroRecords: "NO HAY DISCOS AGREGADOS POR MOSTRAR",
//     info: "PÁGINA _PAGE_ DE _PAGES_",
//     infoEmpty: "NO HAY DATOS PARA MOSTRAR",
//     infoFiltered: "",
//     search: "BUSCAR  ",
//   },
//   columnDefs: [
//     {
//       className: "dt-center",
//       targets: "_all",
//     },
//   ],
//   order: [],
//   bSort: false,
//   bPaginate: true,
//   bFilter: true,
//   bInfo: false,
// });
//
// async function getDiscosTerminados() {
//   let Tamano = await $("#Tamano").val();
//   let idMarca = await $("#slctMarcaM").val();
//   let idColorimetroColor = await $("#slctColoresM").val();
//   let datos = await {
//     op: "getDiscosTerminados",
//     idMarca: idMarca,
//     idColorimetroColor: idColorimetroColor,
//     Tamano: Tamano
//   };
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Inventario/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     tableDiscosTerminados.fnClearTable();
//     let Disco = "";
//     respuesta.forEach( registros => {
//       Disco = btoa(registros.idLab_Discos_Inventario);
//       tableDiscosTerminados.fnAddData([
//         registros.Codigo,
//         registros.Marca,
//         registros.Colorimetro,
//         registros.Tamaño,
//         registros.FechaFin,
//         registros.Utilizadas,
//         registros.Restantes,
//         registros.PUtilizado,
//         `<button class="btnAsignar" onclick="activarDisco('${Disco}',${registros.Codigo})"><i class="far fa-exchange-alt"></i></button>`
//       ])
//     });
//   }
// }
//
// async function activarDisco (IdDisco,Disco) {
//   let titulo = `Confirmación de acción.`;
//   let Contenido = `El disco con el número ${Disco} se activará en el estado de "Activo".`;
//
//   alertify.confirm(`${titulo}`,`${Contenido}`, async function(){
//       let datos = await {
//         op: "activarDiscoTerminado",
//         idLab_Discos_Inventario: IdDisco
//       };
//       let respuesta = "";
//       try {
//         respuesta = await $.ajax({
//           type: "POST",
//           url: "Backend/Inventario/App.php",
//           data: datos,
//         });
//       } catch (e) {
//         console.log(e);
//       } finally {
//         if (respuesta == "1") {
//           alertify.success("Disco Activado");
//           onchangeFiltro();
//           await getDiscosTerminados();
//         }
//       }
//     },async function(){
//       alertify.error('Cancelado');
//   }).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
// }
//
async function getPermisosVerDiscosTerminados () {
  let datos = {
    op: "getPermisosVerDiscosTerminados"
  };
  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Configuracion/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      OpenModalDiscosTerminados();
    } else {
      Alerta("info",respuesta);
    }
  }
}

// async function openModalMAX(header,div){
//   if (!alertify.ModalMAX) {
//     alertify.ModalMIN || alertify.dialog('ModalMAX',function(){
//       return {
//           main:function(content){
//               this.setContent(content);
//           },
//           build:function(){
//               this.setHeader(header);
//           },
//           setup:function(){
//               return {
//                   focus:{
//                       element:function(){
//                           return this.elements.body.querySelector(this.get('selector'));
//                       },
//                       select:true
//                   },
//                   options:{
//                       maximizable:false,
//                       padding:true,
//                       startMaximized: true
//                   }
//               };
//           },
//           settings:{
//               selector:undefined
//           }
//       };
//     });
//     }
//     alertify.ModalMAX ($(`#${div}`)[0]);
// }
//
// async function getMarcasDentLab() {
//   let datos = await {
//     op: "getMarcasDentLab"
//   };
//   respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/DentLab/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     $("#slctMarcaM").html("");
//     $("#slctMarcaM").append(`
//       <option value=""> Listado de Marcas </option>
//       `);
//     respuesta.forEach( registros => {
//       $("#slctMarcaM").append(`
//         <option value="${registros.idMarcas}">${registros.Marca}</option>
//         `);
//     });
//   }
// }
//
// async function getColorimetroDentLab() {
//   let datos = await {
//     op: "getColorimetroDentLab"
//   };
//   respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/DentLab/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     $("#slctColoresM").html("");
//     $("#slctColoresM").append(`
//       <option value=""> Listado de Colores </option>
//       `);
//     respuesta.forEach( registros => {
//       $("#slctColoresM").append(`
//         <option value="${registros.Tipos_Colorimetros_Color_Id}">${registros.Colorimetro}</option>
//         `);
//     });
//   }
// }
//
// function exportF(elem) {
//     var table = document.getElementById("TableDiscos");
//     var html = table.outerHTML;
//     var url = 'data:application/vnd.ms-excel,' + escape(html);
//     elem.setAttribute("href", url);
//     elem.setAttribute("download", `Inventario_${globalFechaI}-${globalFechaF}.xls`);
//     return false;
//   }
//
//


$(document).on("click", "#downloadLink", function(){
  // const data = [
  //       { Name: 'John Doe', Age: 30, City: 'New York' },
  //       { Name: 'Jane Smith', Age: 25, City: 'Los Angeles' },
  //       { Name: 'Sam Johnson', Age: 35, City: 'Chicago' }
  //     ];

  getDataInventaryDiskExcel();
});

const getDataInventaryDiskExcel = async () => {
    let dataS = {
      op: "getDataInventaryDiskExcel",
      filter: JSON.stringify({
        status: content_principal.statusDisk.value,
        brands: content_principal.brandsDisk.value,
        size: content_principal.sizeDisk.value,
        colors: content_principal.colorsDisk.value,
        dateEndIni: content_principal.dateEndIni.value,
        dateEndEnd: content_principal.dateEndEnd.value,
        // reasonLeaving: content_principal.reasonsLeaving.value
      }),
      search: content_principal.searchInventory.value.trim(),
    }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    const worksheet = XLSX.utils.json_to_sheet(ajaxR.Data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'InventarioDiscos.xlsx');
  }
}
