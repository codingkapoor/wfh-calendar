/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    'use strict';

    var WORK_STATUS = {
        NOT_WFH: 0,
        FIRST_HALF_WFH: 1,
        SECOND_HALF_WFH: 2,
        FULL_DAY_WFH: 3
    };

    var MONTHLY_WORK_STATUS = new Array(31);
    MONTHLY_WORK_STATUS.fill(WORK_STATUS.NOT_WFH);

    var toggleStatus = true;

    $('#view-toggle').change(function () {
        if ($(this).prop('checked')) {
            toggleStatus = true;
        } else {
            toggleStatus = false;
        }
    })


    /* TODO: Currently, the following callback responds to an event on any icon. It should instead responds to only wfh-icons. */

    $('i').on('click', function (e) {
        
        function updateMonthlyWorkStatus(selection, status) {
            MONTHLY_WORK_STATUS[parseInt($(selection).attr('id').substring(1)) - 1] = status;
            console.log(MONTHLY_WORK_STATUS);
        }

        if (toggleStatus) {
            if ($(this).hasClass('fa-star')) {
                $(this).toggleClass('fa-star fa-star-o');
                updateMonthlyWorkStatus(this, WORK_STATUS.NOT_WFH);
            } else {
                $(this).removeClass('fa-star-o fa-star-half-o fa-flip-horizontal').addClass('fa-star');
                updateMonthlyWorkStatus(this, WORK_STATUS.FULL_DAY_WFH);
            }
        } else {
            var iWidth = $(this).outerWidth();
            var iOffset = $(this).offset();

            var x = e.pageX - iOffset.left;
            if (iWidth / 2 > x) {
                if ($(this).hasClass('fa-star-o')) {
                    $(this).toggleClass('fa-star-o fa-star-half-o');
                    updateMonthlyWorkStatus(this, WORK_STATUS.FIRST_HALF_WFH);
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star');
                    updateMonthlyWorkStatus(this, WORK_STATUS.FULL_DAY_WFH);
                } else if ($(this).hasClass('fa-star-half-o')) {
                    $(this).toggleClass('fa-star-half-o fa-star-o');
                    updateMonthlyWorkStatus(this, WORK_STATUS.NOT_WFH);
                } else if ($(this).hasClass('fa-star')) {
                    $(this).toggleClass('fa-star fa-star-half-o fa-flip-horizontal');
                    updateMonthlyWorkStatus(this, WORK_STATUS.SECOND_HALF_WFH);
                }
            } else {
                if ($(this).hasClass('fa-star-o')) {
                    $(this).toggleClass('fa-star-o fa-star-half-o fa-flip-horizontal');
                    updateMonthlyWorkStatus(this, WORK_STATUS.SECOND_HALF_WFH);
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star-o');
                    updateMonthlyWorkStatus(this, WORK_STATUS.NOT_WFH);
                } else if ($(this).hasClass('fa-star-half-o')) {
                    $(this).toggleClass('fa-star-half-o fa-star');
                    updateMonthlyWorkStatus(this, WORK_STATUS.FULL_DAY_WFH);
                } else if ($(this).hasClass('fa-star')) {
                    $(this).toggleClass('fa-star fa-star-half-o');
                    updateMonthlyWorkStatus(this, WORK_STATUS.FIRST_HALF_WFH);
                }
            }
        }
    });

});
