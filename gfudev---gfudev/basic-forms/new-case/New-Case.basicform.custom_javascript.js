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
        }
  });