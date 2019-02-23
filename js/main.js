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
    1012020788949632, // BAR Con: Episode 11
    949354225216289,  // BAR Con: Episode 10
    926887857462926,  // BAR Con: Episode 9
    906658509485861,  // BAR Con: Episode 8
    1007457972739247, // BAR Con: Episode 7
    869088153242897,  // BAR Con: Episode 6
    853717891446590,  // BAR Con: Episode 5
    860382347446811,  // BAR Con: Episode 4
    860400107445035,  // BAR Con: Episode 3
    860428737442172,  // BAR Con: Episode 2
    860433654108347   // BAR Con: Episode 1
  ];

  fbPhotoAlbumIds.every(fbPhotoAlbumId => {
    var fbAlbumApi = `https://graph.facebook.com/v2.10/${fbPhotoAlbumId}/photos?access_token=833367813443301%7CnDhKBT0o6K7a7j_5LMfc3QSbRNs&fields=album,created_time,id,images,link,name`;

    $.ajax({
      url: fbAlbumApi,
      dataType: 'json',
      async: false,
    }).done((response) => {
      generateGallery({ photoData: response.data });
    }).fail((e) => {
      console.log("error: ", e);
      useDefaultGallery();
      return false;
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
                                    <img class="photo" src="${item.images[3].source}" alt="${item.album.name}"/>
                                  </a>
                                </li>`;
    }
  });

  galleryMarkup += `${galleryListMarkup}${galleryListItemMarkup}</ul>`;

  $('#photos-episodes').append(galleryMarkup);
}

/**
 * Dynamically generate default photos for gallery when fetching from FB failed
 * @method useDefaultGallery
 * @return {undefined}
 */
function useDefaultGallery() {
  var images = [
    'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/27993361_1012021335616244_2384506724001236851_o.jpg?_nc_cat=106&_nc_ht=scontent.xx&oh=e56c83858fc30c877b9fdb6bdbbec8bc&oe=5CEE494A',
    'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/27993486_1012020885616289_8861761444113538070_o.jpg?_nc_cat=100&_nc_ht=scontent.xx&oh=1f9047e5df6739d6bb249bbedb60e8ea&oe=5CE4CA30',
    'https://scontent.xx.fbcdn.net/v/t31.0-0/q82/p600x600/28165136_1012022385616139_3247091298400740379_o.jpg?_nc_cat=107&_nc_ht=scontent.xx&oh=dfe70a96d7cb3f763e9866eba97d12cf&oe=5CDF8AA2',
    'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/28071161_1012021658949545_854874182754160225_o.jpg?_nc_cat=103&_nc_ht=scontent.xx&oh=2aaff833f881a8cbd6a01dc6588c531c&oe=5CEBDFD2'
  ];
  var galleryMarkup = '',
      galleryListMarkup = '',
      galleryListItemMarkup = '';

  galleryListMarkup = `<h4 class="photos-title">BAR Con: Episode 11</h4>
                        <ul class="photos-list list-unstyled">`;

  images.forEach((item, idx) => {
    galleryListItemMarkup += `<li class="list-item span3">
                                <a href="https://www.facebook.com/pg/boozeanimerock/photos/?tab=album&album_id=1012020788949632" target="_blank">
                                  <img class="photo" src="${item}" alt="BAR Con: Episode 11"/>
                                </a>
                              </li>`;
  });

  galleryMarkup += `${galleryListMarkup}${galleryListItemMarkup}</ul>`;

  $('#photos-episodes').append(galleryMarkup);
}