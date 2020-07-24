'use strict';

(function () {
  window.foto = function (fileChooser, preview, types) {

    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = types.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }

  };
})();

