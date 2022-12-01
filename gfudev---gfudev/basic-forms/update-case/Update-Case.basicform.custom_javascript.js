$(function () {
  $(".btn.btn-default.launchentitylookup").attr(
    "data-original-title",
    "Search"
  );
  $(".btn.btn-default.launchentitylookup").attr("title", "Search");
  $(".btn.btn-default.launchentitylookup").attr("aria-label", "Search");
  //File uploader start

  //Adding classes for CSS
  $(".file-cell").wrap('<div class="fileWrap"></div>');
  $("#AttachFile").wrap(
    '<span class="btn-file">Drag and drop files here or <a href="#">Select Files</a></span>'
  );
  $(".btn-file").wrapAll('<div class="files" id="files"></div>');
  $(
    '<p>Documents Type : Excel, Word, PDF, PNG or JPEG (max 25MB)</p><ul class="fileList"></ul>'
  ).appendTo(".files");
  $('<div class="attachWrap"> </div>').insertAfter(".btn-file a");
  $(".attachWrap").css("display", "none");

  //Refresh selected files
  function refreshFileSelection(fileElem) {
    const fileInput = document.getElementById(fileElem);
    const dataTransfer = new DataTransfer();

    for (var i = 0; i < filesToUpload.length; i++) {
      dataTransfer.items.add(filesToUpload[i].file);
    }
    fileInput.files = dataTransfer.files;
  }

  //File upload Function Start
  $.fn.fileUploader = function (filesToUpload, fileElem, fileIdCounter) {
    this.closest(".files").change(function (evt) {
      var output = [];

      for (var i = 0; i < evt.target.files.length; i++) {
        fileIdCounter++;
        var file = evt.target.files[i];
        var fileId = fileElem + fileIdCounter;

        filesToUpload.push({
          id: fileId,
          file: file,
        });

        var removeLink =
          '<a class="removeFile" href="#" data-fileid="' +
          fileId +
          '">Remove</a>';
        output.push(
          "<li><i class='glyphicon glyphicon-ok-sign'></i> <strong>",
          escape(file.name),
          "</strong> ",
          removeLink,
          "</li> "
        );
      }

      //Appending Files name inside the ul for displaying the list of attached files
      $(this).children(".fileList").append(output.join(""));

      refreshFileSelection(fileElem);
    });

    //File remove Functionality
    $(document).on("click", ".removeFile", function (e) {
      e.preventDefault();

      var fileId = $(this).parent().children("a").data("fileid");

      // loop through the files array and check if the name of that file matches FileName
      // and get the index of the match

      for (var i = 0; i < filesToUpload.length; i++) {
        if (filesToUpload[i].id === fileId) {
          filesToUpload.splice(i, 1);
        }
      }

      refreshFileSelection(fileElem);

      // remove the <li> element of the removed file from the page DOM
      $(this).parent().remove();
      $(".attachWrap").css("display", "none");
    });
  };

  var filesToUpload = [];
  var fileIdCounter = 0;

  //Calling File uploader Function
  $("#files").fileUploader(filesToUpload, "AttachFile", fileIdCounter);

  //Checking the number of attached file in the file listing section to make the attachment field enable and disable
  $(".files").change(function () {
    if ($(".fileList li").length <= 0) {
      $(".attachWrap").css("display", "none");
    } else {
      $(".attachWrap").css("display", "block");
    }
  });
  // File Uploader End
});
