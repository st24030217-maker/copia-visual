ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let content_principal = {
  tableDisk: undefined,
  searchInventory: document.getElementById('searchTerm'),
  brandsDisk: document.getElementById('sel_brands'),
  sizeDisk: document.getElementById('sel_size'),
  colorsDisk: document.getElementById('sel_colors'),
  configTables: {
    cantRegisterPerPage: 20
  },
  textUsed: document.getElementById('tx_diskUsed'),
}

let counters = {
  tableInventary: {
    interval: 2000,
    timer: undefined
  }
};

loadInitialF();
async function loadInitialF(){
  loadConfInitialDiskUsedInventory();
  getUsedDisks(0);
}

async function loadConfInitialDiskUsedInventory(){
  let dataS = {
    op: "loadConfInitialDiskUsedInventory"
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    printInitialConfig(ajaxR.Data);
  }
}

function printInitialConfig(data) {
  let cantBrands = data.brands.length;
  let cantColors = data.colors.length;
  let cantSize = data.size.length;
  let contentBrands = "<option value=''> - TODAS LAS MARCAS - </option>";
  let contentColors = "<option value=''> - TODOS LOS COLORES - </option>";
  let contentSize = "<option value=''> - TODOS LOS TAMAÑOS</option>";
  for (var i = 0; i < cantBrands; i++) {
    contentBrands += `<option value="${data.brands[i].idMarcas}">${data.brands[i].Marca}</option>`;
  }
  for (var i = 0; i < cantColors; i++) {
    contentColors += `<option value="${data.colors[i].Tipos_Colorimetros_Color_Id}">${data.colors[i].Colorimetro}</option>`;
  }
  for (var i = 0; i < cantSize; i++) {
    contentSize += `<option value="${data.size[i].idLab_DiscosTamanio}">${data.size[i].Disco}</option>`;
  }
  content_principal.brandsDisk.innerHTML = contentBrands;
  content_principal.colorsDisk.innerHTML = contentColors;
  content_principal.sizeDisk.innerHTML = contentSize;
  content_principal.textUsed.textContent = data.used;
}

content_principal.searchInventory.addEventListener('input', () => {
  clearTimeout(counters.tableInventary.timer);
  counters.tableInventary.timer = setTimeout(() => getUsedDisks(0), counters.tableInventary.interval);
});

content_principal.searchInventory.addEventListener('keydown', () => {
  clearTimeout(counters.tableInventary.timer);
});

async function getUsedDisks(page){
  let dataS = {
    op: "getUsedDisks",
    cantRegisters: content_principal.configTables.cantRegisterPerPage,
    page: page,
    search: content_principal.searchInventory.value.trim(),
    filter: JSON.stringify({
      brands: content_principal.brandsDisk.value,
      size: content_principal.sizeDisk.value,
      colors: content_principal.colorsDisk.value,
    }),
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    printDiskUsed(ajaxR.Data.Data);
    setTimeout(function () {
      printPager(ajaxR.Data.Used);
    }, 0);
  }
}

$(document).on("click", "#btn_filter", function(){
  getUsedDisks(0);
});
$(document).on("click", "#btn_deletefilter", function(){
  content_principal.brandsDisk.value = '';
  content_principal.sizeDisk.value = '';
  content_principal.colorsDisk.value = '';
  getUsedDisks(0);
});

const getUsedDiskSec = async (page) => {
  let dataS = {
    op: "getUsedDiskSec",
    cantRegisters: content_principal.configTables.cantRegisterPerPage,
    page: page - 1,
    search: content_principal.searchInventory.value.trim(),
    filter: JSON.stringify({
      brands: content_principal.brandsDisk.value,
      size: content_principal.sizeDisk.value,
      colors: content_principal.colorsDisk.value,
    }),
  }
  let ajaxR = await pAjaxAsync(url_m_Inventario, dataS, 1);
  if (ajaxR !== undefined) {
    printDiskUsed(ajaxR.Data);
  }
}

const printDiskUsed = (data) => {
  if (content_principal.tableDisk) {
    content_principal.tableDisk.destroy();
  }
  content_principal.tableDisk = new ej.grids.Grid({
    dataSource: data,
    columns: [
      { field: "Disco", headerText: "Número", width: 100, textAlign: "Center"},
      { field: "marca", headerText: "Marca", width: 100, textAlign: "Center"},
      { field: "color", headerText: "Color", width: 100, textAlign: "Center"},
      { field: "medida", headerText: "Medida", width: 100, textAlign: "Center"},
      { field: "salida", headerText: "Sálida Almacen", width: 100, textAlign: "Center"},
      { field: "Orden", headerText: "No. Orden", width: 100, textAlign: "Center"},
      { field: "Piezas", headerText: "Piezas", width: 100, textAlign: "Center"},
    ]
  });
  content_principal.tableDisk.appendTo("#tableDisk");
}

const printPager = (cantD, destroy = false) => {
  if (content_principal.pagination) {
    content_principal.pagination.destroy();
  }
  content_principal.pagination = new ej.grids.Pager({
      totalRecordsCount: cantD,
      pageSize: content_principal.configTables.cantRegisterPerPage,
      click: (args) => {
      getUsedDiskSec(args.currentPage);
    }
  });
  content_principal.pagination.appendTo('#pagination');
}
