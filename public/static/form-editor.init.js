for (let j = 1; j < 20; j++) {
  $("#elm" + j).length &&
    tinymce.init({
      selector: "textarea#elm" + j,
      height: 300,
      plugins: [
        "image code advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "save table contextmenu directionality emoticons template paste textcolor",
      ],
      toolbar:
        "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
      style_formats: [
        { title: "Bold text", inline: "b" },
        {
          title: "Red text",
          inline: "span",
          styles: { color: "#ff0000" },
        },
        { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
        {
          title: "Example 1",
          inline: "span",
          classes: "example1",
        },
        { title: "Example 2", inline: "span", classes: "example2" },
        { title: "Table styles" },
        {
          title: "Table row 1",
          selector: "tr",
          classes: "tablerow1",
        },
      ],
      file_picker_types: "file image media",
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = function () {
          var file = this.files[0];

          var reader = new FileReader();
          reader.onload = function () {
            var id = "blobid" + new Date().getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
      },
    });
}

for (let i = 1; i < 20; i++) {
  $(document).ready(function () {
    $("#elmaz" + i).length &&
      tinymce.init({
        selector: "textarea#elmaz" + i,
        height: 300,
        plugins: [
          "image code advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "save table contextmenu directionality emoticons template paste textcolor",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
        style_formats: [
          { title: "Bold text", inline: "b" },
          {
            title: "Red text",
            inline: "span",
            styles: { color: "#ff0000" },
          },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          {
            title: "Example 1",
            inline: "span",
            classes: "example1",
          },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          {
            title: "Table row 1",
            selector: "tr",
            classes: "tablerow1",
          },
        ],
        file_picker_types: "file image media",
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },
      });
    $("#elmru" + i).length &&
      tinymce.init({
        
        selector: "textarea#elmru" + i,
        height: 300,
        plugins: [
          "image code advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "save table contextmenu directionality emoticons template paste textcolor",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
        style_formats: [
          { title: "Bold text", inline: "b" },
          {
            title: "Red text",
            inline: "span",
            styles: { color: "#ff0000" },
          },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          {
            title: "Example 1",
            inline: "span",
            classes: "example1",
          },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          {
            title: "Table row 1",
            selector: "tr",
            classes: "tablerow1",
          },
        ],
        file_picker_types: "file image media",
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },
      });
    $("#elmen" + i).length &&
      tinymce.init({
        selector: "textarea#elmen" + i,
        height: 300,
        plugins: [
          "image code advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "save table contextmenu directionality emoticons template paste textcolor",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
        style_formats: [
          { title: "Bold text", inline: "b" },
          {
            title: "Red text",
            inline: "span",
            styles: { color: "#ff0000" },
          },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          {
            title: "Example 1",
            inline: "span",
            classes: "example1",
          },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          {
            title: "Table row 1",
            selector: "tr",
            classes: "tablerow1",
          },
        ],
        file_picker_types: "file image media",
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },
      });
  });
}
