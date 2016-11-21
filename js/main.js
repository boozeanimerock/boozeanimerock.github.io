/* ===================================================
 * Main JS
 * - Handles various logics for this site
 * ================================================ */

!function ($) {

  "use strict";

  $(document).ready(function () {
    $('.nav li').on('click', function(){
      $('.nav li').removeClass('active');
      $(this).addClass('active');
    });
  });

}(window.jQuery);