/*jslint browser: true*/
/*global $, jQuery, alert*/

$(".fa-star-o").click(function (e) {
    'use strict';
    
    var iWidth = $(this).innerWidth();
    var iOffset = $(this).offset();
    
    var x = e.pageX - iOffset.left;
    if (iWidth / 2 > x) {
        alert('left');
    } else {
        alert('right');
    }
});
