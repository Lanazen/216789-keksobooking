'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatar = document.querySelector('.notice__preview img');
  var avatarInput = document.querySelector('#avatar');
  var photoContainer = document.querySelector('.form__photo-container .drop-zone');
  var photosInput = document.querySelector('#images');

  // Загрузка аватарки пользователя
  var uploadAvatar = function (image) {
    var file = image;
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', function () {
    uploadAvatar(avatarInput.files[0]);
  });

  // Загрузка фотографий объявления пользователя
  var uploadImages = function (image) {
    var file = image;
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photo.style.width = '150px';
        photo.style.margin = '10px';
        photoContainer.appendChild(photo);
        photo.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  photosInput.addEventListener('change', function () {
    uploadImages(photosInput.files[0]);
  });
})();
