/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    'use strict';

    var toggleStatus = true;

    $('#selection').change(function () {
        if ($(this).prop('checked')) {
            toggleStatus = true;
        } else {
            toggleStatus = false;
        }
    })

    $('i').on('click', function (e) {
        if (toggleStatus) {
            if($(this).hasClass('fa-star')) {
                $(this).toggleClass('fa-star fa-star-o');
            } else {
                $(this).removeClass('fa-star-o fa-star-half-o fa-flip-horizontal').addClass('fa-star');
            }
        } else {
            var iWidth = $(this).outerWidth();
            var iOffset = $(this).offset();

            var x = e.pageX - iOffset.left;
            if (iWidth / 2 > x) {
                if ($(this).hasClass('fa-star-o')) {
                    $(this).toggleClass('fa-star-o fa-star-half-o');
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star');
                } else if ($(this).hasClass('fa-star-half-o')) {
                    $(this).toggleClass('fa-star-half-o fa-star-o');
                } else if ($(this).hasClass('fa-star')) {
                    $(this).toggleClass('fa-star fa-star-half-o fa-flip-horizontal');
                }
            } else {
                if ($(this).hasClass('fa-star-o')) {
                    $(this).toggleClass('fa-star-o fa-star-half-o fa-flip-horizontal');
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star-o');
                } else if ($(this).hasClass('fa-star-half-o')) {
                    $(this).toggleClass('fa-star-half-o fa-star');
                } else if ($(this).hasClass('fa-star')) {
                    $(this).toggleClass('fa-star fa-star-half-o');
                }
            }
        }
    });

});
