ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let tPackagesDoctors;
loadInitialPackagesDoctors();
async function loadInitialPackagesDoctors(){
  getListPackagesDoctorsIndex();
}

async function getListPackagesDoctorsIndex(){
  let dataSend = {
    op: "getListPackagesDoctorsIndex"
  };
  let ajaxR = await pAjaxAsync(url_m_Paquetes, dataSend);
  if(ajaxR.Resultado && ajaxR.Siguiente){
    printPackagesDoctorsIndex(ajaxR.Data);
  }
}

function printPackagesDoctorsIndex(data){
  if (tPackagesDoctors) {
    tPackagesDoctors.destroy();
  }
  tPackagesDoctors = new ej.grids.Grid({
    dataSource: data,
    allowGrouping: true,
    groupSettings: { columns: ['Doctor'] },
    allowPaging: true,
    pageSettings: { pageSizes: true, pageSize: 10 },
    toolbar: ['Print', 'Search'],
    columns: [
      { field: "Serie", headerText: "Serie", width:10, textAlign: "Center"},
      { field: "Doctor", headerText: "Doctor", width:20, textAlign: "Center"},
      { field: "TipoDoctor", headerText: "Tipo Doctor", width:10, textAlign: "Center"},
      { field: "Paquete", headerText: "Paquete", width:11, textAlign: "Center"},
      { field: "Pz_total", headerText: "Total Piezas", width:10, textAlign: "Center"},
      { field: "Disponible", headerText: "Total Disponibles", width:10, textAlign: "Center"},
      { field: "PiezasDispPagadas", headerText: "Cantidad Disponible Pagadas", width:10, textAlign: "Center"},
    ],
  });
  tPackagesDoctors.appendTo("#tPackagesDoctors");
}
