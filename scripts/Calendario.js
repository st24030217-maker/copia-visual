$(document).ready(function(){
  $('#calendar').evoCalendar({
      theme: 'Midnight Blue',
      language: 'es',
      format: 'mm/dd/yyyy',
      titleFormat: 'MM yyyy',
      eventHeaderFormat: 'MM d, yyyy',
      todayHighlight: true,
      sidebarDisplayDefault: false,
      sidebarToggler: true,
      eventDisplayDefault: true,
      eventListToggler: true,
      calendarEvents: null
  });
  getEventos();
})

function getEventos(){
  $.ajax({
    type:"POST",
    url:"Backend/DentLab/App.php",
    data:"op=getCalendario",
    success:function(response){
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        var newDate = new Date(response[i]["fecha"]);
        newDate.setDate(newDate.getDate()+1);
        $("#calendar").evoCalendar("addCalendarEvent",[
              {
            id: "",
            name: "Escaneador "+response[i]["Nombre"],
            date: newDate,
            description: `${response[i]["Doctor"]}, orden asignada ${response[i]["Serie"]} a las ${response[i]["hora"]}.`,
            type: "event",
            everyYear: false,
            color: "#75C425"
            }
          ]);
      }
    },error:function(e){
      toastr.error(e.responseText,"ERROR 500");
    }
  })
}
