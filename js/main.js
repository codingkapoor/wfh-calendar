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

        function isSelectionValid(selection, status) {
            var indexOfCurrentSelection = parseInt($(selection).attr('id').substring(1)) - 1

            var indicesOfAllSelections = _.map(MONTHLY_WORK_STATUS, function (num, index) {
                if (num != 0)
                    return index;
                else return 0;
            });

            var filteredIndices = _.filter(indicesOfAllSelections, function (num) {
                return num > 0;
            });

            if (filteredIndices.length > 0) {
                if (Math.abs(filteredIndices[0] - indexOfCurrentSelection) != 1 &&
                    Math.abs(filteredIndices[filteredIndices.length - 1] - indexOfCurrentSelection) != 1) {
                    alert("Not allowed");               // TODO: replace with Bootstrap alert
                    console.log(MONTHLY_WORK_STATUS);
                    return false;
                } else {
                    MONTHLY_WORK_STATUS[indexOfCurrentSelection] = status;
                    console.log(MONTHLY_WORK_STATUS);
                    return true;
                }
            } else {
                MONTHLY_WORK_STATUS[indexOfCurrentSelection] = status;
                console.log(MONTHLY_WORK_STATUS);
                return true;
            }
        }

        if (toggleStatus) {
            if ($(this).hasClass('fa-star')) {
                if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                    $(this).toggleClass('fa-star fa-star-o');
                }
            } else {
                if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                    $(this).removeClass('fa-star-o fa-star-half-o fa-flip-horizontal').addClass('fa-star');
                }
            }
        } else {
            var iWidth = $(this).outerWidth();
            var iOffset = $(this).offset();

            var x = e.pageX - iOffset.left;
            if (iWidth / 2 > x) {
                if ($(this).hasClass('fa-star-o')) {
                    if (isSelectionValid(this, WORK_STATUS.FIRST_HALF_WFH)) {
                        $(this).toggleClass('fa-star-o fa-star-half-o');
                    }
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                        $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star');
                    }
                } else if ($(this).hasClass('fa-star-half-o')) {
                    if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                        $(this).toggleClass('fa-star-half-o fa-star-o');
                    }
                } else if ($(this).hasClass('fa-star')) {
                    if (isSelectionValid(this, WORK_STATUS.SECOND_HALF_WFH)) {
                        $(this).toggleClass('fa-star fa-star-half-o fa-flip-horizontal');
                    }
                }
            } else {
                if ($(this).hasClass('fa-star-o')) {
                    if (isSelectionValid(this, WORK_STATUS.SECOND_HALF_WFH)) {
                        $(this).toggleClass('fa-star-o fa-star-half-o fa-flip-horizontal');
                    }
                } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                    if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                        $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star-o');
                    }
                } else if ($(this).hasClass('fa-star-half-o')) {
                    if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                        $(this).toggleClass('fa-star-half-o fa-star');
                    }
                } else if ($(this).hasClass('fa-star')) {
                    if (isSelectionValid(this, WORK_STATUS.FIRST_HALF_WFH)) {
                        $(this).toggleClass('fa-star fa-star-half-o');
                    }
                }
            }
        }
    });

});
