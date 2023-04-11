  $(document).ready(function () {
        // Autopopulate customerid field with user's account and primarycontactid field with user's contact
        var accountId = $("#case-user-account").val();
        var accountName = $("#case-user-account-name").val();
        var contactId = $("#case-user-contact").val();
        var contactName = $("#case-user-contact-name").val();
        if (accountId != null)
        {
          $("#customerid").val(accountId);
          $("#customerid_name").val(accountName);
          $("#customerid_entityname").val("account");
          $("#customerid").trigger("change");
          $("#primarycontactid").val(contactId);
          $("#primarycontactid_name").val(contactName);
          $("#primarycontactid_entityname").val("contact");
          $("#primarycontactid").trigger("change");
          $("#primarycontactid_name").prop("readonly", false);
        }

        ConvertSelectToAutocomplete("con_manager");
        $("#primarycontactid_name").attr("list", "con_manager-data");

        $("#primarycontactid_name").on("change", function () {
            var selectedContactValue = $("#primarycontactid_name").val(); 
            console.log("You have selected the contact - " + selectedContactValue);
            var selectedContact = $("#con_manager-data option[value=\"" + selectedContactValue + "\"]").attr("data-value");
            console.log("You have selected the contact - " + selectedContact);
            $("#primarycontactid").val(selectedContact);
            $("#primarycontactid_entityname").val("contact");
            $("#primarycontactid").trigger("change");
        });
  });

  function ConvertSelectToAutocomplete(selectName, selectPlaceholder) {
    selectPlaceholder = selectPlaceholder ?? "";
    var selectElement = $("#" + selectName);
    var selectElementClass = selectElement.attr("class");
    var readonly = $(selectElement).attr("readonly") ?? "";
    var autoCompleteElementId = selectName + "-autocomplete";
    var autoCompleteDatasetId = selectName + "-data";
    var autoCompleteElement = '<input name="' + autoCompleteElementId + '" id="' + autoCompleteElementId + '" class="' + selectElementClass + '" list="' + autoCompleteDatasetId + '" placeholder="' + selectPlaceholder + '" ' + readonly + '><datalist id="' + selectName + '-data"></datalist>';
    var options = "";
 
    $(selectElement).parent().append(autoCompleteElement);
    $("#" + selectName + " option").each(function (index, o) {
        options += '<option data-value="' + o.value + '" value="' + o.text + '"/>';
    });
    $("#" + autoCompleteDatasetId).html(options);
 
    $(selectElement).hide();
 
    var currentSelectedValue = $(selectElement).val();
    if (!!currentSelectedValue) {
        $("#" + autoCompleteElementId).val($(selectElement).find("option:selected").text());
    }
 
    $("#" + autoCompleteElementId).on("change", function () {
        var selectedValue = $("#" + autoCompleteDatasetId + " option[value='" + $("#" + autoCompleteElementId).val() + "']").attr("data-value");
        selectElement.val(selectedValue);
        if (typeof selectedValue === "undefined") {
            $("#" + autoCompleteElementId).val("");
            // optionally you can add an error message here
        };
    });
};