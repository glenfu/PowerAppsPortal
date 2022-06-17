$(document).ready(function () {
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