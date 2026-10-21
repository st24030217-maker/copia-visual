ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let t_doctors;

loadInitialF();
async function loadInitialF(){
    getDoctorsWithoutCurrentPackages();
}

async function getDoctorsWithoutCurrentPackages(){
    let dataS = {
        op: "getDoctorsWithoutCurrentPackages"
    }
    let ajaxR = await pAjaxAsync(url_m_Paquetes, dataS, 1);
    if (!!ajaxR) {
        console.log(ajaxR);
        printDoctorsWithoutCurrentPackages(ajaxR.Data);
    }
}

const printDoctorsWithoutCurrentPackages = (data) => {
    if (t_doctors) {
        t_doctors.dataSource = data;
        t_doctors.refresh();
        return ;
    }
    var filter = {
        ui: {
            create: function (args) {
            var flValInput = ej.base.createElement('input', {
                className: 'flm-input',
            });
            args.target.appendChild(flValInput);
            var fieldName = args.column.field;
            var dropdownData = [...new Set(t_doctors.dataSource.map(item => item[fieldName]))];        
            dropInstance = new ej.dropdowns.MultiSelect({
                dataSource: ordenarMixto(dropdownData),
                placeholder: 'Select a value',
                popupHeight: '200px',
                allowFiltering: true,
                mode: 'Delimiter',
            });
            dropInstance.appendTo(flValInput);
            },
            write: function (args) {
            var fieldName = args.column.field;
            var filteredValue = [];
                t_doctors.filterSettings.columns.forEach((item) => {
                if (item.field === fieldName && item.value) {
                  filteredValue.push(item.value);
                }
            });
            if (filteredValue.length > 0) {
                dropInstance.value = filteredValue;
            }
            },
            read: function (args) {
                t_doctors.removeFilteredColsByField(args.column.field);
                args.fltrObj.filterByColumn(
                    args.column.field,
                    args.operator,
                    dropInstance.value
                );
            },
        },
    };
    t_doctors = new ej.grids.Grid({
        dataSource: data,
        height: "60vh",
        allowFiltering: true,
        filterSettings: { type: 'Menu' },
        allowTextWrap: true,
        toolbar: ['Search','Print', 'PdfExport', 'ExcelExport'],
        allowPdfExport: true,
        allowExcelExport: true,
        allowSorting: true,
        allowMultiSorting: true,
        columns: [
            {field: "Doctor", headerText: "DOCTOR", width: 100, textAlign: "Left", filter: filter},
            {field: "Vendedor", headerText: "VENDEDOR", width: 100, textAlign: "Left", filter: filter},
            {field: "Paquete", headerText: "ULTIMO PAQUETE", width: 100, textAlign: "Left", filter: filter},
            {field: "FechaUltima", headerText: "FECHA", width: 50, textAlign: "Left", filter: filter},
            {field: "DiferenciaDias", headerText: "DIFERENCIA EN DIAS", width: 50, textAlign: "Left", filter: filter},
        ],
        aggregates: [{
            columns: [
              {
                type: 'Count',
                field: 'Doctor',
                footerTemplate: 'Cantidad de doctores: ${Count}'
              },
            ]
         }],
    });
    t_doctors.appendTo("#t_doctors");
    t_doctors.toolbarClick = function(args){
        if (args['item'].id === "t_doctors_pdfexport") {
          let exportProperties = {
             fileName:"Doctores.pdf"
          };
          t_doctors.pdfExport(exportProperties);
        } else if (args['item'].id === "t_doctors_excelexport") {
          let exportProperties = {
             fileName:"Doctores.xlsx"
          };
          t_doctors.excelExport(exportProperties);
        }
      }
}

function ordenarMixto(arreglo) {
    arreglo = arreglo.map(item => {
      return !isNaN(item) && typeof item === 'string' ? Number(item) : item;
    });
    arreglo.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }
      return (typeof a === 'number') ? -1 : 1;
    });
    return arreglo;
  }