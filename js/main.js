/* ===================================================
 * Main JS
 * - Handles various logics for this site
 * ================================================ */

!function ($) {

  "use strict";

  $(document).ready(function () {
    setNavBarMenu();
    getAlbumPhotos();
  });

}(window.jQuery);

/**
 * Configure menu "active" state
 * @method setNavBarMenu
 * @return {undefined}
 */
function setNavBarMenu() {
  $('.nav li').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  });  
}

/**
 * Get all photos from albums and generate photo gallery
 * @method getAlbumPhotos
 * @return {undefined}
 */
function getAlbumPhotos() {
  var fbPhotoAlbumIds = [
    926887857462926,  // BAR Con: Episode 9
    906658509485861,  // BAR Con: Episode 8
    869088153242897,  // BAR Con: Episode 6
    853717891446590,  // BAR Con: Episode 5
    860382347446811,  // BAR Con: Episode 4
    860400107445035,  // BAR Con: Episode 3
    860428737442172,  // BAR Con: Episode 2
    860433654108347   // BAR Con: Episode 1
  ];

  fbPhotoAlbumIds.forEach(fbPhotoAlbumId => {
    var fbAlbumApi = `https://graph.facebook.com/v2.9/${fbPhotoAlbumId}/photos?access_token=833367813443301%7CnDhKBT0o6K7a7j_5LMfc3QSbRNs&fields=album,created_time,id,images,link,name`;

    $.ajax({
      url: fbAlbumApi,
      dataType: 'json',
      async: false,
    }).done((response) => {
      generateGallery({ photoData: response.data });
    });
  });
}

/**
 * Generate contents for photo gallery based on first 4 photos in album
 * @method generateGallery
 * @return {undefined}
 */
function generateGallery(args = {}) {
  var { photoData } = args;
  var galleryMarkup = '',
      galleryListMarkup = '',
      galleryListItemMarkup = '';

  galleryListMarkup = `<h4 class="photos-title">${photoData[0].album.name}</h4>
                        <ul class="photos-list list-unstyled">`;

  photoData.forEach((item, idx) => {
    if (idx < 4) {        
      galleryListItemMarkup += `<li class="list-item span3">
                                  <a href="${item.link}" target="_blank">
                                    <img class="photo" src="${item.images[4].source}" alt="${item.album.name}"/>
                                  </a>
                                </li>`;
    }
  });

  galleryMarkup += `${galleryListMarkup}${galleryListItemMarkup}</ul>`;

  $('#photos-episodes').append(galleryMarkup);
}
