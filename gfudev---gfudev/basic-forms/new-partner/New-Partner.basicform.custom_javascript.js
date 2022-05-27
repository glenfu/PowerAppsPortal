// Apply Client Side Validation on con_website
if (window.jQuery) {
    (function ($) {
       $(document).ready(function () {
          if (typeof (Page_Validators) == 'undefined') return;
          // Create new validator
          var newValidator = document.createElement('span');
          newValidator.style.display = "none";
          newValidator.id = "con_websiteValidator";
          newValidator.controltovalidate = "con_website";
          newValidator.errormessage = "<a href=\'#con_website_label\' onclick=\'javascript:scrollToAndFocus(\"con_website_label\",\"con_website\");return false;\' referenceControlId=con_website>Website is a required field. </a>";;
          newValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
          newValidator.initialvalue = "";
          newValidator.evaluationfunction = function () {
             var con_website = $("#con_website").val();       
            if (con_website == "")          
                    return false;  // return false mean apply validation            
            else 
              return true;   // return true mean successful         
          };
          // Add the new validator to the page validators array:
          Page_Validators.push(newValidator);
          // Wire-up the click event handler of the validation summary link
          //$("a[href='#con_website_label']").on("click", function () { $('#con_website_label').focus(); });
       });
    }(window.jQuery));
 }