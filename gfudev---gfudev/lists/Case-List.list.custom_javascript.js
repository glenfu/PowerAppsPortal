$(document).ready(function () {
    // Date filters for Entity Lists
    $(".entitylist-filter-option-group label:contains(startdatefilter) input").each(function (index){ // identify the two filters we created
        $(this).attr('type', 'text');           //Change the original checkbox input control's type to Text
        $(this).val("");                        //Set null value for the original input control
        // Create a fake datepicker
        var fakedate = "<div id='datetimepicker"+index+"' class='datetimepicker input-append input-group' data-provide='datetimepicker'><span class='input-group-addon' tabindex='0' aria-label='Choose a date'><span data-date-icon='icon-calendar fa fa-calendar' class='icon-calendar fa fa-calendar' style='cursor:pointer'></span></span><input type='text' class='fake form-control' /></div>";
        $(this).closest(".checkbox").parent().prepend(fakedate); //Add fake datepicker to entitylistfilter
        $(this).closest(".checkbox").hide();    //Hide original filter field
        $(this).closest(".entitylist-filter-option-group-box-overflow").css("overflow-y","visible"); //Change overflow for parent filter element to allow picker to be visible
    });
    $("#entitylist-filters").find(".datetimepicker").each(function(){           // for each of the elements with .datetimepicker class
        var lang = $("html").data("lang") === "nb-NO" ? 'nb' : 'en-gb';  // set moment locale based on portal language
        $(this).datetimepicker({                    //for this datetimepicker
            icons: {                                //set icons
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
            },
            format: 'L',                            //set locale to 'L' will format into browser language default
            locale: lang                            //set language based on portal language 
        });
        $(this).on("dp.change", function (e) { // when datetimepicker change function
            $(this).parent().find(".checkbox input").val(e.date.format('YYYY-MM-DD')); //Get moment object, format to DD/MM/YYYY (format the filter need) and set it as filter input value
        });
    });
    // End Entity List Date Filter

  $(".entitylist.entity-grid").on("loaded", function () {
     $(this).children(".view-grid").find("tr[data-id]").each(function (i, e){
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        $(this).append("<td><input type='button' onclick='escalateCase(\"" + id + "\",\"" + name + "\");' value='Escalate Case' /></td>");
     });
  });
});


function escalateCase(id, name){
    var json_data = '{"id": "' + id + '"}'
    console.log(json_data);

    var httpTriggerUrl = "https://prod-10.southeastasia.logic.azure.com:443/workflows/a8c8a9c331bb4657bd473c44f26cbb8e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oWUnUc-UInpvYrRrgealQxaqZD4W3MB3GtVgmshXivM";
	
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: httpTriggerUrl,
        data: json_data,
        async: true,
        beforeSend: function (XmlHttpRequest) {
            XmlHttpRequest.setRequestHeader("Accept", "application/json");
            XmlHttpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            XmlHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
            XmlHttpRequest.setRequestHeader("OData-Version", "4.0");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            alert("Escalated case " + name + " successfully");
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            alert(xmlHttpRequest.responseJSON.error.message);
        }
    });
}